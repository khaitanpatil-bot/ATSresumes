import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0/mo',
    features: ['Quick Scan', 'Basic ATS score', 'Limited downloads']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹19/mo',
    features: ['Deep Analysis', 'Keyword optimization', 'Resume templates']
  },
  {
    id: 'business',
    name: 'Business',
    price: '₹49/mo',
    features: ['Multiple job matching', 'Team analytics', 'LinkedIn sync']
  }
];

export default function PricingSection() {
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePayment = async (planId) => {
    if (!user) {
      alert("Please sign in to choose a plan!");
      return;
    }

    setLoadingPlan(planId);

    try {
      if (planId === 'free') {
        // Just update DB directly for free
        const { error } = await supabase
          .from("subscriptions")
          .upsert({
            user_id: user.id,
            plan: 'free',
            status: "active",
            updated_at: new Date().toISOString()
          });
        
        if (error) throw error;
        alert("You are now on the Free plan! 🎉");
        setLoadingPlan(null);
        return;
      }

      // 1. Create order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-order', {
        body: { plan: planId }
      });

      if (orderError) throw orderError;
      if (orderData.error) throw new Error(orderData.error);

      // 2. Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_KEY_ID', // Remember to set this in .env
        amount: orderData.amount,
        currency: "INR",
        name: "ATS Resume Scanner",
        description: `${planId} plan`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: { 
                ...response,
                plan: planId
              }
            });

            if (verifyError) throw verifyError;
            if (verifyData && verifyData.success) {
              alert("Payment Successful! 🎉 Welcome to the " + planId + " plan.");
              // Optionally reload or update state to reflect new plan
              window.location.reload();
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error verifying payment.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert("Payment failed! " + response.error.description);
      });
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="space-y-8 rounded-[2rem] bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Pricing</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Plans for every stage of your career.</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-[2rem] border border-slate-800/70 bg-slate-950/90 p-8 text-center transition hover:border-emerald-400/30 hover:bg-slate-900/95">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{plan.name}</p>
            <p className="mt-6 text-4xl font-semibold text-white">{plan.price}</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature} className="rounded-2xl bg-slate-900/70 px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handlePayment(plan.id)}
              disabled={loadingPlan === plan.id}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50"
            >
              {loadingPlan === plan.id ? 'Processing...' : `Choose ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
