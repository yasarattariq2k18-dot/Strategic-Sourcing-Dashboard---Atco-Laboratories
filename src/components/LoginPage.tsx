import React, { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { AtcoLogo } from './AtcoLogo';
import { AuthUser } from '../types';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

const VAULT_STORAGE_KEY = 'atco_workstation_remembered_creds';
const LAST_EMAIL_KEY = 'atco_last_remembered_email';

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Workstation credentials vault
  // Keep input completely blank on mount until user enters an ID
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    setError('');

    const normalized = newEmail.trim().toLowerCase();
    if (!normalized) {
      setPassword('');
      return;
    }

    try {
      const storedVaultRaw = localStorage.getItem(VAULT_STORAGE_KEY);
      if (storedVaultRaw) {
        const vault = JSON.parse(storedVaultRaw);
        if (vault && vault[normalized]) {
          setPassword(vault[normalized]);
          setRememberMe(true);
          return;
        }
      }
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedEmail) {
      setError('Please enter your authorized corporate ID.');
      return;
    }

    if (!trimmedPass) {
      setError('Please enter your account password.');
      return;
    }

    // Check credentials for either Management or SCM Operational access
    const isManagement =
      trimmedEmail === 'management@atcolab.com' && trimmedPass === 'management321';
    const isOperational =
      trimmedEmail === 'scm@atcolab.com' && trimmedPass === 'scm@321';

    if (!isManagement && !isOperational) {
      setError(
        'Invalid credentials. Please enter authorized ID (management@atcolab.com or scm@atcolab.com) and Password.'
      );
      return;
    }

    // Save or clear workstation remembered credentials based on checkbox
    try {
      const storedVaultRaw = localStorage.getItem(VAULT_STORAGE_KEY);
      const vault = storedVaultRaw ? JSON.parse(storedVaultRaw) : {};

      if (rememberMe) {
        vault[trimmedEmail] = trimmedPass;
        localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(vault));
        localStorage.setItem(LAST_EMAIL_KEY, trimmedEmail);
      } else {
        delete vault[trimmedEmail];
        localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(vault));
        if (localStorage.getItem(LAST_EMAIL_KEY) === trimmedEmail) {
          localStorage.removeItem(LAST_EMAIL_KEY);
        }
      }
    } catch {
      // ignore
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const authUser: AuthUser = isManagement
        ? {
            id: 'usr-mgmt-01',
            name: 'Executive Management',
            email: 'management@atcolab.com',
            role: 'Corporate Management',
            department: 'Strategic Sourcing & Corporate Leadership',
            badgeCode: 'MGMT-001',
            accessLevel: 'management',
            lastLogin: new Date().toLocaleString(),
          }
        : {
            id: 'usr-scm-01',
            name: 'Yasarat Tariq (SCM Ops)',
            email: 'scm@atcolab.com',
            role: 'SCM Operations Lead',
            department: 'Supply Chain & Sourcing Operations',
            badgeCode: 'SCM-OP-01',
            accessLevel: 'operational',
            lastLogin: new Date().toLocaleString(),
          };

      onLogin(authUser);
    }, 350);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-800 flex flex-col justify-between selection:bg-[#0082cb] selection:text-white relative overflow-hidden">
      {/* Pharmaceutical Chemical Structure & Molecular Hexagon Background Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pharma-hex" width="56" height="97" patternUnits="userSpaceOnUse">
              <path
                d="M28 0 L56 16.2 L56 48.6 L28 64.8 L0 48.6 L0 16.2 Z M28 97 L56 80.8 L56 48.6 L28 64.8 L0 48.6 L0 80.8 Z"
                fill="none"
                stroke="#0082cb"
                strokeWidth="1.5"
              />
              <circle cx="28" cy="0" r="2.5" fill="#0082cb" />
              <circle cx="56" cy="16.2" r="2.5" fill="#0082cb" />
              <circle cx="56" cy="48.6" r="2.5" fill="#0082cb" />
              <circle cx="28" cy="64.8" r="2.5" fill="#0082cb" />
              <circle cx="0" cy="48.6" r="2.5" fill="#0082cb" />
              <circle cx="0" cy="16.2" r="2.5" fill="#0082cb" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pharma-hex)" />
        </svg>
      </div>

      {/* Subtle Clinical Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/70 to-blue-50/40 pointer-events-none" />

      {/* Top Clinical Pharmaceutical Header Ribbon */}
      <header className="relative z-10 w-full px-6 py-4 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3.5">
          <AtcoLogo className="w-10 h-10 drop-shadow-xs" />
          <div>
            <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight leading-none block">
              ATCO LABORATORIES LIMITED
            </span>
            <span className="text-[11px] uppercase font-bold text-[#0082cb] tracking-wider block mt-1">
              Pharmaceutical Strategic Sourcing, Procurement & Alternate Development
            </span>
          </div>
        </div>
      </header>

      {/* Main Sign-In Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md bg-white border border-slate-300 shadow-xl rounded-none overflow-hidden border-t-4 border-t-[#0082cb]">
          
          {/* Card Top Header - Clean LOGIN */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 text-center">
            <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wider">
              LOGIN
            </h2>
          </div>

          {/* Simple Authentication Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            {error && (
              <div className="p-3 bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-xs flex items-center gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Email / Corporate ID */}
            <div className="space-y-1.5">
              <label
                htmlFor="user-email"
                className="block text-xs font-black uppercase tracking-wider text-slate-700"
              >
                Corporate Email / ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="user-email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={(e) => handleEmailChange(e.target.value)}
                  placeholder=""
                  autoComplete="email"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 focus:border-[#0082cb] focus:ring-1 focus:ring-[#0082cb] rounded-none text-slate-900 text-sm placeholder-slate-400 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="user-password"
                className="block text-xs font-black uppercase tracking-wider text-slate-700"
              >
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="user-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  autoComplete="off"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 focus:border-[#0082cb] focus:ring-1 focus:ring-[#0082cb] rounded-none text-slate-900 text-sm placeholder-slate-400 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-none border-slate-300 text-[#0082cb] focus:ring-[#0082cb]"
                />
                <span>Remember this workstation session</span>
              </label>
            </div>

            {/* Submit Sign In Button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-5 bg-[#0082cb] hover:bg-[#0070b0] active:bg-[#005e94] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-none transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>LOGIN</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Bottom Corporate Footer */}
      <footer className="relative z-10 w-full px-6 py-3 border-t border-slate-200 bg-white text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs">
        <span className="font-semibold text-slate-700">© 2026 ATCO Laboratories Limited.</span>
        <span className="font-semibold text-slate-700">Prepared By: Yasarat Tariq from Sourcing Department</span>
      </footer>
    </div>
  );
};
