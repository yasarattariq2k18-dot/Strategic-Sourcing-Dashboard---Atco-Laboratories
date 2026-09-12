import React, { useState } from 'react';
import {
  X,
  Folder,
  FileText,
  Download,
  Eye,
  Archive,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Building,
  Calendar,
  FileCheck,
} from 'lucide-react';
import { TechnicalDocumentItem, IndentorQuoteResponse } from '../../types';

interface VendorDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialCode: string;
  materialName: string;
  vendorQuote?: IndentorQuoteResponse | null;
}

export const VendorDocsModal: React.FC<VendorDocsModalProps> = ({
  isOpen,
  onClose,
  materialCode,
  materialName,
  vendorQuote,
}) => {
  const [selectedPreviewDoc, setSelectedPreviewDoc] = useState<TechnicalDocumentItem | null>(null);

  if (!isOpen || !vendorQuote) return null;

  const docs = vendorQuote.uploadedDocs || [];
  const hasDriveLink = !!vendorQuote.googleDriveFolderLink;

  // Single file download simulation
  const handleDownloadFile = (doc: TechnicalDocumentItem) => {
    const element = document.createElement('a');
    const content = `ATCO SOURCING VENDOR SUBMISSION DOCUMENT\n` +
      `==========================================\n` +
      `Document Name: ${doc.name}\n` +
      `Document Type: ${doc.docType}\n` +
      `File Size: ${doc.size}\n` +
      `Upload Date: ${doc.uploadDate}\n` +
      `Material: ${materialCode} - ${materialName}\n` +
      `Vendor/Indentor: ${vendorQuote.indentorName}\n` +
      `Manufacturer: ${vendorQuote.manufacturerName} (${vendorQuote.mfgOrigin})\n` +
      `COA Compliance: ${vendorQuote.coaAck === 'Yes' ? '100% Meets Atco Specs' : 'Exceptions noted'}\n\n` +
      `Verification Hash: SHA256-${Math.random().toString(36).substring(2, 15).toUpperCase()}\n` +
      `Timestamp: ${new Date().toISOString()}`;

    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = doc.name.endsWith('.pdf') ? doc.name.replace('.pdf', '.txt') : `${doc.name}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download all as ZIP simulation
  const handleDownloadZip = () => {
    const element = document.createElement('a');
    const manifest = `ATCO STRATEGIC SOURCING - VENDOR DOSSIER ARCHIVE\n` +
      `==================================================\n` +
      `Package: ${materialCode}_${vendorQuote.indentorId.toUpperCase()}_Dossier_Bundle.zip\n` +
      `Material: ${materialCode} - ${materialName}\n` +
      `Submitted By: ${vendorQuote.indentorName}\n` +
      `Manufacturer: ${vendorQuote.manufacturerName} (${vendorQuote.mfgOrigin})\n` +
      `Quoted Rate: ${vendorQuote.quotedRate}\n` +
      `Google Drive Repository: ${vendorQuote.googleDriveFolderLink || 'N/A'}\n\n` +
      `INCLUDED DOCUMENTS (${docs.length}):\n` +
      docs.map((d, i) => `${i + 1}. [${d.docType}] ${d.name} (${d.size}) - Uploaded ${d.uploadDate}`).join('\n') +
      `\n\nGenerated for Atco Quality Assurance & Commercial Procurement Audit\nDate: ${new Date().toISOString()}`;

    const file = new Blob([manifest], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${materialCode}_${vendorQuote.indentorId}_DOCS_BUNDLE.zip.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getDocTypeBadge = (docType: string) => {
    switch (docType.toUpperCase()) {
      case 'COA':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'US FDA':
      case 'FDA':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'CEP':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'STABILITY':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'DMF':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-blue-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-800 rounded-lg">
              <Folder className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">Vendor Documents Repository</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-700 text-blue-100 border border-blue-600">
                  📁 {docs.length} {docs.length === 1 ? 'Doc' : 'Docs'} Received
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                {vendorQuote.indentorName} • {materialCode} - {materialName}
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

        {/* Vendor & Quote Summary Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] font-semibold uppercase">Manufacturer</span>
            <span className="font-bold text-slate-800 truncate block">{vendorQuote.manufacturerName}</span>
            <span className="text-[10px] text-slate-500">{vendorQuote.mfgOrigin}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-semibold uppercase">Offered Price</span>
            <span className="font-mono font-bold text-emerald-700 block">${vendorQuote.quotedRateNumeric.toFixed(2)}/KG</span>
            <span className="text-[10px] text-slate-500">{vendorQuote.incoterm}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-semibold uppercase">COA Compliance</span>
            <span className={`font-bold inline-flex items-center gap-1 ${
              vendorQuote.coaAck === 'Yes' ? 'text-emerald-700' : 'text-amber-700'
            }`}>
              {vendorQuote.coaAck === 'Yes' ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  100% Meets Specs
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-amber-600" />
                  Exceptions
                </>
              )}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] font-semibold uppercase">Submission Date</span>
            <span className="text-slate-800 font-medium">
              {vendorQuote.submittedAt ? new Date(vendorQuote.submittedAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>

        {/* Modal Body: Documents List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {docs.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <Folder className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-600">No Attached Files Found</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                The vendor submitted compliance declarations via the checklist without attaching direct PDF files.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Verified Uploaded Certificates & Records ({docs.length})</span>
                <span className="text-[11px] text-slate-500">Click to Preview or Download</span>
              </div>

              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-slate-200 hover:border-blue-300 rounded-lg p-3 flex items-center justify-between gap-3 transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-blue-50 text-blue-700 rounded-lg shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900 truncate block">
                          {doc.name}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0 ${getDocTypeBadge(doc.docType)}`}>
                          {doc.docType}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5 font-mono">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Uploaded {doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setSelectedPreviewDoc(doc)}
                      className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg text-xs font-medium transition-colors"
                      title="Preview Document Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadFile(doc)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg text-xs font-semibold transition-colors border border-slate-200"
                      title="Download Document"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cloud Drive Repository Link if provided */}
          {hasDriveLink && (
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Folder className="w-4 h-4 text-blue-700 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-blue-900 block">External Google Drive Technical Folder</span>
                  <span className="text-[11px] text-blue-700 truncate block font-mono">
                    {vendorQuote.googleDriveFolderLink}
                  </span>
                </div>
              </div>
              <a
                href={vendorQuote.googleDriveFolderLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
              >
                <span>Open Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Quick Doc Preview Modal Overlay if preview is clicked */}
          {selectedPreviewDoc && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-800">Quick Document Preview: {selectedPreviewDoc.name}</span>
                </div>
                <button
                  onClick={() => setSelectedPreviewDoc(null)}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-slate-600 space-y-1 bg-white p-3 rounded border border-slate-200 font-mono text-[11px]">
                <p><strong>Type:</strong> {selectedPreviewDoc.docType} Certificate</p>
                <p><strong>File Size:</strong> {selectedPreviewDoc.size}</p>
                <p><strong>Batch / Lot Verified:</strong> Conformity acknowledged with Atco QA monograph</p>
                <p><strong>Status:</strong> Digital signature authenticated</p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleDownloadFile(selectedPreviewDoc)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3.5 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {docs.length} verified technical {docs.length === 1 ? 'dossier file' : 'dossier files'} available
          </span>
          <div className="flex items-center gap-2">
            {docs.length > 0 && (
              <button
                onClick={handleDownloadZip}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                title="Download all vendor documents as a compressed ZIP package"
              >
                <Archive className="w-4 h-4" />
                <span>Download All as ZIP</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
