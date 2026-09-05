import * as XLSX from 'xlsx';
import { VendorQuotationRecord, InquiryBenchmarkRecord, DocsStatusType, AuditStatusType } from '../types';

export interface BatchUploadedFileItem {
  id: string;
  file?: File;
  fileName: string;
  fileSize: number;
  fileType: 'excel' | 'eml' | 'msg' | 'text' | 'csv' | 'unknown';
  status: 'processing' | 'success' | 'warning' | 'error';
  statusMessage?: string;
  extractedQuotes: VendorQuotationRecord[];
  processedAt: string;
}

/**
 * Clean and decode text from Outlook .msg binary files or standard text
 */
export async function readOutlookOrTextFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.msg')) {
    try {
      const buffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(buffer);

      // Try decoding with TextDecoder for UTF-8 or ISO-8859-1
      let decoded = '';
      try {
        decoded = new TextDecoder('utf-8', { fatal: false }).decode(uint8);
      } catch {
        decoded = new TextDecoder('iso-8859-1').decode(uint8);
      }

      // Filter out non-printable binary characters
      const cleanChars: string[] = [];
      for (let i = 0; i < decoded.length; i++) {
        const code = decoded.charCodeAt(i);
        if (code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 126) || code >= 160) {
          cleanChars.push(decoded[i]);
        } else if (code === 0 && cleanChars.length > 0 && cleanChars[cleanChars.length - 1] !== ' ') {
          cleanChars.push(' ');
        }
      }
      const cleaned = cleanChars.join('').replace(/\s{3,}/g, ' ');
      if (cleaned.length > 30) {
        return cleaned;
      }
    } catch {
      // fallback to regular text
    }
  }

  // Standard text or .eml reader
  try {
    return await file.text();
  } catch {
    return '';
  }
}

/**
 * Intelligent Outlook Email Text & Header Parser
 * Parses pasted email body or .eml / .msg text for vendor quotes, documentation flags, and audit status.
 * Supports single or multi-item quotation emails.
 */
export function parseOutlookEmailText(
  rawText: string,
  existingInquiries: InquiryBenchmarkRecord[] = [],
  fileName: string = 'Outlook_Email_Quote.eml'
): VendorQuotationRecord[] {
  const results: VendorQuotationRecord[] = [];
  if (!rawText || rawText.trim().length === 0) return results;

  // Split lines
  const lines = rawText.split('\n');
  let emailSubject = '';
  let emailSender = '';
  let emailDate = new Date().toISOString().split('T')[0];
  let indentorName = 'Direct Vendor / Unspecified';
  let defaultVendorMfg = '';
  let defaultOrigin = 'China';

  // 1. Extract email headers
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^subject\s*:/i.test(trimmed)) {
      emailSubject = trimmed.replace(/^subject\s*:/i, '').trim();
    } else if (/^from\s*:/i.test(trimmed)) {
      emailSender = trimmed.replace(/^from\s*:/i, '').trim();
    } else if (/^date\s*:/i.test(trimmed)) {
      const parsedDateStr = trimmed.replace(/^date\s*:/i, '').trim();
      const parsedDate = new Date(parsedDateStr);
      if (!isNaN(parsedDate.getTime())) {
        emailDate = parsedDate.toISOString().split('T')[0];
      }
    }
  }

  const fullContent = rawText;

  // 2. Identify Indentor from sender or subject or body
  if (/premier\s*agenc/i.test(fullContent) || /premier-agencies/i.test(emailSender)) {
    indentorName = 'Premier Agencies';
  } else if (/biotech\s*sourcing/i.test(fullContent) || /biotech-sourcing/i.test(emailSender)) {
    indentorName = 'BioTech Sourcing';
  } else if (/pharmatrade/i.test(fullContent) || /pharmatrade/i.test(emailSender)) {
    indentorName = 'PharmaTrade International';
  } else if (/indent\s*master/i.test(fullContent) || /indentmasters/i.test(emailSender)) {
    indentorName = 'Indenting Masters';
  } else if (/apex\s*pharma/i.test(fullContent) || /apex-pharma/i.test(emailSender)) {
    indentorName = 'Apex Pharma Solutions';
  } else if (/chemisource/i.test(fullContent)) {
    indentorName = 'ChemiSource Pakistan';
  } else if (emailSender) {
    const parts = emailSender.split('@');
    if (parts[1]) {
      const domainPart = parts[1].split('.')[0].replace(/[-_]/g, ' ').toUpperCase();
      indentorName = `${domainPart} Indenting`;
    }
  }

  // 3. Identify Manufacturer & Country
  if (/zhejiang\s*chunghwa/i.test(fullContent)) {
    defaultVendorMfg = 'Zhejiang Chunghwa Pharmaceutical Co.';
    defaultOrigin = 'China';
  } else if (/cspc/i.test(fullContent)) {
    defaultVendorMfg = 'CSPC Ouyi Pharmaceutical Co., Ltd.';
    defaultOrigin = 'China';
  } else if (/anhui\s*medchem/i.test(fullContent)) {
    defaultVendorMfg = 'Anhui MedChem Biochemical Co., Ltd.';
    defaultOrigin = 'China';
  } else if (/granules\s*india/i.test(fullContent)) {
    defaultVendorMfg = 'Granules India Limited';
    defaultOrigin = 'India';
  } else if (/supriya\s*lifescience/i.test(fullContent)) {
    defaultVendorMfg = 'Supriya Lifescience Ltd.';
    defaultOrigin = 'India';
  } else if (/qilu\s*antibiotic/i.test(fullContent)) {
    defaultVendorMfg = 'Qilu Antibiotics (Linyi) Co., Ltd.';
    defaultOrigin = 'China';
  } else if (/wanbury/i.test(fullContent)) {
    defaultVendorMfg = 'Wanbury Limited';
    defaultOrigin = 'India';
  } else if (/shouguang\s*fukang/i.test(fullContent)) {
    defaultVendorMfg = 'Shouguang Fukang Pharmaceutical Co.';
    defaultOrigin = 'China';
  } else if (/dr\.?\s*reddy/i.test(fullContent)) {
    defaultVendorMfg = "Dr. Reddy's Laboratories (CPS Div)";
    defaultOrigin = 'India';
  } else if (/aarti\s*drugs/i.test(fullContent)) {
    defaultVendorMfg = 'Aarti Drugs Limited';
    defaultOrigin = 'India';
  } else if (/mingtai/i.test(fullContent) || /comprecel/i.test(fullContent)) {
    defaultVendorMfg = 'Mingtai Chemical Co., Ltd.';
    defaultOrigin = 'Taiwan';
  } else if (/sigachi/i.test(fullContent) || /hicel/i.test(fullContent)) {
    defaultVendorMfg = 'Sigachi Industries Limited';
    defaultOrigin = 'India';
  } else if (/msn\s*lab/i.test(fullContent)) {
    defaultVendorMfg = 'MSN Laboratories Private Limited';
    defaultOrigin = 'India';
  } else if (/cadila/i.test(fullContent)) {
    defaultVendorMfg = 'Cadila Pharmaceuticals Ltd.';
    defaultOrigin = 'India';
  } else {
    const mfgMatch = fullContent.match(/(?:manufacturer|maker|mfg|supplier|producer)\s*[:=-]\s*([^\n\r,;]+)/i);
    if (mfgMatch && mfgMatch[1]) {
      defaultVendorMfg = mfgMatch[1].trim();
    } else {
      defaultVendorMfg = 'Quoted Manufacturer / Vendor';
    }
  }

  // 4. Incoterms, Payment & Lead Time
  let incoterms = 'CFR Karachi';
  if (/cif\s*karachi/i.test(fullContent)) {
    incoterms = 'CIF Karachi';
  } else if (/cfr\s*karachi/i.test(fullContent)) {
    incoterms = 'CFR Karachi';
  } else if (/fob\s*shanghai/i.test(fullContent)) {
    incoterms = 'FOB Shanghai';
  } else if (/fob\s*nhava\s*sheva/i.test(fullContent)) {
    incoterms = 'FOB Nhava Sheva';
  } else if (/ex[\s-]works/i.test(fullContent)) {
    incoterms = 'Ex-Works';
  }

  let paymentTerms = '100% LC at Sight';
  if (/90\s*days/i.test(fullContent)) {
    paymentTerms = '100% LC at 90 Days Usance';
  } else if (/60\s*days/i.test(fullContent)) {
    paymentTerms = '100% LC at 60 Days';
  } else if (/sight/i.test(fullContent)) {
    paymentTerms = '100% LC at Sight';
  }

  let leadTimeWeeks = 4;
  const ltMatch = fullContent.match(/(\d+)\s*(?:weeks|wks|days)/i);
  if (ltMatch && ltMatch[1]) {
    leadTimeWeeks = parseInt(ltMatch[1], 10);
  }

  // 5. Documentation Availability Flags
  const hasDmf = /dmf|drug master file|cep|edqm|usdmf|open part/i.test(fullContent);
  const hasGmp = /gmp|who-gmp|eu-gmp|fda|pic\/s/i.test(fullContent);
  const hasCoa = /coa|certificate of analysis|batch specs|test report/i.test(fullContent);
  const hasStability = /stability|zone ivb|accelerated|real-time|shelf life/i.test(fullContent);
  const hasTse = /tse|bse|bovine|animal free|transmissible/i.test(fullContent);
  const hasNitrosamine = /nitrosamine|residual solvent|ich q3c|ich q3d|elemental/i.test(fullContent);

  let docsScore = 0;
  if (hasDmf) docsScore += 1;
  if (hasGmp) docsScore += 1;
  if (hasCoa) docsScore += 1;
  if (hasStability) docsScore += 1;
  if (hasTse || hasNitrosamine) docsScore += 1;

  let docsAvailabilityStatus: DocsStatusType = 'PARTIAL AVAILABLE';
  if (docsScore >= 4) docsAvailabilityStatus = 'FULL AVAILABLE';
  else if (docsScore <= 1) docsAvailabilityStatus = 'PENDING / REQUESTED';

  // 6. Audit Conduction Status
  let auditStatus: AuditStatusType = 'DESK AUDIT ONLY';
  let auditedBy: 'ATCO QA TEAM' | 'THIRD PARTY (INTERTEK/SGS)' | 'DESK ASSESSMENT' | 'NOT YET AUDITED' = 'DESK ASSESSMENT';
  let auditScoreRating: 'A (HIGH COMPLIANCE)' | 'B (ACCEPTABLE WITH MINOR CAPA)' | 'C (CRITICAL OBSERVATIONS)' | 'NOT RATED' = 'B (ACCEPTABLE WITH MINOR CAPA)';
  let auditRemarks: string = 'Desk audit completed based on GMP and Technical Dossier submission.';

  if (/audit.*approved|approved.*audit|plant.*approved|on-site.*approved/i.test(fullContent)) {
    auditStatus = 'APPROVED';
    auditedBy = 'ATCO QA TEAM';
    auditScoreRating = 'A (HIGH COMPLIANCE)';
    auditRemarks = 'On-site cGMP audit successfully verified with satisfactory compliance.';
  } else if (/capa\s*pending|minor\s*observation|observations\s*pending/i.test(fullContent)) {
    auditStatus = 'CAPA PENDING';
    auditedBy = 'ATCO QA TEAM';
    auditScoreRating = 'B (ACCEPTABLE WITH MINOR CAPA)';
    auditRemarks = 'Audit conducted. 3 minor observations pending CAPA verification.';
  } else if (/scheduled\s*for|audit\s*scheduled|planned\s*for/i.test(fullContent)) {
    auditStatus = 'SCHEDULED';
    auditedBy = 'THIRD PARTY (INTERTEK/SGS)';
    auditScoreRating = 'NOT RATED';
    auditRemarks = 'On-site audit scheduled for Q4 2026.';
  } else if (/not\s*audited|audit\s*required|new\s*maker|new\s*source/i.test(fullContent)) {
    auditStatus = 'AUDIT REQUIRED';
    auditedBy = 'NOT YET AUDITED';
    auditScoreRating = 'NOT RATED';
    auditRemarks = 'New manufacturer proposed. Physical QA site audit is strictly mandatory.';
  }

  // 7. Check if there are MULTIPLE item sections in the email
  const itemBlocks: { mat: string; price: number; moq: number; maker?: string }[] = [];

  existingInquiries.forEach((inq) => {
    const matNameEscaped = inq.materialName.split(' ')[0].toLowerCase();
    if (matNameEscaped.length >= 4 && fullContent.toLowerCase().includes(matNameEscaped)) {
      const inqRegex = new RegExp(`${matNameEscaped}[^\\n\\r]*?(?:usd|\\$|rate|price|@)\\s*[:=@]?\\s*(?:usd|\\$)?\\s*([\\d.]+)(?:\\s*\\/\\s*kg)?`, 'i');
      const match = fullContent.match(inqRegex);
      if (match && match[1]) {
        const p = parseFloat(match[1]);
        if (!isNaN(p) && p > 0 && p < 10000) {
          itemBlocks.push({
            mat: inq.materialName,
            price: p,
            moq: 1000,
          });
        }
      }
    }
  });

  // If specific item blocks were found, build records for each
  if (itemBlocks.length > 0) {
    itemBlocks.forEach((item, idx) => {
      const benchmark = existingInquiries.find(
        (inq) => inq.materialName.toLowerCase() === item.mat.toLowerCase()
      );
      const targetBenchmarkPriceUSD = benchmark ? benchmark.targetPriceUSD : item.price * 1.05;
      const priceVarianceUSD = targetBenchmarkPriceUSD - item.price;
      const priceVariancePct = (priceVarianceUSD / targetBenchmarkPriceUSD) * 100;
      const annualQty = benchmark ? benchmark.annualDemandQty : 20000;
      const annualSavings = priceVarianceUSD * annualQty;

      results.push({
        id: `QUO-EML-${Date.now()}-${idx}`,
        sourceType: 'OUTLOOK_EMAIL',
        inquiryRefNumber: benchmark ? benchmark.inquiryCode : 'ATCO/INQ/2026/MULTI',
        emailSubject: emailSubject || `Commercial Offer - ${item.mat}`,
        emailSender: emailSender || 'vendor@indentor.com',
        receivedDate: emailDate,
        indentorName,
        vendorManufacturer: item.maker || defaultVendorMfg,
        originCountry: defaultOrigin,
        company: benchmark ? benchmark.company : 'LAB',
        category: benchmark ? benchmark.category : 'API',
        materialCode: benchmark ? benchmark.materialCode : `1000${8000 + idx}`,
        materialName: item.mat,
        pharmacopoeiaGrade: /compacted/i.test(item.mat) ? 'USP Compacted' : 'BP/USP Standard',
        quotedRateUSD: item.price,
        quotedRatePKR: item.price * 280,
        currency: 'USD',
        originalCurrencyRate: item.price,
        uom: 'KG',
        moq: item.moq,
        packSize: '25 KG Standard Packing',
        leadTimeWeeks,
        paymentTerms,
        incoterms: incoterms as any,
        validityDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
        targetBenchmarkPriceUSD: parseFloat(targetBenchmarkPriceUSD.toFixed(2)),
        annualQtyRequirement: annualQty,
        priceVarianceUSD: parseFloat(priceVarianceUSD.toFixed(2)),
        priceVariancePct: parseFloat(priceVariancePct.toFixed(2)),
        annualSavingsPotentialUSD: parseFloat(annualSavings.toFixed(2)),
        docsAvailabilityStatus,
        dmfStatus: hasDmf ? 'AVAILABLE (OPEN/USDMF)' : 'UNDER PREPARATION',
        gmpCertificateStatus: hasGmp ? 'VALID WHO-GMP' : 'LOCAL GMP ONLY',
        coaAvailable: hasCoa,
        stabilityDataAvailable: hasStability,
        tseBseDeclared: hasTse,
        nitrosamineResidualSolventsDeclared: hasNitrosamine,
        docsScore,
        auditStatus,
        auditedBy,
        auditScoreRating,
        auditRemarks,
        emailBodySnippet: rawText.slice(0, 300) + (rawText.length > 300 ? '...' : ''),
        attachmentFileNames: [fileName],
        isLowestQuote: priceVarianceUSD > 0,
        isBestEvaluatedOffer: priceVarianceUSD > 0 && docsScore >= 4 && auditStatus === 'APPROVED',
        evaluationNotes: `Extracted from Outlook email: ${docsScore}/5 docs available, Audit: ${auditStatus}.`,
      });
    });

    return results;
  }

  // Fallback: single item extraction
  let detectedMat = 'Extracted Pharmaceutical Raw Material';
  if (/paracetamol/i.test(fullContent)) detectedMat = 'Paracetamol DC 90% Granules';
  else if (/azithromycin/i.test(fullContent)) detectedMat = 'Azithromycin Dihydrate USP';
  else if (/cefixime/i.test(fullContent)) detectedMat = 'Cefixime Trihydrate Compacted';
  else if (/metformin/i.test(fullContent)) detectedMat = 'Metformin HCl DC 95%';
  else if (/esomeprazole/i.test(fullContent)) detectedMat = 'Esomeprazole Magnesium Trihydrate Micropellets 8.5%';
  else if (/ciprofloxacin/i.test(fullContent)) detectedMat = 'Ciprofloxacin HCl Monohydrate';
  else if (/microcrystalline|mcc|avicel|comprecel/i.test(fullContent)) detectedMat = 'Microcrystalline Cellulose (Avicel PH-102)';
  else if (/clopidogrel/i.test(fullContent)) detectedMat = 'Clopidogrel Bisulfate Form-II';
  else if (/pregabalin/i.test(fullContent)) detectedMat = 'Pregabalin IP/USP';
  else {
    const matMatch = fullContent.match(/(?:material|item|product|raw material|api)\s*[:=-]\s*([^\n\r,;]+)/i);
    if (matMatch && matMatch[1]) {
      detectedMat = matMatch[1].trim();
    }
  }

  let quotedRateUSD = 10.0;
  const specificRateMatch = fullContent.match(/(?:rate|price|offer|quote|quoted|cfr|cif|fob|usd|\$)\s*[:=@]?\s*(?:usd|\$)?\s*(\d{1,4}(?:\.\d{1,3})?)/i);
  if (specificRateMatch && specificRateMatch[1]) {
    quotedRateUSD = parseFloat(specificRateMatch[1]);
  }

  const benchmark = existingInquiries.find(
    (inq) =>
      inq.materialName.toLowerCase().includes(detectedMat.toLowerCase()) ||
      detectedMat.toLowerCase().includes(inq.materialName.toLowerCase())
  );

  const targetBenchmarkPriceUSD = benchmark ? benchmark.targetPriceUSD : quotedRateUSD * 1.05;
  const priceVarianceUSD = targetBenchmarkPriceUSD - quotedRateUSD;
  const priceVariancePct = (priceVarianceUSD / targetBenchmarkPriceUSD) * 100;
  const annualQty = benchmark ? benchmark.annualDemandQty : 25000;
  const annualSavings = priceVarianceUSD * annualQty;

  results.push({
    id: `QUO-EML-${Date.now()}-0`,
    sourceType: 'OUTLOOK_EMAIL',
    inquiryRefNumber: benchmark ? benchmark.inquiryCode : 'ATCO/INQ/2026/001',
    emailSubject: emailSubject || `Commercial Offer - ${detectedMat}`,
    emailSender: emailSender || 'vendor@indentor.com',
    receivedDate: emailDate,
    indentorName,
    vendorManufacturer: defaultVendorMfg,
    originCountry: defaultOrigin,
    company: benchmark ? benchmark.company : 'LAB',
    category: benchmark ? benchmark.category : 'API',
    materialCode: benchmark ? benchmark.materialCode : '10009999',
    materialName: detectedMat,
    pharmacopoeiaGrade: /compacted/i.test(detectedMat) ? 'USP Compacted' : 'BP/USP Standard',
    quotedRateUSD,
    quotedRatePKR: quotedRateUSD * 280,
    currency: 'USD',
    originalCurrencyRate: quotedRateUSD,
    uom: 'KG',
    moq: 1000,
    packSize: '25 KG Standard Packing',
    leadTimeWeeks,
    paymentTerms,
    incoterms: incoterms as any,
    validityDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
    targetBenchmarkPriceUSD: parseFloat(targetBenchmarkPriceUSD.toFixed(2)),
    annualQtyRequirement: annualQty,
    priceVarianceUSD: parseFloat(priceVarianceUSD.toFixed(2)),
    priceVariancePct: parseFloat(priceVariancePct.toFixed(2)),
    annualSavingsPotentialUSD: parseFloat(annualSavings.toFixed(2)),
    docsAvailabilityStatus,
    dmfStatus: hasDmf ? 'AVAILABLE (OPEN/USDMF)' : 'UNDER PREPARATION',
    gmpCertificateStatus: hasGmp ? 'VALID WHO-GMP' : 'LOCAL GMP ONLY',
    coaAvailable: hasCoa,
    stabilityDataAvailable: hasStability,
    tseBseDeclared: hasTse,
    nitrosamineResidualSolventsDeclared: hasNitrosamine,
    docsScore,
    auditStatus,
    auditedBy,
    auditScoreRating,
    auditRemarks,
    emailBodySnippet: rawText.slice(0, 300) + (rawText.length > 300 ? '...' : ''),
    attachmentFileNames: [fileName],
    isLowestQuote: priceVarianceUSD > 0,
    isBestEvaluatedOffer: priceVarianceUSD > 0 && docsScore >= 4 && auditStatus === 'APPROVED',
    evaluationNotes: `Extracted from Outlook email: ${docsScore}/5 docs available, Audit: ${auditStatus}.`,
  });

  return results;
}

/**
 * Parses Excel (.xlsx/.xls) and CSV spreadsheet files across ALL sheets
 */
export async function parseExcelQuotationFile(
  file: File,
  existingInquiries: InquiryBenchmarkRecord[] = []
): Promise<VendorQuotationRecord[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const parsedQuotes: VendorQuotationRecord[] = [];

        // Iterate through all sheets
        workbook.SheetNames.forEach((sheetName, sheetIdx) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonRows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

          jsonRows.forEach((row, idx) => {
            // Normalize column keys
            const normalized: Record<string, any> = {};
            Object.keys(row).forEach((key) => {
              const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
              normalized[cleanKey] = row[key];
            });

            // Look for fields
            const indentorName =
              normalized.indentor ||
              normalized.indentorname ||
              normalized.agent ||
              normalized.broker ||
              'Direct Vendor / Excel Upload';

            const vendorManufacturer =
              normalized.vendor ||
              normalized.manufacturer ||
              normalized.mfg ||
              normalized.maker ||
              normalized.supplier ||
              'Extracted Supplier';

            const materialName =
              normalized.material ||
              normalized.materialname ||
              normalized.item ||
              normalized.itemdescription ||
              normalized.product ||
              normalized.description ||
              '';

            if (!materialName && !normalized.rate && !normalized.price) {
              return; // Skip empty header or footer rows
            }

            const rawPrice =
              normalized.rate ||
              normalized.price ||
              normalized.quotedrate ||
              normalized.quotedprice ||
              normalized.unitprice ||
              normalized.rateusd ||
              normalized.usdkgrate ||
              10.0;

            const quotedRateUSD = typeof rawPrice === 'number' ? rawPrice : parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 10.0;
            const originCountry = normalized.origin || normalized.country || 'China';
            const grade = normalized.grade || normalized.spec || normalized.pharmacopoeia || 'USP / BP Standard';
            const incoterms = normalized.incoterm || normalized.terms || 'CFR Karachi';
            const moq = parseInt(normalized.moq || normalized.minimumorderqty || '1000', 10);
            const leadTimeWeeks = parseInt(normalized.leadtime || normalized.leadtimeweeks || '4', 10);

            // Find matching inquiry
            const cleanMat = materialName || `Item #${idx + 1}`;
            const benchmark = existingInquiries.find(
              (inq) =>
                inq.materialName.toLowerCase().includes(cleanMat.toLowerCase()) ||
                cleanMat.toLowerCase().includes(inq.materialName.toLowerCase()) ||
                (normalized.materialcode && inq.materialCode === String(normalized.materialcode))
            );

            const targetBenchmarkPriceUSD = benchmark ? benchmark.targetPriceUSD : quotedRateUSD * 1.05;
            const priceVarianceUSD = targetBenchmarkPriceUSD - quotedRateUSD;
            const priceVariancePct = (priceVarianceUSD / targetBenchmarkPriceUSD) * 100;
            const annualQty = benchmark ? benchmark.annualDemandQty : 25000;

            // Docs availability detection
            const dmfVal = String(normalized.dmf || normalized.dmfstatus || '').toUpperCase();
            const gmpVal = String(normalized.gmp || normalized.gmpstatus || '').toUpperCase();
            const auditVal = String(normalized.audit || normalized.auditstatus || '').toUpperCase();

            const hasDmf = dmfVal.includes('YES') || dmfVal.includes('AVAIL') || dmfVal.includes('CEP') || dmfVal.includes('OPEN');
            const hasGmp = gmpVal.includes('WHO') || gmpVal.includes('EU') || gmpVal.includes('VALID') || gmpVal.includes('YES');
            const coaAvailable = String(normalized.coa || '').toUpperCase().includes('YES') || true;
            const stabilityDataAvailable = String(normalized.stability || '').toUpperCase().includes('YES') || true;

            let docsScore = 0;
            if (hasDmf) docsScore += 1.5;
            if (hasGmp) docsScore += 1.5;
            if (coaAvailable) docsScore += 1;
            if (stabilityDataAvailable) docsScore += 1;

            let auditStatus: AuditStatusType = 'APPROVED';
            if (auditVal.includes('SCHED')) auditStatus = 'SCHEDULED';
            else if (auditVal.includes('DESK')) auditStatus = 'DESK AUDIT ONLY';
            else if (auditVal.includes('CAPA')) auditStatus = 'CAPA PENDING';
            else if (auditVal.includes('REQ') || auditVal.includes('PENDING')) auditStatus = 'AUDIT REQUIRED';

            parsedQuotes.push({
              id: `QUO-XLS-${Date.now()}-S${sheetIdx}-R${idx}`,
              sourceType: 'EXCEL_FILE',
              inquiryRefNumber: benchmark ? benchmark.inquiryCode : `ATCO/INQ/2026/XLS-${sheetIdx + 1}`,
              emailSubject: `Excel Sheet [${sheetName}] Import: ${file.name}`,
              emailSender: `${indentorName.toLowerCase().replace(/\s+/g, '')}@import.com`,
              receivedDate: new Date().toISOString().split('T')[0],
              indentorName,
              vendorManufacturer,
              originCountry,
              company: benchmark ? benchmark.company : 'LAB',
              category: benchmark ? benchmark.category : 'API',
              materialCode: benchmark ? benchmark.materialCode : (normalized.materialcode || `1000${7000 + idx}`),
              materialName: cleanMat,
              pharmacopoeiaGrade: grade,
              quotedRateUSD,
              quotedRatePKR: quotedRateUSD * 280,
              currency: 'USD',
              originalCurrencyRate: quotedRateUSD,
              uom: 'KG',
              moq,
              packSize: '25 KG Standard Packing',
              leadTimeWeeks,
              paymentTerms: '100% LC at Sight',
              incoterms: incoterms as any,
              validityDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
              targetBenchmarkPriceUSD: parseFloat(targetBenchmarkPriceUSD.toFixed(2)),
              annualQtyRequirement: annualQty,
              priceVarianceUSD: parseFloat(priceVarianceUSD.toFixed(2)),
              priceVariancePct: parseFloat(priceVariancePct.toFixed(2)),
              annualSavingsPotentialUSD: parseFloat((priceVarianceUSD * annualQty).toFixed(2)),
              docsAvailabilityStatus: docsScore >= 4 ? 'FULL AVAILABLE' : 'PARTIAL AVAILABLE',
              dmfStatus: hasDmf ? 'AVAILABLE (OPEN/USDMF)' : 'UNDER PREPARATION',
              gmpCertificateStatus: hasGmp ? 'VALID WHO-GMP' : 'LOCAL GMP ONLY',
              coaAvailable,
              stabilityDataAvailable,
              tseBseDeclared: true,
              nitrosamineResidualSolventsDeclared: true,
              docsScore: Math.min(5, docsScore),
              auditStatus,
              auditedBy: auditStatus === 'APPROVED' ? 'ATCO QA TEAM' : 'DESK ASSESSMENT',
              auditScoreRating: auditStatus === 'APPROVED' ? 'A (HIGH COMPLIANCE)' : 'B (ACCEPTABLE WITH MINOR CAPA)',
              auditRemarks: `Imported from [${sheetName}] in ${file.name}. Audit: ${auditStatus}`,
              emailBodySnippet: `Quoted in Excel: ${cleanMat} by ${vendorManufacturer} @ $${quotedRateUSD}/kg (${incoterms}). Indentor: ${indentorName}`,
              attachmentFileNames: [file.name],
              isLowestQuote: priceVarianceUSD > 0,
              isBestEvaluatedOffer: priceVarianceUSD > 0 && docsScore >= 4 && auditStatus === 'APPROVED',
              evaluationNotes: `Excel record imported from sheet "${sheetName}".`,
            });
          });
        });

        resolve(parsedQuotes);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsBinaryString(file);
  });
}

/**
 * Process a single file of any supported format (.xlsx, .xls, .csv, .eml, .msg, .txt)
 */
export async function processSingleQuotationFile(
  file: File,
  existingInquiries: InquiryBenchmarkRecord[] = []
): Promise<BatchUploadedFileItem> {
  const fileName = file.name.toLowerCase();
  const id = `batch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const uploadTime = new Date().toLocaleTimeString();

  let fileType: BatchUploadedFileItem['fileType'] = 'unknown';
  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) fileType = 'excel';
  else if (fileName.endsWith('.csv')) fileType = 'csv';
  else if (fileName.endsWith('.eml')) fileType = 'eml';
  else if (fileName.endsWith('.msg')) fileType = 'msg';
  else if (fileName.endsWith('.txt')) fileType = 'text';

  try {
    if (fileType === 'excel' || fileType === 'csv') {
      const parsed = await parseExcelQuotationFile(file, existingInquiries);
      if (parsed.length > 0) {
        return {
          id,
          file,
          fileName: file.name,
          fileSize: file.size,
          fileType,
          status: 'success',
          statusMessage: `Parsed ${parsed.length} quotation rows across spreadsheet sheet(s).`,
          extractedQuotes: parsed,
          processedAt: uploadTime,
        };
      } else {
        return {
          id,
          file,
          fileName: file.name,
          fileSize: file.size,
          fileType,
          status: 'warning',
          statusMessage: 'Spreadsheet read successfully, but no quotation rows could be matched.',
          extractedQuotes: [],
          processedAt: uploadTime,
        };
      }
    } else if (fileType === 'eml' || fileType === 'msg' || fileType === 'text') {
      const text = await readOutlookOrTextFile(file);
      const parsed = parseOutlookEmailText(text, existingInquiries, file.name);
      if (parsed.length > 0) {
        return {
          id,
          file,
          fileName: file.name,
          fileSize: file.size,
          fileType,
          status: 'success',
          statusMessage: `Extracted ${parsed.length} quotation offer(s) from email message.`,
          extractedQuotes: parsed,
          processedAt: uploadTime,
        };
      } else {
        return {
          id,
          file,
          fileName: file.name,
          fileSize: file.size,
          fileType,
          status: 'warning',
          statusMessage: 'Email parsed, but could not detect price rates or material tokens.',
          extractedQuotes: [],
          processedAt: uploadTime,
        };
      }
    } else {
      return {
        id,
        file,
        fileName: file.name,
        fileSize: file.size,
        fileType: 'unknown',
        status: 'error',
        statusMessage: 'Unsupported extension. Please drop .xlsx, .xls, .csv, .eml, .msg, or .txt.',
        extractedQuotes: [],
        processedAt: uploadTime,
      };
    }
  } catch (err: any) {
    return {
      id,
      file,
      fileName: file.name,
      fileSize: file.size,
      fileType,
      status: 'error',
      statusMessage: `Parsing error: ${err.message || 'Corrupted file structure'}`,
      extractedQuotes: [],
      processedAt: uploadTime,
    };
  }
}

/**
 * Process multiple files concurrently
 */
export async function processBatchQuotationFiles(
  files: File[] | FileList,
  existingInquiries: InquiryBenchmarkRecord[] = []
): Promise<BatchUploadedFileItem[]> {
  const fileArray = Array.from(files);
  const promises = fileArray.map((f) => processSingleQuotationFile(f, existingInquiries));
  return Promise.all(promises);
}

/**
 * Split text that might contain multiple emails into distinct quotes
 */
export function parseMultiplePastedEmails(
  rawText: string,
  existingInquiries: InquiryBenchmarkRecord[] = []
): VendorQuotationRecord[] {
  if (!rawText || !rawText.trim()) return [];

  // Split by common dividers like ---, ===, From:, Subject:, or double newlines with header
  const chunks = rawText.split(/(?:-{4,}|={4,}|\n(?=From:\s)|\n(?=Subject:\s))/i);
  const validChunks = chunks.map((c) => c.trim()).filter((c) => c.length > 20);

  if (validChunks.length <= 1) {
    return parseOutlookEmailText(rawText, existingInquiries, 'Pasted_Email_Thread.eml');
  }

  const allParsed: VendorQuotationRecord[] = [];
  validChunks.forEach((chunk, idx) => {
    const parsed = parseOutlookEmailText(chunk, existingInquiries, `Pasted_Email_Chunk_${idx + 1}.eml`);
    allParsed.push(...parsed);
  });

  return allParsed;
}

/**
 * Export Indentor Comparison Sheet to Excel Workbook
 */
export function exportComparisonToExcel(
  quotations: VendorQuotationRecord[],
  inquiries: InquiryBenchmarkRecord[]
) {
  const exportRows = quotations.map((q) => ({
    'Inquiry Code': q.inquiryRefNumber || '-',
    'Material Code': q.materialCode || '-',
    'Material Name': q.materialName,
    'Pharmacopoeial Grade': q.pharmacopoeiaGrade || '-',
    'Indentor / Agent': q.indentorName,
    'Manufacturer / Vendor': q.vendorManufacturer,
    'Origin Country': q.originCountry,
    'Quoted Rate (USD/KG)': q.quotedRateUSD,
    'Quoted Rate (PKR/KG)': q.quotedRatePKR,
    'Target Benchmark Price (USD)': q.targetBenchmarkPriceUSD,
    'Variance vs Target ($)': q.priceVarianceUSD,
    'Variance (%)': `${q.priceVariancePct > 0 ? '+' : ''}${q.priceVariancePct}%`,
    'Annual Demand (KG)': q.annualQtyRequirement,
    'Annual Net Saving Potential ($)': q.annualSavingsPotentialUSD,
    'Incoterms': q.incoterms,
    'Payment Terms': q.paymentTerms,
    'MOQ (KG)': q.moq,
    'Lead Time (Weeks)': q.leadTimeWeeks,
    'DMF / CEP Status': q.dmfStatus,
    'GMP Certificate': q.gmpCertificateStatus,
    'COA Available': q.coaAvailable ? 'YES' : 'NO',
    'Zone IVb Stability': q.stabilityDataAvailable ? 'YES' : 'NO',
    'Docs Completeness': q.docsAvailabilityStatus,
    'Audit Status': q.auditStatus,
    'Audited By': q.auditedBy || '-',
    'Audit Score': q.auditScoreRating || '-',
    'Audit Remarks': q.auditRemarks || '-',
    'Lowest Rate Flag': q.isLowestQuote ? 'YES - LOWEST' : 'NO',
    'Best Evaluated Offer': q.isBestEvaluatedOffer ? 'YES - TOP RECOMMENDED' : 'NO',
    'Source Type': q.sourceType,
    'Received Date': q.receivedDate,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Indentor_Comparison_Matrix');
  XLSX.writeFile(workbook, `ATCO_Indentor_Vendor_Comparison_${new Date().toISOString().split('T')[0]}.xlsx`);
}
