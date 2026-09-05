import React from 'react';
import {
  DollarSign,
  TrendingUp,
  UploadCloud,
  RefreshCw,
  Download,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Building2,
  Boxes,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency, convertValue } from '../utils/currency';

interface TreeSavingsProps {
  onOpenUpload?: () => void;
}

export const TreeSavingsCommercialization: React.FC<TreeSavingsProps> = () => {
  const {
    cphiData,
    projectSavingsData,
    commercialPoData,
    historicData,
    underDevData,
    maturityData,
    currency,
    summaryStats,
    openDetailModal,
    resetAllDataToDefault,
  } = useData();

  // Accurate calculations from raw datasets
  const histTotalSavingUSD = historicData.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);
  const histJul26 = historicData.filter((r) => (r.year || '').toLowerCase().includes('jul'));
  const histJul26Saving = histJul26.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);
  const histAug26 = historicData.filter((r) => (r.year || '').toLowerCase().includes('aug'));
  const histAug26Saving = histAug26.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);

  const projTotalSavingUSD = projectSavingsData.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);
  const projDec25 = projectSavingsData.filter((r) => (r.year || '').toLowerCase().includes('dec'));
  const projJan26 = projectSavingsData.filter((r) => (r.year || '').toLowerCase().includes('jan'));
  const projFeb26 = projectSavingsData.filter((r) => (r.year || '').toLowerCase().includes('feb'));
  const projMar26 = projectSavingsData.filter((r) => (r.year || '').toLowerCase().includes('mar'));

  const commTotalSavingUSD = commercialPoData.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);
  const commJul26 = commercialPoData.filter((r) => (r.year || '').toLowerCase().includes('jul-26') || (r.year || '').toLowerCase().includes('jul 2026') || (r.year || '').toLowerCase() === 'jul-26');
  const commJul26Saving = commJul26.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);
  const commAug26 = commercialPoData.filter((r) => (r.year || '').toLowerCase().includes('aug-26') || (r.year || '').toLowerCase().includes('aug 2026') || (r.year || '').toLowerCase() === 'aug-26');
  const commAug26Saving = commAug26.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);
  const commOther = commercialPoData.filter((r) => !(r.year || '').toLowerCase().includes('jul-26') && !(r.year || '').toLowerCase().includes('aug-26'));
  const commOtherSaving = commOther.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);

  const cphiTotalSavingUSD = cphiData.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);
  const cphiJul26 = cphiData.filter((r) => (r.date || '').toLowerCase().includes('jul'));
  const cphiJul26Saving = cphiJul26.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);
  const cphiAug26 = cphiData.filter((r) => (r.date || '').toLowerCase().includes('aug'));
  const cphiAug26Saving = cphiAug26.reduce((acc, r) => acc + (r.netSavingsValueUSD || 0), 0);

  const matTotalSavingUSD = maturityData.reduce((acc, r) => acc + (r.annualNetSavingUSD || 0), 0);
  const underDevTotalSavingUSD = underDevData.reduce((acc, r) => acc + (r.annualNetSavingUSD || r.netSavingLoss || 0), 0);

  // Total Matured:
  const totalMaturedSavingUSD = histTotalSavingUSD + projTotalSavingUSD + commTotalSavingUSD + cphiTotalSavingUSD;
  const totalMaturedPOCount = historicData.length + projectSavingsData.length + commercialPoData.length + cphiData.length;

  // Total Non-Matured:
  const totalNonMaturedSavingUSD = matTotalSavingUSD + underDevTotalSavingUSD;
  const totalNonMaturedPipelineCount = maturityData.length + underDevData.length;

  // Total Net:
  const totalNetSavingUSD = totalMaturedSavingUSD + totalNonMaturedSavingUSD;

  // Formatter helper
  const fmt = (usdVal: number, compact: boolean = true) => {
    return formatCurrency(convertValue(usdVal, 'USD', currency), currency, { compact });
  };

  // Export summary helper
  const handleExportSavingsReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Category,Matured/Tentative,Savings (USD),Savings (PKR),PO/Material Count\n' +
      `Alternate Source Developed & Commercially Ordered,Matured,${histTotalSavingUSD},${histTotalSavingUSD * 280},${historicData.length}\n` +
      `22 Project Materials Saving,Matured,${projTotalSavingUSD},${projTotalSavingUSD * 280},${projectSavingsData.length}\n` +
      `Commercial PO Saving,Matured,${commTotalSavingUSD},${commTotalSavingUSD * 280},${commercialPoData.length}\n` +
      `CPHI Saving Since Jul 2026 on-words,Matured,${cphiTotalSavingUSD},${cphiTotalSavingUSD * 280},${cphiData.length}\n` +
      `Alternate Source Developed & Non-Commercialized (Tentative),Tentative,${matTotalSavingUSD},${matTotalSavingUSD * 280},${maturityData.length}\n` +
      `Alternate Under Development Materials (Tentative),Tentative,${underDevTotalSavingUSD},${underDevTotalSavingUSD * 280},${underDevData.length}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Atco_Savings_and_Commercialization_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="tree-savings-commercialization" className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mt-6">
      {/* Top Header & Action Bar just above tree */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <DollarSign className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Total Sourcing and Commercialization Saving Tree
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time tracking of Matured Commercial PO Savings vs Non-Matured Under Development Sourcing Pipeline (Click any tab/month to inspect backend detail)
          </p>
        </div>

        {/* Quick Refresh and Export toolbar right above the tree */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={resetAllDataToDefault}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Tree</span>
          </button>
          <button
            onClick={handleExportSavingsReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Savings Report</span>
          </button>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[960px] max-w-6xl mx-auto flex flex-col items-center select-none">
          
          {/* ========================================================= */}
          {/* LEVEL 1: ROOT SAVINGS NODE */}
          {/* ========================================================= */}
          <div
            onClick={() =>
              openDetailModal({
                title: 'Total Sourcing and Commercialization Saving',
                subtitle: 'Consolidated records across all matured purchase orders and pipeline sourcing materials',
                filterCriteria: 'All Sourcing & Commercialization Records (Consolidated)',
                records: [...historicData, ...commercialPoData, ...projectSavingsData, ...cphiData, ...maturityData, ...underDevData],
                datasetType: 'project',
              })
            }
            className="group cursor-pointer rounded-2xl bg-gradient-to-r from-blue-950 via-sky-900 to-blue-900 text-white px-8 py-3.5 shadow-lg shadow-blue-900/20 hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] border border-sky-500 text-center w-[420px] relative"
            title="Click to view all consolidated sourcing and commercialization records"
          >
            <div className="text-sm sm:text-base font-black tracking-wide">
              Total Sourcing and Commercialization Saving
            </div>
            <div className="text-sm font-bold text-sky-200 mt-0.5">
              Net Saving: {fmt(totalNetSavingUSD, true)} ({currency === 'PKR' ? formatCurrency(totalNetSavingUSD * 280, 'PKR', { compact: false }) : `$${totalNetSavingUSD.toLocaleString()}`})
            </div>
            <div className="text-[11px] text-sky-300 font-medium">
              (Matured: {fmt(totalMaturedSavingUSD, true)} • Tentative: {fmt(totalNonMaturedSavingUSD, true)})
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-3.5 h-3.5 text-sky-300" />
            </div>
          </div>

          {/* SVG Connector from Root to Level 2 (Matured Left & Non-Matured Right) with ARROWS */}
          <div className="w-full flex justify-center -my-1">
            <svg className="w-full h-14 overflow-visible" viewBox="0 0 900 50">
              <defs>
                <marker
                  id="arrow-down"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="8"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 0 L 5 8 z" fill="#0284c7" />
                </marker>
              </defs>
              {/* Vertical trunk from root */}
              <line x1="450" y1="0" x2="450" y2="24" stroke="#0284c7" strokeWidth="2.5" />
              {/* Horizontal crossbar branching left and right */}
              <line x1="280" y1="24" x2="720" y2="24" stroke="#0284c7" strokeWidth="2.5" />
              {/* Left connector to Matured Branch with arrow */}
              <line x1="280" y1="24" x2="280" y2="48" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrow-down)" />
              {/* Right connector to Non-Matured Branch with arrow */}
              <line x1="720" y1="24" x2="720" y2="48" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrow-down)" />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* LEVEL 2: SAVINGS CATEGORY (MATURED VS NON-MATURED) */}
          {/* ========================================================= */}
          <div className="grid grid-cols-12 gap-6 w-full px-2">
            
            {/* ------------------------------------------------------- */}
            {/* LEFT BRANCH (COL 1-8): TOTAL SAVING MATURED */}
            {/* ------------------------------------------------------- */}
            <div className="col-span-8 flex flex-col items-center">
              <div
                onClick={() =>
                  openDetailModal({
                    title: 'TOTAL SAVING MATURED',
                    subtitle: 'All 201 commercial purchase orders and realized procurement savings',
                    filterCriteria: 'Status = MATURED (Historic + Commercial PO + 22 Project + CPHI)',
                    records: [...historicData, ...commercialPoData, ...projectSavingsData, ...cphiData],
                    datasetType: 'project',
                  })
                }
                className="group cursor-pointer rounded-xl bg-blue-800 hover:bg-blue-700 text-white px-6 py-2.5 shadow-md transition-all border border-blue-500 text-center w-80 hover:scale-[1.02] relative"
                title="Click to view all Matured PO records"
              >
                <div className="text-xs font-black uppercase tracking-wider text-sky-200">
                  TOTAL SAVING MATURED
                </div>
                <div className="text-sm font-bold mt-0.5">
                  Value ({fmt(totalMaturedSavingUSD, false)})
                </div>
                <div className="text-[11px] text-blue-200">{totalMaturedPOCount} Commercial Purchase Orders</div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3 h-3 text-sky-300" />
                </div>
              </div>

              {/* Sub-Stems connector to 4 matured children */}
              <div className="w-full flex justify-center -my-1">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 600 30">
                  <path d="M 300 0 L 300 14 L 75 14 L 75 28" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <path d="M 300 14 L 225 14 L 225 28" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <path d="M 300 14 L 375 14 L 375 28" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <path d="M 300 14 L 525 14 L 525 28" fill="none" stroke="#60a5fa" strokeWidth="2" />
                </svg>
              </div>

              {/* 4 Matured Sub-Boxes with their Monthly Tables */}
              <div className="grid grid-cols-4 gap-2.5 w-full mt-1">
                
                {/* 1. Alternate Source Developed & Commercially Ordered */}
                <div className="flex flex-col">
                  <div
                    onClick={() =>
                      openDetailModal({
                        title: 'Alternate Source Developed & Commercially Ordered',
                        subtitle: 'Newly qualified sources with executed commercial purchase orders',
                        filterCriteria: 'Category = Alternate Source Developed & Commercially Ordered (138 POs)',
                        records: historicData,
                        datasetType: 'historic',
                      })
                    }
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-center shadow transition-all duration-150 cursor-pointer hover:scale-[1.02] border border-blue-400"
                    title="Click to view all 138 Alternate Ordered records"
                  >
                    <div className="text-[11px] font-black leading-tight min-h-[28px] flex items-center justify-center">
                      Alternate Source Developed & Commercially Ordered
                    </div>
                    <div className="text-xs font-bold text-sky-100 mt-1">
                      Saving: {fmt(histTotalSavingUSD, false)}
                    </div>
                    <div className="text-[10px] text-blue-200">PO Count ({historicData.length})</div>
                  </div>

                  {/* Breakdown Table for Historic */}
                  <div className="mt-1.5 p-2 bg-blue-50/90 rounded-xl border border-blue-200 text-[10px] space-y-1">
                    <div className="grid grid-cols-12 font-bold text-blue-950 border-b border-blue-200 pb-0.5">
                      <span className="col-span-6">Monthly Status</span>
                      <span className="col-span-3 text-right">Saving</span>
                      <span className="col-span-3 text-right">PO</span>
                    </div>
                    
                    {/* Jul-26 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Alternate Source Commercially Ordered (Jul 2026)',
                          subtitle: 'July 2026 purchase order records and rate variances',
                          filterCriteria: 'Month = Jul-26 & Category = Alternate Source Developed',
                          records: histJul26,
                          datasetType: 'historic',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view Jul-26 detail records (83 POs)"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Jul 2026</span>
                      <span className={`col-span-3 text-right font-bold ${histJul26Saving < 0 ? 'text-rose-600' : 'text-blue-900'}`}>
                        {fmt(histJul26Saving, true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({histJul26.length})</span>
                    </div>

                    {/* Aug-26 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Alternate Source Commercially Ordered (Aug 2026)',
                          subtitle: 'August 2026 purchase order records and rate variances',
                          filterCriteria: 'Month = Aug-26 & Category = Alternate Source Developed',
                          records: histAug26,
                          datasetType: 'historic',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view Aug-26 detail records (55 POs)"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Aug 2026</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(histAug26Saving, true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({histAug26.length})</span>
                    </div>

                    {/* Total Row */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Alternate Source Commercially Ordered (Full Total)',
                          subtitle: 'Consolidated 138 purchase order records',
                          filterCriteria: 'Total Alternate Commercially Ordered',
                          records: historicData,
                          datasetType: 'historic',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-900 font-bold bg-blue-100/60 p-0.5 rounded cursor-pointer transition-colors border-t border-blue-200"
                    >
                      <span className="col-span-6 truncate">Total</span>
                      <span className="col-span-3 text-right text-blue-900">{fmt(histTotalSavingUSD, true)}</span>
                      <span className="col-span-3 text-right">({historicData.length})</span>
                    </div>
                  </div>
                </div>

                {/* 2. 22 Project Materials Saving */}
                <div className="flex flex-col">
                  <div
                    onClick={() =>
                      openDetailModal({
                        title: '22 Project Materials Saving',
                        subtitle: 'Special project materials alternate procurement records',
                        filterCriteria: 'Dataset = Project Materials (7 POs)',
                        records: projectSavingsData,
                        datasetType: 'project',
                      })
                    }
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-center shadow transition-all duration-150 cursor-pointer hover:scale-[1.02] border border-blue-400"
                    title="Click to view all Project materials records (7 POs)"
                  >
                    <div className="text-[11px] font-black leading-tight min-h-[28px] flex items-center justify-center">
                      22 Project Materials Saving
                    </div>
                    <div className="text-xs font-bold text-sky-100 mt-1">
                      Saving: {fmt(projTotalSavingUSD, false)}
                    </div>
                    <div className="text-[10px] text-blue-200">PO Count ({projectSavingsData.length})</div>
                  </div>

                  {/* Breakdown Table for Project */}
                  <div className="mt-1.5 p-2 bg-blue-50/90 rounded-xl border border-blue-200 text-[10px] space-y-1">
                    <div className="grid grid-cols-12 font-bold text-blue-950 border-b border-blue-200 pb-0.5">
                      <span className="col-span-6">Monthly Status</span>
                      <span className="col-span-3 text-right">Saving</span>
                      <span className="col-span-3 text-right">PO</span>
                    </div>

                    {/* Dec-25 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Project Materials Saving (Dec 2025)',
                          subtitle: 'December 2025 project procurement orders',
                          filterCriteria: 'Month = Dec-25 & Category = Project Materials',
                          records: projDec25,
                          datasetType: 'project',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view Dec-25 project records"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Dec 2025</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(projDec25.reduce((a, r) => a + (r.netSavingsValueUSD || 0), 0), true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({projDec25.length})</span>
                    </div>

                    {/* Jan-26 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Project Materials Saving (Jan 2026)',
                          subtitle: 'January 2026 project procurement orders',
                          filterCriteria: 'Month = Jan-26 & Category = Project Materials',
                          records: projJan26,
                          datasetType: 'project',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view Jan-26 project records"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Jan 2026</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(projJan26.reduce((a, r) => a + (r.netSavingsValueUSD || 0), 0), true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({projJan26.length})</span>
                    </div>

                    {/* Feb-26 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Project Materials Saving (Feb 2026)',
                          subtitle: 'February 2026 project procurement orders',
                          filterCriteria: 'Month = Feb-26 & Category = Project Materials',
                          records: projFeb26,
                          datasetType: 'project',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view Feb-26 project records"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Feb 2026</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(projFeb26.reduce((a, r) => a + (r.netSavingsValueUSD || 0), 0), true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({projFeb26.length})</span>
                    </div>

                    {/* Mar-26 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Project Materials Saving (Mar 2026)',
                          subtitle: 'March 2026 project procurement orders',
                          filterCriteria: 'Month = Mar-26 & Category = Project Materials',
                          records: projMar26,
                          datasetType: 'project',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view Mar-26 project records"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Mar 2026</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(projMar26.reduce((a, r) => a + (r.netSavingsValueUSD || 0), 0), true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({projMar26.length})</span>
                    </div>
                  </div>
                </div>

                {/* 3. Commercial PO Saving */}
                <div className="flex flex-col">
                  <div
                    onClick={() =>
                      openDetailModal({
                        title: 'Commercial PO Saving',
                        subtitle: 'Commercial purchase orders executed across active manufacturing orders',
                        filterCriteria: 'Dataset = Commercial PO (47 POs)',
                        records: commercialPoData,
                        datasetType: 'project',
                      })
                    }
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-center shadow transition-all duration-150 cursor-pointer hover:scale-[1.02] border border-blue-400"
                    title="Click to view all 47 Commercial PO records"
                  >
                    <div className="text-[11px] font-black leading-tight min-h-[28px] flex items-center justify-center">
                      Commercial PO Saving
                    </div>
                    <div className="text-xs font-bold text-sky-100 mt-1">
                      Saving: {fmt(commTotalSavingUSD, false)}
                    </div>
                    <div className="text-[10px] text-blue-200">PO Count ({commercialPoData.length})</div>
                  </div>

                  {/* Breakdown Table for Commercial PO */}
                  <div className="mt-1.5 p-2 bg-blue-50/90 rounded-xl border border-blue-200 text-[10px] space-y-1">
                    <div className="grid grid-cols-12 font-bold text-blue-950 border-b border-blue-200 pb-0.5">
                      <span className="col-span-6">Monthly Status</span>
                      <span className="col-span-3 text-right">Saving</span>
                      <span className="col-span-3 text-right">PO</span>
                    </div>

                    {/* Jul-25 to Jun-26 / Historical */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Commercial PO Saving (Jul 25 - Jun 26)',
                          subtitle: 'Purchase orders executed during fiscal baseline period',
                          filterCriteria: 'Period = Jul 25 - Jun 26 & Dataset = Commercial PO',
                          records: commOther,
                          datasetType: 'project',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view Jul 25-Jun 26 Commercial PO records (36 POs)"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Jul 25-Jun 26</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(commOtherSaving, true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({commOther.length})</span>
                    </div>

                    {/* Jul 2026 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Commercial PO Saving (Jul 2026)',
                          subtitle: 'Commercial Purchase Orders executed in July 2026',
                          filterCriteria: 'Month = Jul-26 & Dataset = Commercial PO',
                          records: commJul26,
                          datasetType: 'project',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view July 2026 Commercial PO records (7 POs)"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Jul 2026</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(commJul26Saving, true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({commJul26.length})</span>
                    </div>

                    {/* Aug 2026 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'Commercial PO Saving (Aug 2026)',
                          subtitle: 'Commercial Purchase Orders executed in August 2026',
                          filterCriteria: 'Month = Aug-26 & Dataset = Commercial PO',
                          records: commAug26,
                          datasetType: 'project',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view August 2026 Commercial PO records (4 POs)"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Aug 2026</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(commAug26Saving, true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({commAug26.length})</span>
                    </div>
                  </div>
                </div>

                {/* 4. CPHI Saving Since Jul 2026 on-words */}
                <div className="flex flex-col">
                  <div
                    onClick={() =>
                      openDetailModal({
                        title: 'CPHI Saving Since Jul 2026 on-words',
                        subtitle: 'Savings generated through CPHI exhibition contacts and direct manufacturer contracts',
                        filterCriteria: 'Category = CPHI Materials (9 POs)',
                        records: cphiData,
                        datasetType: 'cphi',
                      })
                    }
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-center shadow transition-all duration-150 cursor-pointer hover:scale-[1.02] border border-blue-400"
                    title="Click to view all 9 CPHI records"
                  >
                    <div className="text-[11px] font-black leading-tight min-h-[28px] flex items-center justify-center">
                      CPHI Saving Since Jul 2026 on-words
                    </div>
                    <div className="text-xs font-bold text-sky-100 mt-1">
                      Saving: {fmt(cphiTotalSavingUSD, false)}
                    </div>
                    <div className="text-[10px] text-blue-200">PO Count ({cphiData.length})</div>
                  </div>

                  {/* Breakdown Table for CPHI */}
                  <div className="mt-1.5 p-2 bg-blue-50/90 rounded-xl border border-blue-200 text-[10px] space-y-1">
                    <div className="grid grid-cols-12 font-bold text-blue-950 border-b border-blue-200 pb-0.5">
                      <span className="col-span-6">Monthly Status</span>
                      <span className="col-span-3 text-right">Saving</span>
                      <span className="col-span-3 text-right">PO</span>
                    </div>

                    {/* Jul 2026 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'CPHI Saving (July 2026)',
                          subtitle: 'CPHI contract purchase orders executed in July 2026',
                          filterCriteria: 'Month = Jul-26 & Category = CPHI Materials',
                          records: cphiJul26,
                          datasetType: 'cphi',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view July 2026 CPHI records (8 POs)"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Jul 2026</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(cphiJul26Saving, true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({cphiJul26.length})</span>
                    </div>

                    {/* Aug 2026 */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'CPHI Saving (August 2026)',
                          subtitle: 'CPHI contract purchase orders executed in August 2026',
                          filterCriteria: 'Month = Aug-26 & Category = CPHI Materials',
                          records: cphiAug26,
                          datasetType: 'cphi',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-800 hover:bg-blue-100 p-0.5 rounded cursor-pointer transition-colors"
                      title="Click to view August 2026 CPHI records (1 PO)"
                    >
                      <span className="col-span-6 truncate font-medium text-blue-700 underline decoration-blue-300">Aug 2026</span>
                      <span className="col-span-3 text-right font-bold text-blue-900">
                        {fmt(cphiAug26Saving, true)}
                      </span>
                      <span className="col-span-3 text-right font-semibold">({cphiAug26.length})</span>
                    </div>

                    {/* Total / On-words */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal({
                          title: 'CPHI Saving Since Jul 2026 on-words (Total)',
                          subtitle: 'All CPHI portfolio purchase orders and long-term contracts',
                          filterCriteria: 'All CPHI Records (9 POs)',
                          records: cphiData,
                          datasetType: 'cphi',
                        });
                      }}
                      className="grid grid-cols-12 text-slate-900 font-bold bg-blue-100/60 p-0.5 rounded cursor-pointer transition-colors border-t border-blue-200"
                    >
                      <span className="col-span-6 truncate">On-words</span>
                      <span className="col-span-3 text-right text-blue-900">{fmt(cphiTotalSavingUSD, true)}</span>
                      <span className="col-span-3 text-right">({cphiData.length})</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ------------------------------------------------------- */}
            {/* RIGHT BRANCH (COL 9-12): TOTAL SAVING NON-MATURED (TENTATIVE) */}
            {/* ------------------------------------------------------- */}
            <div className="col-span-4 flex flex-col items-center">
              <div
                onClick={() =>
                  openDetailModal({
                    title: 'TOTAL SAVING NON-MATURED (TENTATIVE)',
                    subtitle: 'Consolidated 271 materials in active qualification and validation pipeline',
                    filterCriteria: 'Status = TENTATIVE (Non-Commercialized Maturity + Under Development Pipeline)',
                    records: [...maturityData, ...underDevData],
                    datasetType: 'underDev',
                  })
                }
                className="group cursor-pointer rounded-xl bg-blue-800 hover:bg-blue-700 text-white px-5 py-2.5 shadow-md transition-all border border-blue-500 text-center w-72 hover:scale-[1.02] relative"
                title="Click to view all Non-Matured pipeline records"
              >
                <div className="text-xs font-black uppercase tracking-wider text-sky-200">
                  TOTAL SAVING NON-MATURED (TENTATIVE)
                </div>
                <div className="text-sm font-bold mt-0.5">
                  Value ({fmt(totalNonMaturedSavingUSD, false)})
                </div>
                <div className="text-[11px] text-blue-200">{totalNonMaturedPipelineCount} Materials in Pipeline</div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3 h-3 text-sky-300" />
                </div>
              </div>

              {/* Sub-Stems connector to 2 non-matured children */}
              <div className="w-full flex justify-center -my-1">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 300 30">
                  <path d="M 150 0 L 150 14 L 75 14 L 75 28" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <path d="M 150 14 L 225 14 L 225 28" fill="none" stroke="#60a5fa" strokeWidth="2" />
                </svg>
              </div>

              {/* 2 Non-Matured Sub-Boxes */}
              <div className="grid grid-cols-2 gap-2.5 w-full mt-1">
                
                {/* 5. Alternate Source Developed & Non-Commercialized */}
                <div
                  onClick={() =>
                    openDetailModal({
                      title: 'Alternate Source Developed & Non-Commercialized Annual Saving (Tentative)',
                      subtitle: 'Approved AVL sources awaiting purchase requisition / commercial PO release',
                      filterCriteria: 'Status = NON MATURED / ACTIVE (76 records)',
                      records: maturityData,
                      datasetType: 'matured',
                    })
                  }
                  className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-center shadow transition-all duration-150 cursor-pointer hover:scale-[1.02] border border-blue-400 flex flex-col justify-between"
                  title="Click to view all 76 Non-commercialized maturity records"
                >
                  <div className="text-[11px] font-black leading-tight min-h-[36px] flex items-center justify-center">
                    Alternate Source Developed & Non-Commercialized Annual Saving (Tentative)
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-blue-400/70">
                    <div className="text-xs font-bold text-sky-100">
                      Total Annual Saving: {fmt(matTotalSavingUSD, false)}
                    </div>
                    <div className="text-[10px] text-blue-200 mt-0.5">Material Count ({maturityData.length})</div>
                  </div>
                </div>

                {/* 6. Alternate Under Development Materials */}
                <div
                  onClick={() =>
                    openDetailModal({
                      title: 'Alternate Under Development Materials Annual Saving (Tentative)',
                      subtitle: 'Active trials, formulation samples and stability testing across 195 materials',
                      filterCriteria: 'Dataset = Alternate Under Development Pipeline (195 records)',
                      records: underDevData,
                      datasetType: 'underDev',
                    })
                  }
                  className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-center shadow transition-all duration-150 cursor-pointer hover:scale-[1.02] border border-blue-400 flex flex-col justify-between"
                  title="Click to view all 195 Under Development records"
                >
                  <div className="text-[11px] font-black leading-tight min-h-[36px] flex items-center justify-center">
                    Alternate Under Development Materials Annual Saving (Tentative)
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-blue-400/70">
                    <div className="text-xs font-bold text-sky-100">
                      Total Annual Saving: {fmt(underDevTotalSavingUSD, false)}
                    </div>
                    <div className="text-[10px] text-blue-200 mt-0.5">Material Count ({underDevData.length})</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
