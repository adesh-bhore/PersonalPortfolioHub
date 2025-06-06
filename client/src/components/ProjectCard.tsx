import { motion } from "framer-motion";

interface ProjectCardProps {
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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="flip-card h-96"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front of card */}
        <div className="flip-card-front absolute w-full h-full glass rounded-xl p-6 flex flex-col">
          <img
            src={project.image}
            alt={project.title}
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h3 className="font-poppins font-bold text-xl text-[hsl(var(--portfolio-accent))] mb-2">
            {project.title}
          </h3>
          <p className="text-slate-300 flex-1">{project.description}</p>
        </div>

        {/* Back of card */}
        <div className="flip-card-back absolute w-full h-full glass rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-poppins font-bold text-xl text-[hsl(var(--portfolio-accent))] mb-4">
              {project.title}
            </h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[hsl(var(--portfolio-accent))] text-[hsl(var(--portfolio-bg-primary))] rounded-full text-sm font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <motion.a
              href={project.liveUrl}
              className="magnetic-btn flex-1 text-center py-2 bg-[hsl(var(--portfolio-accent))] text-[hsl(var(--portfolio-bg-primary))] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Live Demo
            </motion.a>
            <motion.a
              href={project.githubUrl}
              className="magnetic-btn flex-1 text-center py-2 border border-[hsl(var(--portfolio-accent))] text-[hsl(var(--portfolio-accent))] rounded-lg font-semibold hover:bg-[hsl(var(--portfolio-accent))] hover:text-[hsl(var(--portfolio-bg-primary))] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              GitHub
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
