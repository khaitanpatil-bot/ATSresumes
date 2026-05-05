import { useState } from 'react';

// Simple SVG Icons to replace lucide-react
const EyeIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function InputField({
  label,
  type = 'text',
  id,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-5 relative">
      <div className="relative group">
        {Icon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused || value ? 'text-blue-500' : 'text-slate-400'}`}>
            <Icon size={18} />
          </div>
        )}
        
        <input
          type={inputType}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`
            w-full bg-slate-900/50 border rounded-xl px-4 py-3 
            text-slate-100 placeholder-transparent
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300
            peer backdrop-blur-sm
            ${Icon ? 'pl-10' : ''} 
            ${type === 'password' ? 'pr-10' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' : 'border-slate-700/50 focus:border-blue-500/50 hover:border-slate-600'}
          `}
          placeholder={label}
          {...props}
        />
        
        <label
          htmlFor={id}
          className={`
            absolute left-4 transition-all duration-300 pointer-events-none
            ${Icon ? 'ml-6' : ''}
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
            peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-slate-950 peer-focus:px-1 peer-focus:text-blue-500
            ${value ? '-top-2.5 text-sm bg-slate-950 px-1 text-slate-300' : ''}
            ${error ? 'peer-focus:text-red-400' : ''}
          `}
        >
          {label}
        </label>

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${error ? 'max-h-10 opacity-100 mt-1.5' : 'max-h-0 opacity-0 mt-0'}`}
      >
        <p className="text-red-400 text-xs ml-1">
          {error}
        </p>
      </div>
    </div>
  );
}
