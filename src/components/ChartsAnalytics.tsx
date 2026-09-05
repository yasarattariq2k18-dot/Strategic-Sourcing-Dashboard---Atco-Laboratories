import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { PieChart as PieIcon, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency, convertValue } from '../utils/currency';

export const ChartsAnalytics: React.FC = () => {
  const { currency, summaryStats } = useData();

  // Data 1: Sourcing Pillars (Fixed, Multi, Single)
  const sourcingPillarsData = [
    {
      name: 'Fixed Source',
      activeCount: 161,
      udCount: 38,
      buyingValueUSD: 3522857,
      buyingValuePKR: 986400000,
    },
    {
      name: 'Multi Source',
      activeCount: 151,
      udCount: 49,
      buyingValueUSD: 6714285,
      buyingValuePKR: 1880000000,
    },
    {
      name: 'Single Source',
      activeCount: 133,
      udCount: 40,
      buyingValueUSD: 3750000,
      buyingValuePKR: 1050000000,
    },
  ];

  // Data 2: Material Class by Company (LAB vs AHL)
  const classByCompanyData = [
    {
      category: 'API (Active)',
      LAB_PKR: 2280000000,
      LAB_USD: 8142857,
      AHL_PKR: 89900000,
      AHL_USD: 321071,
    },
    {
      category: 'EXP (Excipients)',
      LAB_PKR: 1210000000,
      LAB_USD: 4321428,
      AHL_PKR: 29300000,
      AHL_USD: 104642,
    },
    {
      category: 'PM (Packaging)',
      LAB_PKR: 314500000,
      LAB_USD: 1123214,
      AHL_PKR: 0,
      AHL_USD: 0,
    },
    {
      category: 'Local Raw Materials',
      LAB_PKR: 776000000,
      LAB_USD: 2771428,
      AHL_PKR: 65000000,
      AHL_USD: 232142,
    },
  ];

  // Data 3: Geographic Origin Share
  const originShareData = [
    { name: 'India', value: 42, color: '#2563eb' },
    { name: 'China', value: 28, color: '#0284c7' },
    { name: 'Local Pakistan', value: 18, color: '#0d9488' },
    { name: 'Europe & USA', value: 8, color: '#4f46e5' },
    { name: 'Other Asia / Far East', value: 4, color: '#f59e0b' },
  ];

  // Data 4: Savings Realization Monthly Progression
  const monthlySavingsProgression = [
    { month: 'Jul 2025', MaturedUSD: 42000, MaturedPKR: 11760000, PipelineUSD: 380000, PipelinePKR: 106400000 },
    { month: 'Sep 2025', MaturedUSD: 85000, MaturedPKR: 23800000, PipelineUSD: 410000, PipelinePKR: 114800000 },
    { month: 'Nov 2025', MaturedUSD: 154000, MaturedPKR: 43120000, PipelineUSD: 490000, PipelinePKR: 137200000 },
    { month: 'Jan 2026', MaturedUSD: 245000, MaturedPKR: 68600000, PipelineUSD: 560000, PipelinePKR: 156800000 },
    { month: 'Mar 2026', MaturedUSD: 360000, MaturedPKR: 100800000, PipelineUSD: 680000, PipelinePKR: 190400000 },
    { month: 'Jul 2026 (CPHI)', MaturedUSD: 546000, MaturedPKR: 152880000, PipelineUSD: 850000, PipelinePKR: 238000000 },
    { month: 'Aug 2026+', MaturedUSD: 3213000, MaturedPKR: 899640000, PipelineUSD: 4567000, PipelinePKR: 1278760000 },
  ];

  const formatTooltipValue = (value: any) => {
    return formatCurrency(Number(value), currency, { compact: true });
  };

  return (
    <div id="charts-analytics" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Chart 1: Clustered Columns (Buying Value by Material Category) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Annual Buying Value by Category (LAB vs AHL)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded">
              Clustered Columns
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Comparison of procurement expenditure across API, Excipients, and Packaging
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={classByCompanyData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(v) => formatCurrency(v, currency, { compact: true })} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar
                dataKey={currency === 'PKR' ? 'LAB_PKR' : 'LAB_USD'}
                name="LAB Portfolio"
                fill="#1e3a8a"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey={currency === 'PKR' ? 'AHL_PKR' : 'AHL_USD'}
                name="AHL Portfolio"
                fill="#38bdf8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Clustered Bars (Sourcing Pillars Active vs Under Dev Counts) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Sourcing Pillars: Active Materials vs Pipeline UD Count
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded">
              Clustered Bars
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Fixed Source (161), Multi Source (151), and Single Source (133) pipeline penetration
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sourcingPillarsData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="activeCount" name="Active Material Count" fill="#0f172a" radius={[0, 4, 4, 0]} />
              <Bar dataKey="udCount" name="Under Dev (UD) Count" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Donut Chart (Country of Origin Share) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-50 text-sky-700">
                <PieIcon className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Geographic Manufacturer Origin Distribution
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded">
              Origin Share
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Strategic dependency across India, China, Europe, and Domestic Sources
          </p>
        </div>

        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={originShareData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {originShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}% of Active Materials`} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: Cumulative Savings Realization Trend (Area Chart) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <TrendingUp className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Savings Trajectory: Matured POs vs Total Pipeline
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Monthly Growth
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Progressive commercial conversion from sample trials to executed orders
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlySavingsProgression}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorMatured" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(v) => formatCurrency(v, currency, { compact: true })} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey={currency === 'PKR' ? 'MaturedPKR' : 'MaturedUSD'}
                name="Matured PO Savings"
                stroke="#1e3a8a"
                fillOpacity={1}
                fill="url(#colorMatured)"
              />
              <Area
                type="monotone"
                dataKey={currency === 'PKR' ? 'PipelinePKR' : 'PipelineUSD'}
                name="Total Pipeline Potential"
                stroke="#0ea5e9"
                fillOpacity={1}
                fill="url(#colorPipeline)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
