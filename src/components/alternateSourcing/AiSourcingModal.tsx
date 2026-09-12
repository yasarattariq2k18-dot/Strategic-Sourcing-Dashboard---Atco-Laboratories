import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, FileText, Award } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';
import { IndentorQuoteResponse } from '../../types';

// Clean text/markdown formatter without external dependencies
const MarkdownView: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-2.5 text-xs text-slate-800 leading-relaxed font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-sm font-bold text-slate-900 pt-2 border-b border-slate-200 pb-1">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="text-xs font-bold text-purple-900 uppercase tracking-wider pt-1.5">
              {trimmed.replace('#### ', '')}
            </h4>
          );
        }

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const text = trimmed.slice(2);
          // Highlight bold text
          const parts = text.split(/(\*\*.*?\*\*)/g);
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>
                {parts.map((p, i) =>
                  p.startsWith('**') && p.endsWith('**') ? (
                    <strong key={i} className="font-bold text-slate-950">
                      {p.slice(2, -2)}
                    </strong>
                  ) : (
                    p
                  )
                )}
              </span>
            </div>
          );
        }

        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+)\.\s(.*)$/);
          if (match) {
            const num = match[1];
            const text = match[2];
            const parts = text.split(/(\*\*.*?\*\*)/g);
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="font-bold text-purple-700">{num}.</span>
                <span>
                  {parts.map((p, i) =>
                    p.startsWith('**') && p.endsWith('**') ? (
                      <strong key={i} className="font-bold text-slate-950">
                        {p.slice(2, -2)}
                      </strong>
                    ) : (
                      p
                    )
                  )}
                </span>
              </div>
            );
          }
        }

        // Standard paragraph
        const parts = trimmed.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={idx}>
            {parts.map((p, i) =>
              p.startsWith('**') && p.endsWith('**') ? (
                <strong key={i} className="font-bold text-slate-950">
                  {p.slice(2, -2)}
                </strong>
              ) : (
                p
              )
            )}
          </p>
        );
      })}
    </div>
  );
};

interface AiSourcingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMaterialId?: string;
}

export const AiSourcingModal: React.FC<AiSourcingModalProps> = ({
  isOpen,
  onClose,
  defaultMaterialId,
}) => {
  const { materials, indentors } = useInquiry();

  const [selectedMatId, setSelectedMatId] = useState<string>(
    defaultMaterialId || (materials.length > 0 ? materials[0].id : '')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [reportSource, setReportSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentMaterial = materials.find((m) => m.id === selectedMatId) || materials[0];

  const handleRunAiAnalysis = async () => {
    if (!currentMaterial) return;

    setIsLoading(true);
    setError(null);

    try {
      const submittedQuotes = (Object.values(currentMaterial.responses || {}) as IndentorQuoteResponse[]).filter(
        (r) => r.status === 'SUBMITTED'
      );

      const quotationsPayload = submittedQuotes.map((q) => ({
        indentorName: q.indentorName,
        vendorManufacturer: q.manufacturerName,
        originCountry: q.mfgOrigin,
        quotedRateUSD: q.quotedRateNumeric,
        uom: currentMaterial.uom,
        priceVariancePct: currentMaterial.benchmarkPriceUSD
          ? Math.round(
              ((currentMaterial.benchmarkPriceUSD - q.quotedRateNumeric) /
                currentMaterial.benchmarkPriceUSD) *
                100
            )
          : 0,
        annualSavingsPotentialUSD: currentMaterial.benchmarkPriceUSD
          ? Math.round(
              (currentMaterial.benchmarkPriceUSD - q.quotedRateNumeric) *
                currentMaterial.annualQty
            )
          : 0,
        moq: q.moq || currentMaterial.perLotQty,
        leadTimeWeeks: q.leadTimeWeeks || 4,
        paymentTerms: q.paymentTerms || '100% LC at Sight',
        dmfStatus: q.dmfOpen === 'YES' ? 'Open Part Available' : 'Not Available',
        gmpCertificateStatus: q.gmp === 'YES' ? 'Valid GMP Certified' : 'Pending',
        stabilityDataAvailable: q.stabilityLongTermZoneIV === 'YES',
        coaAvailable: q.coaAck === 'Yes',
        nitrosamineResidualSolventsDeclared: q.certNitrosamine === 'YES',
        docsScore:
          (q.dmfOpen === 'YES' ? 1 : 0) +
          (q.gmp === 'YES' ? 1 : 0) +
          (q.stabilityLongTermZoneIV === 'YES' ? 1 : 0) +
          (q.certNitrosamine === 'YES' ? 1 : 0) +
          (q.certUsFda === 'YES' || q.certCep === 'YES' ? 1 : 0),
        auditStatus: q.auditAck === 'Yes' ? 'APPROVED' : 'UNDER REVIEW',
        auditScoreRating: 'Grade A',
        auditedBy: 'Atco QA Technical Team',
        auditRemarks: 'Facility audited and approved for active synthesis.',
      }));

      const res = await fetch('/api/ai-review-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialCode: currentMaterial.materialCode,
          materialName: currentMaterial.materialName,
          inquiry: {
            materialCode: currentMaterial.materialCode,
            materialName: currentMaterial.materialName,
            category: currentMaterial.apiExp,
            annualDemandQty: currentMaterial.annualQty,
            perLotQty: currentMaterial.perLotQty,
            uom: currentMaterial.uom,
            shipmentMode: currentMaterial.shipmentMode,
            targetPriceUSD: currentMaterial.benchmarkPriceUSD || 25,
            lastPurchasePriceUSD: currentMaterial.benchmarkPriceUSD,
            preferMfg: currentMaterial.preferMfg,
            preferOrigin: currentMaterial.preferOrigin,
            initialSampleQtyReq: currentMaterial.approxInitialSampleQty,
            trialSampleQtyReq: currentMaterial.approxTrialSampleQty,
          },
          quotations: quotationsPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch AI analysis');
      }

      setAnalysisReport(data.analysis);
      setReportSource(data.source);
    } catch (err: any) {
      setError(err.message || 'Error executing AI Strategic Advisory');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-purple-950 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-900 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold">AI Sourcing Advisory & Manufacturer Development Engine</h3>
              <p className="text-[11px] text-purple-200">
                Strategic procurement review powered by Gemini 3.7 & Atco Sourcing Algorithm
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-purple-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Controls Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Target Material:</span>
              <select
                value={selectedMatId}
                onChange={(e) => {
                  setSelectedMatId(e.target.value);
                  setAnalysisReport(null);
                }}
                className="p-1.5 border border-slate-300 rounded-lg bg-white font-medium text-slate-900 text-xs"
              >
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.materialCode} - {m.materialName}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleRunAiAnalysis}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg font-bold shadow-xs transition-colors"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Quotations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Sourcing Advisory</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Analysis Output */}
          {analysisReport ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-200">
                <span className="flex items-center gap-1 font-semibold text-purple-800">
                  <Award className="w-3.5 h-3.5 text-purple-600" />
                  <span>Executive Procurement Recommendation Generated</span>
                </span>
                <span className="font-mono">Engine: {reportSource || 'Gemini'}</span>
              </div>

              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 text-slate-800 space-y-2 leading-relaxed">
                <MarkdownView content={analysisReport} />
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs font-medium text-slate-600">
                Ready to review quotations for <strong>{currentMaterial?.materialName}</strong>
              </p>
              <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                The advisory analyzes quoted pricing against target benchmarks, verifies regulatory dossiers (DMF, GMP, Zone IV stability), and issues ranking recommendations for pilot batch development.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Confidential Atco Strategic Procurement Intelligence
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-xs font-semibold hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
