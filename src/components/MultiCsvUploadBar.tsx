import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Download,
  Info,
  Sparkles,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  parseUnderDevCsv,
  parseMaturityCsv,
  parseCphiCsv,
  parseHistoricCsv,
  parseProjectSavingsCsv,
  parseMasterMaterialCsv,
} from '../utils/csvParser';

export const MultiCsvUploadBar: React.FC = () => {
  const {
    updateDataset,
    resetAllDataToDefault,
    masterData,
    underDevData,
    maturityData,
    cphiData,
    historicData,
    projectSavingsData,
  } = useData();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const fileSlots = [
    {
      id: 'master' as const,
      label: '1. Master Active Materials',
      filename: 'Active Material Master List.csv',
      count: masterData.length,
      unit: 'Materials',
      desc: '445 Active codes, values & origins',
    },
    {
      id: 'underDev' as const,
      label: '2. Under Dev (Tentative)',
      filename: 'Alternate Under Development Saving.csv',
      count: underDevData.length,
      unit: 'Pipelines',
      desc: '4 Stages: Arr, Test, Stab, PD',
    },
    {
      id: 'maturity' as const,
      label: '3. Commercialized Maturity',
      filename: 'Commercialized Maturity Saving.csv',
      count: maturityData.length,
      unit: 'Records',
      desc: 'AVL developed & commercialized',
    },
    {
      id: 'cphi' as const,
      label: '4. CPHI Savings POs',
      filename: 'CPHI Saving Since Jul 2026.csv',
      count: cphiData.length,
      unit: 'POs',
      desc: 'Exhibition POs & net savings',
    },
    {
      id: 'historic' as const,
      label: '5. Historic PO Variance',
      filename: 'Historic PO Variance.csv',
      count: historicData.length,
      unit: 'Orders',
      desc: 'Historical price variances & alternates',
    },
    {
      id: 'project' as const,
      label: '6. 22 Project Savings',
      filename: '22 Project Materials Saving.csv',
      count: projectSavingsData.length,
      unit: 'Materials',
      desc: '22 Project materials net impact',
    },
  ];

  const processFile = (file: File) => {
    const fileNameLower = file.name.toLowerCase();
    let slotId: 'master' | 'underDev' | 'maturity' | 'cphi' | 'historic' | 'project' | null = null;

    if (fileNameLower.includes('master') || fileNameLower.includes('active') || fileNameLower.includes('445')) {
      slotId = 'master';
    } else if (fileNameLower.includes('under') || fileNameLower.includes('dev') || fileNameLower.includes('tentative')) {
      slotId = 'underDev';
    } else if (fileNameLower.includes('matur') || fileNameLower.includes('commerc')) {
      slotId = 'maturity';
    } else if (fileNameLower.includes('cphi')) {
      slotId = 'cphi';
    } else if (fileNameLower.includes('hist') || fileNameLower.includes('var')) {
      slotId = 'historic';
    } else if (fileNameLower.includes('project') || fileNameLower.includes('22')) {
      slotId = 'project';
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      if (!csvText) return;

      try {
        let count = 0;
        if (slotId === 'master') {
          const parsed = parseMasterMaterialCsv(csvText);
          updateDataset('master', parsed);
          count = parsed.length;
        } else if (slotId === 'underDev') {
          const parsed = parseUnderDevCsv(csvText);
          updateDataset('underDev', parsed);
          count = parsed.length;
        } else if (slotId === 'maturity') {
          const parsed = parseMaturityCsv(csvText);
          updateDataset('maturity', parsed);
          count = parsed.length;
        } else if (slotId === 'cphi') {
          const parsed = parseCphiCsv(csvText);
          updateDataset('cphi', parsed);
          count = parsed.length;
        } else if (slotId === 'historic') {
          const parsed = parseHistoricCsv(csvText);
          updateDataset('historic', parsed);
          count = parsed.length;
        } else if (slotId === 'project') {
          const parsed = parseProjectSavingsCsv(csvText);
          updateDataset('project', parsed);
          count = parsed.length;
        } else {
          // If unmatched by name, default parse as master or prompt
          const parsed = parseMasterMaterialCsv(csvText);
          updateDataset('master', parsed);
          count = parsed.length;
          slotId = 'master';
        }

        setNotification({
          type: 'success',
          text: `Loaded ${file.name} successfully (${count} records into ${slotId.toUpperCase()})!`,
        });
      } catch (err: any) {
        setNotification({
          type: 'error',
          text: `Error processing ${file.name}: ${err.message || 'Check CSV format'}`,
        });
      }
    };
    reader.readAsText(file);
  };

  const handleMultipleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (file.name.endsWith('.csv') || file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
        processFile(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleMultipleFiles(e.dataTransfer.files);
  };

  return (
    <div
      id="multi-csv-upload-section"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm transition-all overflow-hidden"
    >
      {/* Primary Bar Strip */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-2 rounded-xl bg-blue-600/90 text-white shadow-sm flex-shrink-0">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                Multi-CSV Sourcing & Procurement Data Feeds
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                6 Active Datasets
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Drag & drop one or multiple CSV files anytime to live-update all Trees, Charts, and Matrices
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Quick Multi-file Upload Button */}
          <button
            onClick={() => multiFileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs border border-blue-400/30"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Multi CSV</span>
          </button>
          <input
            ref={multiFileInputRef}
            type="file"
            multiple
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => handleMultipleFiles(e.target.files)}
          />

          {/* Reset button */}
          <button
            onClick={() => {
              resetAllDataToDefault();
              setNotification({ type: 'success', text: 'All datasets restored to verified default records!' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            title="Reset to Master Defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          {/* Expand/Collapse Slot Details */}
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title={isExpanded ? 'Collapse Feed Cards' : 'Expand Feed Cards'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`px-4 py-2 text-xs font-semibold flex items-center justify-between border-b ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification.text}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-500 hover:text-slate-800 text-sm">
            ×
          </button>
        </div>
      )}

      {/* Drag & Drop Zone or 6 Grid Slots */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-4 transition-all ${
          isDragging ? 'bg-blue-50 border-2 border-dashed border-blue-500' : 'bg-slate-50/60'
        }`}
      >
        {/* Compact 6-Feed Horizontal Badges / Slots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {fileSlots.map((slot) => (
            <div
              key={slot.id}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] font-bold text-slate-800 truncate" title={slot.label}>
                    {slot.label}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                    {slot.count}
                  </span>
                </div>
                {isExpanded && <p className="text-[10px] text-slate-500 leading-tight mb-2">{slot.desc}</p>}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] text-slate-400 truncate max-w-[80px]">{slot.unit}</span>
                <label className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 text-[10px] font-bold cursor-pointer transition-colors shadow-2xs">
                  <UploadCloud className="w-3 h-3" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) processFile(file);
                    }}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
