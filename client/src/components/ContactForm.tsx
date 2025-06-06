import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        reset();
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="glass rounded-2xl p-8 lg:p-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              {...register("name")}
              className="w-full px-4 py-4 bg-transparent border-2 border-slate-600 rounded-lg text-slate-200 focus:border-[hsl(var(--portfolio-accent))] focus:outline-none transition-colors peer placeholder-transparent"
              placeholder="Your Name"
            />
            <label className="floating-label absolute left-4 top-4 text-slate-400 pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[hsl(var(--portfolio-accent))] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75">
              Your Name
            </label>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <Input
              {...register("email")}
              type="email"
              className="w-full px-4 py-4 bg-transparent border-2 border-slate-600 rounded-lg text-slate-200 focus:border-[hsl(var(--portfolio-accent))] focus:outline-none transition-colors peer placeholder-transparent"
              placeholder="Your Email"
            />
            <label className="floating-label absolute left-4 top-4 text-slate-400 pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[hsl(var(--portfolio-accent))] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75">
              Your Email
            </label>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="relative">
          <Input
            {...register("subject")}
            className="w-full px-4 py-4 bg-transparent border-2 border-slate-600 rounded-lg text-slate-200 focus:border-[hsl(var(--portfolio-accent))] focus:outline-none transition-colors peer placeholder-transparent"
            placeholder="Subject"
          />
          <label className="floating-label absolute left-4 top-4 text-slate-400 pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[hsl(var(--portfolio-accent))] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75">
            Subject
          </label>
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div className="relative">
          <Textarea
            {...register("message")}
            rows={6}
            className="w-full px-4 py-4 bg-transparent border-2 border-slate-600 rounded-lg text-slate-200 focus:border-[hsl(var(--portfolio-accent))] focus:outline-none transition-colors peer resize-none placeholder-transparent"
            placeholder="Your Message"
          />
          <label className="floating-label absolute left-4 top-4 text-slate-400 pointer-events-none transition-all duration-300 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[hsl(var(--portfolio-accent))] peer-not-placeholder-shown:-translate-y-6 peer-not-placeholder-shown:scale-75">
            Your Message
          </label>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="magnetic-btn relative px-12 py-4 bg-[hsl(var(--portfolio-accent))] text-[hsl(var(--portfolio-bg-primary))] rounded-lg font-bold text-lg hover:opacity-90 transition-all duration-300 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner animate-spin mr-2"></i>
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <i className="fas fa-check mr-2"></i>
                  Message Sent!
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
}
