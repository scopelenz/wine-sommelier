"use client";

import { WineInfo } from "@/types/wine";
import { useState } from "react";

const colorMap: Record<string, string> = {
  red: "bg-red-900/20 text-red-900",
  white: "bg-amber-100 text-amber-800",
  "rosé": "bg-pink-100 text-pink-700",
  sparkling: "bg-yellow-100 text-yellow-700",
  dessert: "bg-orange-100 text-orange-700",
  fortified: "bg-purple-100 text-purple-700",
};

const colorDotMap: Record<string, string> = {
  red: "bg-red-900",
  white: "bg-amber-300",
  "rosé": "bg-pink-400",
  sparkling: "bg-yellow-400",
  dessert: "bg-orange-400",
  fortified: "bg-purple-700",
};

interface WineCardProps {
  wine: WineInfo;
}

export default function WineCard({ wine }: WineCardProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-2xl border border-warm-border bg-card p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="font-serif text-2xl leading-tight text-charcoal">
              {wine.name}
            </h2>
            <p className="mt-1 text-sm text-slate">{wine.producer}</p>
          </div>
          <span
            className={`ml-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              colorMap[wine.color] || "bg-gray-100 text-gray-600"
            }`}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                colorDotMap[wine.color] || "bg-gray-400"
              }`}
            />
            {wine.color}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-muted">
          {wine.vintage && <span>{wine.vintage}</span>}
          {wine.vintage && <span>-</span>}
          <span>{wine.region}, {wine.country}</span>
          {wine.appellation && (
            <>
              <span>-</span>
              <span>{wine.appellation}</span>
            </>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {wine.grapes.map((grape) => (
            <span
              key={grape}
              className="rounded-full bg-wine/8 px-2.5 py-0.5 text-xs font-medium text-wine"
            >
              {grape}
            </span>
          ))}
        </div>
      </div>

      {/* Dinner Party One-Liner */}
      <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-gold">
          Drop this at dinner
        </p>
        <p className="mt-2 font-serif text-base leading-relaxed text-charcoal">
          &ldquo;{wine.dinnerPartyOneLiner}&rdquo;
        </p>
      </div>

      {/* Quality Assessment */}
      <div className="rounded-2xl border border-warm-border bg-card p-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-wine">
          The Verdict
        </p>
        <p className="text-sm leading-relaxed text-slate">
          {wine.qualityAssessment}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted">Price range:</span>
          <span className="rounded-full bg-success/10 px-3 py-0.5 text-xs font-semibold text-success">
            {wine.priceRange.currency}{wine.priceRange.low} — {wine.priceRange.currency}{wine.priceRange.high}
          </span>
        </div>
      </div>

      {/* Tasting Profile */}
      <div className="rounded-2xl border border-warm-border bg-card p-5">
        <button
          onClick={() => toggleSection("tasting")}
          className="flex w-full items-center justify-between"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-wine">
            Tasting Profile
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-muted transition-transform ${
              expanded === "tasting" ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div
          className={`mt-3 space-y-3 overflow-hidden transition-all ${
            expanded === "tasting"
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Body", value: wine.tastingProfile.body },
              { label: "Sweetness", value: wine.tastingProfile.sweetness },
              { label: "Acidity", value: wine.tastingProfile.acidity },
              { label: "Tannins", value: wine.tastingProfile.tannins },
              { label: "Finish", value: wine.tastingProfile.finish },
            ].map((attr) => (
              <div key={attr.label}>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                  {attr.label}
                </p>
                <p className="text-sm font-medium text-charcoal">
                  {attr.value}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Aromas
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {wine.tastingProfile.aromas.map((aroma) => (
                <span
                  key={aroma}
                  className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs text-slate"
                >
                  {aroma}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Flavors
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {wine.tastingProfile.flavors.map((flavor) => (
                <span
                  key={flavor}
                  className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs text-slate"
                >
                  {flavor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Food Pairings */}
      <div className="rounded-2xl border border-warm-border bg-card p-5">
        <button
          onClick={() => toggleSection("food")}
          className="flex w-full items-center justify-between"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-wine">
            Food Pairings
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-muted transition-transform ${
              expanded === "food" ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div
          className={`mt-3 overflow-hidden transition-all ${
            expanded === "food"
              ? "max-h-48 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-wrap gap-2">
            {wine.foodPairings.map((pairing) => (
              <span
                key={pairing}
                className="rounded-full border border-warm-border bg-cream px-3 py-1 text-sm text-slate"
              >
                {pairing}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="rounded-2xl border border-warm-border bg-card p-5">
        <button
          onClick={() => toggleSection("story")}
          className="flex w-full items-center justify-between"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-wine">
            The Story
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-muted transition-transform ${
              expanded === "story" ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div
          className={`mt-3 space-y-3 overflow-hidden transition-all ${
            expanded === "story"
              ? "max-h-48 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Producer
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              {wine.producerStory}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Region
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate">
              {wine.regionContext}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
