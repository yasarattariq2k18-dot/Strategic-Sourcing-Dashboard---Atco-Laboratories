import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Search,
  Download,
  Filter,
  Layers,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  ArrowRight,
  FileSpreadsheet,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency, convertValue } from '../../utils/currency';
import { UnderDevelopmentTree } from '../UnderDevelopmentTree';

export const UnderDevelopmentPage: React.FC = () => {
  const { underDevData, currency, openDetailModal } = useData();

  const [activeStage, setActiveStage] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [companyFilter, setCompanyFilter] = useState<string>('ALL');

  // Filtered list
  const filteredList = useMemo(() => {
    return underDevData.filter((item) => {
      const stage = (item.stage || item.developmentStage || '').toUpperCase();
      if (activeStage !== 'ALL') {
        if (activeStage === 'ARRANGEMENT') {
          if (!stage.includes('ARR') && !stage.includes('SAMPLE')) return false;
        } else if (activeStage === 'TESTING') {
          if (!stage.includes('TEST') && !stage.includes('INITIAL') && !stage.includes('LAB')) return false;
        } else if (activeStage === 'PRIORITY') {
          if (!stage.includes('PRIORITY') && !stage.includes('PD')) return false;
        } else if (activeStage === 'STABILITY') {
          if (!stage.includes('STABILITY') && !stage.includes('STAB')) return false;
        } else {
          if (!stage.includes(activeStage.toUpperCase())) return false;
        }
      }
      if (companyFilter !== 'ALL' && item.company !== companyFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          (item.materialName && item.materialName.toLowerCase().includes(q)) ||
          (item.materialCode && item.materialCode.toLowerCase().includes(q)) ||
          (item.underDevMfg && item.underDevMfg.toLowerCase().includes(q)) ||
          (item.sampleManufacturerName && item.sampleManufacturerName.toLowerCase().includes(q)) ||
          (item.manufacturerName && item.manufacturerName.toLowerCase().includes(q)) ||
          (item.commercialMfgName && item.commercialMfgName.toLowerCase().includes(q)) ||
          (item.currentManufacturer && item.currentManufacturer.toLowerCase().includes(q)) ||
          (item.indentorName && item.indentorName.toLowerCase().includes(q)) ||
          (item.indentor && item.indentor.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [underDevData, activeStage, companyFilter, search]);

  // Export CSV
  const handleExport = () => {
    if (!filteredList.length) return;
    const headers = Object.keys(filteredList[0]).join(',');
    const rows = filteredList.map((row) =>
      Object.values(row)
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Under_Development_Sourcing_Pipeline.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-2xl p-6 text-white shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-400/30">
                <FlaskConical className="w-6 h-6" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Under Development Sourcing Pipeline (Segment 4)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              End-to-end management of under-development materials, alternate manufacturers, and tentative savings
            </p>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Pipeline Data</span>
          </button>
        </div>
      </div>

      {/* Under Development Tree Hierarchy (Dynamic from attached/uploaded CSV) */}
      <UnderDevelopmentTree />

      {/* Slicers and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2">
          {/* Stage Buttons */}
          <button
            onClick={() => setActiveStage('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeStage === 'ALL'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>All Stages</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeStage === 'ALL' ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {underDevData.length}
            </span>
          </button>
          {[
            { id: 'ARRANGEMENT', label: 'Sample Under Arrangement' },
            { id: 'TESTING', label: 'Initial Testing' },
            { id: 'PRIORITY', label: 'PD Priority' },
            { id: 'STABILITY', label: 'Stability Studies' },
          ].map((stg) => {
            const count = underDevData.filter((item) => {
              const st = (item.stage || item.developmentStage || '').toUpperCase();
              if (stg.id === 'ARRANGEMENT') return st.includes('ARR') || st.includes('SAMPLE');
              if (stg.id === 'TESTING') return st.includes('TEST') || st.includes('INITIAL') || st.includes('LAB');
              if (stg.id === 'PRIORITY') return st.includes('PRIORITY') || st.includes('PD');
              if (stg.id === 'STABILITY') return st.includes('STABILITY') || st.includes('STAB');
              return false;
            }).length;

            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(stg.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStage === stg.id
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{stg.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeStage === stg.id ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search under dev pipeline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
          />
        </div>
      </div>

      {/* Main Under Development Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-sm">Under Development Project Registry & Target Savings</h3>
            <p className="text-[11px] text-slate-300">Click any row to open stage history, trial reports, quotes & all 28 columns</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                openDetailModal({
                  title: 'Under Development Sourcing Pipeline (All 28 Columns)',
                  subtitle: `Complete pipeline registry • ${filteredList.length} records in view`,
                  filterCriteria: activeStage === 'ALL' ? 'All Stages' : `Stage: ${activeStage}`,
                  records: filteredList,
                  datasetType: 'underDev',
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Open Full 28-Column Detail Grid</span>
            </button>
            <span className="text-xs text-purple-300 font-bold px-2 py-1 bg-slate-800 rounded-lg border border-slate-700">
              {filteredList.length} materials
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-black text-[10px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Material Code</th>
                <th className="py-3 px-4">Material Description</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Approved Mfg</th>
                <th className="py-3 px-4">Alternate Mfg</th>
                <th className="py-3 px-4 text-center">Stage</th>
                <th className="py-3 px-4 text-right">Annual Net Saving ({currency})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredList.map((item, idx) => {
                const savingUSD = item.hasAnnualNetSavingValue
                  ? (item.rawAnnualNetSavingUSD ?? 0)
                  : (item.rawAnnualNetSavingUSD !== undefined ? item.rawAnnualNetSavingUSD : (item.annualNetSavingUSD || item.netSavingLoss || 0));
                
                return (
                  <tr
                    key={`${item.materialCode}-${idx}`}
                    onClick={() =>
                      openDetailModal({
                        title: `Material: ${item.materialName}`,
                        subtitle: `Code: ${item.materialCode} • Stage: ${item.stage || item.developmentStage}`,
                        filterCriteria: `Material Code: ${item.materialCode}`,
                        records: [item],
                        datasetType: 'underDev',
                      })
                    }
                    className="hover:bg-purple-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{item.materialCode}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{item.materialName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                          item.company === 'LAB' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.company || 'LAB'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{item.commercialMfgName || item.currentManufacturer || 'Current Approved'}</td>
                    <td className="py-3 px-4 text-purple-700 font-semibold">{item.manufacturerName || item.sampleManufacturerName || item.underDevMfg || 'In Arrangement'}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {item.stage || item.developmentStage || 'In Progress'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-black text-emerald-700 font-mono text-xs sm:text-sm">
                      {item.hasAnnualNetSavingValue || (item.rawAnnualNetSavingUSD !== undefined && item.rawAnnualNetSavingUSD !== 0) || (item.annualNetSavingUSD && item.annualNetSavingUSD !== 0) ? (
                        formatCurrency(
                          convertValue(savingUSD, 'USD', currency),
                          currency
                        )
                      ) : (
                        <span className="text-slate-400 font-normal">-</span>
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
  );
};
