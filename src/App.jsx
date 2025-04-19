import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import { useState } from 'react'

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function GlitchText({ text }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block text-magenta font-bold glitch ${hovered ? 'glitch-active' : ''}`}
    >
      {text}
      <span aria-hidden="true" className="absolute inset-0 glitch-layer text-magenta">{text}</span>
    </span>
  )
}

function About() {
  return (
    <PageWrapper>
      <div className="max-w-3xl px-6 py-16 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-magenta">About Me</h2>
        <p className="text-gray-400">I'm a marketer who thrives in Web3. I specialize in building powerful narratives and communities for crypto startups, combining data-driven strategy with strong aesthetic vibes.</p>
      </div>
    </PageWrapper>
  )
}

function Contact() {
  return (
    <PageWrapper>
      <div className="max-w-3xl px-6 py-16 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-magenta">Contact</h2>
        <p className="mb-4 text-gray-400">Reach me at <a href="mailto:hello@razvancrypto.xyz" className="underline text-magenta">hello@razvancrypto.xyz</a></p>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" className="transition hover:text-magenta">Twitter</a>
          <a href="https://linkedin.com" target="_blank" className="transition hover:text-magenta">LinkedIn</a>
          <a href="https://github.com" target="_blank" className="transition hover:text-magenta">GitHub</a>
        </div>
      </div>
    </PageWrapper>
  )
}

function Card3D({ title, description }) {
  return (
    <motion.div
      layout
      className="p-6 transition-transform duration-200 border bg-dark border-magenta rounded-2xl will-change-transform hover:scale-105 hover:bg-magenta/10"
    >
      <GlitchText text={title} />
      <p className="mt-2 text-gray-400">{description}</p>
    </motion.div>
  )
}

function Projects() {
  const [filter, setFilter] = useState("All")
  const allProjects = [
    { title: "NFT Launch Campaign", description: "Created and executed a full-stack marketing plan for a generative NFT project. 20K+ followers gained pre-launch.", tag: "NFT" },
    { title: "DeFi Platform Growth", description: "Managed influencer outreach and content strategy, growing TVL by 300% in 6 months.", tag: "DeFi" },
    { title: "DAO Onboarding", description: "Designed and deployed a new member onboarding funnel for a crypto DAO.", tag: "DAO" },
    { title: "Cross-Chain Collab", description: "Worked with a Layer 1 + NFT brand to increase multichain visibility.", tag: "NFT" },
  ]
  const filtered = filter === "All" ? allProjects : allProjects.filter(p => p.tag === filter)
  return (
    <PageWrapper>
      <div className="max-w-5xl px-6 py-16 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-magenta">Projects</h2>
        <div className="flex mb-10 space-x-3">
          {["All", "NFT", "DeFi", "DAO"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 rounded-full border text-sm transition ${filter === cat ? 'border-magenta text-magenta' : 'border-gray-500 text-gray-400 hover:border-magenta hover:text-magenta'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <Card3D key={i} title={project.title} description={project.description} />
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  )
}

function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-32 text-center">
        <h1 className="mb-6 text-5xl font-bold leading-tight text-magenta md:text-6xl">
  Razvan Paleacu's<br />
  Personal Portfolio
</h1>
        <p className="max-w-xl text-lg text-gray-400 md:text-xl">Creative crypto marketing specialist helping Web3 brands grow through strategy, content & community.</p>
      </div>
    </PageWrapper>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 border-b bg-dark backdrop-blur-sm border-magenta">
      <div className="flex items-center justify-center space-x-6">
        {[
          { path: '/', label: 'Home' },
          { path: '/projects', label: 'Projects' },
          { path: '/about', label: 'About' },
          { path: '/contact', label: 'Contact' },
        ].map(({ path, label }) => (
          <Link
            key={label}
            to={path}
            className="relative inline-block text-gray-300 transition group hover:text-magenta"
          >
            <span>{label}</span>
            <span className="absolute left-0 right-0 h-1 transition-transform duration-300 origin-left scale-x-0 rounded-full -bottom-1 bg-magenta group-hover:scale-x-100"></span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8 mt-16 text-center border-t border-magenta">
      <p className="text-gray-500">&copy; 2025 Razvan. Built for the Web3 era.</p>
    </footer>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-mono text-white bg-dark">
        <Navbar />
        <div className="flex-1 pt-20">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
