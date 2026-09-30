import { X, Download, ExternalLink, ZoomIn, Layers } from "lucide-react";

interface DiagramLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
  description?: string;
  highlights?: string[];
}

export default function DiagramLightboxModal({
  isOpen,
  onClose,
  title,
  imageUrl,
  description,
  highlights
}: DiagramLightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/95 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[90vh] rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base md:text-lg">{title}</h3>
              <span className="text-xs text-purple-300">High-Resolution Diagram Viewer</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={imageUrl}
              download
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-primary text-white font-bold text-xs hover:scale-105 transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" /> Download PNG
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-white transition-colors duration-200 ml-2"
              aria-label="Close Diagram Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 flex flex-col items-center gap-6">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group flex items-center justify-center">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto max-h-[60vh] object-contain rounded-2xl"
            />
          </div>

          {(description || (highlights && highlights.length > 0)) && (
            <div className="w-full p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
              {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
              {highlights && highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {highlights.map((h, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
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
