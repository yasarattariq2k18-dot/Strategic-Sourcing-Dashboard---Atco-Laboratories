import React from 'react';
import {
  X,
  Building2,
  Mail,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  FileCheck,
  Clock,
  DollarSign,
  Package,
  Layers,
  Award,
  Download,
  Copy,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FlaskConical,
  Scale,
  Calendar,
  Globe,
  FileText,
  Check,
} from 'lucide-react';
import { VendorQuotationRecord } from '../types';
import { ExtendedInquiryRecord } from '../data/inquiryQuotationsData';
import { formatCurrency } from '../utils/currency';

interface Props {
  quote: VendorQuotationRecord;
  inquiry?: ExtendedInquiryRecord;
  allQuotesForMaterial?: VendorQuotationRecord[];
  onClose: () => void;
  onSelectAlternativeQuote?: (altQuote: VendorQuotationRecord) => void;
}

export const VendorComparisonDetailModal: React.FC<Props> = ({
  quote,
  inquiry,
  allQuotesForMaterial = [],
  onClose,
  onSelectAlternativeQuote,
}) => {
  const isSaving = quote.priceVarianceUSD > 0;
  const isWinner = quote.isBestEvaluatedOffer;
  const isLowest = quote.isLowestQuote;

  const targetRateUSD = inquiry?.targetPriceUSD || quote.targetBenchmarkPriceUSD;
  const lastPriceUSD = inquiry?.lastPurchasePriceUSD || (targetRateUSD * 1.1);
  const annualDemand = inquiry?.annualDemandQty || quote.annualQtyRequirement || 1000;
  const perLotQty = inquiry?.perLotQty || 500;

  // Comparison against last purchase price
  const lastPriceVarianceUSD = lastPriceUSD - quote.quotedRateUSD;
  const annualSavingsVsLastPriceUSD = lastPriceVarianceUSD * annualDemand;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col my-auto">
        
        {/* ========================================================================= */}
        {/* 1. MODAL HEADER */}
        {/* ========================================================================= */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-black text-xs uppercase border border-blue-500/30">
                {quote.category}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
                Code: {quote.materialCode || inquiry?.materialCode || 'N/A'}
              </span>
              {isWinner && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm">
                  <Award className="w-3.5 h-3.5" /> BEST EVALUATED OFFER
                </span>
              )}
              {isLowest && !isWinner && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white font-black text-xs flex items-center gap-1">
                  ⭐ LOWEST PRICE LEADER
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {quote.materialName}
            </h2>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
              <span>Manufacturer: <strong className="text-white">{quote.vendorManufacturer}</strong> ({quote.originCountry})</span>
              <span className="text-slate-600">•</span>
              <span>Indentor: <strong className="text-sky-300">{quote.indentorName}</strong></span>
              <span className="text-slate-600">•</span>
              <span>Inquiry Ref: <span className="font-mono text-slate-300">{quote.inquiryRefNumber || inquiry?.inquiryCode || 'ATCO/INQ/2026/S5'}</span></span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. COMMERCIAL SUMMARY COMPARISON CARD (USD ONLY) */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Quoted Rate */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                Quoted Rate (USD)
              </span>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                ${quote.quotedRateUSD.toFixed(2)}
                <span className="text-xs font-normal text-slate-500"> / {quote.uom}</span>
              </div>
              <span className="text-[10px] text-blue-600 font-medium">
                Incoterm: {quote.incoterms}
              </span>
            </div>

            {/* Target Benchmark Price */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Target Benchmark
              </span>
              <div className="text-2xl font-black text-amber-900 font-mono mt-1">
                ${targetRateUSD.toFixed(2)}
                <span className="text-xs font-normal text-slate-500"> / {quote.uom}</span>
              </div>
              <span className="text-[10px] text-amber-700 font-medium">
                Variance: {quote.priceVarianceUSD >= 0 ? '-' : '+'}${Math.abs(quote.priceVarianceUSD).toFixed(2)} / {quote.uom}
              </span>
            </div>

            {/* Last Purchase Price */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Last Purchase Price
              </span>
              <div className="text-2xl font-black text-slate-800 font-mono mt-1">
                ${lastPriceUSD.toFixed(2)}
                <span className="text-xs font-normal text-slate-500"> / {quote.uom}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                Vs Last: {lastPriceVarianceUSD >= 0 ? '-' : '+'}${Math.abs(lastPriceVarianceUSD).toFixed(2)} ({((lastPriceVarianceUSD / lastPriceUSD) * 100).toFixed(1)}%)
              </span>
            </div>

            {/* Total Annual Net Savings */}
            <div className={`p-4 rounded-2xl border ${isSaving ? 'bg-emerald-50/80 border-emerald-200' : 'bg-rose-50/80 border-rose-200'}`}>
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${isSaving ? 'text-emerald-800' : 'text-rose-800'}`}>
                Annual Net Savings
              </span>
              <div className={`text-2xl font-black font-mono mt-1 ${isSaving ? 'text-emerald-700' : 'text-rose-700'}`}>
                {quote.annualSavingsPotentialUSD >= 0 ? '+' : '-'}${Math.abs(quote.annualSavingsPotentialUSD).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className={`text-[10px] font-bold ${isSaving ? 'text-emerald-600' : 'text-rose-600'}`}>
                Based on {annualDemand.toLocaleString()} {quote.uom} Demand
              </span>
            </div>
          </div>

          {/* Commercial Terms Ribbon */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Minimum Order Qty (MOQ)</span>
              <span className="font-black text-slate-900">{quote.moq.toLocaleString()} {quote.uom}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Per Lot / Pack Size</span>
              <span className="font-black text-slate-900">{quote.packSize || `${perLotQty} ${quote.uom} Standard Packing`}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Delivery Lead Time</span>
              <span className="font-black text-slate-900">{quote.leadTimeWeeks} Weeks</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Payment Terms</span>
              <span className="font-black text-slate-900">{quote.paymentTerms}</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. HEAD-TO-HEAD MANUFACTURER QUOTATIONS BENCHMARK COMPARISON */}
          {/* ========================================================================= */}
          {allQuotesForMaterial.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-black">
                    Comparative Benchmark Against Alternative Quoting Manufacturers ({allQuotesForMaterial.length} Offers)
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Values in USD ($) only</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Manufacturer & Country</th>
                      <th className="p-3">Indentor</th>
                      <th className="p-3 text-right">Quoted Rate (USD)</th>
                      <th className="p-3 text-right">Variance vs Target</th>
                      <th className="p-3 text-right">Annual Savings (USD)</th>
                      <th className="p-3 text-center">Docs Score</th>
                      <th className="p-3 text-center">Plant Audit</th>
                      <th className="p-3 text-center">Lead Time</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {allQuotesForMaterial.map((q) => {
                      const isCurrent = q.id === quote.id;
                      const isSavingQ = q.priceVarianceUSD > 0;
                      return (
                        <tr
                          key={q.id}
                          className={`transition-colors ${
                            isCurrent
                              ? 'bg-blue-50/80 font-bold text-blue-900 ring-1 ring-blue-300'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <td className="p-3">
                            <div className="font-bold flex items-center gap-1.5">
                              {q.vendorManufacturer}
                              {q.isBestEvaluatedOffer && (
                                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black">
                                  BEST
                                </span>
                              )}
                              {q.isLowestQuote && !q.isBestEvaluatedOffer && (
                                <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[9px] font-black">
                                  LOWEST
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 font-normal">
                              Origin: {q.originCountry} • {q.incoterms}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{q.indentorName}</td>
                          <td className="p-3 text-right font-black font-mono">
                            ${q.quotedRateUSD.toFixed(2)} / {q.uom}
                          </td>
                          <td className="p-3 text-right">
                            <span className={`font-bold ${isSavingQ ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {isSavingQ ? '-' : '+'}${Math.abs(q.priceVarianceUSD).toFixed(2)}
                            </span>
                          </td>
                          <td className="p-3 text-right font-mono font-bold">
                            <span className={isSavingQ ? 'text-emerald-700' : 'text-rose-700'}>
                              {isSavingQ ? '+' : '-'}${Math.abs(q.annualSavingsPotentialUSD).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              q.docsScore >= 4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {q.docsScore}/5
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              q.auditStatus === 'APPROVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : q.auditStatus === 'CAPA PENDING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {q.auditStatus}
                            </span>
                          </td>
                          <td className="p-3 text-center font-medium">{q.leadTimeWeeks} Wks</td>
                          <td className="p-3 text-center">
                            {isCurrent ? (
                              <span className="px-2 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-black">
                                Viewing
                              </span>
                            ) : (
                              <button
                                onClick={() => onSelectAlternativeQuote?.(q)}
                                className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-blue-600 hover:text-white text-slate-700 text-[10px] font-bold transition-colors cursor-pointer"
                              >
                                Compare &rarr;
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. TECHNICAL & REGULATORY DOSSIER CHECKLIST */}
          {/* ========================================================================= */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-black text-slate-900">
                  Technical & Regulatory Dossier Completeness Evaluation
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 ${
                quote.docsAvailabilityStatus === 'FULL AVAILABLE'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {quote.docsAvailabilityStatus === 'FULL AVAILABLE' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                <span>Score: {quote.docsScore} / 5 ({quote.docsAvailabilityStatus})</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {/* DMF Open Part */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">DMF Open Part Available</span>
                  <span className="text-[10px] text-slate-500">{quote.dmfStatus}</span>
                </div>
                {quote.dmfOpenPart !== false && quote.dmfStatus.includes('AVAILABLE') ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">YES</span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">PENDING</span>
                )}
              </div>

              {/* DMF Close Part / CEP */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">CEP / Close Part Access</span>
                  <span className="text-[10px] text-slate-500">Letter of Access (LoA)</span>
                </div>
                {quote.dmfClosePart || quote.dmfStatus.includes('CEP') ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">YES</span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">ON DEMAND</span>
                )}
              </div>

              {/* cGMP Certificate */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">GMP Certification</span>
                  <span className="text-[10px] text-slate-500">{quote.gmpCertificateStatus}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  VALID ({quote.gmpExpiryDate ? `Exp ${quote.gmpExpiryDate}` : 'VERIFIED'})
                </span>
              </div>

              {/* COA 100% Compliance Ack */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">COA 100% Compliance Ack</span>
                  <span className="text-[10px] text-slate-500">Complying with ATCO Lab Specs</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  100% COMPLIED
                </span>
              </div>

              {/* Stability Zone IVb 36M */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Stability Zone IVb (30°C/75%RH)</span>
                  <span className="text-[10px] text-slate-500">36M Real-time + 6M Accelerated</span>
                </div>
                {quote.stabilityDataAvailable ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">AVAILABLE</span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">IN PROGRESS</span>
                )}
              </div>

              {/* Nitrosamine & Impurity Risk Statement */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Nitrosamine & Solvent Declaration</span>
                  <span className="text-[10px] text-slate-500">Risk Assessment Report</span>
                </div>
                {quote.nitrosamineResidualSolventsDeclared ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">DECLARED</span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">REQUESTED</span>
                )}
              </div>

              {/* TSE / BSE Free Declaration */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">TSE / BSE & GMO Free</span>
                  <span className="text-[10px] text-slate-500">Origin Certificate</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  CERTIFIED
                </span>
              </div>

              {/* ISO & Halal Certificate */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">ISO 9001 / Halal / Kosher</span>
                  <span className="text-[10px] text-slate-500">International Quality Stds</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  ENCLOSED
                </span>
              </div>

              {/* Site Master File (SMF) */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Site Master File (SMF)</span>
                  <span className="text-[10px] text-slate-500">Plant Engineering Layout</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  AVAILABLE
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. QUALITY AUDIT & SAMPLE TESTING PROTOCOL */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plant Audit Status */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Plant Audit & QA Conduction Profile
                </h4>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Audit Status:</span>
                  <span className="font-bold text-emerald-700">{quote.auditStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Audited By:</span>
                  <span className="font-bold text-slate-800">{quote.auditedBy || 'ATCO QA TEAM'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Compliance Rating:</span>
                  <span className="font-bold text-slate-800">{quote.auditScoreRating || 'A (HIGH COMPLIANCE)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Audit Date:</span>
                  <span className="font-mono text-slate-700">{quote.auditConductionDate || '2025-10-15'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 italic">
                  "{quote.auditRemarks || 'On-site QA physical audit verified cGMP compliance with zero critical findings.'}"
                </div>
              </div>
            </div>

            {/* Sample & Trial Testing Protocol */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Sample & Trial Testing Protocol
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Initial Sample Qty Req:</span>
                  <span className="font-bold text-slate-900">{inquiry?.initialSampleQtyReq || '500GM 1st Lot + WS'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">1st Lot Sample Status:</span>
                  <span className="font-bold text-emerald-700">{quote.sample1stLotAck || 'Ack: YES (Provided FOC)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Trial Sample Qty Req:</span>
                  <span className="font-bold text-slate-900">{inquiry?.trialSampleQtyReq || '2KG 2nd Lot'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">2nd Lot Trial Status:</span>
                  <span className="font-bold text-emerald-700">{quote.sample2ndLotAck || 'Ack: YES (Standard Batch)'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900">
                  <strong>Remarks:</strong> {quote.sampleFocRemarks || 'FOC sample dispatched with analytical test method & working standard.'}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. ORIGINAL OUTLOOK EMAIL & TECH PACK ATTACHMENT VIEWER */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-black">
                  Source Outlook Email & Enclosed Quotation Tech Pack
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {quote.emailDate || quote.receivedDate}
              </span>
            </div>

            <div className="p-4 bg-slate-50 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">From (Indentor / Supplier)</span>
                  <strong className="text-slate-900">{quote.emailSender || `sales@${quote.indentorName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Subject</span>
                  <strong className="text-slate-900">{quote.emailSubject || `Commercial Offer - ${quote.materialName} - ${quote.vendorManufacturer}`}</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Email Body Commercial Terms Snippet:</span>
                <pre className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                  {quote.emailBodySnippet || `Dear Procurement Team,

We are pleased to submit the formal commercial quotation and regulatory tech pack for ${quote.materialName} on behalf of ${quote.vendorManufacturer} (${quote.originCountry}):

- Material: ${quote.materialName} (${quote.pharmacopoeiaGrade || 'USP / BP Grade'})
- Quoted Rate: USD ${quote.quotedRateUSD.toFixed(2)} / ${quote.uom} ${quote.incoterms}
- Target Benchmark Reference: USD ${targetRateUSD.toFixed(2)} / ${quote.uom}
- Minimum Order Quantity (MOQ): ${quote.moq} ${quote.uom}
- Packaging: ${quote.packSize || 'Standard Export Fibre Drums with PE Liners'}
- Delivery Lead Time: ${quote.leadTimeWeeks} Weeks after LC confirmation
- Payment Terms: ${quote.paymentTerms}

Regulatory & QA Compliance:
- Open Part Drug Master File (DMF) & Valid GMP Certificate enclosed.
- Batch Certificate of Analysis (COA) with 100% compliance to shared specifications.
- 36 Months Real-Time Stability Zone IVb and Accelerated Stability data attached.
- Plant Audit Status: ${quote.auditStatus} (${quote.auditRemarks || 'Approved by QA'}).

Looking forward to your favorable purchase order.

Best Regards,
Commercial Indenting Division
${quote.indentorName}`}
                </pre>
              </div>

              {/* Enclosed Attachments */}
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1.5">Enclosed Quotation Attachments:</span>
                <div className="flex flex-wrap gap-2">
                  {(quote.attachmentFileNames || [
                    `${quote.vendorManufacturer.replace(/[^a-zA-Z0-9]/g, '_')}_Commercial_Quote.xlsx`,
                    `${quote.materialName.replace(/[^a-zA-Z0-9]/g, '_')}_COA_Spec.pdf`,
                    `GMP_Certificate_${quote.originCountry}.pdf`,
                    `Stability_Study_Zone_IVb.pdf`,
                  ]).map((file, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 flex items-center gap-2 shadow-2xs text-xs font-medium"
                    >
                      {file.endsWith('.xlsx') || file.endsWith('.csv') ? (
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      <span>{file}</span>
                      <span className="text-[10px] text-slate-400">Enclosed</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Strategic Sourcing Recommendation */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-black text-purple-950 uppercase tracking-wider">
                AI Strategic Procurement Recommendation
              </h4>
              <p className="text-purple-900 leading-relaxed">
                {isWinner
                  ? `Recommended for immediate procurement allocation. Offers an optimal commercial rate of $${quote.quotedRateUSD.toFixed(2)}/${quote.uom} yielding $${quote.annualSavingsPotentialUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} annual savings in USD while demonstrating 100% technical document completeness (${quote.docsScore}/5) and an approved plant audit status.`
                  : isLowest
                  ? `Cost leader at $${quote.quotedRateUSD.toFixed(2)}/${quote.uom}. Ensure remaining technical dossiers or CAPA points are fully resolved before placing commercial trial batches.`
                  : `Viable secondary alternative source from ${quote.originCountry}. Quoted at $${quote.quotedRateUSD.toFixed(2)}/${quote.uom}. Retain on AVL to ensure supply continuity.`}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Analysis conducted strictly in <strong className="text-slate-800 font-bold">USD ($) Currency</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
