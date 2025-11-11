# MixCheck

Interactive web interface that lets clinicians or patients explore potential drug–drug interactions using Groq’s Llama‑3.3 model. Users enter two medications (plus optional patient factors), trigger an AI analysis, and review a visual risk gauge, detailed mechanism/evidence/reports, and supporting cards in a polished UI.

## Features

- **Drug Interaction Explorer** – guided inputs with live suggestions for two drugs and common patient factors.
- **Groq-Powered Analysis** – sends a structured pharmacology prompt to `llama-3.3-70b-versatile` on Groq to obtain a JSON response with risk score, summary, mechanism, evidence, and reported adverse events.
- **Risk Visualization** – animated `RiskGauge` plus motion-enhanced explanation cards and tabbed content.
- **Modern UI Kit** – Tailwind-based components with Radix UI primitives, motion animations, Lucide icons, and Sonner toasts.

## Tech Stack

- [Vite](https://vitejs.dev/) + React 18
- TypeScript with SWC React plugin
- Tailwind CSS utilities (in `src/index.css` and component classes)
- Motion (framer-motion compatible) for animations
- Radix UI, Lucide, Sonner, Embla carousel, and other supporting libraries

## Getting Started

```bash
npm install
npm run dev    # start Vite on http://localhost:3000
```

### Environment Variables

Create `.env.local` (never commit it) with:

```
VITE_GROQ_API_KEY=sk-your-secret-key
```

The `VITE_` prefix is required so Vite exposes the key to the browser bundle. Without it the Analyze button will show “API key not configured”.

### Production Build

```bash
npm run build   # emits static assets to dist/
```

Preview locally via any static server, e.g. `npx vite preview`.

## Deployment (Vercel)

1. Push the repo to GitHub (e.g., `noah-dsouza/Mix-Check`).
2. In Vercel, “Add New Project” → import the repo.
3. Under **Settings → Environment Variables**, add `VITE_GROQ_API_KEY`.
4. Ensure **Build Command** is `npm run build` and **Output Directory** is `dist` (or keep `vercel.json` at the root).
5. Redeploy whenever env vars change; Vite reads them at build time.

## Project Structure

```
src/
├── components/
│   ├── HeroPanel.tsx           # drug inputs + analyze CTA
│   ├── ResultsSection.tsx      # risk gauge + rich analysis tabs
│   ├── RiskGauge.tsx           # animated circular gauge
│   ├── DataCards.tsx, etc.     # supplemental content
│   └── ui/                     # shared UI helpers (alert, sonner, etc.)
├── App.tsx                     # orchestrates analyze flow & layout
├── main.tsx                    # React entry
└── index.css                   # Tailwind layers and global styles
```

## Scripts

- `npm run dev` – Vite dev server.
- `npm run build` – production build to `dist/`.
- `npm run preview` *(optional)* – serve the built assets locally.

## Notes

- The Groq call in `src/App.tsx` expects JSON back; guard logic surfaces toast errors if the API fails.
- Sonner’s `<Toaster />` should be mounted (e.g., in `App.tsx`) so toast notifications render in both dev and production.
