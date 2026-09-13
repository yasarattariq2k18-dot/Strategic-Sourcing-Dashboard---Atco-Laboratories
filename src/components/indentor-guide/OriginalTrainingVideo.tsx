import React, { useState, useRef } from 'react';
import {
  Play,
  Upload,
  ExternalLink,
  Video,
  Film,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Maximize2,
  FileVideo,
} from 'lucide-react';

interface OriginalTrainingVideoProps {
  onOpenModal?: () => void;
}

export const OriginalTrainingVideo: React.FC<OriginalTrainingVideoProps> = ({ onOpenModal }) => {
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [localVideoName, setLocalVideoName] = useState<string | null>(null);
  const [playerMode, setPlayerMode] = useState<'stream' | 'local'>('stream');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const googleDriveViewUrl =
    'https://drive.google.com/file/d/1up2I376Vk4euC6jjzF7DEQyroUvwkp4O/view';
  const googleDrivePreviewUrl =
    'https://drive.google.com/file/d/1up2I376Vk4euC6jjzF7DEQyroUvwkp4O/preview';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalVideoUrl(url);
      setLocalVideoName(file.name);
      setPlayerMode('local');
    }
  };

  return (
    <div
      id="indentor-training-video-section"
      className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden"
    >
      {/* SECTION HEADER */}
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-purple-600 text-white">
                Resource 02
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Mandatory Sourcing & Compliance Training
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              02 — Indentor Training Video – Alternate Sourcing to Commercialization
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-4xl leading-relaxed">
              “This training video provides practical guidance to indentors regarding the Alternate Source Development process and the activities and coordination required from initial manufacturer sourcing through commercialization.”
            </p>
          </div>

          {/* QUICK ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenModal && (
              <button
                onClick={onOpenModal}
                id="btn-pop-up-video-modal"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Pop Up Video Window</span>
              </button>
            )}

            {/* Backup Source Button */}
            <a
              href={googleDriveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-open-original-video-source"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Drive Source</span>
            </a>

            {/* In-app Upload Trigger */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Upload downloaded MP4 to play locally in browser"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{localVideoUrl ? 'Change Local Video' : 'Upload Video File'}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
            />
          </div>
        </div>

        {/* Player Source Selector Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">In-Page Player Source:</span>
          <button
            onClick={() => setPlayerMode('stream')}
            className={`px-2.5 py-1 rounded font-semibold transition-colors ${
              playerMode === 'stream'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Google Drive Stream (Direct In-Page Player)
          </button>
          {localVideoUrl && (
            <button
              onClick={() => setPlayerMode('local')}
              className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                playerMode === 'local'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Local Video ({localVideoName || 'Uploaded'})
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* IN-PAGE VIDEO PLAYER CONTAINER */}
      {/* ========================================================= */}
      <div className="p-4 md:p-6 bg-slate-950 flex flex-col items-center">
        <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-black aspect-video relative">
          {playerMode === 'stream' ? (
            /* Stream directly via Google Drive embedded preview player */
            <iframe
              id="indentor-guide-video-iframe"
              src={googleDrivePreviewUrl}
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              title="Indentor Training Video – Alternate Sourcing to Commercialization"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          ) : (
            /* Native HTML5 Video Player for locally uploaded video file */
            <video
              id="indentor-guide-native-video"
              src={localVideoUrl || undefined}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Video Player Information Strip */}
        <div className="w-full max-w-5xl mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 px-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Direct In-Page Playback | Source: <strong>Google Drive Master Video</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={googleDriveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 underline font-medium inline-flex items-center gap-1"
            >
              <span>Open in Google Drive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIDEO CHAPTERS & TOPICS COVERED IN THIS TRAINING */}
      {/* ========================================================= */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Film className="w-4 h-4 text-purple-600" />
          Topics & Modules Covered in this Training Video
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              step: 'Chapter 01',
              title: 'Inquiry Floating & Approved Specs',
              desc: 'How to ingest approved ATCO specifications and verify 100% compliant COAs from manufacturers.',
            },
            {
              step: 'Chapter 02',
              title: 'QC Observation Limits & Revisions',
              desc: 'Reviewing QC remarks within the strict Max 2 observations limit to avoid discontinuation.',
            },
            {
              step: 'Chapter 03',
              title: 'Google Drive Dossier & Sample SLA',
              desc: 'Submitting trial samples and complete 10-point technical dossiers within the 1-month SLA.',
            },
            {
              step: 'Chapter 04',
              title: 'Looker Studio Dashboard Tracking',
              desc: 'Navigating sample receipt entries and tracking audit triggers upon stability charge.',
            },
            {
              step: 'Chapter 05',
              title: 'Stability Zone IVb & Audit Waiver',
              desc: '6-month stability protocols and audit waiver criteria for USFDA / PIC/s / MHRA / WHO facilities.',
            },
            {
              step: 'Chapter 06',
              title: 'Commercial Consignment & AVL Qualification',
              desc: 'Handling first commercial batch MOQ and maintaining quality to prevent AVL inactivation.',
            },
          ].map((ch, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs hover:border-purple-300 transition-colors"
            >
              <div className="text-[10px] font-black text-purple-700 uppercase tracking-wider mb-1">
                {ch.step}
              </div>
              <div className="text-xs font-bold text-slate-900 mb-1">{ch.title}</div>
              <div className="text-[11px] text-slate-600 leading-relaxed">{ch.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
