import React from 'react';
import { Menu, UploadCloud, RefreshCw, Download, DollarSign, Database, Sparkles, CheckCircle2, LogOut, User } from 'lucide-react';
import { useData } from '../context/DataContext';
import { CurrencyMode, AuthUser } from '../types';
import { AtcoLogo } from './AtcoLogo';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenUpload: () => void;
  isSidebarOpen: boolean;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenUpload,
  isSidebarOpen,
  currentUser,
  onLogout,
}) => {
  const { currency, setCurrency, resetAllDataToDefault } = useData();

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Hamburger + Strategic Sourcing Header */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <button
              id="sidebar-toggle-btn"
              onClick={onToggleSidebar}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Toggle Navigation Menu"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-tight">
                  Strategic Sourcing and Procurement Dashboard
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Commercial Procurement, Import, Sourcing & Alternate Vendor Performance Executive Hub
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right Controls: Currency Switcher + Upload + Company Branding */}
        <div className="flex items-center flex-wrap md:flex-nowrap gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Currency Switcher [USD / PKR] */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700 shadow-inner">
            <button
              id="currency-pkr-btn"
              onClick={() => setCurrency('PKR')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                currency === 'PKR'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PKR (Rs)
            </button>
            <button
              id="currency-usd-btn"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                currency === 'USD'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              USD ($)
            </button>
          </div>

          {/* Direct File Upload & Refresh Buttons */}
          <div className="flex items-center gap-2">
            {currentUser?.accessLevel === 'operational' && (
              <button
                id="header-upload-btn"
                onClick={onOpenUpload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm hover:shadow transition-all border border-blue-400/30"
                title="Upload & Manage Monthly CSV Files"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload CSV</span>
              </button>
            )}

            <button
              id="header-refresh-btn"
              onClick={resetAllDataToDefault}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Refresh / Reset All Datasets"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Right Side: Company Name Atco Laboratory & Official Logo */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-700/80">
            <div className="relative flex-shrink-0">
              {/* Official Atco blue circular mark with white negative-space emblem */}
              <AtcoLogo className="w-10 h-10 shadow-md" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-blue-400 leading-tight whitespace-nowrap">
                Atco Laboratory
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Pharmaceuticals
              </span>
            </div>
          </div>

          {/* User Profile & Logout Button */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-700/80">
              <div className="hidden xl:flex flex-col text-right">
                <span className="text-xs font-black text-white leading-none truncate max-w-[150px]">
                  {currentUser.name}
                </span>
                <span className={`text-[10px] font-bold leading-none mt-1 ${currentUser.accessLevel === 'operational' ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {currentUser.accessLevel === 'operational' ? 'SCM Ops (Full Suite)' : currentUser.role}
                </span>
              </div>

              {onLogout && (
                <button
                  id="header-logout-btn"
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-800 hover:bg-rose-900/70 text-slate-300 hover:text-rose-200 border border-slate-700 hover:border-rose-700/80 transition-all cursor-pointer"
                  title="Sign Out of Strategic Dashboard"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
