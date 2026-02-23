"use client";

import { useState, useCallback, useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";
import WineListResults from "@/components/WineListResults";
import { WineListAnalysis, TastePreferences } from "@/types/wine";

export default function WineListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<WineListAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [foodContext, setFoodContext] = useState("");
  const [preferences, setPreferences] = useState<TastePreferences | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("pour-preferences");
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleImageSelected = useCallback(
    async (base64: string, mediaType: string) => {
      setIsLoading(true);
      setError(null);
      setAnalysis(null);

      try {
        const response = await fetch("/api/analyze-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64,
            mediaType,
            foodContext: foodContext.trim() || undefined,
            preferences,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to analyze wine list");
        }

        const data = await response.json();
        setAnalysis(data.analysis);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [foodContext, preferences]
  );

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="px-6 pt-14">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold text-wine">
          Wine List Advisor
        </h1>
        <p className="mt-1 text-sm text-muted">
          Photograph a restaurant wine list. Get the top 3 picks with value
          analysis.
        </p>
      </div>

      {/* Food Context */}
      {!analysis && (
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
            What are you eating? (optional)
          </label>
          <input
            type="text"
            value={foodContext}
            onChange={(e) => setFoodContext(e.target.value)}
            placeholder="e.g. lamb chops, seafood pasta, cheese board..."
            className="w-full rounded-xl border border-warm-border bg-card px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine/20"
          />
        </div>
      )}

      {/* Upload Area */}
      {!analysis && (
        <ImageUpload
          onImageSelected={handleImageSelected}
          isLoading={isLoading}
          label="Photograph the wine list"
          sublabel="Your sommelier will find the best picks"
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
      {analysis && (
        <div className="mt-2">
          {foodContext && (
            <div className="mb-4 rounded-xl bg-wine/5 border border-wine/10 px-4 py-2.5">
              <p className="text-xs text-muted">
                Paired with:{" "}
                <span className="font-medium text-charcoal">{foodContext}</span>
              </p>
            </div>
          )}

          <WineListResults analysis={analysis} />

          <button
            onClick={handleReset}
            className="mt-6 w-full rounded-2xl border border-warm-border bg-card py-3.5 text-sm font-medium text-slate transition-colors hover:bg-cream-dark"
          >
            Analyze Another List
          </button>
        </div>
      )}

      {/* Preferences hint */}
      {!preferences && !analysis && !isLoading && (
        <div className="mt-6 rounded-xl bg-gold/5 border border-gold/20 p-4 text-center">
          <p className="text-xs text-slate">
            Set up your{" "}
            <a href="/preferences" className="font-medium text-wine underline">
              taste profile
            </a>{" "}
            for personalised picks.
          </p>
        </div>
      )}
    </div>
  );
}
