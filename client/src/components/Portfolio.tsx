import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./CustomCursor";
import ParticleBackground from "./ParticleBackground";
import GeometricShape from "./GeometricShape";
import SkillCard from "./SkillCard";
import ProjectCard from "./ProjectCard";
import ContactForm from "./ContactForm";
import SpecialtyCard from "./SpecialtyCard";
import HexagonalSkill from "./HexagonalSkill";
import ModernProjectCard from "./ModernProjectCard";
import DiagonalBendCard from "./DiagonalBendCard";
import ModernContactForm from "./ModernContactForm";
import ExperienceCard from "./ExperienceCard";
import workspaceImage from "@assets/workSpace.jpg";
import img1 from "@assets/img1.png";
import img2 from "@assets/img2.png";
import img3 from "@assets/img3.png";
import img4 from "@assets/img4.png";



import { getDatabase, ref ,onValue } from "firebase/database";
import { app } from '../Firebase';

const database = getDatabase(app);



export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);




    useEffect(() => {
        console.log("Setting up real-time listener...");
        const portfolioRef = ref(database, 'portfolio');

        // onValue returns an unsubscribe function that we can use for cleanup
        const unsubscribe = onValue(portfolioRef, (snapshot) => {
            if (snapshot.exists()) {
                console.log("Real-time data received!");
                const portfolioData = snapshot.val();

                // --- UPDATE STATE WITH THE LATEST DATA ---
                const skills_f = portfolioData.skills || [];
                const experiences_f = portfolioData.experiences || [];
                const projects_f = portfolioData.projects || [];

                setProjects(projects_f);
                setSkills(skills_f);
                setExperiences(experiences_f);

                console.log("State updated with the latest data from Firebase.");

            } else {
                console.log("No data available at 'portfolio' path.");
                // Optionally, clear the state if the data is deleted from the database
                setProjects([]);
                setSkills([]);
                setExperiences([]);
            }
        }, (error) => {
            // This optional second callback handles errors
            console.error("Error listening to Firebase data:", error);
        });

        // --- CLEANUP FUNCTION ---
        // This is crucial. React will call this function when the component unmounts.
        // It unsubscribes from the listener to prevent memory leaks.
        return () => {
            console.log("Unsubscribing from real-time listener.");
            unsubscribe();
        };

    }, []); 


  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 4000);
    return () => clearTimeout(timer);

  }, []);

  // Alternating animation cycle
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setShowWorkspace(prev => !prev);
    }, 4000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, [isLoaded]);

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
                Adesh Bhore
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
      {/*       <CustomCursor /> */}
      <ParticleBackground />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass bg-portfolio-primary w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}

      >
        <div className="container px-9 py-4 bg-portfolio-primary w-full max-w-full">
          <div className="flex justify-between items-center ">
            <motion.div
              className="font-poppins font-bold text-2xl text-white"
              whileHover={{ scale: 1.05 }}
            >
              Adesh Bhore
            </motion.div>
            <div className="hidden md:flex space-x-8 ml-10">
              {["home", "about", "contact"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors magnetic-btn font-work text-xl ${activeSection === item
                    ? "text-grey-500"
                    : "text-slate-300 hover:text-white"
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
      <section id="home" className="relative min-h-screen flex items-center bg-[hsl(var(--portfolio-bg-primary))] justify-center overflow-hidden">
        <div className="container mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >

              <motion.div
                className="flex items-start gap-6 -ml-9" // negative margin to push left
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {/* Vertical stick with fading end and circle */}
                <div className="relative w-1.5 h-40">
                  {/* Stick */}
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/90 via-purple-500/50 to-purple-500/0 rounded-full" />

                  {/* Small circle at top */}
                  <div className="absolute -left-1.5 top-0 w-3 h-3 bg-purple-500 rounded-full shadow-lg" />
                </div>

                {/* Name heading */}
                <h1 className="font-poppins font-bold text-6xl lg:text-7xl leading-tight">
                  <span className="text-slate-100">Hi, I'm </span>
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                    Adesh Bhore
                  </span>
                </h1>
              </motion.div>


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
                A tech-savvy trailblazer shaping the future, one project at a time.
              </motion.p>
              {/* Mouse Scroll Animation */}
              <motion.div
                className="flex justify-center pt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  className="relative cursor-pointer group"
                  onClick={() => scrollToSection("about")}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Mouse outline */}
                  <div className="w-10 h-16 border-4 border-grey-800 rounded-full relative">
                    {/* Scroll wheel */}
                    <motion.div
                      className="w-1 h-2 bg-[hsl(var(--portfolio-accent))] rounded-full mx-auto mt-2"
                      animate={{
                        y: [0, 8, 0],
                        opacity: [1, 0.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  {/* Scroll text */}
                  <motion.p
                    className="text-xs text-slate-400 mt-2 text-center font-mono tracking-wider"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    SCROLL
                  </motion.p>

                  {/* Floating arrow */}
                  <motion.div
                    className="absolute -bottom-6 left-3 transform -translate-x-1/2"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <i className="fas fa-chevron-down text-grey-800 text-xs"></i>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end w-100 h-100"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative w-[25rem] h-[25rem] lg:w-[30rem] lg:h-[30rem]">
                {/* MODIFICATION: Wrap the alternating components in AnimatePresence */}
                <AnimatePresence mode="wait">
                  {!showWorkspace ? (
                    <motion.div
                      key="shape" // MODIFICATION: Add a unique key
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 360 }}
                      exit={{ opacity: 0, scale: 0.5, rotateY: -360 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <GeometricShape />
                    </motion.div>
                  ) : (
                    <motion.img
                      key="workspace" // MODIFICATION: Add a unique key
                      src={workspaceImage}
                      alt="Developer workspace with code editor"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
                      // MODIFICATION: Use variants for cleaner animation definitions
                      variants={{
                        hidden: { opacity: 0, y: -100, rotateX: -30 }, // Enters from top
                        visible: { opacity: 1, y: 0, rotateX: 0 },   // Lands in the center
                        exit: { opacity: 0, y: 100, rotateX: 30 },     // Exits to the bottom
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: 'brightness(0.9) contrast(1.1) saturate(1.2)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(100, 255, 218, 0.1)',
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
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
              className="text-center mb-25 flex flex-col items-start justify-center"
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
                className="text-xl ml-0 mt-4 text-start text-slate-300 mt-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
               I'm a proficient software developer with hands-on experience in Java, C, C++, Python, and JavaScript, and a strong command of frameworks like Django, React.js, Node.js and Flutter Dev. Known for my ability to quickly adapt and learn, I thrive in collaborative environments where I work closely with clients to build high-performing, scalable, and intuitive solutions that address real-world challenges. Let’s turn your vision into reality—together!              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex justify-center gap-6 pt-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                {[
                  { name: "GitHub", icon: "fab fa-github", url: "https://github.com/adesh-bhore" },
                  { name: "LinkedIn", icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/adesh-bhore-395a40341/" },
                  { name: "LeetCode", icon: "fas fa-code", url: "https://leetcode.com/u/adesh-bhore-01/" },
                  { name: "See CV", icon: "fas fa-file-alt", url: "/Adesh_Bhore_VIT.pdf" }
                ].map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank" 
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
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Specialty Cards Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 py-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >


              <SpecialtyCard
                title="Full Stack Developer"
                icon={img1}
                gradient="bg-gradient-to-br from-blue-500 to-purple-600"
                index={0}
              />
              <SpecialtyCard
                title="Flutter Developer"
                icon={img2}
                gradient="bg-gradient-to-br from-green-500 to-teal-600"
                index={1}
              />
              <SpecialtyCard
                title="Problem Solver"
                icon={img3}
                gradient="bg-gradient-to-br from-purple-500 to-pink-600"
                index={2}
              />
              <SpecialtyCard
                title="AI Enthusiast"
                icon={img4}
                gradient="bg-gradient-to-br from-orange-500 to-red-600"
                index={3}
              />

            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-50vh flex items-center py-20 bg-[hsl(var(--portfolio-bg-primary))] relative overflow-hidden">
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

            {/* Animated divider */}
            <motion.div
              className=""
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Hexagonal Skills Grid */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            {/* First row - 7 hexagons */}
            <div className="flex flex-wrap justify-center gap-6 mb-4">
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


        </div>
      </section>



      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-20 bg-[hsl(var(--portfolio-bg-primary))] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 ">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20 flex flex-col items-start justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-[hsl(var(--portfolio-accent))] font-mono text-lg tracking-wider uppercase">
              What I've Done So Far
            </p>
            <h2 className="font-poppins font-bold text-5xl lg:text-6xl text-slate-100">
              Work Experience.
            </h2>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative flex flex-col items-center space-y-12">
            {/* The actual timeline content */}
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                alignment={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
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
            className="text-center mb-20 flex flex-col items-start justify-center"
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
              My Work
            </motion.p>
            <motion.h2
              className="font-poppins font-bold text-5xl lg:text-6xl text-slate-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Projects.
            </motion.h2>
            <motion.p
              className="text-xl ml-0 text-start text-slate-300 mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it.
            </motion.p>

            {/* Animated progress bar */}
            <motion.div
              className=""
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Diagonal Bend Projects Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <DiagonalBendCard key={project.title} project={project} index={index} />
            ))}
          </div>


        </div>
      </section>



      <ModernContactForm />

      {/* Footer */}
      <footer className="bg-[hsl(var(--portfolio-bg-primary))] py-12 border-t border-slate-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-slate-400">&copy; 2025 Adesh Bhore. Built with passion and lots of coffee.</p>
            </div>
            <div className="flex space-x-6">
              {[
                { icon: "fab fa-github", href: "https://github.com/adesh-bhore" },
                { icon: "fab fa-linkedin", href: "https://www.linkedin.com/in/adesh-bhore-395a40341/" },
                { icon: "fab fa-twitter", href: "#" },
                { icon: "fas fa-envelope", href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  className="magnetic-btn text-slate-400 hover:text-white transition-colors"
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
