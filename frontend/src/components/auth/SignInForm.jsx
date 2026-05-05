import { useState } from 'react';
import InputField from './InputField';

// SVG Icons
const MailIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LoaderIcon = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

const GithubIcon = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function SignInForm({ onToggle, onSubmit, loading, isActive }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(email, password);
    }
  };

  return (
    <div
      className={`w-full transition-all duration-500 transform ${
        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 absolute inset-x-0 top-0 pointer-events-none'
      }`}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-slate-400">Sign in to continue to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email Address"
          type="email"
          id="signin-email"
          icon={MailIcon}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          error={errors.email}
          required
        />

        <InputField
          label="Password"
          type="password"
          id="signin-password"
          icon={LockIcon}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between mt-2 mb-6">
          <label className="flex items-center text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
            <input type="checkbox" className="mr-2 rounded border-slate-700 bg-slate-900/50 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-slate-950" />
            Remember me
          </label>
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] transform text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <LoaderIcon className="animate-spin mr-2" size={20} />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <div className="h-px bg-slate-800 flex-1"></div>
        <span className="text-slate-500 text-sm">Or continue with</span>
        <div className="h-px bg-slate-800 flex-1"></div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center py-2.5 px-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98] transform text-slate-300 transition-all"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center py-2.5 px-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98] transform text-slate-300 transition-all"
        >
          <GithubIcon size={20} className="mr-2" />
          GitHub
        </button>
      </div>

      <p className="text-center text-slate-400 mt-8">
        Don't have an account?{' '}
        <button
          onClick={onToggle}
          className="text-blue-400 font-medium hover:text-blue-300 transition-colors focus:outline-none"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
