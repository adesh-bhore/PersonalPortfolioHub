import { motion } from "framer-motion";
import FloatingCard from "./FloatingCard";

interface DiagonalBendCardProps {
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

export default function DiagonalBendCard({ project, index }: DiagonalBendCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  // Calculate bend based on mouse position
  const getBendTransform = () => {
    if (!isHovered) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    const { x, y } = mousePosition;
    const intensity = 8; // Bend intensity
    
    // Calculate rotation based on position
    let rotateX = 0;
    let rotateY = 0;
    
    // If hovering on right side, bend left side up/down
    if (x > 0.5) {
      rotateY = -(x - 0.5) * intensity * 2;
    } else {
      // If hovering on left side, bend right side up/down
      rotateY = (0.5 - x) * intensity * 2;
    }
    
    // If hovering on bottom, bend top up/down
    if (y > 0.5) {
      rotateX = (y - 0.5) * intensity * 2;
    } else {
      // If hovering on top, bend bottom up/down
      rotateX = -(0.5 - y) * intensity * 2;
    }
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  return (
    <motion.div
      ref={cardRef}
      className="diagonal-bend-card relative w-full h-[500px] cursor-none"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: getBendTransform(),
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
      }}
    >
      {/* Main Card */}
      <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
        
        {/* Project Image/Icon Section */}
        <div className="relative h-64 bg-slate-100 flex items-center justify-center overflow-hidden">
          {/* Large Project Icon */}
          <motion.div
            className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.title.includes("E-Commerce") && (
              <i className="fas fa-shopping-cart text-5xl text-slate-100"></i>
            )}
            {project.title.includes("Social") && (
              <i className="fas fa-users text-5xl text-slate-100"></i>
            )}
            {project.title.includes("AI") && (
              <i className="fas fa-brain text-5xl text-slate-100"></i>
            )}
          </motion.div>
          
          {/* GitHub Icon in Top Right */}
          <motion.a
            href={project.githubUrl}
            className="absolute top-4 right-4 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-100 hover:bg-slate-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fab fa-git-alt text-lg"></i>
          </motion.a>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Project Title */}
          <motion.h3 
            className="font-poppins font-bold text-2xl text-slate-100"
            animate={{
              color: isHovered ? "#64ffda" : "#f1f5f9",
            }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          {/* Project Description */}
          <p className="text-slate-400 text-sm leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="text-xs font-medium px-2 py-1 rounded"
                style={{
                  color: techIndex === 0 ? '#3b82f6' : 
                         techIndex === 1 ? '#10b981' : 
                         techIndex === 2 ? '#f59e0b' : '#8b5cf6'
                }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * techIndex }}
              >
                #{tech.toLowerCase()}
              </motion.span>
            ))}
          </div>

          {/* Action Button */}
          <motion.div className="pt-4">
            <motion.a
              href={project.liveUrl}
              className="inline-flex items-center gap-2 bg-[hsl(var(--portfolio-accent))] text-[hsl(var(--portfolio-bg-primary))] px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fas fa-external-link-alt"></i>
              View Project
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}