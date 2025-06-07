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
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="project-card-container"
    >
      <FloatingCard className="w-full max-w-sm mx-auto">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl w-full h-full">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <h3 className="font-poppins font-bold text-xl text-slate-100 group-hover:text-[hsl(var(--portfolio-accent))] transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium bg-[hsl(var(--portfolio-accent))]/20 text-[hsl(var(--portfolio-accent))] rounded-full border border-[hsl(var(--portfolio-accent))]/30"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-400 rounded-full">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[hsl(var(--portfolio-accent))]/20 hover:bg-[hsl(var(--portfolio-accent))]/30 text-[hsl(var(--portfolio-accent))] px-4 py-2 rounded-lg text-sm font-medium text-center border border-[hsl(var(--portfolio-accent))]/30 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Live Demo
              </motion.a>
              
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-slate-100 px-4 py-2 rounded-lg text-sm font-medium text-center border border-slate-600/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fab fa-github mr-2"></i>
                Code
              </motion.a>
            </div>
          </div>
        </div>
      </FloatingCard>
    </motion.div>
  );
}