import React from 'react';
import {
  GitBranch,
  Layers,
  ChevronDown,
  Building,
  ArrowDownRight,
  Maximize2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency, convertValue } from '../utils/currency';

export const TreeMaterialHierarchy: React.FC = () => {
  const { masterData, currency, openDetailModal } = useData();

  // Helper to filter master data and open detail modal
  const handleDrilldown = (title: string, subtitle: string, filterFn: (r: any) => boolean, criteria: string) => {
    const records = masterData.filter(filterFn);
    openDetailModal({
      title,
      subtitle,
      filterCriteria: criteria,
      records: records.length > 0 ? records : masterData.slice(0, 8),
      datasetType: 'master',
    });
  };

  return (
    <div id="tree-material-hierarchy" className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <GitBranch className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Material Hierarchy & Classification Tree
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive breakdown of <strong>445 Active Materials</strong> across Companies, Sourcing, and Classifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
            Click any node or cell to view raw working records
          </span>
        </div>
      </div>

      {/* Interactive Tree Graphic Container */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[860px] max-w-5xl mx-auto flex flex-col items-center select-none">
          
          {/* ========================================================= */}
          {/* LEVEL 1: ROOT NODE */}
          {/* ========================================================= */}
          <div
            onClick={() =>
              handleDrilldown(
                'Total Active Materials (All 445 Items)',
                'Complete active pharmaceutical portfolio for Jul 25 - Jun 26',
                () => true,
                'All Active Materials (445)'
              )
            }
            className="group cursor-pointer rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white px-8 py-3.5 shadow-lg shadow-blue-900/20 hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] border border-blue-700 text-center w-80 relative"
          >
            <div className="text-sm sm:text-base font-black tracking-wide">
              Total Active Material Count (445)
            </div>
            <div className="text-xs sm:text-sm font-bold text-blue-200 mt-0.5">
              Annual Buying Value ({currency === 'PKR' ? 'PKR 3.92B' : '$14.0M'})
            </div>
            <div className="text-[10px] text-blue-300 font-medium">(Jul 25-Jun 26)</div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
            </div>
          </div>

          {/* SVG Connector from Root to Level 2 (LAB and AHL) */}
          <div className="w-full flex justify-center -my-1">
            <svg className="w-full h-10 overflow-visible" viewBox="0 0 800 40">
              <path d="M 400 0 L 400 20 L 220 20 L 220 40" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
              <path d="M 400 20 L 580 20 L 580 40" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* LEVEL 2: COMPANY DIVISION (LAB vs AHL) */}
          {/* ========================================================= */}
          <div className="grid grid-cols-2 gap-16 sm:gap-24 w-full max-w-4xl px-4">
            
            {/* LAB BRANCH */}
            <div className="flex flex-col items-center">
              <div
                onClick={() =>
                  handleDrilldown(
                    'LAB Material Portfolio (351 Items)',
                    'Atco Laboratories main pharmaceutical manufacturing materials',
                    (r) => r.company === 'LAB',
                    'Company = LAB (351 items)'
                  )
                }
                className="group cursor-pointer rounded-xl bg-slate-800 text-white px-5 py-2.5 shadow-md hover:bg-slate-700 transition-all border border-slate-600 text-center w-52 hover:scale-[1.02]"
              >
                <div className="text-xs font-black uppercase tracking-wider text-blue-300">LAB Material</div>
                <div className="text-sm font-bold mt-0.5">Count (351)</div>
                <div className="text-[11px] text-slate-300 font-medium">
                  Value {currency === 'PKR' ? 'PKR 3.8 B' : '$13.57M'}
                </div>
              </div>

              {/* Sub Branches under LAB: Import (with API, EXP, PM) & Local */}
              <div className="w-full mt-3 grid grid-cols-2 gap-3 relative">
                {/* LAB Import */}
                <div
                  onClick={() =>
                    handleDrilldown(
                      'LAB - Import Buying Materials (221 Items)',
                      'Imported active substances, excipients, and primary packaging',
                      (r) => r.company === 'LAB' && r.sourcingType === 'IMP',
                      'Company = LAB, Sourcing = IMP'
                    )
                  }
                  className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer text-center"
                >
                  <div className="text-xs font-black text-blue-900">Import Buying Material</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">• Count (221)</div>
                  <div className="text-[11px] font-bold text-blue-700">
                    • Value {currency === 'PKR' ? 'PKR 3.01B' : '$10.76M'}
                  </div>

                  {/* 3 Stems for LAB Import: API, EXP, PM */}
                  <div className="mt-2 pt-2 border-t border-blue-200/80 space-y-1 text-left text-[10px]">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'LAB Import - API Materials (128 Items)',
                          'Active Pharmaceutical Ingredients for LAB',
                          (r) => r.company === 'LAB' && r.sourcingType === 'IMP' && r.categoryType === 'API',
                          'LAB > IMP > API'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-blue-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-blue-900">API Mat (128):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 2.23B' : '$7.97M'}</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'LAB Import - Excipients Materials (70 Items)',
                          'Excipients, binders, coatings, and fillers for LAB',
                          (r) => r.company === 'LAB' && r.sourcingType === 'IMP' && r.categoryType === 'EXP',
                          'LAB > IMP > EXP'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-blue-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-blue-900">EXP Mat (70):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 469.0M' : '$1.68M'}</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'LAB Import - Packaging Materials (23 Items)',
                          'Alu-Alu base foil and primary packaging for LAB',
                          (r) => r.company === 'LAB' && r.sourcingType === 'IMP' && r.categoryType === 'PM',
                          'LAB > IMP > PM'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-blue-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-blue-900">PM Mat (23):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 314.6M' : '$1.12M'}</span>
                    </div>
                  </div>
                </div>

                {/* LAB Local */}
                <div
                  onClick={() =>
                    handleDrilldown(
                      'LAB - Local Buying Materials (130 Items)',
                      'Locally procured raw materials, excipients, and active ingredients',
                      (r) => r.company === 'LAB' && (r.sourcingType === 'LOCAL' || r.originCategory === 'LOCAL'),
                      'Company = LAB, Sourcing = LOCAL'
                    )
                  }
                  className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer text-center"
                >
                  <div className="text-xs font-black text-blue-900">Local Buying Material</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">• Count (130)</div>
                  <div className="text-[11px] font-bold text-blue-700">
                    • Value {currency === 'PKR' ? 'PKR 785.7M' : '$2.81M'}
                  </div>

                  {/* 2 Stems for LAB Local: API, EXP */}
                  <div className="mt-2 pt-2 border-t border-blue-200/80 space-y-1 text-left text-[10px]">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'LAB Local - API Materials (8 Items)',
                          'Locally procured Active Pharmaceutical Ingredients for LAB',
                          (r) => r.company === 'LAB' && (r.sourcingType === 'LOCAL' || r.originCategory === 'LOCAL') && r.categoryType === 'API',
                          'LAB > LOCAL > API'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-blue-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-blue-900">API Mat (8):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 48.7M' : '$173.8K'}</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'LAB Local - Excipients Materials (122 Items)',
                          'Locally procured excipients, syrups, starches, and solvents for LAB',
                          (r) => r.company === 'LAB' && (r.sourcingType === 'LOCAL' || r.originCategory === 'LOCAL') && r.categoryType === 'EXP',
                          'LAB > LOCAL > EXP'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-blue-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-blue-900">EXP Mat (122):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 737.0M' : '$2.63M'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AHL BRANCH */}
            <div className="flex flex-col items-center">
              <div
                onClick={() =>
                  handleDrilldown(
                    'AHL Material Portfolio (94 Items)',
                    'Atco Healthcare (Nutraceuticals & Herbal) division materials',
                    (r) => r.company === 'AHL',
                    'Company = AHL (94 items)'
                  )
                }
                className="group cursor-pointer rounded-xl bg-slate-800 text-white px-5 py-2.5 shadow-md hover:bg-slate-700 transition-all border border-slate-600 text-center w-52 hover:scale-[1.02]"
              >
                <div className="text-xs font-black uppercase tracking-wider text-blue-300">AHL Material</div>
                <div className="text-sm font-bold mt-0.5">Count (94)</div>
                <div className="text-[11px] text-slate-300 font-medium">
                  Value {currency === 'PKR' ? 'PKR 119.3M' : '$425.9K'}
                </div>
              </div>

              {/* Sub Branches under AHL: Import (with API, EXP) & Local (with API, EXP) */}
              <div className="w-full mt-3 grid grid-cols-2 gap-3 relative">
                {/* AHL Import */}
                <div
                  onClick={() =>
                    handleDrilldown(
                      'AHL - Import Buying Materials (39 Items)',
                      'Nutra and herbal active imported substances and excipients',
                      (r) => r.company === 'AHL' && r.sourcingType === 'IMP',
                      'Company = AHL, Sourcing = IMP'
                    )
                  }
                  className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer text-center"
                >
                  <div className="text-xs font-black text-sky-900">Import Buying Material</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">• Count (39)</div>
                  <div className="text-[11px] font-bold text-sky-700">
                    • Value {currency === 'PKR' ? 'PKR 55.4M' : '$197.7K'}
                  </div>

                  {/* 2 Stems for AHL Import: API, EXP */}
                  <div className="mt-2 pt-2 border-t border-sky-200/80 space-y-1 text-left text-[10px]">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'AHL Import - API Materials (23 Items)',
                          'Nutra and Herbal Active Raw Materials for AHL',
                          (r) => r.company === 'AHL' && r.sourcingType === 'IMP' && r.categoryType === 'API',
                          'AHL > IMP > API'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-sky-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-sky-900">API Mat (23):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 42.2M' : '$150.8K'}</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'AHL Import - Excipients Materials (16 Items)',
                          'Excipients, flavors, and coatings for AHL',
                          (r) => r.company === 'AHL' && r.sourcingType === 'IMP' && r.categoryType === 'EXP',
                          'AHL > IMP > EXP'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-sky-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-sky-900">EXP Mat (16):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 13.1M' : '$46.9K'}</span>
                    </div>
                  </div>
                </div>

                {/* AHL Local */}
                <div
                  onClick={() =>
                    handleDrilldown(
                      'AHL - Local Buying Materials (55 Items)',
                      'Locally sourced herbs, syrups, vitamins, and local raw materials',
                      (r) => r.company === 'AHL' && (r.sourcingType === 'LOCAL' || r.originCategory === 'LOCAL'),
                      'Company = AHL, Sourcing = LOCAL'
                    )
                  }
                  className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer text-center"
                >
                  <div className="text-xs font-black text-sky-900">Local Buying Material</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">• Count (55)</div>
                  <div className="text-[11px] font-bold text-sky-700">
                    • Value {currency === 'PKR' ? 'PKR 63.9M' : '$228.2K'}
                  </div>

                  {/* 2 Stems for AHL Local: API, EXP */}
                  <div className="mt-2 pt-2 border-t border-sky-200/80 space-y-1 text-left text-[10px]">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'AHL Local - API Materials (14 Items)',
                          'Locally procured Active & Herbal Ingredients for AHL',
                          (r) => r.company === 'AHL' && (r.sourcingType === 'LOCAL' || r.originCategory === 'LOCAL') && r.categoryType === 'API',
                          'AHL > LOCAL > API'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-sky-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-sky-900">API Mat (14):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 36.7M' : '$131.2K'}</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDrilldown(
                          'AHL Local - Excipients Materials (41 Items)',
                          'Locally procured excipients, syrups, and binders for AHL',
                          (r) => r.company === 'AHL' && (r.sourcingType === 'LOCAL' || r.originCategory === 'LOCAL') && r.categoryType === 'EXP',
                          'AHL > LOCAL > EXP'
                        );
                      }}
                      className="p-1 rounded bg-white hover:bg-sky-100 font-medium text-slate-800 transition-colors flex justify-between"
                    >
                      <span className="font-bold text-sky-900">EXP Mat (41):</span>
                      <span className="font-bold text-slate-700">{currency === 'PKR' ? 'PKR 27.2M' : '$97.0K'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Connector from Companies down to Sourcing Classification Tables */}
          <div className="w-full flex justify-center my-2">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 900 30">
              <path d="M 220 0 L 220 15 L 450 15 L 450 30" fill="none" stroke="#93c5fd" strokeWidth="2" />
              <path d="M 680 0 L 680 15 L 450 15" fill="none" stroke="#93c5fd" strokeWidth="2" />
              <path d="M 150 15 L 150 30" fill="none" stroke="#93c5fd" strokeWidth="2" />
              <path d="M 750 15 L 750 30" fill="none" stroke="#93c5fd" strokeWidth="2" />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* LEVEL 3: 3 SOURCING PILLARS & THEIR CLASSIFICATION TABLES */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-1">
            
            {/* 1. FIXED SOURCE MATERIALS (161) */}
            <div className="bg-gradient-to-b from-blue-700 to-blue-800 rounded-2xl p-3.5 text-white shadow-md border border-blue-600 flex flex-col">
              <div
                onClick={() =>
                  handleDrilldown(
                    'Fixed Source Materials (161 Items)',
                    'Fixed, proprietary and principal-approved materials',
                    (r) => r.sourceType === 'Fixed Source',
                    'SourceType = Fixed Source (161)'
                  )
                }
                className="cursor-pointer bg-slate-900/60 p-2.5 rounded-xl text-center border border-blue-400/30 hover:bg-slate-900/80 transition-colors"
              >
                <div className="text-xs font-black tracking-wide text-blue-200">Fixed Source Materials</div>
                <div className="text-base font-black text-white">(161 Items)</div>
                <div className="text-[11px] font-bold text-blue-300">
                  Value ({currency === 'PKR' ? 'PKR 986.4M' : '$3.52M'})
                </div>
              </div>

              <div className="mt-3 text-[11px] font-extrabold uppercase text-blue-200 text-center pb-1 border-b border-blue-500/50">
                Material Classification against - Fixed Source
              </div>

              <div className="mt-2 space-y-1 text-[11px] overflow-hidden">
                <div className="grid grid-cols-12 font-bold text-blue-200 text-[10px] pb-1 border-b border-blue-500/30 px-1">
                  <span className="col-span-9">Material Class II Value II Active Mat Count</span>
                  <span className="col-span-3 text-right">UD Count</span>
                </div>

                {[
                  { name: '1) Ascard', valPKR: '378M', valUSD: '$1.35M', active: '14', ud: '08' },
                  { name: '2) Principle', valPKR: '192M', valUSD: '$685K', active: '03', ud: '0' },
                  { name: '3) Merck/Sigma/etc', valPKR: '176M', valUSD: '$628K', active: '45', ud: '18' },
                  { name: '4) Core Indian', valPKR: '133M', valUSD: '$475K', active: '19', ud: '12' },
                  { name: '5) Coating', valPKR: '40.5M', valUSD: '$144K', active: '27', ud: '0' },
                  { name: '6) Flavour etc', valPKR: '49M', valUSD: '$175K', active: '42', ud: '0' },
                  { name: '7) Core Origin', valPKR: '14M', valUSD: '$50K', active: '04', ud: '0' },
                  { name: '8) Color', valPKR: '2M', valUSD: '$7.1K', active: '17', ud: '0' },
                ].map((row, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      handleDrilldown(
                        `Fixed Source: ${row.name}`,
                        `Classification breakdown for ${row.name}`,
                        (r) => r.sourceType === 'Fixed Source',
                        `Fixed Source > ${row.name}`
                      )
                    }
                    className="grid grid-cols-12 py-1 px-1.5 rounded hover:bg-blue-600/60 cursor-pointer transition-colors text-white font-medium"
                  >
                    <span className="col-span-9 truncate">
                      {row.name} ({currency === 'PKR' ? `PKR ${row.valPKR}` : row.valUSD}) ({row.active})
                    </span>
                    <span className="col-span-3 text-right font-extrabold text-blue-200">
                      {row.ud}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. MULTI SOURCE MATERIALS (151) */}
            <div className="bg-gradient-to-b from-blue-700 to-blue-800 rounded-2xl p-3.5 text-white shadow-md border border-blue-600 flex flex-col">
              <div
                onClick={() =>
                  handleDrilldown(
                    'Multi Source Materials (151 Items)',
                    'Materials with multiple approved manufacturers and origins',
                    (r) => r.sourceType === 'Multi Source',
                    'SourceType = Multi Source (151)'
                  )
                }
                className="cursor-pointer bg-slate-900/60 p-2.5 rounded-xl text-center border border-blue-400/30 hover:bg-slate-900/80 transition-colors"
              >
                <div className="text-xs font-black tracking-wide text-blue-200">Multi Source Materials</div>
                <div className="text-base font-black text-white">(151 Items)</div>
                <div className="text-[11px] font-bold text-blue-300">
                  Value ({currency === 'PKR' ? 'PKR 1.88 B' : '$6.71M'})
                </div>
              </div>

              <div className="mt-3 text-[11px] font-extrabold uppercase text-blue-200 text-center pb-1 border-b border-blue-500/50">
                Material Classification against - Multi Source
              </div>

              <div className="mt-2 space-y-1 text-[11px] overflow-hidden">
                <div className="grid grid-cols-12 font-bold text-blue-200 text-[10px] pb-1 border-b border-blue-500/30 px-1">
                  <span className="col-span-9">Mat Class II Value II Active Mat Count</span>
                  <span className="col-span-3 text-right">UD Count</span>
                </div>

                {[
                  { name: '1) Project', valPKR: '970M', valUSD: '$3.46M', active: '17', ud: '11' },
                  { name: '2) Multi Source', valPKR: '686M', valUSD: '$2.45M', active: '87', ud: '23' },
                  { name: '3) Single Origin', valPKR: '177M', valUSD: '$632K', active: '43', ud: '13' },
                  { name: '4) Non-Indian', valPKR: '49M', valUSD: '$175K', active: '04', ud: '02' },
                ].map((row, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      handleDrilldown(
                        `Multi Source: ${row.name}`,
                        `Classification breakdown for ${row.name}`,
                        (r) => r.sourceType === 'Multi Source',
                        `Multi Source > ${row.name}`
                      )
                    }
                    className="grid grid-cols-12 py-1.5 px-1.5 rounded hover:bg-blue-600/60 cursor-pointer transition-colors text-white font-medium"
                  >
                    <span className="col-span-9 truncate">
                      {row.name} ({currency === 'PKR' ? `PKR ${row.valPKR}` : row.valUSD}) ({row.active})
                    </span>
                    <span className="col-span-3 text-right font-extrabold text-blue-200">
                      {row.ud}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. SINGLE SOURCE MATERIALS (133) */}
            <div className="bg-gradient-to-b from-blue-700 to-blue-800 rounded-2xl p-3.5 text-white shadow-md border border-blue-600 flex flex-col">
              <div
                onClick={() =>
                  handleDrilldown(
                    'Single Source Materials (133 Items)',
                    'High priority target materials having only 1 approved active source',
                    (r) => r.sourceType === 'Single Source',
                    'SourceType = Single Source (133)'
                  )
                }
                className="cursor-pointer bg-slate-900/60 p-2.5 rounded-xl text-center border border-blue-400/30 hover:bg-slate-900/80 transition-colors"
              >
                <div className="text-xs font-black tracking-wide text-blue-200">Single Source Materials</div>
                <div className="text-base font-black text-white">(133 Items)</div>
                <div className="text-[11px] font-bold text-blue-300">
                  Value ({currency === 'PKR' ? 'PKR 1.05B' : '$3.75M'})
                </div>
              </div>

              <div className="mt-3 text-[11px] font-extrabold uppercase text-blue-200 text-center pb-1 border-b border-blue-500/50">
                Material Classification against - Single Source
              </div>

              <div className="mt-2 space-y-1 text-[11px] overflow-hidden">
                <div className="grid grid-cols-12 font-bold text-blue-200 text-[10px] pb-1 border-b border-blue-500/30 px-1">
                  <span className="col-span-9">Material Class II Value II Active Mat Count</span>
                  <span className="col-span-3 text-right">UD Count</span>
                </div>

                {[
                  { name: '1) Single Source', valPKR: '622M', valUSD: '$2.22M', active: '111', ud: '28' },
                  { name: '2) Project', valPKR: '373M', valUSD: '$1.33M', active: '05', ud: '04' },
                  { name: '3) Non Indian', valPKR: '53M', valUSD: '$189K', active: '15', ud: '06' },
                  { name: '4) Pellets/Indian', valPKR: '2M', valUSD: '$7.1K', active: '02', ud: '02' },
                ].map((row, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      handleDrilldown(
                        `Single Source: ${row.name}`,
                        `Classification breakdown for ${row.name}`,
                        (r) => r.sourceType === 'Single Source',
                        `Single Source > ${row.name}`
                      )
                    }
                    className="grid grid-cols-12 py-1.5 px-1.5 rounded hover:bg-blue-600/60 cursor-pointer transition-colors text-white font-medium"
                  >
                    <span className="col-span-9 truncate">
                      {row.name} ({currency === 'PKR' ? `PKR ${row.valPKR}` : row.valUSD}) ({row.active})
                    </span>
                    <span className="col-span-3 text-right font-extrabold text-blue-200">
                      {row.ud}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
