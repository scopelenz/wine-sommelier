"use client";

import { useState, useCallback, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";
import WineCard from "@/components/WineCard";
import { WineInfo, TastePreferences } from "@/types/wine";

export default function ScanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [wine, setWine] = useState<WineInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<TastePreferences | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("pour-preferences");
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {
        // ignore invalid stored preferences
      }
    }
  }, []);

  const handleImageSelected = useCallback(
    async (base64: string, mediaType: string) => {
      setIsLoading(true);
      setError(null);
      setWine(null);

      try {
        const response = await fetch("/api/scan-label", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64,
            mediaType,
            preferences,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to analyze label");
        }

        const data = await response.json();
        setWine(data.wine);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [preferences]
  );

  const handleReset = () => {
    setWine(null);
    setError(null);
  };

  return (
    <div className="px-6 pt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-charcoal">
          Scan a Label
        </h1>
        <p className="mt-1 text-sm text-muted">
          Snap a photo of any wine bottle. Your sommelier will do the rest.
        </p>
      </div>

      {/* Upload Area */}
      {!wine && (
        <ImageUpload
          onImageSelected={handleImageSelected}
          isLoading={isLoading}
          label="Photograph the label"
          sublabel="Get instant wine intelligence"
        />
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={handleReset}
            className="mt-2 text-sm font-medium text-wine underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Results */}
      {wine && (
        <div className="mt-2">
          <WineCard wine={wine} />

          <button
            onClick={handleReset}
            className="mt-6 w-full rounded-2xl border border-warm-border bg-card py-3.5 text-sm font-medium text-slate transition-colors hover:bg-cream-dark"
          >
            Scan Another Label
          </button>
        </div>
      )}

      {/* Preferences hint */}
      {!preferences && !wine && !isLoading && (
        <div className="mt-6 rounded-xl bg-gold/5 border border-gold/20 p-4 text-center">
          <p className="text-xs text-slate">
            Set up your{" "}
            <a href="/preferences" className="font-medium text-wine underline">
              taste profile
            </a>{" "}
            for personalised recommendations.
          </p>
        </div>
      )}
    </div>
  );
}
