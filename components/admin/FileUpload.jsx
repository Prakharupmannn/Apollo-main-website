"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Loader2, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function FileUpload({
  value = "",
  onChange,
  folder = "general",
  accept = "image/jpeg,image/png,image/webp,image/gif",
  label = "Upload file",
  placeholder = "https://... or upload a file",
  isDocument = false,
  aspectRatio = "aspect-[4/5]",
  className = "",
  helperText = "",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("isDocument", String(isDocument));

      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload file");
      }

      if (data.data?.url) {
        onChange(data.data.url);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed. Please check network and try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const isPdf = isDocument || (typeof value === "string" && (value.endsWith(".pdf") || value.includes(".pdf?")));

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Upload Zone & Preview */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all ${
          dragActive
            ? "border-[#0E526B] bg-[#EDF7FA]"
            : "border-[#BFD6DF] bg-[#F4FAFC] hover:border-[#0E526B]/50 hover:bg-[#EDF7FA]/50"
        } ${aspectRatio}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#0E526B]" />
            <p className="mt-2 text-xs font-bold text-[#0E526B]">Uploading to Blob...</p>
            <p className="mt-0.5 text-[10px] text-slate-400">Storing in Vercel Blob</p>
          </div>
        ) : value ? (
          isPdf ? (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 shadow-sm">
                <FileText className="h-6 w-6" />
              </div>
              <p className="mt-2 text-xs font-bold text-slate-800 line-clamp-1 max-w-[200px]">
                {value.split("/").pop() || "Document.pdf"}
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                <CheckCircle2 className="h-3 w-3" /> Ready
              </span>
              <p className="mt-1 text-[10px] text-slate-400 group-hover:text-[#0E526B]">
                Click or drop to replace
              </p>
            </div>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Uploaded asset"
                className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition duration-200 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#0E526B] shadow-lg">
                  <Upload className="h-3.5 w-3.5" /> Replace Image
                </span>
              </div>
            </>
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center text-[#71858E]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#BFD6DF]">
              <Upload className="h-5 w-5 text-[#0E526B]" />
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-700">{label}</p>
            <p className="mt-0.5 text-[10px] text-slate-400">
              Drag & drop or <span className="font-bold text-[#0E526B]">browse</span>
            </p>
            {helperText && (
              <p className="mt-1 text-[9px] text-slate-400">{helperText}</p>
            )}
          </div>
        )}
      </div>

      {/* URL input fallback + Clear button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-[#DCE8ED] bg-white px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#0E526B] focus:outline-none focus:ring-2 focus:ring-[#0E526B]/15"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Clear file"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-1.5 text-[11px] text-rose-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

