import { motion } from "framer-motion";

interface HexagonalSkillProps {
  name: string;
  icon: string;
  color: string;
  index: number;
}

export default function HexagonalSkill({ name, icon, color, index }: HexagonalSkillProps) {
  return (
    <motion.div
      className="flex flex-col items-center group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.08,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Exact 3D Hexagon from Reference */}
      <div className="relative w-20 h-20 mb-3">
        {/* Outer shadow */}
        <div
          className="absolute inset-0 transform translate-x-1 translate-y-2"
          style={{
            clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)',
            background: 'rgba(0, 0, 0, 0.4)',
            filter: 'blur(4px)',
          }}
        />
        
        {/* Main hexagon body */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)',
            background: `
              linear-gradient(135deg, 
                #ffffff 0%,
                #f1f5f9 20%,
                #e2e8f0 40%,
                #cbd5e1 60%,
                #94a3b8 80%,
                #64748b 100%
              )
            `,
          }}
        >
          {/* Top left highlight facet */}
          <div
            className="absolute"
            style={{
              clipPath: 'polygon(25% 6.7%, 50% 0%, 75% 6.7%, 50% 20%)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              width: '100%',
              height: '100%',
            }}
          />
          
          {/* Top right facet */}
          <div
            className="absolute"
            style={{
              clipPath: 'polygon(75% 6.7%, 100% 50%, 87% 35%, 50% 20%)',
              background: 'linear-gradient(45deg, #f1f5f9 0%, #e2e8f0 100%)',
              width: '100%',
              height: '100%',
            }}
          />
          
          {/* Bottom right facet */}
          <div
            className="absolute"
            style={{
              clipPath: 'polygon(100% 50%, 75% 93.3%, 50% 80%, 87% 65%)',
              background: 'linear-gradient(315deg, #94a3b8 0%, #64748b 100%)',
              width: '100%',
              height: '100%',
            }}
          />
          
          {/* Bottom left facet */}
          <div
            className="absolute"
            style={{
              clipPath: 'polygon(25% 93.3%, 0% 50%, 13% 65%, 50% 80%)',
              background: 'linear-gradient(225deg, #cbd5e1 0%, #94a3b8 100%)',
              width: '100%',
              height: '100%',
            }}
          />
          
          {/* Left facet */}
          <div
            className="absolute"
            style={{
              clipPath: 'polygon(0% 50%, 25% 6.7%, 50% 20%, 13% 35%)',
              background: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
              width: '100%',
              height: '100%',
            }}
          />
          
          {/* Center flat area */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              clipPath: 'polygon(50% 20%, 87% 35%, 87% 65%, 50% 80%, 13% 65%, 13% 35%)',
              background: `
                linear-gradient(145deg, 
                  #ffffff 0%,
                  #f8fafc 30%,
                  #f1f5f9 100%
                )
              `,
              width: '100%',
              height: '100%',
            }}
          >
            <div 
              className="text-lg font-bold"
              style={{ 
                color: color,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {icon}
            </div>
          </div>
        </div>
      </div>
      
      {/* Skill name */}
      <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors duration-200 text-center max-w-16">
        {name}
      </span>
    </motion.div>
  );
}