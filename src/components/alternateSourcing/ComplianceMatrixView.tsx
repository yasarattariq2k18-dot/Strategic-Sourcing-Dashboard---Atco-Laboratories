import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Folder,
  ExternalLink,
  ShieldCheck,
  Building,
  Filter,
} from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { IndentorQuoteResponse } from '../../types';

export const ComplianceMatrixView: React.FC = () => {
  const { materials, indentors } = useInquiry();
  const [selectedIndentorFilter, setSelectedIndentorFilter] = useState<string>('all');

  const complianceCols = [
    { key: 'certUsFda', label: 'US FDA' },
    { key: 'certCep', label: 'CEP' },
    { key: 'certTgaKdmfJdmfAnvisa', label: 'TGA/Anvisa' },
    { key: 'dmfOpen', label: 'DMF Open' },
    { key: 'dmfClose', label: 'DMF Close' },
    { key: 'gmp', label: 'GMP' },
    { key: 'dml', label: 'DML' },
    { key: 'msds', label: 'MSDS' },
    { key: 'stabilityAccelerated6m', label: 'Stability 6M' },
    { key: 'stabilityLongTermZoneIV', label: 'Zone IV A/B' },
    { key: 'certIso', label: 'ISO' },
    { key: 'certHalal', label: 'Halal' },
    { key: 'certTseBse', label: 'TSE/BSE' },
    { key: 'certSmf', label: 'SMF' },
    { key: 'certNitrosamine', label: 'Nitrosamine' },
    { key: 'certTransportationDecl', label: 'Transport' },
  ];

  const renderBadge = (val: string | undefined) => {
    if (val === 'YES') {
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]" title="YES">
          ✓
        </span>
      );
    }
    if (val === 'NO') {
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px]" title="NO">
          ✕
        </span>
      );
    }
    return <span className="text-slate-300 text-[10px]">-</span>;
  };

  return (
    <div className="space-y-4">
      {/* Top Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Technical Dossier, Regulatory Compliance & Accreditation Matrix</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-vendor verification of DMF openness, Zone IV long-term stability, GMP licenses, and nitrosamine risk assessments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Filter Indentor:</span>
          <select
            value={selectedIndentorFilter}
            onChange={(e) => setSelectedIndentorFilter(e.target.value)}
            className="text-xs p-2 border border-slate-300 rounded-lg bg-white text-slate-900 font-medium"
          >
            <option value="all">All Indentors ({indentors.length})</option>
            {indentors.map((ind) => (
              <option key={ind.id} value={ind.id}>
                {ind.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Compliance Data Grid */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider whitespace-nowrap">
                <th className="py-3 px-3 border-r border-slate-800">Material Code & Name</th>
                <th className="py-3 px-3 border-r border-slate-800">Indentor Agent</th>
                <th className="py-3 px-3 border-r border-slate-800">Proposed Manufacturer</th>
                {complianceCols.map((col) => (
                  <th key={col.key} className="py-3 px-2 border-r border-slate-800 text-center w-12 font-bold">
                    {col.label}
                  </th>
                ))}
                <th className="py-3 px-3 text-center">Google Drive Dossier</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {materials.map((mat) => {
                const responses = (Object.values(mat.responses || {}) as IndentorQuoteResponse[]).filter((r) => {
                  if (r.status !== 'SUBMITTED') return false;
                  if (selectedIndentorFilter !== 'all' && r.indentorId !== selectedIndentorFilter) {
                    return false;
                  }
                  return true;
                });

                if (responses.length === 0) {
                  return (
                    <tr key={mat.id} className="text-slate-400 bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-700">
                        {mat.materialCode} - {mat.materialName}
                      </td>
                      <td colSpan={complianceCols.length + 3} className="py-3 px-3 text-center italic">
                        No vendor submissions yet
                      </td>
                    </tr>
                  );
                }

                return responses.map((resp, idx) => (
                  <tr key={`${mat.id}-${resp.indentorId}`} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900 border-r border-slate-200">
                      <span className="font-mono text-xs text-blue-700 font-bold block">{mat.materialCode}</span>
                      <span className="text-[11px] text-slate-700">{mat.materialName}</span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800 border-r border-slate-200">
                      {resp.indentorName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 border-r border-slate-200">
                      <span className="font-bold block">{resp.manufacturerName}</span>
                      <span className="text-[10px] text-slate-500">Origin: {resp.mfgOrigin}</span>
                    </td>

                    {complianceCols.map((col) => (
                      <td key={col.key} className="py-2.5 px-1 border-r border-slate-200 text-center">
                        {renderBadge((resp as any)[col.key])}
                      </td>
                    ))}

                    <td className="py-2.5 px-3 text-center">
                      {resp.googleDriveFolderLink ? (
                        <a
                          href={resp.googleDriveFolderLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          <Folder className="w-3.5 h-3.5 text-blue-500" />
                          <span>View Files ({resp.uploadedDocs?.length || 0})</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[10px]">No Link</span>
                      )}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
