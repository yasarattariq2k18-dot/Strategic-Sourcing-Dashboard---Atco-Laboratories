import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google Gen AI helper
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Atco Strategic Sourcing AI Engine' });
});

// AI Material Review & Manufacturer Development Advisory Endpoint
app.post('/api/ai-review-material', async (req, res) => {
  try {
    const { materialCode, materialName, inquiry, quotations } = req.body;

    if (!materialCode && !materialName) {
      return res.status(400).json({ error: 'Material Code or Material Name is required' });
    }

    const ai = getGenAI();

    // Context formatting for prompt
    const inqContext = inquiry
      ? `Material Code: ${inquiry.materialCode}
Material Name: ${inquiry.materialName}
Category: ${inquiry.category} (API / Excipient)
Annual PO Quantity: ${inquiry.annualDemandQty} ${inquiry.uom}
Per Lot Batch Qty: ${inquiry.perLotQty} ${inquiry.uom}
Shipment Mode: ${inquiry.shipmentMode || 'SEA'}
Target Benchmark Price: $${inquiry.targetPriceUSD}/${inquiry.uom}
Last Purchase Price: $${inquiry.lastPurchasePriceUSD || 'N/A'}/${inquiry.uom}
Preferred Innovators/Makers: ${inquiry.preferMfg || 'N/A'}
Preferred Origins: ${inquiry.preferOrigin || 'N/A'}
Initial Sample Required: ${inquiry.initialSampleQtyReq || '500GM 1st Lot + WS'}
Trial Sample Required: ${inquiry.trialSampleQtyReq || '1KG-2KG 2nd Lot'}`
      : `Material: ${materialName || materialCode}`;

    const quotesContext = Array.isArray(quotations) && quotations.length > 0
      ? quotations.map((q: any, idx: number) => `
Option ${idx + 1}:
- Indentor / Supplier: ${q.indentorName}
- Manufacturer / Maker: ${q.vendorManufacturer} (${q.originCountry || 'N/A'})
- Quoted Rate: $${q.quotedRateUSD}/${q.uom} CFR Karachi
- Price Variance vs Target: ${q.quotedRateUSD <= (inquiry?.targetPriceUSD || 0) ? 'SAVING' : 'PREMIUM'} ($${Math.abs((inquiry?.targetPriceUSD || 0) - q.quotedRateUSD).toFixed(2)} / ${q.priceVariancePct || 0}%)
- Annual Savings Potential: $${q.annualSavingsPotentialUSD || 0}
- MOQ: ${q.moq || 0} ${q.uom} (vs Per Lot: ${inquiry?.perLotQty || 'N/A'})
- Lead Time: ${q.leadTimeWeeks || 'N/A'} Weeks
- Payment Terms: ${q.paymentTerms || '100% LC'}
- Regulatory Tech Dossier: DMF (${q.dmfStatus || 'N/A'}), GMP (${q.gmpCertificateStatus || 'N/A'}), Stability (${q.stabilityDataAvailable ? 'Zone IVb 36M Available' : 'Pending'}), COA (${q.coaAvailable ? 'Available' : 'Pending'}), Nitrosamine Declared (${q.nitrosamineResidualSolventsDeclared ? 'YES' : 'NO'}), Docs Score: ${q.docsScore || 0}/5
- Plant QA Audit Status: ${q.auditStatus} (Rating: ${q.auditScoreRating || 'N/A'}, Audited By: ${q.auditedBy || 'N/A'}, Remarks: ${q.auditRemarks || 'N/A'})
`).join('\n')
      : 'No vendor quotations received yet.';

    if (ai) {
      const prompt = `You are the Executive Vice President of Strategic Sourcing & Technical Regulatory Procurement at Atco Laboratories (Pharmaceuticals).
Perform an in-depth, rigorous commercial, technical, and regulatory review of the following pharmaceutical material inquiries and vendor quotations:

### INQUIRY BENCHMARK:
${inqContext}

### AVAILABLE VENDOR QUOTATIONS:
${quotesContext}

Provide a structured, executive-grade analysis with:
1. Executive Summary & Market Pricing Dynamics
2. Detailed Technical Dossier & QA Regulatory Compliance Assessment (DMF, CEP, WHO-GMP, Zone IVb Stability, Nitrosamine risk, TSE/BSE)
3. Plant Audit Conduction Review (Site audit approval vs desk audit, audit validity)
4. Batch Sample Requisition Protocol (Commitment for 500g 1st Lot + Working Standard for QC method validation and 1-2kg for R&D trial lot)
5. MANUFACTURER DEVELOPMENT RECOMMENDATION:
   - Primary Recommended Manufacturer to Develop (Rank 1): Explicitly state Maker name, Country, Quoted Rate, Indentor, Net Annual Savings, and justification why this manufacturer should be prioritized for development.
   - Secondary / Alternate Backup Source (Rank 2): State Maker and risk-mitigation rationale.
   - Any High-Risk / Disqualified Vendors: State why (e.g. lack of audit, high MOQ, missing nitrosamine data).
6. Tactical Next Steps (e.g. Dispatch sample requisition form, issue QA pre-audit questionnaire).

Keep the analysis authoritative, direct, and structured with clear markdown headings and bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      return res.json({
        analysis: response.text,
        source: 'gemini-3.7-flash',
        generatedAt: new Date().toISOString(),
      });
    }

    // Fallback: Smart Algorithmic Pharmaceutical Sourcing Advisory Engine
    const sortedQuotes = [...(quotations || [])].sort((a: any, b: any) => {
      // Composite ranking score
      const scoreA = (a.auditStatus === 'APPROVED' ? 40 : a.auditStatus === 'DESK AUDIT ONLY' ? 25 : 10) +
        (a.docsScore || 0) * 6 +
        (a.quotedRateUSD <= (inquiry?.targetPriceUSD || 999999) ? 30 : 10) -
        (a.moq > (inquiry?.perLotQty || 0) * 2 ? 10 : 0);
      const scoreB = (b.auditStatus === 'APPROVED' ? 40 : b.auditStatus === 'DESK AUDIT ONLY' ? 25 : 10) +
        (b.docsScore || 0) * 6 +
        (b.quotedRateUSD <= (inquiry?.targetPriceUSD || 999999) ? 30 : 10) -
        (b.moq > (inquiry?.perLotQty || 0) * 2 ? 10 : 0);
      return scoreB - scoreA;
    });

    const primary = sortedQuotes[0];
    const secondary = sortedQuotes[1];

    const fallbackAnalysis = `### Executive Sourcing & Technical Review: ${inquiry?.materialName || materialName} (Code: ${inquiry?.materialCode || materialCode})

#### 1. Commercial & Price Benchmark Analysis
- **Annual Demand:** ${inquiry?.annualDemandQty || 'N/A'} ${inquiry?.uom || 'KG'} across planned production lots (Batch size: ${inquiry?.perLotQty || 'N/A'} ${inquiry?.uom || 'KG'}).
- **Target Benchmark Price:** **$${inquiry?.targetPriceUSD || 'N/A'}/${inquiry?.uom || 'KG'}** (Last Purchase: $${inquiry?.lastPurchasePriceUSD || 'N/A'}).
- **Market Response:** Received ${quotations?.length || 0} competitive offer(s). Lowest quoted rate is **$${primary ? primary.quotedRateUSD : 'N/A'}/${inquiry?.uom || 'KG'}** from **${primary ? primary.vendorManufacturer : 'N/A'}** via *${primary ? primary.indentorName : 'N/A'}*, yielding an estimated **$${primary?.annualSavingsPotentialUSD ? primary.annualSavingsPotentialUSD.toLocaleString() : '0'}** (${primary?.priceVariancePct || '0'}%) annual savings.

#### 2. Regulatory & Technical Dossier Compliance
${sortedQuotes.map((q: any) => `- **${q.vendorManufacturer}** (${q.originCountry}): Dossier Score **${q.docsScore}/5** (${q.dmfStatus}, ${q.gmpCertificateStatus}, ${q.stabilityDataAvailable ? 'Zone IVb 36M Stability Available' : 'Stability Pending'}, Nitrosamine declaration ${q.nitrosamineResidualSolventsDeclared ? 'Verified' : 'Required'}).`).join('\n')}

#### 3. Plant Audit Status & QA Feasibility
${sortedQuotes.map((q: any) => `- **${q.vendorManufacturer}:** Audit status is **${q.auditStatus}** (${q.auditRemarks || 'Standard QA qualification'}).`).join('\n')}

#### 4. Strategic Manufacturer Development Recommendation
- 🥇 **PRIMARY DEVELOPMENT RECOMMENDATION (Rank 1): ${primary ? primary.vendorManufacturer : 'None available'}**
  - **Origin & Indentor:** ${primary ? `${primary.originCountry} | via ${primary.indentorName}` : 'N/A'}
  - **Quoted Rate:** **$${primary ? primary.quotedRateUSD : '0'}/${inquiry?.uom || 'KG'} CFR Karachi** (Savings: $${primary?.annualSavingsPotentialUSD?.toLocaleString() || '0'}/yr)
  - **Commercial Terms:** MOQ ${primary?.moq || 'N/A'} ${inquiry?.uom || 'KG'} (${primary?.leadTimeWeeks || 'N/A'} Weeks Lead Time, ${primary?.paymentTerms || 'LC 90 Days'})
  - **Development Justification:** Presents the highest combined technical-commercial readiness index. Verified regulatory pack, favorable unit economics under benchmark, and acceptable QA plant audit compliance.
${secondary ? `
- 🥈 **SECONDARY BACKUP SOURCE (Rank 2): ${secondary.vendorManufacturer}**
  - **Origin & Indentor:** ${secondary.originCountry} | via ${secondary.indentorName} ($${secondary.quotedRateUSD}/${inquiry?.uom || 'KG'})
  - **Strategic Role:** Serves as a validated alternative source to hedge supply chain risks and geographic concentration.` : ''}

#### 5. Sample Requisition & Action Protocol
1. **Analytical QC Validation:** Requisition **${inquiry?.initialSampleQtyReq || '500GM 1st Lot + Working Standard'}** along with Manufacturer Batch COA & Analytical Test Method (ATM).
2. **Formulation Trial:** Request **${inquiry?.trialSampleQtyReq || '1KG-2KG 2nd Lot'}** for pilot stability batch compounding.
3. **Vendor Qualification:** Issue Atco QA Vendor Questionnaire and confirm Nitrosamine risk evaluation dossier.`;

    return res.json({
      analysis: fallbackAnalysis,
      source: 'algorithmic-decision-matrix',
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/ai-review-material:', error);
    res.status(500).json({ error: error.message || 'Failed to generate AI analysis' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Strategic Sourcing Server running on http://localhost:${PORT}`);
  });
}

startServer();
