import React, { useState, useEffect } from 'react';
import {
  X,
  Image as ImageIcon,
  Video as VideoIcon,
  Presentation,
  Download,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Play,
  Pause,
  Volume2,
} from 'lucide-react';
import { InitiativeProofFile, InitiativeRecord } from '../types';
import { ProofUploader } from './ProofUploader';

interface ProofMediaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initiative: InitiativeRecord | null;
  onUpdateAttachments: (initiativeId: string, attachments: InitiativeProofFile[]) => void;
  initialIndex?: number;
  initialProofIndex?: number;
}

export const ProofMediaViewerModal: React.FC<ProofMediaViewerModalProps> = ({
  isOpen,
  onClose,
  initiative,
  onUpdateAttachments,
  initialIndex = 0,
  initialProofIndex,
}) => {
  const targetIndex = initialProofIndex !== undefined ? initialProofIndex : initialIndex;
  const [currentIndex, setCurrentIndex] = useState<number>(targetIndex);
  const [isAddingMore, setIsAddingMore] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isFullscreenMode, setIsFullscreenMode] = useState<boolean>(false);

  // Synchronize index whenever opened or targetIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(targetIndex);
      setZoomLevel(1);
      setActiveSlideIndex(0);
    }
  }, [isOpen, targetIndex, initiative?.id]);

  if (!isOpen || !initiative) return null;

  const attachments = initiative.attachments || [];
  const hasFiles = attachments.length > 0;
  const safeIndex = Math.min(Math.max(0, currentIndex), Math.max(0, attachments.length - 1));
  const activeFile: InitiativeProofFile | undefined = attachments[safeIndex] || attachments[0];

  const handleNext = () => {
    if (attachments.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % attachments.length);
      setZoomLevel(1);
      setActiveSlideIndex(0);
    }
  };

  const handlePrev = () => {
    if (attachments.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + attachments.length) % attachments.length);
      setZoomLevel(1);
      setActiveSlideIndex(0);
    }
  };

  const handleDeleteActive = () => {
    if (!activeFile) return;
    if (window.confirm(`Remove proof file "${activeFile.name}"?`)) {
      const updated = attachments.filter((a) => a.id !== activeFile.id);
      onUpdateAttachments(initiative.id, updated);
      if (currentIndex >= updated.length) {
        setCurrentIndex(Math.max(0, updated.length - 1));
      }
    }
  };

  const handleAttachmentsChange = (updated: InitiativeProofFile[]) => {
    onUpdateAttachments(initiative.id, updated);
  };

  const downloadFile = (file: InitiativeProofFile) => {
    if (!file.dataUrl) return;
    const a = document.createElement('a');
    a.href = file.dataUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const openInNewTab = (file: InitiativeProofFile) => {
    if (!file.dataUrl) return;
    // Open data URL or blob
    const win = window.open();
    if (win) {
      if (file.fileType === 'image') {
        win.document.write(
          `<html><head><title>${file.name}</title></head><body style="margin:0;background:#0f172a;display:flex;align-items:center;justify-content:center;height:100vh;"><img src="${file.dataUrl}" style="max-width:100%;max-height:100%;" /></body></html>`
        );
      } else {
        win.location.href = file.dataUrl;
      }
    }
  };

  // Determine specific media type
  const isImage = activeFile?.fileType === 'image';
  const isVideo = activeFile?.fileType === 'video';
  const isPpt =
    activeFile?.fileType === 'ppt' ||
    /\.(ppt|pptx|pps|ppsx|key|odp)$/i.test(activeFile?.name || '');
  const isPdf =
    activeFile?.mimeType?.includes('pdf') ||
    /\.pdf$/i.test(activeFile?.name || '') ||
    activeFile?.dataUrl?.startsWith('data:application/pdf');

  // Presentation slides generated for PPT files
  const presentationSlides = [
    {
      title: activeFile?.name || 'Presentation Deck',
      subtitle: 'ATCO Laboratories Strategic Sourcing & Digitalization Milestone',
      tag: 'SLIDE 1 • EXECUTIVE BRIEFING',
      content: (
        <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider">
            <Presentation className="w-4 h-4" />
            <span>Executive Presentation Deck</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight max-w-2xl">
            {initiative.name}
          </h2>
          <div className="h-1 w-24 bg-amber-500 mx-auto my-2" />
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            Domain: <span className="font-bold text-amber-400">{initiative.category}</span> • Classification:{' '}
            <span className="font-bold text-emerald-400 uppercase">
              {initiative.type === 'performed' ? 'Performed Initiative' : 'In-Progress Project'}
            </span>
          </p>
          <div className="pt-4 flex items-center justify-center gap-4 text-xs text-slate-400 font-mono">
            <span>File: {activeFile?.name}</span>
            <span>•</span>
            <span>Size: {activeFile?.sizeFormatted}</span>
            <span>•</span>
            <span>Date: {activeFile?.uploadedAt || initiative.updatedAt}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Earlier Procedure & Operational Challenge',
      subtitle: 'Operational friction, communication delays, and quality assurance bottlenecks',
      tag: 'SLIDE 2 • CHALLENGE STATEMENT',
      content: (
        <div className="p-8 max-w-3xl mx-auto space-y-6">
          <div className="bg-rose-950/40 border-l-4 border-rose-500 p-5 rounded-none">
            <h4 className="text-xs font-black text-rose-400 uppercase tracking-wider mb-2">
              Legacy Procedure & Gap Analysis
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {initiative.challengingArea}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/80 border border-slate-700 p-4">
              <span className="text-rose-400 font-black block mb-1">Impact on Operations</span>
              <p className="text-slate-300">
                Extended turnaround timelines, delayed QA/QC sampling feedback, and reliance on manual tracking.
              </p>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 p-4">
              <span className="text-amber-400 font-black block mb-1">Target Milestone</span>
              <p className="text-slate-300">
                Transition to real-time digital governance, automated triggers, and centralized visibility.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Digital Solution Architecture & Workflow',
      subtitle: 'Process re-engineering, digital tools integration, and system governance',
      tag: 'SLIDE 3 • IMPLEMENTATION & WORKFLOW',
      content: (
        <div className="p-8 max-w-3xl mx-auto space-y-6">
          <div className="bg-blue-950/40 border-l-4 border-blue-500 p-5 rounded-none">
            <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider mb-2">
              Solution & Implementation
            </h4>
            <h3 className="text-base font-black text-white mb-2">{initiative.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standardized digital workflow ensuring synchronous communication between Sourcing, Quality Assurance,
              Production Development, and approved vendors.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-slate-800 border border-slate-700 p-3">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center mx-auto mb-2 font-bold">
                1
              </div>
              <span className="font-bold text-white block">Intake & Trigger</span>
              <span className="text-[10px] text-slate-400">Automated capture</span>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-3">
              <div className="w-8 h-8 rounded-full bg-purple-600/30 text-purple-400 flex items-center justify-center mx-auto mb-2 font-bold">
                2
              </div>
              <span className="font-bold text-white block">Live Tracking</span>
              <span className="text-[10px] text-slate-400">Synchronized status</span>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center mx-auto mb-2 font-bold">
                3
              </div>
              <span className="font-bold text-white block">Milestone Closure</span>
              <span className="text-[10px] text-slate-400">Audit & AVL sign-off</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Measurable Outcome & Compliance Impact',
      subtitle: 'Realized performance gains, stability tracking, and audit assurance',
      tag: 'SLIDE 4 • MEASURABLE OUTCOMES',
      content: (
        <div className="p-8 max-w-3xl mx-auto space-y-6">
          <div className="bg-emerald-950/40 border-l-4 border-emerald-500 p-5 rounded-none">
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">
              Demonstrated Impact & Results
            </h4>
            <p className="text-sm text-emerald-100 leading-relaxed font-semibold">
              {initiative.impactOutcome}
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-4 text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px]">Audit Conduction Status</span>
              <span className="text-emerald-400 font-bold text-sm">Verified & Operational</span>
            </div>
            <button
              type="button"
              onClick={() => downloadFile(activeFile!)}
              className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-none flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Original (.pptx)</span>
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`bg-slate-900 rounded-none border-2 border-slate-700 shadow-2xl w-full flex flex-col my-auto relative overflow-hidden transition-all ${
          isFullscreenMode ? 'max-w-full h-full max-h-screen' : 'max-w-5xl max-h-[92vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-950 text-white px-5 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="min-w-0 pr-4 flex items-center gap-3">
            {/* Format Icon Badge */}
            <div
              className={`w-9 h-9 flex items-center justify-center shrink-0 border ${
                isImage
                  ? 'bg-blue-600/30 text-blue-400 border-blue-500/50'
                  : isVideo
                  ? 'bg-purple-600/30 text-purple-400 border-purple-500/50'
                  : isPpt
                  ? 'bg-amber-600/30 text-amber-400 border-amber-500/50'
                  : isPdf
                  ? 'bg-rose-600/30 text-rose-400 border-rose-500/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {isImage ? (
                <ImageIcon className="w-5 h-5" />
              ) : isVideo ? (
                <VideoIcon className="w-5 h-5" />
              ) : isPpt ? (
                <Presentation className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className={`px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider ${
                    isImage
                      ? 'bg-blue-600 text-white'
                      : isVideo
                      ? 'bg-purple-600 text-white'
                      : isPpt
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : isPdf
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {isImage
                    ? 'IMAGE PROOF'
                    : isVideo
                    ? 'VIDEO PROOF'
                    : isPpt
                    ? 'POWERPOINT PRESENTATION'
                    : isPdf
                    ? 'PDF DOCUMENT'
                    : 'ATTACHED FILE'}
                </span>
                {activeFile && (
                  <span className="text-[11px] text-slate-400 font-mono">
                    {activeFile.sizeFormatted} • {activeFile.uploadedAt}
                  </span>
                )}
              </div>
              <h3
                className="text-sm sm:text-base font-black text-white truncate max-w-md sm:max-w-xl"
                title={activeFile?.name || initiative.name}
              >
                {activeFile?.name || initiative.name}
              </h3>
            </div>
          </div>

          {/* Top Controls: Actions + Close */}
          <div className="flex items-center gap-2 shrink-0">
            {activeFile?.dataUrl && (
              <>
                <button
                  type="button"
                  onClick={() => openInNewTab(activeFile)}
                  className="hidden sm:inline-flex py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-none text-xs font-bold items-center gap-1.5 cursor-pointer"
                  title="Open file in separate tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Raw</span>
                </button>

                <button
                  type="button"
                  onClick={() => downloadFile(activeFile)}
                  className="py-1.5 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-none text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Download this file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsFullscreenMode(!isFullscreenMode)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-none transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsAddingMore(!isAddingMore)}
              className={`py-1.5 px-2.5 rounded-none text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer ${
                isAddingMore
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingMore ? 'Hide Uploader' : '+ Attach More'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-none transition-colors cursor-pointer ml-1"
              title="Close Popup (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload Drawer (when user clicks "+ Attach More") */}
        {isAddingMore && (
          <div className="bg-slate-950 p-4 border-b-2 border-blue-500 shrink-0 animate-in slide-in-from-top-2 duration-150">
            <div className="max-w-3xl mx-auto">
              <ProofUploader
                attachments={attachments}
                onChange={handleAttachmentsChange}
                label="Attach Additional Images, Videos, or Presentations"
              />
            </div>
          </div>
        )}

        {/* Initiative Context Ribbon */}
        <div className="bg-slate-800/80 px-5 py-2 border-b border-slate-700/80 flex items-center justify-between text-xs text-slate-300 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-slate-400 uppercase text-[10px]">Initiative:</span>
            <span className="font-bold text-white truncate">{initiative.name}</span>
            <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-[10px] font-bold">
              {initiative.category}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-[11px] text-slate-400">
            <span>
              Proof {safeIndex + 1} of {Math.max(1, attachments.length)}
            </span>
          </div>
        </div>

        {/* Main Display Area */}
        <div className="flex-1 overflow-y-auto bg-slate-950 flex flex-col items-center justify-center p-3 sm:p-6 min-h-[380px] relative">
          {!hasFiles ? (
            /* No files state */
            <div className="text-center p-8 max-w-md bg-slate-900 border border-slate-800 text-white">
              <div className="w-14 h-14 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-7 h-7" />
              </div>
              <h4 className="text-base font-black mb-1">No Proof Files Attached Yet</h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Upload image screenshots, recorded demo videos, or PPT presentations verifying this initiative.
              </p>
              <button
                type="button"
                onClick={() => setIsAddingMore(true)}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-none inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Proof Files Now</span>
              </button>
            </div>
          ) : activeFile ? (
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* ========================================================================= */}
              {/* 1. IMAGE DISPLAY */}
              {/* ========================================================================= */}
              {isImage && activeFile.dataUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                  {/* Image Canvas */}
                  <div className="w-full max-h-[62vh] flex items-center justify-center overflow-auto p-2">
                    <img
                      src={activeFile.dataUrl}
                      alt={activeFile.name}
                      style={{ transform: `scale(${zoomLevel})` }}
                      className="max-h-[58vh] max-w-full object-contain rounded-none shadow-2xl border border-slate-800 transition-transform duration-150"
                    />
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-none text-xs text-slate-300">
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                      className="p-1 hover:text-white cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[11px] px-2">{Math.round(zoomLevel * 100)}%</span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
                      className="p-1 hover:text-white cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      className="p-1 hover:text-white ml-2 text-[10px] uppercase font-bold cursor-pointer"
                      title="Reset Zoom"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : isVideo && activeFile.dataUrl ? (
                /* ========================================================================= */
                /* 2. VIDEO PLAYER DISPLAY */
                /* ========================================================================= */
                <div className="w-full max-h-[65vh] flex flex-col items-center justify-center">
                  <video
                    key={activeFile.id}
                    src={activeFile.dataUrl}
                    controls
                    autoPlay={false}
                    className="max-h-[60vh] max-w-full rounded-none shadow-2xl border border-slate-800 bg-black"
                  >
                    Your browser does not support HTML5 video playback.
                  </video>
                  <div className="mt-2 text-xs text-slate-400 font-mono">
                    Video Player: {activeFile.name} ({activeFile.sizeFormatted})
                  </div>
                </div>
              ) : isPdf && activeFile.dataUrl ? (
                /* ========================================================================= */
                /* 3. PDF DOCUMENT VIEWER */
                /* ========================================================================= */
                <div className="w-full h-[65vh] flex flex-col bg-white rounded-none overflow-hidden shadow-2xl border border-slate-700">
                  <iframe
                    src={activeFile.dataUrl}
                    title={activeFile.name}
                    className="w-full h-full border-0"
                  />
                </div>
              ) : isPpt ? (
                /* ========================================================================= */
                /* 4. PRESENTATION DECK VIEWER (PPT, PPTX, SLIDES) */
                /* ========================================================================= */
                <div className="w-full max-w-4xl flex flex-col bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
                  {/* Presentation Slide Header */}
                  <div className="bg-slate-950 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                        {presentationSlides[activeSlideIndex].tag}
                      </span>
                      <span className="text-slate-300 font-bold">
                        {presentationSlides[activeSlideIndex].title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-mono text-slate-400 text-xs">
                      <span>Slide {activeSlideIndex + 1} of {presentationSlides.length}</span>
                    </div>
                  </div>

                  {/* Active Slide Canvas */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 min-h-[320px] flex items-center justify-center border-b border-slate-800">
                    {presentationSlides[activeSlideIndex].content}
                  </div>

                  {/* Slide Navigation & Controls */}
                  <div className="bg-slate-950 p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveSlideIndex((prev) =>
                            prev === 0 ? presentationSlides.length - 1 : prev - 1
                          )
                        }
                        className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1 border border-slate-700 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous Slide</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveSlideIndex((prev) => (prev + 1) % presentationSlides.length)
                        }
                        className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1 border border-slate-700 cursor-pointer"
                      >
                        <span>Next Slide</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Slide Dots / Thumbnails */}
                    <div className="flex items-center gap-1.5">
                      {presentationSlides.map((s, sIdx) => (
                        <button
                          key={s.tag}
                          type="button"
                          onClick={() => setActiveSlideIndex(sIdx)}
                          className={`w-6 h-6 text-[10px] font-bold border transition-colors cursor-pointer ${
                            sIdx === activeSlideIndex
                              ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {sIdx + 1}
                        </button>
                      ))}
                    </div>

                    {/* Download Presentation Action */}
                    <button
                      type="button"
                      onClick={() => downloadFile(activeFile)}
                      className="py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black flex items-center gap-1.5 cursor-pointer shadow-md text-xs uppercase"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PPT ({activeFile.sizeFormatted})</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ========================================================================= */
                /* 5. GENERIC / OTHER FILE FORMAT INSPECTOR */
                /* ========================================================================= */
                <div className="bg-slate-900 border border-slate-700 p-8 text-center text-white max-w-lg shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/40">
                    <FileText className="w-8 h-8" />
                  </div>
                  <span className="px-2 py-0.5 bg-blue-600 text-white font-black text-xs uppercase tracking-wider">
                    {activeFile.fileType.toUpperCase()} DOCUMENT
                  </span>
                  <h4 className="text-base font-black text-white mt-3 break-all">
                    {activeFile.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    File Type: {activeFile.mimeType} • Size: {activeFile.sizeFormatted} • Uploaded:{' '}
                    {activeFile.uploadedAt}
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => downloadFile(activeFile)}
                      className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-none flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download File</span>
                    </button>
                    {activeFile.dataUrl && (
                      <button
                        type="button"
                        onClick={() => openInNewTab(activeFile)}
                        className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-none flex items-center gap-2 cursor-pointer border border-slate-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in New Window</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Arrows for Multiple Files */}
              {attachments.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/90 hover:bg-blue-600 text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xl z-20"
                    title="Previous proof file"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/90 hover:bg-blue-600 text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xl z-20"
                    title="Next proof file"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          ) : null}
        </div>

        {/* Bottom Filmstrip / Thumbnails Bar */}
        {hasFiles && (
          <div className="bg-slate-950 p-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            {/* Thumbnails Row */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
              {attachments.map((file, idx) => {
                const isActive = idx === safeIndex;
                const fileIsPpt =
                  file.fileType === 'ppt' || /\.(ppt|pptx|pps|ppsx|key|odp)$/i.test(file.name);
                const fileIsVideo = file.fileType === 'video';
                const fileIsImage = file.fileType === 'image';

                return (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setZoomLevel(1);
                      setActiveSlideIndex(0);
                    }}
                    className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-none border text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 border-blue-400 text-white shadow-md ring-2 ring-blue-400/40'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {fileIsImage ? (
                      <ImageIcon className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    ) : fileIsVideo ? (
                      <VideoIcon className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                    ) : fileIsPpt ? (
                      <Presentation className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    )}
                    <span className="max-w-[130px] truncate">{file.name}</span>
                    <span className="text-[10px] opacity-75">{file.sizeFormatted}</span>
                  </button>
                );
              })}
            </div>

            {/* Actions on Active File: Download & Delete */}
            {activeFile && (
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => downloadFile(activeFile)}
                  className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-none text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  title="Download this file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  type="button"
                  onClick={handleDeleteActive}
                  className="py-1.5 px-3 bg-rose-950/60 hover:bg-rose-700 text-rose-300 hover:text-white border border-rose-800/80 rounded-none text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  title="Delete this file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
