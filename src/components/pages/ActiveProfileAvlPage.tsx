import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Download,
  Filter,
  Building,
  Globe2,
  Tag,
  CheckCircle2,
  Layers,
  ArrowUpDown,
  FileSpreadsheet,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency, convertValue } from '../../utils/currency';

export const ActiveProfileAvlPage: React.FC = () => {
  const { masterData, currency, openDetailModal } = useData();

  const [search, setSearch] = useState<string>('');
  const [companyFilter, setCompanyFilter] = useState<string>('ALL');
  const [classFilter, setClassFilter] = useState<string>('ALL');
  const [originFilter, setOriginFilter] = useState<string>('ALL');
  const [pillarFilter, setPillarFilter] = useState<string>('ALL');

  // Filtered master list
  const filteredList = useMemo(() => {
    return masterData.filter((item) => {
      if (companyFilter !== 'ALL' && item.company !== companyFilter) return false;
      if (classFilter !== 'ALL' && item.categoryType !== classFilter) return false;
      if (originFilter !== 'ALL' && item.originCategory !== originFilter) return false;
      if (pillarFilter !== 'ALL' && item.sourceType !== pillarFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.materialName.toLowerCase().includes(q) ||
          item.materialCode.toLowerCase().includes(q) ||
          (item.activeMfgName && item.activeMfgName.toLowerCase().includes(q)) ||
          (item.indentor && item.indentor.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [masterData, companyFilter, classFilter, originFilter, pillarFilter, search]);

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
    a.download = 'Active_Materials_and_AVL_Master_List.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & KPI Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 text-white shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Active Material Profile & Approved Vendor List (AVL) Status (Segment 3)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Comprehensive registry of 445 active raw/packaging materials, 728 approved manufacturers, and origin classifications
            </p>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export AVL Master List</span>
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
            <span className="text-[11px] font-bold text-slate-300">Total Active Materials</span>
            <div className="text-xl font-black text-white mt-0.5">445 Active SKUs</div>
            <span className="text-[10px] text-slate-300">LAB: 351 | AHL: 94</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
            <span className="text-[11px] font-bold text-slate-300">Approved Manufacturers (AVL)</span>
            <div className="text-xl font-black text-cyan-300 mt-0.5">728 Approved Mfg</div>
            <span className="text-[10px] text-slate-300">LAB: 559 | AHL: 169</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
            <span className="text-[11px] font-bold text-slate-300">Import Sourcing Value</span>
            <div className="text-xl font-black text-blue-400 mt-0.5">
              {formatCurrency(convertValue(3069396205.51, 'PKR', currency), currency)}
            </div>
            <span className="text-[10px] text-slate-300">78.3% Portfolio Share</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
            <span className="text-[11px] font-bold text-slate-300">Local Sourcing Value</span>
            <div className="text-xl font-black text-emerald-400 mt-0.5">
              {formatCurrency(convertValue(839990016.66, 'PKR', currency), currency)}
            </div>
            <span className="text-[10px] text-slate-300">21.4% Portfolio Share</span>
          </div>
        </div>
      </div>

      {/* Slicers & Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2">
          {/* Company */}
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Companies (LAB & AHL)</option>
            <option value="LAB">LAB (351 Materials)</option>
            <option value="AHL">AHL (94 Materials)</option>
          </select>

          {/* Class */}
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Classes (API / EXP / PM)</option>
            <option value="API">API (Active Ingredients)</option>
            <option value="EXP">EXP (Excipients)</option>
            <option value="PM">PM (Packaging Materials)</option>
          </select>

          {/* Origin */}
          <select
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Origin Regions</option>
            <option value="CHINA">China (153)</option>
            <option value="INDIA">India (87)</option>
            <option value="EUROPE">Europe (63)</option>
            <option value="ASIA">Asia (54)</option>
            <option value="LOCAL">Local (48)</option>
            <option value="AMERICA">America (17)</option>
            <option value="MIDDLE">Middle East (6)</option>
          </select>

          {/* Sourcing Pillar */}
          <select
            value={pillarFilter}
            onChange={(e) => setPillarFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Sourcing Pillars</option>
            <option value="Fixed Source">Fixed Source (161)</option>
            <option value="Multi Source">Multi Source (151)</option>
            <option value="Single Source">Single Source (133)</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
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

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm">Active Material Master Registry & AVL Verification</h3>
            <p className="text-[11px] text-slate-300">Click any row to open full technical datasheet & supplier details</p>
          </div>
          <span className="text-xs text-blue-300 font-bold">Showing {filteredList.length} items</span>
        </div>

        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">CODE</th>
                <th className="py-3 px-3">MATERIAL NAME</th>
                <th className="py-3 px-2 text-center">CO.</th>
                <th className="py-3 px-2 text-center">CLASS</th>
                <th className="py-3 px-3">PILLAR / STRATEGY</th>
                <th className="py-3 px-3">PRIMARY APPROVED MFG</th>
                <th className="py-3 px-2 text-center">AVL COUNT</th>
                <th className="py-3 px-3">ORIGIN REGION</th>
                <th className="py-3 px-3 text-right">NET PRICE</th>
                <th className="py-3 px-3 text-right">12M BUYING VALUE ({currency})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredList.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() =>
                    openDetailModal({
                      title: `${item.materialName} (${item.materialCode})`,
                      subtitle: `Company: ${item.company} | Class: ${item.categoryType} | Sourcing: ${item.sourceType}`,
                      filterCriteria: item.materialCode,
                      records: [item],
                      datasetType: 'master',
                    })
                  }
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{item.materialCode}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{item.materialName}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                        item.company === 'LAB' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {item.company}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                      {item.categoryType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.sourceType === 'Single Source'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : item.sourceType === 'Multi Source'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {item.sourceType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">
                    {item.activeMfgName || 'Approved Partner'}
                  </td>
                  <td className="py-2.5 px-2 text-center font-bold text-slate-800">
                    {item.activeMfgCount || 1}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                      <Globe2 className="w-3 h-3 text-slate-400" />
                      {item.originCategory}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                    ${item.netPriceUSD?.toFixed(2) || '0.00'}/{item.uom || 'KG'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-black text-slate-900">
                    {formatCurrency(
                      currency === 'PKR' ? item.annualBuyingValuePKR : item.annualBuyingValueUSD,
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
  );
};
