import React, { useState } from 'react';
import {
  FlaskConical,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  TrendingUp,
  Filter,
  Search,
  Layers,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/currency';
import { AlternateUnderDevRecord } from '../types';
import { UnderDevelopmentTree } from './UnderDevelopmentTree';

export const UnderDevelopmentPipeline: React.FC = () => {
  const { underDevData, currency, openDetailModal } = useData();
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  // Group stats
  const stageGroups = React.useMemo(() => {
    const groups: {
      [key: string]: {
        count: number;
        mfgCount: number;
        netSavingUSD: number;
        items: AlternateUnderDevRecord[];
      };
    } = {
      ARRANGEMENT: { count: 0, mfgCount: 0, netSavingUSD: 0, items: [] },
      TESTING: { count: 0, mfgCount: 0, netSavingUSD: 0, items: [] },
      STABILITY: { count: 0, mfgCount: 0, netSavingUSD: 0, items: [] },
      PD_PRIORITY: { count: 0, mfgCount: 0, netSavingUSD: 0, items: [] },
    };

    underDevData.forEach((row) => {
      const st = (row.developmentStage || row.stage || '').toUpperCase();
      const saving = row.annualNetSavingUSD || row.netSavingLoss || 0;
      const mfg = row.activeMfgCount || 1;

      if (st.includes('ARRANGEMENT')) {
        groups.ARRANGEMENT.count += 1;
        groups.ARRANGEMENT.mfgCount += mfg;
        groups.ARRANGEMENT.netSavingUSD += saving;
        groups.ARRANGEMENT.items.push(row);
      } else if (st.includes('INITIAL') || st.includes('TESTING')) {
        groups.TESTING.count += 1;
        groups.TESTING.mfgCount += mfg;
        groups.TESTING.netSavingUSD += saving;
        groups.TESTING.items.push(row);
      } else if (st.includes('STABILITY')) {
        groups.STABILITY.count += 1;
        groups.STABILITY.mfgCount += mfg;
        groups.STABILITY.netSavingUSD += saving;
        groups.STABILITY.items.push(row);
      } else {
        groups.PD_PRIORITY.count += 1;
        groups.PD_PRIORITY.mfgCount += mfg;
        groups.PD_PRIORITY.netSavingUSD += saving;
        groups.PD_PRIORITY.items.push(row);
      }
    });

    return groups;
  }, [underDevData]);

  // Filter items based on selectedStage and search
  const filteredRecords = React.useMemo(() => {
    let items = underDevData;
    if (selectedStage !== 'ALL') {
      if (selectedStage === 'ARRANGEMENT') {
        items = stageGroups.ARRANGEMENT.items;
      } else if (selectedStage === 'TESTING') {
        items = stageGroups.TESTING.items;
      } else if (selectedStage === 'STABILITY') {
        items = stageGroups.STABILITY.items;
      } else if (selectedStage === 'PD_PRIORITY') {
        items = stageGroups.PD_PRIORITY.items;
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (r) =>
          r.materialName.toLowerCase().includes(q) ||
          r.materialCode.toLowerCase().includes(q) ||
          (r.currentManufacturer && r.currentManufacturer.toLowerCase().includes(q)) ||
          (r.sampleManufacturerName && r.sampleManufacturerName.toLowerCase().includes(q))
      );
    }
    return items;
  }, [underDevData, selectedStage, search, stageGroups]);

  const stagesList = [
    {
      id: 'ARRANGEMENT',
      title: 'Sample Under Arrangement',
      count: stageGroups.ARRANGEMENT.count,
      mfgCount: stageGroups.ARRANGEMENT.mfgCount,
      savingUSD: stageGroups.ARRANGEMENT.netSavingUSD,
      color: 'border-blue-500 bg-blue-50/50 text-blue-900',
      icon: Clock,
      badge: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'TESTING',
      title: 'Sample Initial Testing',
      count: stageGroups.TESTING.count,
      mfgCount: stageGroups.TESTING.mfgCount,
      savingUSD: stageGroups.TESTING.netSavingUSD,
      color: 'border-indigo-500 bg-indigo-50/50 text-indigo-900',
      icon: FlaskConical,
      badge: 'bg-indigo-100 text-indigo-800',
    },
    {
      id: 'PD_PRIORITY',
      title: 'PD Priority Pipeline',
      count: stageGroups.PD_PRIORITY.count,
      mfgCount: stageGroups.PD_PRIORITY.mfgCount,
      savingUSD: stageGroups.PD_PRIORITY.netSavingUSD,
      color: 'border-rose-500 bg-rose-50/50 text-rose-900',
      icon: AlertCircle,
      badge: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'STABILITY',
      title: 'Sample Stability Studies',
      count: stageGroups.STABILITY.count,
      mfgCount: stageGroups.STABILITY.mfgCount,
      savingUSD: stageGroups.STABILITY.netSavingUSD,
      color: 'border-purple-500 bg-purple-50/50 text-purple-900',
      icon: CheckCircle2,
      badge: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <div id="under-dev-pipeline" className="space-y-6">
      {/* Dynamic Hierarchical Tree Structure as requested */}
      <UnderDevelopmentTree />

      {/* 4 Pipeline Stage Cards */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                <FlaskConical className="w-5 h-5" />
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                4-Stage Pipeline Stage Cards & Live Drilldown
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any stage card to filter material table or open full audit logs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedStage('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedStage === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Stages ({underDevData.length})
            </button>
          </div>
        </div>

        {/* 4 Pipeline Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stagesList.map((st) => {
            const Icon = st.icon;
            const isSelected = selectedStage === st.id;
            return (
              <div
                key={st.id}
                onClick={() => setSelectedStage(isSelected ? 'ALL' : st.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  st.color
                } ${
                  isSelected
                    ? 'ring-2 ring-blue-600 shadow-md scale-[1.02]'
                    : 'hover:border-slate-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${st.badge}`}>
                      {st.id.replace('_', ' ')}
                    </span>
                    <Icon className="w-4 h-4 opacity-80" />
                  </div>
                  <h3 className="font-extrabold text-xs sm:text-sm mt-2 text-slate-900 leading-tight">
                    {st.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Materials</span>
                    <span className="text-base font-black text-slate-900">{st.count}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Net Saving</span>
                    <span className="text-sm font-black text-emerald-700 font-mono">
                      {formatCurrency(
                        currency === 'PKR' ? st.savingUSD * 280 : st.savingUSD,
                        currency
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Filtered Table */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                Under Development Materials List
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {filteredRecords.length} records
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search material, code, manufacturer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-black text-[10px] uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Material Code</th>
                  <th className="py-2.5 px-3">Material Description</th>
                  <th className="py-2.5 px-3">Current Active Mfg</th>
                  <th className="py-2.5 px-3">Sample Alternate Mfg</th>
                  <th className="py-2.5 px-3 text-center">Stage</th>
                  <th className="py-2.5 px-3 text-right">Tentative Saving ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredRecords.slice(0, 10).map((row, idx) => (
                  <tr
                    key={`${row.materialCode}-${idx}`}
                    onClick={() =>
                      openDetailModal({
                        title: `Material: ${row.materialName}`,
                        subtitle: `Code: ${row.materialCode} • Current Mfg: ${row.currentManufacturer || 'N/A'} • Alternate: ${row.sampleManufacturerName || 'N/A'}`,
                        filterCriteria: `Code: ${row.materialCode}`,
                        records: [row],
                        datasetType: 'underDev',
                      })
                    }
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">
                      {row.materialCode}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">
                      {row.materialName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {row.currentManufacturer || 'Approved'}
                    </td>
                    <td className="py-2.5 px-3 text-indigo-700 font-semibold">
                      {row.sampleManufacturerName || row.underDevMfg || 'In Arrangement'}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {row.developmentStage || row.stage || 'In Process'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-700 font-mono">
                      {formatCurrency(
                        currency === 'PKR'
                          ? (row.annualNetSavingUSD || row.netSavingLoss || 0) * 280
                          : (row.annualNetSavingUSD || row.netSavingLoss || 0),
                        currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
