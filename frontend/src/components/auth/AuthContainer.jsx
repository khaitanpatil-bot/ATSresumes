import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const CheckCircleIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function AuthContainer() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const { signIn, signUp } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSignIn = async (email, password) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await signIn(email, password);
      if (result) {
        setSuccessMsg('Successfully signed in!');
      } else {
        setErrorMsg('Invalid login credentials');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await signUp(email, password);
      if (result) {
        setSuccessMsg('Account created! Please check your email to verify.');
        setTimeout(() => setIsSignIn(true), 3000);
      } else {
        setErrorMsg('Failed to create account');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden p-4">
      {/* Background gradients and floating shapes using plain CSS animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-600/20 to-blue-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse delay-1000"></div>
        
        {/* Simple floating blobs using Tailwind's animate-bounce or custom keyframes (if added), here we just keep them static but soft */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main glassmorphic card */}
      <div
        className={`w-full max-w-md relative z-10 transition-all duration-700 transform ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-700/50 p-8 rounded-3xl shadow-2xl overflow-hidden relative">
          
          {/* Subtle top highlight for 3D effect */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div
            className={`overflow-hidden transition-all duration-300 ${errorMsg ? 'max-h-24 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}
          >
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start">
              <div className="mr-3 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {errorMsg}
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${successMsg ? 'max-h-24 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}
          >
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-start">
              <div className="mr-3 mt-0.5">
                <CheckCircleIcon className="w-4 h-4" />
              </div>
              {successMsg}
            </div>
          </div>

          <div className="relative min-h-[450px]">
            <SignInForm onToggle={handleToggle} onSubmit={handleSignIn} loading={loading} isActive={isSignIn} />
            <SignUpForm onToggle={handleToggle} onSubmit={handleSignUp} loading={loading} isActive={!isSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
}
