import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Video as VideoIcon,
  Presentation,
  FileText,
  X,
  Check,
  AlertCircle,
  File,
} from 'lucide-react';
import { InitiativeProofFile, ProofFileType } from '../types';

interface ProofUploaderProps {
  attachments: InitiativeProofFile[];
  onChange: (attachments: InitiativeProofFile[]) => void;
  maxFiles?: number;
  label?: string;
  compact?: boolean;
}

export const detectFileType = (file: File): ProofFileType => {
  const mime = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (mime.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(name)) {
    return 'image';
  }
  if (mime.startsWith('video/') || /\.(mp4|webm|mov|ogg|m4v|avi|mkv)$/i.test(name)) {
    return 'video';
  }
  if (
    mime.includes('presentation') ||
    mime.includes('powerpoint') ||
    /\.(ppt|pptx|pps|ppsx|key|odp|pdf)$/i.test(name)
  ) {
    return 'ppt';
  }
  return 'other';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const ProofUploader: React.FC<ProofUploaderProps> = ({
  attachments,
  onChange,
  maxFiles = 10,
  label = 'Upload Proof Files (Image, Video, PPT)',
  compact = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const processFiles = async (fileList: FileList | File[]) => {
    setUploadError(null);
    setIsProcessing(true);

    const newAttachments: InitiativeProofFile[] = [...attachments];

    for (let i = 0; i < fileList.length; i++) {
      if (newAttachments.length >= maxFiles) {
        setUploadError(`Maximum of ${maxFiles} proof files allowed.`);
        break;
      }

      const file = fileList[i];
      const detected = detectFileType(file);

      // Read as Data URL for preview and playback
      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        newAttachments.push({
          id: `proof-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          fileType: detected,
          mimeType: file.type || 'application/octet-stream',
          sizeFormatted: formatFileSize(file.size),
          dataUrl,
          uploadedAt: new Date().toISOString().split('T')[0],
        });
      } catch (err) {
        console.error('Failed reading file:', file.name, err);
        setUploadError(`Could not read ${file.name}.`);
      }
    }

    onChange(newAttachments);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemove = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onChange(attachments.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
            {label}
          </label>
          <span className="text-[11px] font-bold text-slate-500">
            {attachments.length} of {maxFiles} files attached
          </span>
        </div>
      )}

      {/* Accepted Types Badges */}
      <div className="flex items-center flex-wrap gap-1.5 text-[11px]">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 font-bold border border-blue-200">
          <ImageIcon className="w-3 h-3 text-blue-600" />
          Images (PNG, JPG, WEBP, SVG)
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 font-bold border border-purple-200">
          <VideoIcon className="w-3 h-3 text-purple-600" />
          Videos (MP4, WEBM, MOV)
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 font-bold border border-amber-200">
          <Presentation className="w-3 h-3 text-amber-600" />
          Presentations (PPT, PPTX, PDF)
        </span>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-none transition-all cursor-pointer text-center ${
          compact ? 'p-3' : 'p-5'
        } ${
          isDragging
            ? 'border-blue-600 bg-blue-50/70 text-blue-900'
            : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-400 text-slate-700'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="*/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-blue-600">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-800">
              Click to select or drag & drop proof files here (Any Format)
            </p>
            <p className="text-[11px] text-slate-500">
              Upload Image screenshots, Video recordings, PPT / PDF presentation decks, or documents
            </p>
          </div>
          {isProcessing && (
            <div className="text-xs font-bold text-blue-600 animate-pulse mt-1">
              Processing and attaching proof files...
            </div>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="p-2 bg-rose-50 border-l-4 border-rose-600 text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* List of Attached Proof Files */}
      {attachments.length > 0 && (
        <div className="space-y-2 pt-1">
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-600">
            Attached Proof Files ({attachments.length}):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {attachments.map((file) => {
              return (
                <div
                  key={file.id}
                  className="bg-white border border-slate-300 p-2 rounded-none flex items-center gap-2.5 shadow-2xs group relative hover:border-slate-400 transition-colors"
                >
                  {/* Thumbnail / Icon */}
                  <div className="w-10 h-10 bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                    {file.fileType === 'image' && file.dataUrl ? (
                      <img
                        src={file.dataUrl}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : file.fileType === 'video' ? (
                      <div className="w-full h-full bg-purple-900 text-purple-200 flex items-center justify-center">
                        <VideoIcon className="w-5 h-5" />
                      </div>
                    ) : file.fileType === 'ppt' ? (
                      <div className="w-full h-full bg-amber-700 text-amber-100 flex items-center justify-center">
                        <Presentation className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-slate-700 text-slate-200 flex items-center justify-center">
                        <File className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                      <span
                        className={`font-black uppercase tracking-wider px-1 ${
                          file.fileType === 'image'
                            ? 'bg-blue-100 text-blue-800'
                            : file.fileType === 'video'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {file.fileType}
                      </span>
                      <span>{file.sizeFormatted}</span>
                      <span>{file.uploadedAt}</span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(file.id, e)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-none transition-colors"
                    title="Remove attachment"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
