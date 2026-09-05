import { InitiativeRecord } from '../types';

// Sample visual proof SVG assets
const trackingSheetSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <rect width="800" height="480" fill="%230f172a"/>
  <rect x="20" y="20" width="760" height="50" rx="4" fill="%231e293b"/>
  <circle cx="45" cy="45" r="7" fill="%23ef4444"/>
  <circle cx="65" cy="45" r="7" fill="%23f59e0b"/>
  <circle cx="85" cy="45" r="7" fill="%2310b981"/>
  <text x="115" y="50" fill="%23f8fafc" font-family="system-ui, sans-serif" font-size="14" font-weight="bold">Centralized Sample Tracking &amp; Traceability Registry — Google Spreadsheet</text>
  <rect x="670" y="33" width="90" height="24" rx="3" fill="%232563eb"/>
  <text x="682" y="49" fill="white" font-family="sans-serif" font-size="10" font-weight="bold">LIVE SYNC</text>
  <rect x="20" y="85" width="760" height="375" rx="4" fill="%231e293b"/>
  <!-- Table Header -->
  <rect x="35" y="105" width="730" height="32" fill="%23334155"/>
  <text x="50" y="125" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">SAMPLE ID</text>
  <text x="140" y="125" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">MATERIAL NAME</text>
  <text x="320" y="125" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">SUPPLIER</text>
  <text x="440" y="125" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">QA/QC STAGE</text>
  <text x="560" y="125" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">STABILITY</text>
  <text x="670" y="125" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">ACTION</text>
  <!-- Rows -->
  <line x1="35" y1="175" x2="765" y2="175" stroke="%23334155" stroke-width="1"/>
  <text x="50" y="162" fill="%2338bdf8" font-family="monospace" font-size="11">SMP-2026-081</text>
  <text x="140" y="162" fill="%23f8fafc" font-family="sans-serif" font-size="11" font-weight="bold">Ceftriaxone Sterile API</text>
  <text x="320" y="162" fill="%23cbd5e1" font-family="sans-serif" font-size="11">BioPure Pharma</text>
  <rect x="440" y="148" width="85" height="20" rx="10" fill="%23065f46"/>
  <text x="452" y="162" fill="%236ee7b7" font-family="sans-serif" font-size="10" font-weight="bold">Approved</text>
  <text x="560" y="162" fill="%2310b981" font-family="sans-serif" font-size="11">6-Month Pass</text>
  <text x="670" y="162" fill="%2338bdf8" font-family="sans-serif" font-size="11">AVL Trigger</text>

  <line x1="35" y1="215" x2="765" y2="215" stroke="%23334155" stroke-width="1"/>
  <text x="50" y="202" fill="%2338bdf8" font-family="monospace" font-size="11">SMP-2026-082</text>
  <text x="140" y="202" fill="%23f8fafc" font-family="sans-serif" font-size="11" font-weight="bold">Omeprazole Pellets 8.5%</text>
  <text x="320" y="202" fill="%23cbd5e1" font-family="sans-serif" font-size="11">Global Syn Ltd</text>
  <rect x="440" y="188" width="95" height="20" rx="10" fill="%231e3a8a"/>
  <text x="448" y="202" fill="%2393c5fd" font-family="sans-serif" font-size="10" font-weight="bold">Under Stability</text>
  <text x="560" y="202" fill="%23f59e0b" font-family="sans-serif" font-size="11">Month 3 Pending</text>
  <text x="670" y="202" fill="%2394a3b8" font-family="sans-serif" font-size="11">Forecast Sent</text>

  <line x1="35" y1="255" x2="765" y2="255" stroke="%23334155" stroke-width="1"/>
  <text x="50" y="242" fill="%2338bdf8" font-family="monospace" font-size="11">SMP-2026-083</text>
  <text x="140" y="242" fill="%23f8fafc" font-family="sans-serif" font-size="11" font-weight="bold">Polyvinylpyrrolidone K30</text>
  <text x="320" y="242" fill="%23cbd5e1" font-family="sans-serif" font-size="11">PolyChem Int</text>
  <rect x="440" y="228" width="90" height="20" rx="10" fill="%23701a75"/>
  <text x="448" y="242" fill="%23f0abfc" font-family="sans-serif" font-size="10" font-weight="bold">QC Testing</text>
  <text x="560" y="242" fill="%23cbd5e1" font-family="sans-serif" font-size="11">Charging Next</text>
  <text x="670" y="242" fill="%2338bdf8" font-family="sans-serif" font-size="11">Review</text>
  
  <!-- Summary Box -->
  <rect x="35" y="295" width="730" height="135" rx="4" fill="%230f172a" stroke="%23334155"/>
  <text x="55" y="325" fill="%23f8fafc" font-family="sans-serif" font-size="12" font-weight="bold">AUTOMATED REAL-TIME TRACEABILITY METRICS</text>
  <text x="55" y="355" fill="%2394a3b8" font-family="sans-serif" font-size="11">• 100% Elimination of communication gap between Sourcing, PD, QC, and QA teams</text>
  <text x="55" y="380" fill="%2394a3b8" font-family="sans-serif" font-size="11">• Centralized Google Cloud Sheets synchronization with automated timestamp logging</text>
  <text x="55" y="405" fill="%2394a3b8" font-family="sans-serif" font-size="11">• Zero response delays achieved across all active alternate source inquiries</text>
</svg>`;

const lookerStudioSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <rect width="800" height="480" fill="%230a0f1d"/>
  <rect x="20" y="20" width="760" height="50" rx="4" fill="%23141c2e"/>
  <text x="40" y="50" fill="%23f8fafc" font-family="sans-serif" font-size="15" font-weight="bold">Looker Studio — Supplier Live Traceability &amp; Stakeholder Portal</text>
  <rect x="670" y="33" width="90" height="24" rx="3" fill="%2310b981"/>
  <text x="682" y="49" fill="white" font-family="sans-serif" font-size="10" font-weight="bold">EXTERNAL LIVE</text>
  <!-- KPI cards -->
  <rect x="20" y="85" width="240" height="95" rx="4" fill="%231e293b"/>
  <text x="40" y="115" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">ACTIVE SUPPLIERS</text>
  <text x="40" y="155" fill="%2338bdf8" font-family="sans-serif" font-size="28" font-weight="black">48</text>
  <rect x="280" y="85" width="240" height="95" rx="4" fill="%231e293b"/>
  <text x="300" y="115" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">SAMPLE VISIBILITY SCORE</text>
  <text x="300" y="155" fill="%2310b981" font-family="sans-serif" font-size="28" font-weight="black">99.4%</text>
  <rect x="540" y="85" width="240" height="95" rx="4" fill="%231e293b"/>
  <text x="560" y="115" fill="%2394a3b8" font-family="sans-serif" font-size="11" font-weight="bold">AVG RESPONSE TIME</text>
  <text x="560" y="155" fill="%23f59e0b" font-family="sans-serif" font-size="28" font-weight="black">&lt; 24h</text>
  <!-- Visuals -->
  <rect x="20" y="195" width="460" height="260" rx="4" fill="%231e293b"/>
  <text x="40" y="225" fill="%23f8fafc" font-family="sans-serif" font-size="12" font-weight="bold">Supplier Milestone Progress Breakdown</text>
  <rect x="40" y="250" width="300" height="18" rx="2" fill="%232563eb"/>
  <rect x="345" y="250" width="80" height="18" rx="2" fill="%2310b981"/>
  <text x="40" y="295" fill="%2394a3b8" font-family="sans-serif" font-size="11">Initial Testing Completed: 82%</text>
  <text x="40" y="325" fill="%2394a3b8" font-family="sans-serif" font-size="11">Stability Charged: 64%</text>
  <text x="40" y="355" fill="%2394a3b8" font-family="sans-serif" font-size="11">Pending Docs Uploaded via Cloud: 91%</text>
  <text x="40" y="385" fill="%2394a3b8" font-family="sans-serif" font-size="11">Audit Scheduling Visibility: 100%</text>
  <rect x="500" y="195" width="280" height="260" rx="4" fill="%231e293b"/>
  <text x="520" y="225" fill="%23f8fafc" font-family="sans-serif" font-size="12" font-weight="bold">Stakeholder Access</text>
  <circle cx="640" cy="300" r="50" fill="none" stroke="%233b82f6" stroke-width="12" stroke-dasharray="240 70"/>
  <text x="625" y="305" fill="white" font-family="sans-serif" font-size="16" font-weight="bold">Live</text>
  <text x="520" y="390" fill="%2394a3b8" font-family="sans-serif" font-size="11" text-anchor="middle">Both Internal &amp; External Supplier Portal</text>
</svg>`;

export const INITIAL_INITIATIVES_DATA: InitiativeRecord[] = [
  // =========================================================================
  // SUB-BOX 1: PROCESS IMPROVEMENT & DIGITALIZATION INITIATIVES (PERFORMED)
  // Items 1 through 12 from the Sourcing & Transformation Registry
  // =========================================================================
  {
    id: 'init-perf-1',
    type: 'performed',
    itemNumber: 1,
    challengingArea: '1. Communication & Responsiveness Gap: Lack of sample traceability, delay & incomplete QA/QC/PD response regarding submitted samples.',
    category: 'Traceability & Visibility',
    name: 'Centralized Tracking System (Google Spreadsheet)',
    impactOutcome: 'Real-time traceability, visibility, and elimination of response delays for submitted samples.',
    createdAt: '2026-01-10',
    updatedAt: '2026-08-15',
    attachments: [
      {
        id: 'proof-init-1-img',
        name: 'Google_Spreadsheet_Tracking_Architecture.png',
        fileType: 'image',
        mimeType: 'image/svg+xml',
        sizeFormatted: '148 KB',
        dataUrl: trackingSheetSvg,
        uploadedAt: '2026-08-15',
      },
      {
        id: 'proof-init-1-ppt',
        name: 'Centralized_Tracking_Executive_Summary.pptx',
        fileType: 'ppt',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        sizeFormatted: '2.4 MB',
        uploadedAt: '2026-08-16',
      },
    ],
  },
  {
    id: 'init-perf-2',
    type: 'performed',
    itemNumber: 2,
    challengingArea: '2. Transparency & Compliance Barriers (Both internal & External): Lack of Supplier Visibility on Sample Arrangements, Submitted Sample Initial Testing, Stability, Pending Documents submission and Audit conduction Status.',
    category: 'Stakeholder Transparency',
    name: 'Supplier Live Traceability (Looker Studio)',
    impactOutcome: 'Enhanced external stakeholder transparency regarding sample arrangement, development, documents, and audit status.',
    createdAt: '2026-01-15',
    updatedAt: '2026-08-20',
    attachments: [
      {
        id: 'proof-init-2-img',
        name: 'Looker_Studio_Live_Traceability_Dashboard.png',
        fileType: 'image',
        mimeType: 'image/svg+xml',
        sizeFormatted: '210 KB',
        dataUrl: lookerStudioSvg,
        uploadedAt: '2026-08-20',
      },
    ],
  },
  {
    id: 'init-perf-3',
    type: 'performed',
    itemNumber: 3,
    challengingArea: '3. Data Maintenance & Documentation Inefficiencies by QA: Data maintenance gap in QA regarding under development vendor docs, and inefficient docs management via fragmented emails.',
    category: 'Centralized Document Governance',
    name: 'Google Drive Mechanism for Vendor Docs Upload (Google Drive Mechanism Established & Link Mechanism for Vendor Docs Upload)',
    impactOutcome: 'Streamlined and centralized document governance that establishes a secure database and eliminates fragmented email submissions.',
    createdAt: '2026-02-01',
    updatedAt: '2026-08-25',
    attachments: [
      {
        id: 'proof-init-3-ppt',
        name: 'Vendor_Document_Governance_Protocol.pptx',
        fileType: 'ppt',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        sizeFormatted: '1.8 MB',
        uploadedAt: '2026-08-25',
      },
    ],
  },
  {
    id: 'init-perf-4',
    type: 'performed',
    itemNumber: 4,
    challengingArea: '4. Manual Audit Trigger Gaps: Upon 3rd-month stability satisfactory results, QA does not raise audit requirements.',
    category: 'Automated Audit Trigger Mechanism',
    name: 'Automated Audit Trigger Mechanism (Post-3rd Month Stability) - Established a mechanism where once stability charging is initiated, the system automatically provides a 2-month prior forecast to QA',
    impactOutcome: 'Proactive compliance scheduling that prevents audit delays by forecasting final milestones well in advance.',
    createdAt: '2026-02-15',
    updatedAt: '2026-08-28',
  },
  {
    id: 'init-perf-5',
    type: 'performed',
    itemNumber: 5,
    challengingArea: '5. Strategic Material Classification: Lack of critical material identification for strategy proposition.',
    category: 'Risk Mitigation & Strategy',
    name: 'Advanced Data Analytics (Power BI) for Single Source Risks',
    impactOutcome: 'Data-driven risk mitigation with real-time monitoring of single-source & critical material risks for Safety Stock Strategy Proposition.',
    createdAt: '2026-03-01',
    updatedAt: '2026-08-30',
    attachments: [
      {
        id: 'proof-init-5-ppt',
        name: 'PowerBI_Single_Source_Risk_Strategy.pptx',
        fileType: 'ppt',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        sizeFormatted: '3.1 MB',
        uploadedAt: '2026-08-30',
      },
    ],
  },
  {
    id: 'init-perf-6',
    type: 'performed',
    itemNumber: 6,
    challengingArea: '6. Stability-Time & Testing Bottlenecks: Longer stability result timeline.',
    category: 'Milestone Monitoring',
    name: 'Automated Trigger of 6-Month Stability Completion Timeline',
    impactOutcome: 'Automated milestone monitoring to optimize and track stability result timelines.',
    createdAt: '2026-03-10',
    updatedAt: '2026-09-01',
  },
  {
    id: 'init-perf-7',
    type: 'performed',
    itemNumber: 7,
    challengingArea: '7. Quality Gating Deficiencies: No check & balance of Quality & Compliance before sampling.',
    category: 'Quality Assurance',
    name: 'Pre-Sampling Quality & Compliance Check (Specs & Docs verified prior to sampling; Specs verified & Vendor docs Acknowledgement taken prior to Sampling)',
    impactOutcome: 'Proactive quality gating to ensure compliance and quality checks before sampling begins.',
    createdAt: '2026-03-20',
    updatedAt: '2026-09-01',
  },
  {
    id: 'init-perf-8',
    type: 'performed',
    itemNumber: 8,
    challengingArea: '8. Technical Resource Constraints: QC/PD test & trial capacity constraint.',
    category: 'Resource Optimization',
    name: 'Analyze Monthly Capacity & Allocation (QC & PD)',
    impactOutcome: 'Resource and task optimization through capacity analysis of QC and PD tests/trials.',
    createdAt: '2026-04-05',
    updatedAt: '2026-09-02',
  },
  {
    id: 'init-perf-9',
    type: 'performed',
    itemNumber: 9,
    challengingArea: '9. Rejections Feedback & Improvement Loops: Limited feedback regarding rejected samples.',
    category: 'Root-Cause Analysis',
    name: 'Strategic Collaboration with QC/PD for Technical Root Cause Analysis on Rejections',
    impactOutcome: 'Technical source reclamation and improved feedback loops for rejected samples.',
    createdAt: '2026-04-18',
    updatedAt: '2026-09-02',
  },
  {
    id: 'init-perf-10',
    type: 'performed',
    itemNumber: 10,
    challengingArea: '10. Process Non-Standardization: Non Standardize Alternate Source Inquiry Format.',
    category: 'Standardization',
    name: 'Standardized Inquiry Framework/Format',
    impactOutcome: 'Protocol standardization across alternate source inquiry formats.',
    createdAt: '2026-05-01',
    updatedAt: '2026-09-03',
  },
  {
    id: 'init-perf-11',
    type: 'performed',
    itemNumber: 11,
    challengingArea: '11. Cross-Functional Synergy: Lack of Collaboration Between Cross-Functional Team.',
    category: 'Organizational Alignment',
    name: 'Cross-Functional Synchronization',
    impactOutcome: 'Improved cross-functional synergy and organizational alignment.',
    createdAt: '2026-05-15',
    updatedAt: '2026-09-03',
  },
  {
    id: 'init-perf-12',
    type: 'performed',
    itemNumber: 12,
    challengingArea: '12. Data Reconciliation & Nomenclature: Lack of Common Material Identification (LAB & AHL).',
    category: 'Material Intelligence',
    name: 'Intra-Company Synergy (LAB to AHL) - Mfg AVL Activation against Common Material',
    impactOutcome: 'Unified material intelligence through common material identification and cross-company synergy.',
    createdAt: '2026-06-01',
    updatedAt: '2026-09-04',
  },

  // =========================================================================
  // SUB-BOX 2: PROCESS IMPROVEMENT & DIGITALIZATION INITIATIVES (IN-PROGRESS & UPCOMING PROJECTS)
  // Item 13 from document: Identification/Ranking & Future Projects
  // =========================================================================
  {
    id: 'init-up-1',
    type: 'upcoming',
    itemNumber: 1,
    challengingArea: 'Commercial PR release without complete prerequisite verification; risk of procuring single-source materials without validated alternate pipeline.',
    category: 'Alternate Source Development',
    name: 'Single Source Material Alternate Working (Prerequisites check before Commercial PR release)',
    impactOutcome: 'Before Commercial PR release, NPD sourcing team makesure that all prerequisits must be fulfilled prior.',
    createdAt: '2026-07-01',
    updatedAt: '2026-09-04',
  },
  {
    id: 'init-up-2',
    type: 'upcoming',
    itemNumber: 2,
    challengingArea: 'High concentration of procurement expenditure across top materials without alternate commercial pricing or second-source security.',
    category: 'Project Materials',
    name: 'Cost Saving via Alternate Source Development & Commercialization against Top 50% contributed Materials',
    impactOutcome: 'Under Sourcing & commercialization. Project under sourcing & development stage.',
    createdAt: '2026-07-15',
    updatedAt: '2026-09-04',
  },
  {
    id: 'init-up-3',
    type: 'upcoming',
    itemNumber: 3,
    challengingArea: 'Manual reporting workflows, fragmented email tracking, and lack of unified real-time visibility into sourcing intelligence.',
    category: 'Digitalization Projects',
    name: 'Web-based Dashboard View for Key Sourcing and Saving Insights (Under process mapping & development)',
    impactOutcome: 'Working on it, under process mapping and development stage.',
    createdAt: '2026-08-01',
    updatedAt: '2026-09-04',
  },
];
