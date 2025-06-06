import { motion } from "framer-motion";

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    color: string;
  };
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="skill-card glass p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 group magnetic-btn"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 30px rgba(100, 255, 218, 0.3)",
        y: -5
      }}
    >
      <motion.i
        className={`${skill.icon} text-5xl ${skill.color} mb-4`}
        whileHover={{ 
          rotate: skill.name === "React" ? 360 : 0,
          scale: 1.1
        }}
        transition={{ duration: 0.3 }}
      />
      <h3 className="font-semibold text-slate-200">{skill.name}</h3>
    </motion.div>
  );
}
