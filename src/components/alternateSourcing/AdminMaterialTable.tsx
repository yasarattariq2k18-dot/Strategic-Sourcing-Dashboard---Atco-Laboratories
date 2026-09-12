import React, { useState } from 'react';
import {
  ShieldAlert,
  Edit2,
  Trash2,
  Plus,
  TrendingDown,
  Eye,
  CheckCircle2,
  Clock,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Folder,
  FileText,
} from 'lucide-react';
import { InquiryMaterialItem, IndentorQuoteResponse } from '../../types';
import { useInquiry } from '../../context/InquiryContext';
import { AtcoSpecPreviewModal } from './AtcoSpecPreviewModal';
import { VendorDocsModal } from './VendorDocsModal';

interface AdminMaterialTableProps {
  onSelectMaterialForComparison?: (materialId: string) => void;
  onOpenAddMaterialModal: () => void;
}

export const AdminMaterialTable: React.FC<AdminMaterialTableProps> = ({
  onSelectMaterialForComparison,
  onOpenAddMaterialModal,
}) => {
  const { materials, updateAdminColumns, deleteMaterialItem, indentors } = useInquiry();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [selectedSpecMaterial, setSelectedSpecMaterial] = useState<InquiryMaterialItem | null>(null);
  const [selectedVendorQuote, setSelectedVendorQuote] = useState<{
    material: InquiryMaterialItem;
    quote: IndentorQuoteResponse;
  } | null>(null);

  // Editing state for internal admin columns
  const [editForm, setEditForm] = useState<{
    importOrLocal: 'IMPORT' | 'LOCAL';
    lastBuyingPriceUSD: number;
    activeMfgs: string;
    customDataMfgs: string;
    underDevelopmentStatus: any;
    benchmarkPriceUSD: number;
  }>({
    importOrLocal: 'IMPORT',
    lastBuyingPriceUSD: 0,
    activeMfgs: '',
    customDataMfgs: '',
    underDevelopmentStatus: 'Pending Inquiry',
    benchmarkPriceUSD: 0,
  });

  const startEditing = (mat: InquiryMaterialItem) => {
    const historicalPrice = mat.lastBuyingPriceUSD !== undefined ? mat.lastBuyingPriceUSD : (mat.benchmarkPriceUSD || 0);
    setEditingId(mat.id);
    setEditForm({
      importOrLocal: (mat.importOrLocal as 'IMPORT' | 'LOCAL') || 'IMPORT',
      lastBuyingPriceUSD: historicalPrice,
      activeMfgs: mat.activeMfgs || '',
      customDataMfgs: mat.customDataMfgs || '',
      underDevelopmentStatus: mat.underDevelopmentStatus || 'Pending Inquiry',
      benchmarkPriceUSD: historicalPrice,
    });
  };

  const saveEditing = (id: string) => {
    updateAdminColumns(id, {
      ...editForm,
      benchmarkPriceUSD: editForm.lastBuyingPriceUSD || editForm.benchmarkPriceUSD,
    });
    setEditingId(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Master Inquiry Specification Sheet & Internal Tracking
            </h3>
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              {materials.length} Materials Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin View includes confidential internal columns: <strong>Active MFGs</strong>, <strong>WeBOC Customs Import Rates</strong>, and <strong>Under Development Pipeline Status</strong>.
          </p>
        </div>

        <button
          onClick={onOpenAddMaterialModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Material Line Item</span>
        </button>
      </div>

      {/* Main High-Density Table with Color-Coded Header Banners */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            {/* Top Level Category Banner Matching Image 1 */}
            <tr className="text-white text-center font-bold tracking-wider uppercase text-[11px] select-none">
              <th colSpan={7} className="bg-blue-900 border-r border-blue-800 py-2.5 px-3">
                1. MATERIAL RELATED BASIC INFORMATION
              </th>
              <th colSpan={2} className="bg-indigo-900 border-r border-indigo-800 py-2.5 px-3">
                2. TOP MFGS AND TARGET ORIGIN (FOR REFERENCE ONLY)
              </th>
              <th colSpan={1} className="bg-cyan-900 border-r border-cyan-800 py-2.5 px-3">
                3. ATCO REQUIRED SOURCES
              </th>
              <th colSpan={2} className="bg-sky-900 border-r border-sky-800 py-2.5 px-3">
                4. PROPOSED REQUIRED SAMPLE QTY
              </th>
              <th colSpan={3} className="bg-amber-800 border-r border-amber-700 py-2.5 px-3 text-amber-100">
                🔒 5. INTERNAL ATCO ADMIN TRACKING (HIDDEN FROM INDENTORS)
              </th>
              <th colSpan={3} className="bg-emerald-900 py-2.5 px-3">
                6. INDENTER RESPONSES & ACTIONS
              </th>
            </tr>

            {/* Second Row: Specific Column Names */}
            <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-[11px] whitespace-nowrap">
              {/* Basic Info */}
              <th className="py-2.5 px-3 border-r border-slate-200 w-24">Material Code</th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[200px]">Material Name</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-right w-20">Annual Qty</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-right w-20">Per Lot Qty</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center w-12">UOM</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center w-16">Shipment Mode</th>
              <th className="py-2.5 px-3 border-r border-blue-200 text-center w-16">API / EXP</th>

              {/* Top Mfgs */}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[240px]">
                Prefer Mfg (Reference only)
              </th>
              <th className="py-2.5 px-3 border-r border-indigo-200 min-w-[140px]">
                Prefer Origin
              </th>

              {/* Atco Required Sources */}
              <th className="py-2.5 px-3 border-r border-cyan-200 min-w-[150px]">
                Atco Preferred Origin
              </th>

              {/* Sample Qty */}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[130px]">
                Approx Initial Sample (1st Lot + WS)
              </th>
              <th className="py-2.5 px-3 border-r border-sky-200 min-w-[130px]">
                Approx Trial Sample (2nd Lot)
              </th>

              {/* Internal Admin Columns */}
              <th className="py-2.5 px-3 border-r border-slate-200 bg-amber-50 text-amber-950 font-bold min-w-[180px]">
                Active MFGs (Approved AVL)
              </th>
              <th className="py-2.5 px-3 border-r border-slate-200 bg-amber-50 text-amber-950 font-bold min-w-[200px]">
                Customs Data (WeBOC/PRAL)
              </th>
              <th className="py-2.5 px-3 border-r border-amber-200 bg-amber-50 text-amber-950 font-bold min-w-[150px]">
                Under Dev Status
              </th>

              {/* Responses & Actions */}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[160px]">
                Indenter Submissions
              </th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-right min-w-[120px]">
                Best Quote & Savings
              </th>
              <th className="py-2.5 px-3 text-center w-28">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {materials.map((mat) => {
              const isEditing = editingId === mat.id;
              const isExpanded = expandedRowId === mat.id;
              const submittedQuotes = (Object.values(mat.responses || {}) as IndentorQuoteResponse[]).filter(
                (r) => r.status === 'SUBMITTED'
              );

              // Find lowest rate
              let lowestQuote: IndentorQuoteResponse | null = null;
              if (submittedQuotes.length > 0) {
                lowestQuote = [...submittedQuotes].sort(
                  (a, b) => (a.quotedRateNumeric || 9999) - (b.quotedRateNumeric || 9999)
                )[0] || null;
              }

              const benchmark = mat.benchmarkPriceUSD || lowestQuote?.quotedRateNumeric || 0;
              const unitSaving = lowestQuote ? benchmark - lowestQuote.quotedRateNumeric : 0;
              const totalAnnualSavings = unitSaving > 0 ? unitSaving * mat.annualQty : 0;

              return (
                <React.Fragment key={mat.id}>
                  <tr className={`hover:bg-slate-50/80 transition-colors ${isExpanded ? 'bg-blue-50/40' : ''}`}>
                    {/* Basic Info */}
                    <td className="py-3 px-3 font-mono font-semibold text-slate-800 border-r border-slate-200">
                      {mat.materialCode}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900 border-r border-slate-200">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => setExpandedRowId(isExpanded ? null : mat.id)}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="Toggle vendor responses"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="font-semibold">{mat.materialName}</span>
                        {mat.atcoSpecsDoc && (
                          <button
                            onClick={() => setSelectedSpecMaterial(mat)}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-[10px] font-bold border border-cyan-300 transition-colors cursor-pointer"
                            title={`Atco Specification Monograph: ${mat.atcoSpecsDoc.fileName} (${Math.round(mat.atcoSpecsDoc.matchScore * 100)}% Match)`}
                          >
                            <FileText className="w-3 h-3 text-cyan-600" />
                            <span>Specs Linked</span>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 border-r border-slate-200">
                      {mat.annualQty.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 border-r border-slate-200">
                      {mat.perLotQty.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-600 font-semibold border-r border-slate-200">
                      {mat.uom}
                    </td>
                    <td className="py-3 px-3 text-center border-r border-slate-200">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          mat.shipmentMode === 'AIR'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {mat.shipmentMode}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center border-r border-blue-200">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {mat.apiExp}
                      </span>
                    </td>

                    {/* Top Mfgs & Origins */}
                    <td className="py-3 px-3 text-slate-600 text-[11px] border-r border-slate-200 max-w-xs truncate" title={mat.preferMfg}>
                      {mat.preferMfg || '-'}
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-[11px] border-r border-indigo-200">
                      {mat.preferOrigin || '-'}
                    </td>

                    {/* Atco Required Sources */}
                    <td className="py-3 px-3 text-slate-700 font-medium text-[11px] border-r border-cyan-200 bg-cyan-50/20">
                      {mat.atcoPreferredOrigin || '-'}
                    </td>

                    {/* Sample Qty */}
                    <td className="py-3 px-3 text-slate-700 font-mono text-[11px] border-r border-slate-200">
                      {mat.approxInitialSampleQty}
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-mono text-[11px] border-r border-sky-200">
                      {mat.approxTrialSampleQty}
                    </td>

                    {/* Internal Admin Columns (Confidential) */}
                    <td className="py-3 px-3 border-r border-slate-200 bg-amber-50/50">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.activeMfgs}
                          onChange={(e) => setEditForm({ ...editForm, activeMfgs: e.target.value })}
                          className="w-full text-xs p-1 border border-amber-300 rounded bg-white text-slate-900"
                          placeholder="e.g. Sinopharm (China)"
                        />
                      ) : (
                        <span className="text-slate-800 font-medium text-[11px]">
                          {mat.activeMfgs || <span className="text-slate-400 italic">None logged</span>}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 border-r border-slate-200 bg-amber-50/50">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.customDataMfgs}
                          onChange={(e) => setEditForm({ ...editForm, customDataMfgs: e.target.value })}
                          className="w-full text-xs p-1 border border-amber-300 rounded bg-white text-slate-900"
                          placeholder="e.g. Customs rate: $28.40/KG"
                        />
                      ) : (
                        <span className="text-slate-700 text-[11px]">
                          {mat.customDataMfgs || <span className="text-slate-400 italic">No PRAL data</span>}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 border-r border-amber-200 bg-amber-50/50">
                      {isEditing ? (
                        <select
                          value={editForm.underDevelopmentStatus}
                          onChange={(e) => setEditForm({ ...editForm, underDevelopmentStatus: e.target.value as any })}
                          className="w-full text-xs p-1 border border-amber-300 rounded bg-white font-medium"
                        >
                          <option value="Pending Inquiry">Pending Inquiry</option>
                          <option value="Published">Published</option>
                          <option value="Sample Under Testing">Sample Under Testing</option>
                          <option value="At Stability">At Stability</option>
                          <option value="At PD Priority">At PD Priority</option>
                          <option value="Approved">Approved</option>
                          <option value="Under Arrangement">Under Arrangement</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            mat.underDevelopmentStatus === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : mat.underDevelopmentStatus === 'Sample Under Testing'
                              ? 'bg-purple-100 text-purple-800 border border-purple-300'
                              : mat.underDevelopmentStatus === 'At Stability'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-slate-100 text-slate-700 border border-slate-300'
                          }`}
                        >
                          {mat.underDevelopmentStatus}
                        </span>
                      )}
                    </td>

                    {/* Responses Received Summary */}
                    <td className="py-3 px-3 border-r border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            submittedQuotes.length > 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {submittedQuotes.length > 0 && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {submittedQuotes.length} / {indentors.length} Quoted
                        </span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {indentors.map((ind) => {
                          const hasSubmitted = mat.responses[ind.id]?.status === 'SUBMITTED';
                          return (
                            <span
                              key={ind.id}
                              title={`${ind.name}: ${hasSubmitted ? 'Quote Submitted' : 'Pending'}`}
                              className={`w-2 h-2 rounded-full ${
                                hasSubmitted ? 'bg-emerald-500' : 'bg-slate-300'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </td>

                    {/* Best Quote & Potential Savings */}
                    <td className="py-3 px-3 border-r border-slate-200 text-right">
                      {lowestQuote ? (
                        <div>
                          <div className="font-bold text-slate-900 font-mono">
                            ${lowestQuote.quotedRateNumeric.toFixed(2)}/KG
                          </div>
                          {totalAnnualSavings > 0 ? (
                            <div className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-0.5">
                              <TrendingDown className="w-3 h-3" />
                              Save ${Math.round(totalAnnualSavings).toLocaleString()}/yr
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500">Benchmark Match</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">Awaiting Bids</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {isEditing ? (
                          <button
                            onClick={() => saveEditing(mat.id)}
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditing(mat)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit Internal Columns"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => setExpandedRowId(isExpanded ? null : mat.id)}
                          className={`p-1.5 rounded transition-colors ${
                            isExpanded
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                          title="View received quotes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete material ${mat.materialName}?`)) {
                              deleteMaterialItem(mat.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete Material"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expandable Side-by-side Indenter Submissions Row */}
                  {isExpanded && (
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <td colSpan={18} className="p-4">
                        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                              <span>Vendor Quotations Received for:</span>
                              <span className="text-blue-600 font-mono">{mat.materialCode} - {mat.materialName}</span>
                            </h4>
                            <span className="text-xs text-slate-500">
                              Benchmark / Current Target: <strong>${benchmark.toFixed(2)}/KG</strong> | Annual Demand: <strong>{mat.annualQty.toLocaleString()} {mat.uom}</strong>
                            </span>
                          </div>

                          {submittedQuotes.length === 0 ? (
                            <div className="text-center py-6 text-slate-400 text-xs">
                              No Indenters have submitted quotations for this item yet. Responses will appear here in real-time.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {submittedQuotes.map((resp) => {
                                const isLowest = resp.quotedRateNumeric === lowestQuote?.quotedRateNumeric;
                                const diff = benchmark - resp.quotedRateNumeric;
                                const saving = diff * mat.annualQty;

                                return (
                                  <div
                                    key={resp.indentorId}
                                    className={`p-3.5 rounded-lg border text-xs transition-all ${
                                      isLowest
                                        ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-300'
                                        : 'bg-white border-slate-200'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <span className="font-bold text-slate-900 block">
                                          {resp.indentorName}
                                        </span>
                                        <span className="text-[10px] text-slate-500">
                                          Submitted: {new Date(resp.submittedAt || '').toLocaleDateString()}
                                        </span>
                                      </div>
                                      {isLowest && (
                                        <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold">
                                          Best Quote
                                        </span>
                                      )}
                                    </div>

                                    <div className="space-y-1.5 py-2 border-y border-slate-100 text-slate-700 text-[11px]">
                                      <div className="flex justify-between">
                                        <span className="text-slate-500">Proposed Maker:</span>
                                        <span className="font-semibold text-slate-900">{resp.manufacturerName} ({resp.mfgOrigin})</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-500">Quoted Rate:</span>
                                        <span className="font-bold font-mono text-slate-900">${resp.quotedRateNumeric.toFixed(2)}/KG ({resp.incoterm})</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-500">Net Annual Impact:</span>
                                        <span className={`font-bold ${saving >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                          {saving >= 0 ? `Save $${Math.round(saving).toLocaleString()}` : `Cost +$${Math.round(Math.abs(saving)).toLocaleString()}`}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-500">1st Lot / 2nd Lot Ack:</span>
                                        <span className="font-medium text-slate-800">{resp.sample1stLotAck || 'Pending'} / {resp.sample2ndLotAck || 'Pending'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-500">COA Ack / Audit Ack:</span>
                                        <span className="font-medium text-slate-800">{resp.coaAck || 'Pending'} / {resp.auditAck || 'Pending'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-500">Accreditations:</span>
                                        <span className="font-medium text-slate-800">
                                          FDA: {resp.certUsFda || 'NO'} | CEP: {resp.certCep || 'NO'}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Vendor Docs Received Icon/Button */}
                                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                                      <span className="text-[10px] text-slate-500">Vendor Documents:</span>
                                      {resp.uploadedDocs && resp.uploadedDocs.length > 0 ? (
                                        <button
                                          onClick={() => setSelectedVendorQuote({ material: mat, quote: resp })}
                                          className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded border border-blue-200 transition-colors cursor-pointer"
                                        >
                                          <Folder className="w-3 h-3 text-blue-600" />
                                          <span>Docs Received ({resp.uploadedDocs.length})</span>
                                        </button>
                                      ) : (
                                        <span className="text-[10px] text-slate-400 italic">No files attached</span>
                                      )}
                                    </div>

                                    {resp.googleDriveFolderLink && (
                                      <div className="mt-1 pt-1 flex items-center justify-between">
                                        <span className="text-[10px] text-slate-500">Technical Dossier:</span>
                                        <a
                                          href={resp.googleDriveFolderLink}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-600 hover:text-blue-800 font-semibold text-[10px] flex items-center gap-1"
                                        >
                                          <span>Google Drive Folder</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Atco Official Specs Preview Modal */}
      {selectedSpecMaterial && (
        <AtcoSpecPreviewModal
          isOpen={!!selectedSpecMaterial}
          onClose={() => setSelectedSpecMaterial(null)}
          materialCode={selectedSpecMaterial.materialCode}
          materialName={selectedSpecMaterial.materialName}
          specDoc={selectedSpecMaterial.atcoSpecsDoc}
        />
      )}

      {/* Vendor Docs Received Modal */}
      {selectedVendorQuote && (
        <VendorDocsModal
          isOpen={!!selectedVendorQuote}
          onClose={() => setSelectedVendorQuote(null)}
          materialCode={selectedVendorQuote.material.materialCode}
          materialName={selectedVendorQuote.material.materialName}
          vendorQuote={selectedVendorQuote.quote}
        />
      )}
    </div>
  );
};
