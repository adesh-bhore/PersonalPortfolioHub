import { motion } from "framer-motion";

const ExperienceCard = ({ experience, alignment }) => {
  const isLeft = alignment === 'left';

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="flex justify-between items-center w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Left-aligned Card */}
      {isLeft && (
        <motion.div className="w-5/12" variants={cardVariants}>
          <CardContent experience={experience} />
        </motion.div>
      )}

      {/* Timeline Spine and Icon */}
      <div className="relative w-2/12 flex justify-center">
        <div className="absolute w-1 h-full bg-slate-700/50"></div>
        <motion.div
          className="z-10 w-12 h-12 flex items-center justify-center text-2xl text-white bg-gradient-to-br from-purple-600 to-slate-800 rounded-full ring-8 ring-slate-900"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ duration: 0.2 }}
        >
          <i className={experience.icon}></i>
        </motion.div>
      </div>

      {/* Right-aligned Card */}
      {!isLeft && (
        <motion.div className="w-5/12" variants={cardVariants}>
          <CardContent experience={experience} />
        </motion.div>
      )}
    </motion.div>
  );
};

const CardContent = ({ experience }) => (
  <div className="p-6 bg-slate-800/50 border border-slate-700/80 rounded-xl shadow-lg glass backdrop-blur-sm hover:border-purple-500/60 transition-colors duration-300">
    <h3 className="font-poppins font-bold text-2xl text-slate-100">{experience.role}</h3>
    <p className="font-mono text-lg text-purple-400 mb-2">{experience.company}</p>
    <p className="text-sm text-slate-400 mb-4">{experience.duration}</p>
    <ul className="space-y-2 text-slate-300 list-disc list-inside">
      {experience.description.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
);

export default ExperienceCard;