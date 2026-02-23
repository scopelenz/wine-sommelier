"use client";

import { useCallback, useRef, useState } from "react";

interface ImageUploadProps {
  onImageSelected: (base64: string, mediaType: string) => void;
  isLoading?: boolean;
  label?: string;
  sublabel?: string;
}

export default function ImageUpload({
  onImageSelected,
  isLoading = false,
  label = "Snap a photo or upload an image",
  sublabel = "JPG, PNG, or WebP",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a JPG, PNG, or WebP image.");
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        alert("Image must be under 20MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);

        // Extract base64 data (remove the data:image/...;base64, prefix)
        const base64 = result.split(",")[1];
        onImageSelected(base64, file.type);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const clearImage = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-wine/20 bg-wine/5 px-6 py-16">
        <div className="mb-4 flex gap-1.5">
          <div
            className="h-3 w-3 rounded-full bg-wine animate-pulse-wine"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="h-3 w-3 rounded-full bg-wine animate-pulse-wine"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="h-3 w-3 rounded-full bg-wine animate-pulse-wine"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
        <p className="font-serif text-lg text-wine">Decanting...</p>
        <p className="mt-1 text-sm text-muted">
          Your sommelier is analyzing the wine
        </p>
      </div>
    );
  }

  if (preview) {
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-warm-border bg-card">
        <img
          src={preview}
          alt="Uploaded wine"
          className="h-64 w-full object-cover"
        />
        <button
          onClick={clearImage}
          className="absolute right-3 top-3 rounded-full bg-charcoal/70 p-2 text-white transition-colors hover:bg-charcoal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 transition-all ${
        dragActive
          ? "border-wine bg-wine/5"
          : "border-warm-border bg-card hover:border-wine/40 hover:bg-wine/5"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="mb-4 rounded-2xl bg-wine/10 p-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#722F37"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15L16 10L5 21" />
        </svg>
      </div>

      <p className="font-serif text-lg text-charcoal">{label}</p>
      <p className="mt-1 text-sm text-muted">{sublabel}</p>

      <div className="mt-4 flex gap-2">
        <span className="rounded-full bg-wine/10 px-4 py-1.5 text-xs font-medium text-wine">
          Camera
        </span>
        <span className="rounded-full bg-warm-border px-4 py-1.5 text-xs font-medium text-slate">
          Upload
        </span>
      </div>
    </div>
  );
}
