import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Info,
  Layers,
  Sparkles,
  Move,
  FileSpreadsheet,
} from 'lucide-react';
import { FlowChartSvg } from './FlowChartSvg';

interface FlowChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlowChartModal: React.FC<FlowChartModalProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === '+' || e.key === '=') {
        setZoom((prev) => Math.min(prev + 15, 300));
      } else if (e.key === '-') {
        setZoom((prev) => Math.max(prev - 15, 30));
      } else if (e.key === '0') {
        setZoom(100);
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 30));
  const handleReset = () => {
    setZoom(100);
    setPan({ x: 0, y: 0 });
  };
  const handleFitToWidth = () => {
    setZoom(85);
    setPan({ x: 0, y: 0 });
  };
  const handleFitToHeight = () => {
    setZoom(55);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 15 : -15;
      setZoom((prev) => Math.max(30, Math.min(300, prev + delta)));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md transition-all duration-200 ${
        isFullscreen ? 'p-0' : 'p-2 md:p-5'
      }`}
    >
      {/* Outer Card Window */}
      <div
        id="flowchart-modal-window"
        className="flex-1 flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-300 relative"
      >
        {/* ========================================================= */}
        {/* MODAL HEADER WITH CONTROLS & BRANDING                     */}
        {/* ========================================================= */}
        <div className="bg-[#1d599b] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#14427f] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <FileSpreadsheet className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-xs text-[10px] font-black tracking-wider bg-white text-[#1d599b] uppercase">
                  Approved Process
                </span>
                <span className="text-xs text-sky-100 font-medium">FLOW CHART.pdf (Preserved As-Is)</span>
              </div>
              <h2 className="text-base md:text-lg font-bold text-white tracking-tight mt-0.5">
                FLOW CHART (From Alternate Sourcing till Commercialization)
              </h2>
            </div>
          </div>

          {/* TOP TOOLBAR: ZOOM IN/OUT, FIT, RESET, FULLSCREEN, CLOSE */}
          <div className="flex items-center gap-1.5 bg-slate-900/40 p-1 rounded-lg border border-white/20">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-bold text-sky-100 bg-white/10 rounded mr-1">
              Original Process Flow (FLOW CHART.pdf)
            </span>

            <button
              onClick={handleZoomOut}
              id="flowchart-zoom-out-btn"
              title="Zoom Out (- or Ctrl+Scroll)"
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold text-white hover:bg-white/20 flex items-center gap-1 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">− Zoom</span>
            </button>

            <span className="text-xs font-mono text-sky-200 px-1.5 font-black min-w-[48px] text-center bg-black/20 py-1 rounded">
              {zoom}%
            </span>

            <button
              onClick={handleZoomIn}
              id="flowchart-zoom-in-btn"
              title="Zoom In (+ or Ctrl+Scroll)"
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold text-white hover:bg-white/20 flex items-center gap-1 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+ Zoom</span>
            </button>

            <div className="h-4 w-px bg-white/25 mx-1" />

            <button
              onClick={handleFitToWidth}
              id="flowchart-fit-btn"
              title="Fit to Width"
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold text-white hover:bg-white/20 flex items-center gap-1 transition-colors"
            >
              <span>Fit Width</span>
            </button>

            <button
              onClick={handleReset}
              id="flowchart-reset-btn"
              title="Reset 100% (0)"
              className="px-2 py-1.5 rounded-md text-xs font-semibold text-white hover:bg-white/20 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">100%</span>
            </button>

            <button
              onClick={toggleFullscreen}
              id="flowchart-fullscreen-btn"
              title="Full Screen Mode"
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold text-white hover:bg-white/20 flex items-center gap-1 transition-colors"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Exit Full</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">⛶ Full Screen</span>
                </>
              )}
            </button>

            <div className="h-4 w-px bg-white/25 mx-1" />

            <button
              onClick={onClose}
              id="flowchart-close-btn"
              title="Close (Esc)"
              className="px-3 py-1.5 rounded-md text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1 transition-colors shadow-xs"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Sub-Bar with Drag Instructions */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-1.5 text-xs text-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              <strong>As-Is Flow Chart:</strong> Matches the official ATCO flow chart layout, decision points, and SLAs. Click and drag the canvas to pan.
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="hidden md:inline">Shortcuts: <strong>+ / -</strong> Zoom | <strong>0</strong> 100% | <strong>Esc</strong> Close</span>
            <a
              href="https://drive.google.com/file/d/1up2I376Vk4euC6jjzF7DEQyroUvwkp4O/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline inline-flex items-center gap-1 font-semibold"
            >
              Drive Guideline Link <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN VIEWING CANVAS AREA (INTERACTIVE PAN & ZOOM)        */}
        {/* ========================================================= */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className={`flex-1 overflow-auto bg-slate-200/80 p-4 md:p-8 flex items-start justify-center relative ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{ minHeight: '480px' }}
        >
          {/* FLOATING ZOOM IN & OUT DOCKED CONTROLLER PANEL */}
          <div
            id="flowchart-floating-zoom-panel"
            className="absolute bottom-6 right-6 z-30 bg-slate-900/90 text-white p-2 rounded-xl shadow-2xl backdrop-blur-md border border-slate-700/80 flex flex-col items-center gap-1 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 px-1">
              Zoom Controls
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomIn}
                id="panel-zoom-in-btn"
                title="Zoom In (+)"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={handleZoomOut}
                id="panel-zoom-out-btn"
                title="Zoom Out (-)"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                id="panel-zoom-reset-btn"
                title="Reset to 100%"
                className="px-2 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-xs font-bold flex items-center justify-center transition-colors shadow-xs"
              >
                {zoom}%
              </button>
            </div>

            {/* Quick zoom preset buttons */}
            <div className="grid grid-cols-4 gap-1 w-full mt-1 pt-1 border-t border-slate-800 text-[10px]">
              <button
                onClick={() => { setZoom(50); setPan({ x: 0, y: 0 }); }}
                className={`py-1 rounded font-mono font-bold transition-colors ${
                  zoom === 50 ? 'bg-blue-600 text-white' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                }`}
              >
                50%
              </button>
              <button
                onClick={() => { setZoom(75); setPan({ x: 0, y: 0 }); }}
                className={`py-1 rounded font-mono font-bold transition-colors ${
                  zoom === 75 ? 'bg-blue-600 text-white' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                }`}
              >
                75%
              </button>
              <button
                onClick={() => { setZoom(100); setPan({ x: 0, y: 0 }); }}
                className={`py-1 rounded font-mono font-bold transition-colors ${
                  zoom === 100 ? 'bg-blue-600 text-white' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                }`}
              >
                100%
              </button>
              <button
                onClick={() => { setZoom(150); setPan({ x: 0, y: 0 }); }}
                className={`py-1 rounded font-mono font-bold transition-colors ${
                  zoom === 150 ? 'bg-blue-600 text-white' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                }`}
              >
                150%
              </button>
            </div>

            {/* Quick actions: Fit width / Fit page */}
            <div className="flex items-center gap-1 w-full mt-1">
              <button
                onClick={handleFitToWidth}
                className="flex-1 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold text-center transition-colors"
              >
                Fit Width
              </button>
              <button
                onClick={handleFitToHeight}
                className="flex-1 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold text-center transition-colors"
              >
                Fit Page
              </button>
            </div>
          </div>

          {/* FLOATING DRAG INSTRUCTION PILL (BOTTOM-LEFT) */}
          <div className="absolute bottom-6 left-6 z-30 bg-slate-900/80 text-slate-300 text-xs px-3 py-1.5 rounded-lg shadow-lg border border-slate-700/80 flex items-center gap-2 backdrop-blur-sm pointer-events-none hidden sm:flex">
            <Move className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Drag canvas to pan • Scroll to zoom</span>
          </div>

          {/* ZOOMABLE CONTAINER */}
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
            className="shrink-0 transition-transform select-text"
          >
            {/* EXACT VECTOR FLOW CHART AS IN ORIGINAL FILE (FLOW CHART.pdf) */}
            <div className="w-[1240px] bg-white rounded-xl shadow-2xl border border-slate-300 p-6 md:p-10 shrink-0">
              <FlowChartSvg />

              {/* Footer attribution */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>ATCO Laboratories Ltd. — Approved Process Reference: FLOW CHART.pdf</span>
                <span>From Alternate Sourcing till Commercialization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-slate-100 border-t border-slate-300 px-4 py-2.5 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-600">
            Use <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-2xs">+</kbd> and <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-2xs">-</kbd> to zoom, or drag to pan.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
            >
              Reset 100%
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

