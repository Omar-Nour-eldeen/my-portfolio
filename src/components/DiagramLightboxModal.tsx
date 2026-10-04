import { useState, useEffect } from "react";
import { X, Download, ZoomIn, ZoomOut, RotateCcw, Layers, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  imageUrl: string;
  title: string;
  description?: string;
  highlights?: string[];
  typeLabel?: string;
}

interface DiagramLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Multiple items gallery support
  items?: LightboxItem[];
  initialIndex?: number;

  // Single item fallback support
  title?: string;
  imageUrl?: string;
  description?: string;
  highlights?: string[];
  typeLabel?: string;
}

export default function DiagramLightboxModal({
  isOpen,
  onClose,
  items,
  initialIndex = 0,
  title,
  imageUrl,
  description,
  highlights,
  typeLabel = "High-Resolution Image Viewer"
}: DiagramLightboxModalProps) {
  // Construct list of items from either items array or single props
  const itemsList: LightboxItem[] =
    items && items.length > 0
      ? items
      : imageUrl
      ? [{ imageUrl, title: title || "", description, highlights, typeLabel }]
      : [];

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Sync index when modal opens or initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoomLevel(1);
    }
  }, [isOpen, initialIndex]);

  const currentItem = itemsList[currentIndex] || itemsList[0];

  const handleNextItem = () => {
    if (itemsList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % itemsList.length);
    setZoomLevel(1);
  };

  const handlePrevItem = () => {
    if (itemsList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + itemsList.length) % itemsList.length);
    setZoomLevel(1);
  };

  // Keyboard Navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevItem();
      } else if (e.key === "ArrowRight") {
        handleNextItem();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, itemsList.length, currentIndex]);

  if (!isOpen || !currentItem) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 2 : 1));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
      <div className="relative w-full max-w-6xl h-[94vh] sm:h-[90vh] rounded-2xl sm:rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/90 gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-xs sm:text-base md:text-lg truncate">{currentItem.title}</h3>
                {itemsList.length > 1 && (
                  <span className="text-[10px] font-mono font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 shrink-0">
                    {currentIndex + 1} / {itemsList.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-xs text-purple-300 block truncate">
                {currentItem.typeLabel || typeLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls Bar */}
            <div className="flex items-center bg-slate-950 border border-white/10 rounded-xl p-1 gap-1">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                className="p-1 sm:p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={toggleZoom}
                className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold text-purple-300 hover:text-white transition-colors"
                title="Click to toggle Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-1 sm:p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  onClick={handleResetZoom}
                  className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Download Button */}
            <a
              href={currentItem.imageUrl}
              download
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-primary text-white font-bold text-xs hover:scale-105 transition-all duration-200"
              title="Download Image"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-white transition-colors duration-200"
              aria-label="Close Lightbox"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Viewport with Scrollable Zoom Canvas & Next/Prev Controls */}
        <div className="flex-1 overflow-auto p-2 sm:p-4 bg-slate-950 flex flex-col items-center justify-start relative scrollbar-thin">
          {/* Navigation Arrows for Multiple Images */}
          {itemsList.length > 1 && (
            <>
              <button
                onClick={handlePrevItem}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl z-20"
                aria-label="Previous Image"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextItem}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl z-20"
                aria-label="Next Image"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="w-full flex items-center justify-center min-h-full py-2">
            <div
              onClick={toggleZoom}
              className="relative cursor-zoom-in transition-transform duration-300 ease-out origin-top flex items-center justify-center max-w-full"
              style={{
                transform: `scale(${zoomLevel})`,
              }}
              title={zoomLevel === 1 ? "Click to Zoom In (2x)" : "Click to Fit Screen"}
            >
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="max-w-full h-auto max-h-[72vh] sm:max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

          {(currentItem.description || (currentItem.highlights && currentItem.highlights.length > 0)) && (
            <div className="w-full max-w-4xl mt-3 p-3.5 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2.5 shrink-0 z-10">
              {currentItem.description && <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentItem.description}</p>}
              {currentItem.highlights && currentItem.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentItem.highlights.map((h, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] sm:text-xs font-semibold text-purple-300">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
