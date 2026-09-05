import React from 'react';
import {
  LayoutDashboard,
  DollarSign,
  ShieldCheck,
  Layers,
  X,
  FileSpreadsheet,
  UploadCloud,
  TrendingUp,
  Mail,
  Sparkles,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { AtcoLogo } from './AtcoLogo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: 'page1' | 'page2' | 'page3' | 'page4' | 'page5' | 'page6';
  setCurrentPage: (p: 'page1' | 'page2' | 'page3' | 'page4' | 'page5' | 'page6') => void;
  onOpenUpload: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentPage,
  setCurrentPage,
  onOpenUpload,
}) => {
  const { currency } = useData();

  const navPages = [
    {
      id: 'page1' as const,
      label: '1. Executive Dashboard & Trees',
      desc: 'Top 4 Cards, 2 Trees, 6 Charts, 3 Matrices & Initiatives',
      icon: LayoutDashboard,
      badge: 'Main',
    },
    {
      id: 'page2' as const,
      label: '2. Procurement Saving Details',
      desc: 'Matured, CPHI, Project & Historic POs',
      icon: DollarSign,
      badge: '$3.2M',
    },
    {
      id: 'page3' as const,
      label: '3. Active Profile & AVL Status',
      desc: '445 Active Materials, 728 Mfg & Origins',
      icon: ShieldCheck,
      badge: '445 SKUs',
    },
    {
      id: 'page4' as const,
      label: '4. Under Development Details',
      desc: '4 Pipeline Stages, Quotes & Lab Studies',
      icon: Layers,
      badge: '4 Stages',
    },
    {
      id: 'page5' as const,
      label: '5. Indentor Quotes & Email Extractor',
      desc: 'Outlook & Excel Rate Extraction & Audit Hub',
      icon: Mail,
      badge: 'New Hub',
    },
    {
      id: 'page6' as const,
      label: '6. Process Improvement & Digitalization',
      desc: '12 Performed Initiatives & 3 Upcoming Projects (pr.pdf)',
      icon: Sparkles,
      badge: '15 Init',
    },
  ];


  return (
    <>
      {/* Backdrop for mobile/drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AtcoLogo className="w-8 h-8 shadow-sm" />
            <div>
              <h2 className="text-sm font-black text-white tracking-wide">ATCO SOURCING</h2>
              <p className="text-[11px] text-slate-400 font-medium">Executive Segment Navigator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Segments */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
            Workstream Segments
          </div>
          {navPages.map((page) => {
            const Icon = page.icon;
            const isActive = currentPage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => {
                  setCurrentPage(page.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex flex-col p-3 rounded-xl text-left transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                    <span className="font-bold text-xs">{page.label}</span>
                  </div>
                  {page.badge && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {page.badge}
                    </span>
                  )}
                </div>
                <p className={`text-[11px] mt-1 line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  {page.desc}
                </p>
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-800 px-2">
            <button
              onClick={() => {
                onOpenUpload();
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Monthly CSV Manager</span>
              </div>
              <span className="text-[10px] text-emerald-400">6 Files</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Active Currency:</span>
            <span className="font-bold text-white">{currency}</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Atco Laboratories Sourcing DSS v2.6
          </div>
        </div>
      </aside>
    </>
  );
};
