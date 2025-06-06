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

          {/* Right Side - Advanced 3D Sphere */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative w-96 h-96" style={{ perspective: '1000px' }}>
              {/* Main Sphere Container */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Multiple Layered Rings - Horizontal */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`horizontal-${i}`}
                    className="absolute inset-0 border rounded-full"
                    style={{
                      borderWidth: i === 2 ? '3px' : '2px',
                      borderColor: i % 3 === 0 ? 'rgba(100, 255, 218, 0.6)' : 
                                   i % 3 === 1 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(59, 130, 246, 0.3)',
                      transform: `rotateX(${i * 30}deg) scale(${0.95 - i * 0.03})`,
                      borderStyle: i === 2 || i === 4 ? 'dashed' : 'solid',
                    }}
                    animate={{
                      rotateZ: [0, 360],
                    }}
                    transition={{
                      duration: 20 + i * 3,
                      repeat: Infinity,
                      ease: "linear",
                      direction: i % 2 === 0 ? "normal" : "reverse"
                    }}
                  />
                ))}

                {/* Vertical Rings */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`vertical-${i}`}
                    className="absolute inset-0 border-2 rounded-full"
                    style={{
                      borderColor: i % 2 === 0 ? 'rgba(34, 197, 94, 0.4)' : 'rgba(251, 191, 36, 0.3)',
                      transform: `rotateY(${i * 45}deg) rotateX(90deg) scale(${0.9 - i * 0.02})`,
                    }}
                    animate={{
                      rotateZ: [0, -360],
                    }}
                    transition={{
                      duration: 25 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}

                {/* Diagonal Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`diagonal-${i}`}
                    className="absolute inset-0 border-2 rounded-full"
                    style={{
                      borderColor: 'rgba(236, 72, 153, 0.3)',
                      transform: `rotateX(${45 + i * 30}deg) rotateY(${30 + i * 20}deg) scale(${0.85 - i * 0.05})`,
                      borderStyle: 'dotted',
                    }}
                    animate={{
                      rotateZ: [0, 360],
                    }}
                    transition={{
                      duration: 18 + i * 4,
                      repeat: Infinity,
                      ease: "linear",
                      direction: "reverse"
                    }}
                  />
                ))}
                
                {/* Inner Layered Cores */}
                <motion.div
                  className="absolute inset-16 bg-gradient-to-br from-[hsl(var(--portfolio-accent))] via-purple-500 to-blue-500 rounded-full opacity-15"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.35, 0.15],
                    rotateZ: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute inset-24 bg-gradient-to-br from-purple-500 via-pink-500 to-[hsl(var(--portfolio-accent))] rounded-full opacity-20"
                  animate={{
                    scale: [1.2, 0.8, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                    rotateZ: [360, 180, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Complex Floating Particles */}
                {[...Array(20)].map((_, i) => {
                  const angle = (i * 360) / 20;
                  const radius = 140 + Math.sin(i) * 20;
                  return (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: i % 4 === 0 ? '#64ffda' : 
                                        i % 4 === 1 ? '#a855f7' : 
                                        i % 4 === 2 ? '#3b82f6' : '#10b981',
                        left: `${50 + Math.cos(angle * Math.PI / 180) * radius / 2}%`,
                        top: `${50 + Math.sin(angle * Math.PI / 180) * radius / 2}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        y: [0, -15, 0],
                        x: [0, Math.cos((angle + i * 10) * Math.PI / 180) * 10, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1.2, 0.5],
                        rotateZ: [0, 360],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}

                {/* Orbital Trails */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`trail-${i}`}
                    className="absolute inset-8 border rounded-full"
                    style={{
                      borderWidth: '1px',
                      borderColor: `rgba(100, 255, 218, ${0.1 + i * 0.05})`,
                      borderStyle: 'dashed',
                      transform: `rotateX(${i * 60}deg) rotateY(${i * 40}deg)`,
                    }}
                    animate={{
                      rotateZ: [0, -360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 35 + i * 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}

                {/* Central Energy Burst */}
                <motion.div
                  className="absolute inset-32 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(100,255,218,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 100%)',
                  }}
                  animate={{
                    scale: [0.8, 1.4, 0.8],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Outer Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, transparent 40%, rgba(100,255,218,0.1) 70%, rgba(168,85,247,0.1) 100%)',
                  filter: 'blur(20px)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
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