'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  Search,
  ArrowUp,
  XCircle,
  Send,
  Loader2
} from 'lucide-react'

// Types
interface Project {
  id: string
  title: string
  slug: string
  subtitle: string
  description: string
  problem: string | null
  approach: string | null
  impact: string | null
  techStack: string[]
  status: string
  category: string
  year: string
  githubUrl: string | null
  demoUrl: string | null
  featured: boolean
}

interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate: string | null
  credentialId: string | null
  verifyUrl: string | null
  description: string | null
  logo? : string 
}

interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string | null
  achievements: string[]
}

interface TechStack {
  [category: string]: string[]
}

// ==========================================
// 🛑 EDIT YOUR DATA HERE (No database needed!)
// ==========================================
const projectsData: Project[] = [
  {
    id: '1',
    title: 'AI Code Review Bot',
    slug: 'ai-code-review-bot',
    subtitle: 'Machine Learning',
    description: 'An intelligent code review system that analyzes pull requests and provides automated feedback.',
    problem: 'Code reviews were time-consuming and inconsistent across teams.',
    approach: 'Built a machine learning pipeline using TensorFlow to analyze code patterns.',
    impact: 'Reduced code review time by 40% and caught 15% more potential bugs.',
    techStack: ['Python', 'TensorFlow', 'GitHub API', 'FastAPI'],
    status: 'LIVE',
    category: 'AI/ML',
    year: '2024',
    githubUrl: '#',
    demoUrl: '#',
    featured: true
  }
]

const certificationsData: Certification[] = [
  {
    id: '1',
    title: 'Technical Support Fundamentals',
    issuer: 'Google',
    issueDate: 'July 2024',
    expiryDate: null,
    credentialId: '66V3D693A7GV',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/66V3D693A7GV',
    description: 'Covered troubleshooting, Linux, and customer service fundamentals.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
  }
]

const experienceData: Experience[] = [
  {
    id: '1',
    role: 'Business Operations Intern',
    company: 'WadiCars',
    period: '2022.08 — 2024.12',
    description: 'Analyzed market data to formulate dynamic pricing strategies and optimize business operations.',
    achievements: [
      'Conducted in-depth market data analysis to implement dynamic pricing models',
      'Applied Operations Management skills to streamline workflows and improve efficiency'
    ]
  },
  {
    id: '2',
    role: 'Tender Intern',
    company: 'WadiCars',
    period: '2021.05 — 2022.08',
    description: 'Managed B2B partnerships and supported the tendering process to drive business growth.',
    achievements: [
      'Managed and maintained key B2B collaborative partnerships',
      'Assisted in the preparation, submission, and tracking of commercial tenders'
    ]
  },
  {
    id: '3',
    role: 'Administrative Intern',
    company: 'WadiCars',
    period: '2020.02 — 2021.05',
    description: 'Provided comprehensive administrative support and shadowed consultants to learn core business processes.',
    achievements: [
      'Shadowed senior consultants to gain practical industry insights and consulting techniques',
      'Executed daily administrative tasks to ensure smooth and efficient office operations'
    ]
  }
];

const techStackData: TechStack = {
  'Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'SQL'],
  'Frontend': ['React', 'Next.js', 'Tailwind CSS'],
  'Backend': ['Node.js', 'FastAPI', 'GraphQL'],
  'Database': ['PostgreSQL', 'MongoDB', 'Redis'],
  'Cloud': ['AWS', 'Docker', 'Kubernetes']
}

const categories = ['All', 'Frontend', 'Backend', 'Cloud', 'AI/ML']

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const [projects] = useState<Project[]>(projectsData)
  const [certifications] = useState<Certification[]>(certificationsData)
  const [experience] = useState<Experience[]>(experienceData)
  const [techStack] = useState<TechStack>(techStackData)

  const settings = {
    heroTitle: 'Full-Stack Developer',
    heroSubtitle: 'Building scalable web systems & intelligent tools',
    bio: 'I craft modern web applications and cloud-native solutions with a focus on performance, scalability, and user experience.',
    contactEmail1: 'hello@ak.dev',
    contactEmail2: null,
    githubUrl: '#',
    linkedinUrl: '#'
  }

  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [showAllCerts, setShowAllCerts] = useState(false)

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', honeypot: '' })
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [contactError, setContactError] = useState('')

  // Scroll handling (Keep this - it's pure browser JS)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setScrolled(scrollTop > 50)
      setScrollProgress(progress)
      setShowBackToTop(scrollTop > 500)

      const sections = ['work', 'about', 'contact']
      const viewportMiddle = window.innerHeight / 2
      let bestSection = ''
      let bestVisibility = 0

      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
            if (visibleHeight > bestVisibility) {
              bestVisibility = visibleHeight
              bestSection = id
            }
          }
        }
      }

      if (bestSection) setActiveSection(bestSection)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const displayedCerts = showAllCerts ? certifications : certifications.slice(0, 6)
  const contactEmail = settings.contactEmail1 || 'hello@ak.dev'

  // ✅ CHANGED: Contact form now sends to Web3Forms instead of your backend
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (contactForm.honeypot) {
      setContactSuccess(true)
      return
    }

    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactError('Please fill in all fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactForm.email)) {
      setContactError('Please enter a valid email address.')
      return
    }

    setContactSubmitting(true)
    setContactError('')

    try {
      // ⬇️ REPLACE 'YOUR_ACCESS_KEY' WITH YOUR ACTUAL WEB3FORMS KEY ⬇️
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY', 
          name: contactForm.name.trim(),
          email: contactForm.email.trim(),
          message: contactForm.message.trim()
        })
      })

      if (res.ok) {
        setContactSuccess(true)
        setContactForm({ name: '', email: '', message: '', honeypot: '' })
      } else {
        setContactError('Failed to send message. Please try again.')
      }
    } catch {
      setContactError('Failed to send message. Please try again.')
    } finally {
      setContactSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white via-zinc-400 to-zinc-600 z-[60]"
        style={{ 
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: 'left'
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-900' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-lg font-medium tracking-tight">
              Ak<span className="text-zinc-500">.dev</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {[{ id: 'work', label: 'Work' }, { id: 'about', label: 'About' }, { id: 'contact', label: 'Contact' }].map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-sm transition-colors relative group ${
                    activeSection === link.id ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                    activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              ))}
              <a
                href="/cv.pdf"
                className="text-sm px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-600 transition-colors"
              >
                Resume
              </a>
              {/* ✅ DELETED: Admin Link */}
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a] border-t border-zinc-900"
            >
              <div className="px-6 py-6 space-y-4">
                <a href="#work" className="block text-lg" onClick={() => setMenuOpen(false)}>Work</a>
                <a href="#about" className="block text-lg" onClick={() => setMenuOpen(false)}>About</a>
                <a href="#contact" className="block text-lg" onClick={() => setMenuOpen(false)}>Contact</a>
                <div className="flex gap-4 pt-4 border-t border-zinc-900">
                  <a href="/cv.pdf" className="text-sm text-zinc-500">Resume</a>
                  {/* ✅ DELETED: Mobile Admin Link */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-5xl">
            <p className="text-zinc-500 text-sm tracking-widest uppercase mb-8">
              {settings.heroTitle}
            </p>
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-light leading-[0.95] tracking-tight mb-8">
              <span className="block">{settings.heroSubtitle.split(' ').slice(0, 2).join(' ')}</span>
              <span className="block text-zinc-400">{settings.heroSubtitle.split(' ').slice(2, 4).join(' ')}</span>
              <span className="block">{settings.heroSubtitle.split(' ').slice(4).join(' ')}</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-xl leading-relaxed mb-12">
              {settings.bio || 'I craft modern web applications and cloud-native solutions with a focus on performance, scalability, and user experience.'}
            </p>
            <div className="flex items-center gap-6">
              <a href="#work" className="group inline-flex items-center gap-2 text-white">
                <span className="text-sm tracking-wide">View Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="text-zinc-700">•</span>
              <a href="#contact" className="text-sm text-zinc-500 hover:text-white transition-colors">
                Get in touch
              </a>
            </div>
          </div>

          <button
            onClick={scrollToWork}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer group"
          >
            <span className="text-xs text-zinc-600 tracking-widest uppercase group-hover:text-zinc-400 transition-colors">Scroll</span>
            <ChevronDown className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-24 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-zinc-600 text-sm tracking-widest uppercase">Selected Work</span>
            <h2 className="text-3xl md:text-4xl font-light mt-3 tracking-tight">Projects</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded bg-zinc-900/50 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-sm placeholder:text-zinc-700 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-black'
                      : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer p-5 rounded-lg bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-600 uppercase tracking-wider">{project.subtitle}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                    project.status === 'LIVE' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white group-hover:text-zinc-100 transition-colors mb-2">{project.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded text-[11px] bg-zinc-800/60 text-zinc-400 border border-zinc-700/50">{tech}</span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-0.5 rounded text-[11px] text-zinc-600">+{project.techStack.length - 4}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-zinc-400 border border-zinc-700 group-hover:border-zinc-500 group-hover:text-white transition-all">
                    <ExternalLink className="w-3.5 h-3.5" /> View Details
                  </span>
                </div>
              </div>
            ))}
          </div>
          {filteredProjects.length === 0 && <p className="text-center text-zinc-600 py-12">No projects found.</p>}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-zinc-600 text-sm tracking-widest uppercase">About</span>
              <h2 className="text-3xl md:text-4xl font-light mt-3 tracking-tight">I build things<br /><span className="text-zinc-500">for the web</span></h2>
              <p className="text-zinc-400 text-sm leading-relaxed mt-6 max-w-md">{settings.bio}</p>
            </div>
            <div className="relative">
              <h3 className="text-xs text-zinc-600 uppercase tracking-widest mb-3">Experience</h3>
              <div className="absolute top-6 left-0 right-0 h-4 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
              <div className="max-h-[280px] overflow-y-auto space-y-2 pr-2" style={{ scrollbarWidth: 'none' }}>
                {experience.map((exp) => (
                  <div key={exp.id} className="p-3 rounded bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium">{exp.role} <span className="text-zinc-600">—</span> <span className="text-zinc-400">{exp.company}</span></h4>
                      <span className="text-[10px] text-zinc-600 whitespace-nowrap ml-2">{exp.period}</span>
                    </div>
                    <ul className="space-y-0.5">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="text-xs text-zinc-500 flex items-start gap-1.5"><span className="text-zinc-600 mt-0.5">•</span> {a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs text-zinc-600 uppercase tracking-widest">Certifications ({certifications.length})</h3>
              {certifications.length > 6 && (
                <button onClick={() => setShowAllCerts(!showAllCerts)} className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                  {showAllCerts ? 'Show less' : `Show all ${certifications.length}`}
                  <ChevronDown className={`w-3 h-3 transition-transform ${showAllCerts ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {displayedCerts.map((cert) => (
                <div key={cert.id} onClick={() => setSelectedCert(cert)} className="group flex items-center gap-2 p-2.5 rounded bg-zinc-900/30 border border-zinc-800/40 hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors cursor-pointer">
                  <div className="w-4 h-4 rounded bg-emerald-500/15 flex items-center justify-center flex-shrink-0"><CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-zinc-300 group-hover:text-white truncate transition-colors">{cert.title}</p>
                    <p className="text-[10px] text-zinc-600">{cert.issuer} — {cert.issueDate.split(' ')[1] || cert.issueDate}</p>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-900">
            <h3 className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Tech Stack</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(techStack).map(([group, techs]) => (
                <div key={group}>
                  <h4 className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">{group}</h4>
                  <div className="flex flex-wrap gap-1">
                    {techs.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded text-[11px] text-zinc-400 bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 hover:text-zinc-300 transition-colors cursor-default">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-zinc-600 text-sm tracking-widest uppercase">Contact</span>
            <h2 className="text-3xl md:text-4xl font-light mt-3 tracking-tight">Let&apos;s work<br /><span className="text-zinc-500">together</span></h2>
            <p className="text-zinc-500 text-sm mt-4 mb-8 max-w-md">Open to new opportunities and interesting projects. Send a message or reach out directly.</p>

            {!contactSuccess ? (
              <form onSubmit={handleContactSubmit} className="space-y-4 mb-8">
                {contactError && <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{contactError}</div>}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Name</label>
                    <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required className="w-full px-3 py-2.5 rounded bg-zinc-900/50 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-sm placeholder:text-zinc-700 transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Email</label>
                    <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required className="w-full px-3 py-2.5 rounded bg-zinc-900/50 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-sm placeholder:text-zinc-700 transition-colors" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Message</label>
                  <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required rows={5} className="w-full px-3 py-2.5 rounded bg-zinc-900/50 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-sm placeholder:text-zinc-700 transition-colors resize-none" placeholder="Tell me about your project or opportunity..." />
                </div>
                <input type="text" name="website" value={contactForm.honeypot} onChange={(e) => setContactForm({ ...contactForm, honeypot: e.target.value })} className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <button type="submit" disabled={contactSubmitting} className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {contactSubmitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : (<><Send className="w-4 h-4" /> Send Message</>)}
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Message sent successfully!</p>
                    <p className="text-xs text-zinc-500 mt-1">I&apos;ll get back to you as soon as possible.</p>
                  </div>
                </div>
                <button onClick={() => setContactSuccess(false)} className="mt-4 text-xs text-zinc-500 hover:text-white transition-colors">Send another message</button>
              </div>
            )}

            <div className="pt-6 border-t border-zinc-800">
              <p className="text-xs text-zinc-600 mb-3">Or reach out directly:</p>
              <a href={`mailto:${contactEmail}`} className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6">
                <Mail className="w-4 h-4" /><span>{contactEmail}</span><ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <div className="flex gap-4">
                <a href={settings.githubUrl || '#'} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"><Github className="w-4 h-4" /> GitHub</a>
                <a href={settings.linkedinUrl || '#'} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /> LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Ak.dev</p>
          <p className="text-xs text-zinc-700">Built with care</p>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={scrollToTop} className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors z-40" aria-label="Back to top">
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-zinc-800 rounded-lg">
              <div className="sticky top-0 bg-[#0a0a0a] border-b border-zinc-800 p-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-zinc-600 uppercase tracking-wider">{selectedProject.subtitle}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${selectedProject.status === 'LIVE' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>{selectedProject.status}</span>
                  </div>
                  <h3 className="text-xl font-medium">{selectedProject.title}</h3>
                </div>
                <button onClick={() => setSelectedProject(null)} className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><XCircle className="w-4 h-4" /></button>
              </div>
              <div className="p-4 space-y-4">
                {selectedProject.problem && (<div><h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Problem</h4><p className="text-sm text-zinc-300">{selectedProject.problem}</p></div>)}
                {selectedProject.approach && (<div><h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Approach</h4><p className="text-sm text-zinc-300">{selectedProject.approach}</p></div>)}
                {selectedProject.impact && (<div><h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Impact</h4><p className="text-sm text-zinc-300">{selectedProject.impact}</p></div>)}
                <div><h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Technologies</h4><div className="flex flex-wrap gap-1.5">{selectedProject.techStack.map((tech) => (<span key={tech} className="px-2 py-0.5 rounded text-xs bg-zinc-900 text-zinc-400 border border-zinc-800">{tech}</span>))}</div></div>
              </div>
              <div className="sticky bottom-0 bg-[#0a0a0a] border-t border-zinc-800 p-4 flex gap-3">
                {selectedProject.githubUrl && (<a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-zinc-900 border border-zinc-800 text-sm hover:border-zinc-600 transition-colors"><Github className="w-4 h-4" /> View Code</a>)}
                {selectedProject.demoUrl && (<a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"><ExternalLink className="w-4 h-4" /> Live Demo</a>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certification Modal */}
<AnimatePresence>
  {selectedCert && (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" 
      onClick={() => setSelectedCert(null)}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }} 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-md bg-[#0a0a0a] border border-zinc-800 rounded-lg p-4"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* ✅ Company Logo */}
            {selectedCert.logo && (
              <img 
                src={selectedCert.logo} 
                alt={`${selectedCert.issuer} logo`}
                className="w-10 h-10 rounded bg-white p-1 object-contain"
              />
            )}
            <div>
              <h3 className="text-lg font-medium">{selectedCert.title}</h3>
              <p className="text-sm text-zinc-500">{selectedCert.issuer}</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedCert(null)} 
            className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Issued:</span>
            <span>{selectedCert.issueDate}</span>
          </div>
          {selectedCert.expiryDate && (
            <div className="flex justify-between">
              <span className="text-zinc-500">Expires:</span>
              <span>{selectedCert.expiryDate}</span>
            </div>
          )}
          {selectedCert.credentialId && (
            <div className="flex justify-between">
              <span className="text-zinc-500">Credential ID:</span>
              <span className="font-mono text-xs">{selectedCert.credentialId}</span>
            </div>
          )}
        </div>
        {selectedCert.description && (
          <p className="text-sm text-zinc-400 mt-3">{selectedCert.description}</p>
        )}
        {selectedCert.verifyUrl && (
          <a 
            href={selectedCert.verifyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Verify Credential
          </a>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  )
}
