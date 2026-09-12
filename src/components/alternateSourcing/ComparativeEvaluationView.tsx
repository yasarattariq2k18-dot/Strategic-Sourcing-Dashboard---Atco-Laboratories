import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Download,
  ExternalLink,
  ShieldCheck,
  Building,
  Filter,
  Folder,
  FileText,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { exportComparativeEvaluationExcel } from '../../utils/alternateSourcingExcel';
import { IndentorQuoteResponse, InquiryMaterialItem } from '../../types';
import { VendorDocsModal } from './VendorDocsModal';
import { AtcoSpecPreviewModal } from './AtcoSpecPreviewModal';

interface ComparativeEvaluationViewProps {
  onOpenAiReviewModal: (materialId?: string) => void;
}

export const ComparativeEvaluationView: React.FC<ComparativeEvaluationViewProps> = ({
  onOpenAiReviewModal,
}) => {
  const { materials, indentors, header } = useInquiry();
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('all');
  const [shortlistedVendorMap, setShortlistedVendorMap] = useState<Record<string, string>>({
    'mat-1': 'frabbi', // Neomycin: North China Pharma (Frabbi)
    'mat-2': 'frabbi', // Nicotinamide: Luwei (Frabbi)
    'mat-3': 'dawn',   // Paracetamol: Farmson (Dawn)
    'mat-4': 'morgan', // Esomeprazole: Hetero (Morgan)
  });

  // Modal states
  const [activeVendorDocsQuote, setActiveVendorDocsQuote] = useState<{
    material: InquiryMaterialItem;
    quote: IndentorQuoteResponse;
  } | null>(null);

  const [activeSpecMaterial, setActiveSpecMaterial] = useState<InquiryMaterialItem | null>(null);

  const filteredMaterials =
    selectedMaterialId === 'all'
      ? materials
      : materials.filter((m) => m.id === selectedMaterialId);

  const toggleShortlist = (materialId: string, indentorId: string) => {
    setShortlistedVendorMap((prev) => ({
      ...prev,
      [materialId]: prev[materialId] === indentorId ? '' : indentorId,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Select Material to Compare:</span>
          </div>
          <select
            value={selectedMaterialId}
            onChange={(e) => setSelectedMaterialId(e.target.value)}
            className="text-xs p-2 border border-slate-300 rounded-lg bg-white font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          >
            <option value="all">Compare All Inquired Materials ({materials.length})</option>
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.materialCode} - {m.materialName} ({m.annualQty.toLocaleString()} {m.uom})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAiReviewModal(selectedMaterialId !== 'all' ? selectedMaterialId : undefined)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Run Executive AI Sourcing Review</span>
          </button>
          <button
            onClick={() => exportComparativeEvaluationExcel(materials, indentors, header.title)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Comparative Matrix .xlsx</span>
          </button>
        </div>
      </div>

      {/* Comparative Cards / Tables for each Material */}
      {filteredMaterials.map((mat) => {
        const submittedResponses = (Object.values(mat.responses || {}) as IndentorQuoteResponse[]).filter(
          (r) => r.status === 'SUBMITTED'
        );

        // Sort by lowest price
        const sortedResponses = [...submittedResponses].sort(
          (a, b) => (a.quotedRateNumeric || 9999) - (b.quotedRateNumeric || 9999)
        );

        const benchmark = mat.benchmarkPriceUSD || sortedResponses[0]?.quotedRateNumeric || 0;
        const currentShortlist = shortlistedVendorMap[mat.id];

        return (
          <div
            key={mat.id}
            className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden"
          >
            {/* Material Banner Header */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs bg-blue-600 px-2 py-0.5 rounded font-bold">
                    {mat.materialCode}
                  </span>
                  <h3 className="text-base font-bold tracking-tight">
                    {mat.materialName}
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase font-semibold">
                    {mat.apiExp} • {mat.shipmentMode}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    mat.importOrLocal === 'LOCAL'
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                      : 'bg-blue-900/60 text-blue-300 border border-blue-700'
                  }`}>
                    {mat.importOrLocal || 'IMPORT'}
                  </span>

                  {/* Atco Specs Document Link */}
                  <button
                    onClick={() => setActiveSpecMaterial(mat)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 transition-colors shadow-xs"
                    title="View & Download Official Atco Test Parameters & Specs"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>📄 View/Download Atco Specs</span>
                  </button>
                </div>

                <div className="text-xs text-slate-400 mt-1.5 flex flex-wrap items-center gap-4">
                  <span>Annual Demand: <strong className="text-slate-200">{mat.annualQty.toLocaleString()} {mat.uom}</strong></span>
                  <span>Batch Lot Size: <strong className="text-slate-200">{mat.perLotQty.toLocaleString()} {mat.uom}</strong></span>
                  {mat.lastBuyingPriceUSD !== undefined ? (
                    <span className="bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded border border-amber-800/80 font-mono text-[11px]">
                      🔒 Last Buying Price: <strong>${mat.lastBuyingPriceUSD.toFixed(2)}/KG</strong>
                    </span>
                  ) : (
                    <span>Target Benchmark: <strong className="text-emerald-400 font-mono">${benchmark.toFixed(2)}/KG</strong></span>
                  )}
                  <span>Active AVL: <strong className="text-slate-300">{mat.activeMfgs || 'None'}</strong></span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Submissions Received</span>
                <span className="text-base font-bold text-emerald-400">
                  {submittedResponses.length} of {indentors.length} Indenters Quoted
                </span>
              </div>
            </div>

            {/* If no responses */}
            {submittedResponses.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No quotations submitted by designated indentors for this material yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] whitespace-nowrap">
                      <th className="py-2.5 px-3 border-r border-slate-200 min-w-[170px]">Indentor & Maker</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 min-w-[120px]">Origin & Terms</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 text-right min-w-[110px]">Quoted Rate ($/KG)</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 text-right min-w-[130px] bg-slate-50">
                        Price Variance vs LBP (%)
                      </th>
                      <th className="py-2.5 px-3 border-r border-slate-200 text-right min-w-[130px] bg-slate-50">
                        Commercial Impact ($)
                      </th>
                      <th className="py-2.5 px-3 border-r border-slate-200 text-center min-w-[130px] bg-blue-50/50 text-blue-900 font-bold">
                        Vendor Docs Received
                      </th>
                      <th className="py-2.5 px-3 border-r border-slate-200 min-w-[140px]">Sample Commitments</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 min-w-[120px]">COA & Specs Ack</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 min-w-[130px]">Accreditations</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 min-w-[130px]">Dossier & Stability</th>
                      <th className="py-2.5 px-3 border-r border-slate-200 min-w-[110px] text-center">Cloud Drive</th>
                      <th className="py-2.5 px-3 text-center min-w-[110px]">Strategic Award</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {sortedResponses.map((resp, idx) => {
                      const isLowest = idx === 0;
                      const lbp = mat.lastBuyingPriceUSD || benchmark;
                      const priceDiff = resp.quotedRateNumeric - lbp;
                      const variancePct = lbp ? (priceDiff / lbp) * 100 : 0;
                      const commercialImpact = priceDiff * mat.annualQty; // negative is savings
                      const isShortlisted = currentShortlist === resp.indentorId;
                      const docsCount = resp.uploadedDocs?.length || 0;

                      return (
                        <tr
                          key={resp.indentorId}
                          className={`transition-colors ${
                            isShortlisted
                              ? 'bg-blue-50/60 font-medium'
                              : isLowest
                              ? 'bg-emerald-50/40'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          {/* Indentor & Maker */}
                          <td className="py-3 px-3 border-r border-slate-200">
                            <div className="font-bold text-slate-900">{resp.indentorName}</div>
                            <div className="text-[11px] text-blue-700 font-semibold mt-0.5">
                              Maker: {resp.manufacturerName}
                            </div>
                            {resp.supplierName && (
                              <div className="text-[10px] text-slate-500">
                                Exporter: {resp.supplierName}
                              </div>
                            )}
                          </td>

                          {/* Origin & Incoterm */}
                          <td className="py-3 px-3 border-r border-slate-200">
                            <span className="font-medium text-slate-800">{resp.mfgOrigin}</span>
                            <span className="text-[10px] block text-slate-500 font-mono">
                              {resp.incoterm} • Lead: {resp.leadTimeWeeks || 4} wks
                            </span>
                          </td>

                          {/* Quoted Rate */}
                          <td className="py-3 px-3 border-r border-slate-200 text-right">
                            <span className="text-sm font-bold font-mono text-slate-900">
                              ${resp.quotedRateNumeric.toFixed(2)}
                            </span>
                            <span className="text-[10px] block text-slate-500">per {mat.uom}</span>
                          </td>

                          {/* Price Variance vs Last Buying Price */}
                          <td className="py-3 px-3 border-r border-slate-200 text-right bg-slate-50/50">
                            <div
                              className={`inline-flex items-center gap-1 font-bold font-mono text-xs px-2 py-0.5 rounded ${
                                variancePct < 0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : variancePct > 0
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {variancePct < 0 ? (
                                <>
                                  <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{variancePct.toFixed(1)}%</span>
                                </>
                              ) : variancePct > 0 ? (
                                <>
                                  <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                                  <span>+{variancePct.toFixed(1)}%</span>
                                </>
                              ) : (
                                <span>0.0%</span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              {variancePct < 0 ? 'Price Reduction' : variancePct > 0 ? 'Price Increase' : 'Parity'}
                            </span>
                          </td>

                          {/* Total Commercial Impact */}
                          <td className="py-3 px-3 border-r border-slate-200 text-right bg-slate-50/50">
                            <div
                              className={`font-bold font-mono text-xs ${
                                commercialImpact < 0
                                  ? 'text-emerald-700'
                                  : commercialImpact > 0
                                  ? 'text-rose-600'
                                  : 'text-slate-700'
                              }`}
                            >
                              {commercialImpact < 0
                                ? `-$${Math.round(Math.abs(commercialImpact)).toLocaleString()}`
                                : commercialImpact > 0
                                ? `+$${Math.round(commercialImpact).toLocaleString()}`
                                : '$0'}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              {commercialImpact < 0 ? 'Annual Cost Saving' : commercialImpact > 0 ? 'Cost Addition' : 'Neutral'}
                            </span>
                          </td>

                          {/* Vendor Docs Received Icon / Badge */}
                          <td className="py-3 px-3 border-r border-slate-200 text-center bg-blue-50/20">
                            {docsCount > 0 ? (
                              <button
                                onClick={() => setActiveVendorDocsQuote({ material: mat, quote: resp })}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold text-[11px] transition-colors shadow-xs border border-blue-300 group cursor-pointer"
                                title="Click to view all submitted vendor certificates & documents"
                              >
                                <Folder className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
                                <span>Docs Received ({docsCount})</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => setActiveVendorDocsQuote({ material: mat, quote: resp })}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600 transition-colors cursor-pointer"
                                title="No documents attached to this quotation"
                              >
                                <Folder className="w-3.5 h-3.5 text-slate-400" />
                                <span>No Docs</span>
                              </button>
                            )}
                          </td>

                          {/* Sample Quantities Commitment */}
                          <td className="py-3 px-3 border-r border-slate-200 text-[11px]">
                            <div>
                              1st Lot: <strong className="text-slate-800">{resp.sample1stLotAck || 'Ack'}</strong>
                            </div>
                            <div>
                              2nd Lot: <strong className="text-slate-800">{resp.sample2ndLotAck || 'Ack'}</strong>
                            </div>
                            {resp.sample1stLotRemarks && (
                              <span className="text-[10px] text-slate-500 block truncate max-w-xs" title={resp.sample1stLotRemarks}>
                                {resp.sample1stLotRemarks}
                              </span>
                            )}
                          </td>

                          {/* COA & Audit */}
                          <td className="py-3 px-3 border-r border-slate-200 text-[11px]">
                            <div className="flex items-center gap-1">
                              <span className="text-slate-500">COA:</span>
                              <strong className={resp.coaAck === 'Yes' ? 'text-emerald-700' : 'text-amber-700'}>
                                {resp.coaAck || 'Ack'}
                              </strong>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-slate-500">Audit Ack:</span>
                              <strong className="text-slate-800">{resp.auditAck || 'Ack'}</strong>
                            </div>
                          </td>

                          {/* Accreditations */}
                          <td className="py-3 px-3 border-r border-slate-200 text-[11px]">
                            <div className="flex flex-wrap gap-1">
                              {resp.certUsFda === 'YES' && (
                                <span className="px-1 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                                  US FDA
                                </span>
                              )}
                              {resp.certCep === 'YES' && (
                                <span className="px-1 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                                  CEP
                                </span>
                              )}
                              {resp.certTgaKdmfJdmfAnvisa === 'YES' && (
                                <span className="px-1 py-0.2 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                                  Anvisa/TGA
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Dossier & Stability */}
                          <td className="py-3 px-3 border-r border-slate-200 text-[11px]">
                            <div className="flex items-center gap-1">
                              <span className="text-slate-500">DMF:</span>
                              <strong className="text-slate-800">
                                {resp.dmfOpen === 'YES' ? 'Open Part' : 'No DMF'}
                              </strong>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-slate-500">Zone IV:</span>
                              <strong className={resp.stabilityLongTermZoneIV === 'YES' ? 'text-emerald-700' : 'text-slate-600'}>
                                {resp.stabilityLongTermZoneIV === 'YES' ? 'Zone IVb 36M' : 'Pending'}
                              </strong>
                            </div>
                          </td>

                          {/* Google Drive Link */}
                          <td className="py-3 px-3 border-r border-slate-200 text-center">
                            {resp.googleDriveFolderLink ? (
                              <a
                                href={resp.googleDriveFolderLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 px-2 py-1 rounded border border-blue-200"
                              >
                                <span>Drive Dossier</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-slate-400 text-[10px]">No Link</span>
                            )}
                          </td>

                          {/* Strategic Shortlist Button */}
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => toggleShortlist(mat.id, resp.indentorId)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isShortlisted
                                  ? 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}

      {/* Vendor Docs Modal */}
      {activeVendorDocsQuote && (
        <VendorDocsModal
          isOpen={!!activeVendorDocsQuote}
          onClose={() => setActiveVendorDocsQuote(null)}
          materialCode={activeVendorDocsQuote.material.materialCode}
          materialName={activeVendorDocsQuote.material.materialName}
          vendorQuote={activeVendorDocsQuote.quote}
        />
      )}

      {/* Atco Official Specs Preview Modal */}
      {activeSpecMaterial && (
        <AtcoSpecPreviewModal
          isOpen={!!activeSpecMaterial}
          onClose={() => setActiveSpecMaterial(null)}
          materialCode={activeSpecMaterial.materialCode}
          materialName={activeSpecMaterial.materialName}
          specDoc={activeSpecMaterial.atcoSpecsDoc}
        />
      )}
    </div>
  );
};
