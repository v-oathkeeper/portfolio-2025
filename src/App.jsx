import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Terminal,
  Cpu,
  Globe,
  ChevronDown,
  Send,
  Copy,
  Check,
  Trophy,
  BookOpen,
  Database,
  Phone,
  BarChart,
} from "lucide-react";

/**
 * VISHNU PV - NEO-BRUTALIST PORTFOLIO
 * * A single-file, high-performance React portfolio featuring:
 * 1. Custom Canvas Particle Physics Engine (The "Void" Background)
 * 2. 3D Tilt-effect Cards
 * 3. Glitch Typography
 * 4. Responsive, glassmorphic UI
 */

// --- DATA ---
const PROJECTS = [
  {
    title: "EchoChat",
    desc: "Real-time chat app with 200ms latency. Features persistent login, JWT auth, and seamless 1:1/group messaging.",
    tags: ["MERN Stack", "Socket.io", "JWT"],
    repo: "https://github.com/v-oathkeeper/EchoChat",
    live: "https://echochat-5z2z.onrender.com/login",
  },
  {
    title: "NER API Model",
    desc: "Bi-LSTM sequence model with 98.6% accuracy for identifying entities. Decoupled ML backend served via Flask.",
    tags: ["TensorFlow", "BiLSTM", "Flask", "Python"],
    repo: "https://github.com/v-oathkeeper/named-entity-recognition-api",
    live: null,
  },
  {
    title: "Order Execution Engine",
    desc: "Low-latency trading system component designed for high-frequency order matching and execution simulation.",
    tags: ["C++", "System Design", "Low Latency"],
    repo: "https://github.com/v-oathkeeper/order-execution-engine",
    live: null,
  },
  {
    title: "Nestly",
    desc: "Full-stack property listing application. Users can browse, list, and manage property rentals seamlessly.",
    tags: ["Full Stack", "Web", "Database"],
    repo: "https://github.com/v-oathkeeper/Nestly",
    live: "https://nestly-listing.onrender.com/listings",
  },
  {
    title: "Credit Card Fraud Detection",
    desc: "Machine learning model to detect fraudulent transactions using advanced classification algorithms.",
    tags: ["ML", "Python", "Data Science"],
    repo: "https://github.com/v-oathkeeper/Credit-Card-Fraud-Detection",
    live: null,
  },
  {
    title: "Smart Product Pricing",
    desc: "Data-driven tool that suggests optimal product pricing based on market trends and competitor analysis.",
    tags: ["Data Analysis", "Regression", "ML"],
    repo: "https://github.com/v-oathkeeper/smart-product-pricing",
    live: null,
  },
  {
    title: "Axiom Replica",
    desc: "High-fidelity frontend replica of the Axiom interface, focusing on pixel-perfect design and responsiveness.",
    tags: ["React", "Frontend", "UI/UX"],
    repo: "https://github.com/v-oathkeeper/axiom-replica",
    live: "https://axiom-replica-mu.vercel.app/",
  },
  {
    title: "Blog Web App",
    desc: "A comprehensive blogging platform allowing users to create, edit, and publish content dynamically.",
    tags: ["Web Dev", "CRUD", "REST API"],
    repo: "https://github.com/v-oathkeeper/Blog-Web-App",
    live: "https://blog-web-app-z66f.onrender.com/",
  },
  {
    title: "Data Project Analysis",
    desc: "Comprehensive exploratory data analysis (EDA) on large datasets to derive actionable business insights.",
    tags: ["Pandas", "NumPy", "Visualization"],
    repo: "https://github.com/v-oathkeeper/Data_Project_Analysis",
    live: null,
  },
  {
    title: "Inkly Blog Web",
    desc: "Minimalist blogging platform focused on typography and reading experience.",
    tags: ["Frontend", "Design", "Web"],
    repo: "https://github.com/v-oathkeeper/inkly-blog-web",
    live: null,
  },
  {
    title: "Snake Game",
    desc: "Classic Snake game implementation with custom game loop logic and collision detection.",
    tags: ["Game Dev", "Java/C++", "Logic"],
    repo: "https://github.com/v-oathkeeper/snake-game",
    live: null,
  },
  {
    title: "Road Crossing Game",
    desc: "Arcade-style road crossing game testing reflex and object collision handling.",
    tags: ["Game Dev", "Simulation", "Interactive"],
    repo: "https://github.com/v-oathkeeper/road-crossing-game",
    live: null,
  },
];

// --- COMPONENTS ---

// 1. Interactive Particle Background
const VoidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // Configuration
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 150;
    const mouseDistance = 200;

    // Mouse state
    let mouse = { x: null, y: null };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = "rgba(100, 255, 218, 0.5)"; // Cyan/Teal tint
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Boundary bounce
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = forceDirectionX * force * 0.5; // Push strength
            const directionY = forceDirectionY * force * 0.5;
            this.vx -= directionX;
            this.vy -= directionY;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw Connections
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(100, 255, 218, ${
              1 - distance / connectionDistance
            })`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0a0a0a]"
    />
  );
};

// 2. Glitch Text Component
const GlitchText = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-rose-500 opacity-0 group-hover:opacity-70 animate-pulse -translate-x-[2px] translate-y-[1px]">
        {text}
      </span>
    </div>
  );
};

// 3. 3D Tilt Card for Projects
const ProjectCard = ({ title, desc, tags, repo, live }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Subtle rotation
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        className="relative h-full p-8 rounded-xl bg-[#111] border border-white/10 hover:border-cyan-400/50 group overflow-hidden transition-all duration-300 shadow-2xl flex flex-col justify-between"
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />

        <div>
          <div className="flex justify-between items-start mb-4">
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-cyan-900/20 text-cyan-400 group-hover:scale-110 transition-transform hover:bg-cyan-900/30"
            >
              <Github size={20} />
            </a>
            <div className="flex gap-3">
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs font-mono text-cyan-300 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Navigation Bar
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Stats", href: "#stats" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
          : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          className="text-xl font-bold font-mono text-white tracking-tighter border border-white px-2 py-1 hover:bg-white hover:text-black transition-all duration-300"
        >
          V/PV
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono text-xs text-gray-400 hover:text-cyan-400 transition-colors relative group"
            >
              <span className="text-cyan-400 mr-1">0{i + 1}.</span>
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1tZi-7PPDWA0mqHRAPj11OXnpIkfcMAJI/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-mono border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/10 transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            Resume
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Code />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-cyan-400 font-mono"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1tZi-7PPDWA0mqHRAPj11OXnpIkfcMAJI/view?usp=sharing"
            className="text-cyan-400 font-mono"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vishnuvichu8150@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-gray-300 selection:bg-cyan-400/30 selection:text-cyan-200 font-sans overflow-x-hidden">
      <VoidBackground />
      <Navbar />

      {/* Main Container */}
      <main className="container mx-auto px-6 xl:px-32 pt-32 pb-20">
        {/* HERO SECTION */}
        <section className="min-h-[85vh] flex flex-col justify-center items-start max-w-4xl">
          <span className="font-mono text-cyan-400 mb-5 text-lg animate-fade-in-up">
            Hi, my name is
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight animate-fade-in-up delay-100">
            <GlitchText text="Vishnu PV." />
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-400 mb-8 animate-fade-in-up delay-200">
            I build intelligent systems.
          </h2>
          <p className="max-w-xl text-lg text-gray-500 leading-relaxed mb-12 animate-fade-in-up delay-300">
            I'm a software engineer and competitive programmer at{" "}
            <span className="text-cyan-400">IIIT Allahabad</span>. I specialize
            in building scalable web applications, real-time systems, and
            machine learning models.
          </p>
          <div className="flex gap-4 animate-fade-in-up delay-500">
            <a
              href="#work"
              className="group relative px-8 py-4 bg-transparent border border-cyan-400 text-cyan-400 font-mono rounded hover:bg-cyan-400/10 transition-all"
            >
              Check out my work
            </a>
            <a
              href="https://github.com/v-oathkeeper"
              target="_blank"
              rel="noreferrer"
              className="group relative px-6 py-4 bg-white/5 border border-white/10 text-white font-mono rounded hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Github size={20} />
              v-oathkeeper
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-cyan-400 text-xl">01.</span>
            <h2 className="text-3xl font-bold text-white whitespace-nowrap">
              About Me
            </h2>
            <div className="h-[1px] w-full bg-white/20"></div>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3 text-lg text-gray-400 leading-relaxed space-y-4">
              <p>
                Hello! I'm Vishnu, currently pursuing my B.Tech in Information
                Technology at{" "}
                <span className="text-cyan-400">IIIT Allahabad</span> (2026).
              </p>
              <p>
                I enjoy solving complex algorithmic problems and building robust
                applications. From creating real-time chat apps with{" "}
                <span className="text-cyan-400">MERN stack</span> to deploying{" "}
                <span className="text-cyan-400">Bi-LSTM models</span> for entity
                recognition, I love exploring the intersection of Software
                Engineering and AI.
              </p>
              <p>
                I am also a{" "}
                <span className="text-cyan-400">LeetCode Knight</span> (Max
                Rating: 1864) and actively participate in competitive
                programming.
              </p>

              <div className="mt-8">
                <h3 className="text-white font-bold mb-4 font-mono">
                  Tech Stack
                </h3>
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                  {[
                    "C/C++",
                    "Python",
                    "Java",
                    "JavaScript",
                    "React.js",
                    "Node/Express",
                    "MongoDB",
                    "SQL",
                    "TensorFlow",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="text-cyan-400">▹</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-2 relative group">
              <div className="absolute top-4 left-4 w-full h-full border-2 border-cyan-400 rounded-lg -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
              <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative flex flex-col items-center justify-center p-6 border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900">
                <Terminal size={64} className="text-cyan-400 mb-4" />
                <h3 className="text-white font-bold text-xl">Vishnu PV</h3>
                <p className="text-cyan-400 font-mono text-sm mt-2">
                  v-oathkeeper
                </p>
                <div className="w-full h-[1px] bg-white/10 my-6"></div>
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location</span>{" "}
                    <span className="text-gray-300">India</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Education</span>{" "}
                    <span className="text-gray-300">IIIT Allahabad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section id="stats" className="py-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: "LeetCode Rating",
                val: "1864",
                sub: "Knight Badge",
                icon: <Trophy size={24} />,
                link: "https://leetcode.com/u/Oath-keeper/",
              },
              {
                label: "CodeChef Rating",
                val: "1687",
                sub: "3-Star",
                icon: <Globe size={24} />,
                link: "https://www.codechef.com/users/oath_keeper",
              },
              {
                label: "Codeforces",
                val: "517",
                sub: "Rank (Div 4)",
                icon: <BarChart size={24} />,
                link: "https://codeforces.com/profile/0athkeeper",
              },
              {
                label: "JEE Mains Rank",
                val: "8013",
                sub: "AIR (Top 1%)",
                icon: <BookOpen size={24} />,
                link: null,
              },
            ].map((stat, i) => (
              <a
                key={i}
                href={stat.link || "#"}
                target={stat.link ? "_blank" : "_self"}
                rel="noreferrer"
                className={`p-6 bg-[#111] border border-white/10 rounded-lg transition-all group ${
                  stat.link
                    ? "hover:border-cyan-400/50 cursor-pointer"
                    : "cursor-default"
                }`}
              >
                <div className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h4 className="text-3xl font-bold text-white mb-1">
                  {stat.val}
                </h4>
                <p className="text-gray-400 font-mono text-xs">{stat.label}</p>
                <p className="text-cyan-600 text-[10px] mt-1 uppercase tracking-wider">
                  {stat.sub}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* WORK SECTION */}
        <section id="work" className="py-24">
          <div className="flex items-center gap-4 mb-16 max-w-4xl mx-auto">
            <span className="font-mono text-cyan-400 text-xl">02.</span>
            <h2 className="text-3xl font-bold text-white whitespace-nowrap">
              Projects
            </h2>
            <div className="h-[1px] w-full bg-white/20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 max-w-2xl mx-auto text-center">
          <span className="font-mono text-cyan-400 text-lg mb-4 block">
            03. What's Next?
          </span>
          <h2 className="text-5xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-400 mb-12">
            I am currently looking for internship opportunities. Whether you
            have a question or just want to say hi, my inbox is always open!
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <a
                href="mailto:vishnuvichu8150@gmail.com"
                className="px-8 py-4 border border-cyan-400 text-cyan-400 rounded font-mono hover:bg-cyan-400/10 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Say Hello
              </a>
              <a
                href="tel:9539243593"
                className="px-6 py-4 border border-white/20 text-gray-300 rounded font-mono hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Phone size={18} />
                +91 9539243593
              </a>
            </div>

            {/* Interactive Email Copy */}
            <div
              onClick={handleCopyEmail}
              className="cursor-pointer flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all group"
            >
              <Mail
                size={16}
                className="text-gray-400 group-hover:text-cyan-400"
              />
              <span className="font-mono text-sm text-gray-400 group-hover:text-white">
                vishnuvichu8150@gmail.com
              </span>
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy
                  size={16}
                  className="text-gray-600 group-hover:text-white"
                />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-500 text-sm font-mono bg-[#050505]">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://github.com/v-oathkeeper"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 hover:-translate-y-1 transition-all"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/vishnu-p-v-60443b2a8/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 hover:-translate-y-1 transition-all"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:vishnuvichu8150@gmail.com"
            className="hover:text-cyan-400 hover:-translate-y-1 transition-all"
          >
            <Mail size={20} />
          </a>
        </div>
        <p className="hover:text-cyan-400 transition-colors cursor-default">
          Built by Vishnu PV (v-oathkeeper)
        </p>
      </footer>

      {/* Floating Socials (Desktop) */}
      <div className="hidden xl:flex fixed bottom-0 left-10 flex-col gap-6 items-center after:content-[''] after:w-[1px] after:h-24 after:bg-gray-500 after:mt-6">
        <a
          href="https://github.com/v-oathkeeper"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-cyan-400 hover:-translate-y-1 transition-all"
        >
          <Github />
        </a>
        <a
          href="https://www.linkedin.com/in/vishnu-p-v-60443b2a8/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-cyan-400 hover:-translate-y-1 transition-all"
        >
          <Linkedin />
        </a>
        <a
          href="https://leetcode.com/u/Oath-keeper/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-cyan-400 hover:-translate-y-1 transition-all"
        >
          <Code />
        </a>
        <a
          href="https://www.codechef.com/users/oath_keeper"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-cyan-400 hover:-translate-y-1 transition-all"
        >
          <Globe />
        </a>
      </div>

      {/* Floating Email (Desktop) */}
      <div className="hidden xl:flex fixed bottom-0 right-12 flex-col gap-6 items-center after:content-[''] after:w-[1px] after:h-24 after:bg-gray-500 after:mt-6">
        <a
          href="mailto:vishnuvichu8150@gmail.com"
          className="text-gray-400 hover:text-cyan-400 font-mono text-sm tracking-widest hover:-translate-y-1 transition-all vertical-rl mb-4"
        >
          vishnuvichu8150@gmail.com
        </a>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .vertical-rl {
          writing-mode: vertical-rl;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default App;
