import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import ParticleBackground from "./ParticleBackground";
import GeometricShape from "./GeometricShape";
import SkillCard from "./SkillCard";
import ProjectCard from "./ProjectCard";
import ContactForm from "./ContactForm";
import SpecialtyCard from "./SpecialtyCard";
import HexagonalSkill from "./HexagonalSkill";

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
    const timer = setTimeout(() => setIsLoaded(true), 4000);
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
      <div className="fixed inset-0 flex items-center justify-center bg-[hsl(var(--portfolio-bg-primary))] overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[hsl(var(--portfolio-accent))] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -100],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Main loading content */}
        <div className="relative z-10 text-center">
          {/* Rotating geometric loader */}
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          >
            <div className="relative w-24 h-24 mx-auto">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 border-4 border-[hsl(var(--portfolio-accent))]/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle ring */}
              <motion.div
                className="absolute inset-2 border-4 border-purple-500/50 rounded-full border-t-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner core */}
              <motion.div
                className="absolute inset-4 bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Center icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-[hsl(var(--portfolio-bg-primary))] text-xl"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <i className="fas fa-code"></i>
              </motion.div>
            </div>
          </motion.div>

          {/* Loading text with typewriter effect */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h2
              className="font-poppins font-bold text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Yash Mahajan
              </span>
            </motion.h2>
            
            <motion.p
              className="text-slate-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Crafting Digital Experiences
            </motion.p>
            
            {/* Loading progress bar */}
            <motion.div
              className="w-64 h-1 bg-slate-700 rounded-full mx-auto mt-6 overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.3, duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Loading percentage */}
            <motion.div
              className="text-sm text-slate-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Loading Portfolio...
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Floating tech icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { icon: "fab fa-react", delay: 0.5, x: -100, y: -50 },
              { icon: "fab fa-js", delay: 0.7, x: 100, y: -30 },
              { icon: "fab fa-node-js", delay: 0.9, x: -80, y: 80 },
              { icon: "fab fa-python", delay: 1.1, x: 120, y: 60 },
            ].map((item, i) => (
              <motion.i
                key={i}
                className={`${item.icon} absolute text-2xl text-[hsl(var(--portfolio-accent))]/20`}
                style={{ left: "50%", top: "50%" }}
                initial={{ 
                  opacity: 0, 
                  x: 0, 
                  y: 0,
                  scale: 0 
                }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                  x: item.x,
                  y: item.y,
                  scale: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{ 
                  delay: item.delay,
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
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
              YM
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
                className="font-poppins font-bold text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-slate-100">Hi, I'm </span>
                <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  Yash Mahajan
                </span>
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
                A dynamic and versatile tech enthusiast who turns dreams into reality.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <motion.button
                  className="magnetic-btn bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 px-6 py-2.5 rounded-lg font-medium text-[hsl(var(--portfolio-bg-primary))] hover:opacity-90 transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("projects")}
                >
                  <i className="fas fa-eye mr-2"></i>
                  View Work
                </motion.button>
                <motion.button
                  className="magnetic-btn border border-[hsl(var(--portfolio-accent))] px-6 py-2.5 rounded-lg font-medium text-[hsl(var(--portfolio-accent))] hover:bg-[hsl(var(--portfolio-accent))] hover:text-[hsl(var(--portfolio-bg-primary))] transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-download mr-2"></i>
                  Download CV
                </motion.button>
                <motion.button
                  className="magnetic-btn glass px-6 py-2.5 rounded-lg font-medium text-purple-400 hover:bg-purple-400 hover:text-[hsl(var(--portfolio-bg-primary))] transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://leetcode.com/yashmahajan', '_blank')}
                >
                  <i className="fas fa-code mr-2"></i>
                  LeetCode
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

      {/* Introduction/Overview Section */}
      <section id="about" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-primary))] relative overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 border-2 border-[hsl(var(--portfolio-accent))] rounded-lg opacity-20"
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-12 h-12 bg-[hsl(var(--portfolio-accent))] rounded-full opacity-10"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-16">
            {/* Section Header */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-[hsl(var(--portfolio-accent))] font-mono text-lg tracking-wider uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Introduction
              </motion.p>
              <motion.h2 
                className="font-poppins font-bold text-5xl lg:text-6xl text-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Overview.
              </motion.h2>
              <motion.p
                className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                I'm a skilled software developer with experience in Java, C, C++, Python and Javascript
                and expertise in frameworks like Django, React.js, Node.js, and Next.js . I'm a quick learner
                and collaborate closely with clients to create efficient, scalable, and user-friendly
                solutions that solve real-world problems. Let's work together to bring your ideas to life!
              </motion.p>
              
              {/* Social Links */}
              <motion.div
                className="flex justify-center gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                {[
                  { name: "GitHub", icon: "fab fa-github", url: "#" },
                  { name: "LinkedIn", icon: "fab fa-linkedin", url: "#" },
                  { name: "LeetCode", icon: "fas fa-code", url: "#" },
                  { name: "See CV", icon: "fas fa-file-alt", url: "#" }
                ].map((link, index) => (
                  <motion.button
                    key={link.name}
                    className="glass px-6 py-3 rounded-lg font-medium text-slate-300 hover:text-[hsl(var(--portfolio-accent))] hover:border-[hsl(var(--portfolio-accent))] transition-all duration-300 magnetic-btn border border-slate-600"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <i className={`${link.icon} mr-2`}></i>
                    {link.name}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Specialty Cards Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ perspective: '1000px' }}
            >
              <SpecialtyCard
                title="Full Stack Developer"
                icon="&#x1F4BB;"
                gradient="bg-gradient-to-br from-blue-500 to-purple-600"
                index={0}
              />
              <SpecialtyCard
                title="Android Developer"
                icon="&#x1F4F1;"
                gradient="bg-gradient-to-br from-green-500 to-teal-600"
                index={1}
              />
              <SpecialtyCard
                title="Problem Solver"
                icon="&#x1F9E9;"
                gradient="bg-gradient-to-br from-purple-500 to-pink-600"
                index={2}
              />
              <SpecialtyCard
                title="Machine Learning Enthusiast"
                icon="&#x1F916;"
                gradient="bg-gradient-to-br from-orange-500 to-red-600"
                index={3}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-secondary))] relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[hsl(var(--portfolio-accent))] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="font-poppins font-bold text-4xl lg:text-5xl text-[hsl(var(--portfolio-accent))] mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              Skills & Technologies
            </motion.h2>
            <motion.p 
              className="text-xl text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              A comprehensive toolkit for building modern, scalable web applications
            </motion.p>
            
            {/* Animated divider */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 mx-auto mt-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Hexagonal Skills Grid */}
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            {/* First row - 7 hexagons */}
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              {skills.slice(0, 7).map((skill, index) => (
                <HexagonalSkill
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  index={index}
                />
              ))}
            </div>
            {/* Second row - 5 hexagons (offset) */}
            <div className="flex flex-wrap justify-center gap-4 -mt-4">
              {skills.slice(7, 12).map((skill, index) => (
                <HexagonalSkill
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  index={index + 7}
                />
              ))}
            </div>
          </motion.div>

          {/* Interactive skill level visualization */}
          <motion.div
            className="mt-20 glass rounded-2xl p-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            viewport={{ once: true }}
          >
            <h3 className="font-poppins font-bold text-2xl text-[hsl(var(--portfolio-accent))] mb-8 text-center">
              Expertise Level
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: "Frontend", level: 95, color: "from-blue-500 to-cyan-400" },
                { category: "Backend", level: 88, color: "from-green-500 to-emerald-400" },
                { category: "DevOps", level: 75, color: "from-purple-500 to-pink-400" },
                { category: "Design", level: 82, color: "from-orange-500 to-red-400" }
              ].map((item, index) => (
                <motion.div
                  key={item.category}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-slate-200 mb-3">{item.category}</h4>
                  <div className="relative w-20 h-20 mx-auto">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-700"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 251.2" }}
                        whileInView={{ strokeDasharray: `${item.level * 2.512} 251.2` }}
                        transition={{ delay: 1.9 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#64ffda" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 2.2 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm font-bold text-[hsl(var(--portfolio-accent))]">
                        {item.level}%
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-primary))] relative overflow-hidden">
        {/* Dynamic background grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating project icons */}
        <motion.div
          className="absolute top-20 right-20 w-8 h-8 text-[hsl(var(--portfolio-accent))] opacity-30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <i className="fas fa-code text-2xl"></i>
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-16 w-6 h-6 text-purple-400 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <i className="fas fa-laptop-code text-xl"></i>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="font-poppins font-bold text-4xl lg:text-5xl text-[hsl(var(--portfolio-accent))] mb-6"
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              className="text-xl text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              A showcase of my recent work, featuring modern web applications with cutting-edge technologies
            </motion.p>

            {/* Animated progress bar */}
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-[hsl(var(--portfolio-accent))] via-purple-500 to-[hsl(var(--portfolio-accent))] mx-auto mt-8 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Enhanced projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 80, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="glass rounded-2xl p-8 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-poppins font-bold text-2xl text-slate-200 mb-4">
                Interested in collaborating?
              </h3>
              <p className="text-slate-400 mb-6">
                I'm always excited to work on innovative projects and bring creative ideas to life.
              </p>
              <motion.button
                className="magnetic-btn bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 text-[hsl(var(--portfolio-bg-primary))] px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--portfolio-accent))]/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
              >
                <span className="mr-2">Let's Talk</span>
                <i className="fas fa-arrow-right"></i>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20 bg-[hsl(var(--portfolio-bg-secondary))] relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-32 h-32 border border-[hsl(var(--portfolio-accent))] rounded-full opacity-10"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-16 w-20 h-20 bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 rounded-lg opacity-5"
          animate={{
            y: [0, -30, 0],
            rotateZ: [0, 45, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Contact icons floating */}
        <motion.div
          className="absolute top-32 right-1/4 text-[hsl(var(--portfolio-accent))] opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <i className="fas fa-envelope text-3xl"></i>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="font-poppins font-bold text-4xl lg:text-6xl text-[hsl(var(--portfolio-accent))] mb-6"
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 150 }}
                viewport={{ once: true }}
              >
                What's Next?
              </motion.h2>
              <motion.p 
                className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                I'm always interested in new opportunities and exciting projects. Let's create something amazing together!
              </motion.p>

              {/* Animated contact methods */}
              <motion.div
                className="flex justify-center space-x-8 mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                {[
                  { icon: "fas fa-envelope", label: "Email", href: "mailto:alex@example.com" },
                  { icon: "fab fa-linkedin", label: "LinkedIn", href: "#" },
                  { icon: "fab fa-github", label: "GitHub", href: "#" },
                  { icon: "fab fa-twitter", label: "Twitter", href: "#" }
                ].map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    className="glass p-4 rounded-xl text-center group magnetic-btn"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      boxShadow: "0 10px 25px rgba(100, 255, 218, 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.i
                      className={`${contact.icon} text-2xl text-[hsl(var(--portfolio-accent))] mb-2 block`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {contact.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ContactForm />
              </motion.div>

              {/* Contact info and additional details */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Quick contact info */}
                <motion.div
                  className="glass rounded-2xl p-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-poppins font-bold text-2xl text-[hsl(var(--portfolio-accent))] mb-6">
                    Let's Connect
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: "fas fa-map-marker-alt", text: "San Francisco, CA" },
                      { icon: "fas fa-envelope", text: "alex.chen@example.com" },
                      { icon: "fas fa-phone", text: "+1 (555) 123-4567" },
                      { icon: "fas fa-clock", text: "Available Mon-Fri, 9AM-6PM PST" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-12 h-12 bg-[hsl(var(--portfolio-accent))]/10 rounded-lg flex items-center justify-center">
                          <i className={`${item.icon} text-[hsl(var(--portfolio-accent))]`}></i>
                        </div>
                        <span className="text-slate-300">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Response time info */}
                <motion.div
                  className="glass rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <i className="fas fa-rocket text-[hsl(var(--portfolio-bg-primary))] text-xl"></i>
                  </motion.div>
                  <h4 className="font-semibold text-slate-200 mb-2">Quick Response</h4>
                  <p className="text-slate-400 text-sm">
                    I typically respond to messages within 24 hours. Looking forward to hearing from you!
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--portfolio-bg-primary))] py-12 border-t border-slate-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-slate-400">&copy; 2024 Yash Mahajan. Built with passion and lots of coffee.</p>
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
