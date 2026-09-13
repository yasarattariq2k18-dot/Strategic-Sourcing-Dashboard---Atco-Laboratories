import React, { useState } from 'react';
import {
  ExternalLink,
  Lock,
  BarChart3,
  ShieldCheck,
  Clock,
  FileCheck,
  AlertTriangle,
  RefreshCw,
  Maximize2,
  HelpCircle,
} from 'lucide-react';

export const SampleStatusDashboard: React.FC = () => {
  const [embedError, setEmbedError] = useState(false);
  const lookerStudioDashboardUrl =
    'https://datastudio.google.com/u/0/reporting/55d1d74e-d36a-4e51-9bf6-27afd25a8552/page/2jhuF';
  const lookerStudioGuidelineUrl =
    'https://lookerstudio.google.com/reporting/b6b553e1-d2df-4a62-8178-554406a12b07/page/d9t0B';

  // Embed URL version
  const lookerStudioEmbedUrl =
    'https://lookerstudio.google.com/embed/reporting/55d1d74e-d36a-4e51-9bf6-27afd25a8552/page/2jhuF';

  return (
    <div
      id="submitted-sample-dashboard-section"
      className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden"
    >
      {/* SECTION HEADER */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white">
                Resource 03
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Live Status & Tracking System
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              03 — Submitted Sample Status Dashboard
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-4xl leading-relaxed">
              Access the official ATCO Looker Studio dashboard to monitor the status, testing progress, stability data, and document compliance for all submitted alternate source samples.
            </p>
          </div>

          {/* PROMINENT BUTTON: Open Submitted Sample Dashboard */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={lookerStudioDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-open-sample-dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md hover:shadow-lg transform active:scale-98"
            >
              <BarChart3 className="w-4 h-4" />
              <span>📊 Open Submitted Sample Dashboard</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={lookerStudioGuidelineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Open Status Review Guideline"
            >
              <span>Guideline Doc</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* MANDATORY ACCESS CONTROL BANNER */}
        <div className="mt-4 p-3 rounded-lg bg-amber-500/15 border border-amber-400/30 text-xs text-amber-200 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Access Control Notice:</strong> “Dashboard access is subject to the user&apos;s authorized Google/Looker Studio permissions.”
            <span className="block text-slate-400 text-[11px] mt-0.5">
              If prompted by Google, sign in with your authorized corporate email account. ATCO does not collect or store external Google credentials.
            </span>
          </div>
        </div>
      </div>

      {/* EMBEDDED DASHBOARD CONTAINER WITH FALLBACK */}
      <div className="p-4 md:p-6 bg-slate-100 flex flex-col items-center">
        <div className="w-full rounded-xl overflow-hidden shadow-md border border-slate-300 bg-white" style={{ minHeight: '620px' }}>
          {!embedError ? (
            <div className="relative w-full h-full" style={{ minHeight: '620px' }}>
              <iframe
                id="looker-studio-embedded-iframe"
                src={lookerStudioEmbedUrl}
                width="100%"
                height="620"
                className="w-full h-full border-0"
                title="Submitted Sample Status Dashboard – Looker Studio"
                allowFullScreen
                onError={() => setEmbedError(true)}
              />
            </div>
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
              <BarChart3 className="w-16 h-16 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-800">
                Direct Browser Embedding Restricted by Provider
              </h3>
              <p className="text-sm text-slate-600 max-w-md">
                Google Looker Studio enforces frame-ancestors restrictions on certain authenticated corporate domains. Click below to launch the live dashboard in a full tab.
              </p>
              <a
                href={lookerStudioDashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
              >
                <span>📊 Open Submitted Sample Dashboard in New Tab</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Dashboard Bottom Bar */}
        <div className="w-full mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 px-2">
          <span>Official Looker Studio Endpoint: <code>55d1d74e-d36a-4e51-9bf6-27afd25a8552</code></span>
          <div className="flex items-center gap-2">
            <a
              href={lookerStudioDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 font-bold underline inline-flex items-center gap-1"
            >
              Open Full-Screen Dashboard <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* GUIDELINES & SLA TRIGGERS BASED ON LOOKER STUDIO DASHBOARD */}
      {/* ========================================================= */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          Actions & SLA Timelines Required Against Looker Studio Statuses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              Sample Entry SLA
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Newly submitted samples appear on Looker Studio <strong>within 2 weeks</strong> of receipt at the ATCO facility.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900 mb-1">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
              Audit Trigger (2 Months)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upon stability charged status, vendor audit is triggered with a <strong>2-month duration window</strong> (waived for Tier-1 certs).
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Pending Docs (1 Week)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When dashboard indicates pending docs against Drive link, vendor must upload <strong>within 1 week</strong> of status change.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-900 mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              Rejection Follow-up (1 Month)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              If marked REJECTION STATUS, vendor must submit justification or arrange resampling <strong>within 1 month</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
