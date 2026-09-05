import React from 'react';
import { Clock, ShieldCheck, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2, Factory } from 'lucide-react';
import { useData } from '../context/DataContext';

export const LeadTimesAndVendors: React.FC = () => {
  const vendors = [
    {
      name: 'ASENCE PHARMA PVT LTD',
      origin: 'India',
      materialsCount: 12,
      avgLeadTimeDays: 28,
      leadTimeTargetDays: 30,
      otifScore: '98%',
      qcPassRate: '100%',
      costVariancePct: -4.5,
      status: 'Prime Preferred',
    },
    {
      name: 'AARTI DRUGS LIMITED',
      origin: 'India',
      materialsCount: 8,
      avgLeadTimeDays: 32,
      leadTimeTargetDays: 30,
      otifScore: '94%',
      qcPassRate: '99.2%',
      costVariancePct: -6.2,
      status: 'Prime Preferred',
    },
    {
      name: 'NANTONG HUIDESENG PACKAGING',
      origin: 'China',
      materialsCount: 14,
      avgLeadTimeDays: 42,
      leadTimeTargetDays: 45,
      otifScore: '96%',
      qcPassRate: '99.8%',
      costVariancePct: -8.0,
      status: 'Strategic Supplier',
    },
    {
      name: 'CRODA CHEMICALS SINGAPORE',
      origin: 'Singapore',
      materialsCount: 6,
      avgLeadTimeDays: 35,
      leadTimeTargetDays: 35,
      otifScore: '99%',
      qcPassRate: '100%',
      costVariancePct: +2.1,
      status: 'Sole Approved Source',
    },
    {
      name: 'MAYOLY INDUSTRIE FRANCE',
      origin: 'France',
      materialsCount: 2,
      avgLeadTimeDays: 52,
      leadTimeTargetDays: 50,
      otifScore: '92%',
      qcPassRate: '100%',
      costVariancePct: 0.0,
      status: 'Proprietary Principal',
    },
    {
      name: 'HABIB SUGAR MILLS LTD',
      origin: 'Pakistan (Local)',
      materialsCount: 4,
      avgLeadTimeDays: 7,
      leadTimeTargetDays: 7,
      otifScore: '99%',
      qcPassRate: '100%',
      costVariancePct: -1.8,
      status: 'Local Direct Partner',
    },
  ];

  return (
    <div id="lead-times-vendors" className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Clock className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Real-Time Lead Times, Cost Variances & Vendor Performance
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Key procurement performance indicators for commercial import reliability and supplier scorecard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Overall OTIF: 96.4%
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Average Import Lead Time</div>
          <div className="text-2xl font-black text-slate-900 mt-1">34.2 Days</div>
          <div className="text-xs text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" /> -3.5 days improvement vs prior year
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Net Cost Variance Impact</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">-5.8% Overall</div>
          <div className="text-xs text-slate-600 font-semibold mt-0.5">
            Favorable savings vs standard PO baseline
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">QC Acceptance Rate</div>
          <div className="text-2xl font-black text-blue-700 mt-1">99.7%</div>
          <div className="text-xs text-slate-600 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> High regulatory and GMP compliance
          </div>
        </div>
      </div>

      {/* Vendor Scorecard Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-3">Vendor / Manufacturer Name</th>
              <th className="p-3">Origin</th>
              <th className="p-3 text-center">Active Mat Count</th>
              <th className="p-3 text-center">Avg Lead Time</th>
              <th className="p-3 text-center">OTIF Delivery Rate</th>
              <th className="p-3 text-center">QC Pass Rate</th>
              <th className="p-3 text-right">Cost Variance (%)</th>
              <th className="p-3 text-center">Classification Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {vendors.map((v, i) => (
              <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-3 font-semibold text-slate-800 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{v.name}</span>
                </td>
                <td className="p-3 text-slate-600 font-medium">{v.origin}</td>
                <td className="p-3 text-center font-bold text-slate-800">{v.materialsCount}</td>
                <td className="p-3 text-center font-semibold text-slate-700">
                  {v.avgLeadTimeDays} Days <span className="text-[10px] text-slate-400">({v.leadTimeTargetDays} tgt)</span>
                </td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {v.otifScore}
                  </span>
                </td>
                <td className="p-3 text-center font-bold text-blue-800">{v.qcPassRate}</td>
                <td className="p-3 text-right font-black text-emerald-600">
                  {v.costVariancePct < 0 ? `${v.costVariancePct}%` : `+${v.costVariancePct}%`}
                </td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
