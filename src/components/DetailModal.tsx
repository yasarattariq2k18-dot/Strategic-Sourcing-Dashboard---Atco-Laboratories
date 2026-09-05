import React, { useState } from 'react';
import { X, Download, Search, FileSpreadsheet, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency, convertValue } from '../utils/currency';

export const DetailModal: React.FC = () => {
  const { modalConfig, closeDetailModal, currency } = useData();
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!modalConfig.isOpen) return null;

  const { title, subtitle, filterCriteria, records = [], datasetType = 'master' } = modalConfig;

  // Filter records by search
  const displayRecords = records.filter((r) => {
    if (!searchTerm.trim()) return true;
    const str = JSON.stringify(r).toLowerCase();
    return str.includes(searchTerm.toLowerCase());
  });

  // Export current modal table to CSV
  const handleExport = () => {
    if (displayRecords.length === 0) return;
    const headers = Object.keys(displayRecords[0]).join(',');
    const rows = displayRecords
      .map((row) =>
        Object.values(row)
          .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const csvData = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encoded = encodeURI(csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}_Backend_Details.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600">
              <FileSpreadsheet className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">{title}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {displayRecords.length} Records Found
                </span>
              </div>
              <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={closeDetailModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Banner */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span className="font-bold text-slate-800">Filter Applied:</span>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-mono rounded border border-blue-200 text-[11px]">
                {filterCriteria || 'All Node Items'}
              </span>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search in backend details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {datasetType === 'underDev' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-200/80">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-semibold block">Total Mfg Count</span>
                <span className="text-sm font-black text-slate-900">{displayRecords.length}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-semibold block">Materials with Annual Net Saving</span>
                <span className="text-sm font-black text-purple-700">
                  {displayRecords.filter((r: any) => r.hasAnnualNetSavingValue || (r.rawAnnualNetSavingUSD !== undefined && r.rawAnnualNetSavingUSD !== 0) || (r.annualNetSavingUSD && r.annualNetSavingUSD !== 0)).length}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-purple-200 bg-purple-50/40 shadow-2xs">
                <span className="text-[10px] text-purple-800 font-semibold block">Annual Net Saving (USD)</span>
                <span className="text-sm font-black text-purple-900">
                  {formatCurrency(
                    displayRecords.reduce((sum: number, r: any) => sum + (r.hasAnnualNetSavingValue ? (r.rawAnnualNetSavingUSD || 0) : (r.rawAnnualNetSavingUSD !== undefined ? r.rawAnnualNetSavingUSD : (r.annualNetSavingUSD || 0))), 0),
                    'USD'
                  )}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-emerald-200 bg-emerald-50/40 shadow-2xs">
                <span className="text-[10px] text-emerald-800 font-semibold block">Annual Net Saving (PKR)</span>
                <span className="text-sm font-black text-emerald-900">
                  {formatCurrency(
                    convertValue(
                      displayRecords.reduce((sum: number, r: any) => sum + (r.hasAnnualNetSavingValue ? (r.rawAnnualNetSavingUSD || 0) : (r.rawAnnualNetSavingUSD !== undefined ? r.rawAnnualNetSavingUSD : (r.annualNetSavingUSD || 0))), 0),
                      'USD',
                      'PKR'
                    ),
                    'PKR'
                  )}
                </span>
              </div>
            </div>
          )}

          {(datasetType === 'cphi' || datasetType === 'historic' || datasetType === 'project' || datasetType === 'matured') && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200/80">
              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 font-semibold block">Total PO / Item Count</span>
                <span className="text-sm font-black text-slate-900">{displayRecords.length}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-blue-200 bg-blue-50/40 shadow-2xs">
                <span className="text-[10px] text-blue-800 font-semibold block">Total Net Savings (USD)</span>
                <span className="text-sm font-black text-blue-900">
                  {formatCurrency(
                    displayRecords.reduce((sum: number, r: any) => {
                      const val = r.netSavingsValueUSD || r.annualNetSavingUSD || r.perAnnumDiffUSD || r.netSavingLoss || 0;
                      return sum + val;
                    }, 0),
                    'USD'
                  )}
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-emerald-200 bg-emerald-50/40 shadow-2xs">
                <span className="text-[10px] text-emerald-800 font-semibold block">Total Net Savings ({currency})</span>
                <span className="text-sm font-black text-emerald-900">
                  {formatCurrency(
                    convertValue(
                      displayRecords.reduce((sum: number, r: any) => {
                        const val = r.netSavingsValueUSD || r.annualNetSavingUSD || r.perAnnumDiffUSD || r.netSavingLoss || 0;
                        return sum + val;
                      }, 0),
                      'USD',
                      currency
                    ),
                    currency
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {displayRecords.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <FileSpreadsheet className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No records match the current filter or search criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-semibold">
                  <tr>
                    {datasetType === 'master' && (
                      <>
                        <th className="p-3">Material Code</th>
                        <th className="p-3">Material Description</th>
                        <th className="p-3">Company</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Sourcing Origin</th>
                        <th className="p-3">Active Manufacturers & Origins</th>
                        <th className="p-3 text-right">Annual Buying Value</th>
                        <th className="p-3 text-center">Class</th>
                      </>
                    )}

                    {datasetType === 'underDev' && (
                      <>
                        <th className="p-2.5 whitespace-nowrap">Development Stage</th>
                        <th className="p-2.5 whitespace-nowrap">Material Classification</th>
                        <th className="p-2.5 whitespace-nowrap">Sample Submission Date</th>
                        <th className="p-2.5 whitespace-nowrap">Material Code</th>
                        <th className="p-2.5 whitespace-nowrap text-center">Active Mfg Count</th>
                        <th className="p-2.5 whitespace-nowrap text-center">Company</th>
                        <th className="p-2.5 whitespace-nowrap min-w-[200px]">Material Name</th>
                        <th className="p-2.5 whitespace-nowrap min-w-[180px]">Manufacturer Name</th>
                        <th className="p-2.5 whitespace-nowrap">Origin</th>
                        <th className="p-2.5 whitespace-nowrap">Indentor Name</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Development Rates</th>
                        <th className="p-2.5 whitespace-nowrap min-w-[180px]">Existing Com Mfg Name</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Net Price in USD</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Per Lot Qty</th>
                        <th className="p-2.5 whitespace-nowrap text-center">UOM</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Annual Qty</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Existing source Total annual value</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Under Dev source Total annual value</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Net Saving/Loss</th>
                        <th className="p-2.5 whitespace-nowrap text-right">%Age Saving/Loss</th>
                        <th className="p-2.5 whitespace-nowrap text-center">Saving/Loss</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Best Net Saving/Loss</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Existing source Total annual value (10% Qty)</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Under Dev source Total annual value (10% Qty)</th>
                        <th className="p-2.5 whitespace-nowrap text-right">Net Saving/Loss (10% Qty)</th>
                        <th className="p-2.5 whitespace-nowrap text-right">%Age Saving/Loss (10% Qty)</th>
                        <th className="p-2.5 whitespace-nowrap text-center">Saving/Loss (10% Qty)</th>
                        <th className="p-2.5 whitespace-nowrap text-right bg-purple-900 text-purple-200">Annual Net Saving ({currency})</th>
                      </>
                    )}

                    {datasetType === 'cphi' && (
                      <>
                        <th className="p-3">Period / Date</th>
                        <th className="p-3">Material Code</th>
                        <th className="p-3">Material Name</th>
                        <th className="p-3">Manufacturer Name</th>
                        <th className="p-3 text-right">PO Qty</th>
                        <th className="p-3 text-center">UOM</th>
                        <th className="p-3 text-right">Net Price (USD)</th>
                        <th className="p-3 text-right">Budget Price (USD)</th>
                        <th className="p-3 text-right">PO Value Existing</th>
                        <th className="p-3 text-right">PO Value Budget</th>
                        <th className="p-3 text-right text-emerald-300">Net Savings ({currency})</th>
                        <th className="p-3 text-center">% Savings</th>
                      </>
                    )}

                    {datasetType === 'historic' && (
                      <>
                        <th className="p-3">Period / Month</th>
                        <th className="p-3">Material Code</th>
                        <th className="p-3">Material Name</th>
                        <th className="p-3">Supplier / Indentor</th>
                        <th className="p-3">Manufacturer</th>
                        <th className="p-3 text-right">PO Qty</th>
                        <th className="p-3 text-center">UOM</th>
                        <th className="p-3 text-right">Net Price (USD)</th>
                        <th className="p-3 text-right">Historic Price (USD)</th>
                        <th className="p-3 text-center">Mfg Status</th>
                        <th className="p-3 text-right">Current Value</th>
                        <th className="p-3 text-right">Historic Value</th>
                        <th className="p-3 text-right text-emerald-300">Net Savings ({currency})</th>
                        <th className="p-3 text-center">% Diff</th>
                      </>
                    )}

                    {datasetType === 'project' && (
                      <>
                        <th className="p-3">Purch Doc (PO)</th>
                        <th className="p-3">Period</th>
                        <th className="p-3">Material Code</th>
                        <th className="p-3">Material Name</th>
                        <th className="p-3 text-center">Classification</th>
                        <th className="p-3">Supplier / Indentor</th>
                        <th className="p-3">Manufacturer & Origin</th>
                        <th className="p-3 text-right">PO Qty</th>
                        <th className="p-3 text-center">UOM</th>
                        <th className="p-3 text-right">New Price (USD)</th>
                        <th className="p-3 text-right">Last Price (USD)</th>
                        <th className="p-3 text-right text-emerald-300">Net Savings ({currency})</th>
                      </>
                    )}

                    {datasetType === 'matured' && (
                      <>
                        <th className="p-3">Material Code</th>
                        <th className="p-3">Material Name</th>
                        <th className="p-3 text-center">Classification</th>
                        <th className="p-3">Existing Commercial Mfg</th>
                        <th className="p-3">Alternate AVL Source</th>
                        <th className="p-3">Origin</th>
                        <th className="p-3">Indentor</th>
                        <th className="p-3">Ordering / PR Status</th>
                        <th className="p-3 text-right">Exist Price (USD)</th>
                        <th className="p-3 text-right">New Price (USD)</th>
                        <th className="p-3 text-right">Annual Qty</th>
                        <th className="p-3 text-right text-emerald-300">Annual Saving ({currency})</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {displayRecords.map((row: any, idx: number) => (
                    <tr key={row.id || idx} className="hover:bg-blue-50/40 transition-colors">
                      {datasetType === 'master' && (
                        <>
                          <td className="p-3 font-mono font-bold text-blue-700">{row.materialCode}</td>
                          <td className="p-3 font-semibold text-slate-800">{row.materialName}</td>
                          <td className="p-3 font-bold text-slate-700">{row.company}</td>
                          <td className="p-3">{row.categoryType}</td>
                          <td className="p-3">{row.sourceType}</td>
                          <td className="p-3 text-slate-600 max-w-[280px]">{row.activeMfgName}</td>
                          <td className="p-3 text-right font-black text-slate-900">
                            {formatCurrency(
                              currency === 'PKR' ? row.annualValuePKR : row.annualValueUSD,
                              currency
                            )}
                          </td>
                          <td className="p-3 text-center font-bold text-blue-800">
                            {row.classValueVise || 'A'}
                          </td>
                        </>
                      )}

                      {datasetType === 'underDev' && (
                        <>
                          <td className="p-2.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                              {row.developmentStage || row.stage}
                            </span>
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-slate-700 font-medium">{row.materialClassification || '-'}</td>
                          <td className="p-2.5 whitespace-nowrap text-slate-600">{row.sampleSubmissionDate || '-'}</td>
                          <td className="p-2.5 whitespace-nowrap font-mono font-bold text-blue-700">{row.materialCode}</td>
                          <td className="p-2.5 whitespace-nowrap text-center font-bold text-slate-700">{row.activeMfgCount ?? 1}</td>
                          <td className="p-2.5 whitespace-nowrap text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                              row.company === 'AHL' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {row.company || 'LAB'}
                            </span>
                          </td>
                          <td className="p-2.5 font-bold text-slate-900 min-w-[200px]">{row.materialName}</td>
                          <td className="p-2.5 text-slate-700 font-medium min-w-[180px]">{row.manufacturerName || row.underDevMfg || '-'}</td>
                          <td className="p-2.5 whitespace-nowrap text-slate-600">{row.origin || '-'}</td>
                          <td className="p-2.5 whitespace-nowrap text-slate-600">{row.indentorName || '-'}</td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono font-semibold text-slate-800">
                            {typeof row.developmentRates === 'number'
                              ? `$${row.developmentRates.toLocaleString()}`
                              : (row.developmentRates || '-')}
                          </td>
                          <td className="p-2.5 text-slate-600 min-w-[180px]">{row.commercialMfgName || row.currentManufacturer || '-'}</td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.netPriceUSD ? `$${Number(row.netPriceUSD).toLocaleString()}` : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.perLotQty ? Number(row.perLotQty).toLocaleString() : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-center text-slate-600">{row.uom || 'KG'}</td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono font-semibold text-slate-800">
                            {row.annualQty ? Number(row.annualQty).toLocaleString() : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.existingSourceTotalAnnualValue ? `$${Number(row.existingSourceTotalAnnualValue).toLocaleString()}` : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.underDevSourceTotalAnnualValue ? `$${Number(row.underDevSourceTotalAnnualValue).toLocaleString()}` : '-'}
                          </td>
                          <td className={`p-2.5 whitespace-nowrap text-right font-mono font-bold ${
                            (row.netSavingLoss ?? 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {row.netSavingLoss !== undefined && row.netSavingLoss !== 0
                              ? `$${Number(row.netSavingLoss).toLocaleString()}`
                              : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.percentageSavingLoss ? `${row.percentageSavingLoss}%` : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-center">
                            {row.savingLossStatus ? (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.savingLossStatus.toLowerCase().includes('sav')
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}>
                                {row.savingLossStatus}
                              </span>
                            ) : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.bestNetSavingLoss ? `$${Number(row.bestNetSavingLoss).toLocaleString()}` : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.existingSourceTotalAnnualValue10Percent ? `$${Number(row.existingSourceTotalAnnualValue10Percent).toLocaleString()}` : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.underDevSourceTotalAnnualValue10Percent ? `$${Number(row.underDevSourceTotalAnnualValue10Percent).toLocaleString()}` : '-'}
                          </td>
                          <td className={`p-2.5 whitespace-nowrap text-right font-mono font-semibold ${
                            (row.netSavingLoss10Percent ?? 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {row.netSavingLoss10Percent !== undefined && row.netSavingLoss10Percent !== 0
                              ? `$${Number(row.netSavingLoss10Percent).toLocaleString()}`
                              : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono text-slate-700">
                            {row.percentageSavingLoss10Percent ? `${row.percentageSavingLoss10Percent}%` : '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-center text-slate-600">
                            {row.savingLossStatus10Percent || '-'}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-right font-mono font-black text-purple-700 bg-purple-50/50">
                            {row.hasAnnualNetSavingValue || (row.rawAnnualNetSavingUSD !== undefined && row.rawAnnualNetSavingUSD !== 0) || (row.annualNetSavingUSD && row.annualNetSavingUSD !== 0) ? (
                              formatCurrency(
                                convertValue(
                                  row.hasAnnualNetSavingValue ? (row.rawAnnualNetSavingUSD ?? 0) : (row.rawAnnualNetSavingUSD !== undefined ? row.rawAnnualNetSavingUSD : (row.annualNetSavingUSD || 0)),
                                  'USD',
                                  currency
                                ),
                                currency
                              )
                            ) : (
                              <span className="text-slate-400 font-normal">-</span>
                            )}
                          </td>
                        </>
                      )}

                      {datasetType === 'cphi' && (
                        <>
                          <td className="p-3 font-semibold text-slate-800">{row.date || row.year || 'July 2026'}</td>
                          <td className="p-3 font-mono font-bold text-blue-700">{row.materialCode}</td>
                          <td className="p-3 font-semibold text-slate-800">{row.materialName}</td>
                          <td className="p-3 text-slate-600">{row.manufacturerName}</td>
                          <td className="p-3 text-right font-mono font-semibold">{(row.poQuantity || 0).toLocaleString()}</td>
                          <td className="p-3 text-center text-slate-500">{row.uom || 'KG'}</td>
                          <td className="p-3 text-right font-mono text-slate-700">${row.netPriceUSD?.toFixed(2)}</td>
                          <td className="p-3 text-right font-mono text-slate-700">${row.budgetPriceUSD?.toFixed(2)}</td>
                          <td className="p-3 text-right font-mono text-slate-700">${(row.poValueExistingUSD || 0).toLocaleString()}</td>
                          <td className="p-3 text-right font-mono text-slate-700">${(row.poValueBudgetUSD || 0).toLocaleString()}</td>
                          <td className="p-3 text-right font-mono font-black text-emerald-600">
                            {formatCurrency(
                              convertValue(row.netSavingsValueUSD || 0, 'USD', currency),
                              currency
                            )}
                          </td>
                          <td className="p-3 text-center font-bold text-emerald-700">{row.percentageDiff}%</td>
                        </>
                      )}

                      {datasetType === 'historic' && (
                        <>
                          <td className="p-3 font-semibold text-slate-800">{row.year || 'August 2026'}</td>
                          <td className="p-3 font-mono font-bold text-blue-700">{row.materialCode}</td>
                          <td className="p-3 font-semibold text-slate-800">{row.materialName}</td>
                          <td className="p-3 text-slate-600">{row.supplierName || '-'}</td>
                          <td className="p-3 text-slate-600">{row.manufacturerName}</td>
                          <td className="p-3 text-right font-mono font-semibold">{(row.poQuantity || 0).toLocaleString()}</td>
                          <td className="p-3 text-center text-slate-500">{row.uom || 'KG'}</td>
                          <td className="p-3 text-right font-mono text-slate-700">${row.netPriceUSD?.toFixed(2)}</td>
                          <td className="p-3 text-right font-mono text-slate-700">${row.latestHistoricNetPriceUSD?.toFixed(2)}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.mfgStatus === 'Diff Mfg' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {row.mfgStatus || 'Same Mfg'}
                            </span>
                          </td>
                          <td className="p-3 text-right font-mono text-slate-700">${(row.currentRateTotalPoValueUSD || 0).toLocaleString()}</td>
                          <td className="p-3 text-right font-mono text-slate-700">${(row.lastRateTotalPoValueUSD || 0).toLocaleString()}</td>
                          <td className="p-3 text-right font-mono font-black text-emerald-600">
                            {formatCurrency(
                              convertValue(row.netSavingsValueUSD || 0, 'USD', currency),
                              currency
                            )}
                          </td>
                          <td className="p-3 text-center font-bold text-emerald-700">{row.percentageSavingLoss}%</td>
                        </>
                      )}

                      {datasetType === 'project' && (
                        <>
                          <td className="p-3 font-mono font-bold text-blue-700">{row.purchDoc || row.poNumber || row.id}</td>
                          <td className="p-3 font-semibold text-slate-800">{row.year || 'Jul 25-Jun 26'}</td>
                          <td className="p-3 font-mono font-bold text-slate-700">{row.materialCode}</td>
                          <td className="p-3 font-semibold text-slate-800">{row.materialName}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                              {row.materialClassification || 'PROJECT'}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600">{row.supplierName || row.indentorNameAuto || '-'}</td>
                          <td className="p-3 text-slate-600">
                            {row.manufacturerName} {row.origin ? `(${row.origin})` : ''}
                          </td>
                          <td className="p-3 text-right font-mono font-semibold">{(row.poQuantity || 0).toLocaleString()}</td>
                          <td className="p-3 text-center text-slate-500">{row.uom || 'KG'}</td>
                          <td className="p-3 text-right font-mono text-slate-700">
                            {row.currency === 'PKR' ? `PKR ${row.netPrice}` : `$${row.netPrice}`}
                          </td>
                          <td className="p-3 text-right font-mono text-slate-700">
                            {row.latestSupplierNetPriceUSD ? `$${row.latestSupplierNetPriceUSD}` : '-'}
                          </td>
                          <td className="p-3 text-right font-mono font-black text-emerald-600">
                            {formatCurrency(
                              convertValue(row.netSavingsValueUSD || 0, 'USD', currency),
                              currency
                            )}
                          </td>
                        </>
                      )}

                      {datasetType === 'matured' && (
                        <>
                          <td className="p-3 font-mono font-bold text-blue-700">{row.materialCode}</td>
                          <td className="p-3 font-semibold text-slate-800">{row.materialName}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                              {row.materialClassification || 'NON MATURED'}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600">{row.commercializedMfgName || '-'}</td>
                          <td className="p-3 font-medium text-slate-800">{row.manufacturerName}</td>
                          <td className="p-3 text-slate-600">{row.origin || 'CHINA'}</td>
                          <td className="p-3 text-slate-600">{row.indentor || '-'}</td>
                          <td className="p-3 text-xs">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                              {row.orderingStatus || row.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-mono text-slate-700">
                            ${(row.lastNetPriceUSDExist || 0).toFixed(2)}
                          </td>
                          <td className="p-3 text-right font-mono text-slate-700">
                            ${(row.newSourcePerLotPriceUSD || 0).toFixed(2)}
                          </td>
                          <td className="p-3 text-right font-mono font-semibold">
                            {(row.annualQtyJul25Jun26 || 0).toLocaleString()} {row.uom || 'KG'}
                          </td>
                          <td className="p-3 text-right font-mono font-black text-emerald-600">
                            {formatCurrency(
                              convertValue(row.annualNetSavingUSD || row.perAnnumDiffUSD || 0, 'USD', currency),
                              currency
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Source: Commercial Sourcing Master & Vendor Evaluation Database
          </span>
          <button
            onClick={closeDetailModal}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Close Outlook
          </button>
        </div>
      </div>
    </div>
  );
};
