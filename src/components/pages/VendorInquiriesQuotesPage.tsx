import React, { useState, useMemo } from 'react';
import {
  Mail,
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Building2,
  TrendingDown,
  TrendingUp,
  FileText,
  DollarSign,
  Download,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  Eye,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  FileCheck,
  AlertCircle,
  X,
  ExternalLink,
  Copy,
  PlusCircle,
  HelpCircle,
  Brain,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency, convertValue } from '../../utils/currency';
import { VendorQuotationRecord, InquiryBenchmarkRecord, DocsStatusType, AuditStatusType } from '../../types';
import { INITIAL_INQUIRY_BENCHMARKS, INITIAL_VENDOR_QUOTATIONS, ExtendedInquiryRecord } from '../../data/inquiryQuotationsData';
import { parseOutlookEmailText, parseExcelQuotationFile, exportComparisonToExcel } from '../../utils/quotationParser';
import { MaterialAIComparisonAdvisory } from '../MaterialAIComparisonAdvisory';
import { MultiFileQuotationUploader } from '../MultiFileQuotationUploader';
import { VendorComparisonDetailModal } from '../VendorComparisonDetailModal';

export const VendorInquiriesQuotesPage: React.FC = () => {
  const { currency } = useData();

  // State
  const [inquiries, setInquiries] = useState<ExtendedInquiryRecord[]>(INITIAL_INQUIRY_BENCHMARKS);
  const [quotations, setQuotations] = useState<VendorQuotationRecord[]>(INITIAL_VENDOR_QUOTATIONS);
  
  // Navigation sub-tab
  const [activeTab, setActiveTab] = useState<'comparison' | 'master_table' | 'audit_tracker' | 'inquiry_coverage' | 'ai_comparison'>('ai_comparison');
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndentor, setSelectedIndentor] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDocsStatus, setSelectedDocsStatus] = useState<string>('ALL');
  const [selectedAuditStatus, setSelectedAuditStatus] = useState<string>('ALL');
  const [showOnlyLowest, setShowOnlyLowest] = useState<boolean>(false);
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string>('ALL');

  // Selected Quotation for Detail Modal
  const [inspectingQuote, setInspectingQuote] = useState<VendorQuotationRecord | null>(null);

  // Available unique lists for slicers
  const uniqueIndentors = useMemo(() => {
    const set = new Set<string>();
    quotations.forEach((q) => set.add(q.indentorName));
    return Array.from(set).sort();
  }, [quotations]);

  const uniqueMaterials = useMemo(() => {
    const set = new Set<string>();
    quotations.forEach((q) => set.add(q.materialName));
    return Array.from(set).sort();
  }, [quotations]);

  // Filtered Quotations
  const filteredQuotations = useMemo(() => {
    return quotations.filter((q) => {
      if (selectedIndentor !== 'ALL' && q.indentorName !== selectedIndentor) return false;
      if (selectedCategory !== 'ALL' && q.category !== selectedCategory) return false;
      if (selectedDocsStatus !== 'ALL' && q.docsAvailabilityStatus !== selectedDocsStatus) return false;
      if (selectedAuditStatus !== 'ALL' && q.auditStatus !== selectedAuditStatus) return false;
      if (selectedMaterialFilter !== 'ALL' && q.materialName !== selectedMaterialFilter) return false;
      if (showOnlyLowest && !q.isLowestQuote) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const match =
          q.materialName.toLowerCase().includes(query) ||
          q.indentorName.toLowerCase().includes(query) ||
          q.vendorManufacturer.toLowerCase().includes(query) ||
          q.originCountry.toLowerCase().includes(query) ||
          (q.materialCode && q.materialCode.toLowerCase().includes(query)) ||
          (q.inquiryRefNumber && q.inquiryRefNumber.toLowerCase().includes(query));
        if (!match) return false;
      }
      return true;
    });
  }, [quotations, selectedIndentor, selectedCategory, selectedDocsStatus, selectedAuditStatus, selectedMaterialFilter, showOnlyLowest, searchQuery]);

  // Grouped by Material for Indentor Comparison Matrix
  const materialComparisonGroups = useMemo(() => {
    const groups: { [materialName: string]: { inquiry?: InquiryBenchmarkRecord; quotes: VendorQuotationRecord[] } } = {};

    inquiries.forEach((inq) => {
      if (!groups[inq.materialName]) {
        groups[inq.materialName] = { inquiry: inq, quotes: [] };
      }
    });

    filteredQuotations.forEach((q) => {
      if (!groups[q.materialName]) {
        groups[q.materialName] = { inquiry: undefined, quotes: [] };
      }
      groups[q.materialName].quotes.push(q);
    });

    // Sort quotes within each group by price ascending
    Object.values(groups).forEach((g) => {
      g.quotes.sort((a, b) => a.quotedRateUSD - b.quotedRateUSD);
    });

    return Object.entries(groups).filter(([matName, g]) => {
      if (selectedMaterialFilter !== 'ALL' && matName !== selectedMaterialFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          matName.toLowerCase().includes(q) ||
          g.quotes.some((quote) =>
            quote.indentorName.toLowerCase().includes(q) ||
            quote.vendorManufacturer.toLowerCase().includes(q)
          )
        );
      }
      return true;
    });
  }, [inquiries, filteredQuotations, selectedMaterialFilter, searchQuery]);

  // Executive KPI summary stats
  const kpiStats = useMemo(() => {
    const totalInquiries = inquiries.length;
    const totalQuotes = quotations.length;
    const lowestQuotes = quotations.filter((q) => q.isLowestQuote);
    const totalSavingsPotentialUSD = lowestQuotes.reduce((acc, q) => acc + (q.annualSavingsPotentialUSD > 0 ? q.annualSavingsPotentialUSD : 0), 0);
    const approvedAuditCount = quotations.filter((q) => q.auditStatus === 'APPROVED').length;
    const fullDocsCount = quotations.filter((q) => q.docsAvailabilityStatus === 'FULL AVAILABLE').length;
    const activeIndentorsCount = new Set(quotations.map((q) => q.indentorName)).size;

    return {
      totalInquiries,
      totalQuotes,
      totalSavingsPotentialUSD,
      totalSavingsPotentialPKR: totalSavingsPotentialUSD * 280,
      approvedAuditCount,
      approvedAuditPct: totalQuotes > 0 ? Math.round((approvedAuditCount / totalQuotes) * 100) : 0,
      fullDocsCount,
      fullDocsPct: totalQuotes > 0 ? Math.round((fullDocsCount / totalQuotes) * 100) : 0,
      activeIndentorsCount,
    };
  }, [inquiries, quotations]);

  // Reset to default dataset
  const handleResetData = () => {
    setInquiries(INITIAL_INQUIRY_BENCHMARKS);
    setQuotations(INITIAL_VENDOR_QUOTATIONS);
  };

  // Export to Excel
  const handleExport = () => {
    exportComparisonToExcel(filteredQuotations, inquiries);
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. Executive Banner & Header */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mb-20" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-black text-xs uppercase tracking-wider border border-blue-500/30 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Indentor Quotation & Email Intelligence Hub
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Segment 5
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
              Outlook Emails & Excel Vendor Rates Extractor
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed">
              Extract vendor-quoted rates directly from saved Outlook emails (`.eml`, `.msg`, text bodies) and Excel quotation sheets. Compare commercial rates indentor-wise against baseline inquiry benchmarks, evaluate regulatory documentation completeness (DMF, GMP, COA, Stability), and track plant audit conduction status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              title="Download Indentor Comparison Matrix to Excel"
            >
              <Download className="w-4 h-4" />
              <span>Export Comparison (Excel)</span>
            </button>

            <button
              onClick={handleResetData}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              title="Reset to default inquiry and quotation dataset"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Top KPI Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Active Inquiries</span>
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">
              {kpiStats.totalInquiries} <span className="text-xs font-normal text-slate-400">SKUs</span>
            </div>
            <span className="text-[10px] text-blue-300">Sent to Vendors</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Quotes Extracted</span>
              <Mail className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300 mt-1">
              {kpiStats.totalQuotes} <span className="text-xs font-normal text-slate-400">Quotes</span>
            </div>
            <span className="text-[10px] text-sky-200">{kpiStats.activeIndentorsCount} Indentors Tracked</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Identified Savings</span>
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {currency === 'PKR'
                ? formatCurrency(kpiStats.totalSavingsPotentialPKR, 'PKR', { compact: true })
                : formatCurrency(kpiStats.totalSavingsPotentialUSD, 'USD', { compact: true })}
            </div>
            <span className="text-[10px] text-emerald-300">vs Target Benchmark</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Audit Approved</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300 mt-1">
              {kpiStats.approvedAuditCount} <span className="text-xs font-normal text-slate-400">/ {kpiStats.totalQuotes}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">{kpiStats.approvedAuditPct}% Site Approved</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Full Docs Ready</span>
              <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300 mt-1">
              {kpiStats.fullDocsCount} <span className="text-xs font-normal text-slate-400">/ {kpiStats.totalQuotes}</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-bold">{kpiStats.fullDocsPct}% Complete Dossier</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Top Evaluated</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {quotations.filter((q) => q.isBestEvaluatedOffer).length} <span className="text-xs font-normal text-slate-400">Winners</span>
            </div>
            <span className="text-[10px] text-amber-300">Price + Docs + Audit</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. Multi-File Batch Uploader & Bulk Outlook Email Parser */}
      {/* ========================================================================= */}
      <MultiFileQuotationUploader
        inquiries={inquiries}
        onAddQuotations={(newQuotes) => {
          setQuotations((prev) => {
            // Deduplicate by ID
            const existingIds = new Set(prev.map((q) => q.id));
            const uniqueNew = newQuotes.filter((q) => !existingIds.has(q.id));
            return [...uniqueNew, ...prev];
          });
        }}
        currency={currency}
      />

      {/* ========================================================================= */}
      {/* 3. Sub-Navigation Tabs & Slicers Toolbar */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Indentor-Wise Comparison Matrix</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {materialComparisonGroups.length} SKUs
            </span>
          </button>

          <button
            onClick={() => setActiveTab('master_table')}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'master_table'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>2. Extracted Quotations Master Table</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {filteredQuotations.length} Quotes
            </span>
          </button>

          <button
            onClick={() => setActiveTab('audit_tracker')}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'audit_tracker'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>3. Audit Conduction & QA Compliance</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiry_coverage')}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inquiry_coverage'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>4. Inquiry Benchmark vs Response Coverage</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_comparison')}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ai_comparison'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20 ring-2 ring-purple-400/50'
                : 'text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-900 border border-purple-200/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>5. AI Material Code & Name Comparison & Mfg Advisory</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-600/20 text-purple-900 font-bold border border-purple-400/40">
              AI Powered
            </span>
          </button>
        </div>

        {/* Slicers & Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-1">
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search material, indentor, vendor, country..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Indentor Slicer */}
          <div>
            <select
              value={selectedIndentor}
              onChange={(e) => setSelectedIndentor(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-medium text-slate-700"
            >
              <option value="ALL">All Indentors ({uniqueIndentors.length})</option>
              {uniqueIndentors.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Material Slicer */}
          <div>
            <select
              value={selectedMaterialFilter}
              onChange={(e) => setSelectedMaterialFilter(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-medium text-slate-700"
            >
              <option value="ALL">All Materials ({uniqueMaterials.length})</option>
              {uniqueMaterials.map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
          </div>

          {/* Docs Status Slicer */}
          <div>
            <select
              value={selectedDocsStatus}
              onChange={(e) => setSelectedDocsStatus(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-medium text-slate-700"
            >
              <option value="ALL">All Docs Status</option>
              <option value="FULL AVAILABLE">Full Available (5/5)</option>
              <option value="PARTIAL AVAILABLE">Partial Available</option>
              <option value="PENDING / REQUESTED">Pending / Requested</option>
            </select>
          </div>

          {/* Audit Status Slicer */}
          <div>
            <select
              value={selectedAuditStatus}
              onChange={(e) => setSelectedAuditStatus(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-medium text-slate-700"
            >
              <option value="ALL">All Audit Statuses</option>
              <option value="APPROVED">Approved On-Site</option>
              <option value="DESK AUDIT ONLY">Desk Audit Only</option>
              <option value="SCHEDULED">Audit Scheduled</option>
              <option value="CAPA PENDING">CAPA Pending</option>
              <option value="AUDIT REQUIRED">Audit Required</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Quick Filters:</span>
            <button
              onClick={() => setShowOnlyLowest((prev) => !prev)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                showOnlyLowest
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ⭐ Show Only Lowest Quotes
            </button>

            <button
              onClick={() => {
                setSelectedDocsStatus(selectedDocsStatus === 'FULL AVAILABLE' ? 'ALL' : 'FULL AVAILABLE');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDocsStatus === 'FULL AVAILABLE'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              📋 100% Docs Ready Only
            </button>

            <button
              onClick={() => {
                setSelectedAuditStatus(selectedAuditStatus === 'APPROVED' ? 'ALL' : 'APPROVED');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedAuditStatus === 'APPROVED'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🛡️ Approved Audit Only
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredQuotations.length}</strong> quotations matching criteria
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN VIEW CONTENT AREA */}
      {/* ========================================================================= */}

      {/* TAB 1: INDENTOR-WISE COMPARATIVE ANALYSIS MATRIX */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          {materialComparisonGroups.map(([materialName, group]) => {
            const inq = group.inquiry;
            const targetRate = inq ? inq.targetPriceUSD : (group.quotes[0]?.targetBenchmarkPriceUSD || 0);
            const lowestQuote = group.quotes.find((q) => q.isLowestQuote) || group.quotes[0];

            return (
              <div
                key={materialName}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                {/* Material Group Header */}
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-600 text-white font-black text-sm">
                      {inq?.category || 'API'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-black text-white">{materialName}</h3>
                        {inq?.materialCode && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                            Code: {inq.materialCode}
                          </span>
                        )}
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {inq?.gradeSpec || 'BP / USP Pharmacopoeial Grade'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Inquiry Code: <span className="text-slate-200 font-mono">{inq?.inquiryCode || 'ATCO/INQ/2026/ACTIVE'}</span> • Annual Demand: <span className="text-slate-200 font-bold">{inq?.annualDemandQty.toLocaleString() || '25,000'} KG</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:text-right shrink-0">
                    <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Inquiry Target Price</span>
                      <div className="text-lg font-black text-amber-400 font-mono">
                        {currency === 'PKR'
                          ? formatCurrency(targetRate * 280, 'PKR')
                          : formatCurrency(targetRate, 'USD')}
                        <span className="text-xs font-normal text-slate-300"> / KG</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60">
                      <span className="text-[10px] font-bold text-emerald-400 block uppercase">Best Quoted Offer</span>
                      <div className="text-lg font-black text-emerald-300 font-mono">
                        {lowestQuote
                          ? currency === 'PKR'
                            ? formatCurrency(lowestQuote.quotedRateUSD * 280, 'PKR')
                            : formatCurrency(lowestQuote.quotedRateUSD, 'USD')
                          : '-'}
                        <span className="text-xs font-normal text-emerald-400"> / KG</span>
                      </div>
                    </div>

                    {lowestQuote && (
                      <button
                        onClick={() => setInspectingQuote(lowestQuote)}
                        className="p-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-500/40 text-left transition-all cursor-pointer flex flex-col justify-center"
                        title="Open executive summary report and comparative analysis for best offer"
                      >
                        <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1 uppercase">
                          <FileText className="w-3 h-3 text-emerald-300" /> Summary Report
                        </span>
                        <span className="text-xs font-black text-white mt-0.5">
                          View Comparative Analysis &rarr;
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveTab('ai_comparison')}
                      className="p-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/40 text-left transition-all cursor-pointer flex flex-col justify-center"
                      title="Analyze this material with AI Sourcing & Mfg Development Engine"
                    >
                      <span className="text-[10px] font-bold text-purple-300 flex items-center gap-1 uppercase">
                        <Sparkles className="w-3 h-3 text-amber-300" /> AI Advisory
                      </span>
                      <span className="text-xs font-black text-white mt-0.5">
                        Mfg Analysis &rarr;
                      </span>
                    </button>
                  </div>
                </div>

                {/* Indentor Quotations Grid for this Material */}
                <div className="p-4 sm:p-5 bg-slate-50/50">
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                    <span>Vendor Quotations Extracted from Emails & Excel ({group.quotes.length} Offers)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Ranked by Evaluated Value</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.quotes.map((quote, idx) => {
                      const isSaving = quote.priceVarianceUSD > 0;
                      const isWinner = quote.isBestEvaluatedOffer;
                      const isLowest = quote.isLowestQuote;

                      return (
                        <div
                          key={quote.id}
                          className={`rounded-2xl p-4 border transition-all relative flex flex-col justify-between ${
                            isWinner
                              ? 'bg-emerald-50/70 border-emerald-400 shadow-md ring-2 ring-emerald-400/30'
                              : isLowest
                              ? 'bg-blue-50/60 border-blue-300 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                          }`}
                        >
                          {/* Badges Ribbon */}
                          <div className="flex items-center justify-between gap-1.5 mb-2.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[11px] font-black text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                                {quote.indentorName}
                              </span>
                              {quote.sourceType === 'OUTLOOK_EMAIL' ? (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 flex items-center gap-1">
                                  <Mail className="w-2.5 h-2.5" /> Email
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                  <FileSpreadsheet className="w-2.5 h-2.5" /> Excel
                                </span>
                              )}
                            </div>

                            {isWinner && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1 shadow-xs animate-pulse">
                                <Award className="w-3 h-3" /> BEST EVALUATED
                              </span>
                            )}
                            {!isWinner && isLowest && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white flex items-center gap-1">
                                ⭐ LOWEST PRICE
                              </span>
                            )}
                          </div>

                          {/* Manufacturer & Origin */}
                          <div className="mb-3">
                            <h4 className="text-xs font-black text-slate-900 line-clamp-1">
                              {quote.vendorManufacturer}
                            </h4>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Building2 className="w-3 h-3 text-slate-400" />
                              <span>Origin: <strong>{quote.originCountry}</strong></span>
                              <span className="text-slate-300">•</span>
                              <span>Incoterm: <strong>{quote.incoterms}</strong></span>
                            </p>
                          </div>

                          {/* Rate & Variance */}
                          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 mb-3 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-500">Quoted Rate:</span>
                              <span className="text-sm font-black text-slate-900 font-mono">
                                {currency === 'PKR'
                                  ? formatCurrency(quote.quotedRateUSD * 280, 'PKR')
                                  : formatCurrency(quote.quotedRateUSD, 'USD')}
                                <span className="text-[10px] font-normal text-slate-500"> / KG</span>
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                              <span className="text-[10px] text-slate-500 font-medium">Variance vs Target:</span>
                              <span
                                className={`text-xs font-black flex items-center gap-0.5 ${
                                  isSaving ? 'text-emerald-600' : 'text-rose-600'
                                }`}
                              >
                                {isSaving ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                <span>
                                  {isSaving ? '-' : '+'}
                                  {currency === 'PKR'
                                    ? formatCurrency(Math.abs(quote.priceVarianceUSD) * 280, 'PKR')
                                    : `$${Math.abs(quote.priceVarianceUSD).toFixed(2)}`}
                                  {' '}({quote.priceVariancePct > 0 ? '-' : '+'}{Math.abs(quote.priceVariancePct).toFixed(1)}%)
                                </span>
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-[10px] text-slate-500">Annual Savings Potential:</span>
                              <span className={`font-bold font-mono ${isSaving ? 'text-emerald-700' : 'text-rose-700'}`}>
                                {quote.annualSavingsPotentialUSD > 0 ? '+' : ''}
                                {currency === 'PKR'
                                  ? formatCurrency(quote.annualSavingsPotentialUSD * 280, 'PKR', { compact: true })
                                  : formatCurrency(quote.annualSavingsPotentialUSD, 'USD', { compact: true })}
                              </span>
                            </div>
                          </div>

                          {/* Commercial Terms summary */}
                          <div className="text-[10px] text-slate-600 grid grid-cols-2 gap-1 mb-3 bg-slate-100/70 p-2 rounded-lg">
                            <div>MOQ: <strong>{quote.moq.toLocaleString()} KG</strong></div>
                            <div>Lead Time: <strong>{quote.leadTimeWeeks} Weeks</strong></div>
                            <div className="col-span-2 line-clamp-1">Terms: <strong>{quote.paymentTerms}</strong></div>
                          </div>

                          {/* Compliance Badges (Docs & Audit) */}
                          <div className="space-y-1.5 mb-3.5">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-slate-500">Regulatory Docs:</span>
                              <span
                                className={`px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                                  quote.docsAvailabilityStatus === 'FULL AVAILABLE'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {quote.docsAvailabilityStatus === 'FULL AVAILABLE' ? (
                                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                ) : (
                                  <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                                )}
                                <span>{quote.dmfStatus} ({quote.docsScore}/5)</span>
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-slate-500">Plant Audit Status:</span>
                              <span
                                className={`px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                                  quote.auditStatus === 'APPROVED'
                                    ? 'bg-blue-100 text-blue-800'
                                    : quote.auditStatus === 'SCHEDULED'
                                    ? 'bg-sky-100 text-sky-800'
                                    : quote.auditStatus === 'DESK AUDIT ONLY'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                <ShieldCheck className="w-2.5 h-2.5" />
                                <span>{quote.auditStatus}</span>
                              </span>
                            </div>
                          </div>

                          {/* Bottom Action / View Details */}
                          <button
                            onClick={() => setInspectingQuote(quote)}
                            className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-900 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-blue-200 hover:border-blue-600 shadow-xs"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                            <span>Summary Report & Comparative Analysis &rarr;</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: EXTRACTED QUOTATIONS MASTER TABLE */}
      {activeTab === 'master_table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-black text-slate-900">Extracted Vendor Quotations & Rates Master Table</h3>
              <p className="text-xs text-slate-500">
                Detailed listing of all quotations extracted from Outlook emails and Excel files with regulatory status.
              </p>
            </div>
            <div className="text-xs font-bold text-slate-600">
              Total Records: <span className="text-blue-600 font-black">{filteredQuotations.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-900 text-slate-200 sticky top-0 z-10 select-none text-[11px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-3">Source</th>
                  <th className="py-3 px-3">Indentor / Agent</th>
                  <th className="py-3 px-4">Material Description</th>
                  <th className="py-3 px-4">Quoted Manufacturer & Origin</th>
                  <th className="py-3 px-3 text-right">Quoted Rate</th>
                  <th className="py-3 px-3 text-right">Target Rate</th>
                  <th className="py-3 px-3 text-right">Variance</th>
                  <th className="py-3 px-3 text-center">Incoterm</th>
                  <th className="py-3 px-3 text-center">Lead Time</th>
                  <th className="py-3 px-3 text-center">Docs Status</th>
                  <th className="py-3 px-3 text-center">Audit Status</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                {filteredQuotations.map((quote) => {
                  const isSaving = quote.priceVarianceUSD > 0;
                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                      onClick={() => setInspectingQuote(quote)}
                    >
                      <td className="py-2.5 px-3">
                        {quote.sourceType === 'OUTLOOK_EMAIL' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                            <Mail className="w-3 h-3 text-sky-600" /> Email
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            <FileSpreadsheet className="w-3 h-3 text-emerald-600" /> Excel
                          </span>
                        )}
                      </td>

                      <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {quote.indentorName}
                      </td>

                      <td className="py-2.5 px-4">
                        <div className="font-bold text-slate-900">{quote.materialName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {quote.materialCode} • {quote.pharmacopoeiaGrade}
                        </div>
                      </td>

                      <td className="py-2.5 px-4">
                        <div className="font-bold text-slate-800 line-clamp-1">{quote.vendorManufacturer}</div>
                        <div className="text-[10px] text-slate-500">Origin: {quote.originCountry}</div>
                      </td>

                      <td className="py-2.5 px-3 text-right font-black font-mono text-slate-900">
                        {currency === 'PKR'
                          ? formatCurrency(quote.quotedRateUSD * 280, 'PKR')
                          : formatCurrency(quote.quotedRateUSD, 'USD')}
                      </td>

                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {currency === 'PKR'
                          ? formatCurrency(quote.targetBenchmarkPriceUSD * 280, 'PKR')
                          : formatCurrency(quote.targetBenchmarkPriceUSD, 'USD')}
                      </td>

                      <td
                        className={`py-2.5 px-3 text-right font-bold font-mono ${
                          isSaving ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isSaving ? '-' : '+'}
                        {currency === 'PKR'
                          ? formatCurrency(Math.abs(quote.priceVarianceUSD) * 280, 'PKR')
                          : `$${Math.abs(quote.priceVarianceUSD).toFixed(2)}`}
                        <span className="text-[10px] block">
                          ({quote.priceVariancePct > 0 ? '-' : '+'}{Math.abs(quote.priceVariancePct).toFixed(1)}%)
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-center whitespace-nowrap text-[11px] font-bold text-slate-700">
                        {quote.incoterms}
                      </td>

                      <td className="py-2.5 px-3 text-center whitespace-nowrap text-[11px]">
                        {quote.leadTimeWeeks} wks
                      </td>

                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                            quote.docsAvailabilityStatus === 'FULL AVAILABLE'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {quote.dmfStatus.includes('CEP') ? 'CEP Ready' : 'DMF Ready'} ({quote.docsScore}/5)
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap ${
                            quote.auditStatus === 'APPROVED'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : quote.auditStatus === 'SCHEDULED'
                              ? 'bg-sky-100 text-sky-800 border border-sky-300'
                              : quote.auditStatus === 'DESK AUDIT ONLY'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {quote.auditStatus}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectingQuote(quote);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer border border-blue-200 hover:border-blue-600"
                          title="Open full comparative summary report"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Summary</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT CONDUCTION & REGULATORY COMPLIANCE TRACKER */}
      {activeTab === 'audit_tracker' && (
        <div className="space-y-5">
          {/* Audit Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>On-Site Audited & Approved</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700 mt-1">
                {quotations.filter((q) => q.auditStatus === 'APPROVED').length} <span className="text-xs text-slate-500 font-normal">Sites</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Immediate Commercial Release Allowed</span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>Physical Audit Scheduled</span>
                <Clock className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-black text-sky-700 mt-1">
                {quotations.filter((q) => q.auditStatus === 'SCHEDULED').length} <span className="text-xs text-slate-500 font-normal">Sites</span>
              </div>
              <span className="text-[10px] text-sky-600 font-semibold">Scheduled for Q3/Q4 Inspections</span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>Desk Audit Assessment</span>
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-700 mt-1">
                {quotations.filter((q) => q.auditStatus === 'DESK AUDIT ONLY').length} <span className="text-xs text-slate-500 font-normal">Sites</span>
              </div>
              <span className="text-[10px] text-amber-600 font-semibold">Paper dossier compliance verified</span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>CAPA / Audit Required</span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-700 mt-1">
                {quotations.filter((q) => q.auditStatus === 'CAPA PENDING' || q.auditStatus === 'AUDIT REQUIRED').length} <span className="text-xs text-slate-500 font-normal">Sites</span>
              </div>
              <span className="text-[10px] text-rose-600 font-semibold">QA Action required before PO</span>
            </div>
          </div>

          {/* Audit Master Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-sm font-black text-slate-900">Vendor Plant Audit & GMP Inspection Compliance Matrix</h3>
              <p className="text-xs text-slate-500">
                Detailed record of facility inspection dates, regulatory agency certificates, and audit validity periods.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-900 text-slate-200 select-none text-[11px] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Manufacturer Name & Site</th>
                    <th className="py-3 px-3">Country</th>
                    <th className="py-3 px-3">Quoting Indentor</th>
                    <th className="py-3 px-3 text-center">Audit Status</th>
                    <th className="py-3 px-3">Audited By</th>
                    <th className="py-3 px-3 text-center">Last Audit Date</th>
                    <th className="py-3 px-3 text-center">Next Due Date</th>
                    <th className="py-3 px-3">GMP Certificate Status</th>
                    <th className="py-3 px-4">Audit QA Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                  {quotations.map((quote) => (
                    <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{quote.vendorManufacturer}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">{quote.plantAddress || 'Manufacturing Site'}</div>
                      </td>

                      <td className="py-3 px-3 font-semibold text-slate-700">{quote.originCountry}</td>

                      <td className="py-3 px-3 font-bold text-blue-700">{quote.indentorName}</td>

                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${
                            quote.auditStatus === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : quote.auditStatus === 'SCHEDULED'
                              ? 'bg-sky-100 text-sky-800 border border-sky-300'
                              : quote.auditStatus === 'DESK AUDIT ONLY'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {quote.auditStatus}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-[11px] text-slate-700">{quote.auditedBy || 'Desk Assessment'}</td>

                      <td className="py-3 px-3 text-center font-mono text-[11px]">
                        {quote.auditConductionDate || 'Pending'}
                      </td>

                      <td className="py-3 px-3 text-center font-mono text-[11px] text-slate-600">
                        {quote.auditNextDueDate || '-'}
                      </td>

                      <td className="py-3 px-3">
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {quote.gmpCertificateStatus}
                        </span>
                        {quote.gmpExpiryDate && (
                          <div className="text-[10px] text-slate-400 mt-0.5">Exp: {quote.gmpExpiryDate}</div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-[11px] text-slate-600 max-w-xs">
                        {quote.auditRemarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INQUIRY BENCHMARK VS RESPONSE COVERAGE */}
      {activeTab === 'inquiry_coverage' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-black text-slate-900">Commercial Inquiries Issued to Vendors & Indentors</h3>
                <p className="text-xs text-slate-500">
                  Tracking response rates, invited indentors, and price discovery progress against annual requirements.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2.5 py-1 rounded-lg">
                {inquiries.length} Active Inquiries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-900 text-slate-200 select-none text-[11px] uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Inquiry Ref</th>
                    <th className="py-3 px-4">Material & Specification</th>
                    <th className="py-3 px-3 text-right">Annual Demand</th>
                    <th className="py-3 px-3 text-right">Target Price</th>
                    <th className="py-3 px-3 text-right">Last Purchase</th>
                    <th className="py-3 px-3">Invited Indentors</th>
                    <th className="py-3 px-3 text-center">Responses</th>
                    <th className="py-3 px-3 text-right">Lowest Quoted Rate</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                  {inquiries.map((inq) => {
                    const matchedQuotes = quotations
                      .filter(
                        (q) =>
                          q.inquiryRefNumber === inq.inquiryCode ||
                          (q.materialCode && q.materialCode === inq.materialCode) ||
                          q.materialName.toLowerCase().includes(inq.materialName.toLowerCase()) ||
                          inq.materialName.toLowerCase().includes(q.materialName.toLowerCase())
                      )
                      .sort((a, b) => a.quotedRateUSD - b.quotedRateUSD);
                    const lowest = matchedQuotes[0];

                    return (
                      <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-blue-700">{inq.inquiryCode}</td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{inq.materialName}</div>
                          <div className="text-[10px] text-slate-500">{inq.gradeSpec}</div>
                        </td>

                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                          {inq.annualDemandQty.toLocaleString()} {inq.uom}
                        </td>

                        <td className="py-3 px-3 text-right font-mono font-bold text-amber-600">
                          {currency === 'PKR'
                            ? formatCurrency(inq.targetPriceUSD * 280, 'PKR')
                            : formatCurrency(inq.targetPriceUSD, 'USD')}
                        </td>

                        <td className="py-3 px-3 text-right font-mono text-slate-500">
                          {currency === 'PKR'
                            ? formatCurrency(inq.lastPurchasePriceUSD * 280, 'PKR')
                            : formatCurrency(inq.lastPurchasePriceUSD, 'USD')}
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex flex-wrap gap-1">
                            {inq.invitedIndentors.map((ind) => (
                              <span key={ind} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                                {ind}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className="font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px]">
                            {matchedQuotes.length > 0 ? matchedQuotes.length : inq.responsesReceivedCount} / {inq.invitedIndentors.length} Received
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right font-mono font-black text-emerald-700">
                          {lowest
                            ? currency === 'PKR'
                              ? formatCurrency(lowest.quotedRateUSD * 280, 'PKR')
                              : formatCurrency(lowest.quotedRateUSD, 'USD')
                            : '-'}
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {inq.status.replace(/_/g, ' ')}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          {lowest ? (
                            <button
                              onClick={() => setInspectingQuote(lowest)}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer border border-blue-200 hover:border-blue-600"
                              title="Open full summary report and comparative analysis"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Summary Report</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">No Quotes</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AI MATERIAL CODE & NAME COMPARISON & MFG DEVELOPMENT ADVISORY */}
      {activeTab === 'ai_comparison' && (
        <MaterialAIComparisonAdvisory
          inquiries={inquiries}
          quotations={quotations}
          currency={currency}
          onSelectQuotation={(quote) => setInspectingQuote(quote)}
        />
      )}

      {/* ========================================================================= */}
      {/* 5. Detail & Comparative Analysis Dossier Modal (USD Only) */}
      {/* ========================================================================= */}
      {inspectingQuote && (
        <VendorComparisonDetailModal
          quote={inspectingQuote}
          inquiry={inquiries.find(
            (i) =>
              i.materialCode === inspectingQuote.materialCode ||
              i.materialName.toLowerCase() === inspectingQuote.materialName.toLowerCase()
          )}
          allQuotesForMaterial={quotations.filter(
            (q) =>
              (q.materialCode && inspectingQuote.materialCode && q.materialCode === inspectingQuote.materialCode) ||
              q.materialName.toLowerCase() === inspectingQuote.materialName.toLowerCase()
          )}
          onClose={() => setInspectingQuote(null)}
          onSelectAlternativeQuote={(altQuote) => setInspectingQuote(altQuote)}
        />
      )}
    </div>
  );
};
