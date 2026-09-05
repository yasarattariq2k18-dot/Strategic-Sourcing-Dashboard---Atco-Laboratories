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
import { VendorInquiriesQuotesPage } from './components/pages/VendorInquiriesQuotesPage';
import { ProcessImprovementSection } from './components/ProcessImprovementSection';
import { UploadModal } from './components/UploadModal';
import { DetailModal } from './components/DetailModal';
import { AtcoLogo } from './components/AtcoLogo';
import {
  LayoutDashboard,
  DollarSign,
  ShieldCheck,
  FlaskConical,
  ChevronRight,
  Layers,
  Mail,
  Sparkles,
  X,
} from 'lucide-react';

const DashboardContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<'page1' | 'page2' | 'page3' | 'page4' | 'page5' | 'page6'>('page1');
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
    setCurrentPage('page4');
  };

  const openProcessImprovementModal = (tab: 'performed' | 'upcoming' | 'both' = 'performed') => {
    setProcessImprovementModal({ isOpen: true, tab });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Global Navigation Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onOpenUpload={() => setIsUploadOpen(true)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* 2. Slideout Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* 3. Main Body Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        
        {/* Segment Tabs Navigation Bar - Crisp Rectangular Format */}
        <div className="bg-white rounded-none p-1.5 border border-slate-300 shadow-xs flex items-center gap-1.5 overflow-x-auto select-none">
          <button
            id="tab-page-1"
            onClick={() => setCurrentPage('page1')}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-none text-xs font-black transition-all cursor-pointer ${
              currentPage === 'page1'
                ? 'bg-blue-600 text-white shadow-xs border border-blue-700'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>1. Executive Dashboard</span>
          </button>

          <button
            id="tab-page-2"
            onClick={() => setCurrentPage('page2')}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-none text-xs font-black transition-all cursor-pointer ${
              currentPage === 'page2'
                ? 'bg-emerald-600 text-white shadow-xs border border-emerald-700'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>2. Procurement Savings Details</span>
          </button>

          <button
            id="tab-page-3"
            onClick={() => setCurrentPage('page3')}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-none text-xs font-black transition-all cursor-pointer ${
              currentPage === 'page3'
                ? 'bg-blue-700 text-white shadow-xs border border-blue-800'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>3. Active Profile & AVL Status</span>
          </button>

          <button
            id="tab-page-4"
            onClick={() => setCurrentPage('page4')}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-none text-xs font-black transition-all cursor-pointer ${
              currentPage === 'page4'
                ? 'bg-purple-700 text-white shadow-xs border border-purple-800'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>4. Under Development Pipeline</span>
          </button>

          <button
            id="tab-page-5"
            onClick={() => setCurrentPage('page5')}
            className={`flex-1 min-w-[220px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-none text-xs font-black transition-all cursor-pointer ${
              currentPage === 'page5'
                ? 'bg-indigo-600 text-white shadow-xs border border-indigo-700'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>5. Indentor Quotations & Email Extractor</span>
          </button>

          <button
            id="tab-page-6"
            onClick={() => setCurrentPage('page6')}
            className={`flex-1 min-w-[240px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-none text-xs font-black transition-all cursor-pointer ${
              currentPage === 'page6'
                ? 'bg-slate-900 text-white shadow-xs border border-slate-950'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>6. Process Improvement & Digitalization</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* PAGE 1: EXECUTIVE DASHBOARD (ALL RECTANGULAR & POPUP TREES) */}
        {/* ========================================================= */}
        {currentPage === 'page1' && (
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
        {/* PAGE 2: PROCUREMENT SAVING DETAILS (SEGMENT 2) */}
        {/* ========================================================= */}
        {currentPage === 'page2' && <ProcurementSavingsPage />}

        {/* ========================================================= */}
        {/* PAGE 3: ACTIVE PROFILE & AVL STATUS (SEGMENT 3) */}
        {/* ========================================================= */}
        {currentPage === 'page3' && <ActiveProfileAvlPage />}

        {/* ========================================================= */}
        {/* PAGE 4: UNDER DEVELOPMENT ALL DETAILS (SEGMENT 4) */}
        {/* ========================================================= */}
        {currentPage === 'page4' && <UnderDevelopmentPage />}

        {/* ========================================================= */}
        {/* PAGE 5: INDENTOR INQUIRIES, QUOTATIONS & EMAIL EXTRACTOR (SEGMENT 5) */}
        {/* ========================================================= */}
        {currentPage === 'page5' && <VendorInquiriesQuotesPage />}

        {/* ========================================================= */}
        {/* PAGE 6: PROCESS IMPROVEMENT & DIGITAL TRANSFORMATION INITIATIVES */}
        {/* ========================================================= */}
        {currentPage === 'page6' && (
          <div className="space-y-6">
            <ProcessImprovementSection />
          </div>
        )}


      </main>

      {/* Global Footer */}
      <footer className="mt-12 bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AtcoLogo className="w-6 h-6" />
            <span className="font-bold text-slate-200">Atco Laboratory Limited</span>
            <span>• Commercial Procurement, Import & Strategic Sourcing Intelligence</span>
          </div>
          <div className="text-right font-medium text-slate-300">
            Prepared By: <span className="font-bold text-white">Yasarat Tariq</span> from Sourcing Department
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
  return (
    <DataProvider>
      <DashboardContent />
    </DataProvider>
  );
}
