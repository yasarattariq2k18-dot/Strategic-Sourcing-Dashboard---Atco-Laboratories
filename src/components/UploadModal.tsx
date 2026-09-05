import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  X,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Download,
  Info,
  Sparkles,
  Layers,
  FileCheck,
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

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileUploadSlot {
  id: 'master' | 'underDev' | 'maturity' | 'cphi' | 'historic' | 'project';
  title: string;
  description: string;
  fileNameRequired: string;
  status: 'ready' | 'uploaded' | 'error';
  rowCount: number;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
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

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const slots: FileUploadSlot[] = [
    {
      id: 'master',
      title: '1. Master Active Material List',
      description: 'Contains 445 active material codes, classifications, buying values & manufacturers',
      fileNameRequired: 'Active Material Master List.csv',
      status: 'uploaded',
      rowCount: masterData.length,
    },
    {
      id: 'underDev',
      title: '2. Alternate Under Development Saving (Tentative)',
      description: 'Contains pipeline stages (Arrangement, Testing, Stability, PD Priority) & quotes',
      fileNameRequired: 'Alternate Under Development Saving- Tentative.csv',
      status: 'uploaded',
      rowCount: underDevData.length,
    },
    {
      id: 'maturity',
      title: '3. Commercialized Maturity Saving',
      description: 'Contains AVL development status, old vs new commercial prices & annual impact',
      fileNameRequired: 'Commercialized Maturity Saving.csv',
      status: 'uploaded',
      rowCount: maturityData.length,
    },
    {
      id: 'cphi',
      title: '4. CPHI Saving POs Since Jul 2026',
      description: 'Contains exhibition POs, indentors, manufacturers & net savings',
      fileNameRequired: 'CPHI Saving Since Jul 2026.csv',
      status: 'uploaded',
      rowCount: cphiData.length,
    },
    {
      id: 'historic',
      title: '5. Historic PO Variance & Alternate Ordered',
      description: 'Contains historical price variance orders and alternate orders executed',
      fileNameRequired: 'Historic PO Variance.csv',
      status: 'uploaded',
      rowCount: historicData.length,
    },
    {
      id: 'project',
      title: '6. 22 Project Materials Commercial Savings',
      description: 'Contains project savings, POs, quantities, and net saving values',
      fileNameRequired: '22 Project Materials Saving.csv',
      status: 'uploaded',
      rowCount: projectSavingsData.length,
    },
  ];

  const processSingleFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
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
        if (!csvText) {
          reject(new Error(`File ${file.name} is empty`));
          return;
        }

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
            // Default fallback
            const parsed = parseMasterMaterialCsv(csvText);
            updateDataset('master', parsed);
            count = parsed.length;
            slotId = 'master';
          }

          resolve(`Loaded ${file.name} (${count} records into ${slotId?.toUpperCase()})`);
        } catch (err: any) {
          reject(new Error(`Failed to parse ${file.name}: ${err.message}`));
        }
      };
      reader.onerror = () => reject(new Error(`Error reading ${file.name}`));
      reader.readAsText(file);
    });
  };

  const handleMultipleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files).filter(
      (f) => f.name.endsWith('.csv') || f.type === 'text/csv' || f.type.includes('excel')
    );

    if (fileArray.length === 0) {
      setMessage({ type: 'error', text: 'Please select valid .CSV files.' });
      return;
    }

    try {
      const results = await Promise.all(fileArray.map((f) => processSingleFile(f)));
      setMessage({
        type: 'success',
        text: `Successfully uploaded ${results.length} CSV files: ${results.join(' | ')}`,
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error processing some files' });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleMultipleFiles(e.dataTransfer.files);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Monthly CSV File Data Manager</h2>
              <p className="text-xs text-slate-300">
                Directly upload and refresh the 6 procurement CSV files to update trees and matrices permanently
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Banner */}
        {message && (
          <div
            className={`px-6 py-2.5 text-xs font-semibold flex items-center justify-between ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-b border-rose-200'
            }`}
          >
            <span className="line-clamp-1">{message.text}</span>
            <button onClick={() => setMessage(null)} className="text-slate-500 hover:text-slate-800 font-bold ml-2">
              ✕
            </button>
          </div>
        )}

        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* ========================================================================= */}
          {/* MULTI CSV FILE UPLOAD SECTION (DRAG & DROP + BATCH SELECTION BUTTON) */}
          {/* ========================================================================= */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? 'border-blue-600 bg-blue-50/80 scale-[0.99]'
                : 'border-blue-300 bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-slate-50 hover:border-blue-500'
            }`}
          >
            <input
              ref={multiFileInputRef}
              type="file"
              multiple
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => handleMultipleFiles(e.target.files)}
            />

            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                <UploadCloud className="w-6 h-6 animate-bounce" />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Upload Multiple CSV Files Together
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-md mx-auto">
                  Drag and drop 1 or all 6 CSV files here at once, or browse files from your computer. Files are auto-detected and mapped instantly.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => multiFileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Choose Multiple CSV Files</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetAllDataToDefault();
                    setMessage({
                      type: 'success',
                      text: 'All 6 datasets restored to verified default master records!',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                  <span>Reset All to Default</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Supports auto-mapping for: Active Master, Under Dev, Maturity, CPHI, Historic & 22 Project CSVs</span>
              </div>
            </div>
          </div>

          {/* Configured Data Feeds Header */}
          <div className="flex items-center justify-between pt-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              6 Configured Data Feeds Status
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Individual upload backups available below
            </span>
          </div>

          {/* 6 Data Feed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{slot.title}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {slot.rowCount} Rows Loaded
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{slot.description}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 truncate max-w-[170px]">
                    {slot.fileNameRequired}
                  </span>
                  <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-blue-600 hover:text-white text-slate-700 font-bold text-[11px] cursor-pointer transition-colors">
                    <UploadCloud className="w-3 h-3" />
                    <span>Upload Single</span>
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          processSingleFile(file)
                            .then((res) => setMessage({ type: 'success', text: res }))
                            .catch((err) => setMessage({ type: 'error', text: err.message }));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="hidden sm:inline">
              Data is preserved persistently in local storage across browser reloads.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            Done / Close Manager
          </button>
        </div>
      </div>
    </div>
  );
};
