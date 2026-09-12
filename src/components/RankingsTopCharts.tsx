import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ComposedChart,
  Line,
  Cell,
} from 'recharts';
import {
  Building2,
  TrendingUp,
  Layers,
  ChevronRight,
  Filter,
  Info,
  DollarSign,
  Package,
  Globe,
  Award,
  X,
  ExternalLink,
  SlidersHorizontal,
  Search,
  Eye,
  Table,
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import {
  MANUFACTURER_RANKINGS_DATA,
  INDENTOR_RANKINGS_DATA,
  ManufacturerRankingItem,
  IndentorRankingItem,
  TOTAL_MANUFACTURER_USD_JUL_JUN,
  TOTAL_MANUFACTURER_USD_2025,
  TOTAL_INDENTOR_PKR_JUL_JUN,
  TOTAL_INDENTOR_PKR_2025,
  TOTAL_INDENTOR_USD_JUL_JUN,
  TOTAL_INDENTOR_USD_2025,
} from '../data/rankingsAnalyticsData';
import { useData } from '../context/DataContext';

export const RankingsTopCharts: React.FC = () => {
  const { currency: globalCurrency } = useData();

  // Top Main View: Indentor vs Manufacturer
  const [activeView, setActiveView] = useState<'indentor' | 'manufacturer'>('indentor');

  // Second Tier Buttons: Top 10, Top 20, Top 30
  const [topCount, setTopCount] = useState<10 | 20 | 30>(10);

  // Period filter
  const [period, setPeriod] = useState<'jul_jun' | 'jan_dec' | 'compare'>('jul_jun');

  // Sourcing Channel filter (All / Import / Local)
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'IMPORT' | 'LOCAL'>('ALL');

  // Currency display mode (USD / PKR)
  const [currMode, setCurrMode] = useState<'USD' | 'PKR'>(globalCurrency);

  // Toggle state: show table only once clicked on the heading above of chart
  const [showMasterTable, setShowMasterTable] = useState<boolean>(false);

  // Search filter inside table
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected item for drilldown modal
  const [selectedMfg, setSelectedMfg] = useState<ManufacturerRankingItem | null>(null);
  const [selectedInd, setSelectedInd] = useState<IndentorRankingItem | null>(null);

  // Keep currency in sync when global currency updates
  React.useEffect(() => {
    setCurrMode(globalCurrency);
  }, [globalCurrency]);

  // Formatter functions
  const formatVal = (usdVal: number, pkrVal: number) => {
    if (currMode === 'PKR') {
      if (pkrVal >= 1e9) return `PKR ${(pkrVal / 1e9).toFixed(2)}B`;
      if (pkrVal >= 1e6) return `PKR ${(pkrVal / 1e6).toFixed(1)}M`;
      return `PKR ${pkrVal.toLocaleString()}`;
    }
    if (usdVal >= 1e6) return `$${(usdVal / 1e6).toFixed(2)}M`;
    if (usdVal >= 1e3) return `$${(usdVal / 1e3).toFixed(0)}K`;
    return `$${usdVal.toLocaleString()}`;
  };

  const formatShort = (usdVal: number, pkrVal: number) => {
    if (currMode === 'PKR') {
      if (pkrVal >= 1e9) return `${(pkrVal / 1e9).toFixed(1)}B`;
      if (pkrVal >= 1e6) return `${(pkrVal / 1e6).toFixed(0)}M`;
      return `${Math.round(pkrVal / 1e3)}K`;
    }
    if (usdVal >= 1e6) return `$${(usdVal / 1e6).toFixed(2)}M`;
    if (usdVal >= 1e3) return `$${(usdVal / 1e3).toFixed(0)}K`;
    return `$${usdVal}`;
  };

  // -------------------------------------------------------------
  // Filtered & Ranked Indentor Data (131 entities)
  // -------------------------------------------------------------
  const processedIndData = useMemo(() => {
    let list = [...INDENTOR_RANKINGS_DATA];
    if (categoryFilter !== 'ALL') {
      list = list.filter((m) => m.category === categoryFilter);
    }
    if (period === 'jan_dec') {
      list.sort((a, b) => b.valuePkr2025 - a.valuePkr2025);
    } else {
      list.sort((a, b) => b.valuePkrJulJun - a.valuePkrJulJun);
    }
    const sliced = list.slice(0, topCount);

    let runningTotal = 0;
    return sliced.map((item, idx) => {
      const val = period === 'jan_dec' ? item.valuePkr2025 : item.valuePkrJulJun;
      runningTotal += val;
      const totalSpend =
        period === 'jan_dec' ? TOTAL_INDENTOR_PKR_2025 : TOTAL_INDENTOR_PKR_JUL_JUN;
      const cumPct = Number(((runningTotal / totalSpend) * 100).toFixed(2));

      return {
        ...item,
        displayRank: idx + 1,
        shortName:
          item.name.length > 22 ? item.name.substring(0, 20) + '...' : item.name,
        chartValueJulJun: currMode === 'PKR' ? item.valuePkrJulJun : item.valueUsdJulJun,
        chartValue2025: currMode === 'PKR' ? item.valuePkr2025 : item.valueUsd2025,
        cumShare: cumPct,
      };
    });
  }, [topCount, period, categoryFilter, currMode]);

  // -------------------------------------------------------------
  // Filtered & Ranked Manufacturer Data (353 entities)
  // -------------------------------------------------------------
  const processedMfgData = useMemo(() => {
    let list = [...MANUFACTURER_RANKINGS_DATA];
    if (categoryFilter !== 'ALL') {
      list = list.filter((m) => m.category === categoryFilter);
    }
    if (period === 'jan_dec') {
      list.sort((a, b) => b.valueUsd2025 - a.valueUsd2025);
    } else {
      list.sort((a, b) => b.valueUsdJulJun - a.valueUsdJulJun);
    }
    const sliced = list.slice(0, topCount);

    let runningTotal = 0;
    return sliced.map((item, idx) => {
      const val = period === 'jan_dec' ? item.valueUsd2025 : item.valueUsdJulJun;
      runningTotal += val;
      const totalSpend =
        period === 'jan_dec' ? TOTAL_MANUFACTURER_USD_2025 : TOTAL_MANUFACTURER_USD_JUL_JUN;
      const cumPct = Number(((runningTotal / totalSpend) * 100).toFixed(2));

      return {
        ...item,
        displayRank: idx + 1,
        shortName:
          item.name.length > 22 ? item.name.substring(0, 20) + '...' : item.name,
        chartValueJulJun: currMode === 'PKR' ? item.valuePkrJulJun : item.valueUsdJulJun,
        chartValue2025: currMode === 'PKR' ? item.valuePkr2025 : item.valueUsd2025,
        cumShare: cumPct,
      };
    });
  }, [topCount, period, categoryFilter, currMode]);

  // Active chart dataset depending on Indentor vs Manufacturer view
  const currentChartData = activeView === 'indentor' ? processedIndData : processedMfgData;

  // Key KPI metrics for current view and top N
  const summaryMetrics = useMemo(() => {
    if (activeView === 'indentor') {
      const totalTopPkr = processedIndData.reduce((acc, d) => acc + d.valuePkrJulJun, 0);
      const totalTopUsd = processedIndData.reduce((acc, d) => acc + d.valueUsdJulJun, 0);
      const shareOfTotal = ((totalTopPkr / TOTAL_INDENTOR_PKR_JUL_JUN) * 100).toFixed(2);
      const topLeader = processedIndData[0];
      return {
        totalTopPkr,
        totalTopUsd,
        shareOfTotal,
        topLeaderName: topLeader?.name || 'N/A',
        topLeaderValueUsd: topLeader?.valueUsdJulJun || 0,
        topLeaderValuePkr: topLeader?.valuePkrJulJun || 0,
        topLeaderShare: topLeader?.sharePctJulJun || 0,
        totalEntitiesInDb: INDENTOR_RANKINGS_DATA.length,
        categoryTitle: 'Indentor Sourcing Agency',
      };
    } else {
      const totalTopUsd = processedMfgData.reduce((acc, d) => acc + d.valueUsdJulJun, 0);
      const totalTopPkr = processedMfgData.reduce((acc, d) => acc + d.valuePkrJulJun, 0);
      const shareOfTotal = ((totalTopUsd / TOTAL_MANUFACTURER_USD_JUL_JUN) * 100).toFixed(2);
      const topLeader = processedMfgData[0];
      return {
        totalTopPkr,
        totalTopUsd,
        shareOfTotal,
        topLeaderName: topLeader?.name || 'N/A',
        topLeaderValueUsd: topLeader?.valueUsdJulJun || 0,
        topLeaderValuePkr: topLeader?.valuePkrJulJun || 0,
        topLeaderShare: topLeader?.sharePctJulJun || 0,
        totalEntitiesInDb: MANUFACTURER_RANKINGS_DATA.length,
        categoryTitle: 'Approved Manufacturing Plant',
      };
    }
  }, [activeView, processedIndData, processedMfgData]);

  // Filtered table rows
  const filteredTableData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return currentChartData;
    return currentChartData.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.materials.some((m) => m.toLowerCase().includes(q))
    );
  }, [currentChartData, searchQuery]);

  // Export current table data to Excel (.xlsx)
  const handleExportExcel = () => {
    const isInd = activeView === 'indentor';
    const dataToExport = filteredTableData.map((row) => {
      const baseRow: Record<string, string | number> = {
        'Rank': row.displayRank,
        [isInd ? 'Indentor Name' : 'Manufacturer Name']: row.name,
        'Sourcing Category': row.category,
        'Total Value USD (Jul25-Jun26)': row.valueUsdJulJun,
        'Total Value PKR (Jul25-Jun26)': row.valuePkrJulJun,
        'Total Value USD (Jan-Dec 2025)': row.valueUsd2025,
        'Total Value PKR (Jan-Dec 2025)': row.valuePkr2025,
        'Share of Spend %': `${row.sharePctJulJun}%`,
        'Cumulative Share %': `${row.cumShare}%`,
        'Base Currency': row.currency,
        'Materials Count': row.materials.length,
        'Materials Supplied': row.materials.join('; '),
      };

      if (isInd && 'origins' in row && Array.isArray(row.origins) && row.origins.length > 0) {
        baseRow['Distinct Origins'] = row.origins.join(', ');
      }

      return baseRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Auto-size columns for clear readability
    worksheet['!cols'] = [
      { wch: 8 },  // Rank
      { wch: 38 }, // Name
      { wch: 15 }, // Category
      { wch: 22 }, // USD Jul-Jun
      { wch: 22 }, // PKR Jul-Jun
      { wch: 22 }, // USD 2025
      { wch: 22 }, // PKR 2025
      { wch: 15 }, // Share %
      { wch: 16 }, // Cum %
      { wch: 12 }, // Currency
      { wch: 14 }, // Materials Count
      { wch: 60 }, // Materials List
      { wch: 30 }, // Origins
    ];

    const workbook = XLSX.utils.book_new();
    const sheetName = `Top ${topCount} ${isInd ? 'Indentors' : 'Mfg'}`.substring(0, 31);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `ATCO_Top_${topCount}_${isInd ? 'Indentors' : 'Manufacturers'}_Data_${dateStr}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="bg-white border-2 border-slate-300 rounded-none shadow-md overflow-hidden space-y-4">
      {/* ========================================================= */}
      {/* 1. TOP MAIN BUTTONS: INDENTOR VIEW / MANUFACTURER VIEW    */}
      {/* ========================================================= */}
      <div className="bg-slate-900 text-white p-3 sm:p-4 border-b-2 border-blue-600 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white rounded-none">
              Annual Business Intelligence
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
              100% Actual Commercial Data
            </span>
            <span className="text-[11px] text-slate-300">
              {activeView === 'indentor'
                ? '131 Indentors Analyzed • PKR 4.02B Total'
                : '353 Manufacturers Analyzed • $14.46M Total'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight mt-1">
            {activeView === 'indentor' ? 'Indentor' : 'Manufacturer'} Annual Business Ranking & Contribution Analysis
          </h3>
        </div>

        {/* TWO MAIN BUTTONS ON TOP */}
        <div className="flex items-center bg-slate-800 p-1 border border-slate-700 rounded-none self-start md:self-auto shadow-inner">
          <button
            id="btn-view-indentor"
            onClick={() => setActiveView('indentor')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer rounded-none ${
              activeView === 'indentor'
                ? 'bg-[#0082cb] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Indentor View</span>
          </button>

          <button
            id="btn-view-manufacturer"
            onClick={() => setActiveView('manufacturer')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer rounded-none ${
              activeView === 'manufacturer'
                ? 'bg-[#0082cb] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Manufacturer View</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SECOND TIER: THREE BUTTONS (TOP 10, TOP 20, TOP 30)   */}
      {/* ========================================================= */}
      <div className="px-4 sm:px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* THREE RANKING BUTTONS: TOP 10, TOP 20, TOP 30 */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 mr-1 select-none">
            Ranking Depth:
          </span>
          <div className="flex items-center bg-white border-2 border-[#0082cb] rounded-none p-0.5 shadow-xs">
            {([10, 20, 30] as const).map((count) => (
              <button
                key={count}
                id={`btn-top-${count}`}
                onClick={() => setTopCount(count)}
                className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer rounded-none ${
                  topCount === count
                    ? 'bg-[#0082cb] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-[#0082cb]'
                }`}
              >
                Top {count}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 font-bold hidden sm:inline">
            (Showing #{1} to #{topCount} of {summaryMetrics.totalEntitiesInDb})
          </span>
        </div>

        {/* Supporting Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Period Toggle */}
          <div className="flex items-center bg-white border border-slate-300 rounded-none p-0.5 shadow-2xs">
            <button
              onClick={() => setPeriod('jul_jun')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-none cursor-pointer ${
                period === 'jul_jun' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Jul 25 - Jun 2026 Annual Business Plan"
            >
              Jul25-Jun26 (Plan)
            </button>
            <button
              onClick={() => setPeriod('jan_dec')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-none cursor-pointer ${
                period === 'jan_dec' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Jan 25 - Dec 2025 Historical Business"
            >
              Jan-Dec 2025
            </button>
            <button
              onClick={() => setPeriod('compare')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-none cursor-pointer ${
                period === 'compare' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Compare Jul25-Jun26 vs Jan-Dec25"
            >
              Compare
            </button>
          </div>

          {/* Sourcing Category Filter */}
          <div className="flex items-center bg-white border border-slate-300 rounded-none p-0.5 shadow-2xs">
            {(['ALL', 'IMPORT', 'LOCAL'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-1 text-[10px] font-bold rounded-none cursor-pointer ${
                  categoryFilter === cat ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'All Channels' : cat}
              </button>
            ))}
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-white border border-slate-300 rounded-none p-0.5 shadow-2xs">
            <button
              onClick={() => setCurrMode('USD')}
              className={`px-2 py-1 text-[10px] font-black rounded-none cursor-pointer ${
                currMode === 'USD' ? 'bg-[#0082cb] text-white' : 'text-slate-600'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrMode('PKR')}
              className={`px-2 py-1 text-[10px] font-black rounded-none cursor-pointer ${
                currMode === 'PKR' ? 'bg-[#0082cb] text-white' : 'text-slate-600'
              }`}
            >
              PKR (Rs.)
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. QUICK KPI TILES FOR CURRENT SELECTION                  */}
      {/* ========================================================= */}
      <div className="px-4 sm:px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-blue-50/70 border-l-4 border-l-[#0082cb] border border-blue-200">
            <div className="text-[10px] font-bold uppercase text-slate-500">
              Top {topCount} Combined Volume
            </div>
            <div className="text-base sm:text-lg font-black text-blue-900 mt-0.5">
              {formatVal(summaryMetrics.totalTopUsd, summaryMetrics.totalTopPkr)}
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5">
              {currMode === 'USD'
                ? `PKR ${(summaryMetrics.totalTopPkr / 1e6).toFixed(1)}M equivalent`
                : `$${(summaryMetrics.totalTopUsd / 1e6).toFixed(2)}M USD equivalent`}
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border-l-4 border-l-emerald-600 border border-emerald-200">
            <div className="text-[10px] font-bold uppercase text-slate-500">
              Concentration in Top {topCount}
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-800 mt-0.5">
              {summaryMetrics.shareOfTotal}%
            </div>
            <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
              of entire annual spend ({summaryMetrics.totalEntitiesInDb} total)
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 border-l-4 border-l-indigo-600 border border-indigo-200">
            <div className="text-[10px] font-bold uppercase text-slate-500">
              #1 Ranked Market Leader
            </div>
            <div className="text-sm sm:text-base font-black text-indigo-900 truncate mt-0.5">
              {summaryMetrics.topLeaderName}
            </div>
            <div className="text-[10px] text-indigo-700 font-black mt-0.5">
              {formatVal(summaryMetrics.topLeaderValueUsd, summaryMetrics.topLeaderValuePkr)} (
              {summaryMetrics.topLeaderShare}% share)
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 border-l-4 border-l-amber-600 border border-amber-200">
            <div className="text-[10px] font-bold uppercase text-slate-500">
              Active Mode & Parameters
            </div>
            <div className="text-sm font-black text-amber-900 mt-0.5">
              {activeView === 'indentor' ? 'Indentor Agency' : 'Manufacturing Plant'}
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5 font-bold">
              Period: {period === 'jul_jun' ? 'Jul25-Jun26 Plan' : period === 'jan_dec' ? 'Jan-Dec 2025' : 'YoY Comparison'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CLICKABLE HEADING ABOVE OF CHART TO OPEN POP-UP SCREEN WITH TABLE       */}
      {/* ========================================================================= */}
      <div className="px-4 sm:px-5">
        <div
          id="heading-master-data-toggle"
          onClick={() => setShowMasterTable(true)}
          className="p-3.5 border-2 border-slate-300 hover:border-[#0082cb] bg-white hover:bg-blue-50/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none group shadow-2xs"
        >
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Table className="w-4 h-4 text-[#0082cb]" />
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 group-hover:text-[#0082cb] transition-colors">
                RELEVANT MASTER DATA: TOP {topCount} {activeView === 'indentor' ? 'INDENTORS' : 'MANUFACTURERS'}
              </h4>
              <span className="text-[10px] font-black px-2 py-0.5 bg-blue-100 text-[#0082cb] border border-blue-200">
                CLICK TO OPEN POP-UP WINDOW
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 font-medium">
              Click here to pop up the master table window • Inspect raw material portfolios, volumes &amp; supply details.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 bg-[#0082cb] group-hover:bg-blue-700 text-white px-3.5 py-2 rounded-none text-xs font-black shadow-xs transition-colors">
            <Table className="w-3.5 h-3.5" />
            <span>Open Table Pop-up</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. THE SINGLE CHART CONTAINER                             */}
      {/* ========================================================= */}
      <div className="px-4 sm:px-5">
        <div className="bg-slate-50/70 p-4 border border-slate-300 rounded-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0082cb]" />
                {activeView === 'indentor' ? 'Indentor' : 'Manufacturer'} Ranking Chart — Top {topCount} Bars
              </span>
              <p className="text-[11px] text-slate-500">
                Sorted by volume volume ({currMode}). Left axis = value bar, Right axis = cumulative Pareto line (orange).
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 inline-block"
                  style={{ backgroundColor: activeView === 'indentor' ? '#4f46e5' : '#0082cb' }}
                />
                Import
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 inline-block"
                  style={{ backgroundColor: activeView === 'indentor' ? '#0d9488' : '#059669' }}
                />
                Local
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-amber-600 inline-block" />
                Cumulative %
              </span>
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="h-96 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={currentChartData}
                layout="horizontal"
                margin={{ top: 15, right: 30, left: 15, bottom: topCount === 30 ? 65 : 45 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="shortName"
                  interval={0}
                  angle={-40}
                  textAnchor="end"
                  tick={{ fontSize: topCount === 30 ? 8.5 : 9.5, fontWeight: 700, fill: '#1e293b' }}
                  height={topCount === 30 ? 75 : 55}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(val) => {
                    if (currMode === 'PKR') {
                      if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
                      return `${(val / 1e6).toFixed(0)}M`;
                    }
                    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
                    return `$${(val / 1e3).toFixed(0)}K`;
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: '#92400e' }}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const item = payload[0].payload as typeof currentChartData[0];
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-none shadow-2xl border border-slate-700 text-xs max-w-sm space-y-1.5 z-50">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                          <span className="font-black text-blue-400">Rank #{item.displayRank}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 font-black ${
                              item.category === 'IMPORT'
                                ? 'bg-blue-950 text-blue-300 border border-blue-700'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <div className="font-bold text-slate-100 text-sm">{item.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Jul25-Jun26 (Plan):</span>
                            <span className="font-black text-emerald-400">
                              {formatVal(item.valueUsdJulJun, item.valuePkrJulJun)}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Jan-Dec 2025:</span>
                            <span className="font-bold text-slate-300">
                              {formatVal(item.valueUsd2025, item.valuePkr2025)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
                          <span className="text-slate-400">Share of Total:</span>
                          <span className="font-black text-amber-400">{item.sharePctJulJun}%</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Cumulative Portfolio Share:</span>
                          <span className="font-black text-amber-300">{item.cumShare}%</span>
                        </div>
                        {'origins' in item && item.origins && (item.origins as string[]).length > 0 && (
                          <div className="text-[10px] text-slate-300 pt-1 border-t border-slate-800">
                            <span className="text-slate-400">Origins:</span>{' '}
                            {(item.origins as string[]).slice(0, 3).join(', ')}
                            {(item.origins as string[]).length > 3 ? ` +${(item.origins as string[]).length - 3}` : ''}
                          </div>
                        )}
                        <div className="text-[10px] text-blue-300 pt-1 border-t border-slate-800 italic">
                          Click bar to inspect {item.materials.length} supplied material(s)
                        </div>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
                />

                {period === 'compare' ? (
                  <>
                    <Bar
                      yAxisId="left"
                      dataKey="chartValueJulJun"
                      name={`Jul25-Jun26 (${currMode})`}
                      fill={activeView === 'indentor' ? '#4f46e5' : '#0082cb'}
                      radius={[2, 2, 0, 0]}
                      onClick={(data) => {
                        if (activeView === 'indentor') setSelectedInd(data as unknown as IndentorRankingItem);
                        else setSelectedMfg(data as unknown as ManufacturerRankingItem);
                      }}
                      cursor="pointer"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="chartValue2025"
                      name={`Jan-Dec 2025 (${currMode})`}
                      fill="#94a3b8"
                      radius={[2, 2, 0, 0]}
                      onClick={(data) => {
                        if (activeView === 'indentor') setSelectedInd(data as unknown as IndentorRankingItem);
                        else setSelectedMfg(data as unknown as ManufacturerRankingItem);
                      }}
                      cursor="pointer"
                    />
                  </>
                ) : (
                  <Bar
                    yAxisId="left"
                    dataKey={period === 'jan_dec' ? 'chartValue2025' : 'chartValueJulJun'}
                    name={
                      period === 'jan_dec'
                        ? `Jan-Dec 2025 Business (${currMode})`
                        : `Jul25-Jun26 Annual Business (${currMode})`
                    }
                    radius={[2, 2, 0, 0]}
                    onClick={(data) => {
                      if (activeView === 'indentor') setSelectedInd(data as unknown as IndentorRankingItem);
                      else setSelectedMfg(data as unknown as ManufacturerRankingItem);
                    }}
                    cursor="pointer"
                  >
                    {currentChartData.map((entry, index) => {
                      let barColor = '#0082cb';
                      if (activeView === 'indentor') {
                        barColor = entry.category === 'LOCAL' ? '#0d9488' : index === 0 ? '#3730a3' : index < 5 ? '#4f46e5' : '#6366f1';
                      } else {
                        barColor = entry.category === 'LOCAL' ? '#059669' : index === 0 ? '#1e40af' : index < 5 ? '#0082cb' : '#38bdf8';
                      }
                      return <Cell key={`bar-cell-${index}`} fill={barColor} />;
                    })}
                  </Bar>
                )}

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumShare"
                  name="Cumulative Share %"
                  stroke="#d97706"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: '#b45309' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. POP-UP MODAL SCREEN FOR MASTER DATA TABLE                              */}
      {/* (SHOWN ONLY WHEN USER CLICKS THE HEADING ABOVE; NOT DISPLAYED BELOW CHART) */}
      {/* ========================================================================= */}
      {showMasterTable && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white border-2 border-[#0082cb] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl rounded-none overflow-hidden">
            {/* Pop-up Header */}
            <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0082cb] text-white">
                  <Table className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-blue-600 text-white">
                      Top {topCount} Selection
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700">
                      {activeView === 'indentor' ? 'Indentors & Agencies' : 'Approved Manufacturers'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {filteredTableData.length} records shown
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight mt-0.5">
                    Relevant Master Data Table — Top {topCount} {activeView === 'indentor' ? 'Indentors' : 'Manufacturers'}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                {/* Excel Export Button in the circled position */}
                <button
                  type="button"
                  id="btn-export-master-table-excel"
                  onClick={handleExportExcel}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-none cursor-pointer transition-all shadow-xs shrink-0"
                  title="Download data as an Excel (.xlsx) file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to Excel</span>
                </button>

                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={`Filter Top ${topCount}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-800 text-white placeholder:text-slate-400 border border-slate-700 rounded-none focus:outline-hidden focus:border-[#0082cb]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowMasterTable(false)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                  title="Close pop-up"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Pop-up Table Content */}
            <div className="p-4 overflow-y-auto flex-1 max-h-[calc(90vh-130px)] space-y-3 bg-slate-50/50">
              <div className="text-[11px] text-slate-600 font-medium flex items-center justify-between">
                <span>Click any row or click &quot;Inspect&quot; to view all supplied materials and pricing details.</span>
                <span className="font-bold text-[#0082cb]">Currency: {currMode}</span>
              </div>

              <div className="overflow-x-auto border border-slate-300 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-slate-100 text-slate-700 font-black uppercase text-[10px] tracking-wider border-b border-slate-300 shadow-2xs">
                      <th className="py-2.5 px-3">Rank</th>
                      <th className="py-2.5 px-3">{activeView === 'indentor' ? 'Indentor Name' : 'Manufacturer Name'}</th>
                      <th className="py-2.5 px-3">Sourcing</th>
                      <th className="py-2.5 px-3 text-right">Jul25-Jun26 (USD)</th>
                      <th className="py-2.5 px-3 text-right">Jul25-Jun26 (PKR)</th>
                      <th className="py-2.5 px-3 text-right">Share %</th>
                      <th className="py-2.5 px-3 text-right">Cum. Share %</th>
                      <th className="py-2.5 px-3 text-center">Materials</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredTableData.map((row) => (
                      <tr
                        key={row.name}
                        onClick={() => {
                          if (activeView === 'indentor') setSelectedInd(row as unknown as IndentorRankingItem);
                          else setSelectedMfg(row as unknown as ManufacturerRankingItem);
                        }}
                        className="hover:bg-blue-50/70 cursor-pointer transition-colors"
                      >
                        <td className="py-2.5 px-3 font-black text-[#0082cb]">#{row.displayRank}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          <div className="max-w-xs sm:max-w-md truncate">{row.name}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded-none ${
                              row.category === 'IMPORT'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {row.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-black text-slate-900">
                          ${row.valueUsdJulJun.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-600">
                          PKR {row.valuePkrJulJun.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right font-black text-amber-700">
                          {row.sharePctJulJun}%
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-600">
                          {row.cumShare}%
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {row.materials.length} SKUs
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (activeView === 'indentor') setSelectedInd(row as unknown as IndentorRankingItem);
                              else setSelectedMfg(row as unknown as ManufacturerRankingItem);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-black uppercase bg-[#0082cb] hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pop-up Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-300 flex items-center justify-between">
              <div className="text-xs text-slate-600 font-bold">
                Showing Top {topCount} {activeView === 'indentor' ? 'Indentors' : 'Manufacturers'} ({summaryMetrics.shareOfTotal}% total business volume)
              </div>
              <button
                type="button"
                onClick={() => setShowMasterTable(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-none cursor-pointer shadow-xs transition-colors"
              >
                Close Pop-up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DRILLDOWN MODAL: MANUFACTURER DETAILS                     */}
      {/* ========================================================= */}
      {selectedMfg && (
        <div className="fixed inset-0 z-[60] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#0082cb] max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl rounded-none">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-black bg-[#0082cb] text-white">
                  Rank #{selectedMfg.rank}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 font-black uppercase ${
                    selectedMfg.category === 'IMPORT'
                      ? 'bg-blue-900 text-blue-200'
                      : 'bg-emerald-900 text-emerald-200'
                  }`}
                >
                  {selectedMfg.category}
                </span>
                <h4 className="text-sm font-black text-white truncate max-w-md">
                  {selectedMfg.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedMfg(null)}
                className="text-slate-400 hover:text-white cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Jul25-Jun26 (USD)</span>
                  <span className="text-sm font-black text-blue-700">
                    ${selectedMfg.valueUsdJulJun.toLocaleString()}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Jul25-Jun26 (PKR)</span>
                  <span className="text-xs font-black text-slate-800">
                    PKR {selectedMfg.valuePkrJulJun.toLocaleString()}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Portfolio Share</span>
                  <span className="text-sm font-black text-emerald-700">
                    {selectedMfg.sharePctJulJun}%
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Jan-Dec 2025 (USD)</span>
                  <span className="text-xs font-black text-slate-700">
                    ${selectedMfg.valueUsd2025.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
                  <span>Supplied Materials Portfolio ({selectedMfg.materials.length})</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    Base Currency: {selectedMfg.currency}
                  </span>
                </h5>
                <div className="border border-slate-200 max-h-60 overflow-y-auto divide-y divide-slate-100">
                  {selectedMfg.materials.map((mat, idx) => (
                    <div
                      key={idx}
                      className="p-2 text-xs text-slate-800 flex items-start gap-2 hover:bg-blue-50/50"
                    >
                      <Package className="w-3.5 h-3.5 text-[#0082cb] shrink-0 mt-0.5" />
                      <span className="font-medium">{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedMfg(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-none cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DRILLDOWN MODAL: INDENTOR DETAILS                         */}
      {/* ========================================================= */}
      {selectedInd && (
        <div className="fixed inset-0 z-[60] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-indigo-600 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl rounded-none">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-black bg-indigo-600 text-white">
                  Rank #{selectedInd.rank}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 font-black uppercase ${
                    selectedInd.category === 'IMPORT'
                      ? 'bg-indigo-900 text-indigo-200'
                      : 'bg-teal-900 text-teal-200'
                  }`}
                >
                  {selectedInd.category}
                </span>
                <h4 className="text-sm font-black text-white truncate max-w-md">
                  {selectedInd.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedInd(null)}
                className="text-slate-400 hover:text-white cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Jul25-Jun26 (USD)</span>
                  <span className="text-sm font-black text-indigo-700">
                    ${selectedInd.valueUsdJulJun.toLocaleString()}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Jul25-Jun26 (PKR)</span>
                  <span className="text-xs font-black text-slate-800">
                    PKR {selectedInd.valuePkrJulJun.toLocaleString()}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Share of Spend</span>
                  <span className="text-sm font-black text-emerald-700">
                    {selectedInd.sharePctJulJun}%
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block">Cumulative Share</span>
                  <span className="text-sm font-black text-amber-700">
                    {selectedInd.cumShareJulJun}%
                  </span>
                </div>
              </div>

              {selectedInd.origins.length > 0 && (
                <div className="bg-blue-50/50 p-2.5 border border-blue-200 text-xs">
                  <span className="text-[10px] font-black uppercase text-blue-900 block mb-1">
                    Distinct Origin Countries & Territory Sourcing:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInd.origins.map((origin) => (
                      <span
                        key={origin}
                        className="px-2 py-0.5 bg-white border border-blue-300 font-bold text-blue-900 text-[11px]"
                      >
                        {origin}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
                  <span>Procured Materials & Formulations ({selectedInd.materials.length})</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    Base Currency: {selectedInd.currency}
                  </span>
                </h5>
                <div className="border border-slate-200 max-h-60 overflow-y-auto divide-y divide-slate-100">
                  {selectedInd.materials.map((mat, idx) => (
                    <div
                      key={idx}
                      className="p-2 text-xs text-slate-800 flex items-start gap-2 hover:bg-indigo-50/50"
                    >
                      <Package className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{mat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedInd(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-none cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
