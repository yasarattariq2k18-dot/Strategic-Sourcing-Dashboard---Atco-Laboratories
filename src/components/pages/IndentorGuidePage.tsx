import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Video,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Building2,
  Clock,
  Layers,
  PhoneCall,
  Download,
} from 'lucide-react';
import { FlowChartModal } from '../indentor-guide/FlowChartModal';
import { TrainingVideoModal } from '../indentor-guide/TrainingVideoModal';
import { OriginalTrainingVideo } from '../indentor-guide/OriginalTrainingVideo';
import { SampleStatusDashboard } from '../indentor-guide/SampleStatusDashboard';

export const IndentorGuidePage: React.FC = () => {
  const [isFlowChartModalOpen, setIsFlowChartModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const lookerStudioDashboardUrl =
    'https://datastudio.google.com/u/0/reporting/55d1d74e-d36a-4e51-9bf6-27afd25a8552/page/2jhuF';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleAccordion = (key: string) => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* ========================================================= */}
      {/* 1. TOP HEADER & LANDING BANNER (EXACT USER SPECIFICATION) */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            CENTRALIZED ATCO STRATEGIC SOURCING S.O.P.
          </div>

          {/* H1 & H2 EXACT HEADERS */}
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-1">
            ALTERNATE SOURCE DEVELOPMENT
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-blue-400 tracking-normal mb-2">
            INDENTOR GUIDE
          </h2>
          <p className="text-sm md:text-base font-semibold text-slate-300 mb-4">
            From Manufacturer Identification to Commercialization
          </p>

          {/* EXACT INTRODUCTION QUOTE */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xs text-sm text-slate-200 leading-relaxed italic">
            “This guide provides a centralized reference for indentors to understand, follow and monitor the ATCO Alternate Source Development process. Please review the approved process flow, watch the training video, and use the Submitted Sample Status Dashboard to monitor the progress of submitted samples.”
          </div>
        </div>

        {/* ========================================================= */}
        {/* 10. QUICK ACCESS / ACTION AREA AT TOP */}
        {/* ========================================================= */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Quick Actions:
          </span>

          <button
            onClick={() => setIsFlowChartModalOpen(true)}
            id="quick-action-flowchart"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>📋 View Process Flow</span>
          </button>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            id="quick-action-video"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-xs"
          >
            <Video className="w-4 h-4" />
            <span>🎥 Watch Training Video</span>
          </button>

          <a
            href={lookerStudioDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="quick-action-dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
          >
            <BarChart3 className="w-4 h-4" />
            <span>📊 Open Sample Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 7. THREE CORE RESOURCE CARDS (INTERACTIVE & VISUALLY DISTINCT) */}
      {/* ========================================================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Core Resources for Alternate Source Development
          </h3>
          <span className="text-xs text-slate-400 font-medium">3 Master Tools</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 📋 CARD 01: Alternate Source Development Flow */}
          <div
            id="card-01-process-flow"
            className="bg-white rounded-xl p-6 shadow-xs border-2 border-blue-200 hover:border-blue-500 transition-all flex flex-col justify-between group hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-800">
                  Resource 01
                </span>
                <span className="text-xs text-slate-400 font-mono">FLOW CHART.pdf</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Alternate Source Development Flow
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                “View the complete approved process flow from manufacturer identification through commercialization.”
              </p>
            </div>

            <button
              onClick={() => setIsFlowChartModalOpen(true)}
              id="btn-card-view-process-flow"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              <span>View Process Flow</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 🎥 CARD 02: Indentor Training Video (POPS UP VIDEO MODAL) */}
          <div
            id="card-02-training-video"
            onClick={() => setIsVideoModalOpen(true)}
            className="bg-white rounded-xl p-6 shadow-xs border-2 border-purple-200 hover:border-purple-500 transition-all flex flex-col justify-between group hover:shadow-md cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-800">
                  Resource 02
                </span>
                <span className="text-xs text-slate-400 font-mono">Google Drive Video</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Indentor Training Video
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                “Watch the original training video explaining the Alternate Source Development process.”
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoModalOpen(true);
              }}
              id="btn-card-watch-training-video"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors"
            >
              <span>Watch Training Video</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 📊 CARD 03: Submitted Sample Status Dashboard */}
          <div
            id="card-03-sample-dashboard"
            className="bg-white rounded-xl p-6 shadow-xs border-2 border-emerald-200 hover:border-emerald-500 transition-all flex flex-col justify-between group hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  Resource 03
                </span>
                <span className="text-xs text-slate-400 font-mono">Looker Studio</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Submitted Sample Status Dashboard
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                “Access the dashboard to view the status and relevant information of submitted samples.”
              </p>
            </div>

            <a
              href={lookerStudioDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-card-open-sample-dashboard"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            >
              <span>Open Sample Dashboard</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 01: FLOW CHART SUMMARY CALLOUT */}
      {/* ========================================================= */}
      <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                  Resource 01
                </span>
                <span className="text-xs text-slate-500">Authoritative Master Document</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Alternate Source Development Flow (Approved Flow Chart)
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Contains the complete approved dual-swimlane process flow between <strong>ATCO</strong> and the <strong>INDENTOR/SUPPLIER END</strong>, including strict QC revision limits (Max 2), 1-month trial sample deadlines, Looker Studio SLA gates, and AVL qualification criteria.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFlowChartModalOpen(true)}
            id="btn-open-view-process-flow-callout"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
          >
            <span>View Process Flow</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. SECTION 02: ORIGINAL INDENTOR TRAINING VIDEO */}
      {/* ========================================================= */}
      <OriginalTrainingVideo onOpenModal={() => setIsVideoModalOpen(true)} />

      {/* ========================================================= */}
      {/* 6. SECTION 03: SUBMITTED SAMPLE STATUS DASHBOARD */}
      {/* ========================================================= */}
      <SampleStatusDashboard />

      {/* ========================================================= */}
      {/* 13. FUTURE EXPANSION MODULE (COLLAPSIBLE ACCORDIONS) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Approved Indentor Guidance & Resource Reference
            </h3>
            <p className="text-xs text-slate-500">
              Technical checklists, compliance standards, and regulatory requirements
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">Structured Reference</span>
        </div>

        <div className="space-y-3">
          {/* FAQ 1: Critical 2-Revision Rule */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('faq-revision-limit')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>What is the rule regarding QC observations on submitted COAs?</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'faq-revision-limit' ? 'rotate-90' : ''
                }`}
              />
            </button>
            {expandedSection === 'faq-revision-limit' && (
              <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                According to the approved process flow, <strong>Max 2 times observations are acceptable</strong>. If more than twice in COA revision occurs, the source will be discontinued for on-word alternate sourcing and a negative marking will be applied to the indentor.
              </div>
            )}
          </div>

          {/* FAQ 2: Google Drive Technical Dossier Checklist */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('faq-dossier-checklist')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span>What documents must be uploaded to the Google Drive folder before sample submission?</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'faq-dossier-checklist' ? 'rotate-90' : ''
                }`}
              />
            </button>
            {expandedSection === 'faq-dossier-checklist' && (
              <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200 space-y-2">
                <p>
                  Before submitting trial samples to the ATCO facility, the indentor must create a Google Drive link containing all mandatory checklist documents within 1 month from COA approval:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">1. Valid cGMP Certificate</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">2. Batch Certificate of Analysis (COA)</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">3. Drug Master File (Open DMF)</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">4. Stability Study Data (Zone IVb)</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">5. Residual Solvents Declaration</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">6. Nitrosamines Risk Assessment</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">7. BSE/TSE Free Declaration</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">8. Material Safety Data Sheet (MSDS)</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">9. Halal Certificate (if applicable)</div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">10. Vendor Questionnaire (VQ) Form</div>
                </div>
              </div>
            )}
          </div>

          {/* FAQ 3: Vendor Audit Waiver Criteria */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('faq-audit-waiver')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>When is a physical on-site vendor audit waived for AVL inclusion?</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'faq-audit-waiver' ? 'rotate-90' : ''
                }`}
              />
            </button>
            {expandedSection === 'faq-audit-waiver' && (
              <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                A vendor audit is automatically waived off for AVL inclusion if the manufacturer holds valid certification from recognized regulatory authorities:
                <div className="mt-2 p-3 bg-emerald-50 text-emerald-950 rounded-lg border border-emerald-200 font-semibold">
                  USFDA / PIC/s / MHRA / WHO / TGA / KDMF / JDM / ANVISA (Brazil)
                </div>
              </div>
            )}
          </div>

          {/* FAQ 4: Commercial Consignment Observation Rules */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion('faq-commercial-rules')}
              className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-900 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>What are the ongoing quality conditions after AVL inclusion?</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  expandedSection === 'faq-commercial-rules' ? 'rotate-90' : ''
                }`}
              />
            </button>
            {expandedSection === 'faq-commercial-rules' && (
              <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                The first commercial consignment will be executed as per ATCO shared commercial Batch Qty or Supplier MOQ. On subsequent orders, against any QC observations on commercial consignments, vendor must submit response within 1 week. <strong>A maximum of 2 times QC observations can be accepted</strong>; if exceeded, the manufacturer is set to Inactive status on the AVL.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2 & 3. FLOW CHART & TRAINING VIDEO MODAL POPUP WINDOWS */}
      {/* ========================================================= */}
      <FlowChartModal
        isOpen={isFlowChartModalOpen}
        onClose={() => setIsFlowChartModalOpen(false)}
      />

      <TrainingVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};
