import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import { useEffect, useState } from 'react'

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

function Navbar({ toggleTheme, theme }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b dark:bg-dark backdrop-blur-sm border-magenta">
      <button
        onClick={toggleTheme}
        className="px-2 py-1 text-xs font-semibold transition border rounded text-magenta border-magenta hover:bg-magenta hover:text-black"
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
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
            className="relative inline-block text-gray-800 transition group dark:text-gray-300 hover:text-magenta"
          >
            <span>{label}</span>
            <span className="absolute left-0 right-0 h-1 transition-transform duration-300 origin-left scale-x-0 rounded-full -bottom-1 bg-magenta group-hover:scale-x-100"></span>
          </Link>
        ))}
      </div>
    </nav>
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
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400 md:text-xl">
          Creative crypto marketing specialist helping Web3 brands grow through strategy, content & community.
        </p>
      </div>
    </PageWrapper>
  )
}

function About() {
  return (
    <PageWrapper>
      <div className="max-w-3xl px-6 py-16 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-magenta">About Me</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          I'm a marketer who thrives in Web3. I specialize in building powerful narratives and communities for crypto startups.
        </p>
        <img src="/IMG_7022.JPG" alt="About" className="w-full shadow-lg rounded-2xl" />
      </div>
    </PageWrapper>
  )
}

function Contact() {
  return (
    <PageWrapper>
      <div className="max-w-3xl px-6 py-16 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-magenta">Contact</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Reach me at <a href="mailto:hello@razvancrypto.xyz" className="underline text-magenta">hello@razvancrypto.xyz</a>
        </p>
        <div className="flex space-x-4">
          <a href="https://twitter.com" className="transition hover:text-magenta">Twitter</a>
          <a href="https://linkedin.com" className="transition hover:text-magenta">LinkedIn</a>
          <a href="https://github.com" className="transition hover:text-magenta">GitHub</a>
        </div>
      </div>
    </PageWrapper>
  )
}

function Projects() {
  const [filter, setFilter] = useState("All")

  const allProjects = [
    {
      title: "Depined",
      description: "Worked with depined.org on DePIN ecosystem growth and marketing.",
      tag: "DePIN",
      logo: "/depin.png"
    },
    {
      title: "AxenAI",
      description: "Brand & content strategy for axenai.com, a cutting-edge Web3 AI assistant.",
      tag: "AI",
      logo: "/axenai.png"
    },
    {
      title: "AgentsGPT",
      description: "Supported agentsgpt.org with community building and product messaging.",
      tag: "Infra",
      logo: "/agentsgpt.png"
    }
  ]

  const filtered = filter === "All" ? allProjects : allProjects.filter(p => p.tag === filter)

  return (
    <PageWrapper>
      <div className="max-w-5xl px-6 py-16 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-magenta">Projects</h2>

        <div className="flex flex-wrap gap-3 mb-10">
          {["All", "DePIN", "AI", "Infra"].map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1 rounded-full border text-sm transition ${
                filter === tag
                  ? "border-magenta text-magenta"
                  : "border-gray-500 text-gray-400 hover:border-magenta hover:text-magenta"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <motion.div
              key={i}
              layout
              className="p-6 transition-transform duration-300 border bg-white dark:bg-dark border-magenta rounded-2xl hover:scale-[1.02]"
            >
              <div className="flex justify-center mb-4">
                <img src={project.logo} alt={project.title} className="h-16" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-magenta">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
              <span className="inline-block px-3 py-1 mt-4 text-xs border rounded-full text-magenta border-magenta">
                {project.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
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
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-mono text-black transition-colors duration-300 bg-white dark:bg-dark dark:text-white">
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <div className="flex-1 pt-20">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App