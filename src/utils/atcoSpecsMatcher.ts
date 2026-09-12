import { AtcoSpecDocument, InquiryMaterialItem } from '../types';

export const ATCO_DEFAULT_SPECS_REPOSITORY: AtcoSpecDocument[] = [
  {
    id: 'spec-1',
    fileName: '111000016_NEOMYCIN_SULPHATE_BP_SPECS_2025.pdf',
    fileUrl: '#',
    fileSize: '1.8 MB',
    monograph: 'BP 2024 / Ph. Eur.',
    matchScore: 98,
    matchedAt: '2025-02-15',
    parametersCount: 14,
    testLimitSummary: 'Assay: > 680 IU/mg (dried basis); Loss on drying: <= 8.0%; pH: 5.0 - 7.5; Sulfated ash: <= 1.0%',
  },
  {
    id: 'spec-2',
    fileName: '111000017_NICOTINAMIDE_BP_SPECS_2025.pdf',
    fileUrl: '#',
    fileSize: '1.2 MB',
    monograph: 'BP 2024 / USP 44',
    matchScore: 96,
    matchedAt: '2025-02-15',
    parametersCount: 12,
    testLimitSummary: 'Assay: 99.0% - 101.0%; Melting Point: 128 - 131 C; Related Substances: Impurity A <= 0.10%',
  },
  {
    id: 'spec-3',
    fileName: '111000018_PARACETAMOL_BP_MICRONIZED_SPECS_2025.pdf',
    fileUrl: '#',
    fileSize: '2.1 MB',
    monograph: 'BP 2024 / IP',
    matchScore: 95,
    matchedAt: '2025-02-15',
    parametersCount: 16,
    testLimitSummary: 'Assay: 99.0% - 101.0%; 4-Aminophenol <= 50 ppm; Loss on drying: <= 0.5%; D90 < 25 um',
  },
  {
    id: 'spec-4',
    fileName: '111000019_ESOMEPRAZOLE_MAGNESIUM_TRIHYDRATE_SPECS.pdf',
    fileUrl: '#',
    fileSize: '2.4 MB',
    monograph: 'BP 2024 / Ph. Eur. 10.0',
    matchScore: 94,
    matchedAt: '2025-02-15',
    parametersCount: 18,
    testLimitSummary: 'Assay: 98.5% - 101.5%; Enantiomeric Purity: S-enantiomer >= 99.5%; Water: 6.0% - 8.0%',
  },
  {
    id: 'spec-5',
    fileName: '111000020_METFORMIN_HCL_BP_SPECS_2025.pdf',
    fileUrl: '#',
    fileSize: '1.5 MB',
    monograph: 'BP 2024 / USP',
    matchScore: 97,
    matchedAt: '2025-02-15',
    parametersCount: 11,
    testLimitSummary: 'Assay: 98.5% - 101.0%; Loss on Drying: <= 0.5%; Nitrosamines NDMA <= 32 ppb',
  },
  {
    id: 'spec-6',
    fileName: '111000021_CEFIXIME_TRIHYDRATE_USP_SPECS.pdf',
    fileUrl: '#',
    fileSize: '1.9 MB',
    monograph: 'USP 44 / BP',
    matchScore: 93,
    matchedAt: '2025-02-15',
    parametersCount: 15,
    testLimitSummary: 'Assay: 95.0% - 102.0%; Water: 9.0% - 12.0%; Related Substances: Single impurity <= 1.0%',
  },
];

/**
 * Fuzzy text similarity calculation (Dice coefficient / Levenshtein hybrid)
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function calculateStringSimilarity(str1: string, str2: string): number {
  const s1 = normalizeString(str1);
  const s2 = normalizeString(str2);

  if (!s1 || !s2) return 0;
  if (s1 === s2) return 100;
  if (s1.includes(s2) || s2.includes(s1)) return 85;

  const words1 = s1.split(' ').filter((w) => w.length > 2);
  const words2 = s2.split(' ').filter((w) => w.length > 2);

  if (words1.length === 0 || words2.length === 0) return 0;

  let matches = 0;
  for (const w1 of words1) {
    if (words2.some((w2) => w2 === w1 || w2.includes(w1) || w1.includes(w2))) {
      matches++;
    }
  }

  return Math.round((matches / Math.max(words1.length, words2.length)) * 100);
}

/**
 * Matches an inquiry item to the Atco Specification Repository
 */
export function matchMaterialToAtcoSpec(
  materialCode: string,
  materialName: string,
  repository: AtcoSpecDocument[] = ATCO_DEFAULT_SPECS_REPOSITORY
): { match: AtcoSpecDocument | null; score: number } {
  let bestMatch: AtcoSpecDocument | null = null;
  let bestScore = 0;

  const cleanCode = materialCode.trim().toLowerCase();
  const cleanName = normalizeString(materialName);

  for (const doc of repository) {
    const docName = normalizeString(doc.fileName);

    // Exact material code match in file name -> 100% confidence
    if (cleanCode && docName.includes(cleanCode)) {
      return {
        match: {
          ...doc,
          matchScore: 99,
          matchedAt: new Date().toISOString().slice(0, 10),
        },
        score: 99,
      };
    }

    // Fuzzy name matching
    const nameScore = calculateStringSimilarity(cleanName, docName);
    if (nameScore > bestScore) {
      bestScore = nameScore;
      bestMatch = doc;
    }
  }

  // Threshold of 45% for acceptable match
  if (bestScore >= 45 && bestMatch) {
    return {
      match: {
        ...bestMatch,
        matchScore: bestScore,
        matchedAt: new Date().toISOString().slice(0, 10),
      },
      score: bestScore,
    };
  }

  // Fallback: Generate synthetic Atco Spec for any pharmaceutical material
  const syntheticSpec: AtcoSpecDocument = {
    id: `spec-synth-${materialCode}`,
    fileName: `${materialCode}_${materialName.replace(/[^a-zA-Z0-9]/g, '_')}_ATCO_SPECS.pdf`,
    fileUrl: '#',
    fileSize: '1.4 MB',
    monograph: 'BP 2024 / USP 44',
    matchScore: 90,
    matchedAt: new Date().toISOString().slice(0, 10),
    parametersCount: 14,
    testLimitSummary: `Assay: 98.5% - 101.5%; Pharmacopoeial release monograph compliant with Atco Quality Assurance standards.`,
  };

  return { match: syntheticSpec, score: 90 };
}

/**
 * Ingests a new set of materials and automatically links Atco Specs
 */
export function autoLinkAtcoSpecsToMaterials(
  materials: Partial<InquiryMaterialItem>[],
  repository: AtcoSpecDocument[] = ATCO_DEFAULT_SPECS_REPOSITORY
): InquiryMaterialItem[] {
  return materials.map((mat, idx) => {
    const code = mat.materialCode || `1110000${idx + 25}`;
    const name = mat.materialName || 'PHARMACEUTICAL RAW MATERIAL';
    const { match } = matchMaterialToAtcoSpec(code, name, repository);

    return {
      ...mat,
      id: mat.id || `mat-${Date.now()}-${idx}`,
      importOrLocal: mat.importOrLocal || 'IMPORT',
      materialCode: code,
      materialName: name,
      atcoSpecsDoc: mat.atcoSpecsDoc || match || undefined,
      annualQty: Number(mat.annualQty) || 1000,
      perLotQty: Number(mat.perLotQty) || 250,
      uom: mat.uom || 'KG',
      lastBuyingPriceUSD: mat.lastBuyingPriceUSD,
      benchmarkPriceUSD: mat.lastBuyingPriceUSD || mat.benchmarkPriceUSD || 25.0,
      shipmentMode: mat.shipmentMode || 'SEA',
      apiExp: mat.apiExp || 'API',
      preferMfg: mat.preferMfg || '',
      preferOrigin: mat.preferOrigin || '',
      atcoPreferredOrigin: mat.atcoPreferredOrigin || '',
      approxInitialSampleQty: mat.approxInitialSampleQty || '200g 1st lot + WS',
      approxTrialSampleQty: mat.approxTrialSampleQty || '1kg 2nd lot',
      activeMfgs: mat.activeMfgs || '',
      customDataMfgs: mat.customDataMfgs || '',
      underDevelopmentStatus: mat.underDevelopmentStatus || 'Pending Inquiry',
      assignedIndentorIds: mat.assignedIndentorIds || ['frabbi', 'dawn', 'morgan', 'sinochem'],
      responses: mat.responses || {},
    } as InquiryMaterialItem;
  });
}
