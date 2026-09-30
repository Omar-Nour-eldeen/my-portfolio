import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle, FileText } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  accept?: string;
  bucketName?: string;
  folderPath?: string;
  onUploadComplete: (url: string) => void;
  currentUrl?: string;
  className?: string;
  hint?: string;
}

const ImageUploader = ({
  label,
  accept = "image/*",
  bucketName = "project-assets",
  folderPath = "images",
  onUploadComplete,
  currentUrl,
  className = "",
  hint,
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `${timestamp}-${randomStr}.${ext}`;
      const filePath = `${folderPath}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        console.warn("Supabase upload failed, using local preview:", uploadError.message);
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);
        onUploadComplete(localUrl);
        toast.warning("Note: Create 'project-assets' bucket in Supabase Storage for permanent hosting.", { duration: 5000 });
        return;
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      setPreviewUrl(publicUrl);
      onUploadComplete(publicUrl);
      toast.success(`File uploaded successfully!`);
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(`Upload failed: ${err.message || "Unknown error"}`);
    } finally {
      setUploading(false);
    }
  }, [bucketName, folderPath, onUploadComplete]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const clearImage = () => {
    setPreviewUrl(null);
    onUploadComplete("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const isPDF = accept.includes("pdf");

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-[11px] font-semibold text-slate-300">{label}</label>

      {previewUrl ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-950/50 group">
          {isPDF ? (
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white font-semibold truncate">PDF Uploaded</p>
                <p className="text-[10px] text-slate-400 truncate">{previewUrl}</p>
              </div>
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            </div>
          ) : (
            <div className="relative aspect-video">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/90 hover:bg-red-500 text-white flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-white/10 bg-slate-950/40 hover:border-primary/40 hover:bg-slate-900/50"
          } ${uploading ? "pointer-events-none" : ""}`}
          onClick={() => !uploading && fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <p className="text-xs text-slate-400">Uploading to Supabase Storage...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {isPDF ? (
                <FileText className="w-7 h-7 text-slate-500" />
              ) : (
                <ImageIcon className="w-7 h-7 text-slate-500" />
              )}
              <div>
                <p className="text-xs font-semibold text-white">
                  {isDragging ? "Drop here!" : "Click to upload or drag & drop"}
                </p>
                {hint && <p className="text-[10px] text-slate-500 mt-0.5">{hint}</p>}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Upload className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-primary font-semibold">Upload to Supabase Storage</span>
              </div>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
