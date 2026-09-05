import React, { useState } from 'react';
import {
  Table,
  Filter,
  Search,
  Download,
  ArrowUpDown,
  ExternalLink,
  ChevronDown,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency, convertValue } from '../utils/currency';

export const MatrixTables: React.FC = () => {
  const { masterData, maturityData, cphiData, currency, openDetailModal, filters, setFilters } = useData();
  const [activeTab, setActiveTab] = useState<'matrix1' | 'matrix2' | 'matrix3'>('matrix1');
  const [search, setSearch] = useState<string>('');

  // Filter master data by global slicers + local search
  const filteredMaster = React.useMemo(() => {
    return masterData.filter((r) => {
      if (filters.company !== 'ALL' && r.company !== filters.company) return false;
      if (filters.materialClass !== 'ALL' && r.categoryType !== filters.materialClass) return false;
      if (filters.sourceType !== 'ALL' && r.sourceType !== filters.sourceType) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          r.materialName.toLowerCase().includes(q) ||
          r.materialCode.toLowerCase().includes(q) ||
          (r.activeMfgName && r.activeMfgName.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [masterData, filters, search]);

  return (
    <div id="matrix-tables" className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mt-6">
      {/* Top Header & Slicers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Table className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Executive Procurement Matrix Tables & Slicers
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Deep-dive cross tabulations for Category Value Contribution, AVL Maturity, and Commercial PO Tracking
          </p>
        </div>

        {/* Global Slicers Control Bar */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Slicer: Company */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5">Company:</span>
            {(['ALL', 'LAB', 'AHL'] as const).map((comp) => (
              <button
                key={comp}
                onClick={() => setFilters((prev) => ({ ...prev, company: comp }))}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  filters.company === comp
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {comp}
              </button>
            ))}
          </div>

          {/* Slicer: Material Class */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase px-1.5">Class:</span>
            {(['ALL', 'API', 'EXP', 'PM'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters((prev) => ({ ...prev, materialClass: cat }))}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  filters.materialClass === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search table..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('matrix1')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'matrix1'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. Portfolio Classification & Value Contribution (445 Master)
        </button>
        <button
          onClick={() => setActiveTab('matrix2')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'matrix2'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Active vs Commercialized Maturity Status Matrix
        </button>
        <button
          onClick={() => setActiveTab('matrix3')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'matrix3'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          3. CPHI & Commercial Purchase Orders Monthly Breakdown
        </button>
      </div>

      {/* MATRIX TABLE 1 */}
      {activeTab === 'matrix1' && (
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3">Material Code</th>
                <th className="p-3">Material Description</th>
                <th className="p-3">Company</th>
                <th className="p-3">Class</th>
                <th className="p-3">Sourcing Origin</th>
                <th className="p-3">Active Manufacturers</th>
                <th className="p-3 text-right">Annual Buying Value</th>
                <th className="p-3 text-center">Value Class</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredMaster.map((row) => {
                const annualVal =
                  currency === 'PKR' ? row.annualValuePKR : row.annualValueUSD;

                return (
                  <tr
                    key={row.id}
                    onClick={() =>
                      openDetailModal({
                        title: row.materialName,
                        subtitle: `Material Code: ${row.materialCode} • Full Master File Details`,
                        filterCriteria: `Material Code = ${row.materialCode}`,
                        records: [row],
                        datasetType: 'master',
                      })
                    }
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                  >
                    <td className="p-3 font-mono font-bold text-blue-700">{row.materialCode}</td>
                    <td className="p-3 font-semibold text-slate-800 max-w-[220px] truncate">
                      {row.materialName}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.company === 'LAB'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}
                      >
                        {row.company}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-700">{row.categoryType}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                        {row.sourceType}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 max-w-[240px] truncate">
                      {row.activeMfgName}
                    </td>
                    <td className="p-3 text-right font-extrabold text-slate-900">
                      {formatCurrency(annualVal, currency)}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                        Class {row.classValueVise || 'A'}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailModal({
                            title: row.materialName,
                            subtitle: `Material Code: ${row.materialCode} • Full Master File Details`,
                            filterCriteria: `Material Code = ${row.materialCode}`,
                            records: [row],
                            datasetType: 'master',
                          });
                        }}
                        className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-[10px] transition-colors border border-blue-200"
                      >
                        View Record
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MATRIX TABLE 2 */}
      {activeTab === 'matrix2' && (
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3">Material Code</th>
                <th className="p-3">Material Name</th>
                <th className="p-3">Current Manufacturer</th>
                <th className="p-3">Alternate Developed AVL</th>
                <th className="p-3 text-center">Maturity Status</th>
                <th className="p-3 text-right">Old Price</th>
                <th className="p-3 text-right">New Commercial Price</th>
                <th className="p-3 text-right">Annual Net Saving</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {maturityData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() =>
                    openDetailModal({
                      title: row.materialName,
                      subtitle: `Commercialization Maturity Details for Code: ${row.materialCode}`,
                      filterCriteria: `Material Code = ${row.materialCode}`,
                      records: [row],
                      datasetType: 'matured',
                    })
                  }
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                >
                  <td className="p-3 font-mono font-bold text-blue-700">{row.materialCode}</td>
                  <td className="p-3 font-semibold text-slate-800 max-w-[200px] truncate">
                    {row.materialName}
                  </td>
                  <td className="p-3 text-slate-600">{row.currentManufacturer}</td>
                  <td className="p-3 font-medium text-slate-800">{row.alternateManufacturerName}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {row.maturityStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-600">
                    {formatCurrency(convertValue(row.oldPriceUSD, 'USD', currency), currency)}
                  </td>
                  <td className="p-3 text-right font-semibold text-slate-900">
                    {formatCurrency(convertValue(row.newPriceUSD, 'USD', currency), currency)}
                  </td>
                  <td className="p-3 text-right font-black text-emerald-600">
                    {formatCurrency(convertValue(row.annualNetSavingUSD, 'USD', currency), currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MATRIX TABLE 3 */}
      {activeTab === 'matrix3' && (
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3">PO Number</th>
                <th className="p-3">Material Name</th>
                <th className="p-3">Supplier / Indentor</th>
                <th className="p-3">Manufacturer</th>
                <th className="p-3">Order Month</th>
                <th className="p-3 text-right">PO Qty (KG)</th>
                <th className="p-3 text-right">Net Savings (USD)</th>
                <th className="p-3 text-right">Net Savings (PKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {cphiData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() =>
                    openDetailModal({
                      title: row.materialName,
                      subtitle: `CPHI Purchase Order: ${row.poNumber}`,
                      filterCriteria: `PO = ${row.poNumber}`,
                      records: [row],
                      datasetType: 'cphi',
                    })
                  }
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                >
                  <td className="p-3 font-mono font-bold text-blue-700">{row.poNumber}</td>
                  <td className="p-3 font-semibold text-slate-800">{row.materialName}</td>
                  <td className="p-3 text-slate-600">{row.supplierName}</td>
                  <td className="p-3 text-slate-600">{row.manufacturerName}</td>
                  <td className="p-3 text-slate-600">{row.monthStatus}</td>
                  <td className="p-3 text-right font-mono font-semibold">
                    {row.poQuantity.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-black text-blue-700">
                    {formatCurrency(row.netSavingsValueUSD, 'USD')}
                  </td>
                  <td className="p-3 text-right font-black text-emerald-600">
                    {formatCurrency(row.netSavingsValueUSD * 280, 'PKR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
