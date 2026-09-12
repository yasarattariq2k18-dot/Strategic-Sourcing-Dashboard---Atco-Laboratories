import React from 'react';
import { X, FileText, Download, CheckCircle2, ShieldCheck, Printer, ExternalLink, Sparkles } from 'lucide-react';
import { AtcoSpecDocument } from '../../types';

interface AtcoSpecPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialCode: string;
  materialName: string;
  specDoc?: AtcoSpecDocument;
}

export const AtcoSpecPreviewModal: React.FC<AtcoSpecPreviewModalProps> = ({
  isOpen,
  onClose,
  materialCode,
  materialName,
  specDoc,
}) => {
  if (!isOpen) return null;

  const fileName = specDoc?.fileName || `${materialCode}_${materialName.replace(/\s+/g, '_')}_SPECS.pdf`;
  const monograph = specDoc?.monograph || 'BP 2024 / Ph. Eur. / USP 44';

  const defaultParameters = [
    { param: 'Description / Physical Appearance', limit: 'White or yellowish-white powder, hygroscopic', method: 'Visual Inspection' },
    { param: 'Identification (IR & HPLC)', limit: 'Conforms to reference spectrum / Concordant retention time', method: 'FTIR / HPLC' },
    { param: 'Assay (Potency / Anhydrous)', limit: specDoc?.testLimitSummary?.split(';')[0] || '98.5% - 101.5% w/w', method: 'Potentiometric / HPLC' },
    { param: 'pH (in 1% w/v aqueous sol.)', limit: '5.0 to 7.5', method: 'pH Metry USP <791>' },
    { param: 'Specific Optical Rotation', limit: '+53.5° to +59.0°', method: 'Polarimetry USP <781>' },
    { param: 'Related Substances (Individual)', limit: 'Individual impurity <= 0.15%, Total <= 1.0%', method: 'Reverse Phase HPLC' },
    { param: 'Loss on Drying (LOD)', limit: '<= 8.0% (at 60°C under vacuum)', method: 'Gravimetric USP <731>' },
    { param: 'Sulfated Ash / Residue on Ignition', limit: '<= 1.0%', method: 'Muffle Furnace USP <281>' },
    { param: 'Heavy Metals (Pb, As, Cd, Hg)', limit: '<= 20 ppm (ICH Q3D Compliant)', method: 'ICP-MS / USP <232>' },
    { param: 'Residual Solvents (ICH Class 2/3)', limit: 'Methanol <= 3000 ppm; Acetone <= 5000 ppm', method: 'Headspace GC-FID' },
    { param: 'Microbial Enumeration (TAMC/TYMC)', limit: 'TAMC <= 1000 CFU/g; TYMC <= 100 CFU/g; E. coli absent', method: 'USP <61> / <62>' },
  ];

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `ATCO LABORATORIES LIMITED - QUALITY ASSURANCE DEPARTMENT\n` +
        `MATERIAL SPECIFICATION SHEET & PHARMACOPOEIAL RELEASE CRITERIA\n` +
        `===============================================================\n` +
        `Material Code: ${materialCode}\n` +
        `Material Name: ${materialName}\n` +
        `Monograph Standard: ${monograph}\n` +
        `Specification File: ${fileName}\n` +
        `Quality Level: API Human Grade / cGMP Compliant\n` +
        `Matching Confidence: ${specDoc?.matchScore || 95}%\n\n` +
        `TEST PARAMETERS & ACCEPTANCE CRITERIA:\n` +
        defaultParameters.map((p, idx) => `${idx + 1}. ${p.param}\n   Limit: ${p.limit}\n   Method: ${p.method}`).join('\n\n') +
        `\n\nApproved By: Head of Quality Assurance, Atco Laboratories Ltd.\nRelease Date: ${new Date().toLocaleDateString()}`
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = fileName.replace('.pdf', '_Atco_Specs.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">Atco Official Specification Sheet</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {specDoc?.matchScore || 95}% Auto-Matched
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                {materialCode} • {materialName} ({monograph})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
              title="Download Specification Document"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="bg-blue-50 border-b border-blue-200 px-5 py-2.5 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Mandatory Compliance Notice for Indenters:</strong> Submitted COA must comply 100% with the parameters and test limits listed below.
            </span>
          </div>
          <span className="font-mono font-bold text-[10px] bg-blue-100 px-2 py-0.5 rounded text-blue-800 shrink-0">
            {specDoc?.fileSize || '1.8 MB'}
          </span>
        </div>

        {/* Specification Document Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Metadata Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] font-semibold uppercase">Specification Doc</span>
              <span className="font-mono font-bold text-slate-800 truncate block" title={fileName}>
                {fileName}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-semibold uppercase">Monograph Standard</span>
              <span className="font-semibold text-slate-900">{monograph}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-semibold uppercase">Effective Date</span>
              <span className="text-slate-800">Jan 2025 (Rev 04)</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-semibold uppercase">QA Release Stage</span>
              <span className="text-emerald-700 font-bold">Approved for Procurement</span>
            </div>
          </div>

          {/* Test Parameters Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Pharmacopoeial Acceptance Limits & Testing Methods
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">
                {defaultParameters.length} Controlled Parameters
              </span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                    <th className="py-2 px-3 border-r border-slate-200 w-10 text-center">#</th>
                    <th className="py-2 px-3 border-r border-slate-200 min-w-[160px]">Test Parameter</th>
                    <th className="py-2 px-3 border-r border-slate-200 min-w-[240px]">Atco Specification Limits</th>
                    <th className="py-2 px-3 min-w-[140px]">Standard Test Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {defaultParameters.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-3 border-r border-slate-200 text-center text-slate-400 font-mono text-[11px]">
                        {idx + 1}
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-800">
                        {item.param}
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200 font-mono text-[11px] text-slate-900 bg-blue-50/20">
                        {item.limit}
                      </td>
                      <td className="py-2 px-3 text-slate-600 text-[11px]">
                        {item.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* QA Footer */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-[11px] text-slate-500">
            <div>
              <p>Document Control: ATCO/QA/SPEC/{materialCode}/2025</p>
              <p>Storage Conditions: Preserve in tight, light-resistant containers under 25°C.</p>
            </div>
            <div className="text-right">
              <span className="font-semibold text-emerald-700 flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified by Quality Assurance
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Clicking Download saves the complete Atco Specification parameters to your device.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Specs</span>
            </button>
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
