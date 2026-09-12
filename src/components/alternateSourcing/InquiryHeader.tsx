import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  Upload,
  Download,
  Send,
  FileSpreadsheet,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  Lock,
  Building2,
  Info,
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { downloadMasterInquiryTemplate, exportComparativeEvaluationExcel } from '../../utils/alternateSourcingExcel';

interface InquiryHeaderProps {
  onOpenUploadModal: () => void;
  onOpenAiReviewModal: () => void;
}

export const InquiryHeader: React.FC<InquiryHeaderProps> = ({
  onOpenUploadModal,
  onOpenAiReviewModal,
}) => {
  const {
    header,
    materials,
    indentors,
    activeRole,
    activeIndentorId,
    activeIndentor,
    activeViewTab,
    setActiveViewTab,
    setActiveRole,
    setActiveIndentorId,
    publishInquiry,
    resetToDefaultInquiry,
    stats,
  } = useInquiry();

  const handleExportComparative = () => {
    exportComparativeEvaluationExcel(materials, indentors, header.title);
  };

  const handlePublish = async () => {
    if (window.confirm('Are you sure you want to PUBLISH this inquiry to all designated indentors? They will immediately receive access to their restricted view.')) {
      await publishInquiry();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden mb-6">
      {/* Top Banner: Role Selection & Security Status */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Role Switching Segmented Control */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active Security View:
          </span>
          <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
            <button
              onClick={() => setActiveRole('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeRole === 'admin'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ADMIN (Procurement Lead)</span>
            </button>
            <button
              onClick={() => setActiveRole('indenter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeRole === 'indenter'
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>INDENTER (Restricted Vendor View)</span>
            </button>
          </div>
        </div>

        {/* Right: If Indenter, show Indenter Profile Selector */}
        {activeRole === 'indenter' ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-medium">Logged in as:</span>
            <select
              value={activeIndentorId}
              onChange={(e) => setActiveIndentorId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
            >
              {indentors.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.name} ({ind.repName})
                </option>
              ))}
            </select>
            <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-sm">
              <Lock className="w-3 h-3 text-emerald-400" />
              Restricted Profile
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs bg-blue-950 text-blue-300 border border-blue-800 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Full Master Access (Internal Tracking Columns Visible)
            </span>
          </div>
        )}
      </div>

      {/* Role Context Warning Bar */}
      {activeRole === 'indenter' ? (
        <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-2.5 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Indenter Restricted Portal:</strong> You are viewing inquiry line items designated for{' '}
              <strong>{activeIndentor?.name}</strong>. Internal Atco columns (Active MFGs, Customs Data, Under Dev Status) are strictly hidden.
            </span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Submissions are locked per line item upon clicking &ldquo;Submit Line Item&rdquo;.
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border-b border-amber-100 px-5 py-2 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Admin Procurement Lead Mode:</strong> You can append internal data (Active MFGs, WeBOC Customs Data, Under Dev Stage), publish live RFQs, and evaluate comparative bids side-by-side.
            </span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold uppercase tracking-wider">
            Inquiry ID: {header.inquiryNumber}
          </span>
        </div>
      )}

      {/* Main Header Information & Controls */}
      <div className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {header.title}
              </h2>
              <span
                className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  header.status === 'PUBLISHED'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}
              >
                {header.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-3xl">
              {header.notes}
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {activeRole === 'admin' ? (
              <>
                <button
                  onClick={onOpenUploadModal}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                  title="Upload Excel matching Image 1 format"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Master Excel</span>
                </button>

                <button
                  onClick={downloadMasterInquiryTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition-colors"
                  title="Download clean Excel template"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Template .xlsx</span>
                </button>

                {header.status !== 'PUBLISHED' ? (
                  <button
                    onClick={handlePublish}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Inquiry</span>
                  </button>
                ) : (
                  <button
                    onClick={() => publishInquiry()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-medium cursor-default"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live to Indenters</span>
                  </button>
                )}

                <button
                  onClick={handleExportComparative}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                  title="Export Side-by-Side Comparative Statement to Excel"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export Comparative Statement</span>
                </button>

                <button
                  onClick={onOpenAiReviewModal}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                  title="Executive Manufacturer Recommendation AI Analysis"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Sourcing Advisory</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset Alternate Sourcing Inquiry to default sample records?')) {
                      resetToDefaultInquiry();
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                  title="Reset sample inquiry data"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={downloadMasterInquiryTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Spec Sheet</span>
                </button>
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-medium">
                  {stats.totalLineItemsSubmitted} of {materials.length} Materials Submitted
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sub-Tabs: Navigation between Data Grid, Comparative Statement, and Compliance Tracker */}
        <div className="flex items-center justify-between pt-3 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveViewTab('grid')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeViewTab === 'grid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              1. Inquiry Dynamic Data Grid {activeRole === 'admin' ? '(Admin View)' : '(Indenter View)'}
            </button>
            <button
              onClick={() => setActiveViewTab('comparative')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeViewTab === 'comparative'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              2. Side-by-Side Comparative Evaluation Statement
            </button>
            <button
              onClick={() => setActiveViewTab('compliance')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeViewTab === 'compliance'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              3. Vendor Compliance & Technical Dossier Matrix
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="hidden md:flex items-center gap-4 text-xs">
            <span className="text-slate-500">
              Inquired Materials: <strong className="text-slate-800">{stats.totalMaterials}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              Quotes Submitted: <strong className="text-emerald-700">{stats.totalLineItemsSubmitted}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              Est. Annual Savings: <strong className="text-emerald-700 font-bold">${stats.totalPotentialSavingsUSD.toLocaleString()}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
