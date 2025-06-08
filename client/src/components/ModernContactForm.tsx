import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import RotatingPlanet from "../RotatingPlanet";

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

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
     
    const formData = {
        from_name: e.target.from_name.value,
        from_email: e.target.from_email.value,
        message: e.target.message.value,
    };

    //  CHANGE THIS LINE:
    //  No more full URL. Just the relative path to the API endpoint.
    const apiUrl = '/api/contact'; 

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        // ... the rest of the try/catch logic is exactly the same
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Something went wrong');
 
       await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      reset();
        
    } catch (error) {
        // ... error handling is the same
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
              onSubmit={HandleSubmit}
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
                    name="from_name"
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
                    name="from_email"
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
                    name="message"
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
                className="w-55 px-2 bg-slate-400 text-white py-2 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 magnetic-btn"
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

          <div className="w-full h-[600px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
            <div className="w-full max-w-[600px] aspect-square">
              <RotatingPlanet />
            </div>
          </div>




        </div>
      </div>
    </section>
  );
}