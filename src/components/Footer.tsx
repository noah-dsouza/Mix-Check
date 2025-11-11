import { Github, Lock, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#001B44] text-white/80 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="#github" 
              className="flex items-center gap-2 hover:text-[#00B3E6] transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a 
              href="#privacy" 
              className="flex items-center gap-2 hover:text-[#00B3E6] transition-colors"
            >
              <Lock className="w-5 h-5" />
              <span className="text-sm">Privacy</span>
            </a>
            <a 
              href="#sources" 
              className="flex items-center gap-2 hover:text-[#00B3E6] transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-sm">Sources</span>
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-sm text-center md:text-right">
            <p className="text-white/60">
              Educational use only – not medical advice.
            </p>
            <p className="text-white/40 text-xs mt-1">
              Always consult healthcare professionals for medical decisions.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-white/40">
          © 2025 MixCheck. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
