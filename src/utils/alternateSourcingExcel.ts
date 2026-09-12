import * as XLSX from 'xlsx';
import { InquiryMaterialItem, IndentorQuoteResponse, DesignatedIndentor } from '../types';
import { matchMaterialToAtcoSpec } from './atcoSpecsMatcher';

export function parseInquiryExcel(fileData: ArrayBuffer): Partial<InquiryMaterialItem>[] {
  const workbook = XLSX.read(fileData, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  
  // Parse rows as raw 2D array or object
  const rows: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
  if (rows.length < 2) return [];

  // Find header row: look for row containing "Material Code" or "MATERIAL CODE" or "IMPORT/LOCAL"
  let headerIndex = 0;
  for (let i = 0; i < Math.min(rows.length, 6); i++) {
    const rowStr = JSON.stringify(rows[i]).toLowerCase();
    if (rowStr.includes('material code') || rowStr.includes('material name') || rowStr.includes('import/local')) {
      headerIndex = i;
      break;
    }
  }

  const headers = (rows[headerIndex] || []).map((h: any) => String(h || '').trim().toLowerCase());
  const dataRows = rows.slice(headerIndex + 1);

  const findCol = (terms: string[]) => {
    return headers.findIndex((h: string) => terms.some(t => h.includes(t.toLowerCase())));
  };

  const colImportLocal = findCol(['import/local', 'import / local', 'import-local', 'import or local', 'import_local', 'sourcing type']);
  const colMatCode = findCol(['material code', 'mat code', 'item code']);
  const colMatName = findCol(['material name', 'item name', 'description']);
  const colAnnualQty = findCol(['annual qty', 'annual quantity', 'annual demand']);
  const colPerLotQty = findCol(['per lot qty', 'lot qty', 'batch qty']);
  const colUom = findCol(['uom', 'unit']);
  const colLastPrice = findCol(['last buying price in usd', 'last buying price', 'last purchase price', 'last price in usd', 'last rate', 'lbp']);
  const colShipMode = findCol(['shipment mode', 'mode', 'shipment']);
  const colApiExp = findCol(['api/exp', 'api / exp', 'category', 'classification']);
  const colPreferMfg = findCol(['prefer mfg', 'preferred mfg', 'innovator']);
  const colPreferOrigin = findCol(['prefer origin', 'preferred origin']);
  const colAtcoOrigin = findCol(['atco preferred origin', 'atco required sources']);
  const colInitialSample = findCol(['initial sample', '1st lot', 'sample qty from 1st lot']);
  const colTrialSample = findCol(['trial sample', '2nd lot', 'sample qty from 2nd lot']);
  const colActiveMfgs = findCol(['active mfg', 'approved mfg', 'current mfg']);
  const colCustomData = findCol(['custom data', 'pral', 'import data']);
  const colUnderDev = findCol(['under development', 'status', 'pipeline stage']);

  const parsedItems: Partial<InquiryMaterialItem>[] = [];

  dataRows.forEach((row: any[], idx: number) => {
    const code = colMatCode >= 0 ? String(row[colMatCode] || '').trim() : '';
    const name = colMatName >= 0 ? String(row[colMatName] || '').trim() : '';
    if (!code && !name) return;

    // Parse IMPORT/LOCAL (Admin internal)
    let importOrLocal: 'IMPORT' | 'LOCAL' = 'IMPORT';
    if (colImportLocal >= 0) {
      const val = String(row[colImportLocal] || '').toUpperCase();
      if (val.includes('LOCAL')) importOrLocal = 'LOCAL';
    }

    const annualQty = colAnnualQty >= 0 ? parseFloat(String(row[colAnnualQty]).replace(/,/g, '')) || 0 : 0;
    const perLotQty = colPerLotQty >= 0 ? parseFloat(String(row[colPerLotQty]).replace(/,/g, '')) || 0 : 0;
    const uom = colUom >= 0 ? String(row[colUom] || 'KG').trim().toUpperCase() : 'KG';
    
    // Parse Last Buying Price in USD (Admin internal)
    const lastBuyingPriceUSD = colLastPrice >= 0 ? parseFloat(String(row[colLastPrice]).replace(/[$,]/g, '')) || undefined : undefined;
    
    const shipmentMode = colShipMode >= 0 && String(row[colShipMode]).toUpperCase().includes('AIR') ? 'AIR' : 'SEA';
    const apiExp = colApiExp >= 0 && String(row[colApiExp]).toUpperCase().includes('EXP') ? 'EXCIPIENT' : 'API';
    const preferMfg = colPreferMfg >= 0 ? String(row[colPreferMfg] || '').trim() : '';
    const preferOrigin = colPreferOrigin >= 0 ? String(row[colPreferOrigin] || '').trim() : '';
    const atcoPreferredOrigin = colAtcoOrigin >= 0 ? String(row[colAtcoOrigin] || '').trim() : '';
    const approxInitialSampleQty = colInitialSample >= 0 ? String(row[colInitialSample] || '').trim() : '200g 1st lot + WS';
    const approxTrialSampleQty = colTrialSample >= 0 ? String(row[colTrialSample] || '').trim() : '1kg 2nd lot';
    const activeMfgs = colActiveMfgs >= 0 ? String(row[colActiveMfgs] || '').trim() : '';
    const customDataMfgs = colCustomData >= 0 ? String(row[colCustomData] || '').trim() : '';
    const underDevelopmentStatus = (colUnderDev >= 0 ? String(row[colUnderDev] || '').trim() : 'Pending Inquiry') as any;

    const finalCode = code || `1110000${idx + 21}`;
    const finalName = name || 'PHARMACEUTICAL RAW MATERIAL';
    const autoMatched = matchMaterialToAtcoSpec(finalCode, finalName);

    parsedItems.push({
      id: `imported-${Date.now()}-${idx}`,
      importOrLocal,
      materialCode: finalCode,
      materialName: finalName,
      atcoSpecsDoc: autoMatched.match || undefined,
      annualQty: annualQty || 1000,
      perLotQty: perLotQty || 250,
      uom: uom || 'KG',
      lastBuyingPriceUSD: lastBuyingPriceUSD || (lastBuyingPriceUSD === 0 ? 0 : undefined),
      benchmarkPriceUSD: lastBuyingPriceUSD,
      shipmentMode: shipmentMode,
      apiExp: apiExp,
      preferMfg,
      preferOrigin,
      atcoPreferredOrigin,
      approxInitialSampleQty,
      approxTrialSampleQty,
      activeMfgs,
      customDataMfgs,
      underDevelopmentStatus: underDevelopmentStatus || 'Pending Inquiry',
      assignedIndentorIds: ['frabbi', 'dawn', 'morgan', 'sinochem'],
      responses: {},
    });
  });

  return parsedItems;
}

/**
 * Downloads the Master Inquiry Template matching Image 1 exact structure
 * Contains Admin-internal columns: IMPORT/LOCAL, Last Buying Price in USD, Active MFGs, Custom Data, Under Development Status
 */
export function downloadMasterInquiryTemplate() {
  const headers = [
    'IMPORT/LOCAL',
    'Material Code',
    'Material Name',
    'Annual Qty',
    'Per Lot Qty',
    'UOM',
    'Last Buying Price in USD',
    'Shipment Mode',
    'API/EXP',
    'Prefer Mfg (For reference only, if you can arrange)',
    'Prefer Origin (For reference only)',
    'Atco Preferred Origin You may Quote from another Origin also (Ack required)',
    'Approximate Initial Sample Qty from 1st lot (Ack required)',
    'Approximate Trial Sample Qty from 2nd lot (Ack required)',
    'Active MFGs (Admin Internal)',
    'Custom Data MFGs (Admin Internal)',
    'Under Development Status (Admin Internal)',
  ];

  const sampleRows = [
    [
      'IMPORT',
      '111000016',
      'NEOMYCIN SULPHATE BP',
      1500,
      500,
      'KG',
      28.50,
      'SEA',
      'API',
      'Pharmacia (originator); Sinopharm; DSM Sinochem; North China Pharmaceutical; Nectar Lifesciences',
      'China / India',
      'India/Europe',
      '200g 1st lot + WS',
      '3kg 2nd lot',
      'Sinopharm (China - Tier 1 AVL), Nectar Life (India)',
      'Customs rate: $28.40/KG (PRAL WeBOC 2024-25, 4,200 KG imported)',
      'Sample Under Testing',
    ],
    [
      'LOCAL',
      '111000017',
      'NICOTINAMIDE BP',
      50,
      25,
      'KG',
      13.00,
      'AIR',
      'API',
      'DSM-Firmenich; Lonza Group; Zhejiang Wild Wind; Jubilant Ingrevia; Shandong Luwei',
      'China / Switzerland',
      'China/Europe',
      '200g 1st lot + WS',
      '1kg 2nd lot',
      'Lonza Group (Switzerland - Direct)',
      'Customs rate: $12.50/KG (PRAL 2024-25)',
      'Pending Inquiry',
    ],
    [
      'IMPORT',
      '111000018',
      'PARACETAMOL DC 90% BP',
      120000,
      10000,
      'KG',
      4.80,
      'SEA',
      'API',
      'Granules India Ltd; Farmson Pharmaceuticals; Anhui BBCA',
      'India / China',
      'India',
      '500g 1st lot + WS',
      '15kg 2nd lot',
      'Granules India Ltd (Approved AVL)',
      'Customs rate: $4.55 - $4.70/KG',
      'At Stability',
    ],
  ];

  const wsData = [headers, ...sampleRows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  ws['!cols'] = [
    { wch: 15 },
    { wch: 15 },
    { wch: 35 },
    { wch: 12 },
    { wch: 12 },
    { wch: 8 },
    { wch: 24 },
    { wch: 15 },
    { wch: 10 },
    { wch: 45 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 30 },
    { wch: 35 },
    { wch: 25 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Inquiry_Master_Admin');
  XLSX.writeFile(wb, 'Atco_Alternate_Sourcing_Master_Admin_Template.xlsx');
}

/**
 * Downloads the Restricted Indenter Template matching Image 2 exact structure
 * STRICTLY OMITS: IMPORT/LOCAL, Last Buying Price in USD, Active MFGs, Custom Data, and Under Development Status
 */
export function downloadIndentorBlankInquiryTemplate(materials?: InquiryMaterialItem[]) {
  const headers = [
    'Material Code',
    'Material Name',
    'Annual Qty',
    'Per Lot Qty',
    'UOM',
    'Shipment Mode',
    'API/EXP',
    'Prefer Mfg (For reference only, if you can arrange)',
    'Prefer Origin (For reference only)',
    'Atco Preferred Origin from below Origins (You may Quote from another Origin also)',
    'Approximate Initial Sample Qty from 1st lot (Ack required)',
    'Supp Response (Yes/No)',
    'Approximate Trial Sample Qty from 2nd lot (Ack required)',
    'Supp Response (Yes/No)',
    'Remarks If Any (regarding FOC sample Qty supplier can provide or any other Information)',
    'Manufacturer Name',
    'Mfg Origin',
    'Supplier Name (If Any)',
    'Mfg. Rates Required (Against shared per Lot Qty)',
    'Ack from Supplier that COA is 100% comply as per shared Atco specs (Yes/No)',
    'Supplier Remarks (If Any related to COA/specs)',
    'Manufacturer Client List (Local/Export)',
    'Audit Ack Required (Must be Conducted by Supplier/Mfg. during Stability)',
    'US FDA',
    'CEP',
    'TGA/KDMF/JDMF/Anvisa (Brazile)',
    'Technical Docs availability Status (Yes/No)',
    'Questionnaire',
    'Agreement',
    'DMF (Open Part Available)',
    'DMF (Close Part Available)',
    'GMP',
    'DML',
    'MSDS',
    'STABILITY Accelerated 6-month',
    'STABILITY Long-term Zone IV A/B (As per material shelf-life)',
    'ISO',
    'HALAL CERTIFICATE',
    'TSE/BSE',
    'SMF',
    'Nitrosamine declaration',
    'Transportation Declaration',
    'Google Drive Folder Link (Mandatory Dossier)',
  ];

  const rows = (materials && materials.length > 0 ? materials : [
    {
      materialCode: '111000016',
      materialName: 'NEOMYCIN SULPHATE BP',
      annualQty: 1500,
      perLotQty: 500,
      uom: 'KG',
      shipmentMode: 'SEA',
      apiExp: 'API',
      preferMfg: 'Pharmacia (originator); Sinopharm; DSM Sinochem; North China Pharmaceutical; Nectar Lifesciences',
      preferOrigin: 'China / India',
      atcoPreferredOrigin: 'India/Europe',
      approxInitialSampleQty: '200g 1st lot + WS',
      approxTrialSampleQty: '3kg 2nd lot',
    },
    {
      materialCode: '111000017',
      materialName: 'NICOTINAMIDE BP',
      annualQty: 50,
      perLotQty: 25,
      uom: 'KG',
      shipmentMode: 'AIR',
      apiExp: 'API',
      preferMfg: 'DSM-Firmenich; Lonza Group; Zhejiang Wild Wind; Jubilant Ingrevia; Shandong Luwei',
      preferOrigin: 'China / Switzerland',
      atcoPreferredOrigin: 'China/Europe',
      approxInitialSampleQty: '200g 1st lot + WS',
      approxTrialSampleQty: '1kg 2nd lot',
    },
  ]).map((m) => [
    m.materialCode,
    m.materialName,
    m.annualQty,
    m.perLotQty,
    m.uom,
    m.shipmentMode,
    m.apiExp,
    m.preferMfg || '',
    m.preferOrigin || '',
    m.atcoPreferredOrigin || '',
    m.approxInitialSampleQty || '200g 1st lot + WS',
    '', // Supp Response
    m.approxTrialSampleQty || '1kg 2nd lot',
    '', // Supp Response
    '', // Remarks
    '', // Mfg Name
    '', // Mfg Origin
    '', // Supplier Name
    '', // Rates
    '', // COA Ack
    '', // Remarks
    '', // Client List
    '', // Audit
    '', '', '', // Int Certs
    '', '', '', '', '', '', '', '', // Docs
    '', '', // Stability
    '', '', '', '', '', '', // Certs
    '', // Google Drive
  ]);

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Inquiry_Floated_To_Vendor');
  XLSX.writeFile(wb, 'Atco_Sourcing_Inquiry_Vendor_RFX_Template.xlsx');
}

/**
 * Downloads the Side-by-Side Comparative Evaluation Statement Excel file
 * Includes Admin-only benchmark and last buying price comparisons
 */
export function exportComparativeEvaluationExcel(
  materials: InquiryMaterialItem[],
  indentors: DesignatedIndentor[],
  inquiryTitle: string
) {
  const wb = XLSX.utils.book_new();
  const flatData: any[] = [];

  materials.forEach((mat) => {
    const responses = Object.values(mat.responses || {}).filter(
      (r) => r.status === 'SUBMITTED'
    );

    const historicalBenchmark = mat.lastBuyingPriceUSD || mat.benchmarkPriceUSD;

    if (responses.length === 0) {
      flatData.push({
        'IMPORT/LOCAL': mat.importOrLocal || 'IMPORT',
        'Material Code': mat.materialCode,
        'Material Name': mat.materialName,
        'Annual Demand (KG)': mat.annualQty,
        'Per Lot Qty': mat.perLotQty,
        'Shipment Mode': mat.shipmentMode,
        'Last Buying Price in USD': historicalBenchmark !== undefined ? `$${historicalBenchmark.toFixed(2)}` : 'N/A',
        'Active MFGs (Internal)': mat.activeMfgs,
        'Custom Data (Internal)': mat.customDataMfgs,
        'Under Dev Status (Internal)': mat.underDevelopmentStatus,
        'Indentor / Agent': 'No submissions received yet',
        'Proposed Manufacturer': '-',
        'Manufacturer Origin': '-',
        'Quoted Rate ($)': '-',
        'Incoterm': '-',
        'Unit Variance ($/KG)': '-',
        'Annual Net Savings ($)': '-',
        '1st Lot Sample Ack': '-',
        '2nd Lot Sample Ack': '-',
        'COA 100% Ack': '-',
        'Audit Ack': '-',
        'US FDA': '-',
        'CEP': '-',
        'DMF Open/Close': '-',
        'Zone IV Stability': '-',
        'Google Drive Dossier': '-',
      });
      return;
    }

    responses.forEach((resp) => {
      const benchmark = historicalBenchmark || resp.quotedRateNumeric || 0;
      const unitSaving = benchmark - (resp.quotedRateNumeric || 0);
      const totalSaving = unitSaving * mat.annualQty;

      // Calculate Price Variance (%) & Total Commercial Impact vs Last Buying Price
      let priceVariancePercentStr = 'N/A';
      let commercialImpactStr = 'N/A';

      if (mat.lastBuyingPriceUSD && resp.quotedRateNumeric) {
        const variancePct = ((resp.quotedRateNumeric - mat.lastBuyingPriceUSD) / mat.lastBuyingPriceUSD) * 100;
        const totalImpact = (resp.quotedRateNumeric - mat.lastBuyingPriceUSD) * mat.annualQty;
        const reductionOrIncrease = variancePct < 0 ? 'Price Reduction' : variancePct > 0 ? 'Price Increase' : 'Parity';
        priceVariancePercentStr = `${variancePct > 0 ? '+' : ''}${variancePct.toFixed(1)}% (${reductionOrIncrease})`;
        commercialImpactStr = `${totalImpact > 0 ? '+' : ''}$${Math.round(totalImpact).toLocaleString()} (${totalImpact < 0 ? 'Savings' : totalImpact > 0 ? 'Extra Cost' : 'Neutral'})`;
      }

      const docsCount = resp.uploadedDocs?.length || 0;
      const docsSummary = docsCount > 0
        ? `${docsCount} Attached: ${resp.uploadedDocs?.map((d) => d.docType).join(', ')}`
        : 'No files attached';

      flatData.push({
        'IMPORT/LOCAL': mat.importOrLocal || 'IMPORT',
        'Material Code': mat.materialCode,
        'Material Name': mat.materialName,
        'Atco Specs Linked': mat.atcoSpecsDoc?.fileName || 'Standard Monograph',
        'Annual Demand (KG)': mat.annualQty,
        'Per Lot Qty': mat.perLotQty,
        'Shipment Mode': mat.shipmentMode,
        'Last Buying Price in USD': mat.lastBuyingPriceUSD !== undefined ? `$${mat.lastBuyingPriceUSD.toFixed(2)}` : 'N/A',
        'Quoted Rate ($)': resp.quotedRateNumeric !== undefined ? `$${resp.quotedRateNumeric.toFixed(2)}` : resp.quotedRate,
        'Price Variance (%)': priceVariancePercentStr,
        'Total Commercial Impact ($)': commercialImpactStr,
        'Active MFGs (Internal)': mat.activeMfgs,
        'Custom Data (Internal)': mat.customDataMfgs,
        'Under Dev Status (Internal)': mat.underDevelopmentStatus,
        'Indentor / Agent': resp.indentorName,
        'Proposed Manufacturer': resp.manufacturerName,
        'Manufacturer Origin': resp.mfgOrigin,
        'Incoterm': resp.incoterm || 'CPT Air Khi',
        'Vendor Attached Docs': docsSummary,
        '1st Lot Sample Ack': resp.sample1stLotAck || 'Pending',
        '2nd Lot Sample Ack': resp.sample2ndLotAck || 'Pending',
        'COA 100% Ack': resp.coaAck || 'Pending',
        'Audit Ack': resp.auditAck || 'Pending',
        'US FDA': resp.certUsFda || 'N/A',
        'CEP': resp.certCep || 'N/A',
        'DMF Open/Close': `${resp.dmfOpen === 'YES' ? 'Open:YES' : 'Open:NO'} / ${resp.dmfClose === 'YES' ? 'Close:YES' : 'Close:NO'}`,
        'Zone IV Stability': resp.stabilityLongTermZoneIV || 'N/A',
        'Google Drive Dossier': resp.googleDriveFolderLink || 'Folder Linked',
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(flatData);

  ws['!cols'] = [
    { wch: 14 },
    { wch: 15 },
    { wch: 35 },
    { wch: 16 },
    { wch: 14 },
    { wch: 14 },
    { wch: 24 },
    { wch: 30 },
    { wch: 35 },
    { wch: 22 },
    { wch: 28 },
    { wch: 35 },
    { wch: 20 },
    { wch: 16 },
    { wch: 16 },
    { wch: 20 },
    { wch: 22 },
    { wch: 16 },
    { wch: 16 },
    { wch: 15 },
    { wch: 14 },
    { wch: 12 },
    { wch: 12 },
    { wch: 20 },
    { wch: 18 },
    { wch: 35 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Comparative_Evaluation');
  XLSX.writeFile(wb, `Atco_Comparative_Evaluation_Statement_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

