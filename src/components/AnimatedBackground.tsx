import { motion } from 'motion/react';

export function AnimatedBackground() {
  // Generate random molecules/nodes
  const molecules = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient waves */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00B3E6]/5 via-[#0066CC]/10 to-[#001B44]/5" />
      
      {/* Animated molecules */}
      {molecules.map((molecule) => (
        <motion.div
          key={molecule.id}
          className="absolute rounded-full"
          style={{
            left: `${molecule.x}%`,
            top: `${molecule.y}%`,
            width: molecule.size,
            height: molecule.size,
            background: `radial-gradient(circle, rgba(0, 102, 204, 0.15) 0%, rgba(0, 179, 230, 0.05) 50%, transparent 70%)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: molecule.duration,
            repeat: Infinity,
            delay: molecule.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Wave layers */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, rgba(0, 179, 230, 0.1) 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 70% 60%, rgba(0, 102, 204, 0.15) 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [20, -20, 20],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
