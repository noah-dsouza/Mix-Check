import { motion } from 'motion/react';
import { Search, Zap } from 'lucide-react';
import { useState } from 'react';

const drugSuggestions = [
  'Aspirin', 'Ibuprofen', 'Warfarin', 'Metformin', 'Lisinopril',
  'Atorvastatin', 'Omeprazole', 'Sertraline', 'Amoxicillin', 'Levothyroxine'
];

const userFactors = [
  'Pregnant',
  'Liver Condition',
  'Kidney Disease',
  'Heart Disease',
  'Age 65+',
  'Alcohol Use',
];

interface HeroPanelProps {
  onAnalyze: (drugA: string, drugB: string, factors: string[]) => void;
  isAnalyzing?: boolean;
}

export function HeroPanel({ onAnalyze, isAnalyzing }: HeroPanelProps) {
  const [drugA, setDrugA] = useState('');
  const [drugB, setDrugB] = useState('');
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [showSuggestionsA, setShowSuggestionsA] = useState(false);
  const [showSuggestionsB, setShowSuggestionsB] = useState(false);

  const toggleFactor = (factor: string) => {
    setSelectedFactors(prev =>
      prev.includes(factor)
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const handleAnalyze = () => {
    if (drugA && drugB) {
      onAnalyze(drugA, drugB, selectedFactors);
    }
  };

  const filteredSuggestionsA = drugSuggestions.filter(drug =>
    drug.toLowerCase().includes(drugA.toLowerCase())
  );

  const filteredSuggestionsB = drugSuggestions.filter(drug =>
    drug.toLowerCase().includes(drugB.toLowerCase())
  );

  return (
    <div className="relative max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 shadow-[0_8px_32px_rgba(0,102,204,0.12)]"
        style={{
          boxShadow: '0 8px 32px rgba(0, 102, 204, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
        }}
      >
        {/* Glowing edge accents */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#0066CC]/20 via-[#00B3E6]/20 to-[#0066CC]/20 rounded-3xl blur-sm -z-10" />

        <h1 className="text-center mb-2 text-[#001B44]">
          Drug Interaction Explorer
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Check potential interactions between medications
        </p>

        {/* Drug Input Fields */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Drug A */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-2">Drug A</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={drugA}
                onChange={(e) => setDrugA(e.target.value)}
                onFocus={() => setShowSuggestionsA(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsA(false), 200)}
                placeholder="Search medication..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-all"
              />
              {showSuggestionsA && drugA && filteredSuggestionsA.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-20">
                  {filteredSuggestionsA.map((drug) => (
                    <button
                      key={drug}
                      onClick={() => {
                        setDrugA(drug);
                        setShowSuggestionsA(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-[#0066CC]/5 transition-colors"
                    >
                      {drug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Drug B */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-2">Drug B</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={drugB}
                onChange={(e) => setDrugB(e.target.value)}
                onFocus={() => setShowSuggestionsB(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsB(false), 200)}
                placeholder="Search medication..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-[#0066CC] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-all"
              />
              {showSuggestionsB && drugB && filteredSuggestionsB.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-20">
                  {filteredSuggestionsB.map((drug) => (
                    <button
                      key={drug}
                      onClick={() => {
                        setDrugB(drug);
                        setShowSuggestionsB(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-[#0066CC]/5 transition-colors"
                    >
                      {drug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Factors */}
        <div className="mb-8">
          <label className="block text-sm text-gray-600 mb-3">Patient Factors</label>
          <div className="flex flex-wrap gap-2">
            {userFactors.map((factor) => (
              <motion.button
                key={factor}
                onClick={() => toggleFactor(factor)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedFactors.includes(factor)
                    ? 'bg-gradient-to-r from-[#0066CC] to-[#00B3E6] text-white shadow-lg shadow-[#0066CC]/25'
                    : 'bg-white/80 text-gray-700 border border-gray-200 hover:border-[#0066CC]'
                }`}
              >
                {factor}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <motion.button
          onClick={handleAnalyze}
          disabled={!drugA || !drugB || isAnalyzing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00B3E6] text-white disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#00B3E6] to-[#0066CC] opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isAnalyzing ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Analyze Mix
              </>
            )}
          </span>
          {/* Ripple effect container */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={false}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
