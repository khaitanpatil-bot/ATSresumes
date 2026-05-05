import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [plan, setPlan] = useState('free') // Default to free
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserPlan = async (userId) => {
      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("plan")
          .eq("user_id", userId)
          .single();
        
        if (data && data.plan) {
          setPlan(data.plan);
        } else {
          setPlan('free');
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
        setPlan('free');
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserPlan(session.user.id);
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchUserPlan(session.user.id);
        } else {
          setPlan('free');
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    try {
      setError(null)
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
      })
      if (err) throw err
      return data
    } catch (err) {
      setError(err.message)
      return null
    }
  }

  const signIn = async (email, password) => {
    try {
      setError(null)
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      return data
    } catch (err) {
      setError(err.message)
      return null
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error: err } = await supabase.auth.signOut()
      if (err) throw err
    } catch (err) {
      setError(err.message)
    }
  }

  return {
    user,
    plan,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  }
}