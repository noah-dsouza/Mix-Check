import { motion } from 'motion/react';
import { Zap, Shield, Database, Brain } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning models trained on 50,000+ peer-reviewed drug interaction studies to provide accurate risk assessments.',
    },
    {
      icon: Database,
      title: 'Comprehensive Database',
      description: 'Access to extensive pharmaceutical databases including FDA reports, clinical trials, and real-world adverse event data.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate interaction analysis with detailed explanations of mechanisms, evidence levels, and clinical implications.',
    },
    {
      icon: Shield,
      title: 'Evidence-Based',
      description: 'All recommendations backed by clinical evidence, research publications, and regulatory agency reports for reliable guidance.',
    },
  ];

  return (
    <section id="about" className="relative py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[#001B44] mb-4">About MixCheck</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            MixCheck is an AI-powered drug interaction explorer designed to help understand potential 
            medication interactions. Our platform combines cutting-edge technology with comprehensive 
            medical databases to provide instant, evidence-based analysis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066CC]/10 to-[#00B3E6]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0066CC]" />
                </div>
                <h3 className="text-[#001B44] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-[#0066CC]/5 to-[#00B3E6]/5 rounded-2xl p-8 border border-[#0066CC]/20"
        >
          <h3 className="text-[#001B44] mb-4 text-center">Important Disclaimer</h3>
          <div className="text-gray-700 space-y-3">
            <p>
              MixCheck is designed for <strong>educational and informational purposes only</strong>. 
              This tool should not be used as a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              Always consult with qualified healthcare professionals before starting, stopping, or changing 
              any medication regimen. Drug interactions can be complex and may vary based on individual 
              patient factors, dosages, and medical history.
            </p>
            <p>
              If you experience any adverse effects or have concerns about your medications, contact your 
              healthcare provider or seek emergency medical attention immediately.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
