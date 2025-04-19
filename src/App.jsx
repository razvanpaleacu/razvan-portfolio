import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import { useEffect, useState } from 'react'
import AnimatedBackground from './AnimatedBackground'

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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b dark:bg-dark backdrop-blur-sm border-magenta">
      <button
        onClick={toggleTheme}
        className="px-2 py-1 text-xs font-semibold transition border rounded text-magenta border-magenta hover:bg-magenta hover:text-black"
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-magenta focus:outline-none"
        >
          ☰
        </button>
      </div>
      <div className={`absolute md:static top-16 right-6 md:right-auto md:top-auto bg-white dark:bg-dark md:bg-transparent md:dark:bg-transparent border md:border-none rounded md:flex md:space-x-6 space-y-2 md:space-y-0 px-6 py-4 md:p-0 ${menuOpen ? 'block' : 'hidden'} md:block`}> 
        {[
          { path: '/', label: 'Home' },
          { path: '/projects', label: 'Projects' },
          { path: '/about', label: 'About' },
          { path: '/contact', label: 'Contact' },
          { path: '/faq', label: 'FAQ' },
        ].map(({ path, label }) => (
          <Link
            key={label}
            to={path}
            className="relative block text-gray-800 transition md:inline-block group dark:text-gray-300 hover:text-magenta"
            onClick={() => setMenuOpen(false)}
          >
            <span>{label}</span>
            <span className="absolute left-0 right-0 hidden h-1 transition-transform duration-300 origin-left scale-x-0 rounded-full md:block -bottom-1 bg-magenta group-hover:scale-x-100"></span>
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
        <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-5xl text-magenta">
          Razvan Paleacu's<br />
          Personal Portfolio
        </h1>
        <p className="max-w-xl text-base text-gray-600 sm:text-lg dark:text-gray-400">
          Creative crypto marketing specialist helping Web3 brands grow through strategy, content & community.
        </p>
      </div>
    </PageWrapper>
  )
}

function About() {
  return (
    <PageWrapper>
      <div className="max-w-3xl px-4 py-12 mx-auto sm:px-6 sm:py-16">
        <h2 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl text-magenta">About Me</h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          I'm a marketer who thrives in Web3. I specialize in building powerful narratives and communities for crypto startups.
        </p>
        <div className="mb-6">
          <a 
            href="/resume.pdf" 
            download
            className="inline-flex items-center px-4 py-2 text-sm font-medium transition border rounded-md text-magenta border-magenta hover:bg-magenta hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>
        <img src="/IMG_7022.JPG" alt="About" className="w-full rounded-xl shadow-lg max-h-[1000px] object-cover relative z-10" />
      </div>
    </PageWrapper>
  )
}

function Contact() {
  return (
    <PageWrapper>
      <div className="max-w-3xl px-4 py-12 mx-auto sm:px-6 sm:py-16">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl text-magenta">Contact</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          Reach me at <a href="mailto:hello@razvancrypto.xyz" className="underline text-magenta">hello@razvancrypto.xyz</a>
        </p>
        <div className="flex space-x-4 text-sm">
          <a href="https://twitter.com" className="transition hover:text-magenta">Twitter</a>
          <a href="https://linkedin.com" className="transition hover:text-magenta">LinkedIn</a>
          <a href="https://github.com" className="transition hover:text-magenta">GitHub</a>
        </div>
      </div>
    </PageWrapper>
  )
}

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set isLoaded to true after component mounts to trigger animations
    setIsLoaded(true)
  }, [])

  const faqItems = [
    {
      question: "What is cryptocurrency?",
      answer: "Cryptocurrency is a digital or virtual form of currency that uses cryptography for security and operates on a technology called blockchain. Unlike traditional currencies issued by governments (fiat), cryptocurrencies are typically decentralized and operate on distributed ledger technology."
    },
    {
      question: "What is blockchain technology?",
      answer: "Blockchain is a distributed, immutable ledger that records transactions across many computers. This technology ensures that no single entity controls the data, making it transparent, secure, and resistant to modification. Each 'block' contains a number of transactions, and once completed, it's added to the 'chain' of previous blocks."
    },
    {
      question: "What's the difference between Bitcoin and Ethereum?",
      answer: "Bitcoin was the first cryptocurrency, designed primarily as a digital alternative to fiat currencies. Ethereum, while also a cryptocurrency, is a platform that enables developers to build and deploy decentralized applications (dApps) and smart contracts. While Bitcoin's primary use case is as a store of value and medium of exchange, Ethereum provides a platform for innovation in the blockchain space."
    },
    {
      question: "What are smart contracts?",
      answer: "Smart contracts are self-executing contracts with the terms directly written into code. They automatically execute when predetermined conditions are met, without the need for intermediaries. Smart contracts are typically built on blockchain platforms like Ethereum and enable trustless, automated transactions."
    },
    {
      question: "What is DeFi?",
      answer: "DeFi (Decentralized Finance) refers to financial services built on blockchain technology that aim to recreate and improve upon traditional financial systems without centralized authorities. DeFi applications include lending platforms, decentralized exchanges, stablecoins, and more, all operating without traditional intermediaries like banks."
    },
    {
      question: "What are NFTs?",
      answer: "NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of a specific item or piece of content on the blockchain. Unlike cryptocurrencies such as Bitcoin, which are fungible (each unit is identical), NFTs are unique and cannot be exchanged on a like-for-like basis. They're commonly used for digital art, collectibles, music, and other creative works."
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <PageWrapper>
      <div className="max-w-3xl px-4 py-12 mx-auto sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl text-magenta">FAQ</h2>
          <p className="mb-8 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Common questions and answers about cryptocurrency and blockchain technology.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="overflow-hidden border rounded-lg border-magenta"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="flex items-center justify-between w-full p-4 text-left bg-white dark:bg-dark"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: "rgba(236, 72, 153, 0.05)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium text-magenta">{item.question}</span>
                <motion.div
                  animate={{ 
                    rotate: activeIndex === index ? 180 : 0,
                    color: activeIndex === index ? "#ec4899" : "#ec4899"
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-magenta"
                >
                  ▼
                </motion.div>
              </motion.button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div 
                  className="p-4 text-sm text-gray-600 border-t dark:text-gray-400 border-magenta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {item.answer}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
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
      <div className="max-w-5xl px-4 py-12 mx-auto sm:px-6 sm:py-16">
        <h2 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl text-magenta">Projects</h2>
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
              className="p-4 sm:p-6 transition-transform duration-300 border bg-white dark:bg-dark border-magenta rounded-2xl hover:scale-[1.02]"
            >
              <div className="flex justify-center mb-4">
                <img src={project.logo} alt={project.title} className="h-12 sm:h-16" />
              </div>
              <h3 className="mb-2 text-lg font-semibold sm:text-xl text-magenta">{project.title}</h3>
              <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">{project.description}</p>
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
    <footer className="px-6 py-8 mt-16 text-sm text-center border-t border-magenta">
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
        <Route path="/faq" element={<FAQ />} />
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
      <AnimatedBackground />
      <div className="flex flex-col min-h-screen font-mono text-black transition-colors duration-300 bg-transparent dark:text-white">
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
