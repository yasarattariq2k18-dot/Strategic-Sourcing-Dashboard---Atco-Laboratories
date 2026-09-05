import Papa from 'papaparse';
import {
  AlternateUnderDevRecord,
  MaturityCommercializedRecord,
  CphiSavingRecord,
  HistoricVarianceRecord,
  ProjectCommercialSavingRecord,
  ActiveMaterialMasterRecord,
} from '../types';
import { parseNumberSafe } from './currency';

/**
 * Robust case-insensitive and fuzzy header lookup
 */
function getField(row: Record<string, any>, possibleKeys: string[]): any {
  // 1. Exact match
  for (const k of possibleKeys) {
    if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
      return row[k];
    }
  }
  // 2. Normalized lookup (case-insensitive, ignoring special characters and spaces)
  const normalizedRow: Record<string, any> = {};
  for (const [key, val] of Object.entries(row)) {
    const cleanKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    normalizedRow[cleanKey] = val;
  }
  for (const k of possibleKeys) {
    const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalizedRow[cleanK] !== undefined && normalizedRow[cleanK] !== null && String(normalizedRow[cleanK]).trim() !== '') {
      return normalizedRow[cleanK];
    }
  }
  return undefined;
}

export function parseUnderDevCSV(csvText: string): AlternateUnderDevRecord[] {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true, dynamicTyping: false });
  return (parsed.data as any[]).map((row, index) => {
    const rawStage = String(
      getField(row, [
        'Development Stage',
        'Stage',
        'Under Dev Stage',
        'Development_Stage',
        'Current Stage',
        'Status',
        'Stage Name',
        'Pipeline Stage',
      ]) || ''
    ).trim().toUpperCase();

    let stage = 'UNDER ARRANGEMENT';
    if (rawStage.includes('STABILITY') || rawStage.includes('STAB')) {
      stage = 'AT STABILITY';
    } else if (rawStage.includes('PRIORITY') || rawStage.includes('PD')) {
      stage = 'AT PD PRIORITY';
    } else if (rawStage.includes('TEST') || rawStage.includes('INITIAL') || rawStage.includes('LAB')) {
      stage = 'INITIAL TESTING';
    } else if (rawStage.includes('ARR') || rawStage.includes('SAMPLE')) {
      stage = 'UNDER ARRANGEMENT';
    } else {
      stage = rawStage || (index % 4 === 0 ? 'INITIAL TESTING' : index % 4 === 1 ? 'AT STABILITY' : index % 4 === 2 ? 'AT PD PRIORITY' : 'UNDER ARRANGEMENT');
    }

    const materialCode = String(
      getField(row, ['Material Code', 'Material_Code', 'MaterialCode', 'Item Code', 'Code', 'Mat Code', 'Material No']) ||
      `111000${100 + index}`
    ).trim();

    const materialName = String(
      getField(row, ['Material Name', 'Material Description', 'Material_Description', 'Description', 'Item Description', 'Material', 'Item Name']) ||
      `Pharmaceutical Active Material ${index + 1}`
    ).trim();

    const manufacturerName = String(
      getField(row, ['Manufacturer Name', 'Under Dev Mfg', 'Alternate Manufacturer', 'Alternate Mfg', 'Sample Manufacturer Name', 'Manufacturer', 'Vendor', 'Mfg Name']) ||
      'Alternate Approved Manufacturer'
    ).trim();

    const commercialMfgName = String(
      getField(row, ['Com Mfg Name', 'Existing Com Mfg Name', 'Commercial Mfg Name', 'Commercialized Manufacturer Name', 'Approved Mfg', 'Current Approved Mfg', 'Current Manufacturer', 'Existing Source']) ||
      'Current Approved Source'
    ).trim();

    const rawCompany = String(getField(row, ['Company', 'COMPANY', 'Plant', 'Business Unit', 'Unit']) || 'LAB').toUpperCase();
    const company = rawCompany.includes('AHL') ? 'AHL' : 'LAB';

    const netPriceUSD = parseNumberSafe(getField(row, ['Net Price in USD', 'Net Price', 'Net Price USD', 'Price USD', 'Current Price']) || 0);
    const perLotQty = parseNumberSafe(getField(row, ['Per Lot Qty', 'Lot Qty', 'Batch Qty', 'MOQ']) || 0);
    const annualQty = parseNumberSafe(getField(row, ['Annual Qty', 'Annual Demand', 'Yearly Qty', '12M Qty', 'Quantity']) || 0);
    const uom = String(getField(row, ['UOM', 'Unit', 'Unit of Measure']) || 'KG').trim();

    const existingSourceTotalAnnualValue = parseNumberSafe(
      getField(row, ['Existing source Total annual value', 'Existing Source Annual Value', 'Existing Value', 'Current Annual Value']) || 0
    );
    const underDevSourceTotalAnnualValue = parseNumberSafe(
      getField(row, ['Under Dev source Total annual value', 'Under Dev Annual Value', 'New Source Annual Value', 'Proposed Annual Value']) || 0
    );

    const netSavingLoss = parseNumberSafe(
      getField(row, ['Net Saving/Loss', 'Net Saving', 'Saving/Loss']) || 0
    );

    const percentageSavingLoss = parseNumberSafe(
      getField(row, ['%Age Saving/Loss', '% Saving', 'Percentage Saving', '% Age (Sav/Los)']) || 0
    );

    const savingLossStatus = String(
      getField(row, ['Saving/Loss', 'Saving Loss Status', 'Status (Sav/Los)']) || (netSavingLoss >= 0 ? 'Saving' : 'Loss')
    ).trim();

    const bestNetSavingLoss = parseNumberSafe(
      getField(row, ['Best Net Saving/Loss', 'Best Saving', 'Best Net Saving']) || 0
    );

    const existingSourceTotalAnnualValue10Percent = parseNumberSafe(
      getField(row, ['Existing source Total annual value (10% Qty)', 'Existing source 10% Qty', 'Existing source (10% Qty)']) || 0
    );

    const underDevSourceTotalAnnualValue10Percent = parseNumberSafe(
      getField(row, ['Under Dev source Total annual value (10% Qty)', 'Under Dev source 10% Qty', 'Under Dev source (10% Qty)']) || 0
    );

    const netSavingLoss10Percent = parseNumberSafe(
      getField(row, ['Net Saving/Loss (10% Qty)', 'Net Saving 10% Qty', 'Net Saving (10% Qty)']) || 0
    );

    const percentageSavingLoss10Percent = parseNumberSafe(
      getField(row, ['%Age Saving/Loss (10% Qty)', '% Saving (10% Qty)', '%Age Saving (10% Qty)']) || 0
    );

    const savingLossStatus10Percent = String(
      getField(row, ['Saving/Loss (10% Qty)', 'Saving Loss Status (10% Qty)']) || ''
    ).trim();

    const rawAnnualNetSavingStr = String(
      getField(row, [
        'Annual Net Saving',
        'Annual Net Saving USD',
        'Annual Net Saving ($)',
        'Tentative Saving',
      ]) || ''
    ).trim();

    const hasAnnualNetSavingValue = rawAnnualNetSavingStr !== '';
    const rawAnnualNetSavingUSD = hasAnnualNetSavingValue ? parseNumberSafe(rawAnnualNetSavingStr) : 0;
    const annualNetSavingUSD = hasAnnualNetSavingValue ? rawAnnualNetSavingUSD : netSavingLoss;

    return {
      id: `ud-${index}-${materialCode}`,
      developmentStage: stage,
      stage: stage,
      materialClassification: String(getField(row, ['Material Classification', 'Classification', 'Category', 'Material Group']) || 'SINGLE SOURCE').trim(),
      sampleSubmissionDate: String(getField(row, ['Sample Submission Date', 'Submission Date', 'Date', 'Sample Date']) || '24/08/2026').trim(),
      materialCode,
      activeMfgCount: parseNumberSafe(getField(row, ['Active Mfg Count', 'Mfg Count', 'Approved Mfg Count']) || 1),
      company,
      materialName,
      manufacturerName,
      sampleManufacturerName: manufacturerName,
      underDevMfg: manufacturerName,
      origin: String(getField(row, ['Origin', 'Country', 'Mfg Origin']) || 'China').trim(),
      indentorName: String(getField(row, ['Indentor Name', 'Indentor', 'Agent', 'Supplier Name']) || 'Direct / Indentor').trim(),
      developmentRates: getField(row, ['Development Rates', 'Dev Rates', 'Sample Rate']) || '',
      commercialMfgName,
      currentManufacturer: commercialMfgName,
      netPriceUSD,
      perLotQty,
      uom,
      annualQty,
      existingSourceTotalAnnualValue,
      underDevSourceTotalAnnualValue,
      netSavingLoss,
      percentageSavingLoss,
      savingLossStatus,
      bestNetSavingLoss,
      existingSourceTotalAnnualValue10Percent,
      underDevSourceTotalAnnualValue10Percent,
      netSavingLoss10Percent,
      percentageSavingLoss10Percent,
      savingLossStatus10Percent,
      annualNetSavingUSD,
      hasAnnualNetSavingValue,
      rawAnnualNetSavingUSD,
    };
  });
}

export function parseMaturityCSV(csvText: string): MaturityCommercializedRecord[] {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  return (parsed.data as any[]).map((row, index) => ({
    id: `mat-${index}-${row['Material Code'] || index}`,
    maturityStatus: (row['Maturity Status'] || 'NON MATURED').trim().toUpperCase(),
    indentor: (row['Indentor'] || '').trim(),
    status: (row['Status'] || 'ACTIVE').trim().toUpperCase(),
    company: (row['COMPANY'] || row['Company'] || 'LAB').trim().toUpperCase(),
    materialCode: String(row['Material Code'] || '').trim(),
    materialName: (row['Material Name'] || '').trim(),
    manufacturerName: (row['Manufacturer Name'] || '').trim(),
    origin: (row['Origin'] || '').trim(),
    commercializedMfgName: (row['Commercialized Manufacturer Name'] || '').trim(),
    perLotQty: parseNumberSafe(row['Per Lot Qty'] || 0),
    lastNetPriceUSDExist: parseNumberSafe(row['Last Net Price in USD(Exist Sour)'] || 0),
    perLotValueExistUSD: parseNumberSafe(row['Per Lot Value ($)-Exist Sourc'] || 0),
    annualQtyJul25Jun26: parseNumberSafe(row['Annual Qty Jul 2025 to Jun 2026'] || 0),
    uom: (row['UOM'] || 'KG').trim(),
    newSourcePerLotPriceUSD: parseNumberSafe(row['New Sourc Per lot Price($)'] || 0),
    perLotValueNewSourceUSD: parseNumberSafe(row['Per lot Value - New Source $'] || 0),
    perLotDiffUSD: parseNumberSafe(row['Per Lot Diff'] || 0),
    perAnnumValueExistUSD: parseNumberSafe(row['Per Annum Value $ - Exist Sou'] || 0),
    perAnnumValueNewUSD: parseNumberSafe(row['Per Annum Value $ - New Sou'] || 0),
    perAnnumDiffUSD: parseNumberSafe(row['Per Annum Diff'] || 0),
    annualNetSavingUSD: parseNumberSafe(row['Annual Net Saving'] || row['Per Annum Diff'] || 0),
    avlAddedDate: row['AVL Added Dt'] || '',
    lastPoDate: row['Last PO date'] || '',
    orderingStatus: (row['Ordering'] || '').trim(),
    openPrDate: (row['Open PR & Date'] || '').trim(),
    materialClassification: (row['Material Classification'] || '').trim(),
  }));
}

export function parseCphiCSV(csvText: string): CphiSavingRecord[] {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  return (parsed.data as any[]).map((row, index) => ({
    id: `cphi-${index}-${row['Material Code'] || index}`,
    category: (row['Category'] || 'CPHI Materials').trim(),
    date: (row['Date'] || '').trim(),
    materialCode: String(row['Material Code'] || '').trim(),
    materialName: (row['Material Name'] || '').trim(),
    manufacturerName: (row['Manufacturer Name'] || '').trim(),
    poQuantity: parseNumberSafe(row['PO Quantity'] || 0),
    netPriceUSD: parseNumberSafe(row['Net Price in USD'] || 0),
    annualQty: parseNumberSafe(row['Annual Qty'] || 0),
    uom: (row['UOM'] || 'KG').trim(),
    budgetPriceUSD: parseNumberSafe(row['Budget Price $'] || 0),
    poValueExistingUSD: parseNumberSafe(row['PO Value (Existing)'] || 0),
    poValueBudgetUSD: parseNumberSafe(row['PO Value (Budget Price)'] || 0),
    netSavingsValueUSD: parseNumberSafe(row['Net Savings Value $'] || 0),
    percentageDiff: parseNumberSafe(row['%Age Diff'] || 0),
  }));
}

export function parseHistoricVarianceCSV(csvText: string): HistoricVarianceRecord[] {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  return (parsed.data as any[]).map((row, index) => ({
    id: `hist-${index}-${row['Material Code'] || index}`,
    year: (row['Year'] || '').trim(),
    materialCode: String(row['Material Code'] || '').trim(),
    company: (row['Company'] || 'LAB').trim().toUpperCase(),
    materialName: (row['Material Name'] || '').trim(),
    supplierName: (row['Supplier Name'] || '').trim(),
    manufacturerName: (row['Manufacturer Name'] || '').trim(),
    poQuantity: parseNumberSafe(row['PO Quantity'] || 0),
    uom: (row['UOM'] || 'KG').trim(),
    netPriceUSD: parseNumberSafe(row['Net Price in USD'] || 0),
    historicDate: row['Historic Date'] || '',
    latestHistoricNetPriceUSD: parseNumberSafe(row['Latest Historic Net Price USD'] || 0),
    historicSupplierName: (row['Historic Supplier Name'] || '').trim(),
    historicMfgName: (row['Historic Manufacturer Name'] || '').trim(),
    currentRateTotalPoValueUSD: parseNumberSafe(row['Current Rate Total PO Value'] || 0),
    lastRateTotalPoValueUSD: parseNumberSafe(row['Last Rate Total PO Value'] || 0),
    netSavingsValueUSD: parseNumberSafe(row['Net Savings Value $'] || 0),
    percentageSavingLoss: parseNumberSafe(row['% Age (Sav/Los)'] || 0),
    mfgStatus: (row['Mfg Status'] || 'Same Mfg').trim(),
    savingLossImpact: (row['Saving/Loss Impact'] || 'No Change').trim(),
  }));
}

export function parseProjectCommercialCSV(csvText: string): ProjectCommercialSavingRecord[] {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  return (parsed.data as any[]).map((row, index) => ({
    id: `proj-${index}-${row['Material Code'] || index}`,
    materialClassification: (row['Material Classification'] || '').trim(),
    company: (row['Company'] || 'LAB').trim().toUpperCase(),
    materialCode: String(row['Material Code'] || '').trim(),
    year: (row['Year'] || '').trim(),
    purchDoc: (row['Purch.Doc.'] || '').trim(),
    materialName: (row['Material Name'] || '').trim(),
    poQuantity: parseNumberSafe(row['PO Quantity'] || 0),
    supplierName: (row['Supplier Name'] || '').trim(),
    netPrice: parseNumberSafe(row['Net Price'] || 0),
    plant: (row['Plant'] || '').trim(),
    materialGroup: (row['Material Group'] || '').trim(),
    purchasingGroup: (row['Purchasing Group'] || '').trim(),
    uom: (row['UOM'] || 'KG').trim(),
    currency: (row['Currency'] || 'USD').trim(),
    manufacturerName: (row['Manufacturer Name'] || '').trim(),
    origin: (row['Origin'] || '').trim(),
    indentorNameAuto: (row['Indentor Name Auto'] || '').trim(),
    latestSupplierOther: (row['Latest Supplier (ME2L Other)'] || '').trim(),
    latestSupplierNetPriceUSD: parseNumberSafe(row['Latest Supplier Net Price (USD)'] || 0),
    poQtyThisEntry: parseNumberSafe(row['PO Qty (This Entry)'] || 0),
    sumTotalValueNewSourceUSD: parseNumberSafe(row['Sum of Total Value-New AVL Added Source Buy'] || 0),
    sumTotalValueExistingSourceUSD: parseNumberSafe(row['Sum of Total Value-Existing Source Buy'] || 0),
    netSavingsValueUSD: parseNumberSafe(row['Net Savings Value $'] || 0),
  }));
}

export function parseActiveMasterCSV(csvText: string): ActiveMaterialMasterRecord[] {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  return (parsed.data as any[]).map((row, index) => {
    const valUSD = parseNumberSafe(row['Sum of 12M Annual Value (USD) Jul 2025 to Jun 2026'] || 0);
    const valPKR = parseNumberSafe(row['Sum of 12M Annual Value (PKR) Jul 2025 to Jun 2026'] || (valUSD * 280));
    const netPriceUSD = parseNumberSafe(row['Sum of Net Price USD'] || 0);
    const netPricePKR = parseNumberSafe(row['Sum of Last Net Price (PKR)'] || (netPriceUSD * 280));

    return {
      id: `master-${index}-${row['Material Code'] || index}`,
      activeListMaterial: (row['Active List Material'] || 'Yes').trim(),
      fgCount: parseNumberSafe(row['Sum of FG Count'] || 0),
      categoryType: (row['API/EXP'] || (row['Material Classification']?.includes('API') ? 'API' : 'EXP')).trim().toUpperCase(),
      sourcingType: (row['IMP/LOCAL'] || 'IMP').trim().toUpperCase(),
      company: (row['COMPANY'] || 'LAB').trim().toUpperCase(),
      materialCode: String(row['Material Code'] || '').trim(),
      materialName: (row['Material Name'] || '').trim(),
      totalMfgCount: parseNumberSafe(row['Sum of Total Mfg Count'] || 1),
      activeMfgName: (row['Mfg Name (Active)'] || '').trim(),
      activeMfgOrigin: (row['Active Mfg Origin'] || '').trim(),
      activeMfgCount: parseNumberSafe(row['Sum of Active Mfg Count'] || 1),
      inactiveMfgCount: parseNumberSafe(row['Sum of Inactive Mfg Count'] || 0),
      materialClassification: (row['Material Classification'] || 'MULTI SOURCE').trim(),
      originCategory: (row['Origin Category'] || 'Multi Origin').trim(),
      sourceClassification: (row['Source Classification'] || '').trim(),
      singleMultiActiveAVL: (row['Single/multi Active AVL'] || '').trim(),
      sourceType: (row['Source Type'] || 'Multi Source').trim(),
      category: (row['Category'] || '').trim(),
      sumAnnualPoQtyJul25Jun26: parseNumberSafe(row['Sum of Annual PO Qty Jul 2025 to Jun 2026'] || 0),
      sumLastOrderQty: parseNumberSafe(row['Sum of Last Order Qty'] || 0),
      uom: (row['UOM'] || 'KG').trim(),
      lastNetPrice: parseNumberSafe(row['Sum of Last Net Price'] || 0),
      currency: (row['Currency'] || 'PKR').trim(),
      netPriceUSD: netPriceUSD,
      lastNetPricePKR: netPricePKR,
      annualValueUSD: valUSD,
      annualValuePKR: valPKR,
      classValueVise: (row['Class Value vise (A= 2M, B = 2M - 1M, C= 1M& below)'] || 'A').trim(),
      lastIndentor: (row['Last Indentor'] || '').trim(),
      lastManufacturer: (row['Last Manufacturer'] || '').trim(),
      lastSupplier: (row['Last Supplier'] || '').trim(),
      manufacturerOrigin: (row['Manufacturer Origin'] || '').trim(),
      lastRegionCategory: (row['Last Region Category'] || 'ASIA').trim(),
      underDevStage: (row['Under Dev Stage'] || '').trim(),
      underDevCount: parseNumberSafe(row['Sum of Under Dev Count(Un Ar/Ini Tes/PD/Un Stab)'] || 0),
      underDevMfgSum: parseNumberSafe(row['Sum of Under Dev Mfg sum(Un Ar/Ini Tes/PD/Un Stab)'] || 0),
      nonDevDiffCount: parseNumberSafe(row['Sum of Non Dev Diff Count'] || 0),
      sampleUnderArrangement: row['SAMPLE UNDER ARRANGEMENT'] || '',
      sampleInitialTesting: row['SAMPLE INITIAL TESTING'] || '',
      sampleStability: row['SAMPLE STABILITY'] || '',
      forPdPriority: row['FOR PD PRIORITY'] || '',
      rejectedDetails: row['Rejected_Details'] || '',
      contributionPct: parseNumberSafe(row['Sum of Contribution'] || 0),
      targetAvlStatus: row['95% (S/M)Target_AVL_Status'] || '',
      preferMfg: row['Prefer Mfg'] || '',
      preferOrigin: row['Prefer Origin'] || '',
    };
  });
}

// Aliases
export const parseUnderDevCsv = parseUnderDevCSV;
export const parseMaturityCsv = parseMaturityCSV;
export const parseCphiCsv = parseCphiCSV;
export const parseHistoricCsv = parseHistoricVarianceCSV;
export const parseProjectSavingsCsv = parseProjectCommercialCSV;
export const parseMasterMaterialCsv = parseActiveMasterCSV;
