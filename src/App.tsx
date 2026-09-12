import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { KpiCards } from './components/KpiCards';
import { TreeMaterialHierarchy } from './components/TreeMaterialHierarchy';
import { TreeSavingsCommercialization } from './components/TreeSavingsCommercialization';
import { ExecutiveChartsAnalysis } from './components/ExecutiveChartsAnalysis';
import { ExecutiveMatrixTables } from './components/ExecutiveMatrixTables';
import { ProcurementSavingsPage } from './components/pages/ProcurementSavingsPage';
import { ActiveProfileAvlPage } from './components/pages/ActiveProfileAvlPage';
import { UnderDevelopmentPage } from './components/pages/UnderDevelopmentPage';
import { ProcessImprovementSection } from './components/ProcessImprovementSection';
import { AlternateSourcingPage } from './components/pages/AlternateSourcingPage';
import { UploadModal } from './components/UploadModal';
import { DetailModal } from './components/DetailModal';
import { AtcoLogo } from './components/AtcoLogo';
import { LoginPage } from './components/LoginPage';
import { AuthUser, TabPageKey } from './types';
import {
  LayoutDashboard,
  DollarSign,
  ShieldCheck,
  FlaskConical,
  ChevronRight,
  Layers,
  Sparkles,
  SendHorizontal,
  X,
} from 'lucide-react';

interface DashboardContentProps {
  currentUser: AuthUser;
  onLogout: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ currentUser, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<TabPageKey>('dashboard');
  const [activeTreeModal, setActiveTreeModal] = useState<'material' | 'savings' | null>(null);
  const [processImprovementModal, setProcessImprovementModal] = useState<{
    isOpen: boolean;
    tab: 'performed' | 'upcoming' | 'both';
  } | null>(null);

  const openMaterialTreeModal = () => {
    setActiveTreeModal('material');
  };

  const openSavingsTreeModal = () => {
    setActiveTreeModal('savings');
  };

  const openUnderDevSegment = () => {
    setCurrentPage('under_dev');
  };

  const openProcessImprovementModal = (tab: 'performed' | 'upcoming' | 'both' = 'performed') => {
    setProcessImprovementModal({ isOpen: true, tab });
  };

  const navTabs = [
    {
      id: 'dashboard' as const,
      label: '1. Executive Dashboard',
      icon: LayoutDashboard,
      activeClass: 'bg-blue-600 text-white shadow-xs border border-blue-700',
    },
    {
      id: 'savings' as const,
      label: '2. Procurement Savings Details',
      icon: DollarSign,
      activeClass: 'bg-emerald-600 text-white shadow-xs border border-emerald-700',
    },
    {
      id: 'active_avl' as const,
      label: '3. Active Profile & AVL Status',
      icon: ShieldCheck,
      activeClass: 'bg-blue-700 text-white shadow-xs border border-blue-800',
    },
    {
      id: 'under_dev' as const,
      label: '4. Under Development Pipeline',
      icon: FlaskConical,
      activeClass: 'bg-purple-700 text-white shadow-xs border border-purple-800',
    },
    {
      id: 'process_improvement' as const,
      label: '5. Process Improvement & Digitalization',
      icon: Sparkles,
      activeClass: 'bg-slate-900 text-white shadow-xs border border-slate-950',
    },
    {
      id: 'alternate_sourcing' as const,
      label: '6. Alternate Sourcing Inquiry Portal',
      icon: SendHorizontal,
      activeClass: 'bg-emerald-700 text-white shadow-xs border border-emerald-800',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Global Persistent Sticky Top Bar (Header + Segment Tabs Bar) */}
      <div className="sticky top-0 z-40 bg-slate-900 shadow-md">
        <Header
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onOpenUpload={() => setIsUploadOpen(true)}
          isSidebarOpen={isSidebarOpen}
          currentUser={currentUser}
          onLogout={onLogout}
        />

        {/* Persistent Sticky Segment Tabs Navigation Bar - Always visible when scrolling down on any page */}
        <div className="bg-slate-100 border-b border-slate-300 py-2 shadow-xs">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-none p-1.5 border border-slate-300 shadow-xs flex items-center gap-1.5 overflow-x-auto select-none">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentPage === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={() => setCurrentPage(tab.id)}
                    className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-none text-xs font-black transition-all cursor-pointer ${
                      isActive
                        ? tab.activeClass
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Slideout Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenUpload={() => setIsUploadOpen(true)}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      {/* 3. Main Body Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">

        {/* ========================================================= */}
        {/* 1. EXECUTIVE DASHBOARD (ALL RECTANGULAR & POPUP TREES) */}
        {/* ========================================================= */}
        {currentPage === 'dashboard' && (
          <div className="space-y-8">
            {/* Step 1: Top 4 Rectangular Executive KPI Cards */}
            <section id="overview">
              <KpiCards
                onOpenHierarchyTree={openMaterialTreeModal}
                onOpenSavingsTree={openSavingsTreeModal}
                onScrollToTree1={openMaterialTreeModal}
                onScrollToTree2={openSavingsTreeModal}
                onOpenUnderDevTree={openUnderDevSegment}
                onOpenProcessImprovement={openProcessImprovementModal}
              />
            </section>

            {/* Note: Trees and Process Improvement Hub are opened as interactive popups upon clicking their cards/indicators */}

            {/* Step 2: Charts & Graph Analysis in Rectangular Format (1st to 6th strictly sequenced) */}
            <section id="executive-charts">
              <ExecutiveChartsAnalysis />
            </section>

            {/* Step 3: 3 Matrix Tables (7th, 8th, 9th) + Slicers in Rectangular Format */}
            <section id="executive-matrices">
              <ExecutiveMatrixTables />
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. PROCUREMENT SAVING DETAILS */}
        {/* ========================================================= */}
        {currentPage === 'savings' && <ProcurementSavingsPage />}

        {/* ========================================================= */}
        {/* 3. ACTIVE PROFILE & AVL STATUS */}
        {/* ========================================================= */}
        {currentPage === 'active_avl' && <ActiveProfileAvlPage />}

        {/* ========================================================= */}
        {/* 4. UNDER DEVELOPMENT PIPELINE */}
        {/* ========================================================= */}
        {currentPage === 'under_dev' && <UnderDevelopmentPage />}

        {/* ========================================================= */}
        {/* 5. PROCESS IMPROVEMENT & DIGITAL TRANSFORMATION INITIATIVES */}
        {/* ========================================================= */}
        {currentPage === 'process_improvement' && (
          <div className="space-y-6">
            <ProcessImprovementSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. ALTERNATE SOURCING INQUIRY PORTAL */}
        {/* ========================================================= */}
        {currentPage === 'alternate_sourcing' && <AlternateSourcingPage />}

      </main>

      {/* Global Footer */}
      <footer className="mt-12 bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AtcoLogo className="w-6 h-6" />
            <span className="font-semibold text-slate-200">© 2026 ATCO Laboratories Limited.</span>
          </div>
          <div className="text-right font-semibold text-slate-200">
            Prepared By: <span className="text-white font-bold">Yasarat Tariq</span> from Sourcing Department
          </div>
        </div>
      </footer>

      {/* Global Modals: Full CSV Manager & Deep-Dive Detail Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      <DetailModal />

      {/* ========================================================================= */}
      {/* POPUP MODAL: SOURCING & COMMERCIALIZATION OR MATERIAL HIERARCHY TREE */}
      {/* ========================================================================= */}
      {activeTreeModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={() => setActiveTreeModal(null)}
        >
          <div
            className="bg-white rounded-none border-2 border-slate-400 shadow-2xl w-full max-w-7xl max-h-[94vh] flex flex-col my-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0 select-none">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-none text-white shadow-xs">
                  {activeTreeModal === 'material' ? (
                    <Layers className="w-5 h-5" />
                  ) : (
                    <DollarSign className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      Executive Interactive Tree View
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {activeTreeModal === 'material' ? 'TREE-MATERIAL-01' : 'TREE-SAVINGS-02'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight mt-0.5 text-white">
                    {activeTreeModal === 'material'
                      ? 'Material Hierarchy & Classification Tree (445 Materials)'
                      : 'Total Sourcing & Commercialization Saving Tree ($3.88M / PKR 1.09B)'}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTreeModal(null)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-wider rounded-none transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs border border-rose-500"
                  title="Close tree popup"
                >
                  <X className="w-4 h-4" />
                  <span>Close Tree</span>
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable content containing Tree */}
            <div className="p-4 sm:p-6 bg-slate-100 overflow-y-auto flex-1">
              {activeTreeModal === 'material' ? (
                <TreeMaterialHierarchy />
              ) : (
                <TreeSavingsCommercialization />
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>Interactive drilldown mode: Click any node or month cell to open raw working records.</span>
              <button
                onClick={() => setActiveTreeModal(null)}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 uppercase tracking-wider cursor-pointer"
              >
                Dismiss & Return to Executive Dashboard &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POPUP MODAL: PROCESS IMPROVEMENT & DIGITAL TRANSFORMATION INITIATIVES */}
      {/* ========================================================================= */}
      {processImprovementModal?.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={() => setProcessImprovementModal(null)}
        >
          <div
            className="bg-white rounded-none border-2 border-slate-700 shadow-2xl w-full max-w-7xl max-h-[94vh] flex flex-col my-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <ProcessImprovementSection
              initialTab={processImprovementModal.tab}
              onClose={() => setProcessImprovementModal(null)}
              isModal={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = sessionStorage.getItem('atco_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      sessionStorage.setItem('atco_auth_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem('atco_auth_user');
      localStorage.removeItem('atco_auth_user');
    } catch {
      // ignore
    }
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DataProvider>
      <DashboardContent currentUser={currentUser} onLogout={handleLogout} />
    </DataProvider>
  );
}
