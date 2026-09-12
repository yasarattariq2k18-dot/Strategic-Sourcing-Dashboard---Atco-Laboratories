import React, { useState } from 'react';
import { X, Folder, UploadCloud, FileText, CheckCircle2, Link, ExternalLink, Trash2 } from 'lucide-react';
import { TechnicalDocumentItem } from '../../types';

interface DriveUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialCode: string;
  materialName: string;
  vendorName: string;
  currentLink: string;
  existingDocs: TechnicalDocumentItem[];
  onSave: (driveLink: string, docs: TechnicalDocumentItem[]) => void;
}

export const DriveUploadModal: React.FC<DriveUploadModalProps> = ({
  isOpen,
  onClose,
  materialCode,
  materialName,
  vendorName,
  currentLink,
  existingDocs,
  onSave,
}) => {
  if (!isOpen) return null;

  const defaultFolderName = `ATCO_SOURCING / 2025_INQUIRIES / ${materialCode}_${vendorName.replace(/[^a-zA-Z0-9]/g, '_')}_Docs`;
  const defaultDriveUrl = currentLink || `https://drive.google.com/drive/folders/atco_${materialCode}_${vendorName.slice(0, 8).toLowerCase()}_dossier`;

  const [linkInput, setLinkInput] = useState(defaultDriveUrl);
  const [docs, setDocs] = useState<TechnicalDocumentItem[]>(existingDocs || []);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  const handleSimulateDrop = (docType: string) => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      const newDoc: TechnicalDocumentItem = {
        id: `doc-${Date.now()}`,
        name: `${materialCode}_${docType}_${new Date().toISOString().slice(0, 10)}.pdf`,
        docType,
        size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().slice(0, 10),
      };
      setDocs((prev) => [...prev, newDoc]);
      setIsSimulatingUpload(false);
    }, 600);
  };

  const handleRemoveDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleApply = () => {
    onSave(linkInput, docs);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-blue-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-800 rounded-lg">
              <Folder className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Google Drive Technical Dossier Repository</h3>
              <p className="text-[11px] text-blue-200">
                Mandatory document repository for {materialCode} - {materialName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Generated Folder Name */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Standard Cloud Naming Convention:
            </span>
            <div className="font-mono text-xs text-slate-800 font-semibold bg-white p-2 rounded border border-slate-200 truncate">
              {defaultFolderName}
            </div>
          </div>

          {/* Drive Link Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Google Drive Folder Shareable URL (View/Download Permission for Atco QA):
            </label>
            <div className="relative">
              <Link className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="url"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono text-slate-800"
              />
            </div>
          </div>

          {/* Quick File Dropzone Simulator */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Attach Key Technical Documents to Dossier:
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Batch COA', 'DMF Open Part', 'GMP Certificate', 'Zone IV Stability', 'MSDS', 'Nitrosamine Declaration'].map(
                (type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleSimulateDrop(type)}
                    disabled={isSimulatingUpload}
                    className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 rounded-md transition-all flex items-center gap-1"
                  >
                    <UploadCloud className="w-3 h-3 text-slate-500" />
                    <span>+ {type}</span>
                  </button>
                )
              )}
            </div>

            {/* Uploaded Documents List */}
            <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-44 overflow-y-auto bg-slate-50/50">
              {docs.length === 0 ? (
                <div className="p-4 text-center text-slate-400 text-xs">
                  No documents attached yet. Click the buttons above or drop files.
                </div>
              ) : (
                docs.map((doc) => (
                  <div key={doc.id} className="p-2.5 flex items-center justify-between text-xs bg-white">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <span className="font-medium text-slate-800 block truncate max-w-xs">{doc.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {doc.docType} • {doc.size} • Uploaded: {doc.uploadDate}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveDoc(doc.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
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
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            Confirm Folder & Attachments
          </button>
        </div>
      </div>
    </div>
  );
};
