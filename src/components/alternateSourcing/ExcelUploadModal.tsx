import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { parseInquiryExcel } from '../../utils/alternateSourcingExcel';
import { InquiryMaterialItem } from '../../types';
import { useInquiry } from '../../context/InquiryContext';

interface ExcelUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExcelUploadModal: React.FC<ExcelUploadModalProps> = ({ isOpen, onClose }) => {
  const { importExcelMaterials } = useInquiry();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<Partial<InquiryMaterialItem>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [replaceExisting, setReplaceExisting] = useState(false);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    setError(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const results = parseInquiryExcel(buffer);
        if (!results || results.length === 0) {
          setError('No valid material rows found. Please check that column headers match the template.');
          setParsedRows([]);
        } else {
          setParsedRows(results);
        }
      } catch (err: any) {
        setError(`Failed to read file: ${err.message || 'Invalid Excel format'}`);
        setParsedRows([]);
      }
    };
    reader.onerror = () => {
      setError('Error reading file from disk.');
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmImport = () => {
    if (parsedRows.length === 0) return;
    importExcelMaterials(parsedRows);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-blue-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-800 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Upload Master Sourcing Inquiry Excel</h3>
              <p className="text-[11px] text-blue-200">
                Ingest Excel sheet with material specifications, target origins, and internal admin columns
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-blue-400 bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, .csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processFile(e.target.files[0]);
                }
              }}
            />
            <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-xs font-semibold text-slate-800 block">
              {fileName ? fileName : 'Click to select or drag and drop Excel file (.xlsx, .xls, .csv)'}
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              Supports Image 1 headers: Material Code, Name, Annual Qty, Per Lot, UOM, Mode, Active MFGs, Custom Data
            </span>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Parsed Preview */}
          {parsedRows.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Successfully Parsed {parsedRows.length} Material Line Items:</span>
                </span>
                <span className="text-[11px] text-slate-500">Previewing first 5 rows</span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="p-2 border-r border-slate-200">Code</th>
                      <th className="p-2 border-r border-slate-200">Material Name</th>
                      <th className="p-2 border-r border-slate-200 text-right">Annual Qty</th>
                      <th className="p-2 border-r border-slate-200 text-right">Per Lot</th>
                      <th className="p-2 border-r border-slate-200 text-center">UOM</th>
                      <th className="p-2">Active MFGs (Admin)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedRows.slice(0, 5).map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2 font-mono font-semibold text-slate-800 border-r border-slate-200">
                          {row.materialCode}
                        </td>
                        <td className="p-2 text-slate-800 border-r border-slate-200 max-w-xs truncate">
                          {row.materialName}
                        </td>
                        <td className="p-2 text-right font-mono text-slate-700 border-r border-slate-200">
                          {row.annualQty?.toLocaleString()}
                        </td>
                        <td className="p-2 text-right font-mono text-slate-700 border-r border-slate-200">
                          {row.perLotQty?.toLocaleString()}
                        </td>
                        <td className="p-2 text-center text-slate-600 border-r border-slate-200 font-bold">
                          {row.uom}
                        </td>
                        <td className="p-2 text-slate-600 text-[11px] truncate max-w-xs">
                          {row.activeMfgs || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmImport}
            disabled={parsedRows.length === 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            Ingest {parsedRows.length} Line Items Into Portal
          </button>
        </div>
      </div>
    </div>
  );
};
