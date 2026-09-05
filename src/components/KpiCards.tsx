import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  Layers,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  DollarSign,
  Building,
  CheckCircle2,
  Clock,
  FlaskConical,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency, convertValue } from '../utils/currency';

interface KpiCardsProps {
  onOpenHierarchyTree?: () => void;
  onOpenSavingsTree?: () => void;
  onOpenUnderDevTree?: () => void;
  onScrollToTree1?: () => void;
  onScrollToTree2?: () => void;
  onOpenProcessImprovement?: (tab?: 'performed' | 'upcoming' | 'both') => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  onOpenHierarchyTree,
  onOpenSavingsTree,
  onOpenUnderDevTree,
  onScrollToTree1,
  onScrollToTree2,
  onOpenProcessImprovement,
}) => {
  const { summaryStats, currency, underDevData, openDetailModal } = useData();

  const handleOpenSavings = () => {
    if (onOpenSavingsTree) onOpenSavingsTree();
    else if (onScrollToTree2) onScrollToTree2();
  };

  const handleOpenHierarchy = () => {
    if (onOpenHierarchyTree) onOpenHierarchyTree();
    else if (onScrollToTree1) onScrollToTree1();
  };

  const handleOpenProcessImprovement = (tab: 'performed' | 'upcoming' | 'both' = 'performed') => {
    if (onOpenProcessImprovement) {
      onOpenProcessImprovement(tab);
    } else {
      const el = document.getElementById('process-improvement');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Compute breakdown for the 4 Under Dev stages from Dataset 1 matching Tree 4-stage hierarchy
  const stageStats = React.useMemo(() => {
    const stages = {
      underArrangement: { count: 0, mfgCount: 0, netSavingUSD: 0, records: [] as any[] },
      initialTesting: { count: 0, mfgCount: 0, netSavingUSD: 0, records: [] as any[] },
      pdPriority: { count: 0, mfgCount: 0, netSavingUSD: 0, records: [] as any[] },
      underStability: { count: 0, mfgCount: 0, netSavingUSD: 0, records: [] as any[] },
    };

    underDevData.forEach((row) => {
      const stageRaw = (row.stage || row.developmentStage || '').toUpperCase();
      const saving = row.hasAnnualNetSavingValue
        ? (row.rawAnnualNetSavingUSD ?? 0)
        : (row.rawAnnualNetSavingUSD !== undefined
            ? row.rawAnnualNetSavingUSD
            : (row.annualNetSavingUSD || row.netSavingLoss || 0));

      if (stageRaw.includes('STABILITY') || stageRaw.includes('STAB')) {
        stages.underStability.count += 1;
        stages.underStability.mfgCount += 1;
        stages.underStability.netSavingUSD += saving;
        stages.underStability.records.push(row);
      } else if (stageRaw.includes('PRIORITY') || stageRaw.includes('PD')) {
        stages.pdPriority.count += 1;
        stages.pdPriority.mfgCount += 1;
        stages.pdPriority.netSavingUSD += saving;
        stages.pdPriority.records.push(row);
      } else if (stageRaw.includes('TEST') || stageRaw.includes('INITIAL') || stageRaw.includes('LAB')) {
        stages.initialTesting.count += 1;
        stages.initialTesting.mfgCount += 1;
        stages.initialTesting.netSavingUSD += saving;
        stages.initialTesting.records.push(row);
      } else {
        stages.underArrangement.count += 1;
        stages.underArrangement.mfgCount += 1;
        stages.underArrangement.netSavingUSD += saving;
        stages.underArrangement.records.push(row);
      }
    });

    return stages;
  }, [underDevData]);

  // Card 1: Total Saving in Value ($3.21M Matured + $670K Tentative)
  const totalSavingDisplay =
    currency === 'PKR'
      ? formatCurrency(summaryStats.totalSavingsPKR, 'PKR', { compact: true })
      : formatCurrency(summaryStats.totalSavingsUSD, 'USD', { compact: true });

  const maturedSavingDisplay =
    currency === 'PKR'
      ? formatCurrency(summaryStats.maturedSavingsPKR, 'PKR', { compact: true })
      : formatCurrency(summaryStats.maturedSavingsUSD, 'USD', { compact: true });

  const tentativeSavingDisplay =
    currency === 'PKR'
      ? formatCurrency(summaryStats.tentativeSavingsPKR, 'PKR')
      : formatCurrency(summaryStats.tentativeSavingsUSD, 'USD');

  // Card 2: Total Active Material and Annual Buying Value
  const activeBuyingValueDisplay =
    currency === 'PKR'
      ? formatCurrency(summaryStats.totalAnnualBuyingPKR, 'PKR', { compact: true })
      : formatCurrency(summaryStats.totalAnnualBuyingUSD, 'USD', { compact: true });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4.5">
      {/* ========================================================= */}
      {/* 1. RECTANGULAR CARD: TOTAL SAVING IN VALUE */}
      {/* ========================================================= */}
      <div
        id="kpi-card-total-savings"
        onClick={handleOpenSavings}
        className="group relative bg-white rounded-none p-5 border border-slate-300 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 cursor-pointer flex flex-col justify-between border-t-4 border-t-blue-600"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[11px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              <DollarSign className="w-3.5 h-3.5" />
              Procurement Savings
            </span>

            {/* Circular popup trigger button */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleOpenSavings();
              }}
              className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 transition-all rounded-none cursor-pointer group/btn"
              title="Click circular icon or button to open Savings Tree in Popup Modal"
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 group-hover/btn:bg-white text-white group-hover/btn:text-blue-600 flex items-center justify-center transition-colors shadow-xs">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider">
                View Savings Tree
              </span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-600">Total Sourcing & Commercial Savings</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {totalSavingDisplay}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-300">
              Combined Net
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Click circular trigger above to open <strong>Sourcing & Commercialization Tree</strong> popup
          </p>
        </div>

        {/* Sub metrics inside Card 1 */}
        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-none border border-slate-200">
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpenSavings();
            }}
            className="hover:bg-white p-1.5 rounded-none transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="text-[10px] uppercase font-bold text-slate-500">Matured Saving</div>
            <div className="text-sm font-extrabold text-blue-700">{maturedSavingDisplay}</div>
            <div className="text-[10px] text-slate-400">POs & Commercial</div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpenSavings();
            }}
            className="hover:bg-white p-1.5 rounded-none transition-colors border-l border-slate-200 pl-2 hover:border-slate-200"
          >
            <div className="text-[10px] uppercase font-bold text-slate-500">Tentative Saving</div>
            <div className="text-sm font-extrabold text-emerald-700">{tentativeSavingDisplay}</div>
            <div className="text-[10px] text-slate-400">Under Development</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. RECTANGULAR CARD: TOTAL ACTIVE MATERIAL & MFG STATUS */}
      {/* ========================================================= */}
      <div
        id="kpi-card-active-materials"
        onClick={handleOpenHierarchy}
        className="group relative bg-white rounded-none p-5 border border-slate-300 shadow-xs hover:shadow-md hover:border-indigo-400 transition-all duration-200 cursor-pointer flex flex-col justify-between border-t-4 border-t-indigo-600"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[11px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Package className="w-3.5 h-3.5" />
              Active Portfolio
            </span>

            {/* Circular popup trigger button */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleOpenHierarchy();
              }}
              className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 hover:border-indigo-600 transition-all rounded-none cursor-pointer group/btn"
              title="Click circular icon or button to open Hierarchy Tree in Popup Modal"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-600 group-hover/btn:bg-white text-white group-hover/btn:text-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider">
                View Hierarchy Tree
              </span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-600">Total Active Material & Mfg Status</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              445 Materials
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-none border border-indigo-300">
              {activeBuyingValueDisplay}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Jul 25-Jun 26 Annual Buying across <strong>LAB (351)</strong> & <strong>AHL (94)</strong>
          </p>
        </div>

        {/* Sub metrics inside Card 2 */}
        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-3 gap-1.5 bg-slate-50 p-2.5 rounded-none border border-slate-200 text-center">
          <div className="hover:bg-white p-1 rounded-none transition-colors border border-transparent hover:border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-500">Fixed Src</div>
            <div className="text-sm font-extrabold text-slate-800">161</div>
            <div className="text-[10px] text-slate-400">
              {currency === 'PKR' ? 'PKR 986M' : '$3.52M'}
            </div>
          </div>
          <div className="hover:bg-white p-1 rounded-none transition-colors border-x border-slate-200 hover:border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-500">Multi Src</div>
            <div className="text-sm font-extrabold text-slate-800">151</div>
            <div className="text-[10px] text-slate-400">
              {currency === 'PKR' ? 'PKR 1.88B' : '$6.71M'}
            </div>
          </div>
          <div className="hover:bg-white p-1 rounded-none transition-colors border border-transparent hover:border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-500">Single Src</div>
            <div className="text-sm font-extrabold text-slate-800">133</div>
            <div className="text-[10px] text-slate-400">
              {currency === 'PKR' ? 'PKR 1.05B' : '$3.75M'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. RECTANGULAR CARD: UNDER DEVELOPMENT MATERIALS CURRENT STATUS */}
      {/* ========================================================= */}
      <div
        id="kpi-card-under-dev-status"
        onClick={onOpenUnderDevTree}
        className="group relative bg-white rounded-none p-5 border border-slate-300 shadow-xs hover:shadow-md hover:border-sky-400 transition-all duration-200 cursor-pointer flex flex-col justify-between border-t-4 border-t-sky-600"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[11px] font-black uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
              <FlaskConical className="w-3.5 h-3.5" />
              Alternate Pipeline
            </span>

            {/* Circular popup trigger button */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenUnderDevTree) onOpenUnderDevTree();
              }}
              className="flex items-center gap-1.5 px-2 py-1 bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200 hover:border-sky-600 transition-all rounded-none cursor-pointer group/btn"
              title="Navigate to Under Development 4-Stage Tree Pipeline"
            >
              <span className="w-5 h-5 rounded-full bg-sky-600 group-hover/btn:bg-white text-white group-hover/btn:text-sky-600 flex items-center justify-center transition-colors shadow-xs">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider">
                Open 4-Stage Tree
              </span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-600">Under Development Materials Current Status</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {underDevData.length} Materials
            </span>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-none border border-sky-300">
              {stageStats.underArrangement.mfgCount +
                stageStats.initialTesting.mfgCount +
                stageStats.underStability.mfgCount +
                stageStats.pdPriority.mfgCount}{' '}
              Mfgs
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Annual Tentative Net Saving: <strong className="text-emerald-700 font-bold">{tentativeSavingDisplay}</strong>
          </p>
        </div>

        {/* 4 Interactive Sub Boxes for the 4 Stages in Rectangular Format */}
        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-none border border-slate-200">
          {/* Stage 1: Under Arrangement */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              openDetailModal({
                title: 'Stage 1: Under Arrangement Materials',
                subtitle: 'Materials and active manufacturers currently under sourcing arrangement',
                filterCriteria: 'Stage = UNDER ARRANGEMENT',
                records: stageStats.underArrangement.records,
                datasetType: 'underDev',
              });
            }}
            className="p-1.5 rounded-none bg-white border border-slate-300 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-slate-600 truncate flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-none bg-amber-500 shrink-0" />
              1. Arrangement
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs font-extrabold text-slate-800">
                {stageStats.underArrangement.count} Mat ({stageStats.underArrangement.mfgCount} Mfg)
              </span>
              <span className="text-[10px] font-bold text-emerald-600">
                {formatCurrency(
                  convertValue(stageStats.underArrangement.netSavingUSD, 'USD', currency),
                  currency,
                  { compact: true }
                )}
              </span>
            </div>
          </div>

          {/* Stage 2: Initial Testing */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              openDetailModal({
                title: 'Stage 2: Initial Testing Materials',
                subtitle: 'Samples submitted and under laboratory evaluation',
                filterCriteria: 'Stage = INITIAL TESTING',
                records: stageStats.initialTesting.records,
                datasetType: 'underDev',
              });
            }}
            className="p-1.5 rounded-none bg-white border border-slate-300 hover:border-blue-500 hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-slate-600 truncate flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-none bg-blue-500 shrink-0" />
              2. Initial Testing
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs font-extrabold text-slate-800">
                {stageStats.initialTesting.count} Mat ({stageStats.initialTesting.mfgCount} Mfg)
              </span>
              <span className="text-[10px] font-bold text-emerald-600">
                {formatCurrency(
                  convertValue(stageStats.initialTesting.netSavingUSD, 'USD', currency),
                  currency,
                  { compact: true }
                )}
              </span>
            </div>
          </div>

          {/* Stage 3: PD Priority */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              openDetailModal({
                title: 'Stage 3: PD Priority Pipeline',
                subtitle: 'High-priority formulation and commercial conversion pipeline',
                filterCriteria: 'Stage = AT PD PRIORITY',
                records: stageStats.pdPriority.records,
                datasetType: 'underDev',
              });
            }}
            className="p-1.5 rounded-none bg-white border border-slate-300 hover:border-rose-500 hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-slate-600 truncate flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-none bg-rose-500 shrink-0" />
              3. PD Priority
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs font-extrabold text-slate-800">
                {stageStats.pdPriority.count} Mat ({stageStats.pdPriority.mfgCount} Mfg)
              </span>
              <span className="text-[10px] font-bold text-emerald-600">
                {formatCurrency(
                  convertValue(stageStats.pdPriority.netSavingUSD, 'USD', currency),
                  currency,
                  { compact: true }
                )}
              </span>
            </div>
          </div>

          {/* Stage 4: Under Stability */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              openDetailModal({
                title: 'Stage 4: Sample Stability Studies',
                subtitle: 'Accelerated and real-time stability trials ongoing',
                filterCriteria: 'Stage = AT STABILITY',
                records: stageStats.underStability.records,
                datasetType: 'underDev',
              });
            }}
            className="p-1.5 rounded-none bg-white border border-slate-300 hover:border-purple-500 hover:shadow-xs transition-all cursor-pointer"
          >
            <div className="text-[10px] font-bold text-slate-600 truncate flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-none bg-purple-500 shrink-0" />
              4. Stability Studies
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs font-extrabold text-slate-800">
                {stageStats.underStability.count} Mat ({stageStats.underStability.mfgCount} Mfg)
              </span>
              <span className="text-[10px] font-bold text-emerald-600">
                {formatCurrency(
                  convertValue(stageStats.underStability.netSavingUSD, 'USD', currency),
                  currency,
                  { compact: true }
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. RECTANGULAR CARD: PROCESS IMPROVEMENT & DIGITAL TRANSFORMATION */}
      {/* ========================================================= */}
      <div
        id="kpi-card-process-improvement"
        onClick={handleOpenProcessImprovement}
        className="group relative bg-white rounded-none p-5 border border-slate-300 shadow-xs hover:shadow-md hover:border-indigo-400 transition-all duration-200 cursor-pointer flex flex-col justify-between border-t-4 border-t-indigo-600"
      >
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[11px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5" />
              Transformation
            </span>

            {/* Circular trigger button */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleOpenProcessImprovement();
              }}
              className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 hover:border-indigo-600 transition-all rounded-none cursor-pointer group/btn"
              title="Click circular icon or button to open 4th Section: Process Improvement & Digitalization"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-600 group-hover/btn:bg-white text-white group-hover/btn:text-indigo-600 flex items-center justify-center transition-colors shadow-xs">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider">
                Open 4th Box
              </span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-600">Process Improvement & Digitalization</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              15
            </span>
            <span className="text-sm font-bold text-slate-700">Total Initiatives</span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-none border border-indigo-300">
              Active Hub
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Click trigger or sub-boxes below to open <strong>Process Improvement & Digital Transformation</strong>
          </p>
        </div>

        {/* Sub boxes inside Card 4: Only contain names PERFORMED INITIATIVES & IN-PROGRESS INITIATIVES */}
        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-none border border-slate-200">
          <div
            id="subbox-performed-initiatives"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenProcessImprovement('performed');
            }}
            className="p-2.5 rounded-none bg-white border border-slate-300 hover:border-blue-600 hover:bg-blue-50/40 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group/sub1"
            title="Click to view PERFORMED INITIATIVES"
          >
            <div className="text-[11px] font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5 group-hover/sub1:text-blue-700">
              <span className="w-2 h-2 rounded-none bg-blue-600 shrink-0" />
              PERFORMED INITIATIVES
            </div>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
              <span className="text-xs font-black text-slate-900">12 Initiatives</span>
              <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center group-hover/sub1:bg-blue-600 group-hover/sub1:text-white transition-colors">
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div
            id="subbox-inprogress-initiatives"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenProcessImprovement('upcoming');
            }}
            className="p-2.5 rounded-none bg-white border border-slate-300 hover:border-purple-600 hover:bg-purple-50/40 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group/sub2"
            title="Click to view IN-PROGRESS INITIATIVES"
          >
            <div className="text-[11px] font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5 group-hover/sub2:text-purple-700">
              <span className="w-2 h-2 rounded-none bg-purple-600 shrink-0" />
              IN-PROGRESS INITIATIVES
            </div>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
              <span className="text-xs font-black text-slate-900">3 Initiatives</span>
              <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center group-hover/sub2:bg-purple-600 group-hover/sub2:text-white transition-colors">
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

