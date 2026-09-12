import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  InquiryMasterHeader,
  InquiryMaterialItem,
  IndentorQuoteResponse,
  DesignatedIndentor,
  SourcingRole,
} from '../types';
import {
  INITIAL_DESIGNATED_INDENTORS,
  INITIAL_INQUIRY_HEADER,
  INITIAL_INQUIRY_MATERIALS,
} from '../data/alternateSourcingData';

interface InquiryContextType {
  header: InquiryMasterHeader;
  materials: InquiryMaterialItem[];
  indentors: DesignatedIndentor[];
  activeRole: SourcingRole;
  activeIndentorId: string;
  activeIndentor: DesignatedIndentor | undefined;
  activeViewTab: 'grid' | 'comparative' | 'compliance';
  setActiveViewTab: (tab: 'grid' | 'comparative' | 'compliance') => void;
  setActiveRole: (role: SourcingRole) => void;
  setActiveIndentorId: (id: string) => void;

  // Actions
  publishInquiry: (closingDate?: string) => Promise<void>;
  updateInquiryHeader: (updates: Partial<InquiryMasterHeader>) => void;
  updateAdminColumns: (
    materialId: string,
    updates: {
      importOrLocal?: 'IMPORT' | 'LOCAL' | string;
      lastBuyingPriceUSD?: number;
      activeMfgs?: string;
      customDataMfgs?: string;
      underDevelopmentStatus?: any;
      benchmarkPriceUSD?: number;
    }
  ) => void;
  updateLineItemField: (
    materialId: string,
    indentorId: string,
    fields: Partial<IndentorQuoteResponse>
  ) => void;
  saveLineItemDraft: (
    materialId: string,
    indentorId: string,
    data?: Partial<IndentorQuoteResponse>
  ) => Promise<void>;
  submitLineItem: (
    materialId: string,
    indentorId: string,
    data?: Partial<IndentorQuoteResponse>
  ) => Promise<{ success: boolean; message: string }>;
  unlockLineItem: (materialId: string, indentorId: string) => void;
  importExcelMaterials: (items: Partial<InquiryMaterialItem>[]) => void;
  addMaterialItem: (item: Partial<InquiryMaterialItem>) => void;
  deleteMaterialItem: (materialId: string) => void;
  resetToDefaultInquiry: () => void;

  // Statistics
  stats: {
    totalMaterials: number;
    totalPublishedMaterials: number;
    totalAssignedIndentors: number;
    totalResponsesReceived: number;
    totalLineItemsSubmitted: number;
    totalPotentialSavingsUSD: number;
    totalPendingResponses: number;
  };
}

const STORAGE_KEY = 'atco_alternate_sourcing_inquiry_v3';

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [header, setHeader] = useState<InquiryMasterHeader>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_header`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load inquiry header from storage', e);
    }
    return INITIAL_INQUIRY_HEADER;
  });

  const [materials, setMaterials] = useState<InquiryMaterialItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_materials`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load inquiry materials from storage', e);
    }
    return INITIAL_INQUIRY_MATERIALS;
  });

  const [indentors] = useState<DesignatedIndentor[]>(INITIAL_DESIGNATED_INDENTORS);
  const [activeRole, setActiveRole] = useState<SourcingRole>('admin');
  const [activeIndentorId, setActiveIndentorId] = useState<string>('frabbi');
  const [activeViewTab, setActiveViewTab] = useState<'grid' | 'comparative' | 'compliance'>('grid');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_header`, JSON.stringify(header));
    } catch (e) {
      console.error('Failed to persist header', e);
    }
  }, [header]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_materials`, JSON.stringify(materials));
    } catch (e) {
      console.error('Failed to persist materials', e);
    }
  }, [materials]);

  const activeIndentor = useMemo(() => {
    return indentors.find((ind) => ind.id === activeIndentorId) || indentors[0];
  }, [indentors, activeIndentorId]);

  // Publish Inquiry
  const publishInquiry = useCallback(async (closingDate?: string) => {
    const publishedAt = new Date().toISOString();
    setHeader((prev) => ({
      ...prev,
      status: 'PUBLISHED',
      publishedAt,
      closingDate: closingDate || prev.closingDate || '2025-04-15',
    }));

    // Post to server if available
    try {
      await fetch('/api/inquiries/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishedAt, closingDate }),
      });
    } catch (e) {
      // Offline fallback ok
    }
  }, []);

  const updateInquiryHeader = useCallback((updates: Partial<InquiryMasterHeader>) => {
    setHeader((prev) => ({ ...prev, ...updates }));
  }, []);

  // Update Internal Admin columns
  const updateAdminColumns = useCallback(
    (
      materialId: string,
      updates: {
        importOrLocal?: 'IMPORT' | 'LOCAL' | string;
        lastBuyingPriceUSD?: number;
        activeMfgs?: string;
        customDataMfgs?: string;
        underDevelopmentStatus?: any;
        benchmarkPriceUSD?: number;
      }
    ) => {
      setMaterials((prev) =>
        prev.map((item) => {
          if (item.id === materialId) {
            return {
              ...item,
              ...updates,
            };
          }
          return item;
        })
      );
    },
    []
  );

  // Update line item in memory for an indenter
  const updateLineItemField = useCallback(
    (materialId: string, indentorId: string, fields: Partial<IndentorQuoteResponse>) => {
      setMaterials((prev) =>
        prev.map((item) => {
          if (item.id !== materialId) return item;
          const currentResp: IndentorQuoteResponse = item.responses[indentorId] || {
            indentorId,
            indentorName: indentors.find((i) => i.id === indentorId)?.name || indentorId,
            materialId,
            materialCode: item.materialCode,
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
            googleDriveFolderLink: `https://drive.google.com/drive/folders/atco_${item.materialCode}_${indentorId}`,
            uploadedDocs: [],
          };

          return {
            ...item,
            responses: {
              ...item.responses,
              [indentorId]: {
                ...currentResp,
                ...fields,
                lastUpdated: new Date().toISOString(),
              },
            },
          };
        })
      );
    },
    [indentors]
  );

  // Save line item draft
  const saveLineItemDraft = useCallback(
    async (materialId: string, indentorId: string, data?: Partial<IndentorQuoteResponse>) => {
      if (data) {
        updateLineItemField(materialId, indentorId, { ...data, status: 'DRAFT' });
      }
    },
    [updateLineItemField]
  );

  // Submit Line Item (locking the row & real-time notification)
  const submitLineItem = useCallback(
    async (
      materialId: string,
      indentorId: string,
      data?: Partial<IndentorQuoteResponse>
    ): Promise<{ success: boolean; message: string }> => {
      const mat = materials.find((m) => m.id === materialId);
      if (!mat) return { success: false, message: 'Material not found' };

      const existing = mat.responses[indentorId] || ({} as IndentorQuoteResponse);
      const mfgName = data?.manufacturerName ?? existing.manufacturerName;
      const rate = data?.quotedRateNumeric ?? existing.quotedRateNumeric;

      if (!mfgName || mfgName.trim() === '') {
        return {
          success: false,
          message: 'Please provide the Proposed Manufacturer Name before submitting.',
        };
      }

      if (!rate || Number(rate) <= 0) {
        return {
          success: false,
          message: 'Please provide a valid Quoted Rate (Numeric $/KG) before submitting.',
        };
      }

      const submittedAt = new Date().toISOString();
      const updatedResponse: IndentorQuoteResponse = {
        ...existing,
        ...(data || {}),
        indentorId,
        indentorName: indentors.find((i) => i.id === indentorId)?.name || indentorId,
        materialId,
        materialCode: mat.materialCode,
        status: 'SUBMITTED',
        submittedAt,
        lastUpdated: submittedAt,
      };

      setMaterials((prev) =>
        prev.map((item) => {
          if (item.id !== materialId) return item;
          return {
            ...item,
            responses: {
              ...item.responses,
              [indentorId]: updatedResponse,
            },
          };
        })
      );

      // Call API if server exists
      try {
        await fetch('/api/inquiries/submit-line', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            materialId,
            indentorId,
            response: updatedResponse,
          }),
        });
      } catch (e) {
        // Fallback ok
      }

      return {
        success: true,
        message: `Line item for ${mat.materialName} successfully submitted and locked for evaluation!`,
      };
    },
    [materials, indentors]
  );

  // Unlock Line item for editing
  const unlockLineItem = useCallback((materialId: string, indentorId: string) => {
    setMaterials((prev) =>
      prev.map((item) => {
        if (item.id !== materialId) return item;
        const current = item.responses[indentorId];
        if (!current) return item;
        return {
          ...item,
          responses: {
            ...item.responses,
            [indentorId]: {
              ...current,
              status: 'DRAFT',
            },
          },
        };
      })
    );
  }, []);

  // Excel Bulk Import
  const importExcelMaterials = useCallback((newItems: Partial<InquiryMaterialItem>[]) => {
    if (!newItems || newItems.length === 0) return;

    setMaterials((prev) => {
      // Clean and normalize items
      const formatted: InquiryMaterialItem[] = newItems.map((item, idx) => ({
        id: item.id || `mat-${Date.now()}-${idx}`,
        importOrLocal: item.importOrLocal || 'IMPORT',
        materialCode: item.materialCode || `1110000${idx + 30}`,
        materialName: item.materialName || 'NEW INQUIRED MATERIAL',
        annualQty: Number(item.annualQty) || 1000,
        perLotQty: Number(item.perLotQty) || 250,
        uom: item.uom || 'KG',
        lastBuyingPriceUSD: item.lastBuyingPriceUSD !== undefined ? Number(item.lastBuyingPriceUSD) : (item.benchmarkPriceUSD || 25.0),
        shipmentMode: item.shipmentMode || 'SEA',
        apiExp: item.apiExp || 'API',
        preferMfg: item.preferMfg || '',
        preferOrigin: item.preferOrigin || '',
        atcoPreferredOrigin: item.atcoPreferredOrigin || '',
        approxInitialSampleQty: item.approxInitialSampleQty || '200g 1st lot + WS',
        approxTrialSampleQty: item.approxTrialSampleQty || '1kg 2nd lot',
        benchmarkPriceUSD: item.lastBuyingPriceUSD !== undefined ? Number(item.lastBuyingPriceUSD) : (item.benchmarkPriceUSD || 25.0),
        activeMfgs: item.activeMfgs || '',
        customDataMfgs: item.customDataMfgs || '',
        underDevelopmentStatus: item.underDevelopmentStatus || 'Pending Inquiry',
        assignedIndentorIds: item.assignedIndentorIds || ['frabbi', 'dawn', 'morgan', 'sinochem'],
        responses: item.responses || {},
      }));

      // Append or replace
      return [...prev, ...formatted];
    });
  }, []);

  // Add single material
  const addMaterialItem = useCallback((item: Partial<InquiryMaterialItem>) => {
    const historicalPrice = item.lastBuyingPriceUSD !== undefined ? Number(item.lastBuyingPriceUSD) : (item.benchmarkPriceUSD || 25.0);
    const newItem: InquiryMaterialItem = {
      id: `mat-${Date.now()}`,
      importOrLocal: item.importOrLocal || 'IMPORT',
      materialCode: item.materialCode || '111000099',
      materialName: item.materialName || 'NEW MATERIAL APPLIED',
      annualQty: Number(item.annualQty) || 1000,
      perLotQty: Number(item.perLotQty) || 250,
      uom: item.uom || 'KG',
      lastBuyingPriceUSD: historicalPrice,
      benchmarkPriceUSD: historicalPrice,
      shipmentMode: item.shipmentMode || 'SEA',
      apiExp: item.apiExp || 'API',
      preferMfg: item.preferMfg || '',
      preferOrigin: item.preferOrigin || '',
      atcoPreferredOrigin: item.atcoPreferredOrigin || '',
      approxInitialSampleQty: item.approxInitialSampleQty || '200g 1st lot + WS',
      approxTrialSampleQty: item.approxTrialSampleQty || '1kg 2nd lot',
      activeMfgs: item.activeMfgs || '',
      customDataMfgs: item.customDataMfgs || '',
      underDevelopmentStatus: item.underDevelopmentStatus || 'Pending Inquiry',
      assignedIndentorIds: ['frabbi', 'dawn', 'morgan', 'sinochem'],
      responses: {},
    };

    setMaterials((prev) => [newItem, ...prev]);
  }, []);

  const deleteMaterialItem = useCallback((id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const resetToDefaultInquiry = useCallback(() => {
    setHeader(INITIAL_INQUIRY_HEADER);
    setMaterials(INITIAL_INQUIRY_MATERIALS);
    localStorage.removeItem(`${STORAGE_KEY}_header`);
    localStorage.removeItem(`${STORAGE_KEY}_materials`);
  }, []);

  // Computed Statistics
  const stats = useMemo(() => {
    const totalMaterials = materials.length;
    const totalPublishedMaterials = materials.filter((m) => header.status === 'PUBLISHED').length;
    const totalAssignedIndentors = indentors.length;

    let totalLineItemsSubmitted = 0;
    let totalPotentialSavingsUSD = 0;
    let totalResponsesReceived = 0;

    materials.forEach((mat) => {
      const respValues = Object.values(mat.responses || {}) as IndentorQuoteResponse[];
      const submitted = respValues.filter((r) => r.status === 'SUBMITTED');
      totalLineItemsSubmitted += submitted.length;
      totalResponsesReceived += respValues.length;

      // Find lowest submitted quote compared against Last Buying Price in USD or target benchmark
      if (submitted.length > 0) {
        const rates = submitted.map((r) => r.quotedRateNumeric).filter((r) => r && r > 0);
        if (rates.length > 0) {
          const minRate = Math.min(...rates);
          const benchmark = mat.lastBuyingPriceUSD || mat.benchmarkPriceUSD || minRate;
          if (benchmark > minRate) {
            totalPotentialSavingsUSD += (benchmark - minRate) * mat.annualQty;
          }
        }
      }
    });

    const totalExpectedSubmissions = totalMaterials * totalAssignedIndentors;
    const totalPendingResponses = Math.max(0, totalExpectedSubmissions - totalLineItemsSubmitted);

    return {
      totalMaterials,
      totalPublishedMaterials,
      totalAssignedIndentors,
      totalResponsesReceived,
      totalLineItemsSubmitted,
      totalPotentialSavingsUSD: Math.round(totalPotentialSavingsUSD),
      totalPendingResponses,
    };
  }, [materials, indentors, header.status]);

  return (
    <InquiryContext.Provider
      value={{
        header,
        materials,
        indentors,
        activeRole,
        activeIndentorId,
        activeIndentor,
        activeViewTab,
        setActiveViewTab,
        setActiveRole,
        setActiveIndentorId,
        publishInquiry,
        updateInquiryHeader,
        updateAdminColumns,
        updateLineItemField,
        saveLineItemDraft,
        submitLineItem,
        unlockLineItem,
        importExcelMaterials,
        addMaterialItem,
        deleteMaterialItem,
        resetToDefaultInquiry,
        stats,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};

/**
 * Column-Level Security (CLS) Sanitizer
 * Strips all Admin-only fields (IMPORT/LOCAL, Last Buying Price, Active MFGs, Custom Data, Under Dev Status)
 * before any data reaches the Indenter/Vendor portal view or payload.
 */
export function sanitizeMaterialForVendor(mat: InquiryMaterialItem) {
  const {
    importOrLocal: _importOrLocal,
    lastBuyingPriceUSD: _lastBuyingPriceUSD,
    benchmarkPriceUSD: _benchmarkPriceUSD,
    activeMfgs: _activeMfgs,
    customDataMfgs: _customDataMfgs,
    underDevelopmentStatus: _underDev,
    ...safeItem
  } = mat;
  return safeItem;
}

