import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  ExternalLink,
  FileText,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Monitor,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';

type Project = {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  tags: string[];
  accent: string;
};

const projects: Project[] = [
  {
    id: 'fit-fusion',
    number: '01',
    title: 'Fit Fusion',
    type: 'Full-stack platform',
    description: 'A complete gym and fitness management platform with clear role-based journeys for admins, trainers, and members.',
    stack: ['React.js', 'PostgreSQL', 'Node.js', 'Express.js'],
    tags: ['Full Stack', 'React'],
    accent: 'blue',
  },
  {
    id: 'travel',
    number: '02',
    title: 'Travel Itinerary Planner',
    type: 'React experience',
    description: 'A responsive planning tool that brings destinations, weather, maps, and day-by-day travel plans into one view.',
    stack: ['React.js', 'REST APIs', 'Maps'],
    tags: ['Frontend', 'React'],
    accent: 'sand',
  },
  {
    id: 'commerce',
    number: '03',
    title: 'E-commerce Website',
    type: 'Frontend build',
    description: 'A considered shopping experience with product discovery, category filtering, cart management, and order summary.',
    stack: ['React.js', 'Context API', 'React Router'],
    tags: ['Frontend', 'React'],
    accent: 'orange',
  },
  {
    id: 'gemini',
    number: '04',
    title: 'Gemini Clone',
    type: 'AI interface',
    description: 'A personal project inspired by conversational AI interfaces, with live responses, loading states, and history.',
    stack: ['React.js', 'Vite', 'Gemini API'],
    tags: ['AI', 'React'],
    accent: 'ink',
  },
  {
    id: 'smart-lms',
    number: '05',
    title: 'Smart-LMS',
    type: 'Learning platform',
    description: 'A full-stack learning management system for students and administrators, including course and progress management.',
    stack: ['React.js', 'Node.js', 'MongoDB'],
    tags: ['Full Stack', 'React'],
    accent: 'green',
  },
];

const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];
const skillGroups = [
  { label: 'Frontend', icon: Monitor, skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Bootstrap', 'Tailwind CSS'] },
  { label: 'Backend & data', icon: Code2, skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'PostgreSQL', 'SQL'] },
  { label: 'Tools & more', icon: Sparkles, skills: ['Java', 'Git', 'GitHub', 'VS Code', 'Linux', 'Power BI', 'Android Studio'] },
];

function getInitialTheme(): boolean {
  const savedTheme = window.localStorage.getItem('abhilash-theme');
  if (savedTheme === 'dark') return true;
  if (savedTheme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('abhilash-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.tags.includes(activeFilter));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const message = String(data.get('message') || '');
    const text = `New portfolio message%0A%0aName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0a${encodeURIComponent(message)}`;
    window.open(`https://wa.me/919600598446?text=${text}`, '_blank');
    form.reset();
    setFormSent(true);
  };

  return (
    <div className={`site-shell ${darkMode ? 'dark-mode' : ''}`}>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="brand" aria-label="Abhilash K home">
          <span className="brand-mark">AK</span>
          <span className="brand-name">Abhilash K</span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15} /></a>
          <button className="icon-button theme-button" aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`} aria-pressed={darkMode} onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="icon-button menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy reveal-up">
            <div className="eyebrow"><span className="eyebrow-dot" /> Available for frontend opportunities</div>
            <h1>Building digital<br /><em>experiences</em><br />with intention.</h1>
            <p className="hero-lede">I&apos;m Abhilash, a frontend developer focused on creating responsive, intuitive products with React, JavaScript, and a sharp eye for detail.</p>
            <div className="hero-ctas">
              <div className="hero-primary-actions">
                <a className="button button-dark" href="#projects">View selected work <ArrowDownRight size={17} /></a>
                <a className="resume-link" href="/resume.pdf" target="_blank" rel="noreferrer"><FileText size={16} /> View Resume</a>
                <a className="resume-download" href="/resume.pdf" download="Abhilash_K_Resume.pdf"><Download size={15} /> Download Resume</a>
              </div>
              <div className="hero-contact-links"><a className="text-link" href="#contact">Let&apos;s talk <ArrowUpRight size={16} /></a><a className="whatsapp-link" href="https://wa.me/919600598446" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a></div>
            </div>
            <div className="hero-meta"><span>Pollachi, India</span><span className="meta-rule" /><span>Available for remote & onsite roles</span></div>
          </div>
          <div className="hero-portrait reveal-up reveal-delay">
            <div className="portrait-glow" />
            <div className="portrait-frame"><div className="portrait-frame-label">AK / 2026</div><img src="/images/WhatsApp_Image_2026-09-11_at_4.15.52_PM.jpeg" alt="Abhilash K — Frontend Developer" /></div>
            <div className="portrait-note"><span className="note-line" />Turning ideas<br />into useful products.</div>
            <div className="portrait-index">01 <span>/</span> 06</div>
          </div>
          <div className="hero-scroll"><span>Scroll to explore</span><ArrowDownRight size={16} /></div>
        </section>

        <section id="about" className="about section-pad section-light scroll-reveal">
          <div className="section-kicker">01 / About me</div>
          <div className="about-grid">
            <h2>A developer who cares about the details that make a product feel <em>right.</em></h2>
            <div className="about-copy"><p>I&apos;m a frontend developer with hands-on experience building responsive and interactive web applications. I enjoy transforming designs and ideas into clean, intuitive, and maintainable user interfaces.</p><p>My work spans React.js, REST API integration, Node.js, Express.js, MongoDB, PostgreSQL, authentication, and role-based access control. I&apos;m always improving my architecture, performance, and problem-solving skills.</p><a className="text-link" href="mailto:abikumar0023@gmail.com">Get in touch <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="about-cards"><div className="about-card"><span>01</span><strong>React<br />craft</strong><Code2 size={20} /></div><div className="about-card"><span>02</span><strong>Responsive<br />by default</strong><Monitor size={20} /></div><div className="about-card"><span>03</span><strong>Full-stack<br />thinking</strong><Sparkles size={20} /></div></div>
        </section>

        <section id="skills" className="skills section-pad scroll-reveal">
          <div className="section-heading"><div><div className="section-kicker">02 / Capabilities</div><h2>Tools I use to make<br /><em>things happen.</em></h2></div><p>From the first line of markup to the final API response, I like understanding how the whole product comes together.</p></div>
          <div className="skill-grid">{skillGroups.map(({ label, icon: Icon, skills }) => <div className="skill-group" key={label}><div className="skill-group-head"><Icon size={20} /><span>{label}</span></div><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div>
        </section>

        <section id="experience" className="experience section-pad section-dark scroll-reveal">
          <div className="section-heading"><div><div className="section-kicker">03 / Experience</div><h2>Learning by<br /><em>building.</em></h2></div><p>Every role has added a new layer to how I think about interfaces, collaboration, and the work behind the screen.</p></div>
          <div className="timeline">
            <article className="timeline-item"><div className="timeline-date">Jan 2026 — Aug 2026</div><div className="timeline-marker" /><div className="timeline-content"><div className="timeline-top"><div><h3>Frontend Developer Intern</h3><p>FAM Infomedia Pvt. Ltd. · Palladam, Tamil Nadu</p></div><BriefcaseBusiness size={21} /></div><ul><li>Developed responsive web interfaces with HTML, CSS, JavaScript, React.js, and Bootstrap.</li><li>Built modular React components and integrated REST APIs for dynamic data.</li><li>Collaborated with UI/UX designers and backend developers to ship user-friendly interfaces.</li></ul></div></article>
            <article className="timeline-item"><div className="timeline-date">Oct 2024 — Nov 2024</div><div className="timeline-marker" /><div className="timeline-content"><div className="timeline-top"><div><h3>Full-Stack Development Intern</h3><p>NOVI TECH · Coimbatore</p></div><Code2 size={21} /></div><ul><li>Worked across the MERN stack on responsive interfaces and RESTful APIs.</li><li>Practiced Git version control, debugging, and full-stack problem solving.</li></ul></div></article>
            <article className="timeline-item"><div className="timeline-date">Jun 2024 — Jul 2024</div><div className="timeline-marker" /><div className="timeline-content"><div className="timeline-top"><div><h3>Frontend Development Intern</h3><p>AWERUM · Pollachi</p></div><Monitor size={21} /></div><ul><li>Built user-friendly interfaces with HTML, CSS, and JavaScript during a focused 15-day internship.</li><li>Worked on navigation menus, forms, sliders, and cross-browser compatibility.</li></ul></div></article>
          </div>
        </section>

        <section id="projects" className="projects section-pad section-light scroll-reveal">
          <div className="section-heading projects-heading"><div><div className="section-kicker">04 / Selected work</div><h2>Practical work,<br /><em>thoughtfully made.</em></h2></div><p>A selection of projects across frontend, full-stack, AI, and business use cases.</p></div>
          <div className="filter-row" role="group" aria-label="Filter projects">{['All', 'Frontend', 'React', 'Full Stack', 'AI'].map((filter) => <button className={activeFilter === filter ? 'active' : ''} key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <div className="project-grid">{filteredProjects.map((project) => <article className={`project-card project-${project.accent}`} key={project.id} onClick={() => setSelectedProject(project)} tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && setSelectedProject(project)}><div className="project-visual"><ProjectVisual project={project} /><span className="project-arrow"><ArrowUpRight size={19} /></span></div><div className="project-card-body"><div className="project-card-meta"><span>{project.number}</span><span>{project.type}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="stack-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div></article>)}</div>
        </section>

        <section id="education" className="education section-pad scroll-reveal">
          <div className="section-heading"><div><div className="section-kicker">05 / Education & more</div><h2>The foundation<br /><em>underneath.</em></h2></div><p>A growing technical foundation, shaped by formal study, focused learning, and experiences beyond the classroom.</p></div>
          <div className="education-grid"><div className="education-card"><GraduationCap size={22} /><div><span>2022 — 2026</span><h3>B.Tech Information Technology</h3><p>Dr. Mahalingam College of Engineering and Technology</p><strong>CGPA 8.1</strong></div></div><div className="education-card"><GraduationCap size={22} /><div><span>2019 — 2022</span><h3>Higher Secondary & Secondary School</h3><p>Our Lady of Lourdes Matriculation Higher Secondary School</p><strong>HSC 70.3% · SSLC 67.8%</strong></div></div></div>
          <div className="credentials"><div><span className="credential-label">Certifications</span><div className="credential-list"><span>Power BI Workshop</span><span>Android Development using Flutter</span><span>BEC Certificate — Cambridge University</span><span>NPTEL — Industry 4.0 & Data Analytics with Python</span><span>Full Stack Development (MERN Stack)</span><span>Linux Administration</span><span>Oracle Fusion Cloud HCM Certified Foundations Associate</span></div></div><div><span className="credential-label">Achievements</span><div className="achievement-list"><span><Check size={14} /> NCC Combined Annual Training Camp-I</span><span><Check size={14} /> NCC Annual Training Camp-II</span><span><Check size={14} /> EBSB National Camp</span><span><Check size={14} /> NCC B Certificate — A Grade</span><span><Check size={14} /> NCC C Certificate — B Grade</span></div></div></div>
        </section>

        <section id="contact" className="contact section-pad section-dark scroll-reveal"><div className="contact-intro"><div className="section-kicker">06 / Contact</div><h2>Let&apos;s build<br /><em>something useful.</em></h2><p>I&apos;m open to frontend development opportunities, full-stack projects, and opportunities where I can build meaningful digital experiences.</p><div className="contact-details"><a href="mailto:abikumar0023@gmail.com"><Mail size={17} />abikumar0023@gmail.com</a><a href="tel:+919600598446"><Phone size={17} />+91 9600598446</a><a href="https://wa.me/919600598446" target="_blank" rel="noreferrer"><MessageCircle size={17} />Chat on WhatsApp</a><span><MapPin size={17} />Pollachi, Tamil Nadu, India</span></div></div><form className="contact-form" aria-label="Contact form" onSubmit={handleSubmit}>{formSent ? <div className="form-success"><Check size={28} /><h3>Message sent to WhatsApp.</h3><p>Your message has been forwarded to my WhatsApp. I&apos;ll get back to you as soon as possible.</p><button type="button" className="text-link" onClick={() => setFormSent(false)}>Send another message</button></div> : <><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell me a little about your project..." /></label><button className="button button-light" type="submit">Send message <Send size={16} /></button></>}</form></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a href="#top" className="brand"><span className="brand-mark">AK</span><span className="brand-name">Abhilash K</span></a><p>Frontend developer building modern web experiences.</p><div className="socials"><a href="https://wa.me/919600598446" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a><a href="https://github.com/abhilash0023" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/abhilash-k-302361283/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:abikumar0023@gmail.com" aria-label="Email"><Mail size={18} /></a></div></div><div className="footer-bottom"><span>© 2026 Abhilash K. All rights reserved.</span><span>Designed with intention.</span></div></footer><a className="floating-whatsapp" href="https://wa.me/919600598446" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={21} /></a>

      {selectedProject && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={20} /></button><div className={`modal-visual modal-${selectedProject.accent}`}><ProjectVisual project={selectedProject} /></div><div className="modal-content"><span className="section-kicker">{selectedProject.number} / {selectedProject.type}</span><h2 id="modal-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="modal-stack">{selectedProject.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="modal-note"><ExternalLink size={16} /> Project details are based on the current portfolio brief.</div></div></div></div>}
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.id === 'fit-fusion') return <div className="dashboard-visual"><div className="dash-sidebar"><span className="dash-logo">FF</span><i /><i /><i /><i /></div><div className="dash-main"><div className="dash-top"><span>Good morning, Abhilash</span><b>•••</b></div><div className="dash-stats"><span><small>Members</small><strong>248</strong><em>+12.4%</em></span><span><small>Attendance</small><strong>86%</strong><em>+8.2%</em></span></div><div className="dash-chart"><span>Weekly activity</span><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div></div></div></div>;
  if (project.id === 'travel') return <div className="travel-visual"><div className="travel-map"><span className="map-route" /><i className="map-pin pin-a" /><i className="map-pin pin-b" /><i className="map-pin pin-c" /></div><div className="travel-info"><small>YOUR NEXT ADVENTURE</small><strong>Kyoto, Japan</strong><span>22° clear sky · 4 days</span></div></div>;
  if (project.id === 'commerce') return <div className="commerce-visual"><div className="commerce-nav"><b>atelier</b><span>Search · Bag (2)</span></div><div className="commerce-products"><div><span className="product-shape shape-one" /><b>Linen shirt</b><small>$84</small></div><div><span className="product-shape shape-two" /><b>Everyday tote</b><small>$52</small></div><div><span className="product-shape shape-three" /><b>Studio mug</b><small>$28</small></div></div></div>;
  if (project.id === 'gemini') return <div className="ai-visual"><div className="ai-top"><span className="ai-spark">✦</span><b>gemini</b><small>New chat · ⌄</small></div><div className="ai-message"><span>✦</span><p>How can I help you today?</p></div><div className="ai-input">Ask anything <Send size={12} /></div></div>;
  return <div className="lms-visual"><div className="lms-title"><b>My learning</b><span>View all →</span></div><div className="lms-progress"><span /><span /><span /></div><div className="lms-courses"><div><i /><b>React patterns</b><small>72% complete</small></div><div><i /><b>Node fundamentals</b><small>38% complete</small></div></div></div>;
}

export default App;
