# MixCheck 💊⚡️

AI-assisted drug interaction explorer with a sleek React UI and Groq’s Llama‑3.3 model. Enter two meds (plus patient factors), tap **Analyze Mix**, and get an animated risk gauge, deep mechanism/evidence/reports, and supporting insights.

## ✨ Features

- 🎯 **Smart Inputs** – Autosuggested meds, patient-factor chips, validation, motion-enhanced CTA.
- 🧠 **Groq Analytics** – Structured prompt to `llama-3.3-70b-versatile`, JSON parsing, graceful error toasts.
- 📊 **Risk Visualization** – Animated circular gauge, glow effects, motion transitions, severity labels.
- 🧪 **Evidence Tabs** – Mechanism / Evidence / Reports cards with Lucide icons + Radix motion tabs.
- 🌐 **Polished UX** – Animated background, responsive layout, Tailwind styling, Sonner notifications.

## 🧱 Tech Stack

**Frontend**
- React 18 + TypeScript (Vite + SWC)
- Tailwind CSS utility styling
- Motion (framer-motion compatible) animations
- Radix UI primitives, Lucide icons, Sonner toasts, Embla carousel

**AI Backend**
- Browser fetch to Groq API with `VITE_GROQ_API_KEY`
- Structured JSON output parsing and validation

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # or create manually
# add VITE_GROQ_API_KEY=sk-your-groq-key
npm run dev                  # http://localhost:3000
```

### Environment Variables

`VITE_GROQ_API_KEY` is required (note the `VITE_` prefix). Without it the Analyze button shows the “API key not configured” toast.

### Build

```bash
npm run build   # emits static assets to dist/
# optional preview
npx vite preview
```

## 🌥️ Deploy (Vercel)

1. Push to GitHub (e.g., `noah-dsouza/Mix-Check`).
2. In Vercel → **Add New Project** → import repo.
3. Settings → **Environment Variables** → add `VITE_GROQ_API_KEY`.
4. Build command: `npm run build`. Output directory: `dist` (also set in `vercel.json`).
5. Redeploy whenever the env var changes—Vite reads env at build time.

## 📂 Structure

```
src/
├─ components/
│  ├─ HeroPanel.tsx          # inputs + CTA
│  ├─ ResultsSection.tsx     # RiskGauge + analysis tabs
│  ├─ RiskGauge.tsx          # animated SVG arc
│  ├─ DataCards.tsx, etc.
│  └─ ui/                    # shadcn-style helpers (alert, sonner, …)
├─ App.tsx                   # analyze flow & layout
├─ main.tsx                  # React root
└─ index.css                 # Tailwind layers + globals
```

## 📝 Notes

- The Groq response is parsed from JSON; failures show Sonner toasts.
- Mount `<Toaster />` once so notifications render in dev + prod.
- Large bundle warning from Vite is informational; consider lazy-loading sections if needed.
