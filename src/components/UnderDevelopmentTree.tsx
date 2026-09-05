import React, { useState, useMemo } from 'react';
import {
  FolderTree,
  ChevronRight,
  ChevronDown,
  FlaskConical,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building,
  Layers,
  Sparkles,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency, convertValue } from '../utils/currency';
import { AlternateUnderDevRecord } from '../types';

export const UnderDevelopmentTree: React.FC = () => {
  const { underDevData, currency, openDetailModal } = useData();

  // State to track which tree nodes are expanded
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    root: true,
    'stage-arrangement': true,
    'stage-testing': true,
    'stage-priority': true,
    'stage-stability': true,
  });

  const toggleNode = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Group and compute metrics dynamically from underDevData (supports attached CSV upload)
  const treeMetrics = useMemo(() => {
    let totalSavingUSD = 0;
    let totalMaterials = underDevData.length;
    let totalMfgs = 0;

    const stagesMap: Record<
      string,
      {
        id: string;
        key: string;
        title: string;
        stageCode: string;
        color: string;
        badgeColor: string;
        savingUSD: number;
        materialCount: number;
        mfgCount: number;
        companies: Record<
          string,
          {
            name: string;
            savingUSD: number;
            materialCount: number;
            mfgCount: number;
            materials: AlternateUnderDevRecord[];
          }
        >;
      }
    > = {
      ARRANGEMENT: {
        id: 'stage-arrangement',
        key: 'ARRANGEMENT',
        title: 'Stage 1: Sample Under Arrangement',
        stageCode: 'Arrangement',
        color: 'border-blue-500 bg-blue-50/50 text-blue-900',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        savingUSD: 0,
        materialCount: 0,
        mfgCount: 0,
        companies: {},
      },
      TESTING: {
        id: 'stage-testing',
        key: 'TESTING',
        title: 'Stage 2: Sample Initial Testing',
        stageCode: 'Testing',
        color: 'border-indigo-500 bg-indigo-50/50 text-indigo-900',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        savingUSD: 0,
        materialCount: 0,
        mfgCount: 0,
        companies: {},
      },
      PRIORITY: {
        id: 'stage-priority',
        key: 'PRIORITY',
        title: 'Stage 3: PD Priority Pipeline',
        stageCode: 'Priority',
        color: 'border-rose-500 bg-rose-50/50 text-rose-900',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
        savingUSD: 0,
        materialCount: 0,
        mfgCount: 0,
        companies: {},
      },
      STABILITY: {
        id: 'stage-stability',
        key: 'STABILITY',
        title: 'Stage 4: Sample Stability Studies',
        stageCode: 'Stability',
        color: 'border-purple-500 bg-purple-50/50 text-purple-900',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
        savingUSD: 0,
        materialCount: 0,
        mfgCount: 0,
        companies: {},
      },
    };

    underDevData.forEach((item) => {
      const stageRaw = (item.stage || item.developmentStage || '').toUpperCase();
      let targetKey = 'ARRANGEMENT';

      if (stageRaw.includes('STABILITY') || stageRaw.includes('STAB')) {
        targetKey = 'STABILITY';
      } else if (stageRaw.includes('PRIORITY') || stageRaw.includes('PD')) {
        targetKey = 'PRIORITY';
      } else if (stageRaw.includes('TEST') || stageRaw.includes('INITIAL') || stageRaw.includes('LAB')) {
        targetKey = 'TESTING';
      } else if (stageRaw.includes('ARR') || stageRaw.includes('SAMPLE')) {
        targetKey = 'ARRANGEMENT';
      } else {
        targetKey = 'ARRANGEMENT';
      }

      const saving = item.hasAnnualNetSavingValue
        ? (item.rawAnnualNetSavingUSD ?? 0)
        : (item.rawAnnualNetSavingUSD !== undefined ? item.rawAnnualNetSavingUSD : (item.annualNetSavingUSD || item.netSavingLoss || 0));
      const mfgCount = item.activeMfgCount || 1;
      const comp = item.company || 'LAB';

      totalSavingUSD += saving;
      totalMfgs += 1;

      const stageObj = stagesMap[targetKey];
      stageObj.savingUSD += saving;
      stageObj.materialCount += 1;
      stageObj.mfgCount += 1;

      if (!stageObj.companies[comp]) {
        stageObj.companies[comp] = {
          name: comp === 'LAB' ? 'LAB (Atco Laboratories)' : 'AHL (Atco Health Care)',
          savingUSD: 0,
          materialCount: 0,
          mfgCount: 0,
          materials: [],
        };
      }

      stageObj.companies[comp].savingUSD += saving;
      stageObj.companies[comp].materialCount += 1;
      stageObj.companies[comp].mfgCount += 1;
      stageObj.companies[comp].materials.push(item);
    });

    return {
      totalSavingUSD,
      totalSavingPKR: convertValue(totalSavingUSD, 'USD', 'PKR'),
      totalMaterials,
      totalMfgs,
      stages: Object.values(stagesMap),
    };
  }, [underDevData]);

  const handleRowClick = (title: string, subtitle: string, filterCriteria: string, records: AlternateUnderDevRecord[]) => {
    openDetailModal({
      title,
      subtitle,
      filterCriteria,
      records: records.length > 0 ? records : underDevData,
      datasetType: 'underDev',
    });
  };

  return (
    <div id="under-dev-tree-card" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Tree Card Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
            <FolderTree className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded border border-purple-700">
                4-Stage Tree Hierarchy
              </span>
              <h3 className="text-sm sm:text-base font-extrabold">
                Under Development Total Saving Tree (CSV Data Driven)
              </h3>
            </div>
            <p className="text-[11px] text-slate-300">
              Hierarchical aggregation of {treeMetrics.totalMaterials} materials across 4 stages dynamically calculated from uploaded CSV
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const allExpanded = Object.keys(expandedNodes).every((k) => expandedNodes[k]);
              const next: Record<string, boolean> = { root: true };
              treeMetrics.stages.forEach((s) => {
                next[s.id] = !allExpanded;
                Object.keys(s.companies).forEach((c) => {
                  next[`${s.id}-${c}`] = !allExpanded;
                });
              });
              setExpandedNodes(next);
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 cursor-pointer"
          >
            Expand/Collapse All
          </button>
        </div>
      </div>

      {/* Tree Visualization Content */}
      <div className="p-4 sm:p-5">
        {/* ROOT NODE: Under Development Total Saving */}
        <div className="border border-slate-300 rounded-2xl bg-slate-900 text-white shadow-md overflow-hidden">
          <div
            onClick={() => toggleNode('root')}
            className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/80 transition-colors select-none"
          >
            <div className="flex items-center gap-3">
              <span className="p-1 rounded bg-slate-800 text-slate-300">
                {expandedNodes['root'] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block">
                  Root Portfolio Tree
                </span>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <span>Under Development Total Saving</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 border border-purple-700">
                    {treeMetrics.totalMaterials} Active Materials
                  </span>
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Tentative Saving</span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  {formatCurrency(
                    currency === 'PKR' ? treeMetrics.totalSavingPKR : treeMetrics.totalSavingUSD,
                    currency
                  )}
                </span>
              </div>
              <div className="text-right border-l border-slate-700 pl-4">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Alt Manufacturers</span>
                <span className="text-sm font-black text-cyan-300">{treeMetrics.totalMfgs} Approved/Sample</span>
              </div>
            </div>
          </div>

          {/* STAGE LEVEL NODES */}
          {expandedNodes['root'] && (
            <div className="p-3 bg-slate-950/60 border-t border-slate-800 space-y-3">
              {treeMetrics.stages.map((stage) => {
                const isStageExpanded = expandedNodes[stage.id] ?? true;
                const stageShare = treeMetrics.totalSavingUSD > 0
                  ? ((stage.savingUSD / treeMetrics.totalSavingUSD) * 100).toFixed(1)
                  : '0';

                return (
                  <div
                    key={stage.id}
                    className="border border-slate-800 rounded-xl bg-slate-900/90 overflow-hidden shadow-xs"
                  >
                    {/* Stage Header Row */}
                    <div
                      onClick={() => toggleNode(stage.id)}
                      className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer hover:bg-slate-800 transition-colors select-none"
                    >
                      <div className="flex items-center gap-2.5 pl-2">
                        <span className="text-slate-400">
                          {isStageExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${stage.badgeColor}`}>
                          {stage.stageCode}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-100">
                          {stage.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold pl-8 sm:pl-0">
                        <span className="text-slate-300">
                          <strong className="text-white">{stage.materialCount}</strong> Materials ({stage.mfgCount} Mfgs)
                        </span>
                        <span className="text-purple-300 font-mono">
                          {stageShare}% Share
                        </span>
                        <span className="text-emerald-400 font-black font-mono">
                          {formatCurrency(
                            currency === 'PKR' ? stage.savingUSD * 280 : stage.savingUSD,
                            currency
                          )}
                        </span>
                      </div>
                    </div>

                    {/* COMPANY LEVEL NODES */}
                    {isStageExpanded && (
                      <div className="p-2.5 bg-slate-950 border-t border-slate-800 space-y-2 pl-4 sm:pl-8">
                        {Object.entries(stage.companies).map(([compCode, rawCompData]) => {
                          const compData = rawCompData as {
                            name: string;
                            savingUSD: number;
                            materialCount: number;
                            mfgCount: number;
                            materials: AlternateUnderDevRecord[];
                          };
                          const compNodeId = `${stage.id}-${compCode}`;
                          const isCompExpanded = expandedNodes[compNodeId] ?? false;

                          return (
                            <div
                              key={compCode}
                              className="border border-slate-800/80 rounded-lg bg-slate-900/60 overflow-hidden"
                            >
                              <div
                                onClick={() => toggleNode(compNodeId)}
                                className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/60 transition-colors select-none text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-500">
                                    {isCompExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                  </span>
                                  <Building className="w-3.5 h-3.5 text-blue-400" />
                                  <span className="font-bold text-slate-200">{compData.name}</span>
                                  <span className="text-[10px] text-slate-400">({compData.materialCount} items)</span>
                                </div>

                                <div className="flex items-center gap-3 text-xs">
                                  <span className="text-emerald-400 font-mono font-bold">
                                    {formatCurrency(
                                      currency === 'PKR' ? compData.savingUSD * 280 : compData.savingUSD,
                                      currency
                                    )}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRowClick(
                                        `${stage.title} > ${compData.name}`,
                                        `Detailed material records for ${stage.stageCode} in ${compCode}`,
                                        `${stage.stageCode} | ${compCode}`,
                                        compData.materials
                                      );
                                    }}
                                    className="px-2 py-0.5 rounded bg-blue-900/80 hover:bg-blue-800 text-blue-200 text-[10px] font-bold border border-blue-700"
                                  >
                                    Inspect ({compData.materials.length})
                                  </button>
                                </div>
                              </div>

                              {/* LEAF NODES (Individual Material rows preview) */}
                              {isCompExpanded && (
                                <div className="p-2 bg-slate-950/90 border-t border-slate-800/80 divide-y divide-slate-900">
                                  {compData.materials.map((mat, idx) => (
                                    <div
                                      key={`${mat.materialCode}-${idx}`}
                                      onClick={() =>
                                        handleRowClick(
                                          `Material: ${mat.materialName} (${mat.materialCode})`,
                                          `Stage: ${mat.developmentStage || stage.stageCode} • Current Mfg: ${mat.commercialMfgName || 'N/A'} • Alternate Mfg: ${mat.manufacturerName || 'N/A'}`,
                                          `Code: ${mat.materialCode}`,
                                          [mat]
                                        )
                                      }
                                      className="py-1.5 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-slate-900 cursor-pointer text-xs transition-colors rounded"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                        <span className="font-mono text-[11px] text-sky-400 font-bold">
                                          {mat.materialCode}
                                        </span>
                                        <span className="font-medium text-slate-300">
                                          {mat.materialName}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pl-4 sm:pl-0">
                                        <span className="truncate max-w-[150px]">
                                          Alt: {mat.manufacturerName || 'Under Arrangement'}
                                        </span>
                                        <span className="text-emerald-400 font-bold font-mono">
                                          {formatCurrency(
                                            currency === 'PKR'
                                              ? (mat.annualNetSavingUSD || mat.netSavingLoss || 0) * 280
                                              : (mat.annualNetSavingUSD || mat.netSavingLoss || 0),
                                            currency
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
