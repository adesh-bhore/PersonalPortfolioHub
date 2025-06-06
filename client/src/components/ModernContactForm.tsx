import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ModernContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-primary))] relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-slate-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Form */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.p
                className="text-slate-400 font-mono text-sm tracking-wider uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get in Touch
              </motion.p>
              <motion.h2
                className="font-poppins font-bold text-5xl lg:text-6xl text-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Contact.
              </motion.h2>
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Your Name */}
              <div className="space-y-2">
                <label className="block text-slate-100 font-medium">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="What's your good name?"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-4 text-slate-100 placeholder-slate-500 focus:border-[hsl(var(--portfolio-accent))] focus:outline-none transition-colors"
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-[hsl(var(--portfolio-accent))] rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: focusedField === 'name' ? 0.3 : 0,
                      scale: focusedField === 'name' ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Your Email */}
              <div className="space-y-2">
                <label className="block text-slate-100 font-medium">
                  Your email
                </label>
                <div className="relative">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="What's your web address?"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-4 text-slate-100 placeholder-slate-500 focus:border-[hsl(var(--portfolio-accent))] focus:outline-none transition-colors"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-[hsl(var(--portfolio-accent))] rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: focusedField === 'email' ? 0.3 : 0,
                      scale: focusedField === 'email' ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Your Message */}
              <div className="space-y-2">
                <label className="block text-slate-100 font-medium">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    {...register("message")}
                    rows={6}
                    placeholder="What you want to say?"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-4 text-slate-100 placeholder-slate-500 focus:border-[hsl(var(--portfolio-accent))] focus:outline-none transition-colors resize-none"
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-[hsl(var(--portfolio-accent))] rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: focusedField === 'message' ? 0.3 : 0,
                      scale: focusedField === 'message' ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                {errors.message && (
                  <p className="text-red-400 text-sm">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[hsl(var(--portfolio-accent))] text-[hsl(var(--portfolio-bg-primary))] py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 magnetic-btn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner animate-spin mr-2"></i>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Right Side - Realistic 3D Sphere */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative w-96 h-96" style={{ perspective: '2000px' }}>
              {/* Main Sphere Container */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Core Earth Sphere with Realistic Lighting */}
                <div 
                  className="absolute inset-20 rounded-full"
                  style={{
                    background: `
                      radial-gradient(ellipse 100% 80% at 35% 25%, 
                        #87ceeb 0%, 
                        #4682b4 15%, 
                        #228b22 25%, 
                        #32cd32 35%, 
                        #4682b4 45%, 
                        #1e90ff 55%, 
                        #228b22 65%, 
                        #32cd32 75%, 
                        #4682b4 85%, 
                        #191970 100%
                      ),
                      radial-gradient(circle at 70% 30%, rgba(50, 205, 50, 0.8) 0%, transparent 30%),
                      radial-gradient(circle at 20% 60%, rgba(34, 139, 34, 0.9) 0%, transparent 25%),
                      radial-gradient(circle at 80% 70%, rgba(70, 130, 180, 0.7) 0%, transparent 35%)
                    `,
                    boxShadow: `
                      inset -40px -40px 80px rgba(0, 0, 50, 0.8),
                      inset 20px 20px 40px rgba(135, 206, 235, 0.3),
                      0 0 100px rgba(100, 149, 237, 0.4)
                    `,
                    filter: 'contrast(1.2) saturate(1.1)',
                  }}
                >
                  {/* Surface Details */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-80"
                    style={{
                      background: `
                        radial-gradient(ellipse at 15% 35%, rgba(139, 69, 19, 0.6) 0%, transparent 20%),
                        radial-gradient(ellipse at 85% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 25%),
                        radial-gradient(ellipse at 60% 80%, rgba(34, 139, 34, 0.8) 0%, transparent 30%),
                        radial-gradient(ellipse at 30% 70%, rgba(70, 130, 180, 0.6) 0%, transparent 40%)
                      `
                    }}
                  />
                  
                  {/* Atmospheric Glow */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 40% 30%, rgba(135, 206, 235, 0.4) 0%, transparent 70%)',
                      filter: 'blur(1px)',
                    }}
                  />
                </div>

                {/* 3D Ribbon Bands - Multiple Layers */}
                {[...Array(15)].map((_, i) => {
                  const rotation = i * 24;
                  const tilt = Math.sin(i * 0.3) * 30 + (i * 6);
                  const scale = 0.95 + Math.sin(i * 0.2) * 0.1;
                  
                  return (
                    <motion.div
                      key={`ribbon-layer-${i}`}
                      className="absolute inset-0"
                      style={{
                        transform: `rotateY(${rotation}deg) rotateX(${tilt}deg) rotateZ(${i * 12}deg) scale(${scale})`,
                        transformStyle: 'preserve-3d',
                      }}
                      animate={{
                        rotateZ: [0, 360],
                      }}
                      transition={{
                        duration: 30 + i * 3,
                        repeat: Infinity,
                        ease: "linear",
                        direction: i % 2 === 0 ? "normal" : "reverse"
                      }}
                    >
                      {/* Ribbon with 3D depth */}
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: `
                            linear-gradient(${45 + i * 30}deg, 
                              rgba(255, 182, 193, ${0.3 + Math.sin(i) * 0.1}) 0%,
                              rgba(221, 160, 221, ${0.4 + Math.cos(i) * 0.1}) 20%,
                              rgba(173, 216, 230, ${0.35 + Math.sin(i * 2) * 0.1}) 40%,
                              rgba(176, 196, 222, ${0.3 + Math.cos(i * 2) * 0.1}) 60%,
                              rgba(230, 230, 250, ${0.25 + Math.sin(i * 3) * 0.1}) 80%,
                              rgba(255, 192, 203, ${0.3 + Math.cos(i * 3) * 0.1}) 100%
                            )
                          `,
                          clipPath: `polygon(
                            ${Math.max(5, 20 - i)}% ${Math.max(10, 30 - i * 2)}%,
                            ${Math.min(95, 80 + i)}% ${Math.max(10, 25 - i)}%,
                            ${Math.min(90, 75 + i * 2)}% ${Math.min(90, 70 + i * 2)}%,
                            ${Math.max(10, 25 - i)}% ${Math.min(85, 75 + i)}%
                          )`,
                          filter: `blur(${0.5 + i * 0.1}px) drop-shadow(0 ${2 + i}px ${4 + i * 2}px rgba(0,0,0,0.3))`,
                          transform: `translateZ(${i * 2}px)`,
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Additional Curved Flow Bands */}
                {[...Array(10)].map((_, i) => {
                  const angle = i * 36;
                  return (
                    <motion.div
                      key={`flow-curve-${i}`}
                      className="absolute inset-0"
                      style={{
                        transform: `rotateX(${75 + i * 10}deg) rotateY(${angle}deg) rotateZ(${i * 18}deg)`,
                        transformStyle: 'preserve-3d',
                      }}
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 40 + i * 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: `
                            conic-gradient(from ${i * 45}deg,
                              transparent 0%,
                              rgba(255, 105, 180, ${0.25 + i * 0.02}) 15%,
                              rgba(138, 43, 226, ${0.3 + i * 0.015}) 35%,
                              rgba(75, 0, 130, ${0.2 + i * 0.02}) 55%,
                              rgba(70, 130, 180, ${0.25 + i * 0.01}) 75%,
                              transparent 100%
                            )
                          `,
                          clipPath: `ellipse(${35 + i * 4}% ${12 + i * 2}% at 50% 50%)`,
                          filter: `blur(${1 + i * 0.2}px) brightness(${1.2 + i * 0.1})`,
                          transform: `translateZ(${-i * 3}px)`,
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Swirling Streams */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`swirl-${i}`}
                    className="absolute inset-0"
                    style={{
                      transform: `rotateX(${i * 22.5}deg) rotateY(${i * 45}deg)`,
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      rotateZ: [0, 360],
                      rotateY: [0, 720],
                    }}
                    transition={{
                      duration: 45 + i * 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: '100%',
                        height: '100%',
                        background: `
                          radial-gradient(ellipse at 50% 50%,
                            transparent 30%,
                            rgba(230, 230, 250, ${0.2 + i * 0.02}) 50%,
                            rgba(176, 196, 222, ${0.15 + i * 0.015}) 70%,
                            transparent 100%
                          )
                        `,
                        clipPath: `path('M 50,0 Q ${20 + i * 8},30 50,60 Q ${80 - i * 8},90 50,100 Q ${20 + i * 6},70 50,40 Q ${80 - i * 6},10 50,0 Z')`,
                        filter: `blur(${2 + i * 0.3}px) contrast(${1.1 + i * 0.1})`,
                        transform: `translateZ(${i * 4}px)`,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Atmospheric Halo */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle, 
                      transparent 25%, 
                      rgba(173, 216, 230, 0.1) 50%, 
                      rgba(176, 196, 222, 0.15) 70%, 
                      rgba(230, 230, 250, 0.1) 85%, 
                      transparent 100%
                    )
                  `,
                  filter: 'blur(40px)',
                }}
                animate={{
                  scale: [0.95, 1.15, 0.95],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Light Reflection */}
              <motion.div
                className="absolute inset-24 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 35% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
                  filter: 'blur(10px)',
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}