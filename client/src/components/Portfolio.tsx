import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import ParticleBackground from "./ParticleBackground";
import GeometricShape from "./GeometricShape";
import SkillCard from "./SkillCard";
import ProjectCard from "./ProjectCard";
import ContactForm from "./ContactForm";

const skills = [
  { name: "React", icon: "fab fa-react", color: "text-blue-400" },
  { name: "TypeScript", icon: "fab fa-js", color: "text-blue-600" },
  { name: "Next.js", icon: "fas fa-code", color: "text-slate-100" },
  { name: "Tailwind", icon: "fab fa-css3-alt", color: "text-cyan-400" },
  { name: "Node.js", icon: "fab fa-node-js", color: "text-green-500" },
  { name: "Python", icon: "fab fa-python", color: "text-yellow-400" },
  { name: "PostgreSQL", icon: "fas fa-database", color: "text-blue-300" },
  { name: "MongoDB", icon: "fas fa-leaf", color: "text-green-400" },
  { name: "AWS", icon: "fab fa-aws", color: "text-orange-400" },
  { name: "Docker", icon: "fab fa-docker", color: "text-blue-500" },
  { name: "Git", icon: "fab fa-git-alt", color: "text-red-500" },
  { name: "Figma", icon: "fab fa-figma", color: "text-purple-400" },
];

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with real-time analytics",
    longDescription: "A full-stack e-commerce platform built with Next.js, featuring real-time inventory management, payment processing, and advanced analytics dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Next.js", "TypeScript", "Stripe"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Social Connect",
    description: "Real-time social platform with instant messaging",
    longDescription: "A real-time social media platform featuring instant messaging, file sharing, and advanced user interactions built with React and Socket.io.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Socket.io", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "AI Task Manager",
    description: "Intelligent productivity app with AI-powered insights",
    longDescription: "An intelligent task management system that uses machine learning to optimize productivity and provide personalized recommendations.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Python", "TensorFlow", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[hsl(var(--portfolio-bg-primary))]">
        <motion.div
          className="text-[hsl(var(--portfolio-accent))] text-6xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin">
            <i className="fas fa-code"></i>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      <CustomCursor />
      <ParticleBackground />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="font-poppins font-bold text-xl text-[hsl(var(--portfolio-accent))]"
              whileHover={{ scale: 1.05 }}
            >
              AC
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors magnetic-btn ${
                    activeSection === item
                      ? "text-[hsl(var(--portfolio-accent))]"
                      : "text-slate-300 hover:text-[hsl(var(--portfolio-accent))]"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            <motion.button
              className="md:hidden text-[hsl(var(--portfolio-accent))] magnetic-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-bars text-xl"></i>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center animated-bg overflow-hidden">
        <div className="container mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.p
                className="text-[hsl(var(--portfolio-accent))] font-mono text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hi, my name is
              </motion.p>
              <motion.h1
                className="font-poppins font-bold text-6xl lg:text-7xl text-slate-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Alex Chen
              </motion.h1>
              <motion.h2
                className="font-poppins font-semibold text-4xl lg:text-5xl text-slate-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                I build things for the web.
              </motion.h2>
              <motion.p
                className="text-xl text-slate-300 max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                I'm a passionate full-stack developer specializing in creating exceptional digital experiences with modern technologies and innovative design patterns.
              </motion.p>
              <motion.div
                className="flex space-x-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <motion.button
                  className="magnetic-btn glass px-8 py-4 rounded-lg font-semibold text-[hsl(var(--portfolio-accent))] hover:bg-[hsl(var(--portfolio-accent))] hover:text-[hsl(var(--portfolio-bg-primary))] transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("projects")}
                >
                  View My Work
                </motion.button>
                <motion.button
                  className="magnetic-btn border-2 border-[hsl(var(--portfolio-accent))] px-8 py-4 rounded-lg font-semibold text-[hsl(var(--portfolio-accent))] hover:bg-[hsl(var(--portfolio-accent))] hover:text-[hsl(var(--portfolio-bg-primary))] transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <GeometricShape />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-primary))]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
                alt="Alex Chen - Professional Photo"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto glass p-1"
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-[hsl(var(--portfolio-accent))]">
                About Me
              </h2>
              <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
                <p>
                  My journey into web development started during my computer science studies, where I discovered my passion for creating beautiful, functional digital experiences. What began as curiosity about how websites work has evolved into a deep love for crafting pixel-perfect interfaces and robust backend systems.
                </p>
                <p>
                  I specialize in modern JavaScript ecosystems, with expertise in React, Next.js, and Node.js. My approach combines technical precision with creative design thinking, ensuring every project not only functions flawlessly but also delivers an exceptional user experience.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring the latest web technologies, contributing to open-source projects, or experimenting with 3D graphics and interactive animations. I believe the future of web development lies in immersive, performance-optimized experiences.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-secondary))]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-[hsl(var(--portfolio-accent))] mb-4">
              Skills & Technologies
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable web applications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-primary))]">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-[hsl(var(--portfolio-accent))] mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              A showcase of my recent work, featuring modern web applications with cutting-edge technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-secondary))]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-poppins font-bold text-4xl lg:text-5xl text-[hsl(var(--portfolio-accent))] mb-4">
                What's Next?
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                I'm always interested in new opportunities and exciting projects. Let's create something amazing together!
              </p>
            </motion.div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--portfolio-bg-primary))] py-12 border-t border-slate-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-slate-400">&copy; 2024 Alex Chen. Built with passion and lots of coffee.</p>
            </div>
            <div className="flex space-x-6">
              {[
                { icon: "fab fa-github", href: "#" },
                { icon: "fab fa-linkedin", href: "#" },
                { icon: "fab fa-twitter", href: "#" },
                { icon: "fas fa-envelope", href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="magnetic-btn text-slate-400 hover:text-[hsl(var(--portfolio-accent))] transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={`${social.icon} text-2xl`}></i>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
