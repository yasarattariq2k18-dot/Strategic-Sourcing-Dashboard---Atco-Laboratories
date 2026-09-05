import React, { useState, useMemo } from 'react';
import {
  Filter,
  Search,
  ChevronRight,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency, convertValue } from '../utils/currency';

export const ExecutiveMatrixTables: React.FC = () => {
  const { currency, openDetailModal, masterData } = useData();

  // Multi-dimensional Slicers State
  const [selectedCompany, setSelectedCompany] = useState<'ALL' | 'LAB' | 'AHL'>('ALL');
  const [selectedClass, setSelectedClass] = useState<'ALL' | 'API' | 'EXP' | 'PM'>('ALL');
  const [selectedSingleMulti, setSelectedSingleMulti] = useState<'ALL' | 'Single Source' | 'Multi Source'>('ALL');
  const [selectedPillar, setSelectedPillar] = useState<'ALL' | 'Fixed Source' | 'Multi Source' | 'Single Source'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expand / collapse states for Table 1 hierarchical tree rows
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'LAB': true,
    'LAB-IMPORT': true,
    'LAB-LOCAL': true,
    'AHL': true,
    'AHL-LOCAL': true,
    'AHL-IMPORT': true,
  });

  const toggleNode = (nodeKey: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeKey]: !prev[nodeKey],
    }));
  };

  const resetSlicers = () => {
    setSelectedCompany('ALL');
    setSelectedClass('ALL');
    setSelectedSingleMulti('ALL');
    setSelectedPillar('ALL');
    setSearchQuery('');
  };

  // Base definitions for Table 1 (Company -> Sourcing -> Category)
  // Note: LAB Other/Blank EXP has been cleanly adjusted and merged into LAB Local EXP per user mandate
  const baseCompanyHierarchy = useMemo(() => [
    {
      id: 'LAB',
      name: 'LAB (Atco Laboratories)',
      company: 'LAB',
      subGroups: [
        {
          id: 'LAB-IMPORT',
          name: 'IMPORT',
          sourcingType: 'IMP',
          items: [
            {
              id: 'LAB-IMP-API',
              class: 'API',
              sourcingType: 'IMP',
              activeMat: 128,
              activeMfg: 223,
              valuePKR: 2230445280.21,
              singleMat: 75,
              singleMfg: 75,
              singleVal: 1307135906.37,
              multiMat: 53,
              multiMfg: 148,
              multiVal: 923309373.84,
              pillar: 'Multi Source',
            },
            {
              id: 'LAB-IMP-EXP',
              class: 'EXP',
              sourcingType: 'IMP',
              activeMat: 70,
              activeMfg: 109,
              valuePKR: 469020446.51,
              singleMat: 42,
              singleMfg: 42,
              singleVal: 281412267.91,
              multiMat: 28,
              multiMfg: 67,
              multiVal: 187608178.60,
              pillar: 'Fixed Source',
            },
            {
              id: 'LAB-IMP-PM',
              class: 'PM',
              sourcingType: 'IMP',
              activeMat: 23,
              activeMfg: 34,
              valuePKR: 314571251.52,
              singleMat: 14,
              singleMfg: 14,
              singleVal: 191434718.31,
              multiMat: 9,
              multiMfg: 20,
              multiVal: 123136533.21,
              pillar: 'Single Source',
            },
          ],
        },
        {
          id: 'LAB-LOCAL',
          name: 'LOCAL',
          sourcingType: 'LOCAL',
          items: [
            {
              id: 'LAB-LOC-EXP',
              class: 'EXP',
              sourcingType: 'LOCAL',
              activeMat: 122,
              activeMfg: 183,
              valuePKR: 737015521.19,
              singleMat: 79,
              singleMfg: 79,
              singleVal: 477435848.45,
              multiMat: 43,
              multiMfg: 104,
              multiVal: 259579672.74,
              pillar: 'Fixed Source',
            },
            {
              id: 'LAB-LOC-API',
              class: 'API',
              sourcingType: 'LOCAL',
              activeMat: 8,
              activeMfg: 10,
              valuePKR: 48659900.00,
              singleMat: 6,
              singleMfg: 6,
              singleVal: 36494925.00,
              multiMat: 2,
              multiMfg: 4,
              multiVal: 12164975.00,
              pillar: 'Single Source',
            },
          ],
        },
      ],
    },
    {
      id: 'AHL',
      name: 'AHL (Atco Health Care Limited)',
      company: 'AHL',
      subGroups: [
        {
          id: 'AHL-LOCAL',
          name: 'LOCAL',
          sourcingType: 'LOCAL',
          items: [
            {
              id: 'AHL-LOC-API',
              class: 'API',
              sourcingType: 'LOCAL',
              activeMat: 14,
              activeMfg: 33,
              valuePKR: 36734293.02,
              singleMat: 8,
              singleMfg: 8,
              singleVal: 20991024.58,
              multiMat: 6,
              multiMfg: 25,
              multiVal: 15743268.44,
              pillar: 'Single Source',
            },
            {
              id: 'AHL-LOC-EXP',
              class: 'EXP',
              sourcingType: 'LOCAL',
              activeMat: 41,
              activeMfg: 73,
              valuePKR: 27157516.45,
              singleMat: 26,
              singleMfg: 26,
              singleVal: 17220556.81,
              multiMat: 15,
              multiMfg: 47,
              multiVal: 9936959.64,
              pillar: 'Fixed Source',
            },
          ],
        },
        {
          id: 'AHL-IMPORT',
          name: 'IMPORT',
          sourcingType: 'IMP',
          items: [
            {
              id: 'AHL-IMP-API',
              class: 'API',
              sourcingType: 'IMP',
              activeMat: 23,
              activeMfg: 38,
              valuePKR: 42214580.28,
              singleMat: 14,
              singleMfg: 14,
              singleVal: 25695831.04,
              multiMat: 9,
              multiMfg: 24,
              multiVal: 16518749.24,
              pillar: 'Multi Source',
            },
            {
              id: 'AHL-IMP-EXP',
              class: 'EXP',
              sourcingType: 'IMP',
              activeMat: 16,
              activeMfg: 25,
              valuePKR: 13144647.00,
              singleMat: 10,
              singleMfg: 10,
              singleVal: 8215404.38,
              multiMat: 6,
              multiMfg: 15,
              multiVal: 4929242.62,
              pillar: 'Fixed Source',
            },
          ],
        },
      ],
    },
  ], []);

  // Filtered Table 1 hierarchical structure
  const filteredCompanyGroups = useMemo(() => {
    return baseCompanyHierarchy
      .filter((comp) => selectedCompany === 'ALL' || comp.id === selectedCompany)
      .map((comp) => {
        const filteredSubGroups = comp.subGroups
          .map((sub) => {
            const filteredItems = sub.items
              .filter((item) => {
                // Filter by API/EXP/PM
                if (selectedClass !== 'ALL' && item.class !== selectedClass) return false;

                // Filter by Single/Multi
                if (selectedSingleMulti === 'Single Source' && item.singleMat === 0) return false;
                if (selectedSingleMulti === 'Multi Source' && item.multiMat === 0) return false;

                // Filter by Pillar
                if (selectedPillar !== 'ALL' && item.pillar !== selectedPillar) return false;

                // Filter by Search
                if (searchQuery.trim()) {
                  const q = searchQuery.toLowerCase();
                  const matches =
                    item.class.toLowerCase().includes(q) ||
                    sub.name.toLowerCase().includes(q) ||
                    comp.name.toLowerCase().includes(q);
                  if (!matches) return false;
                }

                return true;
              })
              .map((item) => {
                let mat = item.activeMat;
                let mfg = item.activeMfg;
                let val = item.valuePKR;

                if (selectedSingleMulti === 'Single Source') {
                  mat = item.singleMat;
                  mfg = item.singleMfg; // Single source: exactly 1 mfg per material
                  val = item.singleVal;
                } else if (selectedSingleMulti === 'Multi Source') {
                  mat = item.multiMat;
                  mfg = item.multiMfg;
                  val = item.multiVal;
                }

                return {
                  ...item,
                  activeMat: mat,
                  activeMfg: mfg,
                  valuePKR: val,
                };
              });

            const subActiveMat = filteredItems.reduce((sum, it) => sum + it.activeMat, 0);
            const subActiveMfg = filteredItems.reduce((sum, it) => sum + it.activeMfg, 0);
            const subValuePKR = filteredItems.reduce((sum, it) => sum + it.valuePKR, 0);

            return {
              ...sub,
              activeMat: subActiveMat,
              activeMfg: subActiveMfg,
              valuePKR: subValuePKR,
              items: filteredItems,
            };
          })
          .filter((sub) => sub.items.length > 0);

        const compActiveMat = filteredSubGroups.reduce((sum, sub) => sum + sub.activeMat, 0);
        const compActiveMfg = filteredSubGroups.reduce((sum, sub) => sum + sub.activeMfg, 0);
        const compValuePKR = filteredSubGroups.reduce((sum, sub) => sum + sub.valuePKR, 0);

        return {
          ...comp,
          activeMat: compActiveMat,
          activeMfg: compActiveMfg,
          valuePKR: compValuePKR,
          subGroups: filteredSubGroups,
        };
      })
      .filter((comp) => comp.subGroups.length > 0);
  }, [baseCompanyHierarchy, selectedCompany, selectedClass, selectedSingleMulti, selectedPillar, searchQuery]);

  // Base definitions for Table 2 (Region Categories)
  const baseRegionCategoryData = useMemo(() => [
    {
      region: 'INDIA',
      category: 'API',
      pillar: 'Multi Source',
      activeMat: 87,
      activeMfg: 52,
      underDevMat: 34,
      underDevMfg: 52,
      nonDevDiff: 53,
      valuePKR: 1278180000.00,
      singleMat: 45,
      singleMfg: 45,
      singleVal: 661127586.21,
      multiMat: 42,
      multiMfg: 84,
      multiVal: 617052413.79,
    },
    {
      region: 'CHINA',
      category: 'API',
      pillar: 'Multi Source',
      activeMat: 153,
      activeMfg: 68,
      underDevMat: 48,
      underDevMfg: 68,
      nonDevDiff: 105,
      valuePKR: 1242800000.00,
      singleMat: 82,
      singleMfg: 82,
      singleVal: 666060130.72,
      multiMat: 71,
      multiMfg: 142,
      multiVal: 576739869.28,
    },
    {
      region: 'EUROPE',
      category: 'API',
      pillar: 'Multi Source',
      activeMat: 63,
      activeMfg: 24,
      underDevMat: 18,
      underDevMfg: 24,
      nonDevDiff: 45,
      valuePKR: 699720000.00,
      singleMat: 35,
      singleMfg: 35,
      singleVal: 388733333.33,
      multiMat: 28,
      multiMfg: 56,
      multiVal: 310986666.67,
    },
    {
      region: 'ASIA',
      category: 'EXP',
      pillar: 'Fixed Source',
      activeMat: 54,
      activeMfg: 13,
      underDevMat: 10,
      underDevMfg: 13,
      nonDevDiff: 44,
      valuePKR: 350862588.39,
      singleMat: 30,
      singleMfg: 30,
      singleVal: 194923660.22,
      multiMat: 24,
      multiMfg: 48,
      multiVal: 155938928.17,
    },
    {
      region: 'LOCAL',
      category: 'EXP',
      pillar: 'Fixed Source',
      activeMat: 48,
      activeMfg: 6,
      underDevMat: 6,
      underDevMfg: 6,
      nonDevDiff: 42,
      valuePKR: 221700993.29,
      singleMat: 28,
      singleMfg: 28,
      singleVal: 129325579.42,
      multiMat: 20,
      multiMfg: 40,
      multiVal: 92375413.87,
    },
    {
      region: 'AMERICA',
      category: 'API',
      pillar: 'Single Source',
      activeMat: 17,
      activeMfg: 8,
      underDevMat: 6,
      underDevMfg: 8,
      nonDevDiff: 11,
      valuePKR: 81605934.49,
      singleMat: 11,
      singleMfg: 11,
      singleVal: 52803839.96,
      multiMat: 6,
      multiMfg: 12,
      multiVal: 28802094.53,
    },
    {
      region: 'MIDDLE',
      category: 'API',
      pillar: 'Single Source',
      activeMat: 6,
      activeMfg: 3,
      underDevMat: 1,
      underDevMfg: 3,
      nonDevDiff: 5,
      valuePKR: 41261070.00,
      singleMat: 4,
      singleMfg: 4,
      singleVal: 27507380.00,
      multiMat: 2,
      multiMfg: 4,
      multiVal: 13753690.00,
    },
    {
      region: 'OTHER',
      category: 'EXP',
      pillar: 'Fixed Source',
      activeMat: 17,
      activeMfg: 6,
      underDevMat: 5,
      underDevMfg: 6,
      nonDevDiff: 12,
      valuePKR: 2832850.00,
      singleMat: 12,
      singleMfg: 12,
      singleVal: 1999658.82,
      multiMat: 5,
      multiMfg: 10,
      multiVal: 833191.18,
    },
  ], []);

  // Filtered Table 2 rows
  const filteredRegionRows = useMemo(() => {
    return baseRegionCategoryData.filter((r) => {
      // Filter by Category API/EXP/PM
      if (selectedClass !== 'ALL') {
        if (selectedClass === 'API' && r.category !== 'API') return false;
        if (selectedClass === 'EXP' && r.category !== 'EXP') return false;
        if (selectedClass === 'PM') return false;
      }
      // Filter by Single/Multi
      if (selectedSingleMulti === 'Single Source' && r.singleMat === 0) return false;
      if (selectedSingleMulti === 'Multi Source' && r.multiMat === 0) return false;

      // Filter by Pillar
      if (selectedPillar !== 'ALL' && r.pillar !== selectedPillar) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!r.region.toLowerCase().includes(q)) return false;
      }
      return true;
    }).map((r) => {
      let mat = r.activeMat;
      let udMat = r.underDevMat;
      let udMfg = r.underDevMfg;
      let val = r.valuePKR;

      if (selectedSingleMulti === 'Single Source') {
        mat = r.singleMat;
        udMat = Math.round((r.underDevMat * r.singleMat) / (r.activeMat || 1));
        udMfg = udMat; // Single source: mfg count equals mat count
        val = r.singleVal;
      } else if (selectedSingleMulti === 'Multi Source') {
        mat = r.multiMat;
        udMat = Math.round((r.underDevMat * r.multiMat) / (r.activeMat || 1));
        udMfg = Math.max(udMat, Math.round((r.underDevMfg * r.multiMat) / (r.activeMat || 1)));
        val = r.multiVal;
      }

      return {
        ...r,
        activeMat: mat,
        underDevMat: udMat,
        underDevMfg: udMfg,
        nonDevDiff: Math.max(0, mat - udMat),
        valuePKR: val,
      };
    });
  }, [baseRegionCategoryData, selectedClass, selectedSingleMulti, selectedPillar, searchQuery]);

  // Base definitions for Table 3 (Material Classifications)
  const baseMaterialClassData = useMemo(() => [
    { classification: 'PROJECT', category: 'API', pillar: 'Multi Source', activeMat: 22, underDevMat: 15, underDevMfg: 21, nonDevDiff: 7, valuePKR: 1343433439.46, singleMat: 8, singleVal: 488521250.71, multiMat: 14, multiVal: 854912188.75 },
    { classification: 'MULTI SOURCE', category: 'API', pillar: 'Multi Source', activeMat: 87, underDevMat: 23, underDevMfg: 32, nonDevDiff: 64, valuePKR: 686228426.19, singleMat: 0, singleVal: 0, multiMat: 87, multiVal: 686228426.19 },
    { classification: 'SINGLE SOURCE', category: 'API', pillar: 'Single Source', activeMat: 111, underDevMat: 38, underDevMfg: 54, nonDevDiff: 73, valuePKR: 622660000.00, singleMat: 111, singleVal: 622660000.00, multiMat: 0, multiVal: 0 },
    { classification: 'ASCARD', category: 'API', pillar: 'Fixed Source', activeMat: 14, underDevMat: 4, underDevMfg: 6, nonDevDiff: 10, valuePKR: 378090000.00, singleMat: 9, singleVal: 243057857.14, multiMat: 5, multiVal: 135032142.86 },
    { classification: 'PRINCIPLE', category: 'API', pillar: 'Fixed Source', activeMat: 3, underDevMat: 0, underDevMfg: 0, nonDevDiff: 3, valuePKR: 192980000.00, singleMat: 3, singleVal: 192980000.00, multiMat: 0, multiVal: 0 },
    { classification: 'SINGLE ORIGIN', category: 'EXP', pillar: 'Single Source', activeMat: 43, underDevMat: 14, underDevMfg: 19, nonDevDiff: 29, valuePKR: 177340000.00, singleMat: 43, singleVal: 177340000.00, multiMat: 0, multiVal: 0 },
    { classification: 'MERCK / SIGMA', category: 'EXP', pillar: 'Fixed Source', activeMat: 45, underDevMat: 6, underDevMfg: 8, nonDevDiff: 39, valuePKR: 176540000.00, singleMat: 32, singleVal: 125539555.56, multiMat: 13, multiVal: 51000444.44 },
    { classification: 'CORE INDIAN', category: 'API', pillar: 'Multi Source', activeMat: 19, underDevMat: 8, underDevMfg: 12, nonDevDiff: 11, valuePKR: 133060000.00, singleMat: 6, singleVal: 42018947.37, multiMat: 13, multiVal: 91041052.63 },
    { classification: 'COATING', category: 'EXP', pillar: 'Fixed Source', activeMat: 27, underDevMat: 7, underDevMfg: 9, nonDevDiff: 20, valuePKR: 94200000.00, singleMat: 18, singleVal: 62800000.00, multiMat: 9, multiVal: 31400000.00 },
    { classification: 'FLAVOR', category: 'EXP', pillar: 'Fixed Source', activeMat: 42, underDevMat: 5, underDevMfg: 7, nonDevDiff: 37, valuePKR: 76500000.00, singleMat: 30, singleVal: 54642857.14, multiMat: 12, multiVal: 21857142.86 },
    { classification: 'NON-INDIAN', category: 'API', pillar: 'Multi Source', activeMat: 19, underDevMat: 5, underDevMfg: 8, nonDevDiff: 14, valuePKR: 65400000.00, singleMat: 8, singleVal: 27536842.11, multiMat: 11, multiVal: 37863157.89 },
    { classification: 'COLOR', category: 'EXP', pillar: 'Fixed Source', activeMat: 17, underDevMat: 2, underDevMfg: 3, nonDevDiff: 15, valuePKR: 32100000.00, singleMat: 11, singleVal: 20770588.24, multiMat: 6, multiVal: 11329411.76 },
    { classification: 'CORE ORIGIN', category: 'EXP', pillar: 'Single Source', activeMat: 4, underDevMat: 1, underDevMfg: 1, nonDevDiff: 3, valuePKR: 18200000.00, singleMat: 4, singleVal: 18200000.00, multiMat: 0, multiVal: 0 },
    { classification: 'PELLETS / INDIAN', category: 'API', pillar: 'Fixed Source', activeMat: 2, underDevMat: 0, underDevMfg: 0, nonDevDiff: 2, valuePKR: 8630000.00, singleMat: 2, singleVal: 8630000.00, multiMat: 0, multiVal: 0 },
  ], []);

  // Filtered Table 3 rows
  const filteredClassRows = useMemo(() => {
    return baseMaterialClassData.filter((c) => {
      // Filter by Category API/EXP/PM
      if (selectedClass !== 'ALL') {
        if (selectedClass === 'API' && c.category !== 'API') return false;
        if (selectedClass === 'EXP' && c.category !== 'EXP') return false;
        if (selectedClass === 'PM') return false;
      }

      // Filter by Single/Multi
      if (selectedSingleMulti === 'Single Source' && c.singleMat === 0) return false;
      if (selectedSingleMulti === 'Multi Source' && c.multiMat === 0) return false;

      // Filter by Pillar
      if (selectedPillar !== 'ALL' && c.pillar !== selectedPillar) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!c.classification.toLowerCase().includes(q)) return false;
      }
      return true;
    }).map((c) => {
      let mat = c.activeMat;
      let udMat = c.underDevMat;
      let udMfg = c.underDevMfg;
      let val = c.valuePKR;

      if (selectedSingleMulti === 'Single Source') {
        mat = c.singleMat;
        udMat = Math.round((c.underDevMat * c.singleMat) / (c.activeMat || 1));
        udMfg = udMat;
        val = c.singleVal;
      } else if (selectedSingleMulti === 'Multi Source') {
        mat = c.multiMat;
        udMat = Math.round((c.underDevMat * c.multiMat) / (c.activeMat || 1));
        udMfg = Math.max(udMat, Math.round((c.underDevMfg * c.multiMat) / (c.activeMat || 1)));
        val = c.multiVal;
      }

      return {
        ...c,
        activeMat: mat,
        underDevMat: udMat,
        underDevMfg: udMfg,
        nonDevDiff: Math.max(0, mat - udMat),
        valuePKR: val,
      };
    });
  }, [baseMaterialClassData, selectedClass, selectedSingleMulti, selectedPillar, searchQuery]);

  // Grand Totals recalculated dynamically from Table 1 filtered groups
  const grandTotal = useMemo(() => {
    let mat = 0;
    let mfg = 0;
    let val = 0;
    filteredCompanyGroups.forEach((comp) => {
      mat += comp.activeMat;
      mfg += comp.activeMfg;
      val += comp.valuePKR;
    });

    const udMat = filteredRegionRows.reduce((sum, r) => sum + r.underDevMat, 0);
    const udMfg = filteredRegionRows.reduce((sum, r) => sum + r.underDevMfg, 0);

    return {
      activeMat: mat,
      activeMfg: mfg,
      underDevMat: udMat,
      underDevMfg: udMfg,
      nonDevDiff: Math.max(0, mat - udMat),
      valuePKR: val,
    };
  }, [filteredCompanyGroups, filteredRegionRows]);

  const handleRowClick = (title: string, subtitle: string, filterCriteria: string) => {
    openDetailModal({
      title,
      subtitle,
      filterCriteria,
      records: masterData,
      datasetType: 'master',
    });
  };

  const isFilterActive =
    selectedCompany !== 'ALL' ||
    selectedClass !== 'ALL' ||
    selectedSingleMulti !== 'ALL' ||
    selectedPillar !== 'ALL' ||
    searchQuery.trim() !== '';

  return (
    <div id="executive-matrix-tables" className="space-y-6">
      {/* ========================================================= */}
      {/* MULTI-DIMENSIONAL SLICERS BAR (TOP OF TABLES) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-none-none p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-none-none bg-blue-50 text-blue-700 border border-blue-200">
              <Filter className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Executive Slicers & 3-Tier Cross-Matrix Tables
                </h2>
                {isFilterActive && (
                  <span className="px-2 py-0.5 rounded-none-full bg-blue-100 text-blue-800 text-[10px] font-extrabold animate-pulse">
                    Active Filters
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Filter and inspect Company (LAB/AHL), Category (API/EXP/PM), Single/Multi, and Fixed Pillars
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Box */}
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search matrix rows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-none-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            {/* Reset Filter Button */}
            {isFilterActive && (
              <button
                onClick={resetSlicers}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-none-none bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer"
                title="Reset all slicers"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Interactive Slicer Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Slicer 1: Company (LAB & AHL) */}
          <div className="bg-slate-50/70 p-2.5 rounded-none-none border border-slate-200">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
              Company Slicer
            </span>
            <div className="flex items-center gap-1">
              {(['ALL', 'LAB', 'AHL'] as const).map((comp) => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompany(comp)}
                  className={`flex-1 py-1 px-2 rounded-none-none text-xs font-black transition-all cursor-pointer ${
                    selectedCompany === comp
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          {/* Slicer 2: Material Category (API, EXP, PM) */}
          <div className="bg-slate-50/70 p-2.5 rounded-none-none border border-slate-200">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
              API / EXP / PM Slicer
            </span>
            <div className="flex items-center gap-1">
              {(['ALL', 'API', 'EXP', 'PM'] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`flex-1 py-1 px-1.5 rounded-none-none text-xs font-black transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Slicer 3: Single & Multi Source */}
          <div className="bg-slate-50/70 p-2.5 rounded-none-none border border-slate-200">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
              Single & Multi Source
            </span>
            <div className="flex items-center gap-1">
              {(['ALL', 'Single Source', 'Multi Source'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedSingleMulti(mode)}
                  className={`flex-1 py-1 px-2 rounded-none-none text-xs font-black transition-all cursor-pointer ${
                    selectedSingleMulti === mode
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {mode === 'ALL' ? 'ALL' : mode.replace(' Source', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Slicer 4: Fixed / Multi / Single Pillar */}
          <div className="bg-slate-50/70 p-2.5 rounded-none-none border border-slate-200">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
              Fixed / Multi / Single Pillar
            </span>
            <div className="flex items-center gap-1">
              {(['ALL', 'Fixed Source', 'Multi Source', 'Single Source'] as const).map((pillar) => (
                <button
                  key={pillar}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`flex-1 py-1 px-1.5 rounded-none-none text-xs font-black transition-all cursor-pointer ${
                    selectedPillar === pillar
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {pillar === 'ALL' ? 'ALL' : pillar.replace(' Source', '')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 7th MATRIX TABLE: ACTIVE AVL & ANNUAL BUYING MATRIX */}
      {/* ========================================================= */}
      <div className="bg-white rounded-none-none border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-950 px-2 py-0.5 rounded-none border border-sky-800">
              7th Matrix
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold">
                Active AVL & Annual Buying Matrix (Jul 25 - Jun 26)
              </h3>
              <p className="text-[11px] text-slate-300">
                Company LAB & AHL segregated into Import/Local and API, EXP, PM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="font-semibold text-sky-200">
              Filtered: {selectedCompany} • {selectedClass} • {selectedSingleMulti === 'ALL' ? 'Single/Multi ALL' : selectedSingleMulti} • {selectedPillar === 'ALL' ? 'Pillars ALL' : selectedPillar}
            </span>
          </div>
        </div>

        {/* Hierarchical Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-1/2">Company / Sourcing Hierarchy</th>
                <th className="py-3 px-4 text-center">Active Material Count</th>
                <th className="py-3 px-4 text-center">Active Mfg Count</th>
                <th className="py-3 px-4 text-right">
                  12M Annual Value ({currency}) Jul 2025 to Jun 2026
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCompanyGroups.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">
                    No matching records found for the selected slicers and search query.
                  </td>
                </tr>
              ) : (
                filteredCompanyGroups.map((comp) => {
                  const isCompExpanded = expandedNodes[comp.id] ?? true;
                  return (
                    <React.Fragment key={comp.id}>
                      {/* LEVEL 1: COMPANY ROW (e.g. LAB, AHL) */}
                      <tr
                        onClick={() => toggleNode(comp.id)}
                        className="bg-slate-50/90 hover:bg-slate-100/90 cursor-pointer font-bold transition-colors select-none"
                      >
                        <td className="py-3 px-4 flex items-center gap-2">
                          <span className="text-slate-500">
                            {isCompExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </span>
                          <span className="text-blue-900 font-extrabold text-xs sm:text-sm">
                            {comp.name}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-black text-slate-900">
                          {comp.activeMat}
                        </td>
                        <td className="py-3 px-4 text-center font-black text-slate-900">
                          {comp.activeMfg}
                        </td>
                        <td className="py-3 px-4 text-right font-black text-blue-900">
                          {formatCurrency(convertValue(comp.valuePKR, 'PKR', currency), currency)}
                        </td>
                      </tr>

                      {/* LEVEL 2 & 3 SUBGROUPS */}
                      {isCompExpanded &&
                        comp.subGroups.map((sub) => {
                          const isSubExpanded = expandedNodes[sub.id] ?? true;
                          return (
                            <React.Fragment key={sub.id}>
                              {/* LEVEL 2: SOURCING TYPE (IMPORT / LOCAL) */}
                              <tr
                                onClick={() => toggleNode(sub.id)}
                                className="bg-slate-50/40 hover:bg-blue-50/40 cursor-pointer transition-colors select-none"
                              >
                                <td className="py-2 px-4 pl-10 flex items-center gap-2 font-bold text-slate-800">
                                  <span className="text-slate-400">
                                    {isSubExpanded ? (
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    ) : (
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    )}
                                  </span>
                                  <span
                                    className={`px-1.5 py-0.5 rounded-none text-[10px] font-black ${
                                      sub.name === 'IMPORT'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                  >
                                    {sub.name}
                                  </span>
                                </td>
                                <td className="py-2 px-4 text-center font-bold text-slate-700">
                                  {sub.activeMat}
                                </td>
                                <td className="py-2 px-4 text-center font-bold text-slate-700">
                                  {sub.activeMfg}
                                </td>
                                <td className="py-2 px-4 text-right font-bold text-slate-900">
                                  {formatCurrency(convertValue(sub.valuePKR, 'PKR', currency), currency)}
                                </td>
                              </tr>

                              {/* LEVEL 3: CATEGORY LEAF ROWS (API / EXP / PM) */}
                              {isSubExpanded &&
                                sub.items.map((item) => (
                                  <tr
                                    key={item.id}
                                    onClick={() =>
                                      handleRowClick(
                                        `${comp.name} > ${sub.name} > ${item.class}`,
                                        `Active Materials in Category ${item.class}`,
                                        `${comp.company} | ${sub.sourcingType} | ${item.class}`
                                      )
                                    }
                                    className="hover:bg-blue-50/70 cursor-pointer transition-colors group"
                                  >
                                    <td className="py-2 px-4 pl-16 flex items-center gap-2 font-medium text-slate-700 group-hover:text-blue-700">
                                      <span className="w-1.5 h-1.5 rounded-none-full bg-slate-300 group-hover:bg-blue-600" />
                                      <span>
                                        {item.class === 'API'
                                          ? 'API (Active Pharmaceutical Ingredients)'
                                          : item.class === 'EXP'
                                          ? 'EXP (Excipients & Flavors)'
                                          : 'PM (Primary / Secondary Packaging Material)'}
                                      </span>
                                      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[10px] text-blue-600 font-bold">
                                        (view records)
                                      </span>
                                    </td>
                                    <td className="py-2 px-4 text-center font-medium text-slate-600">
                                      {item.activeMat}
                                    </td>
                                    <td className="py-2 px-4 text-center font-medium text-slate-600">
                                      {item.activeMfg}
                                    </td>
                                    <td className="py-2 px-4 text-right font-semibold text-slate-800 group-hover:text-blue-700">
                                      {formatCurrency(convertValue(item.valuePKR, 'PKR', currency), currency)}
                                    </td>
                                  </tr>
                                ))}
                            </React.Fragment>
                          );
                        })}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>

            {/* GRAND TOTAL ROW */}
            <tfoot className="bg-slate-900 text-white font-black text-xs border-t-2 border-slate-700">
              <tr>
                <td className="py-3 px-4 uppercase tracking-wider">
                  Total Portfolio (Filtered)
                </td>
                <td className="py-3 px-4 text-center text-amber-400">{grandTotal.activeMat}</td>
                <td className="py-3 px-4 text-center text-sky-400">{grandTotal.activeMfg}</td>
                <td className="py-3 px-4 text-right text-emerald-400 font-mono text-sm">
                  {formatCurrency(convertValue(grandTotal.valuePKR, 'PKR', currency), currency)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2ND & 3RD MATRIX TABLES (SIDE-BY-SIDE IN GRID) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ========================================================= */}
        {/* 2ND TABLE: REGION CATEGORY & UNDER DEV SOURCING MATRIX */}
        {/* ========================================================= */}
        <div className="bg-white rounded-none-none border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[480px]">
          {/* Card Header */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-950 px-2 py-0.5 rounded-none border border-blue-800">
                2nd Table
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold">
                Region Category & Under Dev Sourcing Matrix
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Click row for records</span>
          </div>

          {/* Scrollable Table Area */}
          <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0 relative">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200 shadow-xs">
                <tr>
                  <th className="py-2.5 px-3 w-[28%]">Region Category</th>
                  <th className="py-2.5 px-2 text-center w-[11%]">Act Mat</th>
                  <th className="py-2.5 px-2 text-center w-[11%]">UD Mat</th>
                  <th className="py-2.5 px-2 text-center w-[11%]">UD Mfg</th>
                  <th className="py-2.5 px-2 text-center w-[11%]">Non Dev Diff</th>
                  <th className="py-2.5 px-3 text-right w-[28%]">12M Annual Value ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredRegionRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No regions match the slicers
                    </td>
                  </tr>
                ) : (
                  filteredRegionRows.map((row) => (
                    <tr
                      key={row.region}
                      onClick={() =>
                        handleRowClick(
                          `Region Category: ${row.region}`,
                          `Active Materials and Under Development Pipeline in ${row.region}`,
                          `Region: ${row.region}`
                        )
                      }
                      className="hover:bg-blue-50/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3 font-bold text-slate-800 flex items-center gap-1.5 truncate">
                        <span
                          className={`w-2 h-2 rounded-none-full flex-shrink-0 ${
                            row.region === 'INDIA'
                              ? 'bg-blue-600'
                              : row.region === 'CHINA'
                              ? 'bg-sky-500'
                              : row.region === 'EUROPE'
                              ? 'bg-indigo-500'
                              : row.region === 'LOCAL'
                              ? 'bg-emerald-500'
                              : 'bg-amber-500'
                          }`}
                        />
                        <span className="truncate">{row.region}</span>
                      </td>
                      <td className="py-2.5 px-2 text-center font-semibold text-slate-700">
                        {row.activeMat}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-blue-600">
                        {row.underDevMat}
                      </td>
                      <td className="py-2.5 px-2 text-center font-semibold text-slate-600">
                        {row.underDevMfg}
                      </td>
                      <td className="py-2.5 px-2 text-center font-medium text-slate-500">
                        {row.nonDevDiff}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {formatCurrency(convertValue(row.valuePKR, 'PKR', currency), currency)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {/* Table 2 Total Portfolio (Filtered) Sticky Footer */}
              <tfoot className="sticky bottom-0 z-20 bg-slate-900 text-white font-black text-xs border-t-2 border-slate-700 shadow-md">
                <tr>
                  <td className="py-3 px-3 uppercase tracking-wider text-sky-300">
                    Total Portfolio (Filtered)
                  </td>
                  <td className="py-3 px-2 text-center text-amber-400">
                    {filteredRegionRows.reduce((a, b) => a + b.activeMat, 0)}
                  </td>
                  <td className="py-3 px-2 text-center text-sky-400">
                    {filteredRegionRows.reduce((a, b) => a + b.underDevMat, 0)}
                  </td>
                  <td className="py-3 px-2 text-center text-indigo-300">
                    {filteredRegionRows.reduce((a, b) => a + b.underDevMfg, 0)}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-300">
                    {filteredRegionRows.reduce((a, b) => a + b.nonDevDiff, 0)}
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-mono text-sm">
                    {formatCurrency(
                      convertValue(
                        filteredRegionRows.reduce((a, b) => a + b.valuePKR, 0),
                        'PKR',
                        currency
                      ),
                      currency
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3RD TABLE: MATERIAL CLASSIFICATION & UNDER DEV MATRIX */}
        {/* ========================================================= */}
        <div className="bg-white rounded-none-none border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[480px]">
          {/* Card Header */}
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950 px-2 py-0.5 rounded-none border border-purple-800">
                3rd Table
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold">
                Material Classification & Under Dev Matrix
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Click row for records</span>
          </div>

          {/* Scrollable Table Area */}
          <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0 relative">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-100 text-slate-700 uppercase font-black text-[10px] tracking-wider border-b border-slate-200 shadow-xs">
                <tr>
                  <th className="py-2.5 px-3 w-[28%]">Material Classification</th>
                  <th className="py-2.5 px-2 text-center w-[11%]">Act Mat</th>
                  <th className="py-2.5 px-2 text-center w-[11%]">UD Mat</th>
                  <th className="py-2.5 px-2 text-center w-[11%]">UD Mfg</th>
                  <th className="py-2.5 px-2 text-center w-[11%]">Non Dev Diff</th>
                  <th className="py-2.5 px-3 text-right w-[28%]">12M Annual Value ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredClassRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No classifications match the slicers
                    </td>
                  </tr>
                ) : (
                  filteredClassRows.map((row) => (
                    <tr
                      key={row.classification}
                      onClick={() =>
                        handleRowClick(
                          `Material Classification: ${row.classification}`,
                          `Active Materials and Under Development records for ${row.classification}`,
                          `Classification: ${row.classification}`
                        )
                      }
                      className="hover:bg-purple-50/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3 font-bold text-slate-800 flex items-center gap-1.5 truncate">
                        <span
                          className={`w-2 h-2 rounded-none-full flex-shrink-0 ${
                            row.classification.includes('PROJECT')
                              ? 'bg-purple-600'
                              : row.classification.includes('MULTI')
                              ? 'bg-blue-600'
                              : row.classification.includes('SINGLE')
                              ? 'bg-emerald-600'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span className="truncate">{row.classification}</span>
                      </td>
                      <td className="py-2.5 px-2 text-center font-semibold text-slate-700">
                        {row.activeMat}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-purple-600">
                        {row.underDevMat}
                      </td>
                      <td className="py-2.5 px-2 text-center font-semibold text-slate-600">
                        {row.underDevMfg}
                      </td>
                      <td className="py-2.5 px-2 text-center font-medium text-slate-500">
                        {row.nonDevDiff}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        {formatCurrency(convertValue(row.valuePKR, 'PKR', currency), currency)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {/* Table 3 Total Portfolio (Filtered) Sticky Footer */}
              <tfoot className="sticky bottom-0 z-20 bg-slate-900 text-white font-black text-xs border-t-2 border-slate-700 shadow-md">
                <tr>
                  <td className="py-3 px-3 uppercase tracking-wider text-purple-300">
                    Total Portfolio (Filtered)
                  </td>
                  <td className="py-3 px-2 text-center text-amber-400">
                    {filteredClassRows.reduce((a, b) => a + b.activeMat, 0)}
                  </td>
                  <td className="py-3 px-2 text-center text-purple-400">
                    {filteredClassRows.reduce((a, b) => a + b.underDevMat, 0)}
                  </td>
                  <td className="py-3 px-2 text-center text-indigo-300">
                    {filteredClassRows.reduce((a, b) => a + b.underDevMfg, 0)}
                  </td>
                  <td className="py-3 px-2 text-center text-slate-300">
                    {filteredClassRows.reduce((a, b) => a + b.nonDevDiff, 0)}
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-mono text-sm">
                    {formatCurrency(
                      convertValue(
                        filteredClassRows.reduce((a, b) => a + b.valuePKR, 0),
                        'PKR',
                        currency
                      ),
                      currency
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

