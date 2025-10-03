import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Motion presets (scroll-in) ---
const easing = [0.22, 1, 0.36, 1];
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
};
const sectionVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// Reusable wrapper for reveal-on-scroll
const Reveal = ({ children, delay = 0, y = 16, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easing, delay },
      },
    }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);

import {
  Github,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  Download,
  ExternalLink,
  Code2,
  Database,
  Globe,
  Layers,
  School,
  Briefcase,
  Filter,
} from "lucide-react";

// --- Helpers ---
const Section = ({ id, title, subtitle, children }) => (
  <motion.section
    id={id}
    className="scroll-mt-24 py-12 md:py-16"
    variants={sectionVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-6 md:mb-10">
        <motion.h2
          variants={fadeIn}
          className="text-2xl md:text-3xl font-extrabold tracking-tight"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            variants={fadeIn}
            className="text-sm md:text-base text-muted-foreground mt-1"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      <motion.div variants={fadeIn}>{children}</motion.div>
    </div>
  </motion.section>
);

const Chip = ({ children, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm border transition hover:translate-y-px active:translate-y-0.5 ${
      active
        ? "bg-gradient-to-r from-[#ff7b00] to-[#ff4500] text-white border-transparent shadow"
        : "bg-white/50 dark:bg-black/30 backdrop-blur border-border"
    }`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm p-5 md:p-6 transition hover:shadow-lg hover:-translate-y-[2px] ${className}`}
  >
    {children}
  </div>
);

const IconWrap = ({ children }) => (
  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#ff7b00]/15 to-[#ff4500]/15 flex items-center justify-center">
    {children}
  </div>
);

// Fancy tilt wrapper
const TiltCard = ({ children, max = 8, className = "" }) => {
  const [style, setStyle] = useState({});
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * 2 * max;
    const ry = (0.5 - px) * 2 * max;
    setStyle({ transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)` });
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setStyle({ transform: 'perspective(800px) rotateX(0) rotateY(0)' })}
      className={`transition-transform duration-150 will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

// Tiny toast for copy notifications
const Toast = ({ show, children }) => (
  <div className={`fixed bottom-6 right-6 z-[70] px-4 py-2 rounded-xl shadow-lg text-white bg-black/80 backdrop-blur transition-all ${show ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'}`}>
    {children}
  </div>
);

// --- Data ---
const SKILLS = {
  "Programming Languages": [
    "PHP",
    "JavaScript",
    "HTML",
    "CSS",
    "Python",
    "C++",
    "GDScript",
    "SQL",
  ],
  Frameworks: [
    "Bootstrap",
    "React",
    "Node.js",
    "Django",
    "Flutter",
    "PyQt",
    "Dialogic (Godot)",
  ],
  Tools: [
    "VS Code",
    "Laragon",
    "MySQL",
    "Figma",
    "Postman",
    "Android Studio",
    "Git",
    "GitHub",
  ],
  "Soft Skills": [
    "Team Collaboration",
    "Communication",
    "Quick Problem-Solving",
  ],
};

const PROJECTS = [
  {
    title: "Restaurant Management System (Senior Project)",
    period: "Jul 2024 – Sep 2025",
    tags: ["PHP", "MySQL", "Bootstrap", "Fullstack"],
    description:
      "Developed an end-to-end system for a shabu restaurant: order flow, inventory, roles, dashboards. Led planning, designed database schema, and implemented core modules.",
    links: [
      // Add your GitHub repo or demo links here
    ],
  },
  {
    title: "Typing Game (React)",
    period: "2024",
    tags: ["React", "Vite", "Frontend"],
    description:
      "A small React app game for practicing typing speed and accuracy. Focus on components, state, effects, and deploy pipeline.",
    links: [
      { label: "GitHub", href: "https://github.com/stapanawat/demo-typing-game" },
    ],
  },
];

const CAREER = [
  { label: "Fullstack Developer", icon: <Layers className="h-5 w-5" /> },
  { label: "Web Developer", icon: <Globe className="h-5 w-5" /> },
  { label: "Backend Developer", icon: <Database className="h-5 w-5" /> },
  { label: "Frontend Developer", icon: <Code2 className="h-5 w-5" /> },
  { label: "Software Tester", icon: <Briefcase className="h-5 w-5" /> },
];

const COURSES = [
  "Computer Programming for Business",
  "Database System Concepts",
  "Web Design & Development",
  "Web & Mobile Programming",
  "Visual Programming",
  "OOP (Object‑Oriented Programming)",
  "UX/UI Design",
];

// --- Main Component ---
export default function App() {
  const [dark, setDark] = useState(true);
  const [activeTag, setActiveTag] = useState("All");
  const [progress, setProgress] = useState(0);          // scroll progress 0..1
  const [current, setCurrent] = useState("home");       // scroll-spy active section
  const [query, setQuery] = useState("");               // project search
  const [toast, setToast] = useState("");               // small notifications

  const copyToClipboard = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setToast("Copied!");
        setTimeout(() => setToast(""), 1200);
      });
    }
  };

  useEffect(() => {
    // toggle dark mode by class on html
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  // scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const st = document.documentElement.scrollTop || document.body.scrollTop;
      const sh = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;
      setProgress(sh ? st / sh : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scroll spy for active section & keyboard shortcuts
  useEffect(() => {
    const ids = ['home', 'about', 'skills', 'projects', 'education', 'interests', 'contact'];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) setCurrent(en.target.id);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.1 });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onKey = (e) => {
      const k = e.key?.toLowerCase();
      if (k === 'd') setDark((d) => !d);
      if (k === 'g') window.open('https://github.com/stapanawat', '_blank');
    };
    window.addEventListener('keydown', onKey);
    return () => { io.disconnect(); window.removeEventListener('keydown', onKey); };
  }, []);

  const allTags = useMemo(() => {
    const t = new Set(["All"]);
    PROJECTS.forEach((p) => p.tags.forEach((tag) => t.add(tag)));
    return [...t];
  }, []);

  const filteredProjects = useMemo(() => {
    const base = activeTag === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeTag));
    if (!query) return base;
    const q = query.toLowerCase();
    return base.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.join(" ").toLowerCase().includes(q)
    );
  }, [activeTag, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#ff7b00] to-[#ff4500]"
          style={{ transform: `scaleX(${progress})`, transformOrigin: '0 0' }}
        />
      </div>

      {/* Animated soft blobs background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(255,123,0,0.25), transparent)' }}
          animate={{ x: [-120, 120, -160], y: [0, -80, 60], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(255,69,0,0.20), transparent)' }}
          animate={{ x: [160, -100, 140], y: [80, -60, 20], scale: [1, 1.05, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-tight text-lg">
            STAPANAWAT <span className="text-[#ff7b00]">Jaito</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className={`hover:text-primary ${current==='about' ? 'text-[#ff7b00] font-semibold' : ''}`} href="#about">About</a>
            <a className={`hover:text-primary ${current==='skills' ? 'text-[#ff7b00] font-semibold' : ''}`} href="#skills">Skills</a>
            <a className={`hover:text-primary ${current==='projects' ? 'text-[#ff7b00] font-semibold' : ''}`} href="#projects">Projects</a>
            <a className={`hover:text-primary ${current==='education' ? 'text-[#ff7b00] font-semibold' : ''}`} href="#education">Education</a>
            <a className={`hover:text-primary ${current==='contact' ? 'text-[#ff7b00] font-semibold' : ''}`} href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-border text-sm hover:bg-muted"
            >
              Hire me
            </a>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark((d) => !d)}
              className="h-9 w-9 rounded-xl border border-border flex items-center justify-center"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-[#ff7b00]/15 to-[#ff4500]/15"
      >
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-extrabold leading-tight"
            >
              Fullstack Developer Intern
            </motion.h1>
            <p className="mt-4 text-muted-foreground">
              4th‑year BIS student at Rajamangala University of Technology Lanna.
              Strong interest in building fast, friendly web apps with clean UI and
              solid backend.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7b00] to-[#ff4500] text-white shadow"
              >
                View Projects
              </a>
              <a
                href="https://github.com/stapanawat"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border border-border flex items-center gap-2"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="px-4 py-2 rounded-xl border border-border flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <TiltCard>
                <Card>
                  <div className="flex items-center gap-3">
                    <IconWrap>
                      <Code2 className="h-5 w-5 text-[#ff7b00]" />
                    </IconWrap>
                    <div>
                      <p className="text-xs text-muted-foreground">Primary Stack</p>
                      <p className="font-semibold">PHP • React • MySQL</p>
                    </div>
                  </div>
                </Card>
              </TiltCard>
              <TiltCard>
                <Card>
                  <div className="flex items-center gap-3">
                    <IconWrap>
                      <Database className="h-5 w-5 text-[#ff7b00]" />
                    </IconWrap>
                    <div>
                      <p className="text-xs text-muted-foreground">DB Design</p>
                      <p className="font-semibold">Schema & Queries</p>
                    </div>
                  </div>
                </Card>
              </TiltCard>
              <TiltCard>
                <Card>
                  <div className="flex items-center gap-3">
                    <IconWrap>
                      <Globe className="h-5 w-5 text-[#ff7b00]" />
                    </IconWrap>
                    <div>
                      <p className="text-xs text-muted-foreground">UI/UX</p>
                      <p className="font-semibold">Responsive, Friendly</p>
                    </div>
                  </div>
                </Card>
              </TiltCard>
            </div>
          </div>

          <div>
            <Card className="h-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <IconWrap>
                    <MapPin className="h-5 w-5 text-[#ff4500]" />
                  </IconWrap>
                  <p>Chiang Mai, Thailand</p>
                </div>
                <div className="flex items-center gap-3">
                  <IconWrap>
                    <Mail className="h-5 w-5 text-[#ff4500]" />
                  </IconWrap>
                  <a href="mailto:stapanawatjaito@gmail.com" onClick={(e)=>{e.preventDefault();copyToClipboard('stapanawatjaito@gmail.com')}} title="Click to copy" className="underline-offset-4 hover:underline">
                    stapanawatjaito@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <IconWrap>
                    <Phone className="h-5 w-5 text-[#ff4500]" />
                  </IconWrap>
                  <a href="#" onClick={(e)=>{e.preventDefault();copyToClipboard('0620017779')}} title="Click to copy" className="underline-offset-4 hover:underline">062‑001‑7779</a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About Me" subtitle="Who I am & what I do">
        <Card>
          <p>
            I’m a final‑year student pursuing BBA in Business Information Systems. I
            build web applications end‑to‑end and enjoy creating clean, fast UI with
            solid backend logic. Looking for a fullstack/web internship to learn from
            real production work and deliver value quickly.
          </p>
        </Card>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" subtitle="Tech & tools I use">
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([group, items]) => (
            <Card key={group}>
              <div className="flex items-center gap-2 mb-3">
                {group.includes("Programming") && <Code2 className="h-5 w-5" />}
                {group === "Frameworks" && <Layers className="h-5 w-5" />}
                {group === "Tools" && <Briefcase className="h-5 w-5" />}
                {group === "Soft Skills" && <Globe className="h-5 w-5" />}
                <h3 className="font-semibold">{group}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((it) => (
                  <Chip key={it}>{it}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" subtitle="Selected work & practice">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="px-3 py-2 rounded-xl border border-border bg-background text-sm"
          />
          <Filter className="h-4 w-4" />
          {allTags.map((t) => (
            <Chip key={t} active={activeTag === t} onClick={() => setActiveTag(t)}>
              {t}
            </Chip>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <Card key={p.title}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.period}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              {p.links?.length ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm underline underline-offset-4"
                    >
                      {l.label} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education" subtitle="Background & coursework">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-start gap-3">
              <IconWrap>
                <School className="h-5 w-5 text-[#ff7b00]" />
              </IconWrap>
              <div>
                <h3 className="font-bold">Rajamangala University of Technology Lanna</h3>
                <p className="text-sm text-muted-foreground">Bachelor of Business Administration in Business Information Systems (2021 – now)</p>
                <p className="text-sm mt-1">GPA: 2.52</p>
              </div>
            </div>
          </Card>
          <Card>
            <h4 className="font-semibold mb-2">Relevant Courses</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {COURSES.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Interests */}
      <Section id="interests" title="Career Interests" subtitle="Roles I’m excited about">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CAREER.map((c) => (
            <Card key={c.label}>
              <div className="flex items-center gap-3">
                <IconWrap>{c.icon}</IconWrap>
                <p className="font-medium">{c.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" subtitle="Let’s build something great together">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h4 className="font-semibold">Get in touch</h4>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a className="underline-offset-4 hover:underline" href="mailto:stapanawatjaito@gmail.com">stapanawatjaito@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a className="underline-offset-4 hover:underline" href="tel:0620017779">062‑001‑7779</a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <a className="underline-offset-4 hover:underline" href="https://github.com/stapanawat" target="_blank" rel="noreferrer">github.com/stapanawat</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Chiang Mai, Thailand</span>
              </div>
            </div>
          </Card>

          <Card>
            <h4 className="font-semibold">Quick message (demo)</h4>
            <form
              className="mt-3 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks! This is a demo form. Connect to a service provider for production use.");
              }}
            >
              <input className="border rounded-xl p-2 bg-background" placeholder="Your name" required />
              <input className="border rounded-xl p-2 bg-background" type="email" placeholder="Email" required />
              <textarea className="border rounded-xl p-2 bg-background" rows={4} placeholder="Message" required />
              <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7b00] to-[#ff4500] text-white">
                Send
              </button>
            </form>
          </Card>
        </div>
      </Section>

      {/* Toast */}
      <Toast show={!!toast}>{toast}</Toast>

      {/* Footer */}
      <footer className="border-t border-border/60 py-10">
        <div className="max-w-6xl mx-auto px-4 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Stapanawat Jaito. Actively seeking internship opportunities in software/web development.</p>
          <a href="#home" className="underline underline-offset-4">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
