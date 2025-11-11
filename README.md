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
