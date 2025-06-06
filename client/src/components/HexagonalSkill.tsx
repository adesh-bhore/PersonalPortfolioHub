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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5
      }}
      style={{ perspective: '1000px' }}
    >
      {/* 3D Paper-Wrapped Hexagonal Tile */}
      <div className="relative w-24 h-24 mb-3" style={{ transformStyle: 'preserve-3d' }}>
        {/* Main hexagonal container */}
        <div className="relative w-full h-full">
          {/* Background shadow/depth layer */}
          <div
            className="absolute inset-0 transform translate-x-1 translate-y-1"
            style={{
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
              filter: 'blur(2px)',
            }}
          />
          
          {/* Main paper hexagon with 3D effect */}
          <div
            className="absolute inset-0 transform transition-all duration-300 group-hover:translate-y-[-2px]"
            style={{
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
              background: `
                linear-gradient(135deg, 
                  #f8fafc 0%, 
                  #e2e8f0 25%, 
                  #cbd5e1 50%, 
                  #94a3b8 75%, 
                  #64748b 100%
                ),
                linear-gradient(45deg, 
                  rgba(255,255,255,0.9) 0%, 
                  rgba(255,255,255,0.7) 50%, 
                  rgba(255,255,255,0.4) 100%
                )
              `,
              boxShadow: `
                inset 2px 2px 4px rgba(255,255,255,0.8),
                inset -2px -2px 4px rgba(0,0,0,0.1),
                0 4px 8px rgba(0,0,0,0.2),
                0 2px 4px rgba(0,0,0,0.1)
              `,
            }}
          >
            {/* Inner content area */}
            <div
              className="absolute inset-3 flex items-center justify-center"
              style={{
                clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                background: `
                  radial-gradient(circle at 30% 30%, 
                    rgba(255,255,255,0.9) 0%, 
                    rgba(248,250,252,0.8) 50%, 
                    rgba(241,245,249,0.7) 100%
                  )
                `,
              }}
            >
              {/* Icon with proper styling */}
              <div 
                className="text-2xl font-bold transition-all duration-300 group-hover:scale-110"
                style={{ 
                  color: color,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
                }}
              >
                {icon}
              </div>
            </div>
            
            {/* Paper texture overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                background: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 1px,
                    rgba(0,0,0,0.02) 1px,
                    rgba(0,0,0,0.02) 2px
                  ),
                  repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 1px,
                    rgba(0,0,0,0.01) 1px,
                    rgba(0,0,0,0.01) 2px
                  )
                `,
              }}
            />
            
            {/* Subtle border highlight */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '2px',
              }}
            />
          </div>
          
          {/* Reflection effect */}
          <div
            className="absolute inset-0 transform transition-all duration-300 group-hover:opacity-80"
            style={{
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
              background: `
                linear-gradient(125deg, 
                  rgba(255,255,255,0.6) 0%, 
                  transparent 30%, 
                  transparent 70%, 
                  rgba(255,255,255,0.2) 100%
                )
              `,
              opacity: 0.5,
            }}
          />
        </div>
      </div>
      
      {/* Skill name */}
      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-200 text-center">
        {name}
      </span>
    </motion.div>
  );
}