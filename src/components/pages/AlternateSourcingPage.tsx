import React, { useState } from 'react';
import {
  SendHorizontal,
  Package,
  CheckCircle2,
  TrendingDown,
  Building2,
  ShieldCheck,
  FileSpreadsheet,
  DollarSign,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { InquiryProvider, useInquiry } from '../../context/InquiryContext';
import { InquiryHeader } from '../alternateSourcing/InquiryHeader';
import { AdminMaterialTable } from '../alternateSourcing/AdminMaterialTable';
import { IndenterMaterialTable } from '../alternateSourcing/IndenterMaterialTable';
import { ComparativeEvaluationView } from '../alternateSourcing/ComparativeEvaluationView';
import { ComplianceMatrixView } from '../alternateSourcing/ComplianceMatrixView';
import { ExcelUploadModal } from '../alternateSourcing/ExcelUploadModal';
import { AddMaterialModal } from '../alternateSourcing/AddMaterialModal';
import { AiSourcingModal } from '../alternateSourcing/AiSourcingModal';

const AlternateSourcingInner: React.FC = () => {
  const {
    header,
    materials,
    activeRole,
    activeViewTab,
    stats,
  } = useInquiry();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiReviewMatId, setAiReviewMatId] = useState<string | undefined>(undefined);

  const openAiReview = (materialId?: string) => {
    setAiReviewMatId(materialId);
    setIsAiModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 text-white rounded-lg shadow-xs">
              <SendHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Section 6: Alternate Sourcing Inquiry Portal
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Dynamic Role-Based RFQ Floating & Side-by-Side Comparative Evaluation System
              </p>
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
              header.status === 'PUBLISHED'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                header.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span>{header.status === 'PUBLISHED' ? 'Inquiry Live to Indenters' : 'Draft / Private'}</span>
          </span>
        </div>
      </div>

      {/* Real-time KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Inquired Materials
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">{stats.totalMaterials}</span>
              <span className="text-[10px] text-slate-400 font-medium">Line Items</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Designated Indenters
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">{stats.totalAssignedIndentors}</span>
              <span className="text-[10px] text-indigo-600 font-semibold">Authorized Agents</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Vendor Line Submissions
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-emerald-700">{stats.totalLineItemsSubmitted}</span>
              <span className="text-[10px] text-slate-500">
                ({Math.round((stats.totalLineItemsSubmitted / (stats.totalMaterials * stats.totalAssignedIndentors || 1)) * 100)}% coverage)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Identified Annual Savings
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-emerald-700 font-mono">
                ${stats.totalPotentialSavingsUSD.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">USD / Year</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Control Header (Role Switcher, Status & Action Toolbar) */}
      <InquiryHeader
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenAiReviewModal={() => openAiReview()}
      />

      {/* Sub-View Render Based on Tab and Active Role */}
      {activeViewTab === 'grid' && (
        activeRole === 'admin' ? (
          <AdminMaterialTable
            onOpenAddMaterialModal={() => setIsAddModalOpen(true)}
          />
        ) : (
          <IndenterMaterialTable />
        )
      )}

      {activeViewTab === 'comparative' && (
        <ComparativeEvaluationView
          onOpenAiReviewModal={openAiReview}
        />
      )}

      {activeViewTab === 'compliance' && (
        <ComplianceMatrixView />
      )}

      {/* Modals */}
      <ExcelUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <AddMaterialModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <AiSourcingModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        defaultMaterialId={aiReviewMatId}
      />
    </div>
  );
};

export const AlternateSourcingPage: React.FC = () => {
  return (
    <InquiryProvider>
      <AlternateSourcingInner />
    </InquiryProvider>
  );
};
