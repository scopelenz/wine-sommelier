"use client";

import { useState, useEffect } from "react";
import { TastePreferences } from "@/types/wine";

const WINE_STYLES = [
  "Bold Reds",
  "Elegant Reds",
  "Light Reds",
  "Crisp Whites",
  "Aromatic Whites",
  "Rich Whites",
  "Dry Rosé",
  "Sparkling",
  "Natural Wine",
  "Orange Wine",
  "Dessert Wine",
  "Fortified",
];

const DISLIKE_STYLES = [
  "Heavy Oak",
  "Very Tannic",
  "Sweet Wines",
  "High Alcohol",
  "Funky / Barnyard",
  "Overly Acidic",
  "Thin / Watery",
  "Too Fruity",
];

const REGIONS = [
  "France",
  "Italy",
  "Spain",
  "Portugal",
  "Germany",
  "Austria",
  "Greece",
  "California",
  "Oregon",
  "New York",
  "Argentina",
  "Chile",
  "Australia",
  "New Zealand",
  "South Africa",
  "Lebanon",
  "Georgia",
  "England",
];

const DEFAULT_PREFERENCES: TastePreferences = {
  favoriteStyles: [],
  dislikedStyles: [],
  preferredRegions: [],
  budgetRange: { min: 10, max: 50, currency: "£" },
  adventurousness: "moderate",
  notes: "",
};

export default function PreferencesPage() {
  const [prefs, setPrefs] = useState<TastePreferences>(DEFAULT_PREFERENCES);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pour-preferences");
    if (stored) {
      try {
        setPrefs(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const toggleItem = (
    field: "favoriteStyles" | "dislikedStyles" | "preferredRegions",
    item: string
  ) => {
    setPrefs((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("pour-preferences", JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setPrefs(DEFAULT_PREFERENCES);
    localStorage.removeItem("pour-preferences");
    setSaved(false);
  };

  return (
    <div className="px-6 pt-14 pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-wine">
          My Palate
        </h1>
        <p className="mt-1 text-sm text-muted">
          Tell Pour what you love. Better preferences, better recommendations.
        </p>
      </div>

      {/* Favorite Styles */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-wine">
          Styles I Love
        </h2>
        <div className="flex flex-wrap gap-2">
          {WINE_STYLES.map((style) => {
            const active = prefs.favoriteStyles.includes(style);
            return (
              <button
                key={style}
                onClick={() => toggleItem("favoriteStyles", style)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-wine text-white shadow-sm"
                    : "border border-warm-border bg-card text-slate hover:border-wine/30"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </section>

      {/* Disliked Styles */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-wine">
          Not My Thing
        </h2>
        <div className="flex flex-wrap gap-2">
          {DISLIKE_STYLES.map((style) => {
            const active = prefs.dislikedStyles.includes(style);
            return (
              <button
                key={style}
                onClick={() => toggleItem("dislikedStyles", style)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-charcoal text-white shadow-sm"
                    : "border border-warm-border bg-card text-slate hover:border-slate/40"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </section>

      {/* Regions */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-wine">
          Regions I Enjoy
        </h2>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((region) => {
            const active = prefs.preferredRegions.includes(region);
            return (
              <button
                key={region}
                onClick={() => toggleItem("preferredRegions", region)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gold text-white shadow-sm"
                    : "border border-warm-border bg-card text-slate hover:border-gold/40"
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </section>

      {/* Adventurousness */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-wine">
          How Adventurous?
        </h2>
        <div className="flex gap-2">
          {(
            [
              {
                value: "conservative",
                label: "Play It Safe",
                desc: "Stick to what I know",
              },
              {
                value: "moderate",
                label: "Open-Minded",
                desc: "Surprise me sometimes",
              },
              {
                value: "adventurous",
                label: "Wild Card",
                desc: "Bring on the weird",
              },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setPrefs((prev) => ({
                  ...prev,
                  adventurousness: option.value,
                }))
              }
              className={`flex-1 rounded-xl p-3 text-center transition-all ${
                prefs.adventurousness === option.value
                  ? "border-2 border-wine bg-wine/5"
                  : "border border-warm-border bg-card hover:border-wine/30"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  prefs.adventurousness === option.value
                    ? "text-wine"
                    : "text-charcoal"
                }`}
              >
                {option.label}
              </p>
              <p className="mt-0.5 text-[10px] text-muted">{option.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Budget */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-wine">
          Typical Budget Per Bottle
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-[10px] text-muted">Min</label>
            <div className="flex items-center rounded-xl border border-warm-border bg-card">
              <span className="pl-3 text-sm text-muted">
                {prefs.budgetRange.currency}
              </span>
              <input
                type="number"
                value={prefs.budgetRange.min}
                onChange={(e) =>
                  setPrefs((prev) => ({
                    ...prev,
                    budgetRange: {
                      ...prev.budgetRange,
                      min: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full bg-transparent px-2 py-2.5 text-sm text-charcoal focus:outline-none"
              />
            </div>
          </div>
          <span className="mt-4 text-muted">—</span>
          <div className="flex-1">
            <label className="mb-1 block text-[10px] text-muted">Max</label>
            <div className="flex items-center rounded-xl border border-warm-border bg-card">
              <span className="pl-3 text-sm text-muted">
                {prefs.budgetRange.currency}
              </span>
              <input
                type="number"
                value={prefs.budgetRange.max}
                onChange={(e) =>
                  setPrefs((prev) => ({
                    ...prev,
                    budgetRange: {
                      ...prev.budgetRange,
                      max: parseInt(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full bg-transparent px-2 py-2.5 text-sm text-charcoal focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-wine">
          Anything Else?
        </h2>
        <textarea
          value={prefs.notes}
          onChange={(e) =>
            setPrefs((prev) => ({ ...prev, notes: e.target.value }))
          }
          placeholder="e.g. I'm vegetarian, I love wines from small producers, I'm into biodynamic..."
          rows={3}
          className="w-full resize-none rounded-xl border border-warm-border bg-card px-4 py-3 text-sm text-charcoal placeholder:text-muted/50 focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine/20"
        />
      </section>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 rounded-2xl border border-warm-border bg-card py-3.5 text-sm font-medium text-slate transition-colors hover:bg-cream-dark"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className={`flex-1 rounded-2xl py-3.5 text-sm font-medium text-white transition-all ${
            saved
              ? "bg-success"
              : "bg-wine hover:bg-wine-dark active:scale-[0.98]"
          }`}
        >
          {saved ? "Saved" : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}
