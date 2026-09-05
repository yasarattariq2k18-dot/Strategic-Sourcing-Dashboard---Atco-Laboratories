const fs = require('fs');

function cleanNum(val) {
  if (val === undefined || val === null || val === '') return 0;
  let str = String(val).replace(/[\$,\s]/g, '').trim();
  let isNegative = false;
  if (str.startsWith('(') && str.endsWith(')')) {
    isNegative = true;
    str = str.slice(1, -1).trim();
  }
  let num = parseFloat(str);
  if (isNaN(num)) return 0;
  return isNegative ? -num : num;
}

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = [];
  let headerLine = lines[0].replace(/^\uFEFF/, '');
  let cur = '';
  let inQuotes = false;
  for (let c = 0; c < headerLine.length; c++) {
    const char = headerLine[c];
    if (char === '"') inQuotes = !inQuotes;
    else if (char === ',' && !inQuotes) {
      headers.push(cur.replace(/^"|"$/g, '').trim());
      cur = '';
    } else cur += char;
  }
  headers.push(cur.replace(/^"|"$/g, '').trim());

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const values = [];
    let insideQuotes = false;
    let currentVal = '';
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') insideQuotes = !insideQuotes;
      else if (char === ',' && !insideQuotes) {
        values.push(currentVal.replace(/^"|"$/g, '').trim());
        currentVal = '';
      } else currentVal += char;
    }
    values.push(currentVal.replace(/^"|"$/g, '').trim());
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] !== undefined ? values[idx] : '';
    });
    rows.push(obj);
  }
  return rows;
}

const cphi = parseCSV(fs.readFileSync('src/data/raw/cphi_materials.csv', 'utf8'));
const proj = parseCSV(fs.readFileSync('src/data/raw/project_materials.csv', 'utf8'));
const comm = parseCSV(fs.readFileSync('src/data/raw/commercial_po.csv', 'utf8'));
const hist = parseCSV(fs.readFileSync('src/data/raw/historic_commercially_ordered.csv', 'utf8'));
const nonComm = parseCSV(fs.readFileSync('src/data/raw/non_commercialized_maturity.csv', 'utf8'));
const underDev = parseCSV(fs.readFileSync('src/data/raw/under_development_pipeline.csv', 'utf8'));

// Format and save TS files
const cphiData = cphi.map((r, i) => ({
  id: `cphi-${i + 1}`,
  category: r['Category'] || 'CPHI Materials',
  date: r['Date'] || '',
  materialCode: r['Material Code'] || '',
  materialName: r['Material Name'] || '',
  manufacturerName: r['Manufacturer Name'] || '',
  poQuantity: cleanNum(r['PO Quantity']),
  netPriceUSD: cleanNum(r['Net Price in USD']),
  annualQty: cleanNum(r['Annual Qty']),
  uom: r['UOM'] || 'KG',
  budgetPriceUSD: cleanNum(r['Budget Price $']),
  poValueExistingUSD: cleanNum(r['PO Value (Existing)']),
  poValueBudgetUSD: cleanNum(r['PO Value (Budget Price)']),
  netSavingsValueUSD: cleanNum(r['Annual Net Saving in USD']),
  percentageDiff: cleanNum(r['%Age Diff']),
}));

const projectData = proj.map((r, i) => ({
  id: `proj-${i + 1}`,
  materialClassification: r['Material Classification'] || 'PROJECT',
  company: r['Company'] || 'LAB',
  materialCode: r['Material Code'] || '',
  year: r['Year'] || '',
  purchDoc: r['Purch.Doc.'] || '',
  materialName: r['Material Name'] || '',
  poQuantity: cleanNum(r['PO Quantity']),
  supplierName: r['Supplier Name'] || '',
  netPrice: cleanNum(r['Net Price']),
  plant: r['Plant'] || '',
  materialGroup: r['Material Group'] || '',
  purchasingGroup: r['Purchasing Group'] || '',
  uom: r['UOM'] || 'KG',
  currency: r['Currency'] || 'USD',
  manufacturerName: r['Manufacturer Name'] || '',
  origin: r['Origin'] || '',
  indentorNameAuto: r['Indentor Name Auto'] || '',
  latestSupplierOther: r['Latest Supplier (ME2L Other)'] || '',
  latestSupplierNetPriceUSD: cleanNum(r['Latest Supplier Net Price (USD)']),
  poQtyThisEntry: cleanNum(r['PO Qty (This Entry)']),
  sumTotalValueNewSourceUSD: cleanNum(r['Sum of Total Value-New AVL Added Source Buy']),
  sumTotalValueExistingSourceUSD: cleanNum(r['Sum of Total Value-Existing Source Buy']),
  netSavingsValueUSD: cleanNum(r['Annual Net Saving in USD']),
}));

const commData = comm.map((r, i) => ({
  id: `comm-${i + 1}`,
  materialClassification: r['Material Classification'] || 'COMMERCIAL',
  company: r['Company'] || 'LAB',
  materialCode: r['Material Code'] || '',
  year: r['Year'] || '',
  purchDoc: r['Purch.Doc.'] || '',
  materialName: r['Material Name'] || '',
  poQuantity: cleanNum(r['PO Quantity']),
  supplierName: r['Supplier Name'] || '',
  netPrice: cleanNum(r['Net Price']),
  plant: r['Plant'] || '',
  materialGroup: r['Material Group'] || '',
  purchasingGroup: r['Purchasing Group'] || '',
  uom: r['UOM'] || 'KG',
  currency: r['Currency'] || 'USD',
  manufacturerName: r['Manufacturer Name'] || '',
  origin: r['Origin'] || '',
  indentorNameAuto: r['Indentor Name Auto'] || '',
  latestSupplierOther: r['Latest Supplier (ME2L Other)'] || '',
  latestSupplierNetPriceUSD: cleanNum(r['Latest Supplier Net Price (USD)']),
  poQtyThisEntry: cleanNum(r['PO Qty (This Entry)']),
  sumTotalValueNewSourceUSD: cleanNum(r['Sum of Total Value-New AVL Added Source Buy']),
  sumTotalValueExistingSourceUSD: cleanNum(r['Sum of Total Value-Existing Source Buy']),
  netSavingsValueUSD: cleanNum(r['Annual Net Saving in USD']),
}));

const histData = hist.map((r, i) => ({
  id: `hist-${i + 1}`,
  year: r['Year'] || '',
  materialCode: r['Material Code'] || '',
  company: r['Company'] || 'LAB',
  materialName: r['Material Name'] || '',
  supplierName: r['Supplier Name'] || '',
  manufacturerName: r['Manufacturer Name'] || '',
  poQuantity: cleanNum(r['PO Quantity']),
  uom: r['UOM'] || 'KG',
  netPriceUSD: cleanNum(r['Net Price in USD']),
  historicDate: r['Historic Date'] || '',
  latestHistoricNetPriceUSD: cleanNum(r['Latest Historic Net Price USD']),
  historicSupplierName: r['Historic Supplier Name'] || '',
  historicMfgName: r['Historic Manufacturer Name'] || '',
  currentRateTotalPoValueUSD: cleanNum(r['Current Rate Total PO Value']),
  lastRateTotalPoValueUSD: cleanNum(r['Last Rate Total PO Value']),
  netSavingsValueUSD: cleanNum(r['Annual Net Saving in USD']),
  percentageSavingLoss: cleanNum(r['% Age (Sav/Los)']),
  mfgStatus: r['Mfg Status'] || 'Same Mfg',
  savingLossImpact: r['Saving/Loss Impact'] || 'No Change',
}));

const matData = nonComm.map((r, i) => ({
  id: `mat-${i + 1}`,
  maturityStatus: r['Maturity Status'] || 'NON MATURED',
  indentor: r['Indentor'] || '',
  status: r['Status'] || 'ACTIVE',
  company: r['COMPANY'] || 'LAB',
  materialCode: r['Material Code'] || '',
  materialName: r['Material Name'] || '',
  manufacturerName: r['Manufacturer Name'] || '',
  origin: r['Origin'] || '',
  commercializedMfgName: r['Commercialized Manufacturer Name'] || '',
  perLotQty: cleanNum(r['Per Lot Qty']),
  lastNetPriceUSDExist: cleanNum(r['Last Net Price in USD(Exist Sour)']),
  perLotValueExistUSD: cleanNum(r['Per Lot Value ($)-Exist Sourc']),
  annualQtyJul25Jun26: cleanNum(r['Annual Qty Jul 2025 to Jun 2026']),
  uom: r['UOM'] || 'KG',
  newSourcePerLotPriceUSD: cleanNum(r['New Sourc Per lot Price($)']),
  perLotValueNewSourceUSD: cleanNum(r['Per lot Value - New Source $']),
  perLotDiffUSD: cleanNum(r['Per Lot Diff']),
  perAnnumValueExistUSD: cleanNum(r['Per Annum Value $ - Exist Sou']),
  perAnnumValueNewUSD: cleanNum(r['Per Annum Value $ - New Sou']),
  perAnnumDiffUSD: cleanNum(r['Per Annum Diff']),
  annualNetSavingUSD: cleanNum(r['Annual Net Saving in USD']),
  avlAddedDate: r['AVL Added Dt'] || '',
  lastPoDate: r['Last PO date'] || '',
  orderingStatus: r['Ordering'] || '',
  openPrDate: r['Open PR & Date'] || '',
  materialClassification: r['Material Classification'] || '',
}));

const udData = underDev.map((r, i) => {
  const stage = r['Development Stage'] || 'UNDER ARRANGEMENT';
  const netSav = cleanNum(r['Net Saving/Loss']);
  const annualNet = r['Annual Net Saving in USD'] !== undefined && r['Annual Net Saving in USD'] !== '' ? cleanNum(r['Annual Net Saving in USD']) : netSav;
  return {
    id: `ud-${i + 1}-${r['Material Code'] || i}`,
    developmentStage: stage,
    stage: stage,
    materialClassification: r['Material Classification'] || '',
    sampleSubmissionDate: r['Sample Submission Date'] || '',
    materialCode: r['Material Code'] || '',
    activeMfgCount: cleanNum(r['Active Mfg Count']) || 1,
    company: r['Company'] || 'LAB',
    materialName: r['Material Name'] || '',
    manufacturerName: r['Manufacturer Name'] || '',
    sampleManufacturerName: r['Manufacturer Name'] || '',
    underDevMfg: r['Manufacturer Name'] || '',
    currentManufacturer: r['Com Mfg Name'] || '',
    commercialMfgName: r['Com Mfg Name'] || '',
    origin: r['Origin'] || '',
    indentorName: r['Indentor Name'] || '',
    developmentRates: cleanNum(r['Development Rates']),
    netPriceUSD: cleanNum(r['Net Price in USD']),
    perLotQty: cleanNum(r['Per Lot Qty']),
    uom: r['UOM'] || 'KG',
    annualQty: cleanNum(r['Annual Qty']),
    existingSourceTotalAnnualValue: cleanNum(r['Existing source Total annual value']),
    underDevSourceTotalAnnualValue: cleanNum(r['Under Dev source Total annual value']),
    netSavingLoss: netSav,
    percentageSavingLoss: cleanNum(r['%Age Saving/Loss']),
    savingLossStatus: r['Saving/Loss'] || (netSav >= 0 ? 'Saving' : 'Loss'),
    bestNetSavingLoss: cleanNum(r['Best Net Saving/Loss']),
    existingSourceTotalAnnualValue10Percent: cleanNum(r['Existing source Total annual value (10% Qty)']),
    underDevSourceTotalAnnualValue10Percent: cleanNum(r['Under Dev source Total annual value (10% Qty)']),
    netSavingLoss10Percent: cleanNum(r['Net Saving/Loss (10% Qty)']),
    percentageSavingLoss10Percent: cleanNum(r['%Age Saving/Loss (10% Qty)']),
    savingLossStatus10Percent: r['Saving/Loss (10% Qty)'] || '',
    annualNetSavingUSD: annualNet,
    hasAnnualNetSavingValue: r['Annual Net Saving in USD'] !== undefined && r['Annual Net Saving in USD'] !== '',
    rawAnnualNetSavingUSD: cleanNum(r['Annual Net Saving in USD']),
  };
});

fs.writeFileSync('src/data/projectAndCphiData.ts', `import { CphiSavingRecord, HistoricVarianceRecord, ProjectCommercialSavingRecord } from '../types';

export const INITIAL_CPHI_DATA: CphiSavingRecord[] = ${JSON.stringify(cphiData, null, 2)};

export const INITIAL_PROJECT_SAVINGS_DATA: ProjectCommercialSavingRecord[] = ${JSON.stringify(projectData, null, 2)};

export const INITIAL_COMMERCIAL_PO_DATA: ProjectCommercialSavingRecord[] = ${JSON.stringify(commData, null, 2)};

export const INITIAL_HISTORIC_DATA: HistoricVarianceRecord[] = ${JSON.stringify(histData, null, 2)};
`);

fs.writeFileSync('src/data/maturityData.ts', `import { MaturityCommercializedRecord } from '../types';

export const INITIAL_MATURITY_DATA: MaturityCommercializedRecord[] = ${JSON.stringify(matData, null, 2)};
`);

fs.writeFileSync('src/data/underDevData.ts', `import { AlternateUnderDevRecord } from '../types';

export const INITIAL_UNDER_DEV_DATA: AlternateUnderDevRecord[] = ${JSON.stringify(udData, null, 2)};
`);

console.log('Build completed successfully!');
