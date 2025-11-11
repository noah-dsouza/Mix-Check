import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HeroPanel } from './components/HeroPanel';
import { ResultsSection } from './components/ResultsSection';
import { DataCards } from './components/DataCards';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { toast } from 'sonner@2.0.3';

interface AnalysisData {
  drugA: string;
  drugB: string;
  score: number;
  explanation: string;
  mechanism?: string;
  evidence?: string;
  reports?: string;
}

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeWithGroq = async (drugA: string, drugB: string, factors: string[]) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!apiKey) {
      toast.error('API key not configured. Please check your .env file.');
      return;
    }

    setIsAnalyzing(true);

    const factorsText = factors.length > 0 ? `\n\nPatient Factors: ${factors.join(', ')}` : '';

    const prompt = `You are a clinical pharmacology expert. Analyze the potential drug interaction between ${drugA} and ${drugB}.${factorsText}

Please provide a comprehensive analysis in the following JSON format:

{
  "riskScore": <number from 0-100>,
  "summary": "<2-3 sentence overview of the interaction>",
  "mechanism": "<detailed explanation of how these drugs interact at the molecular/physiological level, including specific enzymes, receptors, or pathways involved>",
  "evidence": "<summary of clinical evidence, studies, and FDA data supporting this interaction. Include specific study references if available>",
  "reports": "<information about adverse event reports from FDA FAERS database or similar sources, including common symptoms and prevalence>"
}

Base your analysis on:
- Known pharmacokinetic and pharmacodynamic interactions
- Cytochrome P450 enzyme interactions
- FDA drug interaction databases
- Clinical evidence from medical literature
- Patient safety considerations

Provide accurate, evidence-based information. If the interaction risk is uncertain or minimal, state that clearly.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are a clinical pharmacology expert providing evidence-based drug interaction analysis. Always respond with valid JSON only.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from API');
      }
      
      const analysis = JSON.parse(jsonMatch[0]);

      setAnalysisData({
        drugA,
        drugB,
        score: analysis.riskScore,
        explanation: analysis.summary,
        mechanism: analysis.mechanism,
        evidence: analysis.evidence,
        reports: analysis.reports,
      });

      setShowResults(true);

      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);

      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Error analyzing drugs:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to analyze drugs. Please check your API key and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = (drugA: string, drugB: string, factors: string[]) => {
    analyzeWithGroq(drugA, drugB, factors);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 relative overflow-x-hidden">
      <AnimatedBackground />
      
      <NavBar />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 min-h-screen flex items-center scroll-mt-20">
        <HeroPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      </section>

      {/* Results Section */}
      {showResults && analysisData && (
        <section id="results" className="relative py-20 scroll-mt-20">
          <ResultsSection
            drugA={analysisData.drugA}
            drugB={analysisData.drugB}
            score={analysisData.score}
            explanation={analysisData.explanation}
            mechanism={analysisData.mechanism}
            evidence={analysisData.evidence}
            reports={analysisData.reports}
          />
        </section>
      )}

      {/* Data Cards Section */}
      {showResults && (
        <section className="relative py-20">
          <DataCards />
        </section>
      )}

      {/* About Section */}
      <AboutSection />

      <Footer />
    </div>
  );
}
