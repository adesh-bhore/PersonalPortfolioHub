import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface ModernProjectCardProps {
  project: {
    title: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
  };
  index: number;
}

export default function ModernProjectCard({ project, index }: ModernProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="modern-project-card relative group cursor-none"
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateZ(20px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.6s ease-out',
      }}
    >
      {/* Main Card Container */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-2xl glass border border-slate-700/50">
        
        {/* Animated Background Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--portfolio-accent))]/10 to-purple-500/10 opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Dynamic Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          style={{
            background: `linear-gradient(45deg, transparent, ${isHovered ? 'rgba(100, 255, 218, 0.4)' : 'transparent'}, transparent) border-box`,
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[hsl(var(--portfolio-accent))] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -40, -80],
                  x: [0, (Math.random() - 0.5) * 60]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Project Image with Parallax Effect */}
        <motion.div
          className="relative h-64 overflow-hidden rounded-t-2xl"
          style={{
            transform: isHovered ? `translateZ(30px) translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)` : 'translateZ(0px)',
          }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Image Overlay Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--portfolio-bg-primary))]/80 via-transparent to-transparent"
            animate={{
              opacity: isHovered ? 0.9 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Project Index Badge */}
          <motion.div
            className="absolute top-4 right-4 w-12 h-12 bg-[hsl(var(--portfolio-accent))] rounded-full flex items-center justify-center text-[hsl(var(--portfolio-bg-primary))] font-bold text-lg"
            animate={{
              rotate: isHovered ? [0, 10, -10, 0] : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ 
              rotate: { duration: 2, repeat: isHovered ? Infinity : 0 },
              scale: { duration: 0.3 }
            }}
          >
            {index + 1}
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <div className="p-6 space-y-4" style={{ transform: 'translateZ(20px)' }}>
          
          {/* Title with Animated Underline */}
          <motion.div className="relative">
            <motion.h3 
              className="font-poppins font-bold text-2xl text-slate-100 mb-2"
              animate={{
                color: isHovered ? "#64ffda" : "#f1f5f9",
              }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <motion.div
              className="h-0.5 bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "30%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-slate-300 leading-relaxed line-clamp-3"
            animate={{
              opacity: isHovered ? 0.9 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.longDescription || project.description}
          </motion.p>

          {/* Technologies with Animated Pills */}
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full border"
                style={{
                  backgroundColor: isHovered ? 'rgba(100, 255, 218, 0.1)' : 'rgba(55, 65, 81, 0.6)',
                  borderColor: isHovered ? 'rgba(100, 255, 218, 0.3)' : 'rgba(75, 85, 99, 0.5)',
                  color: isHovered ? '#64ffda' : '#94a3b8',
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * techIndex }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Action Buttons with Hover Effects */}
          <motion.div 
            className="flex gap-4 pt-4"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            <motion.a
              href={project.liveUrl}
              className="flex-1 text-center py-3 px-4 bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 text-[hsl(var(--portfolio-bg-primary))] rounded-xl font-semibold magnetic-btn relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{ transform: 'translateZ(10px)' }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <i className="fas fa-external-link-alt text-sm"></i>
                Live Demo
              </span>
            </motion.a>
            
            <motion.a
              href={project.githubUrl}
              className="flex-1 text-center py-3 px-4 border border-[hsl(var(--portfolio-accent))] text-[hsl(var(--portfolio-accent))] rounded-xl font-semibold magnetic-btn relative overflow-hidden group/btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{ transform: 'translateZ(10px)' }}
            >
              <motion.div
                className="absolute inset-0 bg-[hsl(var(--portfolio-accent))]"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[hsl(var(--portfolio-bg-primary))] transition-colors">
                <i className="fab fa-github text-sm"></i>
                GitHub
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* 3D Shadow Effect */}
        <motion.div
          className="absolute inset-0 bg-black/30 rounded-2xl -z-10 blur-xl"
          style={{
            transform: isHovered 
              ? `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02 + 15}px) translateZ(-20px)`
              : 'translateX(0px) translateY(15px) translateZ(-20px)',
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}