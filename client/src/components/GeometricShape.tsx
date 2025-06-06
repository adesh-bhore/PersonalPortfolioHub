import { motion } from "framer-motion";

export default function GeometricShape() {
  return (
    <motion.div
      className="w-80 h-80 flex items-center justify-center animate-float"
      style={{ filter: "drop-shadow(0 0 30px #64ffda)" }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-48 h-48">
        {/* Main rotating cube */}
        <motion.div
          className="absolute inset-0 border-2 border-[#64ffda] rounded-lg"
          style={{
            transformStyle: "preserve-3d",
            background: "linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0.3))",
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 180],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Wireframe overlay */}
        <motion.div
          className="absolute inset-4 border border-[#64ffda] rounded-md opacity-60"
          animate={{
            rotateX: [360, 0],
            rotateY: [180, 540],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Inner core */}
        <motion.div
          className="absolute inset-8 bg-[#64ffda] rounded-sm opacity-40"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Orbital rings */}
        <motion.div
          className="absolute inset-0 border border-[#64ffda] rounded-full opacity-30"
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute inset-2 border border-[#64ffda] rounded-full opacity-20"
          animate={{
            rotateZ: [360, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
}
