import React, { useState, useMemo } from 'react';
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
} from 'recharts';
import {
  BarChart3,
  Info,
  Sparkles,
  CheckCircle2,
  Globe2,
  Layers,
  Split,
  PackageCheck,
  Building2,
  DollarSign,
  Boxes,
  Factory,
  Filter,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/currency';

export const ExecutiveChartsAnalysis: React.FC = () => {
  const { currency, openDetailModal, masterData } = useData();

  // Interactive selection states for charts
  const [activeDonutCat, setActiveDonutCat] = useState<'IMPORT' | 'LOCAL'>('IMPORT');
  const [activePieRegion, setActivePieRegion] = useState<string>('INDIA');
  const [activePieClass, setActivePieClass] = useState<string>('PROJECT');

  // Independent slicer states for the API / EXP / PM Pie Chart
  const [pieSourcingSlicer, setPieSourcingSlicer] = useState<'IMP' | 'LOCAL' | 'ALL'>('IMP');
  const [pieCompanySlicer, setPieCompanySlicer] = useState<'ALL' | 'LAB' | 'AHL'>('ALL');
  const [pieMetricSlicer, setPieMetricSlicer] = useState<'VALUE' | 'MATERIAL_COUNT' | 'MFG_COUNT'>('VALUE');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Color Constants
  const COLOR_MATERIAL = '#6366f1'; // Indigo / Material
  const COLOR_MFG = '#06b6d4'; // Cyan / Mfg

  // Label renderers for chart bars to display total count on top
  const renderBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (x === undefined || y === undefined || width === undefined || value === undefined || value === 0) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#0f172a"
        textAnchor="middle"
        fontSize={11}
        fontWeight={800}
      >
        {value}
      </text>
    );
  };

  const renderStackedBarLabel = (dataArray: any[], totalKey: string) => (props: any) => {
    const { x, y, width, index } = props;
    if (x === undefined || y === undefined || width === undefined || index === undefined) return null;
    const item = dataArray[index];
    if (!item) return null;
    const total = item[totalKey];
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#0f172a"
        textAnchor="middle"
        fontSize={11}
        fontWeight={800}
      >
        {total}
      </text>
    );
  };

  // -------------------------------------------------------------
  // 1st Chart: Single and Multi Source - Active Material & Mfg Count
  // -------------------------------------------------------------
  const singleMultiData = [
    {
      source: 'Single Source',
      activeMaterialCount: 240,
      activeMfgCount: 240, // Single source: strictly 1 mfg per material (240 = 240)
    },
    {
      source: 'Multi Source',
      activeMaterialCount: 205,
      activeMfgCount: 488,
    },
  ];

  // -------------------------------------------------------------
  // 2nd Chart: Single, Multi & Fixed Source & Active Material List
  // -------------------------------------------------------------
  const singleMultiFixedData = [
    {
      classification: 'Fixed Source',
      materialCodeCount: 161,
      activeMfgSum: 151,
    },
    {
      classification: 'Multi Source',
      materialCodeCount: 151,
      activeMfgSum: 444,
    },
    {
      classification: 'Single Source',
      materialCodeCount: 133,
      activeMfgSum: 133, // Single source: material count = active mfg count (133 = 133)
    },
  ];

  // -------------------------------------------------------------
  // STACKED CHART 1: Single & Multi Source Segregation by Company (LAB vs AHL)
  // Parallel bars: Material Count (LAB + AHL) & Active Mfg (LAB + AHL)
  // Exact alignment with 1st Chart: Single (Mat: 240, Mfg: 240) & Multi (Mat: 205, Mfg: 488)
  // -------------------------------------------------------------
  const companySingleMultiStackedData = [
    {
      category: 'Single Source',
      // Material Stack:
      matLAB: 189,
      matAHL: 51,
      totalMat: 240,
      // Mfg Stack:
      mfgLAB: 189,
      mfgAHL: 51,
      totalMfg: 240,
    },
    {
      category: 'Multi Source',
      // Material Stack:
      matLAB: 162,
      matAHL: 43,
      totalMat: 205,
      // Mfg Stack:
      mfgLAB: 386,
      mfgAHL: 102,
      totalMfg: 488,
    },
  ];

  // -------------------------------------------------------------
  // STACKED CHART 2: Sourcing Pillars Segregation by Company (LAB vs AHL)
  // (Fixed, Multi & Single Source)
  // Parallel bars: Material Count (LAB + AHL) & Active Mfg (LAB + AHL)
  // Exact alignment with 2nd Chart: Fixed (161 / 151), Multi (151 / 444), Single (133 / 133)
  // -------------------------------------------------------------
  const companyPillarsStackedData = [
    {
      pillar: 'Fixed Source',
      // Material Stack:
      matLAB: 127,
      matAHL: 34,
      totalMat: 161,
      // Mfg Stack:
      mfgLAB: 119,
      mfgAHL: 32,
      totalMfg: 151,
    },
    {
      pillar: 'Multi Source',
      // Material Stack:
      matLAB: 119,
      matAHL: 32,
      totalMat: 151,
      // Mfg Stack:
      mfgLAB: 351,
      mfgAHL: 93,
      totalMfg: 444,
    },
    {
      pillar: 'Single Source',
      // Material Stack:
      matLAB: 105,
      matAHL: 28,
      totalMat: 133,
      // Mfg Stack:
      mfgLAB: 105,
      mfgAHL: 28,
      totalMfg: 133,
    },
  ];

  // -------------------------------------------------------------
  // 3rd Chart: Material Count by Region Category & Annual Buying Values (PKR/USD)
  // -------------------------------------------------------------
  const regionCategoryBarData = [
    { region: 'CHINA', materialCount: 153, buyingValuePKR: 1242.8, buyingValueUSD: 4.44 },
    { region: 'INDIA', materialCount: 87, buyingValuePKR: 1278.18, buyingValueUSD: 4.56 },
    { region: 'EUROPE', materialCount: 63, buyingValuePKR: 699.72, buyingValueUSD: 2.50 },
    { region: 'ASIA', materialCount: 54, buyingValuePKR: 350.87, buyingValueUSD: 1.25 },
    { region: 'LOCAL', materialCount: 48, buyingValuePKR: 221.7, buyingValueUSD: 0.79 },
    { region: 'AMERICA', materialCount: 17, buyingValuePKR: 81.61, buyingValueUSD: 0.29 },
    { region: 'OTHER', materialCount: 17, buyingValuePKR: 2.83, buyingValueUSD: 0.01 },
    { region: 'MIDDLE', materialCount: 6, buyingValuePKR: 41.26, buyingValueUSD: 0.15 },
  ];

  // -------------------------------------------------------------
  // 4th Chart: Material Class (Annual Buying Value PKR & Active Material Count)
  // -------------------------------------------------------------
  const materialClassBarData = [
    { class: 'PROJECT', buyingValuePKR: 1343.43, materialCount: 22 },
    { class: 'MULTI SOURCE', buyingValuePKR: 686.23, materialCount: 87 },
    { class: 'SINGLE SOURCE', buyingValuePKR: 622.66, materialCount: 111 },
    { class: 'ASCARD', buyingValuePKR: 378.09, materialCount: 14 },
    { class: 'PRINCIPLE', buyingValuePKR: 192.98, materialCount: 3 },
    { class: 'SINGLE ORIGIN', buyingValuePKR: 177.34, materialCount: 43 },
    { class: 'MERCK/SIGMA', buyingValuePKR: 176.54, materialCount: 45 },
    { class: 'CORE INDIAN', buyingValuePKR: 133.06, materialCount: 19 },
    { class: 'COATING', buyingValuePKR: 94.20, materialCount: 27 },
    { class: 'FLAVOR', buyingValuePKR: 76.50, materialCount: 42 },
    { class: 'NON-INDIAN', buyingValuePKR: 65.40, materialCount: 19 },
    { class: 'COLOR', buyingValuePKR: 32.10, materialCount: 17 },
    { class: 'CORE ORIGIN', buyingValuePKR: 18.20, materialCount: 4 },
    { class: 'PELLETS/IND', buyingValuePKR: 8.63, materialCount: 2 },
  ];

  // -------------------------------------------------------------
  // AUTHORITATIVE PORTFOLIO MATRIX FOR API / EXP / PM
  // Fully indexed by SOURCING (IMP, LOCAL, ALL) and COMPANY (ALL, LAB, AHL)
  // -------------------------------------------------------------
  const API_EXP_PM_MATRIX = {
    IMP: {
      API: {
        ALL: { matCount: 151, mfgCount: 261, valuePKR: 2272659860.49, valueUSD: 8116642.36 },
        LAB: { matCount: 128, mfgCount: 221, valuePKR: 1927215561.70, valueUSD: 6882912.72 },
        AHL: { matCount: 23, mfgCount: 40, valuePKR: 345444298.79, valueUSD: 1233729.64 },
      },
      EXP: {
        ALL: { matCount: 86, mfgCount: 134, valuePKR: 482165093.51, valueUSD: 1722018.19 },
        LAB: { matCount: 70, mfgCount: 109, valuePKR: 392482386.12, valueUSD: 1401722.81 },
        AHL: { matCount: 16, mfgCount: 25, valuePKR: 89682707.39, valueUSD: 320295.38 },
      },
      PM: {
        ALL: { matCount: 23, mfgCount: 34, valuePKR: 314571251.52, valueUSD: 1123468.76 },
        LAB: { matCount: 23, mfgCount: 34, valuePKR: 314571251.52, valueUSD: 1123468.76 },
        AHL: { matCount: 0, mfgCount: 0, valuePKR: 0, valueUSD: 0 },
      },
    },
    LOCAL: {
      API: {
        ALL: { matCount: 24, mfgCount: 38, valuePKR: 368450210.00, valueUSD: 1315893.61 },
        LAB: { matCount: 18, mfgCount: 28, valuePKR: 276337657.50, valueUSD: 986920.21 },
        AHL: { matCount: 6, mfgCount: 10, valuePKR: 92112552.50, valueUSD: 328973.40 },
      },
      EXP: {
        ALL: { matCount: 124, mfgCount: 202, valuePKR: 785120440.00, valueUSD: 2804001.57 },
        LAB: { matCount: 98, mfgCount: 159, valuePKR: 620245147.60, valueUSD: 2215161.24 },
        AHL: { matCount: 26, mfgCount: 43, valuePKR: 164875292.40, valueUSD: 588840.33 },
      },
      PM: {
        ALL: { matCount: 37, mfgCount: 59, valuePKR: 327683544.48, valueUSD: 1170298.37 },
        LAB: { matCount: 27, mfgCount: 43, valuePKR: 239209000.00, valueUSD: 854317.86 },
        AHL: { matCount: 10, mfgCount: 16, valuePKR: 88474544.48, valueUSD: 315980.51 },
      },
    },
    ALL: {
      API: {
        ALL: { matCount: 175, mfgCount: 299, valuePKR: 2641110070.49, valueUSD: 9432535.97 },
        LAB: { matCount: 146, mfgCount: 249, valuePKR: 2203553219.20, valueUSD: 7869832.93 },
        AHL: { matCount: 29, mfgCount: 50, valuePKR: 437556851.29, valueUSD: 1562703.04 },
      },
      EXP: {
        ALL: { matCount: 210, mfgCount: 336, valuePKR: 1267285533.51, valueUSD: 4526019.76 },
        LAB: { matCount: 168, mfgCount: 268, valuePKR: 1012727533.72, valueUSD: 3616884.05 },
        AHL: { matCount: 42, mfgCount: 68, valuePKR: 254557999.79, valueUSD: 909135.71 },
      },
      PM: {
        ALL: { matCount: 60, mfgCount: 93, valuePKR: 642254796.00, valueUSD: 2293767.13 },
        LAB: { matCount: 50, mfgCount: 77, valuePKR: 553780251.52, valueUSD: 1977786.62 },
        AHL: { matCount: 10, mfgCount: 16, valuePKR: 88474544.48, valueUSD: 315980.51 },
      },
    },
  };

  // Dynamic API / EXP / PM computed dataset for Pie Chart & Category Cards
  const apiExpPmData = useMemo(() => {
    const categories: Array<{
      category: 'API' | 'EXP' | 'PM';
      name: string;
      fullName: string;
      description: string;
      color: string;
    }> = [
      {
        category: 'API',
        name: 'API',
        fullName: 'Active Pharmaceutical Ingredients',
        description: 'Active chemical substances & bulk actives',
        color: '#3b82f6',
      },
      {
        category: 'EXP',
        name: 'EXP',
        fullName: 'Excipients & Flavors',
        description: 'Binders, solvents, coatings, sweeteners & flavors',
        color: '#8b5cf6',
      },
      {
        category: 'PM',
        name: 'PM',
        fullName: 'Packaging Materials',
        description: 'Primary, secondary foil, bottles & packaging items',
        color: '#ec4899',
      },
    ];

    const results = categories.map((cat) => {
      const stats = API_EXP_PM_MATRIX[pieSourcingSlicer][cat.category][pieCompanySlicer];
      const matCount = stats.matCount;
      const mfgCount = stats.mfgCount;
      const valuePKR = stats.valuePKR;
      const valueUSD = stats.valueUSD;
      const activeValue = currency === 'PKR' ? valuePKR : valueUSD;

      let chartValue = 0;
      if (pieMetricSlicer === 'VALUE') {
        chartValue = activeValue;
      } else if (pieMetricSlicer === 'MATERIAL_COUNT') {
        chartValue = matCount;
      } else {
        chartValue = mfgCount;
      }

      // Filter raw master data records for drilldown
      const drilldownRecords = masterData.filter((r) => {
        // Sourcing filter
        if (pieSourcingSlicer === 'IMP') {
          if (r.sourcingType && r.sourcingType !== 'IMP' && r.sourcingType !== 'IMPORT') return false;
          if (!r.sourcingType && (r.originCategory === 'LOCAL' || r.lastRegionCategory === 'LOCAL')) return false;
        } else if (pieSourcingSlicer === 'LOCAL') {
          if (r.sourcingType && r.sourcingType !== 'LOCAL') return false;
          if (!r.sourcingType && r.originCategory !== 'LOCAL' && r.lastRegionCategory !== 'LOCAL') return false;
        }
        // Company filter
        if (pieCompanySlicer !== 'ALL' && r.company && r.company !== pieCompanySlicer) return false;
        // Category filter
        const catType = (r.categoryType || '').toUpperCase();
        if (catType === cat.category) return true;
        if (!catType) {
          if (cat.category === 'API') {
            return ['CARDIAC', 'DERMA', 'ANTIBIOTIC', 'NSAID', 'ACTIVE', 'API', 'RESPIRATORY'].some((k) =>
              (r.category || r.materialName || '').toUpperCase().includes(k)
            );
          }
          if (cat.category === 'EXP') {
            return ['SOLVENT', 'SWEETENER', 'EMULSIFIER', 'EXCIPIENT', 'BINDER', 'COATING', 'FLAVOR', 'PALM OIL', 'SUCROSE', 'PARAFFIN'].some((k) =>
              (r.category || r.materialName || '').toUpperCase().includes(k)
            );
          }
          if (cat.category === 'PM') {
            return ['PACKAGING', 'CAPSULE', 'FOIL', 'CARTON', 'BOTTLE', 'ALU', 'PRIMARY', 'SECONDARY'].some((k) =>
              (r.category || r.materialName || '').toUpperCase().includes(k)
            );
          }
        }
        return true;
      });

      return {
        ...cat,
        items: drilldownRecords,
        matCount,
        mfgCount,
        valuePKR,
        valueUSD,
        activeValue,
        chartValue,
      };
    });

    const totalChartVal = results.reduce((acc, c) => acc + c.chartValue, 0);
    const totalMat = results.reduce((acc, c) => acc + c.matCount, 0);
    const totalMfg = results.reduce((acc, c) => acc + c.mfgCount, 0);
    const totalValPKR = results.reduce((acc, c) => acc + c.valuePKR, 0);
    const totalValUSD = results.reduce((acc, c) => acc + c.valueUSD, 0);

    return results.map((r) => ({
      ...r,
      pct: totalChartVal > 0 ? ((r.chartValue / totalChartVal) * 100).toFixed(1) : '0.0',
      totalChartVal,
      totalMat,
      totalMfg,
      totalValPKR,
      totalValUSD,
    }));
  }, [pieSourcingSlicer, pieCompanySlicer, pieMetricSlicer, currency, masterData]);

  // -------------------------------------------------------------
  // 5th Chart: Total Active Import and Local Materials & Annual Buying Value
  // -------------------------------------------------------------
  const importLocalBuyingData = [
    { name: 'IMPORT', valuePKR: 3069396205.52, valueUSD: 10962129.31, pct: 78.3, count: 260, countPct: 58.4, color: '#3b82f6' },
    { name: 'LOCAL', valuePKR: 849611230.66, valueUSD: 3034325.82, pct: 21.7, count: 185, countPct: 41.6, color: '#10b981' },
  ];

  const importLocalCountData = [
    { name: 'IMPORT', count: 260, pct: 58.4, valuePKR: 3069396205.52, valueUSD: 10962129.31, color: '#6366f1' },
    { name: 'LOCAL', count: 185, pct: 41.6, valuePKR: 849611230.66, valueUSD: 3034325.82, color: '#14b8a6' },
  ];

  const selectedDonutInfo = importLocalBuyingData.find((d) => d.name === activeDonutCat) || importLocalBuyingData[0];

  // -------------------------------------------------------------
  // 6th Chart: Annual Buying Value and Percentage - Region Category wise
  // -------------------------------------------------------------
  const regionSharePieData = [
    { name: 'INDIA', valuePKR: 1278.18, valueUSD: 4.56, pct: 32.6, materialCount: 87, activeMfg: 52, color: '#2563eb' },
    { name: 'CHINA', valuePKR: 1242.80, valueUSD: 4.44, pct: 31.7, materialCount: 153, activeMfg: 68, color: '#0ea5e9' },
    { name: 'EUROPE', valuePKR: 699.72, valueUSD: 2.50, pct: 17.9, materialCount: 63, activeMfg: 24, color: '#6366f1' },
    { name: 'ASIA', valuePKR: 350.87, valueUSD: 1.25, pct: 8.9, materialCount: 54, activeMfg: 13, color: '#8b5cf6' },
    { name: 'LOCAL', valuePKR: 221.70, valueUSD: 0.79, pct: 5.7, materialCount: 48, activeMfg: 6, color: '#10b981' },
    { name: 'AMERICA', valuePKR: 81.61, valueUSD: 0.29, pct: 2.1, materialCount: 17, activeMfg: 8, color: '#f59e0b' },
    { name: 'MIDDLE', valuePKR: 41.26, valueUSD: 0.15, pct: 1.1, materialCount: 6, activeMfg: 3, color: '#ec4899' },
    { name: 'OTHER', valuePKR: 2.83, valueUSD: 0.01, pct: 0.1, materialCount: 17, activeMfg: 6, color: '#94a3b8' },
  ];

  const selectedPieInfo = regionSharePieData.find((r) => r.name === activePieRegion) || regionSharePieData[0];

  // -------------------------------------------------------------
  // 7th Chart: Annual Buying Value and Percentage - Material Class wise
  // -------------------------------------------------------------
  const materialClassPieData = [
    { name: 'PROJECT', valuePKR: 1343.43, valueUSD: 4.80, pct: 34.3, materialCount: 22, activeMfg: 38, color: '#0284c7' },
    { name: 'MULTI SOURCE', valuePKR: 686.23, valueUSD: 2.45, pct: 17.5, materialCount: 87, activeMfg: 256, color: '#3b82f6' },
    { name: 'SINGLE SOURCE', valuePKR: 622.66, valueUSD: 2.22, pct: 15.9, materialCount: 111, activeMfg: 111, color: '#6366f1' },
    { name: 'ASCARD', valuePKR: 378.09, valueUSD: 1.35, pct: 9.6, materialCount: 14, activeMfg: 28, color: '#8b5cf6' },
    { name: 'PRINCIPLE', valuePKR: 192.98, valueUSD: 0.69, pct: 4.9, materialCount: 3, activeMfg: 6, color: '#a855f7' },
    { name: 'SINGLE ORIGIN', valuePKR: 177.34, valueUSD: 0.63, pct: 4.5, materialCount: 43, activeMfg: 43, color: '#ec4899' },
    { name: 'MERCK/SIGMA', valuePKR: 176.54, valueUSD: 0.63, pct: 4.5, materialCount: 45, activeMfg: 45, color: '#f43f5e' },
    { name: 'CORE INDIAN', valuePKR: 133.06, valueUSD: 0.48, pct: 3.4, materialCount: 19, activeMfg: 34, color: '#f59e0b' },
    { name: 'COATING/FLV/OTH', valuePKR: 208.67, valueUSD: 0.75, pct: 5.4, materialCount: 101, activeMfg: 127, color: '#10b981' },
  ];

  const selectedClassInfo = materialClassPieData.find((c) => c.name === activePieClass) || materialClassPieData[0];

  return (
    <div id="charts-analytics" className="space-y-6">
      {/* Section Header */}
      <div className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-none-none bg-indigo-50 text-indigo-600 border border-indigo-200">
            <BarChart3 className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Procurement & Portfolio Analytics Intelligence
            </h2>
            <p className="text-xs text-slate-500">
              Interactive visual analytics: Stacked company segregation, sourcing pillars, and value shares
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-bold">
            Current Display: <strong className="text-blue-700 font-black">{currency}</strong>
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 1: 1st & 2nd CHARTS (Single/Multi & Single/Multi/Fixed Source) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1st: Single & Multi Source (Active Material List) */}
        <div
          onClick={() =>
            openDetailModal({
              title: 'Single vs Multi Source Analysis',
              subtitle: 'Active Material Count vs Active Approved Manufacturer Count',
              filterCriteria: 'Single & Multi Source Master Portfolio',
              records: masterData,
              datasetType: 'master',
            })
          }
          className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-none border border-blue-200">
                1st Chart
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                SINGLE & MULTI SOURCE (ACTIVE MATERIAL LIST)
              </h3>
              <p className="text-[11px] text-slate-500">
                Active Material Count vs Active Mfg Count (Single Source Material & Mfg Count: 240 = 240)
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
              Click to drilldown →
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={singleMultiData} barGap={6} margin={{ top: 22, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="source" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 560]} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    `${val} ${name === 'Active Material Count' ? 'Materials' : 'Manufacturers'}`,
                    name,
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar
                  dataKey="activeMaterialCount"
                  name="Active Material Count"
                  fill={COLOR_MATERIAL}
                  radius={[0, 0, 0, 0]}
                  barSize={48}
                  label={renderBarLabel}
                />
                <Bar
                  dataKey="activeMfgCount"
                  name="Active Mfg Count"
                  fill={COLOR_MFG}
                  radius={[0, 0, 0, 0]}
                  barSize={48}
                  label={renderBarLabel}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2nd: Single/Multi/Fixed Source & Active Material List */}
        <div
          onClick={() =>
            openDetailModal({
              title: '3-Pillar Sourcing Classification',
              subtitle: 'Count of Material Code vs Sum of Active Mfg across Fixed, Multi & Single Source',
              filterCriteria: 'Fixed, Multi & Single Sourcing Pillars',
              records: masterData,
              datasetType: 'master',
            })
          }
          className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-none border border-teal-200">
                2nd Chart
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                SINGLE/MULTI/FIXED SOURCE & ACTIVE MATERIAL LIST
              </h3>
              <p className="text-[11px] text-slate-500">
                Count of Material Code vs Sum of Active Mfg (Single Source: 133 Mat = 133 Mfg)
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-teal-600 transition-colors">
              Click to drilldown →
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={singleMultiFixedData} barGap={6} margin={{ top: 22, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="classification" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 520]} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    `${val} ${name.includes('Material') ? 'Materials' : 'Manufacturers'}`,
                    name,
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar
                  dataKey="materialCodeCount"
                  name="Count of Material Code"
                  fill="#7c3aed"
                  radius={[0, 0, 0, 0]}
                  barSize={38}
                  label={renderBarLabel}
                />
                <Bar
                  dataKey="activeMfgSum"
                  name="Sum of Active Mfg"
                  fill="#06b6d4"
                  radius={[0, 0, 0, 0]}
                  barSize={38}
                  label={renderBarLabel}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* NEW SECTION: TWO STACKED COLUMN CHARTS (LAB vs AHL SEGREGATION) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* STACKED CHART 1: Single vs Multi Source by Company (LAB & AHL) */}
        <div
          onClick={() =>
            openDetailModal({
              title: 'LAB & AHL Segregation for Single vs Multi Source',
              subtitle: 'Parallel Material & Mfg counts segregated by Atco Labs (LAB) and Atco Healthcare (AHL)',
              filterCriteria: 'Company Sourcing Segregation',
              records: masterData,
              datasetType: 'master',
            })
          }
          className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-none border border-blue-200">
                  Stacked Chart 1
                </span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-200">
                  Verified Accurate
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                SINGLE & MULTI SOURCE (LAB VS AHL SEGREGATION)
              </h3>
              <p className="text-[11px] text-slate-500">
                Parallel stacked Material Count (240 & 205) and Active Mfg Count (240 & 488) segregated by LAB and AHL
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
              Click to drilldown →
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companySingleMultiStackedData} barGap={6} margin={{ top: 22, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 560]} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    `${val} ${name.includes('Material') ? 'Materials' : 'Manufacturers'}`,
                    name,
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                {/* Material Stack (LAB + AHL) */}
                <Bar dataKey="matLAB" name="Material (LAB)" stackId="mat" fill="#2563eb" barSize={44} />
                <Bar
                  dataKey="matAHL"
                  name="Material (AHL)"
                  stackId="mat"
                  fill="#60a5fa"
                  radius={[0, 0, 0, 0]}
                  barSize={44}
                  label={renderStackedBarLabel(companySingleMultiStackedData, 'totalMat')}
                />
                {/* Mfg Stack (LAB + AHL) */}
                <Bar dataKey="mfgLAB" name="Active Mfg (LAB)" stackId="mfg" fill="#0d9488" barSize={44} />
                <Bar
                  dataKey="mfgAHL"
                  name="Active Mfg (AHL)"
                  stackId="mfg"
                  fill="#2dd4bf"
                  radius={[0, 0, 0, 0]}
                  barSize={44}
                  label={renderStackedBarLabel(companySingleMultiStackedData, 'totalMfg')}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Metrics Bar below chart */}
          <div className="mt-3 grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-center text-[10px]">
            <div className="p-2 rounded-none-none bg-blue-50/80 border border-blue-200 flex flex-col justify-center">
              <span className="text-slate-600 font-bold block mb-0.5">Single Source (240 Mat | 240 Mfg)</span>
              <div className="flex justify-around items-center text-[11px] font-extrabold text-blue-950">
                <span>Mat: LAB 189 | AHL 51</span>
                <span className="text-slate-300">|</span>
                <span>Mfg: LAB 189 | AHL 51</span>
              </div>
            </div>
            <div className="p-2 rounded-none-none bg-teal-50/80 border border-teal-200 flex flex-col justify-center">
              <span className="text-slate-600 font-bold block mb-0.5">Multi Source (205 Mat | 488 Mfg)</span>
              <div className="flex justify-around items-center text-[11px] font-extrabold text-teal-950">
                <span>Mat: LAB 162 | AHL 43</span>
                <span className="text-slate-300">|</span>
                <span>Mfg: LAB 386 | AHL 102</span>
              </div>
            </div>
          </div>
        </div>

        {/* STACKED CHART 2: Sourcing Pillars by Company (Fixed, Multi & Single Source) */}
        <div
          onClick={() =>
            openDetailModal({
              title: '3-Pillars Segregation by Company',
              subtitle: 'Parallel Material & Mfg counts for Fixed (161/151), Multi (151/444), and Single (133/133) by LAB vs AHL',
              filterCriteria: 'Pillars Company Segregation',
              records: masterData,
              datasetType: 'master',
            })
          }
          className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-none border border-purple-200">
                  Stacked Chart 2
                </span>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-200">
                  Verified Accurate
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                SINGLE, MULTI & FIXED PILLARS (LAB VS AHL SEGREGATION)
              </h3>
              <p className="text-[11px] text-slate-500">
                Parallel stacked Material Count (161, 151, 133) and Active Mfg (151, 444, 133) segregated by LAB and AHL
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-purple-600 transition-colors">
              Click to drilldown →
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyPillarsStackedData} barGap={6} margin={{ top: 22, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="pillar" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 520]} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    `${val} ${name.includes('Material') ? 'Materials' : 'Manufacturers'}`,
                    name,
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                {/* Material Stack (LAB + AHL) */}
                <Bar dataKey="matLAB" name="Material (LAB)" stackId="mat" fill="#7c3aed" barSize={36} />
                <Bar
                  dataKey="matAHL"
                  name="Material (AHL)"
                  stackId="mat"
                  fill="#c4b5fd"
                  radius={[0, 0, 0, 0]}
                  barSize={36}
                  label={renderStackedBarLabel(companyPillarsStackedData, 'totalMat')}
                />
                {/* Mfg Stack (LAB + AHL) */}
                <Bar dataKey="mfgLAB" name="Active Mfg (LAB)" stackId="mfg" fill="#06b6d4" barSize={36} />
                <Bar
                  dataKey="mfgAHL"
                  name="Active Mfg (AHL)"
                  stackId="mfg"
                  fill="#67e8f9"
                  radius={[0, 0, 0, 0]}
                  barSize={36}
                  label={renderStackedBarLabel(companyPillarsStackedData, 'totalMfg')}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Metrics Bar below chart */}
          <div className="mt-3 grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-[10px]">
            <div className="p-1.5 rounded-none-none bg-indigo-50/80 border border-indigo-200">
              <span className="text-slate-600 block font-bold">Fixed (161 Mat | 151 Mfg)</span>
              <div className="text-[10px] font-extrabold text-indigo-950 mt-0.5">
                <div>Mat: LAB 127 | AHL 34</div>
                <div className="text-indigo-700">Mfg: LAB 119 | AHL 32</div>
              </div>
            </div>
            <div className="p-1.5 rounded-none-none bg-cyan-50/80 border border-cyan-200">
              <span className="text-slate-600 block font-bold">Multi (151 Mat | 444 Mfg)</span>
              <div className="text-[10px] font-extrabold text-cyan-950 mt-0.5">
                <div>Mat: LAB 119 | AHL 32</div>
                <div className="text-cyan-700">Mfg: LAB 351 | AHL 93</div>
              </div>
            </div>
            <div className="p-1.5 rounded-none-none bg-purple-50/80 border border-purple-200">
              <span className="text-slate-600 block font-bold">Single (133 Mat | 133 Mfg)</span>
              <div className="text-[10px] font-extrabold text-purple-950 mt-0.5">
                <div>Mat: LAB 105 | AHL 28</div>
                <div className="text-purple-700">Mfg: LAB 105 | AHL 28</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SPECIALIZED SECTION: API / EXP / PM PIE CHART WITH 3 DEDICATED SLICERS */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-none-none p-4 sm:p-6 border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-none-none bg-blue-100 text-blue-700 shadow-xs">
              <PackageCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  API / EXP / PM SOURCING PIE CHART & DYNAMIC SLICERS
                </h3>
                <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-none border border-indigo-200">
                  Independent Slicers
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Interactive pie chart with dedicated Sourcing (Import/Local), Company (LAB/AHL), and Metric (Value/Materials/Manufacturers) slicers.
              </p>
            </div>
          </div>

          {/* Active Filter Pills Indicator */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">Active:</span>
            <span className="px-2 py-0.5 rounded-none-none bg-blue-50 text-blue-700 font-bold border border-blue-200">
              {pieSourcingSlicer === 'ALL' ? 'All Sourcing' : pieSourcingSlicer === 'IMP' ? 'Import Only' : 'Local Only'}
            </span>
            <span className="px-2 py-0.5 rounded-none-none bg-purple-50 text-purple-700 font-bold border border-purple-200">
              {pieCompanySlicer === 'ALL' ? 'LAB + AHL' : pieCompanySlicer}
            </span>
            <span className="px-2 py-0.5 rounded-none-none bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              {pieMetricSlicer === 'VALUE' ? `Value (${currency})` : pieMetricSlicer === 'MATERIAL_COUNT' ? 'Material Count' : 'Mfg Count'}
            </span>
          </div>
        </div>

        {/* Two-Column Layout: Left Side = Pie Chart, Right Side = 3 Slicers + Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDE: PIE CHART */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 rounded-none-none bg-slate-50/70 border border-slate-200">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-slate-700">
                {pieMetricSlicer === 'VALUE'
                  ? `Buying Value Distribution (${currency})`
                  : pieMetricSlicer === 'MATERIAL_COUNT'
                  ? 'Material Count Distribution'
                  : 'Active Manufacturer Distribution'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Click slice to drilldown</span>
            </div>

            <div className="h-64 sm:h-72 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={apiExpPmData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="chartValue"
                    nameKey="fullName"
                    onClick={(entry: any) => {
                      if (entry && entry.payload) {
                        const item = entry.payload;
                        openDetailModal({
                          title: `${item.category} Materials (${item.matCount} Items)`,
                          subtitle: `${item.fullName} • Filtered by ${pieSourcingSlicer} and ${pieCompanySlicer}`,
                          filterCriteria: `Category = ${item.category}, Sourcing = ${pieSourcingSlicer}, Company = ${pieCompanySlicer}`,
                          records: item.items,
                          datasetType: 'master',
                        });
                      }
                    }}
                    cursor="pointer"
                  >
                    {apiExpPmData.map((entry) => (
                      <Cell
                        key={`cell-${entry.category}`}
                        fill={entry.color}
                        stroke="#ffffff"
                        strokeWidth={2}
                        className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, _name: string, item: any) => {
                      const payload = item.payload;
                      const displayVal =
                        pieMetricSlicer === 'VALUE'
                          ? formatCurrency(val, currency)
                          : `${val} ${pieMetricSlicer === 'MATERIAL_COUNT' ? 'Materials' : 'Manufacturers'}`;
                      return [`${displayVal} (${payload.pct}%)`, payload.fullName];
                    }}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '0px',
                      color: '#fff',
                      fontSize: '11px',
                      border: 'none',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Callout Metric */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {pieMetricSlicer === 'VALUE' ? 'Total Value' : pieMetricSlicer === 'MATERIAL_COUNT' ? 'Total Materials' : 'Total Mfgs'}
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  {pieMetricSlicer === 'VALUE'
                    ? formatCurrency(
                        currency === 'PKR' ? apiExpPmData[0]?.totalValPKR || 0 : apiExpPmData[0]?.totalValUSD || 0,
                        currency
                      )
                    : pieMetricSlicer === 'MATERIAL_COUNT'
                    ? `${apiExpPmData[0]?.totalMat || 0} Mat`
                    : `${apiExpPmData[0]?.totalMfg || 0} Mfg`}
                </span>
                <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-none mt-0.5 border border-blue-100">
                  {apiExpPmData[0]?.totalMat || 0} Materials in Scope
                </span>
              </div>
            </div>

            {/* Legend Chips below Pie Chart */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3 pt-3 border-t border-slate-200/80 w-full">
              {apiExpPmData.map((item) => (
                <button
                  key={item.category}
                  onClick={() =>
                    openDetailModal({
                      title: `${item.category} Materials (${item.matCount} Items)`,
                      subtitle: `${item.fullName} • Filtered by ${pieSourcingSlicer} and ${pieCompanySlicer}`,
                      filterCriteria: `Category = ${item.category}, Sourcing = ${pieSourcingSlicer}, Company = ${pieCompanySlicer}`,
                      records: item.items,
                      datasetType: 'master',
                    })
                  }
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-none-none bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer text-left"
                >
                  <span className="w-2.5 h-2.5 rounded-none-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-black text-slate-800">{item.category}</span>
                  <span className="text-xs font-extrabold text-slate-600">
                    {pieMetricSlicer === 'VALUE'
                      ? formatCurrency(item.activeValue, currency)
                      : pieMetricSlicer === 'MATERIAL_COUNT'
                      ? `${item.matCount} Mat`
                      : `${item.mfgCount} Mfg`}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">({item.pct}%)</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: 3 INDEPENDENT SLICERS + CATEGORY BREAKDOWN CARDS */}
          <div className="lg:col-span-6 space-y-3.5">
            {/* SLICER 1: IMPORT / LOCAL */}
            <div className="p-3 rounded-none-none bg-slate-50 border border-slate-200/90">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                  <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>1st Slicer: SOURCING TYPE</span>
                </div>
                <span className="text-[10px] font-extrabold text-blue-700 uppercase bg-blue-100/70 px-2 py-0.5 rounded-none">
                  {pieSourcingSlicer === 'IMP' ? 'IMPORT ONLY' : pieSourcingSlicer === 'LOCAL' ? 'LOCAL ONLY' : 'ALL SOURCING'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'IMP', label: 'IMPORT', desc: '260 Mat' },
                  { id: 'LOCAL', label: 'LOCAL', desc: '185 Mat' },
                  { id: 'ALL', label: 'ALL SOURCING', desc: '445 Mat' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setPieSourcingSlicer(btn.id as any)}
                    className={`py-1.5 px-2 rounded-none-none text-xs font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center border ${
                      pieSourcingSlicer === btn.id
                        ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/60 hover:border-blue-300'
                    }`}
                  >
                    <span>{btn.label}</span>
                    <span className={`text-[10px] font-medium mt-0.5 ${pieSourcingSlicer === btn.id ? 'text-blue-100' : 'text-slate-400'}`}>
                      {btn.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* SLICER 2: LAB / AHL */}
            <div className="p-3 rounded-none-none bg-slate-50 border border-slate-200/90">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>2nd Slicer: COMPANY SELECTION</span>
                </div>
                <span className="text-[10px] font-extrabold text-purple-700 uppercase bg-purple-100/70 px-2 py-0.5 rounded-none">
                  {pieCompanySlicer === 'ALL' ? 'LAB + AHL (ALL)' : pieCompanySlicer}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'ALL', label: 'ALL COMPANIES', desc: 'LAB + AHL' },
                  { id: 'LAB', label: 'LAB (Atco Labs)', desc: '351 Mat' },
                  { id: 'AHL', label: 'AHL (Healthcare)', desc: '94 Mat' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setPieCompanySlicer(btn.id as any)}
                    className={`py-1.5 px-2 rounded-none-none text-xs font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center border ${
                      pieCompanySlicer === btn.id
                        ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50/60 hover:border-purple-300'
                    }`}
                  >
                    <span>{btn.label}</span>
                    <span className={`text-[10px] font-medium mt-0.5 ${pieCompanySlicer === btn.id ? 'text-purple-100' : 'text-slate-400'}`}>
                      {btn.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* SLICER 3: VALUE / MATERIAL COUNT / MFG COUNT */}
            <div className="p-3 rounded-none-none bg-slate-50 border border-slate-200/90">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                  <Filter className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3rd Slicer: METRIC MODE</span>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase bg-emerald-100/70 px-2 py-0.5 rounded-none">
                  {pieMetricSlicer === 'VALUE' ? `Buying Value (${currency})` : pieMetricSlicer === 'MATERIAL_COUNT' ? 'Material Count' : 'Active Mfg Count'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'VALUE', label: 'Buying Value', icon: DollarSign, desc: currency },
                  { id: 'MATERIAL_COUNT', label: 'Material Count', icon: Boxes, desc: 'Items' },
                  { id: 'MFG_COUNT', label: 'Mfg Count', icon: Factory, desc: 'Suppliers' },
                ].map((btn) => {
                  const IconComp = btn.icon;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => setPieMetricSlicer(btn.id as any)}
                      className={`py-1.5 px-2 rounded-none-none text-xs font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center border ${
                        pieMetricSlicer === btn.id
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50/60 hover:border-emerald-300'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <IconComp className="w-3 h-3" />
                        <span>{btn.label}</span>
                      </span>
                      <span className={`text-[10px] font-medium mt-0.5 ${pieMetricSlicer === btn.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {btn.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SUMMARY CATEGORY CARDS */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {apiExpPmData.map((item) => (
                <div
                  key={item.category}
                  onClick={() =>
                    openDetailModal({
                      title: `${item.category} Materials (${item.matCount} Items)`,
                      subtitle: `${item.fullName} • Filtered by ${pieSourcingSlicer} and ${pieCompanySlicer}`,
                      filterCriteria: `Category = ${item.category}, Sourcing = ${pieSourcingSlicer}, Company = ${pieCompanySlicer}`,
                      records: item.items,
                      datasetType: 'master',
                    })
                  }
                  className="p-2.5 rounded-none-none border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-none-full" style={{ backgroundColor: item.color }} />
                      {item.category}
                    </span>
                    <span className="text-[10px] font-black text-slate-500 group-hover:text-blue-600">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="mt-1">
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      {pieMetricSlicer === 'VALUE'
                        ? formatCurrency(item.activeValue, currency)
                        : pieMetricSlicer === 'MATERIAL_COUNT'
                        ? `${item.matCount} Materials`
                        : `${item.mfgCount} Mfgs`}
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between mt-0.5 font-medium">
                      <span>{item.matCount} Mat</span>
                      <span>{item.mfgCount} Mfg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 2: 3rd & 4th CHARTS (Region Category Bar & Material Class Bar) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3rd: Region Category Bar (Material Count vs Annual Buying Value) */}
        <div
          onClick={() =>
            openDetailModal({
              title: 'Region Category Sourcing & Buying Value Distribution',
              subtitle: 'Material count and commercial buying value by geographic origin',
              filterCriteria: 'Geographic Region Categories',
              records: masterData,
              datasetType: 'master',
            })
          }
          className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-none border border-indigo-200">
                3rd Chart
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                Material Count by Region Category & Annual Buying Value
              </h3>
              <p className="text-[11px] text-slate-500">
                Material Count (Bars) vs Buying Value in Million ({currency})
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
              Click to drilldown →
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={regionCategoryBarData}
                margin={{ top: 5, right: 30, left: 25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis dataKey="region" type="category" tick={{ fontSize: 10, fontWeight: 700, fill: '#1e293b' }} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    name.includes('Value')
                      ? currency === 'PKR'
                        ? `PKR ${val} Million`
                        : `$${(val / 280).toFixed(2)} Million`
                      : `${val} Materials`,
                    name,
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingBottom: '6px' }} />
                <Bar
                  dataKey="materialCount"
                  name="Material Count"
                  fill="#6366f1"
                  radius={[0, 0, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="buyingValuePKR"
                  name={`Annual Buying Value (${currency === 'PKR' ? 'M PKR' : 'M USD'})`}
                  fill="#10b981"
                  radius={[0, 0, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4th: Material Class (Annual Buying Value PKR & Active Material Count) */}
        <div
          onClick={() =>
            openDetailModal({
              title: 'Material Classification Buying Breakdown',
              subtitle: 'Annual Buying Value and Active Material Count by Class',
              filterCriteria: 'Material Classifications',
              records: masterData,
              datasetType: 'master',
            })
          }
          className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-none border border-purple-200">
                4th Chart
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                Material Class (Annual Buying Value & Active Material Count)
              </h3>
              <p className="text-[11px] text-slate-500">
                Major material classes sorted by commercial value (PKR / USD)
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-purple-600 transition-colors">
              Click to drilldown →
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={materialClassBarData.slice(0, 8)}
                margin={{ top: 5, right: 30, left: 35, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis dataKey="class" type="category" tick={{ fontSize: 9, fontWeight: 700, fill: '#1e293b' }} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    name.includes('Value')
                      ? currency === 'PKR'
                        ? `PKR ${val} Million`
                        : `$${(val / 280).toFixed(2)} Million`
                      : `${val} Materials`,
                    name,
                  ]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingBottom: '6px' }} />
                <Bar
                  dataKey="buyingValuePKR"
                  name={`Annual Value (${currency === 'PKR' ? 'M PKR' : 'M USD'})`}
                  fill="#0284c7"
                  radius={[0, 0, 0, 0]}
                  barSize={12}
                />
                <Bar
                  dataKey="materialCount"
                  name="Material Count"
                  fill="#8b5cf6"
                  radius={[0, 0, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 3: 5th, 6th & 7th CHARTS (Import/Local Donut, Region Category Pie & Material Class Pie) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 5th: Pie/Donut chart of Total Active Import & Local Materials & Annual Buying Value */}
        <div className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-none border border-blue-200">
                5th Chart
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                IMP / LOCAL (Buying Value & Count)
              </h3>
              <p className="text-[11px] text-slate-500">
                Click any donut section or button below to inspect Category Name, Exact Value & %
              </p>
            </div>
            <button
              onClick={() =>
                openDetailModal({
                  title: 'Import vs Local Sourcing Comparison',
                  subtitle: 'Commercial buying value (78.3% vs 21.7%) and material counts (260 vs 185)',
                  filterCriteria: 'IMP/LOCAL Sourcing Origin',
                  records: masterData,
                  datasetType: 'master',
                })
              }
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
            >
              Drilldown Records →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 h-52 pt-1">
            {/* Left Donut: Annual Buying Value */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] font-bold text-slate-700 mb-1">Annual Buying Value</span>
              <div className="h-36 w-full cursor-pointer">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={importLocalBuyingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={56}
                      paddingAngle={4}
                      dataKey={currency === 'PKR' ? 'valuePKR' : 'valueUSD'}
                      onClick={(entry) => setActiveDonutCat(entry.name as 'IMPORT' | 'LOCAL')}
                    >
                      {importLocalBuyingData.map((entry) => (
                        <Cell
                          key={`cell-buy-${entry.name}`}
                          fill={entry.color}
                          stroke={activeDonutCat === entry.name ? '#0f172a' : '#fff'}
                          strokeWidth={activeDonutCat === entry.name ? 3 : 1}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => formatCurrency(val, currency)}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold">
                <button
                  onClick={() => setActiveDonutCat('IMPORT')}
                  className={`px-1.5 py-0.5 rounded-none cursor-pointer ${
                    activeDonutCat === 'IMPORT' ? 'bg-blue-600 text-white shadow-xs' : 'text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  ● IMP: 78.3%
                </button>
                <button
                  onClick={() => setActiveDonutCat('LOCAL')}
                  className={`px-1.5 py-0.5 rounded-none cursor-pointer ${
                    activeDonutCat === 'LOCAL' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  ● LOCAL: 21.7%
                </button>
              </div>
            </div>

            {/* Right Donut: Material Count */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] font-bold text-slate-700 mb-1">Material Count</span>
              <div className="h-36 w-full cursor-pointer">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={importLocalCountData}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={56}
                      paddingAngle={4}
                      dataKey="count"
                      onClick={(entry) => setActiveDonutCat(entry.name as 'IMPORT' | 'LOCAL')}
                    >
                      {importLocalCountData.map((entry) => (
                        <Cell
                          key={`cell-cnt-${entry.name}`}
                          fill={entry.color}
                          stroke={activeDonutCat === entry.name ? '#0f172a' : '#fff'}
                          strokeWidth={activeDonutCat === entry.name ? 3 : 1}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`${val} Materials`, 'Count']}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold">
                <button
                  onClick={() => setActiveDonutCat('IMPORT')}
                  className={`px-1.5 py-0.5 rounded-none cursor-pointer ${
                    activeDonutCat === 'IMPORT' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  ● IMP: 260
                </button>
                <button
                  onClick={() => setActiveDonutCat('LOCAL')}
                  className={`px-1.5 py-0.5 rounded-none cursor-pointer ${
                    activeDonutCat === 'LOCAL' ? 'bg-teal-600 text-white shadow-xs' : 'text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  ● LOCAL: 185
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Selected Details Callout */}
          <div className="mt-3 p-2.5 rounded-none-none bg-slate-900 text-white flex items-center justify-between text-xs border border-slate-800">
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="w-2.5 h-2.5 rounded-none-full flex-shrink-0"
                style={{ backgroundColor: selectedDonutInfo.color }}
              />
              <span className="font-extrabold uppercase tracking-wide text-sky-300 text-[11px] truncate">
                {selectedDonutInfo.name}
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[11px]">
              <span>
                <strong className="text-emerald-400">
                  {formatCurrency(
                    currency === 'PKR' ? selectedDonutInfo.valuePKR : selectedDonutInfo.valueUSD,
                    currency
                  )}
                </strong>{' '}
                ({selectedDonutInfo.pct}%)
              </span>
              <span className="text-slate-400">|</span>
              <span>
                <strong className="text-cyan-300">{selectedDonutInfo.count} Mat</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 6th: Pie Chart of Annual Buying Value & Percentage - Region Category wise */}
        <div className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-200">
                6th Chart
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                Annual Buying Value (%) by Region Category
              </h3>
              <p className="text-[11px] text-slate-500">
                Click any slice or region chip to view Category Name, Exact Value & %
              </p>
            </div>
            <button
              onClick={() =>
                openDetailModal({
                  title: 'Annual Buying Value by Region Category',
                  subtitle: 'Total PKR 3.92B Sourcing Value distributed by origin territories',
                  filterCriteria: 'Region Sourcing Origin Shares',
                  records: masterData,
                  datasetType: 'master',
                })
              }
              className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 hover:underline cursor-pointer"
            >
              Drilldown Records →
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between h-52 pt-1">
            {/* Pie Graphic */}
            <div className="h-44 w-full sm:w-1/2 cursor-pointer">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionSharePieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="valuePKR"
                    onClick={(entry) => setActivePieRegion(entry.name)}
                  >
                    {regionSharePieData.map((entry) => (
                      <Cell
                        key={`cell-reg-${entry.name}`}
                        fill={entry.color}
                        stroke={activePieRegion === entry.name ? '#0f172a' : '#fff'}
                        strokeWidth={activePieRegion === entry.name ? 3 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [
                      currency === 'PKR' ? `PKR ${val}M` : `$${(val / 280).toFixed(2)}M`,
                      'Annual Value',
                    ]}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Region Interactive Legend Chips */}
            <div className="w-full sm:w-1/2 grid grid-cols-2 gap-1 text-[10px] sm:text-[11px] pl-1">
              {regionSharePieData.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActivePieRegion(item.name)}
                  className={`flex items-center gap-1 p-1 rounded-none-none text-left transition-all cursor-pointer ${
                    activePieRegion === item.name
                      ? 'bg-slate-900 text-white font-bold ring-1 ring-slate-700'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-none-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate text-[10px]">{item.name}</span>
                  <span className={`text-[9px] ${activePieRegion === item.name ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                    ({item.pct}%)
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Selected Details Callout for 6th Chart */}
          <div className="mt-3 p-2.5 rounded-none-none bg-slate-900 text-white flex items-center justify-between text-xs border border-slate-800">
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="w-2.5 h-2.5 rounded-none-full flex-shrink-0"
                style={{ backgroundColor: selectedPieInfo.color }}
              />
              <span className="font-extrabold uppercase tracking-wide text-emerald-400 text-[11px] truncate">
                {selectedPieInfo.name}
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[11px]">
              <span>
                <strong className="text-amber-300">
                  {currency === 'PKR'
                    ? `PKR ${selectedPieInfo.valuePKR}M`
                    : `$${selectedPieInfo.valueUSD}M`}
                </strong>{' '}
                ({selectedPieInfo.pct}%)
              </span>
              <span className="text-slate-400">|</span>
              <span>
                <strong className="text-sky-300">{selectedPieInfo.materialCount} Mat</strong> ({selectedPieInfo.activeMfg} Mfgs)
              </span>
            </div>
          </div>
        </div>

        {/* 7th: Pie Chart of Annual Buying Value & Percentage - Material Class wise */}
        <div className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-none border border-purple-200">
                7th Chart
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                Annual Buying Value (%) by Material Class
              </h3>
              <p className="text-[11px] text-slate-500">
                Click any slice or class chip to view Category Name, Exact Value & %
              </p>
            </div>
            <button
              onClick={() =>
                openDetailModal({
                  title: `Material Class Analysis: ${selectedClassInfo.name}`,
                  subtitle: `Annual Value ${formatCurrency(currency === 'PKR' ? selectedClassInfo.valuePKR * 1000000 : selectedClassInfo.valueUSD * 1000000, currency)} (${selectedClassInfo.pct}%) • ${selectedClassInfo.materialCount} Materials`,
                  filterCriteria: `Material Class = ${selectedClassInfo.name}`,
                  records: masterData,
                  datasetType: 'master',
                })
              }
              className="text-[11px] font-bold text-purple-600 hover:text-purple-800 hover:underline cursor-pointer"
            >
              Drilldown Records →
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between h-52 pt-1">
            {/* Pie Graphic */}
            <div className="h-44 w-full sm:w-1/2 cursor-pointer">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={materialClassPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="valuePKR"
                    onClick={(entry) => setActivePieClass(entry.name)}
                  >
                    {materialClassPieData.map((entry) => (
                      <Cell
                        key={`cell-cls-${entry.name}`}
                        fill={entry.color}
                        stroke={activePieClass === entry.name ? '#0f172a' : '#fff'}
                        strokeWidth={activePieClass === entry.name ? 3 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [
                      currency === 'PKR' ? `PKR ${val}M` : `$${(val / 280).toFixed(2)}M`,
                      'Annual Value',
                    ]}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '0px', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Material Class Interactive Legend Chips */}
            <div className="w-full sm:w-1/2 grid grid-cols-2 gap-1 text-[10px] sm:text-[11px] pl-1">
              {materialClassPieData.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActivePieClass(item.name)}
                  className={`flex items-center gap-1 p-1 rounded-none-none text-left transition-all cursor-pointer ${
                    activePieClass === item.name
                      ? 'bg-slate-900 text-white font-bold ring-1 ring-slate-700'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-none-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate text-[10px]">{item.name}</span>
                  <span className={`text-[9px] ${activePieClass === item.name ? 'text-purple-300 font-bold' : 'text-slate-500'}`}>
                    ({item.pct}%)
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Selected Details Callout for 7th Chart */}
          <div className="mt-3 p-2.5 rounded-none-none bg-slate-900 text-white flex items-center justify-between text-xs border border-slate-800">
            <div className="flex items-center gap-1.5 truncate">
              <span
                className="w-2.5 h-2.5 rounded-none-full flex-shrink-0"
                style={{ backgroundColor: selectedClassInfo.color }}
              />
              <span className="font-extrabold uppercase tracking-wide text-purple-300 text-[11px] truncate">
                {selectedClassInfo.name}
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[11px]">
              <span>
                <strong className="text-amber-300">
                  {currency === 'PKR'
                    ? `PKR ${selectedClassInfo.valuePKR}M`
                    : `$${selectedClassInfo.valueUSD}M`}
                </strong>{' '}
                ({selectedClassInfo.pct}%)
              </span>
              <span className="text-slate-400">|</span>
              <span>
                <strong className="text-sky-300">{selectedClassInfo.materialCount} Mat</strong> ({selectedClassInfo.activeMfg} Mfgs)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
