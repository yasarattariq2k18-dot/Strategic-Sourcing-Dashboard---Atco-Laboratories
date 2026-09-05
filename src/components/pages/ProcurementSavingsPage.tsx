import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Search,
  Download,
  Filter,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  ArrowUpDown,
  Building,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency, convertValue } from '../../utils/currency';

export const ProcurementSavingsPage: React.FC = () => {
  const {
    cphiData,
    projectSavingsData,
    historicData,
    maturityData,
    currency,
    openDetailModal,
  } = useData();

  const [activeSubTab, setActiveSubTab] = useState<'matured' | 'cphi' | 'project' | 'historic'>('matured');
  const [search, setSearch] = useState<string>('');
  const [companyFilter, setCompanyFilter] = useState<string>('ALL');

  // Summary Metrics
  const summary = {
    maturedUSD: 3213000,
    maturedPKR: 899640000,
    cphiUSD: 465000,
    cphiPKR: 130200000,
    projectUSD: 45000,
    projectPKR: 12600000,
    historicUSD: 88000,
    historicPKR: 24640000,
  };

  // Export CSV
  const handleExport = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) =>
      Object.values(row)
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & KPI Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                <DollarSign className="w-6 h-6" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Procurement Savings & Commercialization Portfolio (Segment 2)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Detailed tracking of Matured Alternate Savings, CPHI Exhibition POs, 22 Project Materials, and Historic PO Variances
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport(maturityData, 'Commercialized_Maturity_Savings.csv')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export Full Savings</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
            <span className="text-[11px] font-bold text-slate-300">Commercial Matured Savings</span>
            <div className="text-lg font-black text-emerald-400 mt-0.5">
              {formatCurrency(currency === 'PKR' ? summary.maturedPKR : summary.maturedUSD, currency)}
            </div>
            <span className="text-[10px] text-slate-300">20 Commercial POs Executed</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
            <span className="text-[11px] font-bold text-slate-300">CPHI Savings Since Jul 2026</span>
            <div className="text-lg font-black text-emerald-400 mt-0.5">
              {formatCurrency(currency === 'PKR' ? summary.cphiPKR : summary.cphiUSD, currency)}
            </div>
            <span className="text-[10px] text-slate-300">16 Direct Exhibition Orders</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
            <span className="text-[11px] font-bold text-slate-300">22 Project Materials Savings</span>
            <div className="text-lg font-black text-cyan-300 mt-0.5">
              {formatCurrency(currency === 'PKR' ? summary.projectPKR : summary.projectUSD, currency)}
            </div>
            <span className="text-[10px] text-slate-300">10 Strategic SKUs Active</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
            <span className="text-[11px] font-bold text-slate-300">Historic PO Variance Gain</span>
            <div className="text-lg font-black text-yellow-300 mt-0.5">
              {formatCurrency(currency === 'PKR' ? summary.historicPKR : summary.historicUSD, currency)}
            </div>
            <span className="text-[10px] text-slate-300">5 Price Reductions Realized</span>
          </div>
        </div>
      </div>

      {/* Segment Sub-Navigation Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveSubTab('matured')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'matured'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1. Commercialized Maturity ({maturityData.length} Records)
          </button>
          <button
            onClick={() => setActiveSubTab('cphi')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'cphi'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2. CPHI POs Since Jul 2026 ({cphiData.length} Records)
          </button>
          <button
            onClick={() => setActiveSubTab('project')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'project'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            3. 22 Project Materials ({projectSavingsData.length} Records)
          </button>
          <button
            onClick={() => setActiveSubTab('historic')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'historic'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            4. Historic PO Variance ({historicData.length} Records)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search saving records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>
      </div>

      {/* Sub-Tab 1: Commercialized Maturity Savings */}
      {activeSubTab === 'matured' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <h3 className="font-extrabold text-sm">Commercialized Sourcing Savings & AVL Maturity Records</h3>
            <span className="text-xs text-emerald-400 font-bold">Showing {maturityData.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">CODE</th>
                  <th className="py-2.5 px-3">MATERIAL NAME</th>
                  <th className="py-2.5 px-3">COMPANY</th>
                  <th className="py-2.5 px-3">AVL STATUS</th>
                  <th className="py-2.5 px-3">SUPPLIER / MFG</th>
                  <th className="py-2.5 px-3 text-right">OLD PRICE</th>
                  <th className="py-2.5 px-3 text-right">NEW COMMERCIAL</th>
                  <th className="py-2.5 px-3 text-right">NET SAVING ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {maturityData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{row.materialCode}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{row.materialName}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {row.company}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{row.alternateSupplier || 'Approved AVL'}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500 line-through">
                      ${row.oldPriceUSD?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      ${row.newPriceUSD?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-600">
                      {formatCurrency(
                        currency === 'PKR' ? row.savingPKR || row.savingUSD * 280 : row.savingUSD,
                        currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: CPHI Savings Since Jul 2026 */}
      {activeSubTab === 'cphi' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <h3 className="font-extrabold text-sm">CPHI Exhibition Direct Orders & Net Commercial Savings</h3>
            <span className="text-xs text-emerald-400 font-bold">Showing {cphiData.length} exhibition POs</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">PO NUMBER</th>
                  <th className="py-2.5 px-3">CODE</th>
                  <th className="py-2.5 px-3">MATERIAL NAME</th>
                  <th className="py-2.5 px-3">EXHIBITION / INDENTOR</th>
                  <th className="py-2.5 px-3">MANUFACTURER</th>
                  <th className="py-2.5 px-3 text-right">QUANTITY</th>
                  <th className="py-2.5 px-3 text-right">OLD RATE</th>
                  <th className="py-2.5 px-3 text-right">CPHI RATE</th>
                  <th className="py-2.5 px-3 text-right">NET SAVING ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {cphiData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.poNumber}</td>
                    <td className="py-2.5 px-3 font-mono text-blue-700">{row.materialCode}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{row.materialName}</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.indentorName || 'CPHI Direct'}</td>
                    <td className="py-2.5 px-3 text-slate-700">{row.mfgName}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">{row.orderQuantity} {row.uom || 'KG'}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">${row.oldPriceUSD?.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">${row.newPriceUSD?.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-600">
                      {formatCurrency(
                        currency === 'PKR' ? row.savingPKR || row.savingUSD * 280 : row.savingUSD,
                        currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: 22 Project Materials */}
      {activeSubTab === 'project' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <h3 className="font-extrabold text-sm">22 Strategic Project Materials Commercial Savings</h3>
            <span className="text-xs text-cyan-300 font-bold">Showing {projectSavingsData.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">PROJECT CODE</th>
                  <th className="py-2.5 px-3">MATERIAL NAME</th>
                  <th className="py-2.5 px-3">SOURCING ORIGIN</th>
                  <th className="py-2.5 px-3">APPROVED MFG</th>
                  <th className="py-2.5 px-3 text-right">BENCHMARK PRICE</th>
                  <th className="py-2.5 px-3 text-right">FINAL SECURED</th>
                  <th className="py-2.5 px-3 text-right">NET SAVINGS ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {projectSavingsData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-cyan-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-800">{row.materialCode}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{row.materialName}</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.origin || 'Import'}</td>
                    <td className="py-2.5 px-3 text-slate-700">{row.mfgName}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">${row.oldPriceUSD?.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">${row.newPriceUSD?.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-black text-cyan-700">
                      {formatCurrency(
                        currency === 'PKR' ? row.savingPKR || row.savingUSD * 280 : row.savingUSD,
                        currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Historic PO Variances */}
      {activeSubTab === 'historic' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <h3 className="font-extrabold text-sm">Historic Purchase Order Price Variances & Reductions</h3>
            <span className="text-xs text-yellow-300 font-bold">Showing {historicData.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">PO #</th>
                  <th className="py-2.5 px-3">DATE</th>
                  <th className="py-2.5 px-3">MATERIAL CODE & NAME</th>
                  <th className="py-2.5 px-3">VENDOR</th>
                  <th className="py-2.5 px-3 text-right">ORDER QTY</th>
                  <th className="py-2.5 px-3 text-right">HISTORIC BASE</th>
                  <th className="py-2.5 px-3 text-right">EXEC PRICE</th>
                  <th className="py-2.5 px-3 text-right">VARIANCE SAVINGS ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {historicData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.poNumber}</td>
                    <td className="py-2.5 px-3 text-slate-500">{row.poDate || 'Jul-26'}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-mono text-blue-700 font-bold mr-1">{row.materialCode}</span>
                      <span className="font-semibold text-slate-900">{row.materialName}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{row.vendorName}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">{row.orderQuantity} {row.uom}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">${row.oldPriceUSD?.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">${row.newPriceUSD?.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-600">
                      {formatCurrency(
                        currency === 'PKR' ? row.savingPKR || row.savingUSD * 280 : row.savingUSD,
                        currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
