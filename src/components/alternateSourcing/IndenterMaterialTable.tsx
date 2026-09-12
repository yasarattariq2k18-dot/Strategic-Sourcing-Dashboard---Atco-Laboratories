import React, { useState } from 'react';
import {
  CheckCircle2,
  Lock,
  Unlock,
  Folder,
  Send,
  Save,
  AlertCircle,
  FileCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { InquiryMaterialItem, IndentorQuoteResponse, TechnicalDocumentItem } from '../../types';
import { useInquiry } from '../../context/InquiryContext';
import { DriveUploadModal } from './DriveUploadModal';
import { AtcoSpecPreviewModal } from './AtcoSpecPreviewModal';

export const IndenterMaterialTable: React.FC = () => {
  const {
    materials,
    activeIndentorId,
    activeIndentor,
    updateLineItemField,
    saveLineItemDraft,
    submitLineItem,
    unlockLineItem,
  } = useInquiry();

  // Selected material for Drive Upload Modal
  const [driveModalMat, setDriveModalMat] = useState<InquiryMaterialItem | null>(null);
  const [selectedSpecMaterial, setSelectedSpecMaterial] = useState<InquiryMaterialItem | null>(null);
  const [expandedComplianceRowId, setExpandedComplianceRowId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getResponse = (mat: InquiryMaterialItem): IndentorQuoteResponse => {
    return (
      mat.responses[activeIndentorId] || {
        indentorId: activeIndentorId,
        indentorName: activeIndentor?.name || activeIndentorId,
        materialId: mat.id,
        materialCode: mat.materialCode,
        status: 'DRAFT',
        sample1stLotAck: '',
        sample1stLotRemarks: '',
        sample2ndLotAck: '',
        sample2ndLotRemarks: '',
        focSampleQtyRemarks: '',
        manufacturerName: '',
        mfgOrigin: '',
        supplierName: '',
        quotedRate: '',
        quotedRateNumeric: 0,
        currency: 'USD',
        incoterm: 'CPT Air Khi',
        coaAck: '',
        supplierRemarks: '',
        clientList: '',
        auditAck: '',
        certUsFda: '',
        certCep: '',
        certTgaKdmfJdmfAnvisa: '',
        techDocsAvailable: '',
        questionnaire: '',
        agreement: '',
        dmfOpen: '',
        dmfClose: '',
        gmp: '',
        dml: '',
        msds: '',
        stabilityAccelerated6m: '',
        stabilityLongTermZoneIV: '',
        certIso: '',
        certHalal: '',
        certTseBse: '',
        certSmf: '',
        certNitrosamine: '',
        certTransportationDecl: '',
        googleDriveFolderLink: `https://drive.google.com/drive/folders/atco_${mat.materialCode}_${activeIndentorId}`,
        uploadedDocs: [],
      }
    );
  };

  const handleFieldChange = (
    matId: string,
    field: keyof IndentorQuoteResponse,
    value: any
  ) => {
    updateLineItemField(matId, activeIndentorId, { [field]: value });
  };

  const handleSubmitRow = async (mat: InquiryMaterialItem) => {
    const current = getResponse(mat);
    const result = await submitLineItem(mat.id, activeIndentorId, current);
    if (result.success) {
      showToast('success', result.message);
    } else {
      showToast('error', result.message);
    }
  };

  const handleSaveDraft = async (mat: InquiryMaterialItem) => {
    const current = getResponse(mat);
    await saveLineItemDraft(mat.id, activeIndentorId, current);
    showToast('success', `Draft saved for ${mat.materialName}`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Toast notification */}
      {toastMessage && (
        <div
          className={`px-4 py-3 text-xs font-semibold flex items-center justify-between border-b ${
            toastMessage.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-700'
              : 'bg-rose-600 text-white border-rose-700'
          }`}
        >
          <div className="flex items-center gap-2">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{toastMessage.text}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Indenter Guidance Banner */}
      <div className="p-4 bg-emerald-50/50 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Alternate Sourcing Line Items for:</span>
            <span className="text-emerald-700 font-semibold">{activeIndentor?.name}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in proposed manufacturer details, commercial rate against lot size, sample commitment, and technical compliance. Click <strong>&ldquo;Submit Line Item&rdquo;</strong> to lock and dispatch individual materials to Atco Procurement.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-100/60 px-3 py-1.5 rounded-lg border border-emerald-200">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span>Restricted Mode: Confidential Atco Internal Columns are Hidden</span>
        </div>
      </div>

      {/* Main Form Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            {/* Top Multi-Header Groups Matching Image 1 Categories */}
            <tr className="text-white text-center font-bold tracking-wider uppercase text-[11px] select-none">
              <th colSpan={6} className="bg-blue-900 border-r border-blue-800 py-2.5 px-3">
                1. BASIC MATERIAL INFO (READ-ONLY)
              </th>
              <th colSpan={3} className="bg-indigo-900 border-r border-indigo-800 py-2.5 px-3">
                2. TARGET SOURCES & ORIGINS
              </th>
              <th colSpan={4} className="bg-slate-800 border-r border-slate-700 py-2.5 px-3">
                3. PROPOSED SAMPLE QTY ACKNOWLEDGEMENT
              </th>
              <th colSpan={4} className="bg-emerald-900 border-r border-emerald-800 py-2.5 px-3">
                4. MFG DETAILS & COMMERCIAL QUOTE
              </th>
              <th colSpan={3} className="bg-teal-900 border-r border-teal-800 py-2.5 px-3">
                5. COA & AUDIT ACK
              </th>
              <th colSpan={2} className="bg-purple-900 py-2.5 px-3">
                6. COMPLIANCE & SUBMISSION
              </th>
            </tr>

            {/* Column specific sub-headers */}
            <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-[11px] whitespace-nowrap">
              {/* 1. Basic */}
              <th className="py-2.5 px-3 border-r border-slate-200 w-24">Material Code</th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[180px]">Material Name</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-right w-16">Annual Qty</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-right w-16">Per Lot</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center w-12">UOM</th>
              <th className="py-2.5 px-3 border-r border-blue-200 text-center w-14">Mode</th>

              {/* 2. Target Sources */}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[200px]">Prefer Mfg (Reference)</th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[120px]">Prefer Origin</th>
              <th className="py-2.5 px-3 border-r border-indigo-200 min-w-[140px] bg-cyan-50/50">Atco Required Origin</th>

              {/* 3. Sample Qty Ack */}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[140px]">
                1st Lot Sample (Req: Approx)
              </th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[100px]">
                Supp Ack 1st Lot
              </th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[130px]">
                2nd Lot Sample (Req: Approx)
              </th>
              <th className="py-2.5 px-3 border-r border-slate-700 min-w-[100px]">
                Supp Ack 2nd Lot
              </th>

              {/* 4. Mfg Details & Commercial */}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[180px] bg-emerald-50/40 text-emerald-950 font-bold">
                Manufacturer Name *
              </th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[130px] bg-emerald-50/40 text-emerald-950 font-bold">
                Mfg Origin *
              </th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[140px] bg-emerald-50/40">
                Supplier Name (If Any)
              </th>
              <th className="py-2.5 px-3 border-r border-emerald-200 min-w-[150px] bg-emerald-50/40 text-emerald-950 font-bold">
                Quoted Rate ($/KG) *
              </th>

              {/* 5. COA & Audit */}
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[110px]">
                COA 100% Comply
              </th>
              <th className="py-2.5 px-3 border-r border-slate-200 min-w-[140px]">
                Client List (Local/Export)
              </th>
              <th className="py-2.5 px-3 border-r border-teal-200 min-w-[90px]">
                Audit Ack
              </th>

              {/* 6. Compliance & Submit */}
              <th className="py-2.5 px-3 border-r border-slate-200 text-center min-w-[120px]">
                Tech Dossier & Drive
              </th>
              <th className="py-2.5 px-3 text-center min-w-[150px]">
                Row Submission
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {materials.map((mat) => {
              const resp = getResponse(mat);
              const isLocked = resp.status === 'SUBMITTED';
              const isComplianceOpen = expandedComplianceRowId === mat.id;

              return (
                <React.Fragment key={mat.id}>
                  <tr
                    className={`transition-colors ${
                      isLocked
                        ? 'bg-emerald-50/30 hover:bg-emerald-50/50'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* 1. Basic Material Info (Read-Only) */}
                    <td className="py-3 px-3 font-mono font-bold text-slate-800 border-r border-slate-200">
                      {mat.materialCode}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900 border-r border-slate-200">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="font-semibold text-slate-900">{mat.materialName}</span>
                        {mat.atcoSpecsDoc ? (
                          <button
                            type="button"
                            onClick={() => setSelectedSpecMaterial(mat)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 px-2 py-0.5 rounded-full border border-cyan-300 transition-colors cursor-pointer"
                            title={`Click to view & download official Atco Specs (${mat.atcoSpecsDoc.fileName})`}
                          >
                            <FileText className="w-3 h-3 text-cyan-600" />
                            <span>Atco Specs ({mat.atcoSpecsDoc.monographStandard})</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Standard Monograph</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 border-r border-slate-200">
                      {mat.annualQty.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 border-r border-slate-200">
                      {mat.perLotQty.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-600 border-r border-slate-200">
                      {mat.uom}
                    </td>
                    <td className="py-3 px-3 text-center border-r border-blue-200">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          mat.shipmentMode === 'AIR'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {mat.shipmentMode}
                      </span>
                    </td>

                    {/* 2. Target Sources (Read-Only for Indenter) */}
                    <td
                      className="py-3 px-3 text-slate-600 text-[11px] border-r border-slate-200 max-w-xs truncate"
                      title={mat.preferMfg}
                    >
                      {mat.preferMfg || '-'}
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-[11px] border-r border-slate-200">
                      {mat.preferOrigin || '-'}
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium text-[11px] border-r border-indigo-200 bg-cyan-50/30">
                      {mat.atcoPreferredOrigin || '-'}
                    </td>

                    {/* 3. Sample Qty Ack (Supplier Editable) */}
                    <td className="py-3 px-3 border-r border-slate-200 font-mono text-[11px]">
                      <span className="text-slate-700 font-semibold block">{mat.approxInitialSampleQty}</span>
                    </td>
                    <td className="py-3 px-3 border-r border-slate-200">
                      <select
                        disabled={isLocked}
                        value={resp.sample1stLotAck}
                        onChange={(e) => handleFieldChange(mat.id, 'sample1stLotAck', e.target.value)}
                        className="w-full text-xs p-1 border border-slate-300 rounded disabled:bg-slate-100 font-medium"
                      >
                        <option value="">Select Ack</option>
                        <option value="Yes">Yes (FOC)</option>
                        <option value="No">No</option>
                        <option value="Partial">Partial</option>
                      </select>
                    </td>

                    <td className="py-3 px-3 border-r border-slate-200 font-mono text-[11px]">
                      <span className="text-slate-700 font-semibold block">{mat.approxTrialSampleQty}</span>
                    </td>
                    <td className="py-3 px-3 border-r border-slate-700">
                      <select
                        disabled={isLocked}
                        value={resp.sample2ndLotAck}
                        onChange={(e) => handleFieldChange(mat.id, 'sample2ndLotAck', e.target.value)}
                        className="w-full text-xs p-1 border border-slate-300 rounded disabled:bg-slate-100 font-medium"
                      >
                        <option value="">Select Ack</option>
                        <option value="Yes">Yes (FOC)</option>
                        <option value="No">No</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </td>

                    {/* 4. Mfg Details & Commercial Quote (Required) */}
                    <td className="py-3 px-3 border-r border-slate-200 bg-emerald-50/20">
                      <input
                        type="text"
                        disabled={isLocked}
                        value={resp.manufacturerName}
                        onChange={(e) => handleFieldChange(mat.id, 'manufacturerName', e.target.value)}
                        placeholder="e.g. North China Pharma"
                        className="w-full text-xs p-1.5 border border-emerald-300 rounded font-semibold text-slate-900 disabled:bg-slate-100"
                      />
                    </td>
                    <td className="py-3 px-3 border-r border-slate-200 bg-emerald-50/20">
                      <input
                        type="text"
                        disabled={isLocked}
                        value={resp.mfgOrigin}
                        onChange={(e) => handleFieldChange(mat.id, 'mfgOrigin', e.target.value)}
                        placeholder="e.g. China / India"
                        className="w-full text-xs p-1.5 border border-emerald-300 rounded text-slate-900 disabled:bg-slate-100"
                      />
                    </td>
                    <td className="py-3 px-3 border-r border-slate-200 bg-emerald-50/20">
                      <input
                        type="text"
                        disabled={isLocked}
                        value={resp.supplierName}
                        onChange={(e) => handleFieldChange(mat.id, 'supplierName', e.target.value)}
                        placeholder="Exporter name (optional)"
                        className="w-full text-xs p-1.5 border border-slate-300 rounded text-slate-800 disabled:bg-slate-100"
                      />
                    </td>
                    <td className="py-3 px-3 border-r border-emerald-200 bg-emerald-50/30">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500 font-mono text-[11px]">$</span>
                        <input
                          type="number"
                          step="0.01"
                          disabled={isLocked}
                          value={resp.quotedRateNumeric || ''}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            handleFieldChange(mat.id, 'quotedRateNumeric', val);
                            handleFieldChange(
                              mat.id,
                              'quotedRate',
                              `USD ${val.toFixed(2)}/KG ${resp.incoterm || 'CPT Air Khi'}`
                            );
                          }}
                          placeholder="24.50"
                          className="w-20 text-xs p-1.5 border border-emerald-400 rounded font-bold font-mono text-slate-900 disabled:bg-slate-100"
                        />
                        <select
                          disabled={isLocked}
                          value={resp.incoterm}
                          onChange={(e) => handleFieldChange(mat.id, 'incoterm', e.target.value as any)}
                          className="text-[10px] p-1 border border-slate-300 rounded disabled:bg-slate-100"
                        >
                          <option value="CPT Air Khi">CPT Air</option>
                          <option value="CFR Sea Khi">CFR Sea</option>
                          <option value="FOB">FOB</option>
                          <option value="CIF Khi">CIF</option>
                        </select>
                      </div>
                    </td>

                    {/* 5. COA & Audit */}
                    <td className="py-3 px-3 border-r border-slate-200">
                      <select
                        disabled={isLocked}
                        value={resp.coaAck}
                        onChange={(e) => handleFieldChange(mat.id, 'coaAck', e.target.value)}
                        className="w-full text-xs p-1 border border-slate-300 rounded disabled:bg-slate-100 font-medium"
                      >
                        <option value="">Ack Status</option>
                        <option value="Yes">Yes (100% Comply)</option>
                        <option value="Under Review">Under Review</option>
                        <option value="No">No / Deviation</option>
                      </select>
                    </td>

                    <td className="py-3 px-3 border-r border-slate-200">
                      <input
                        type="text"
                        disabled={isLocked}
                        value={resp.clientList}
                        onChange={(e) => handleFieldChange(mat.id, 'clientList', e.target.value)}
                        placeholder="e.g. Abbott, Sanofi, Getz"
                        className="w-full text-xs p-1 border border-slate-300 rounded text-slate-800 disabled:bg-slate-100"
                      />
                    </td>

                    <td className="py-3 px-3 border-r border-teal-200">
                      <select
                        disabled={isLocked}
                        value={resp.auditAck}
                        onChange={(e) => handleFieldChange(mat.id, 'auditAck', e.target.value)}
                        className="w-full text-xs p-1 border border-slate-300 rounded disabled:bg-slate-100 font-medium"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes (Agreed)</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="N/A">N/A</option>
                      </select>
                    </td>

                    {/* 6. Technical Dossier & Cloud Upload */}
                    <td className="py-3 px-3 border-r border-slate-200 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setDriveModalMat(mat)}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[11px] font-medium transition-colors"
                        >
                          <Folder className="w-3 h-3 text-blue-600" />
                          <span>
                            {resp.uploadedDocs && resp.uploadedDocs.length > 0
                              ? `${resp.uploadedDocs.length} Docs Attached`
                              : 'Google Drive'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedComplianceRowId(isComplianceOpen ? null : mat.id)
                          }
                          className="text-[10px] text-purple-700 hover:text-purple-900 font-medium flex items-center gap-0.5"
                        >
                          <span>Regulatory Checkpoints</span>
                          {isComplianceOpen ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* 7. Row Submission Button */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {isLocked ? (
                          <div className="flex items-center gap-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Submitted</span>
                            </span>
                            <button
                              onClick={() => unlockLineItem(mat.id, activeIndentorId)}
                              className="p-1 text-slate-400 hover:text-amber-600 rounded transition-colors"
                              title="Unlock to revise line item"
                            >
                              <Unlock className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSaveDraft(mat)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded border border-slate-200 transition-colors"
                              title="Save Draft (Keep unlocked)"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleSubmitRow(mat)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                              title="Submit line item & lock"
                            >
                              <Send className="w-3 h-3" />
                              <span>Submit Line Item</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Regulatory & Technical Compliance Checkpoints Section */}
                  {isComplianceOpen && (
                    <tr className="bg-purple-50/40 border-b border-purple-100">
                      <td colSpan={20} className="p-4">
                        <div className="bg-white border border-purple-200 rounded-lg p-4 shadow-xs">
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-purple-100">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
                              <FileCheck className="w-4 h-4 text-purple-700" />
                              <span>Regulatory & Technical Compliance Declarations (YES / NO / N/A)</span>
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Applicable for: <strong>{mat.materialName}</strong>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
                            {/* International Certifications */}
                            <div className="space-y-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                              <span className="font-bold text-slate-800 text-[11px] block border-b border-slate-200 pb-1">
                                International Accreditations:
                              </span>
                              {[
                                { key: 'certUsFda', label: 'US FDA' },
                                { key: 'certCep', label: 'CEP (EDQM)' },
                                { key: 'certTgaKdmfJdmfAnvisa', label: 'TGA / KDMF / JDMF / Anvisa' },
                              ].map(({ key, label }) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-slate-600 text-[11px]">{label}:</span>
                                  <select
                                    disabled={isLocked}
                                    value={(resp as any)[key]}
                                    onChange={(e) => handleFieldChange(mat.id, key as any, e.target.value)}
                                    className="text-[11px] p-1 border border-slate-300 rounded font-medium disabled:bg-slate-100"
                                  >
                                    <option value="">-</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                    <option value="N/A">N/A</option>
                                  </select>
                                </div>
                              ))}
                            </div>

                            {/* Technical Documents Availability */}
                            <div className="space-y-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                              <span className="font-bold text-slate-800 text-[11px] block border-b border-slate-200 pb-1">
                                Dossier & DMF Availability:
                              </span>
                              {[
                                { key: 'dmfOpen', label: 'DMF (Open Part Available)' },
                                { key: 'dmfClose', label: 'DMF (Closed Part Available)' },
                                { key: 'gmp', label: 'GMP Certificate' },
                                { key: 'dml', label: 'DML (Drug Mfg License)' },
                                { key: 'msds', label: 'MSDS' },
                              ].map(({ key, label }) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-slate-600 text-[11px]">{label}:</span>
                                  <select
                                    disabled={isLocked}
                                    value={(resp as any)[key]}
                                    onChange={(e) => handleFieldChange(mat.id, key as any, e.target.value)}
                                    className="text-[11px] p-1 border border-slate-300 rounded font-medium disabled:bg-slate-100"
                                  >
                                    <option value="">-</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                    <option value="N/A">N/A</option>
                                  </select>
                                </div>
                              ))}
                            </div>

                            {/* Stability Data */}
                            <div className="space-y-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                              <span className="font-bold text-slate-800 text-[11px] block border-b border-slate-200 pb-1">
                                Stability Data Commitment:
                              </span>
                              {[
                                { key: 'stabilityAccelerated6m', label: 'Accelerated 6-Month' },
                                { key: 'stabilityLongTermZoneIV', label: 'Long-Term Zone IV A/B' },
                                { key: 'questionnaire', label: 'Atco QA Questionnaire' },
                                { key: 'agreement', label: 'Quality Agreement' },
                              ].map(({ key, label }) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-slate-600 text-[11px]">{label}:</span>
                                  <select
                                    disabled={isLocked}
                                    value={(resp as any)[key]}
                                    onChange={(e) => handleFieldChange(mat.id, key as any, e.target.value)}
                                    className="text-[11px] p-1 border border-slate-300 rounded font-medium disabled:bg-slate-100"
                                  >
                                    <option value="">-</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                  </select>
                                </div>
                              ))}
                            </div>

                            {/* Declarations & Certifications */}
                            <div className="space-y-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                              <span className="font-bold text-slate-800 text-[11px] block border-b border-slate-200 pb-1">
                                Specific Declarations:
                              </span>
                              {[
                                { key: 'certNitrosamine', label: 'Nitrosamine Declaration' },
                                { key: 'certTseBse', label: 'TSE / BSE Free Declaration' },
                                { key: 'certSmf', label: 'Site Master File (SMF)' },
                                { key: 'certHalal', label: 'Halal Certificate' },
                                { key: 'certTransportationDecl', label: 'Transportation Declaration' },
                              ].map(({ key, label }) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-slate-600 text-[11px]">{label}:</span>
                                  <select
                                    disabled={isLocked}
                                    value={(resp as any)[key]}
                                    onChange={(e) => handleFieldChange(mat.id, key as any, e.target.value)}
                                    className="text-[11px] p-1 border border-slate-300 rounded font-medium disabled:bg-slate-100"
                                  >
                                    <option value="">-</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                    <option value="N/A">N/A</option>
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Google Drive Upload Modal */}
      {driveModalMat && (
        <DriveUploadModal
          isOpen={!!driveModalMat}
          onClose={() => setDriveModalMat(null)}
          materialCode={driveModalMat.materialCode}
          materialName={driveModalMat.materialName}
          vendorName={getResponse(driveModalMat).manufacturerName || activeIndentor?.name || 'Vendor'}
          currentLink={getResponse(driveModalMat).googleDriveFolderLink}
          existingDocs={getResponse(driveModalMat).uploadedDocs || []}
          onSave={(link, docs) => {
            handleFieldChange(driveModalMat.id, 'googleDriveFolderLink', link);
            handleFieldChange(driveModalMat.id, 'uploadedDocs', docs);
            setDriveModalMat(null);
            showToast('success', `Google Drive folder and ${docs.length} documents linked!`);
          }}
        />
      )}

      {/* Atco Official Specs Preview Modal */}
      {selectedSpecMaterial && (
        <AtcoSpecPreviewModal
          isOpen={!!selectedSpecMaterial}
          onClose={() => setSelectedSpecMaterial(null)}
          materialCode={selectedSpecMaterial.materialCode}
          materialName={selectedSpecMaterial.materialName}
          specDoc={selectedSpecMaterial.atcoSpecsDoc}
        />
      )}
    </div>
  );
};
