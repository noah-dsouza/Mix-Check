import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface RiskGaugeProps {
  score: number; // 0-100
  label: string;
}

export function RiskGauge({ score, label }: RiskGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Animate from 0 to score
    const duration = 2000;
    const steps = 60;
    const stepValue = score / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += stepValue;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score]);

  // Calculate color based on score
  const getColor = (value: number) => {
    if (value < 33) return '#0066CC'; // Cool blue - Low
    if (value < 66) return '#00B3E6'; // Teal - Moderate
    return '#FF705B'; // Coral-orange - High
  };

  const getRiskLevel = (value: number) => {
    if (value < 33) return 'Low Risk';
    if (value < 66) return 'Moderate Risk';
    return 'High Risk';
  };

  const color = getColor(displayScore);
  const circumference = 2 * Math.PI * 70;
  const progress = (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="70"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <motion.circle
            cx="96"
            cy="96"
            r="70"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="text-4xl text-[#001B44]"
          >
            {displayScore}
          </motion.div>
          <div className="text-sm text-gray-500">/ 100</div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl -z-10"
          style={{ backgroundColor: `${color}20` }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-4 text-center"
      >
        <div className="text-xl" style={{ color }}>
          {getRiskLevel(displayScore)}
        </div>
        <div className="text-sm text-gray-500 mt-1">{label}</div>
      </motion.div>
    </div>
  );
}
