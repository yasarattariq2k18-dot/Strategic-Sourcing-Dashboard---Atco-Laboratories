import React, { useState, useMemo, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  Award,
  TrendingDown,
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  ChevronRight,
  Search,
  RotateCcw,
  Download,
  Copy,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  Layers,
  FlaskConical,
  Building2,
  Plane,
  Ship,
  ExternalLink,
  ChevronDown,
  Info,
  RefreshCw,
  Eye,
  Check
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';
import { ExtendedInquiryRecord } from '../data/inquiryQuotationsData';
import { VendorQuotationRecord } from '../types';
import { formatCurrency } from '../utils/currency';

interface Props {
  inquiries: ExtendedInquiryRecord[];
  quotations: VendorQuotationRecord[];
  currency: 'USD' | 'PKR';
  onSelectQuotation?: (quote: VendorQuotationRecord) => void;
}

export const MaterialAIComparisonAdvisory: React.FC<Props> = ({
  inquiries,
  quotations,
  currency,
  onSelectQuotation,
}) => {
  // Slicers and State
  const [selectedMaterialCode, setSelectedMaterialCode] = useState<string>('111000217'); // Default: Azithromycin
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'API' | 'EXP'>('ALL');
  const [onlyMultipleQuotes, setOnlyMultipleQuotes] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Live AI State
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    text: string;
    source: string;
    generatedAt: string;
  } | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Group quotations by materialCode
  const quotesByMaterialCode = useMemo(() => {
    const map = new Map<string, VendorQuotationRecord[]>();
    quotations.forEach((q) => {
      const code = q.materialCode;
      if (!map.has(code)) map.set(code, []);
      map.get(code)!.push(q);
    });
    return map;
  }, [quotations]);

  // Unique list of materials available from inquiries & quotes
  const materialCatalog = useMemo(() => {
    return inquiries.map((inq) => {
      const relatedQuotes = quotesByMaterialCode.get(inq.materialCode) || [];
      const lowestQuote = relatedQuotes.length > 0
        ? [...relatedQuotes].sort((a, b) => a.quotedRateUSD - b.quotedRateUSD)[0]
        : null;
      const totalSavingsUSD = lowestQuote
        ? Math.max(0, (inq.targetPriceUSD - lowestQuote.quotedRateUSD) * inq.annualDemandQty)
        : 0;

      return {
        ...inq,
        quoteCount: relatedQuotes.length,
        lowestRateUSD: lowestQuote ? lowestQuote.quotedRateUSD : inq.targetPriceUSD,
        potentialSavingsUSD: totalSavingsUSD,
        hasApprovedAudit: relatedQuotes.some((q) => q.auditStatus === 'APPROVED'),
        hasFullDocs: relatedQuotes.some((q) => q.docsAvailabilityStatus === 'FULL AVAILABLE'),
      };
    });
  }, [inquiries, quotesByMaterialCode]);

  // Filtered material list for navigation
  const filteredCatalog = useMemo(() => {
    return materialCatalog.filter((item) => {
      const matchesSearch =
        searchFilter === '' ||
        item.materialCode.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.materialName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (item.preferMfg && item.preferMfg.toLowerCase().includes(searchFilter.toLowerCase())) ||
        (item.preferOrigin && item.preferOrigin.toLowerCase().includes(searchFilter.toLowerCase()));

      const matchesCat =
        categoryFilter === 'ALL' || item.category === categoryFilter;

      const matchesQuotes = !onlyMultipleQuotes || item.quoteCount >= 2;

      return matchesSearch && matchesCat && matchesQuotes;
    });
  }, [materialCatalog, searchFilter, categoryFilter, onlyMultipleQuotes]);

  // Selected Inquiry & Quotations
  const currentInquiry = useMemo(() => {
    return inquiries.find((i) => i.materialCode === selectedMaterialCode) || inquiries[0];
  }, [inquiries, selectedMaterialCode]);

  const currentQuotes = useMemo(() => {
    if (!currentInquiry) return [];
    return quotesByMaterialCode.get(currentInquiry.materialCode) || [];
  }, [quotesByMaterialCode, currentInquiry]);

  // Algorithmic Scoring & Ranking of Vendors
  const evaluatedVendors = useMemo(() => {
    if (!currentInquiry) return [];

    return currentQuotes.map((q) => {
      // 1. Price Score (0 - 35 pts): Lower price vs target gives higher score
      const priceRatio = currentInquiry.targetPriceUSD > 0
        ? q.quotedRateUSD / currentInquiry.targetPriceUSD
        : 1;
      const priceScore = Math.max(0, Math.min(35, (1.5 - priceRatio) * 35));

      // 2. Regulatory & Tech Dossier Score (0 - 25 pts)
      const docsScore = (q.docsScore || 0) * 5; // 5 * 5 = 25 pts

      // 3. QA Audit Score (0 - 20 pts)
      let auditScore = 5;
      if (q.auditStatus === 'APPROVED') auditScore = 20;
      else if (q.auditStatus === 'DESK AUDIT ONLY') auditScore = 14;
      else if (q.auditStatus === 'SCHEDULED') auditScore = 10;
      else if (q.auditStatus === 'CAPA PENDING') auditScore = 8;

      // 4. MOQ & Batch Compatibility Score (0 - 10 pts)
      const lotRatio = currentInquiry.perLotQty > 0 ? q.moq / currentInquiry.perLotQty : 1;
      let moqScore = 10;
      if (lotRatio > 2) moqScore = 4;
      else if (lotRatio > 1.2) moqScore = 7;

      // 5. Lead Time Score (0 - 10 pts)
      let leadTimeScore = 8;
      if (q.leadTimeWeeks <= 2) leadTimeScore = 10;
      else if (q.leadTimeWeeks <= 4) leadTimeScore = 8;
      else if (q.leadTimeWeeks <= 6) leadTimeScore = 6;
      else leadTimeScore = 3;

      const totalCompositeScore = Math.round(
        priceScore + docsScore + auditScore + moqScore + leadTimeScore
      );

      const netAnnualSavings = Math.max(
        0,
        (currentInquiry.targetPriceUSD - q.quotedRateUSD) * currentInquiry.annualDemandQty
      );

      return {
        ...q,
        priceScore: Math.round(priceScore),
        docsScoreActual: Math.round(docsScore),
        auditScore: Math.round(auditScore),
        moqScore: Math.round(moqScore),
        leadTimeScore: Math.round(leadTimeScore),
        totalCompositeScore,
        netAnnualSavings,
      };
    }).sort((a, b) => b.totalCompositeScore - a.totalCompositeScore);
  }, [currentQuotes, currentInquiry]);

  const primaryRecommendation = evaluatedVendors[0] || null;
  const secondaryRecommendation = evaluatedVendors[1] || null;

  // Recharts Chart 1: Price Comparison Data
  const priceChartData = useMemo(() => {
    if (!currentInquiry) return [];

    const data: any[] = [
      {
        name: 'Target Benchmark',
        rate: currentInquiry.targetPriceUSD,
        type: 'Benchmark',
        fill: '#3b82f6',
      },
    ];

    if (currentInquiry.lastPurchasePriceUSD) {
      data.push({
        name: 'Last Purchase Price',
        rate: currentInquiry.lastPurchasePriceUSD,
        type: 'Historical',
        fill: '#94a3b8',
      });
    }

    evaluatedVendors.forEach((v) => {
      data.push({
        name: `${v.vendorManufacturer.slice(0, 16)} (${v.indentorName.slice(0, 12)})`,
        rate: v.quotedRateUSD,
        type: 'Quoted',
        fill: v.id === primaryRecommendation?.id ? '#10b981' : '#6366f1',
      });
    });

    return data;
  }, [currentInquiry, evaluatedVendors, primaryRecommendation]);

  // Recharts Chart 2: Annual Spend & Savings
  const spendChartData = useMemo(() => {
    if (!currentInquiry) return [];

    const baselineSpend = currentInquiry.targetPriceUSD * currentInquiry.annualDemandQty;

    return evaluatedVendors.map((v) => {
      const vendorSpend = v.quotedRateUSD * currentInquiry.annualDemandQty;
      const savings = Math.max(0, baselineSpend - vendorSpend);
      return {
        name: v.vendorManufacturer.slice(0, 15),
        vendorSpend: Math.round(vendorSpend),
        savings: Math.round(savings),
        baselineSpend: Math.round(baselineSpend),
      };
    });
  }, [currentInquiry, evaluatedVendors]);

  // Recharts Chart 3: Multi-Criteria Radar Comparison
  const radarChartData = useMemo(() => {
    if (evaluatedVendors.length === 0) return [];

    return [
      {
        subject: 'Commercial Price (35%)',
        A: evaluatedVendors[0]?.priceScore || 0,
        B: evaluatedVendors[1]?.priceScore || 0,
        fullMark: 35,
      },
      {
        subject: 'Regulatory Dossier (25%)',
        A: evaluatedVendors[0]?.docsScoreActual || 0,
        B: evaluatedVendors[1]?.docsScoreActual || 0,
        fullMark: 25,
      },
      {
        subject: 'QA Plant Audit (20%)',
        A: evaluatedVendors[0]?.auditScore || 0,
        B: evaluatedVendors[1]?.auditScore || 0,
        fullMark: 20,
      },
      {
        subject: 'MOQ Fit (10%)',
        A: evaluatedVendors[0]?.moqScore || 0,
        B: evaluatedVendors[1]?.moqScore || 0,
        fullMark: 10,
      },
      {
        subject: 'Lead Time (10%)',
        A: evaluatedVendors[0]?.leadTimeScore || 0,
        B: evaluatedVendors[1]?.leadTimeScore || 0,
        fullMark: 10,
      },
    ];
  }, [evaluatedVendors]);

  // Trigger Gemini AI Review via server API
  const handleTriggerAIReview = async () => {
    if (!currentInquiry) return;
    setIsLoadingAI(true);
    setAiError(null);

    try {
      const response = await fetch('/api/ai-review-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialCode: currentInquiry.materialCode,
          materialName: currentInquiry.materialName,
          inquiry: currentInquiry,
          quotations: currentQuotes,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Review Service returned status ${response.status}`);
      }

      const data = await response.json();
      setAiAnalysisResult({
        text: data.analysis,
        source: data.source || 'gemini-3.7-flash',
        generatedAt: data.generatedAt || new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Failed to generate AI review:', err);
      setAiError(err.message || 'Unable to connect to AI Review Service.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Auto-trigger analysis when material changes if not already loaded
  useEffect(() => {
    setAiAnalysisResult(null);
    setAiError(null);
    handleTriggerAIReview();
  }, [selectedMaterialCode]);

  const handleCopyAnalysis = () => {
    if (aiAnalysisResult) {
      navigator.clipboard.writeText(aiAnalysisResult.text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* Top Banner: AI Material Intelligence Header */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-black text-xs uppercase tracking-wider border border-indigo-500/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" />
                AI Sourcing & Mfg Development Advisory
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Gemini 3.7 Flash Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
              Material Name & Code-Wise AI Quotation Analysis
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed">
              Automated review of vendor quotations against inquiry technical benchmarks, sample commitments, regulatory dossiers, and plant audit scores to recommend which manufacturer to develop.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTriggerAIReview}
              disabled={isLoadingAI}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingAI ? 'animate-spin' : ''}`} />
              <span>{isLoadingAI ? 'Analyzing...' : 'Re-Run AI Deep Review'}</span>
            </button>

            {aiAnalysisResult && (
              <button
                onClick={handleCopyAnalysis}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15 cursor-pointer"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copied' : 'Copy Report'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. Material Code & Name Selector Bar & Filter Catalog */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Select Material Code or Material Name to Analyze</h3>
              <p className="text-xs text-slate-500">
                Browse through 88+ inquiry materials or search by SKU Code, Innovator Maker, or Indentor.
              </p>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategoryFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All SKUs ({materialCatalog.length})
            </button>
            <button
              onClick={() => setCategoryFilter('API')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'API'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              APIs Only
            </button>
            <button
              onClick={() => setCategoryFilter('EXP')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'EXP'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Excipients Only
            </button>
            <button
              onClick={() => setOnlyMultipleQuotes(!onlyMultipleQuotes)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                onlyMultipleQuotes
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-black'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              With 2+ Quotes
            </button>
          </div>
        </div>

        {/* Search and Dropdown Selector Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search code (e.g. 111000217), name, maker, country..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="md:col-span-8">
            <select
              value={selectedMaterialCode}
              onChange={(e) => setSelectedMaterialCode(e.target.value)}
              className="w-full py-2.5 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-800"
            >
              {filteredCatalog.map((item) => (
                <option key={item.materialCode} value={item.materialCode}>
                  [{item.category}] {item.materialCode} - {item.materialName} ({item.annualDemandQty} {item.uom}) — {item.quoteCount} Quote(s) Received {item.quoteCount > 0 ? `| Target: $${item.targetPriceUSD} → Lowest: $${item.lowestRateUSD}` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Horizontal Carousel of Popular / High Savings Materials */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Quick SKUs:
          </span>
          {filteredCatalog.slice(0, 8).map((m) => (
            <button
              key={m.materialCode}
              onClick={() => setSelectedMaterialCode(m.materialCode)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                selectedMaterialCode === m.materialCode
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{m.materialName}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedMaterialCode === m.materialCode ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {m.quoteCount} quotes
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Selected Material Inquiry Benchmark Card & Specs */}
      {/* ========================================================================= */}
      {currentInquiry && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-black tracking-wider">
                  CODE: {currentInquiry.materialCode}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                  currentInquiry.category === 'API'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {currentInquiry.category === 'API' ? 'Active Pharmaceutical Ingredient (API)' : 'Excipient / Solubilizer'}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium flex items-center gap-1">
                  {currentInquiry.shipmentMode === 'AIR' ? <Plane className="w-3 h-3 text-sky-600" /> : <Ship className="w-3 h-3 text-blue-600" />}
                  Shipment: {currentInquiry.shipmentMode || 'SEA'} CFR Karachi
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {currentInquiry.materialName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {currentInquiry.gradeSpec || 'Ph.Eur / USP Grade Standard Pharmacopoeial Specification'}
              </p>
            </div>

            {/* Benchmark Price Highlights */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200/80 text-right">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Target Benchmark Price</div>
                <div className="text-lg font-black text-blue-900">
                  ${currentInquiry.targetPriceUSD.toFixed(2)}
                  <span className="text-xs font-normal text-slate-500">/{currentInquiry.uom}</span>
                </div>
              </div>

              {currentInquiry.lastPurchasePriceUSD && (
                <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Last Purchase Price</div>
                  <div className="text-lg font-bold text-slate-700">
                    ${currentInquiry.lastPurchasePriceUSD.toFixed(2)}
                    <span className="text-xs font-normal text-slate-400">/{currentInquiry.uom}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Inquiry Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Annual Demand PO</div>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {currentInquiry.annualDemandQty.toLocaleString()} {currentInquiry.uom}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Per Lot Batch Size</div>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {currentInquiry.perLotQty.toLocaleString()} {currentInquiry.uom}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Annual Target Spend</div>
              <div className="text-base font-black text-slate-900 mt-0.5">
                ${(currentInquiry.annualDemandQty * currentInquiry.targetPriceUSD).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Initial Sample Req</div>
              <div className="text-xs font-black text-indigo-900 mt-1">
                {currentInquiry.initialSampleQtyReq || '500GM 1st Lot + WS'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Trial Sample Req</div>
              <div className="text-xs font-black text-indigo-900 mt-1">
                {currentInquiry.trialSampleQtyReq || '1KG-2KG 2nd Lot'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Preferred Origin(s)</div>
              <div className="text-xs font-black text-slate-800 mt-1 truncate" title={currentInquiry.preferOrigin}>
                {currentInquiry.preferOrigin || 'China / India / EU'}
              </div>
            </div>
          </div>

          {/* Preferred Makers / Innovators Ribbon */}
          {currentInquiry.preferMfg && (
            <div className="mt-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-2 text-xs">
              <span className="font-black text-blue-900 shrink-0">Preferred Makers / Innovators:</span>
              <span className="text-blue-800 font-medium truncate">{currentInquiry.preferMfg}</span>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. AI Strategic Manufacturer Development Recommendation Panel */}
      {/* ========================================================================= */}
      {primaryRecommendation ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left / Top: Primary & Secondary Development Recommendation Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Rank 1 Recommendation Card */}
            <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white rounded-2xl p-6 border border-emerald-700/50 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-800/80">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 font-black">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">
                      RANK 1 • RECOMMENDED TO DEVELOP
                    </span>
                    <h3 className="text-lg font-black text-white">
                      {primaryRecommendation.vendorManufacturer}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/40">
                  Overall Score: {primaryRecommendation.totalCompositeScore}/100
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-bold text-slate-400">Quoted CFR Rate</div>
                  <div className="text-base font-black text-emerald-400 mt-0.5">
                    ${primaryRecommendation.quotedRateUSD.toFixed(2)}
                    <span className="text-[10px] font-normal text-slate-400">/{currentInquiry?.uom}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-bold text-slate-400">Annual Net Savings</div>
                  <div className="text-base font-black text-emerald-300 mt-0.5">
                    ${primaryRecommendation.netAnnualSavings.toLocaleString()}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-bold text-slate-400">QA Audit Status</div>
                  <div className="text-xs font-black text-white mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {primaryRecommendation.auditStatus}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-bold text-slate-400">Tech Dossier</div>
                  <div className="text-xs font-black text-cyan-300 mt-1 flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-cyan-400" />
                    {primaryRecommendation.docsScore}/5 Complete
                  </div>
                </div>
              </div>

              {/* Rationale & Action Protocol */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-black text-emerald-300 shrink-0">Development Rationale:</span>
                  <span className="text-slate-300 leading-relaxed">
                    Offered via <strong>{primaryRecommendation.indentorName}</strong> ({primaryRecommendation.originCountry}). Provides optimal unit economics with <strong>${primaryRecommendation.priceVarianceUSD.toFixed(2)}/kg saving</strong> below target benchmark, full Open Part USDMF/CEP dossier availability, and active QA plant audit approval.
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                  <span className="font-black text-amber-300 shrink-0">Sample Requisition Action:</span>
                  <span className="text-slate-300">
                    Dispatch official sample request for <strong>{currentInquiry?.initialSampleQtyReq || '500GM 1st Lot + WS'}</strong> for analytical method transfer & pilot batch trials.
                  </span>
                </div>
              </div>
            </div>

            {/* Rank 2 Alternate Source Card */}
            {secondaryRecommendation && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs">
                      2nd
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider text-indigo-600 uppercase">
                        RANK 2 • BACKUP / ALTERNATE SOURCE
                      </span>
                      <h4 className="text-sm font-black text-slate-900">
                        {secondaryRecommendation.vendorManufacturer} ({secondaryRecommendation.originCountry})
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    Rate: ${secondaryRecommendation.quotedRateUSD.toFixed(2)}/{currentInquiry?.uom}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 mt-3">
                  <div>
                    <span className="font-bold text-slate-800">Indentor:</span> {secondaryRecommendation.indentorName}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Audit:</span> {secondaryRecommendation.auditStatus}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">MOQ:</span> {secondaryRecommendation.moq} {currentInquiry?.uom}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Lead Time:</span> {secondaryRecommendation.leadTimeWeeks} wks
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Live AI Executive Assessment Box */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900">Gemini AI Executive Synthesis</h3>
                </div>

                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                  {aiAnalysisResult?.source || 'AI Sourcing Engine'}
                </span>
              </div>

              {isLoadingAI ? (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Synthesizing commercial & regulatory intelligence...</p>
                  <p className="text-[11px] text-slate-400">Evaluating technical dossiers, audit histories, and CFR economics</p>
                </div>
              ) : aiAnalysisResult ? (
                <div className="max-h-80 overflow-y-auto pr-1 text-xs text-slate-700 space-y-2 leading-relaxed font-sans">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px]">
                    <div className="font-bold text-slate-800 mb-1">Key Recommendation Takeaway:</div>
                    <p className="text-slate-600 leading-normal">
                      Develop <strong>{primaryRecommendation?.vendorManufacturer}</strong> as primary source for <strong>{currentInquiry?.materialName}</strong> with projected annual savings of <strong>${primaryRecommendation?.netAnnualSavings.toLocaleString()}</strong>.
                    </p>
                  </div>
                  <div className="prose prose-xs text-slate-700 whitespace-pre-line">
                    {aiAnalysisResult.text}
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center text-xs text-slate-500">
                  Click &ldquo;Re-Run AI Deep Review&rdquo; to generate technical review.
                </div>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Updated: {new Date().toLocaleDateString()}</span>
              <span>Atco Laboratories Strategic Sourcing</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 text-center space-y-2">
          <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
          <h4 className="text-sm font-black text-amber-900">No Quotations Received Yet for this SKU</h4>
          <p className="text-xs text-amber-700 max-w-lg mx-auto">
            Inquiry ATCO/INQ has been issued to vendors. You can paste an Outlook email or drop a quotation spreadsheet in Segment 5 to automatically extract rates and generate recommendations.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. Interactive Comparison Graphs & Charts Ribbon */}
      {/* ========================================================================= */}
      {evaluatedVendors.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Chart 1: Quoted Rates vs Benchmark (Bar Chart) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  1. Quoted CFR Rate vs Target Benchmark ($/{currentInquiry?.uom})
                </h3>
                <p className="text-[11px] text-slate-500">Lower rate represents positive commercial variance</p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    formatter={(value: any) => [`$${Number(value).toFixed(2)}/${currentInquiry?.uom}`, 'Rate']}
                    contentStyle={{ borderRadius: 12, fontSize: 11, border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                    {priceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Multi-Factor Evaluation Radar (Radar Chart) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  2. Multi-Criteria Vendor Evaluation (Rank 1 vs Rank 2)
                </h3>
                <p className="text-[11px] text-slate-500">Price, Regulatory Pack, Plant Audit, MOQ & Lead Time fit</p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarChartData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#475569' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 35]} tick={{ fontSize: 9 }} />
                  <Radar
                    name={evaluatedVendors[0]?.vendorManufacturer || 'Rank 1'}
                    dataKey="A"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.4}
                  />
                  {evaluatedVendors[1] && (
                    <Radar
                      name={evaluatedVendors[1]?.vendorManufacturer || 'Rank 2'}
                      dataKey="B"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.3}
                    />
                  )}
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. Side-by-Side Detailed Vendor Quotations Comparison Table */}
      {/* ========================================================================= */}
      {evaluatedVendors.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Side-by-Side Indentor & Manufacturer Quotation Matrix ({evaluatedVendors.length} Offers)
                </h3>
                <p className="text-xs text-slate-500">
                  Comprehensive commercial terms, technical pack readiness, QA audit score, and sample commitments.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 uppercase font-black tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-3">Rank & Status</th>
                  <th className="py-3 px-3">Indentor</th>
                  <th className="py-3 px-3">Manufacturer & Country</th>
                  <th className="py-3 px-3">Quoted Rate</th>
                  <th className="py-3 px-3">Variance</th>
                  <th className="py-3 px-3">Annual Savings</th>
                  <th className="py-3 px-3">MOQ / Batch</th>
                  <th className="py-3 px-3">Lead Time</th>
                  <th className="py-3 px-3">Tech Dossier</th>
                  <th className="py-3 px-3">Audit Status</th>
                  <th className="py-3 px-3">Sample Ack</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {evaluatedVendors.map((v, index) => {
                  const isRank1 = index === 0;
                  return (
                    <tr
                      key={v.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isRank1 ? 'bg-emerald-50/40 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 px-3 whitespace-nowrap">
                        {isRank1 ? (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-black text-[10px] flex items-center gap-1 w-fit">
                            <Award className="w-3 h-3" />
                            1st Primary
                          </span>
                        ) : index === 1 ? (
                          <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                            2nd Backup
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[10px]">
                            {index + 1}th Offer
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {v.indentorName}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{v.vendorManufacturer}</div>
                        <div className="text-[10px] text-slate-500">{v.originCountry}</div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="font-black text-slate-900 text-sm">
                          ${v.quotedRateUSD.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-normal">/{currentInquiry?.uom}</span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          v.priceVarianceUSD >= 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {v.priceVarianceUSD >= 0 ? `-$${v.priceVarianceUSD.toFixed(2)}` : `+$${Math.abs(v.priceVarianceUSD).toFixed(2)}`} ({v.priceVariancePct.toFixed(1)}%)
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-black text-emerald-700">
                        ${v.netAnnualSavings.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                        {v.moq} {currentInquiry?.uom}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                        {v.leadTimeWeeks} wks
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold text-[10px]">
                          {v.docsScore}/5 Dossier
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          v.auditStatus === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : v.auditStatus === 'DESK AUDIT ONLY'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {v.auditStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-[11px] font-bold text-slate-700">
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          500g + 1kg
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-right">
                        {onSelectQuotation && (
                          <button
                            onClick={() => onSelectQuotation(v)}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            View Quote
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
    </div>
  );
};
