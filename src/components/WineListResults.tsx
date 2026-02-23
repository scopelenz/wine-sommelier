"use client";

import { WineListAnalysis } from "@/types/wine";

interface WineListResultsProps {
  analysis: WineListAnalysis;
}

const rankColors = [
  "from-wine to-wine-dark",
  "from-gold to-amber-700",
  "from-slate to-charcoal",
];

const rankLabels = ["Top Pick", "Runner Up", "Solid Choice"];

export default function WineListResults({ analysis }: WineListResultsProps) {
  return (
    <div className="space-y-4">
      {/* Overall Assessment */}
      <div className="rounded-2xl border border-warm-border bg-card p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-wine">
          List Assessment
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          {analysis.overallAssessment}
        </p>
      </div>

      {/* Top Picks */}
      {analysis.topPicks.map((pick, index) => (
        <div
          key={pick.rank}
          className="overflow-hidden rounded-2xl border border-warm-border bg-card"
        >
          {/* Rank Header */}
          <div
            className={`bg-gradient-to-r ${
              rankColors[index] || rankColors[2]
            } px-5 py-3`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                  {pick.rank}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                  {rankLabels[index] || `Pick #${pick.rank}`}
                </span>
              </div>
              {pick.isHiddenGem && (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Hidden Gem
                </span>
              )}
            </div>
          </div>

          {/* Wine Details */}
          <div className="p-5">
            <h3 className="font-serif text-xl text-charcoal">
              {pick.wineName}
            </h3>

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
              <span>{pick.grapeVariety}</span>
              <span>-</span>
              <span>{pick.region}</span>
            </div>

            <p className="mt-1 text-xs text-muted italic">{pick.style}</p>

            {/* Price Comparison */}
            <div className="mt-4 flex items-center gap-4 rounded-xl bg-cream p-3">
              <div className="flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                  List Price
                </p>
                <p className="text-lg font-semibold text-charcoal">
                  {pick.listPrice}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                  Retail Est.
                </p>
                <p className="text-lg font-semibold text-success">
                  {pick.estimatedRetail}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                  Markup
                </p>
                <span
                  className={`mt-0.5 rounded-full px-2.5 py-0.5 text-sm font-bold ${
                    parseFloat(pick.markupMultiplier) <= 2.5
                      ? "bg-success/10 text-success"
                      : parseFloat(pick.markupMultiplier) <= 3.5
                      ? "bg-warning/10 text-warning"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {pick.markupMultiplier}
                </span>
              </div>
            </div>

            {/* Reasoning */}
            <p className="mt-4 text-sm leading-relaxed text-slate">
              {pick.reasoning}
            </p>

            {/* Match Score */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                Match
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-4 rounded-sm ${
                      i < pick.matchScore ? "bg-wine" : "bg-warm-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-wine">
                {pick.matchScore}/10
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Best Value Callout */}
      <div className="rounded-2xl border border-success/20 bg-success/5 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-success">
          Best Value
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          {analysis.bestValue}
        </p>
      </div>

      {/* Avoid */}
      {analysis.avoidRecommendation && (
        <div className="rounded-2xl border border-warning/20 bg-warning/5 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-warning">
            Skip This One
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            {analysis.avoidRecommendation}
          </p>
        </div>
      )}
    </div>
  );
}
