import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  Mail,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  Trash2,
  Eye,
  Sparkles,
  Download,
  Plus,
  ArrowRight,
  ShieldCheck,
  Layers,
  RefreshCw,
  FolderUp,
  FileCode,
  FileUp,
} from 'lucide-react';
import {
  BatchUploadedFileItem,
  processBatchQuotationFiles,
  parseMultiplePastedEmails,
  exportComparisonToExcel,
} from '../utils/quotationParser';
import { VendorQuotationRecord, InquiryBenchmarkRecord } from '../types';
import { formatCurrency, convertValue } from '../utils/currency';

interface Props {
  inquiries: InquiryBenchmarkRecord[];
  onAddQuotations: (newQuotes: VendorQuotationRecord[]) => void;
  currency: 'PKR' | 'USD';
}

export const MultiFileQuotationUploader: React.FC<Props> = ({
  inquiries,
  onAddQuotations,
  currency,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'multi_file' | 'batch_paste'>('multi_file');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedBatch, setUploadedBatch] = useState<BatchUploadedFileItem[]>([]);
  const [inspectedBatchItem, setInspectedBatchItem] = useState<BatchUploadedFileItem | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<{ type: 'success' | 'warning' | 'info'; text: string } | null>(null);

  // Bulk Paste Text State
  const [pastedBatchText, setPastedBatchText] = useState<string>('');
  const [isParsingBatchText, setIsParsingBatchText] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Handle Multi-file upload
  const handleFilesSelected = async (files: FileList | File[] | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    try {
      const results = await processBatchQuotationFiles(files, inquiries);
      
      // Calculate total quotes
      const totalQuotesExtracted = results.reduce((acc, item) => acc + item.extractedQuotes.length, 0);
      const allQuotes = results.flatMap((item) => item.extractedQuotes);

      setUploadedBatch((prev) => [...results, ...prev]);

      if (totalQuotesExtracted > 0) {
        // Automatically merge into active quotation dataset
        onAddQuotations(allQuotes);
        setNotificationMsg({
          type: 'success',
          text: `Successfully processed ${results.length} file(s) and extracted ${totalQuotesExtracted} total vendor quotation records into the Master Comparison!`,
        });
      } else {
        setNotificationMsg({
          type: 'warning',
          text: `Processed ${results.length} file(s), but no valid quotation rows or rates were identified. Check file format or column names.`,
        });
      }
    } catch (err: any) {
      setNotificationMsg({
        type: 'warning',
        text: `Error during batch parsing: ${err.message || 'Unknown processing error'}`,
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTimeout(() => setNotificationMsg(null), 7000);
    }
  };

  // Remove individual file from batch
  const handleRemoveBatchItem = (id: string) => {
    setUploadedBatch((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all batch queue
  const handleClearBatch = () => {
    setUploadedBatch([]);
    setNotificationMsg({
      type: 'info',
      text: 'Batch upload queue cleared.',
    });
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  // Re-import quotes from batch queue
  const handleReimportBatch = () => {
    const allQuotes = uploadedBatch.flatMap((item) => item.extractedQuotes);
    if (allQuotes.length === 0) {
      setNotificationMsg({
        type: 'warning',
        text: 'No valid extracted quotations in current batch queue.',
      });
      return;
    }
    onAddQuotations(allQuotes);
    setNotificationMsg({
      type: 'success',
      text: `Imported ${allQuotes.length} quotations from batch queue to Master Dataset!`,
    });
    setTimeout(() => setNotificationMsg(null), 5000);
  };

  // Bulk Paste Parsing
  const handleParseBatchText = () => {
    if (!pastedBatchText.trim()) return;
    setIsParsingBatchText(true);

    try {
      const parsedList = parseMultiplePastedEmails(pastedBatchText, inquiries);
      if (parsedList.length > 0) {
        onAddQuotations(parsedList);

        // Add virtual item to uploadedBatch
        const virtualBatchItem: BatchUploadedFileItem = {
          id: `virtual-paste-${Date.now()}`,
          fileName: `Outlook_Batch_Paste_${new Date().toLocaleTimeString().replace(/:/g, '')}.eml`,
          fileSize: pastedBatchText.length,
          fileType: 'eml',
          status: 'success',
          statusMessage: `Extracted ${parsedList.length} quotes from pasted Outlook text block.`,
          extractedQuotes: parsedList,
          processedAt: new Date().toLocaleTimeString(),
        };

        setUploadedBatch((prev) => [virtualBatchItem, ...prev]);
        setNotificationMsg({
          type: 'success',
          text: `Successfully parsed ${parsedList.length} quotation offer(s) from bulk email text!`,
        });
        setPastedBatchText('');
      } else {
        setNotificationMsg({
          type: 'warning',
          text: 'Could not extract quotation tokens. Ensure text includes sender/subject, material names, and price rates.',
        });
      }
    } catch (err: any) {
      setNotificationMsg({
        type: 'warning',
        text: `Bulk text parsing error: ${err.message}`,
      });
    } finally {
      setIsParsingBatchText(false);
      setTimeout(() => setNotificationMsg(null), 6000);
    }
  };

  // Load sample multi-file bundle demo
  const handleLoadSampleBundle = () => {
    const sampleFiles: BatchUploadedFileItem[] = [
      {
        id: `demo-1-${Date.now()}`,
        fileName: 'Premier_Agencies_Azithromycin_CSPC.eml',
        fileSize: 42300,
        fileType: 'eml',
        status: 'success',
        statusMessage: 'Extracted 1 offer from CSPC Pharma @ $112.00/kg CFR Karachi.',
        processedAt: new Date().toLocaleTimeString(),
        extractedQuotes: [
          {
            id: `SAMPLE-EML-1-${Date.now()}`,
            sourceType: 'OUTLOOK_EMAIL',
            inquiryRefNumber: 'ATCO/INQ/2026/API-08',
            emailSubject: 'Commercial Offer & Technical Pack - Azithromycin USP - CSPC Pharma',
            emailSender: 'sales@premier-agencies.pk',
            receivedDate: '2026-08-28',
            indentorName: 'Premier Agencies',
            vendorManufacturer: 'CSPC Ouyi Pharmaceutical Co., Ltd.',
            originCountry: 'China',
            company: 'LAB',
            category: 'API',
            materialCode: '111000217',
            materialName: 'Azithromycin Dihydrate USP',
            pharmacopoeiaGrade: 'USP / EP Standard',
            quotedRateUSD: 112.0,
            quotedRatePKR: 112.0 * 280,
            currency: 'USD',
            originalCurrencyRate: 112.0,
            uom: 'KG',
            moq: 500,
            packSize: '25 KG Fibre Drums',
            leadTimeWeeks: 3,
            paymentTerms: '100% LC at 90 Days Usance',
            incoterms: 'CFR Karachi',
            validityDate: '2026-09-30',
            targetBenchmarkPriceUSD: 118.5,
            annualQtyRequirement: 18000,
            priceVarianceUSD: 6.5,
            priceVariancePct: 5.49,
            annualSavingsPotentialUSD: 117000,
            docsAvailabilityStatus: 'FULL AVAILABLE',
            dmfStatus: 'AVAILABLE (OPEN/USDMF)',
            gmpCertificateStatus: 'VALID WHO-GMP',
            coaAvailable: true,
            stabilityDataAvailable: true,
            tseBseDeclared: true,
            nitrosamineResidualSolventsDeclared: true,
            docsScore: 5,
            auditStatus: 'APPROVED',
            auditedBy: 'ATCO QA TEAM',
            auditScoreRating: 'A (HIGH COMPLIANCE)',
            auditRemarks: 'On-site audit completed in Nov 2025. Excellent cGMP compliance.',
            emailBodySnippet: 'Quoted Azithromycin Dihydrate USP @ $112.00/kg CFR Karachi by CSPC Ouyi.',
            attachmentFileNames: ['CSPC_USDMF_OpenPart.pdf', 'WHO_GMP_Cert.pdf'],
            isLowestQuote: true,
            isBestEvaluatedOffer: true,
            evaluationNotes: 'Recommended Winner: Lowest rate + Open USDMF + Validated Audit.',
          },
        ],
      },
      {
        id: `demo-2-${Date.now()}`,
        fileName: 'Indentor_Comparison_Metformin_Cefixime_Quotes.xlsx',
        fileSize: 128400,
        fileType: 'excel',
        status: 'success',
        statusMessage: 'Parsed 3 quotation rows from Multi-Vendor Spreadsheet.',
        processedAt: new Date().toLocaleTimeString(),
        extractedQuotes: [
          {
            id: `SAMPLE-XLS-1-${Date.now()}`,
            sourceType: 'EXCEL_FILE',
            inquiryRefNumber: 'ATCO/INQ/2026/API-01',
            emailSubject: 'Spreadsheet Quote: Metformin HCl DC 95%',
            emailSender: 'import@biotech-sourcing.com',
            receivedDate: '2026-08-25',
            indentorName: 'BioTech Sourcing',
            vendorManufacturer: 'Wanbury Limited',
            originCountry: 'India',
            company: 'LAB',
            category: 'API',
            materialCode: '111000201',
            materialName: 'Metformin HCl DC 95%',
            pharmacopoeiaGrade: 'USP DC Grade',
            quotedRateUSD: 3.35,
            quotedRatePKR: 3.35 * 280,
            currency: 'USD',
            originalCurrencyRate: 3.35,
            uom: 'KG',
            moq: 3000,
            packSize: '25 KG Bags',
            leadTimeWeeks: 4,
            paymentTerms: '100% LC at Sight',
            incoterms: 'CFR Karachi',
            validityDate: '2026-09-30',
            targetBenchmarkPriceUSD: 3.55,
            annualQtyRequirement: 120000,
            priceVarianceUSD: 0.2,
            priceVariancePct: 5.63,
            annualSavingsPotentialUSD: 24000,
            docsAvailabilityStatus: 'FULL AVAILABLE',
            dmfStatus: 'AVAILABLE (OPEN/USDMF)',
            gmpCertificateStatus: 'VALID WHO-GMP',
            coaAvailable: true,
            stabilityDataAvailable: true,
            tseBseDeclared: true,
            nitrosamineResidualSolventsDeclared: true,
            docsScore: 5,
            auditStatus: 'APPROVED',
            auditedBy: 'ATCO QA TEAM',
            auditScoreRating: 'A (HIGH COMPLIANCE)',
            auditRemarks: 'Wanbury Patalganga facility approved by ATCO QA.',
            emailBodySnippet: 'Spreadsheet row: Metformin DC 95% @ $3.35/kg CFR Karachi.',
            attachmentFileNames: ['Indentor_Comparison_Metformin_Cefixime_Quotes.xlsx'],
            isLowestQuote: true,
            isBestEvaluatedOffer: true,
            evaluationNotes: 'Benchmark saving $0.20/KG across 120,000 KG annual requirement.',
          },
          {
            id: `SAMPLE-XLS-2-${Date.now()}`,
            sourceType: 'EXCEL_FILE',
            inquiryRefNumber: 'ATCO/INQ/2026/API-03',
            emailSubject: 'Spreadsheet Quote: Cefixime Trihydrate Compacted',
            emailSender: 'import@pharmatrade.com',
            receivedDate: '2026-08-25',
            indentorName: 'PharmaTrade International',
            vendorManufacturer: 'Qilu Antibiotics (Linyi) Co., Ltd.',
            originCountry: 'China',
            company: 'LAB',
            category: 'API',
            materialCode: '111000204',
            materialName: 'Cefixime Trihydrate Compacted',
            pharmacopoeiaGrade: 'USP Compacted',
            quotedRateUSD: 89.5,
            quotedRatePKR: 89.5 * 280,
            currency: 'USD',
            originalCurrencyRate: 89.5,
            uom: 'KG',
            moq: 500,
            packSize: '25 KG Drums',
            leadTimeWeeks: 3,
            paymentTerms: '100% LC at 90 Days',
            incoterms: 'CFR Karachi',
            validityDate: '2026-09-30',
            targetBenchmarkPriceUSD: 94.0,
            annualQtyRequirement: 14000,
            priceVarianceUSD: 4.5,
            priceVariancePct: 4.79,
            annualSavingsPotentialUSD: 63000,
            docsAvailabilityStatus: 'FULL AVAILABLE',
            dmfStatus: 'AVAILABLE (OPEN/USDMF)',
            gmpCertificateStatus: 'VALID WHO-GMP',
            coaAvailable: true,
            stabilityDataAvailable: true,
            tseBseDeclared: true,
            nitrosamineResidualSolventsDeclared: true,
            docsScore: 5,
            auditStatus: 'APPROVED',
            auditedBy: 'ATCO QA TEAM',
            auditScoreRating: 'A (HIGH COMPLIANCE)',
            auditRemarks: 'Qilu Linyi plant audited and approved.',
            emailBodySnippet: 'Spreadsheet row: Cefixime Compacted @ $89.50/kg CFR Karachi.',
            attachmentFileNames: ['Indentor_Comparison_Metformin_Cefixime_Quotes.xlsx'],
            isLowestQuote: true,
            isBestEvaluatedOffer: true,
            evaluationNotes: 'High volume cephalosporin savings: $63,000 USD/year.',
          },
        ],
      },
      {
        id: `demo-3-${Date.now()}`,
        fileName: 'ChemiSource_Amlodipine_MSN_Quote.msg',
        fileSize: 56100,
        fileType: 'msg',
        status: 'success',
        statusMessage: 'Parsed Outlook .MSG offer from MSN Labs @ $29.50/kg.',
        processedAt: new Date().toLocaleTimeString(),
        extractedQuotes: [
          {
            id: `SAMPLE-MSG-1-${Date.now()}`,
            sourceType: 'OUTLOOK_EMAIL',
            inquiryRefNumber: 'ATCO/INQ/2026/API-02',
            emailSubject: 'Commercial Offer: Amlodipine Besilate BP/USP - MSN Laboratories',
            emailSender: 'inquiry@chemisource.pk',
            receivedDate: '2026-08-27',
            indentorName: 'ChemiSource Pakistan',
            vendorManufacturer: 'MSN Laboratories Private Limited',
            originCountry: 'India',
            company: 'LAB',
            category: 'API',
            materialCode: '111000203',
            materialName: 'Amlodipine Besilate BP/USP',
            pharmacopoeiaGrade: 'BP/USP Standard',
            quotedRateUSD: 29.5,
            quotedRatePKR: 29.5 * 280,
            currency: 'USD',
            originalCurrencyRate: 29.5,
            uom: 'KG',
            moq: 100,
            packSize: '25 KG Drums',
            leadTimeWeeks: 4,
            paymentTerms: '100% LC at Sight',
            incoterms: 'CFR Karachi',
            validityDate: '2026-09-30',
            targetBenchmarkPriceUSD: 32.0,
            annualQtyRequirement: 4500,
            priceVarianceUSD: 2.5,
            priceVariancePct: 7.81,
            annualSavingsPotentialUSD: 11250,
            docsAvailabilityStatus: 'FULL AVAILABLE',
            dmfStatus: 'AVAILABLE (OPEN/USDMF)',
            gmpCertificateStatus: 'VALID WHO-GMP',
            coaAvailable: true,
            stabilityDataAvailable: true,
            tseBseDeclared: true,
            nitrosamineResidualSolventsDeclared: true,
            docsScore: 5,
            auditStatus: 'APPROVED',
            auditedBy: 'ATCO QA TEAM',
            auditScoreRating: 'A (HIGH COMPLIANCE)',
            auditRemarks: 'MSN Unit-II approved by USFDA & ATCO QA.',
            emailBodySnippet: 'Outlook MSG Offer: Amlodipine Besilate @ $29.50/kg CFR Karachi.',
            attachmentFileNames: ['ChemiSource_Amlodipine_MSN_Quote.msg'],
            isLowestQuote: true,
            isBestEvaluatedOffer: true,
            evaluationNotes: 'MSN Labs offers top pharmacopoeial purity with full CEP pack.',
          },
        ],
      },
    ];

    setUploadedBatch(sampleFiles);
    const allQuotes = sampleFiles.flatMap((item) => item.extractedQuotes);
    onAddQuotations(allQuotes);
    setNotificationMsg({
      type: 'success',
      text: `Loaded 3 sample multi-files (Excel + Outlook .EML + Outlook .MSG) with 4 extracted vendor quotations!`,
    });
    setTimeout(() => setNotificationMsg(null), 6000);
  };

  // Load sample multi-email text snippet
  const handleLoadSampleBatchText = () => {
    setPastedBatchText(`From: sales@premier-agencies.pk
To: yasar.tariq@atcolab.com
Date: Tue, 18 Aug 2026 14:22:15 +0500
Subject: Commercial Offer & Regulatory Tech Pack - Azithromycin Dihydrate USP - CSPC Pharma

Dear Mr. Yasar,

Thank you for your inquiry ATCO/INQ/2026/API-08 for Azithromycin Dihydrate USP.
We are pleased to quote the following offer on behalf of CSPC Pharmaceutical Group:
- Material: Azithromycin Dihydrate USP / EP Grade
- Maker: CSPC Ouyi Pharmaceutical Co., Ltd., Shijiazhuang, Hebei, China
- Quoted Rate: USD 112.00/KG CFR Karachi
- Target Benchmark: USD 118.50/KG (Saving: $6.50/KG)
- MOQ: 500 KG
- Packing: 25 KG Fibre Drums
- Lead Time: 3 Weeks upon LC confirmation
- Regulatory: Open Part USDMF and CEP (R1) fully available. Valid WHO-GMP & EU-GMP enclosed.
- Plant Audit Status: APPROVED by ATCO QA team during on-site visit in Nov 2025.

--------------------------------------------------------------------------------

From: quotes@biotech-sourcing.com
To: yasar.tariq@atcolab.com
Date: Wed, 19 Aug 2026 10:15:00 +0500
Subject: Official Quotation - Metformin HCl DC 95% & Paracetamol DC 90% - Granules India

Dear ATCO Sourcing Team,

Please find our firm indenting offer:
1. Material: Metformin HCl DC 95%
   - Maker: Granules India Limited, Hyderabad, India
   - Quoted Rate: USD 3.40/KG CFR Karachi
   - MOQ: 2000 KG
   - Docs: Full USDMF, WHO-GMP, Stability Zone IVb. Audit APPROVED.

2. Material: Paracetamol DC 90% Granules
   - Maker: Anhui MedChem Biochemical Co., Ltd., China
   - Quoted Rate: USD 4.95/KG CFR Karachi
   - MOQ: 5000 KG
   - Docs: Full DMF & WHO-GMP available. Desk audit completed.`);
  };

  // Queue Totals
  const totalFilesCount = uploadedBatch.length;
  const totalExtractedQuotes = uploadedBatch.reduce((acc, item) => acc + item.extractedQuotes.length, 0);
  const totalSavingsExtractedUSD = uploadedBatch.reduce(
    (acc, item) =>
      acc +
      item.extractedQuotes.reduce(
        (subAcc, q) => subAcc + (q.annualSavingsPotentialUSD > 0 ? q.annualSavingsPotentialUSD : 0),
        0
      ),
    0
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
      
      {/* Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                Multi-File Batch Quotation & Outlook Email Processor
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
                  Batch Mode Enabled
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload multiple Excel spreadsheets (.xlsx, .xls, .csv) and multiple Outlook emails (.eml, .msg, .txt) simultaneously in one go.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons & Sample button */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleLoadSampleBundle}
            className="py-2 px-3.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Load sample batch containing multiple Excel & Outlook quote files"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Load Sample Multi-Files Demo</span>
          </button>

          {/* Sub-tabs switch */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setActiveSubTab('multi_file')}
              className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'multi_file'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderUp className="w-3.5 h-3.5" />
              <span>Multi-File Dropzone</span>
            </button>
            <button
              onClick={() => setActiveSubTab('batch_paste')}
              className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === 'batch_paste'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Bulk Email Body Paste</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast/Banner */}
      {notificationMsg && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 border transition-all animate-fade-in ${
            notificationMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : notificationMsg.type === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {notificationMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{notificationMsg.text}</span>
          </div>
          <button
            onClick={() => setNotificationMsg(null)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: MULTI-FILE BATCH DROPZONE */}
      {/* ========================================================================= */}
      {activeSubTab === 'multi_file' && (
        <div className="space-y-5">
          {/* Main Dropzone Card */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFilesSelected(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all relative overflow-hidden ${
              isDragging
                ? 'border-blue-600 bg-blue-50/80 ring-4 ring-blue-500/20 scale-[0.995]'
                : 'border-slate-300 bg-slate-50/70 hover:bg-slate-50/90 hover:border-blue-400'
            }`}
          >
            <div className="max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner">
                {isProcessing ? (
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                ) : (
                  <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-blue-600 animate-bounce' : 'text-blue-600'}`} />
                )}
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900">
                  Drag & Drop Multiple Quotation Files & Outlook Emails Here
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Select or drag <strong>multiple files at once</strong> (e.g. 5 Excel sheets + 10 Outlook emails). The intelligent parser will process all sheets and email attachments concurrently.
                </p>
              </div>

              {/* Badges of supported extensions */}
              <div className="flex items-center justify-center gap-2 flex-wrap text-[11px] font-bold">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <FileSpreadsheet className="w-3 h-3 text-emerald-600" /> .xlsx / .xls
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-teal-600" /> .csv
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-blue-600" /> .eml (Outlook Email)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-indigo-600" /> .msg (Outlook Binary)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1">
                  <FileCode className="w-3 h-3 text-slate-600" /> .txt
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-black shadow-md shadow-blue-500/20 transition-all cursor-pointer hover:scale-102">
                  <FileUp className="w-4 h-4" />
                  <span>Select Multiple Excel / Email Files</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".xlsx,.xls,.csv,.eml,.msg,.txt"
                    className="hidden"
                    onChange={(e) => handleFilesSelected(e.target.files)}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold transition-all shadow-xs"
                >
                  Browse Files...
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Tip: You can hold <strong>Ctrl / Cmd</strong> or <strong>Shift</strong> in the file dialog to select dozens of files at once.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Uploaded Files Batch Queue & Results */}
          {/* ========================================================================= */}
          {uploadedBatch.length > 0 && (
            <div className="space-y-4 pt-2">
              {/* Batch Summary Metric Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Batch Files Loaded</div>
                    <div className="text-xl font-black text-white">{totalFilesCount} Files</div>
                  </div>
                  <div className="h-8 w-px bg-slate-700 hidden sm:block" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Quotes Extracted</div>
                    <div className="text-xl font-black text-emerald-400">{totalExtractedQuotes} Quotes</div>
                  </div>
                  <div className="h-8 w-px bg-slate-700 hidden sm:block" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Potential Annual Savings</div>
                    <div className="text-xl font-black text-amber-300">
                      {formatCurrency(totalSavingsExtractedUSD, currency)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={handleReimportBatch}
                    className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Merge all extracted quotes into Master Comparison"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sync All ({totalExtractedQuotes}) to Master</span>
                  </button>
                  <button
                    onClick={handleClearBatch}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="Clear batch queue"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Queue</span>
                  </button>
                </div>
              </div>

              {/* Uploaded Files Table List */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Batch Upload Files Queue ({uploadedBatch.length})
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Click any file to preview extracted quotation records
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {uploadedBatch.map((item) => {
                    const isExcel = item.fileType === 'excel' || item.fileType === 'csv';
                    const isEmail = item.fileType === 'eml' || item.fileType === 'msg';

                    return (
                      <div
                        key={item.id}
                        className="p-3.5 hover:bg-slate-50/90 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-2.5 rounded-xl shrink-0 ${
                              isExcel
                                ? 'bg-emerald-100 text-emerald-700'
                                : isEmail
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {isExcel ? (
                              <FileSpreadsheet className="w-5 h-5" />
                            ) : isEmail ? (
                              <Mail className="w-5 h-5" />
                            ) : (
                              <FileText className="w-5 h-5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-black text-slate-900 truncate max-w-xs sm:max-w-md">
                                {item.fileName}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                ({formatFileSize(item.fileSize)})
                              </span>
                              <span className="text-[10px] text-slate-400">
                                • {item.processedAt}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {item.statusMessage}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          {/* Extracted Quotes Badge */}
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                              item.extractedQuotes.length > 0
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            {item.extractedQuotes.length} Quotes
                          </span>

                          {/* Inspect Button */}
                          {item.extractedQuotes.length > 0 && (
                            <button
                              onClick={() => setInspectedBatchItem(item)}
                              className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                              title="Preview Extracted Quotes"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Preview</span>
                            </button>
                          )}

                          {/* Delete Item */}
                          <button
                            onClick={() => handleRemoveBatchItem(item.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Remove file from batch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: BULK OUTLOOK EMAILS PASTE */}
      {/* ========================================================================= */}
      {activeSubTab === 'batch_paste' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Bulk Outlook Email Text Extractor
              </h3>
              <p className="text-xs text-slate-500">
                Paste one or multiple Outlook email quotation bodies (separated by dashes or standard email headers).
              </p>
            </div>
            <button
              onClick={handleLoadSampleBatchText}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Multi-Email Sample</span>
            </button>
          </div>

          <textarea
            rows={7}
            value={pastedBatchText}
            onChange={(e) => setPastedBatchText(e.target.value)}
            placeholder={`Paste raw email text from Outlook here...\n\nExample:\nFrom: sales@premier-agencies.pk\nSubject: Quote Azithromycin USP @ $112.00/kg CFR Karachi\n...\n---\nFrom: quotes@biotech-sourcing.com\nSubject: Quote Metformin HCl DC 95% @ $3.40/kg`}
            className="w-full text-xs font-mono p-4 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-inner"
          />

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleParseBatchText}
              disabled={!pastedBatchText.trim() || isParsingBatchText}
              className={`py-2.5 px-5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md ${
                pastedBatchText.trim() && !isParsingBatchText
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 cursor-pointer hover:scale-101'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isParsingBatchText
                  ? 'Parsing Multi-Email Batch Tokens...'
                  : 'Extract All Quotes from Text Block'}
              </span>
            </button>

            {pastedBatchText.trim() && (
              <button
                onClick={() => setPastedBatchText('')}
                className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Clear Text
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INSPECTION MODAL FOR EXTRACTED FILE ITEMS */}
      {/* ========================================================================= */}
      {inspectedBatchItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-white">
                  {inspectedBatchItem.fileType === 'excel' ? (
                    <FileSpreadsheet className="w-5 h-5" />
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">{inspectedBatchItem.fileName}</h3>
                  <p className="text-xs text-slate-400">
                    {inspectedBatchItem.extractedQuotes.length} Extracted Quotation Rows • Processed at{' '}
                    {inspectedBatchItem.processedAt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectedBatchItem(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Table of quotes */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Material Name & Code</th>
                      <th className="p-3">Indentor</th>
                      <th className="p-3">Manufacturer & Origin</th>
                      <th className="p-3 text-right">Quoted Rate</th>
                      <th className="p-3 text-right">Target Variance</th>
                      <th className="p-3 text-center">Docs Score</th>
                      <th className="p-3 text-center">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inspectedBatchItem.extractedQuotes.map((q, idx) => (
                      <tr key={q.id || idx} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{q.materialName}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{q.materialCode}</span>
                        </td>
                        <td className="p-3 font-semibold text-slate-800">{q.indentorName}</td>
                        <td className="p-3">
                          <div className="font-medium text-slate-800">{q.vendorManufacturer}</div>
                          <span className="text-[10px] text-slate-500">{q.originCountry}</span>
                        </td>
                        <td className="p-3 text-right font-black text-slate-900">
                          {formatCurrency(convertValue(q.quotedRateUSD, 'USD', currency), currency)}
                          <span className="text-[10px] font-normal text-slate-500"> / KG</span>
                        </td>
                        <td className="p-3 text-right">
                          <span
                            className={`font-black ${
                              q.priceVarianceUSD >= 0 ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {q.priceVarianceUSD >= 0 ? '-' : '+'}
                            {formatCurrency(Math.abs(convertValue(q.priceVarianceUSD, 'USD', currency)), currency)}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-extrabold border border-blue-200">
                            {q.docsScore}/5
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                              q.auditStatus === 'APPROVED'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : q.auditStatus === 'CAPA PENDING'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                          >
                            {q.auditStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setInspectedBatchItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
