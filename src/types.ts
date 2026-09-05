export type CurrencyMode = 'PKR' | 'USD';

export interface AlternateUnderDevRecord {
  id: string;
  developmentStage: 'INITIAL TESTING' | 'AT STABILITY' | 'AT PD PRIORITY' | 'UNDER ARRANGEMENT' | string;
  stage?: string;
  materialClassification: string;
  sampleSubmissionDate?: string;
  materialCode: string;
  activeMfgCount: number;
  company: 'LAB' | 'AHL' | string;
  materialName: string;
  manufacturerName: string;
  sampleManufacturerName?: string;
  underDevMfg?: string;
  currentManufacturer?: string;
  origin: string;
  indentorName?: string;
  developmentRates?: number | string;
  commercialMfgName?: string;
  netPriceUSD?: number;
  perLotQty?: number;
  uom?: string;
  annualQty?: number;
  existingSourceTotalAnnualValue?: number;
  underDevSourceTotalAnnualValue?: number;
  netSavingLoss?: number;
  percentageSavingLoss?: number;
  savingLossStatus?: string;
  bestNetSavingLoss?: number;
  existingSourceTotalAnnualValue10Percent?: number;
  underDevSourceTotalAnnualValue10Percent?: number;
  netSavingLoss10Percent?: number;
  percentageSavingLoss10Percent?: number;
  savingLossStatus10Percent?: string;
  annualNetSavingUSD?: number;
  hasAnnualNetSavingValue?: boolean;
  rawAnnualNetSavingUSD?: number;
}

export interface MaturityCommercializedRecord {
  id: string;
  maturityStatus: 'MATURED' | 'NON MATURED' | string;
  indentor?: string;
  status: string;
  company: 'LAB' | 'AHL' | string;
  materialCode: string;
  materialName: string;
  manufacturerName: string;
  origin: string;
  commercializedMfgName?: string;
  perLotQty?: number;
  lastNetPriceUSDExist?: number;
  perLotValueExistUSD?: number;
  annualQtyJul25Jun26?: number;
  uom?: string;
  newSourcePerLotPriceUSD?: number;
  perLotValueNewSourceUSD?: number;
  perLotDiffUSD?: number;
  perAnnumValueExistUSD?: number;
  perAnnumValueNewUSD?: number;
  perAnnumDiffUSD?: number;
  annualNetSavingUSD?: number;
  avlAddedDate?: string;
  lastPoDate?: string;
  orderingStatus?: string;
  openPrDate?: string;
  materialClassification?: string;
}

export interface CphiSavingRecord {
  id: string;
  category: string;
  date: string;
  materialCode: string;
  materialName: string;
  manufacturerName: string;
  poQuantity: number;
  netPriceUSD: number;
  annualQty?: number;
  uom: string;
  budgetPriceUSD: number;
  poValueExistingUSD: number;
  poValueBudgetUSD: number;
  netSavingsValueUSD: number;
  percentageDiff?: number;
}

export interface HistoricVarianceRecord {
  id: string;
  year: string;
  materialCode: string;
  company: 'LAB' | 'AHL' | string;
  materialName: string;
  supplierName: string;
  manufacturerName: string;
  poQuantity: number;
  uom: string;
  netPriceUSD: number;
  historicDate?: string;
  latestHistoricNetPriceUSD?: number;
  historicSupplierName?: string;
  historicMfgName?: string;
  currentRateTotalPoValueUSD: number;
  lastRateTotalPoValueUSD: number;
  netSavingsValueUSD: number;
  percentageSavingLoss?: number;
  mfgStatus: string;
  savingLossImpact: string;
}

export interface ProjectCommercialSavingRecord {
  id: string;
  materialClassification: string;
  company: 'LAB' | 'AHL' | string;
  materialCode: string;
  year: string;
  purchDoc?: string;
  materialName: string;
  poQuantity: number;
  supplierName?: string;
  netPrice: number;
  plant?: string;
  materialGroup?: string;
  purchasingGroup?: string;
  uom: string;
  currency: string;
  manufacturerName: string;
  origin: string;
  indentorNameAuto?: string;
  latestSupplierOther?: string;
  latestSupplierNetPriceUSD?: number;
  poQtyThisEntry?: number;
  sumTotalValueNewSourceUSD?: number;
  sumTotalValueExistingSourceUSD?: number;
  netSavingsValueUSD: number;
}

export interface ActiveMaterialMasterRecord {
  id: string;
  activeListMaterial: string;
  fgCount?: number;
  categoryType: 'API' | 'EXP' | 'PM' | string;
  sourcingType: 'IMP' | 'LOCAL' | string;
  company: 'LAB' | 'AHL' | string;
  materialCode: string;
  materialName: string;
  totalMfgCount: number;
  activeMfgName: string;
  activeMfgOrigin: string;
  activeMfgCount: number;
  inactiveMfgCount?: number;
  materialClassification: string;
  originCategory: string;
  sourceClassification: string;
  singleMultiActiveAVL: string;
  sourceType: 'Single Source' | 'Multi Source' | 'Fixed Source' | string;
  category: string;
  sumAnnualPoQtyJul25Jun26: number;
  sumLastOrderQty: number;
  uom: string;
  lastNetPrice: number;
  currency: string;
  netPriceUSD: number;
  lastNetPricePKR: number;
  annualValueUSD: number;
  annualValuePKR: number;
  classValueVise: 'A' | 'B' | 'C' | string;
  lastIndentor?: string;
  lastManufacturer?: string;
  lastSupplier?: string;
  manufacturerOrigin?: string;
  lastRegionCategory?: string;
  underDevStage?: string;
  underDevCount?: number;
  underDevMfgSum?: number;
  nonDevDiffCount?: number;
  sampleUnderArrangement?: string;
  sampleInitialTesting?: string;
  sampleStability?: string;
  forPdPriority?: string;
  rejectedDetails?: string;
  contributionPct?: number;
  targetAvlStatus?: string;
  preferMfg?: string;
  preferOrigin?: string;
}

export interface BackendDetailModalConfig {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  filterCriteria: string;
  materialCodes?: string[];
  records: any[];
  datasetType: 'master' | 'underDev' | 'matured' | 'cphi' | 'historic' | 'project';
}

export interface ActiveFilterState {
  company: 'ALL' | 'LAB' | 'AHL';
  materialClass: 'ALL' | 'API' | 'EXP' | 'PM';
  sourceType: 'ALL' | 'Single Source' | 'Multi Source' | 'Fixed Source';
  regionCategory: string;
  searchQuery: string;
}

export type AuditStatusType =
  | 'APPROVED'
  | 'SCHEDULED'
  | 'DESK AUDIT ONLY'
  | 'CAPA PENDING'
  | 'AUDIT REQUIRED'
  | 'WAIVED / EXEMPT';

export type DocsStatusType = 'FULL AVAILABLE' | 'PARTIAL AVAILABLE' | 'PENDING / REQUESTED' | 'NOT AVAILABLE';

export interface VendorQuotationRecord {
  id: string;
  sourceType: 'OUTLOOK_EMAIL' | 'EXCEL_FILE' | 'MANUAL_ENTRY';
  inquiryRefNumber?: string;
  emailSubject?: string;
  emailSender?: string;
  emailDate?: string;
  receivedDate: string;
  indentorName: string;
  vendorManufacturer: string;
  originCountry: string;
  plantAddress?: string;
  company: 'LAB' | 'AHL' | 'BOTH';
  category: 'API' | 'EXP' | 'PM';
  materialCode?: string;
  materialName: string;
  pharmacopoeiaGrade?: string; // USP, BP, EP, Ph.Eur, CP
  quotedRateUSD: number;
  quotedRatePKR?: number;
  currency: 'USD' | 'EUR' | 'CNY' | 'PKR';
  originalCurrencyRate?: number;
  uom: 'KG' | 'L' | 'M' | 'PCS' | 'DRUM' | string;
  moq: number;
  packSize?: string;
  leadTimeWeeks: number;
  paymentTerms: string; // e.g. 100% LC at Sight, 90 Days Usance, TT in Advance
  incoterms: 'CFR Karachi' | 'FOB Shanghai' | 'CIF Karachi' | 'Ex-Works' | 'FOB Nhava Sheva' | string;
  validityDate?: string;
  targetBenchmarkPriceUSD: number;
  annualQtyRequirement?: number;
  priceVarianceUSD: number; // target - quoted
  priceVariancePct: number;
  annualSavingsPotentialUSD: number;
  
  // Regulatory & Docs Availability Checklist
  docsAvailabilityStatus: DocsStatusType;
  dmfStatus: 'AVAILABLE (OPEN/USDMF)' | 'CEP AVAILABLE' | 'UNDER PREPARATION' | 'NOT AVAILABLE';
  gmpCertificateStatus: 'VALID WHO-GMP' | 'VALID EU-GMP' | 'LOCAL GMP ONLY' | 'EXPIRED / PENDING';
  gmpExpiryDate?: string;
  coaAvailable: boolean;
  coaComplyAck?: boolean; // 100% Comply with Atco Specs Ack
  dmfOpenPart?: boolean;
  dmfClosePart?: boolean;
  isoCertified?: boolean;
  halalCertified?: boolean;
  smfAvailable?: boolean;
  transportationDeclared?: boolean;
  stabilityDataAvailable: boolean; // Zone IVb / 6M Accelerated / 36M Real-time
  tseBseDeclared: boolean;
  nitrosamineResidualSolventsDeclared: boolean;
  clientListShared?: boolean;
  fdaCepTgaStatus?: string;
  docsScore: number; // e.g., 5/5

  // Sample & Trial Ack
  sample1stLotAck?: string;
  sample2ndLotAck?: string;
  sampleFocRemarks?: string;
  
  // Audit Conduction Status
  auditStatus: AuditStatusType;
  auditConductionDate?: string;
  auditNextDueDate?: string;
  auditedBy?: 'ATCO QA TEAM' | 'THIRD PARTY (INTERTEK/SGS)' | 'DESK ASSESSMENT' | 'NOT YET AUDITED';
  auditScoreRating?: 'A (HIGH COMPLIANCE)' | 'B (ACCEPTABLE WITH MINOR CAPA)' | 'C (CRITICAL OBSERVATIONS)' | 'NOT RATED';
  auditRemarks?: string;
  
  // Extraction & Evaluation metadata
  emailBodySnippet?: string;
  attachmentFileNames?: string[];
  isLowestQuote?: boolean;
  isBestEvaluatedOffer?: boolean; // Best balance of price, docs and audit
  evaluationNotes?: string;
}

export interface InquiryBenchmarkRecord {
  id: string;
  inquiryCode: string;
  issueDate: string;
  deadlineDate: string;
  company: 'LAB' | 'AHL' | 'BOTH';
  category: 'API' | 'EXP' | 'PM';
  materialCode: string;
  materialName: string;
  gradeSpec: string;
  annualDemandQty: number;
  uom: string;
  targetPriceUSD: number;
  lastPurchasePriceUSD: number;
  preferredIncoterm: string;
  requiredAuditLevel: 'WHO-GMP PHYSICAL' | 'DESK AUDIT' | 'ISO/LOCAL';
  requiredDocs: string[];
  invitedIndentors: string[];
  responsesReceivedCount: number;
  lowestQuotedRateUSD?: number;
  status: 'OPEN' | 'QUOTATIONS_RECEIVED' | 'EVALUATED' | 'CLOSED';
}

export type InitiativeType = 'performed' | 'upcoming';

export type ProofFileType = 'image' | 'video' | 'ppt' | 'other';

export interface InitiativeProofFile {
  id: string;
  name: string;
  fileType: ProofFileType;
  mimeType?: string;
  sizeFormatted: string;
  dataUrl?: string; // Data URL / Base64 for instant preview & playback
  uploadedAt: string;
  caption?: string;
}

export interface InitiativeRecord {
  id: string;
  type: InitiativeType;
  itemNumber?: number | string;
  challengingArea: string; // Challenging Area (Earlier Procedure)
  category: string; // Category / Domain
  name: string; // Initiative / Project Name
  impactOutcome: string; // Impact / Outcome / Status
  attachments?: InitiativeProofFile[];
  createdAt?: string;
  updatedAt?: string;
}

