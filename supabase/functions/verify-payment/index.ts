import crypto from "node:crypto";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";
// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment verified!
      // Update Supabase user plan here
      
      // Get the Authorization header from the request to know which user this is
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        throw new Error('Missing Authorization header');
      }

      // Initialize a Supabase client with the user's Auth token so RLS is respected
      // or use the Service Role key to bypass RLS and update the subscriptions table directly.
      const supabase = createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_ANON_KEY || '',
        { global: { headers: { Authorization: authHeader } } }
      );

      // Get the user from the auth token
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('Could not identify user');
      }

      // Upsert the subscription record
      const { error: dbError } = await supabase
        .from("subscriptions")
        .upsert({
          user_id: user.id,
          plan: plan,
          status: "active",
          updated_at: new Date().toISOString()
        });

      if (dbError) throw dbError;

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid signature' }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
  } catch (error) {
    const err = error as Error;
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
