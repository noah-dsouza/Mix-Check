import { TestTube } from 'lucide-react';

export function NavBar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#00B3E6] flex items-center justify-center">
              <TestTube className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl tracking-tight text-[#001B44]">MixCheck</span>
          </div>

          {/* Navigation Links - Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-[#0066CC] transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('results')} className="text-gray-600 hover:text-[#0066CC] transition-colors">
              Analyze
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-[#0066CC] transition-colors">
              About
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
