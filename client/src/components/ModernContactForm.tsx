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

          {/* Right Side - Earth Globe with Ribbon Bands */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative w-96 h-96" style={{ perspective: '1200px' }}>
              {/* Main Globe Container */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Central Earth Globe */}
                <div 
                  className="absolute inset-16 rounded-full shadow-2xl"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, #2563eb 0%, #1e40af 25%, #1e3a8a 50%),
                      radial-gradient(circle at 60% 70%, #059669 0%, #047857 30%, #065f46 60%),
                      radial-gradient(circle at 80% 20%, #0891b2 0%, #0e7490 40%, #155e75 70%),
                      conic-gradient(from 45deg, #1e40af, #059669, #0891b2, #7c3aed, #1e40af)
                    `,
                    backgroundSize: '100% 100%, 80% 80%, 60% 60%, 100% 100%',
                    backgroundPosition: '0% 0%, 20% 30%, 40% 10%, 0% 0%',
                  }}
                >
                  {/* Continent-like patterns */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-70"
                    style={{
                      background: `
                        radial-gradient(ellipse at 25% 40%, #10b981 0%, transparent 40%),
                        radial-gradient(ellipse at 70% 30%, #10b981 0%, transparent 35%),
                        radial-gradient(ellipse at 45% 70%, #059669 0%, transparent 30%),
                        radial-gradient(ellipse at 80% 60%, #047857 0%, transparent 25%)
                      `
                    }}
                  />
                  
                  {/* Ocean highlights */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-50"
                    style={{
                      background: `
                        radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.8) 0%, transparent 30%),
                        radial-gradient(circle at 20% 80%, rgba(14, 116, 144, 0.6) 0%, transparent 40%)
                      `
                    }}
                  />
                </div>

                {/* Flowing Ribbon Bands */}
                {[...Array(12)].map((_, i) => {
                  const baseRotation = i * 30;
                  const tilt = Math.sin(i * 0.5) * 20;
                  return (
                    <motion.div
                      key={`ribbon-${i}`}
                      className="absolute inset-0"
                      style={{
                        transform: `rotateY(${baseRotation}deg) rotateX(${tilt}deg)`,
                      }}
                      animate={{
                        rotateZ: [0, 360],
                      }}
                      transition={{
                        duration: 25 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                        direction: i % 2 === 0 ? "normal" : "reverse"
                      }}
                    >
                      {/* Ribbon Band */}
                      <div
                        className="absolute rounded-full border-0"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: `conic-gradient(from ${i * 45}deg, 
                            rgba(190, 24, 93, ${0.15 + i * 0.02}),
                            rgba(147, 51, 234, ${0.2 + i * 0.015}),
                            rgba(79, 70, 229, ${0.18 + i * 0.02}),
                            rgba(59, 130, 246, ${0.25 + i * 0.01}),
                            rgba(14, 165, 233, ${0.2 + i * 0.015}),
                            rgba(6, 182, 212, ${0.15 + i * 0.02}),
                            rgba(190, 24, 93, ${0.15 + i * 0.02})
                          )`,
                          clipPath: `polygon(
                            ${10 + i * 2}% ${20 + Math.sin(i) * 10}%,
                            ${90 - i * 2}% ${25 + Math.cos(i) * 8}%,
                            ${85 - i * 1.5}% ${75 - Math.sin(i * 2) * 10}%,
                            ${15 + i * 1.5}% ${70 - Math.cos(i * 1.5) * 8}%
                          )`,
                          filter: 'blur(0.5px)',
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Additional Flowing Bands with Different Orientations */}
                {[...Array(8)].map((_, i) => {
                  const rotation = i * 45 + 22.5;
                  return (
                    <motion.div
                      key={`flow-band-${i}`}
                      className="absolute inset-0"
                      style={{
                        transform: `rotateX(${60 + i * 15}deg) rotateY(${rotation}deg)`,
                      }}
                      animate={{
                        rotateZ: [0, -360],
                      }}
                      transition={{
                        duration: 30 + i * 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(${i * 45}deg, 
                            rgba(236, 72, 153, ${0.1 + i * 0.015}),
                            rgba(167, 103, 223, ${0.15 + i * 0.01}),
                            rgba(99, 102, 241, ${0.12 + i * 0.015}),
                            rgba(59, 130, 246, ${0.18 + i * 0.01})
                          )`,
                          clipPath: `ellipse(${40 + i * 3}% ${15 + i * 2}% at 50% 50%)`,
                          filter: 'blur(1px)',
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Organic Flowing Streams */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`stream-${i}`}
                    className="absolute inset-0"
                    animate={{
                      rotateY: [0, 360],
                      rotateX: [i * 10, (i * 10) + 360],
                    }}
                    transition={{
                      duration: 35 + i * 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: '100%',
                        height: '100%',
                        background: `conic-gradient(from ${i * 60}deg,
                          transparent,
                          rgba(147, 197, 253, ${0.2 + i * 0.02}),
                          rgba(196, 181, 253, ${0.15 + i * 0.01}),
                          rgba(251, 146, 206, ${0.18 + i * 0.015}),
                          transparent
                        )`,
                        clipPath: `path('M 50,0 Q ${20 + i * 10},25 50,50 Q ${80 - i * 10},75 50,100 Q ${20 + i * 10},75 50,50 Q ${80 - i * 10},25 50,0 Z')`,
                        filter: 'blur(2px)',
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Ambient Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, transparent 30%, rgba(147, 197, 253, 0.1) 60%, rgba(196, 181, 253, 0.15) 80%, transparent 100%)',
                  filter: 'blur(30px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
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