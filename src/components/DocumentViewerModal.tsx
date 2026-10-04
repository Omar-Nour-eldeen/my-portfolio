import { X, Download, ExternalLink, FileText, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
  description?: string;
  fileSize?: string;
}

export default function DocumentViewerModal({
  isOpen,
  onClose,
  title,
  fileUrl,
  description,
  fileSize
}: DocumentViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] sm:h-[85vh] rounded-2xl sm:rounded-3xl bg-slate-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/80 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-xs sm:text-base md:text-lg truncate">{title}</h3>
              {fileSize && <span className="text-[10px] sm:text-xs text-muted-foreground block truncate">PDF Document • {fileSize}</span>}
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors duration-200"
              title="Open in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            <a
              href={fileUrl}
              download
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-primary text-white font-bold text-xs hover:scale-105 transition-all duration-200"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-white transition-colors duration-200"
              aria-label="Close Viewer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Viewer */}
        <div className="flex-1 bg-slate-950 relative flex flex-col overflow-hidden">
          {description && (
            <div className="px-4 sm:px-6 py-2.5 bg-slate-900/50 border-b border-white/5 text-xs text-muted-foreground">
              {description}
            </div>
          )}

          <div className="flex-1 w-full h-full relative">
            <iframe
              src={fileUrl}
              title={title}
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
