import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  ExternalLink,
  Upload,
  Video,
  Play,
  Film,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface TrainingVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrainingVideoModal: React.FC<TrainingVideoModalProps> = ({ isOpen, onClose }) => {
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [localVideoName, setLocalVideoName] = useState<string | null>(null);
  const [playerMode, setPlayerMode] = useState<'stream' | 'local'>('stream');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const googleDriveViewUrl =
    'https://drive.google.com/file/d/1up2I376Vk4euC6jjzF7DEQyroUvwkp4O/view';
  const googleDrivePreviewUrl =
    'https://drive.google.com/file/d/1up2I376Vk4euC6jjzF7DEQyroUvwkp4O/preview';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalVideoUrl(url);
      setLocalVideoName(file.name);
      setPlayerMode('local');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="training-video-popup-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 w-full max-w-6xl max-h-[96vh] flex flex-col overflow-hidden"
      >
        {/* ========================================================= */}
        {/* MODAL HEADER */}
        {/* ========================================================= */}
        <div className="p-4 md:p-5 border-b border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-600 text-white">
                  Resource 02
                </span>
                <span className="text-xs text-purple-300 font-medium hidden sm:inline">
                  Interactive Video Pop-Up
                </span>
              </div>
              <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                Indentor Training Video – Alternate Sourcing to Commercialization
              </h2>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Direct Google Drive Open */}
            <a
              href={googleDriveViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="video-modal-open-drive"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              title="Open video directly in Google Drive in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open Drive Tab</span>
            </a>

            {/* Local file player upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Upload local MP4 file to play"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {localVideoUrl ? 'Change MP4' : 'Upload Local MP4'}
              </span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
            />

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              id="btn-close-video-modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              title="Close popup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Source Switcher (if local file uploaded) */}
        {localVideoUrl && (
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Player Source:</span>
            <button
              onClick={() => setPlayerMode('stream')}
              className={`px-2.5 py-0.5 rounded font-semibold transition-colors ${
                playerMode === 'stream'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Google Drive Stream
            </button>
            <button
              onClick={() => setPlayerMode('local')}
              className={`px-2.5 py-0.5 rounded font-semibold transition-colors ${
                playerMode === 'local'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Local Video ({localVideoName || 'Uploaded'})
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIDEO DISPLAY CONTAINER */}
        {/* ========================================================= */}
        <div className="flex-1 bg-black flex items-center justify-center p-2 sm:p-4 overflow-auto">
          <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 aspect-video relative flex items-center justify-center">
            {playerMode === 'stream' ? (
              <iframe
                id="indentor-video-modal-iframe"
                src={googleDrivePreviewUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                title="Indentor Training Video – Alternate Sourcing to Commercialization"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            ) : (
              <video
                id="indentor-video-modal-native"
                src={localVideoUrl || undefined}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODAL FOOTER & CHAPTER GUIDE */}
        {/* ========================================================= */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
            <p className="text-slate-300 leading-relaxed max-w-3xl italic">
              “This training video provides practical guidance to indentors regarding the Alternate Source Development process and the activities and coordination required from initial manufacturer sourcing through commercialization.”
            </p>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Standard Indentor Onboarding SOP</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-800/80">
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-[10px] font-bold text-purple-400 block">CH 1: RFQ & Specs</span>
              <span className="text-[11px] text-slate-300">Floating & Approved Spec</span>
            </div>
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-[10px] font-bold text-purple-400 block">CH 2: COA Compliance</span>
              <span className="text-[11px] text-slate-300">Max 2 Revisions Rule</span>
            </div>
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-[10px] font-bold text-purple-400 block">CH 3: Drive Dossier</span>
              <span className="text-[11px] text-slate-300">10-Point Technical Upload</span>
            </div>
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-[10px] font-bold text-purple-400 block">CH 4: Sample Testing</span>
              <span className="text-[11px] text-slate-300">1-Month Submission SLA</span>
            </div>
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-[10px] font-bold text-purple-400 block">CH 5: Looker Studio</span>
              <span className="text-[11px] text-slate-300">Live Status & Audit Gating</span>
            </div>
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-[10px] font-bold text-purple-400 block">CH 6: Commercialization</span>
              <span className="text-[11px] text-slate-300">MOQ & AVL Active Status</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
