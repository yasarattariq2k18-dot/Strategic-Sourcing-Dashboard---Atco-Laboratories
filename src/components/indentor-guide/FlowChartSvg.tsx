import React from 'react';

/**
 * High-fidelity vector SVG reproduction of the official ATCO Flow Chart:
 * "FLOW CHART (From Alternate Sourcing till Commercialization)"
 * Matches all swimlanes, text, colors, connectors, and shapes exactly as in FLOW CHART.pdf
 */
export const FlowChartSvg: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1230 1780"
      className={`w-full h-auto bg-white font-sans select-text ${className}`}
      style={{ minWidth: '950px' }}
    >
      <defs>
        {/* Drop shadows */}
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.12" />
        </filter>
        <filter id="softShadow" x="-3%" y="-3%" width="106%" height="110%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.08" />
        </filter>

        {/* Marker Arrow heads */}
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e3a5f" />
        </marker>
        <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
        </marker>
        <marker id="arrowDark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a" />
        </marker>
      </defs>

      {/* ======================================================== */}
      {/* 1. DOCUMENT TITLE & ATCO LOGO HEADER                     */}
      {/* ======================================================== */}
      <g id="header">
        {/* Main Title */}
        <text
          x="580"
          y="62"
          textAnchor="middle"
          fill="#1d599b"
          fontSize="36"
          fontWeight="900"
          letterSpacing="1.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          FLOW CHART
        </text>
        <text
          x="580"
          y="102"
          textAnchor="middle"
          fill="#1d599b"
          fontSize="24"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          (From Alternate Sourcing till Commercialization)
        </text>

        {/* Official ATCO Logo (Top Right) */}
        <g transform="translate(1080, 20)">
          {/* Circular Emblem */}
          <circle cx="45" cy="45" r="42" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <path d="M 45 4 A 41 41 0 0 0 6 56 L 6 56 C 28 42, 42 20, 45 4 Z" fill="#0082cb" />
          <path d="M 45 4 A 41 41 0 0 1 84 56 L 84 56 C 62 42, 48 20, 45 4 Z" fill="#0082cb" />
          <path d="M 9 60 A 41 41 0 0 0 41 85 L 41 52 L 9 60 Z" fill="#0082cb" />
          <path d="M 49 52 L 49 85 A 41 41 0 0 0 81 60 L 49 52 Z" fill="#0082cb" />
          <text
            x="45"
            y="104"
            textAnchor="middle"
            fill="#1e3a8a"
            fontSize="14"
            fontWeight="900"
            letterSpacing="1"
          >
            ATCO
          </text>
        </g>
      </g>

      {/* ======================================================== */}
      {/* 2. SWIMLANE HEADERS & SEPARATOR                           */}
      {/* ======================================================== */}
      <g id="swimlanes">
        {/* ATCO Header Block */}
        <rect
          x="40"
          y="135"
          width="250"
          height="46"
          rx="6"
          fill="#1d599b"
          filter="url(#shadow)"
        />
        <text
          x="165"
          y="164"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="17"
          fontWeight="800"
          letterSpacing="1"
        >
          ATCO
        </text>

        {/* INDENTOR/SUPPLIER END Header Block */}
        <rect
          x="450"
          y="135"
          width="320"
          height="46"
          rx="6"
          fill="#1d599b"
          filter="url(#shadow)"
        />
        <text
          x="610"
          y="154"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="15"
          fontWeight="800"
          letterSpacing="0.8"
        >
          INDENTOR/SUPPLIER
        </text>
        <text
          x="610"
          y="171"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="15"
          fontWeight="800"
          letterSpacing="0.8"
        >
          END
        </text>

        {/* Light vertical separator line between ATCO and Indentor swimlanes */}
        <line
          x1="340"
          y1="190"
          x2="340"
          y2="1750"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
      </g>

      {/* ======================================================== */}
      {/* 3. ROW 1: INQUIRY FLOAT & SUPPLIER RESPONSE              */}
      {/* ======================================================== */}
      <g id="row-1-inquiry">
        {/* Start Pill */}
        <rect x="70" y="205" width="100" height="32" rx="16" fill="#38bdf8" filter="url(#softShadow)" />
        <text x="120" y="226" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">
          Start
        </text>

        {/* Arrow Start -> Inquiry Float */}
        <line x1="120" y1="237" x2="120" y2="255" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Inquiry Float with Deadline Box (Left Box in ATCO) */}
        <rect x="30" y="255" width="155" height="74" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="107.5" y="274" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="700">
          Inquiry Float
        </text>
        <text x="107.5" y="291" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="700">
          With Deadline
        </text>
        <text x="107.5" y="307" textAnchor="middle" fill="#334155" fontSize="10.5">
          (mention on Inquiry Email)
        </text>
        <text x="107.5" y="321" textAnchor="middle" fill="#1e40af" fontSize="10.5" fontWeight="700">
          Tentattively 1 month
        </text>

        {/* "Contains" Callout Box attached to right of Inquiry Float without overlapping */}
        <g id="contains-box">
          {/* Header tab "Contains" */}
          <rect x="195" y="240" width="125" height="22" rx="3" fill="#0284c7" />
          <text x="257.5" y="255" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">
            Contains
          </text>
          {/* Body */}
          <rect x="195" y="262" width="125" height="42" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" filter="url(#softShadow)" />
          <text x="257.5" y="276" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="600">
            Excell Sheet enclosed
          </text>
          <text x="257.5" y="288" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="600">
            Alternate Sourcing
          </text>
          <text x="257.5" y="300" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="600">
            Materials
          </text>
          {/* Sub-strip "Atco Approved Specs" */}
          <rect x="195" y="304" width="125" height="20" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
          <text x="257.5" y="318" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="700">
            Atco Approved Specs
          </text>
          {/* Link line between Inquiry Float and Contains */}
          <line x1="185" y1="292" x2="195" y2="292" stroke="#0284c7" strokeWidth="1.5" />
        </g>

        {/* Line from Inquiry / Contains over to Supplier Submission in Indentor Lane */}
        <path d="M 320 285 L 375 285 L 375 210 L 450 210" fill="none" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Supplier Submit Quotation Box */}
        <rect x="450" y="190" width="320" height="58" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="610" y="208" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Supplier Submit Quotation in Shared Excel
        </text>
        <text x="610" y="223" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Sheet with 100% comply COAs Collectively
        </text>
        <text x="610" y="239" textAnchor="middle" fill="#334155" fontSize="10.5">
          As per given format against inquiry
        </text>

        {/* Side Callout: "if COA not comply 100%..." */}
        <line x1="770" y1="210" x2="795" y2="210" stroke="#0284c7" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
        <rect x="795" y="190" width="165" height="42" rx="4" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1" />
        <text x="877.5" y="207" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="600">
          if COA not comply 100% then share
        </text>
        <text x="877.5" y="221" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="600">
          supplier justification on letterhead
        </text>

        {/* Arrow down to Deadline response */}
        <line x1="610" y1="248" x2="610" y2="274" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Supplier Submit Response within given Deadline */}
        <rect x="495" y="274" width="230" height="42" rx="6" fill="#0284c7" filter="url(#softShadow)" />
        <text x="610" y="291" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="700">
          Supplier Submit Response
        </text>
        <text x="610" y="306" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="700">
          within given Deadline
        </text>

        {/* Decision Branches from Deadline Box: YES / NO */}
        {/* YES Branch */}
        <line x1="725" y1="286" x2="770" y2="286" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <text x="748" y="280" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="800">
          Yes
        </text>
        <rect x="770" y="272" width="160" height="30" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
        <text x="850" y="285" textAnchor="middle" fill="#166534" fontSize="9.5" fontWeight="700">
          Continue Part of
        </text>
        <text x="850" y="297" textAnchor="middle" fill="#166534" fontSize="9.5" fontWeight="700">
          Alternate Sourcing review
        </text>

        {/* NO Branch */}
        <line x1="725" y1="304" x2="770" y2="304" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <text x="748" y="316" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="800">
          No
        </text>
        <rect x="770" y="308" width="160" height="30" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="850" y="321" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="700">
          Exclude from
        </text>
        <text x="850" y="333" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="700">
          Alternate Sourcing review/Comparative
        </text>
      </g>

      {/* ======================================================== */}
      {/* 4. ROW 2: MEETING & EVALUATION                           */}
      {/* ======================================================== */}
      <g id="row-2-meeting">
        {/* Connecting line down to Meeting Box */}
        <line x1="610" y1="316" x2="610" y2="365" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Call Meeting with vendors box */}
        <rect x="470" y="365" width="280" height="54" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="610" y="383" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Call Meeting With
        </text>
        <text x="610" y="398" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          vendors/indentors for discussion
        </text>
        <text x="610" y="412" textAnchor="middle" fill="#475569" fontSize="10">
          (once or twice a week)
        </text>

        {/* Small subtitle below meeting */}
        <text x="610" y="434" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">
          if any issue found will discuss with them
        </text>

        {/* Quotation evaluated by ATCO */}
        <rect x="35" y="365" width="230" height="58" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="150" y="383" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Received Quotation
        </text>
        <text x="150" y="398" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          evaluated by Atco after
        </text>
        <text x="150" y="413" textAnchor="middle" fill="#334155" fontSize="10.5">
          Inquiry submission deadline
        </text>

        {/* Horizontal connector line linking Meeting and ATCO Evaluation */}
        <line x1="470" y1="392" x2="265" y2="392" stroke="#1e3a5f" strokeWidth="1.5" strokeDasharray="3 3" />
      </g>

      {/* ======================================================== */}
      {/* 5. ROW 3: COA SHARED WITH QC & MAX 2 REVISIONS RULE      */}
      {/* ======================================================== */}
      <g id="row-3-qc-revision">
        {/* Arrow from ATCO evaluation to COA with QC */}
        <line x1="150" y1="423" x2="150" y2="465" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* After Sources finalized box */}
        <rect x="35" y="465" width="230" height="52" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="150" y="483" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          After Sources finalized for
        </text>
        <text x="150" y="498" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Alternate Sourcing
        </text>
        <text x="150" y="512" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="700">
          COA shared with QC
        </text>

        {/* Horizontal Arrow from ATCO to QC Observation box */}
        <line x1="265" y1="491" x2="455" y2="491" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* QC observation (specs related) Box */}
        <rect x="455" y="465" width="310" height="52" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="610" y="483" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="700">
          QC observation (specs related) share with
        </text>
        <text x="610" y="498" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="700">
          vendor for revised COA arrangement
        </text>
        <text x="610" y="512" textAnchor="middle" fill="#78350f" fontSize="10">
          (As per given format share from Atco)
        </text>

        {/* Arrow down to Max 2 times observation */}
        <line x1="610" y1="517" x2="610" y2="550" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Max 2 times Observations acceptable (CRITICAL SLA BOX) */}
        <rect x="500" y="550" width="220" height="42" rx="6" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" filter="url(#softShadow)" />
        <text x="610" y="568" textAnchor="middle" fill="#7c2d12" fontSize="11.5" fontWeight="900">
          Max 2 times Observations
        </text>
        <text x="610" y="584" textAnchor="middle" fill="#7c2d12" fontSize="11.5" fontWeight="900">
          acceptable
        </text>

        {/* Arrow Right to Discontinue condition */}
        <line x1="720" y1="571" x2="775" y2="571" stroke="#ea580c" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="775" y="557" width="90" height="28" rx="4" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1" />
        <text x="820" y="570" textAnchor="middle" fill="#9f1239" fontSize="8.5" fontWeight="700">
          If more than
        </text>
        <text x="820" y="581" textAnchor="middle" fill="#9f1239" fontSize="8.5" fontWeight="700">
          twice in COA revision
        </text>

        {/* Discontinue Result Box */}
        <line x1="865" y1="571" x2="895" y2="571" stroke="#9f1239" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="895" y="550" width="220" height="44" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="1005" y="566" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="800">
          Source will be discontinue for on-
        </text>
        <text x="1005" y="579" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="800">
          word alternate sourcing &amp; it will
        </text>
        <text x="1005" y="589" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="800">
          mark -ve marking on indenter
        </text>
      </g>

      {/* ======================================================== */}
      {/* 6. ROW 4: COA APPROVAL & 1 MONTH DEADLINE               */}
      {/* ======================================================== */}
      <g id="row-4-coa-approval">
        {/* Arrow down from Max 2 observations */}
        <line x1="610" y1="592" x2="610" y2="628" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Informed to Indentor for COA approval box (Ample height and wrapped text to avoid overlap) */}
        <rect x="360" y="628" width="500" height="60" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="610" y="647" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Informed to Indentor for COA approval received from QC
        </text>
        <text x="610" y="663" textAnchor="middle" fill="#334155" fontSize="10">
          Accordingly ask for Initial /trial sample Qty arrangement shared by Atco at
        </text>
        <text x="610" y="677" textAnchor="middle" fill="#334155" fontSize="10">
          Inquiry stage with Indentor/Mfg
        </text>

        {/* Arrow down to 1 Month Deadline */}
        <line x1="610" y1="688" x2="610" y2="716" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* 1 Month Deadline Pill */}
        <rect x="400" y="716" width="420" height="34" rx="17" fill="#0284c7" filter="url(#shadow)" />
        <text x="610" y="737" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800" letterSpacing="0.5">
          One Month Deadline (from COA approval till sample submission)
        </text>

        {/* Branching from Deadline to Sample Submission & Drive Link */}
        {/* Left branch: Sample Submission */}
        <path d="M 480 750 L 480 775 L 450 775" fill="none" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="370" y="765" width="80" height="34" rx="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="410" y="779" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="700">
          Sample
        </text>
        <text x="410" y="792" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="700">
          Submission
        </text>

        {/* Right branch: Google Drive link created */}
        <path d="M 740 750 L 740 775 L 720 775" fill="none" stroke="#1e3a5f" strokeWidth="1.8" />
        <rect x="520" y="760" width="310" height="44" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="675" y="777" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="700">
          Google Drive link created with all checklist docs upload
        </text>
        <text x="675" y="794" textAnchor="middle" fill="#475569" fontSize="9.5">
          Must submit within 1 month time duration before sample submit to Atco
        </text>

        {/* Decision: If No / If Yes */}
        <line x1="830" y1="775" x2="880" y2="775" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <text x="855" y="768" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="700">if No</text>
        <rect x="880" y="760" width="165" height="30" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="962.5" y="779" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="700">
          Discontinue from Alternate Sourcing
        </text>

        <path d="M 830 790 L 855 790 L 855 815 L 880 815" fill="none" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <text x="855" y="810" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="700">if Yes</text>
        <rect x="880" y="802" width="165" height="30" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
        <text x="962.5" y="821" textAnchor="middle" fill="#166534" fontSize="9.5" fontWeight="700">
          Proceed for on-word process
        </text>
      </g>

      {/* ======================================================== */}
      {/* 7. ROW 5: SAMPLE RECEIPT & LOOKER STUDIO ENTRY          */}
      {/* ======================================================== */}
      <g id="row-5-looker-entry">
        {/* Sample received at Atco facility (ATCO side) */}
        <line x1="410" y1="799" x2="410" y2="845" stroke="#1e3a5f" strokeWidth="1.8" />
        <line x1="410" y1="845" x2="255" y2="845" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        <rect x="55" y="824" width="200" height="42" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="155" y="842" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Sample received at
        </text>
        <text x="155" y="857" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Atco facility
        </text>

        {/* Drive Folder link share with Atco */}
        <rect x="500" y="824" width="220" height="42" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="610" y="842" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Drive Folder link share with
        </text>
        <text x="610" y="857" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          Atco from Supplier
        </text>

        {/* Connector from Sample received & Drive link to Looker Studio Entry */}
        <path d="M 155 866 L 155 892 L 610 892" fill="none" stroke="#1e3a5f" strokeWidth="1.8" />
        <line x1="610" y1="866" x2="610" y2="905" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Newly submitted sample ENTRY Box */}
        <rect x="425" y="905" width="370" height="60" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" filter="url(#softShadow)" />
        <text x="610" y="924" textAnchor="middle" fill="#0f172a" fontSize="11.5" fontWeight="800">
          Newly submitted sample ENTRY
        </text>
        <text x="610" y="941" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="900">
          Dispaly on LOOKER STUDIO dashboard
        </text>
        <text x="610" y="956" textAnchor="middle" fill="#334155" fontSize="10">
          (Within 2 weeks from sample receiving to Atco)
        </text>

        {/* Arrow down to Guideline link box */}
        <line x1="610" y1="965" x2="610" y2="990" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Looker Studio Guideline Link Box */}
        <rect x="425" y="990" width="370" height="64" rx="6" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="610" y="1009" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="700">
          LOOKER STUDIO dashboard status review
        </text>
        <text x="610" y="1024" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="700">
          guideline link given below:
        </text>
        <text x="610" y="1042" textAnchor="middle" fill="#2563eb" fontSize="9.5" textDecoration="underline" fontStyle="italic">
          https://drive.google.com/file/d/1up2I376Vk4euC6jjzF7DEQyroUvwkp4O/view
        </text>

        {/* Actions Required Header */}
        <line x1="610" y1="1054" x2="610" y2="1080" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="450" y="1080" width="320" height="32" rx="4" fill="#0284c7" filter="url(#softShadow)" />
        <text x="610" y="1100" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
          Actions Required Against LOOKER STUDIO Guideline
        </text>
      </g>

      {/* ======================================================== */}
      {/* 8. ROW 6: LOOKER STUDIO SLA GATES & TRIGGERS             */}
      {/* ======================================================== */}
      <g id="row-6-sla-gates">
        {/* 1. Audit Waiver Box (Top Right of looker triggers) */}
        <rect x="825" y="955" width="245" height="66" rx="6" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="947.5" y="972" textAnchor="middle" fill="#0369a1" fontSize="9.5" fontWeight="800">
          Vendor Audit Waive off for AVL inclusion if
        </text>
        <text x="947.5" y="986" textAnchor="middle" fill="#0369a1" fontSize="9.5" fontWeight="800">
          Mfg have
        </text>
        <text x="947.5" y="1002" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="800">
          (USFDA/PICs/MHRA/WHO/TGA/KDMF/JDM
        </text>
        <text x="947.5" y="1014" textAnchor="middle" fill="#0f172a" fontSize="8.5" fontWeight="800">
          F/Anvisa (Brazile))cert
        </text>

        {/* Branching from Actions Required to 3 Gates */}
        {/* Gate A: Upon Stability Charged */}
        <path d="M 610 1112 L 610 1140 L 690 1140" fill="none" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="690" y="1120" width="180" height="46" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="780" y="1135" textAnchor="middle" fill="#0369a1" fontSize="9.5" fontWeight="700">
          Upon Stability Charged:
        </text>
        <text x="780" y="1149" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="900">
          ➔ Audit Required Two Month
        </text>
        <text x="780" y="1161" textAnchor="middle" fill="#0369a1" fontSize="9.5" fontWeight="700">
          Duration Trigger
        </text>

        {/* Vendor Conduct Audit within given timeline */}
        <line x1="870" y1="1143" x2="905" y2="1143" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="905" y="1122" width="135" height="42" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
        <text x="972.5" y="1137" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">
          Vendor Conduct
        </text>
        <text x="972.5" y="1150" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">
          Audit within
        </text>
        <text x="972.5" y="1161" textAnchor="middle" fill="#475569" fontSize="9">
          given timeline
        </text>

        {/* Decision Yes / No on Audit */}
        <line x1="1040" y1="1134" x2="1075" y2="1134" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <text x="1058" y="1128" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="800">Yes</text>
        <rect x="1075" y="1118" width="145" height="34" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
        <text x="1147.5" y="1132" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="700">
          Part of On-going Alternate
        </text>
        <text x="1147.5" y="1144" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="700">
          sourcng Process
        </text>

        <line x1="1040" y1="1152" x2="1075" y2="1152" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <text x="1058" y="1164" textAnchor="middle" fill="#b91c1c" fontSize="9" fontWeight="800">No</text>
        <rect x="1075" y="1156" width="145" height="34" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="1147.5" y="1169" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="700">
          Exclude from on-words
        </text>
        <text x="1147.5" y="1181" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="700">
          Alternate sourcng Process
        </text>

        {/* Gate B: Pending Docs Status */}
        <path d="M 610 1112 L 610 1200 L 690 1200" fill="none" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="690" y="1180" width="180" height="42" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="780" y="1196" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="700">
          Against Drive Link
        </text>
        <text x="780" y="1209" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="800">
          Pending/required Docs
        </text>
        <text x="780" y="1218" textAnchor="middle" fill="#78350f" fontSize="8.5">
          status updated
        </text>

        <line x1="870" y1="1201" x2="905" y2="1201" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="905" y="1180" width="135" height="42" rx="4" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
        <text x="972.5" y="1196" textAnchor="middle" fill="#92400e" fontSize="9.5" fontWeight="700">
          Vendor Upload Pending
        </text>
        <text x="972.5" y="1209" textAnchor="middle" fill="#92400e" fontSize="9.5" fontWeight="800">
          Docs within a week
        </text>
        <text x="972.5" y="1219" textAnchor="middle" fill="#92400e" fontSize="8.5">
          from status update
        </text>

        {/* Gate C: Rejection Status */}
        <path d="M 610 1112 L 610 1260 L 690 1260" fill="none" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="690" y="1238" width="180" height="46" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="780" y="1254" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="900">
          REJECTION STAUS
        </text>
        <text x="780" y="1267" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="600">
          Update on dashboard with
        </text>
        <text x="780" y="1279" textAnchor="middle" fill="#991b1b" fontSize="9.5" fontWeight="600">
          report link
        </text>

        <line x1="870" y1="1261" x2="905" y2="1261" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="905" y="1232" width="135" height="66" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="972.5" y="1246" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="700">
          Vendor take required
        </text>
        <text x="972.5" y="1257" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="800">
          action within a month
        </text>
        <text x="972.5" y="1268" textAnchor="middle" fill="#7f1d1d" fontSize="8">
          i.e.
        </text>
        <text x="972.5" y="1278" textAnchor="middle" fill="#7f1d1d" fontSize="8">
          supplier justification
        </text>
        <text x="972.5" y="1287" textAnchor="middle" fill="#7f1d1d" fontSize="8">
          submission or resampling
        </text>
      </g>

      {/* ======================================================== */}
      {/* 9. ROW 7: 3 PREREQUISITES & AVL INCLUSION                */}
      {/* ======================================================== */}
      <g id="row-7-avl-entry">
        {/* 3 Convergence boxes for AVL: 6th Month Stability / Audit Conducted / VQ related docs */}
        {/* Box 1: 6th Month Stability Satisfactory */}
        <rect x="360" y="1245" width="100" height="46" rx="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="410" y="1260" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">
          6th Month
        </text>
        <text x="410" y="1272" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">
          Stability
        </text>
        <text x="410" y="1284" textAnchor="middle" fill="#0284c7" fontSize="9" fontWeight="700">
          Satidfactory
        </text>

        {/* Box 2: Audit conducted within month duration */}
        <rect x="475" y="1245" width="125" height="46" rx="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="537.5" y="1261" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">
          Audit conducted
        </text>
        <text x="537.5" y="1274" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">
          within month
        </text>
        <text x="537.5" y="1285" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="600">
          duration
        </text>

        {/* Box 3: VQ related docs upload */}
        <rect x="615" y="1245" width="115" height="46" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="672.5" y="1267" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="700">
          VQ related docs
        </text>
        <text x="672.5" y="1281" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="600">
          upload
        </text>

        {/* Convergence arrows down to AVL Addition */}
        <path d="M 410 1291 L 410 1318 L 537.5 1318" fill="none" stroke="#1e3a5f" strokeWidth="1.8" />
        <line x1="537.5" y1="1291" x2="537.5" y2="1330" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <path d="M 672.5 1291 L 672.5 1318 L 537.5 1318" fill="none" stroke="#1e3a5f" strokeWidth="1.8" />

        {/* Mfg Added into AVL Box */}
        <rect x="440" y="1330" width="195" height="44" rx="6" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" filter="url(#shadow)" />
        <text x="537.5" y="1348" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="900">
          Mfg Added into AVL
        </text>
        <text x="537.5" y="1363" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="600">
          Intimation send to vendor via email
        </text>
      </g>

      {/* ======================================================== */}
      {/* 10. ROW 8: COMMERCIALIZATION ORDERING                   */}
      {/* ======================================================== */}
      <g id="row-8-commercialization">
        {/* Arrow down to 1st Commercial */}
        <line x1="537.5" y1="1374" x2="537.5" y2="1405" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* 1st Commercial consignment */}
        <rect x="405" y="1405" width="265" height="54" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="537.5" y="1423" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          1<tspan fontSize="8" dy="-4">st</tspan><tspan fontSize="11" dy="4"> Commercial will be as per Atco</tspan>
        </text>
        <text x="537.5" y="1438" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="800">
          shared commercial Batch Qty
        </text>
        <text x="537.5" y="1451" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="700">
          or Supplier MOQ
        </text>

        {/* Arrow down to On-word ordering */}
        <line x1="537.5" y1="1459" x2="537.5" y2="1488" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* On-word ordering */}
        <rect x="415" y="1488" width="245" height="34" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="537.5" y="1503" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">
          On-word ordering will be as per Atco
        </text>
        <text x="537.5" y="1516" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="800">
          Commercial PR Qty
        </text>

        {/* Arrow down to Condition Block */}
        <line x1="537.5" y1="1522" x2="537.5" y2="1550" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
      </g>

      {/* ======================================================== */}
      {/* 11. ROW 9: CONDITION ON COMMERCIAL CONSIGNMENT          */}
      {/* ======================================================== */}
      <g id="row-9-final-condition">
        {/* CONDITION Header Tag */}
        <rect x="475" y="1550" width="125" height="22" rx="4" fill="#0284c7" />
        <text x="537.5" y="1565" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" letterSpacing="1">
          CONDITION
        </text>

        {/* Connector lines to left and right boxes */}
        <path d="M 537.5 1572 L 537.5 1600 L 415 1600" fill="none" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <path d="M 537.5 1572 L 537.5 1600 L 645 1600" fill="none" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />

        {/* Left Condition Box: Against QC Observations on Commercial Consignment */}
        <rect x="310" y="1582" width="210" height="52" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="415" y="1600" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700">
          Against QC Observations on
        </text>
        <text x="415" y="1613" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700">
          Commercial Consignment
        </text>
        <text x="415" y="1627" textAnchor="middle" fill="#0369a1" fontSize="9.5" fontWeight="800">
          Response submit by vendor within a week
        </text>

        {/* Right Condition Box: Max 2 times QC observations */}
        <rect x="545" y="1582" width="200" height="42" rx="6" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" filter="url(#softShadow)" />
        <text x="645" y="1600" textAnchor="middle" fill="#7c2d12" fontSize="10.5" fontWeight="900">
          Max 2 times QC observations
        </text>
        <text x="645" y="1615" textAnchor="middle" fill="#7c2d12" fontSize="10.5" fontWeight="900">
          can only accepted
        </text>

        {/* Decision Yes / No branching */}
        {/* YES: Continue Commercialization */}
        <line x1="415" y1="1634" x2="415" y2="1670" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="400" y="1646" width="30" height="18" rx="3" fill="#15803d" />
        <text x="415" y="1659" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="900">
          YES
        </text>

        <rect x="350" y="1670" width="130" height="34" rx="4" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="415" y="1684" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="800">
          Continue
        </text>
        <text x="415" y="1697" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="800">
          Commerciallization
        </text>

        {/* End Pill */}
        <line x1="415" y1="1704" x2="415" y2="1730" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="380" y="1730" width="70" height="28" rx="14" fill="#38bdf8" filter="url(#softShadow)" />
        <text x="415" y="1748" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
          End
        </text>

        {/* NO: Mfg Inactive from AVL */}
        <line x1="645" y1="1624" x2="645" y2="1670" stroke="#1e3a5f" strokeWidth="1.8" markerEnd="url(#arrow)" />
        <rect x="631" y="1646" width="28" height="18" rx="3" fill="#b91c1c" />
        <text x="645" y="1659" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="900">
          NO
        </text>

        <rect x="585" y="1670" width="120" height="34" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" filter="url(#softShadow)" />
        <text x="645" y="1684" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="800">
          Mfg Inactive from
        </text>
        <text x="645" y="1697" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="800">
          AVL
        </text>
      </g>
    </svg>
  );
};
