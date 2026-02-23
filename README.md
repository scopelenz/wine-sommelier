# Pour

Your pocket sommelier. Snap a photo of any wine bottle or restaurant wine list and get instant analysis, tasting notes, food pairings, and personalised recommendations.

## Features

- **Label Scanner** — Photograph a wine bottle label to get detailed tasting profiles, quality assessments, food pairings, producer stories, and a dinner party one-liner
- **Wine List Advisor** — Photograph a restaurant wine list to get the top 3 picks with value analysis and markup estimates. Optionally tell it what you're eating for pairing recommendations
- **Taste Profile** — Configure your palate preferences (favourite styles, dislikes, regions, budget, adventurousness) to personalise every recommendation
- **Dual AI Engine** — Gemini 2.5 Flash (free) by default, with optional Claude Sonnet via bring-your-own-key

## Getting Started

```bash
npm install
```

Create a `.env.local` file:

```
GEMINI_API_KEY=your-gemini-api-key
```

Get a free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your phone or browser.

## Tech Stack

- Next.js 16 with Turbopack
- React 19
- Tailwind CSS v4
- Google Gemini 2.5 Flash (default) / Anthropic Claude Sonnet (BYOK)
- Mobile-first PWA-style design with dark mode support
