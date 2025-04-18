import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import { useRef, useState, useEffect } from 'react'

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

function HiddenPage() {
  const [lines, setLines] = useState(["> Welcome to the hidden terminal.", "> Type 'help' to see available commands."])
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  const handleCommand = (cmd) => {
    let response = []
    switch (cmd.toLowerCase()) {
      case 'help':
        response = [
          "Available commands:",
          "- whoami",
          "- projects",
          "- social",
          "- clear"
        ]; break;
      case 'whoami':
        response = ["Razvan – Web3 growth hacker, crypto marketing artist"]; break;
      case 'projects':
        response = [
          "- NFT Launch Campaign",
          "- DeFi Platform Growth",
          "- DAO Onboarding"
        ]; break;
      case 'social':
        response = [
          "Twitter → twitter.com/razvancrypto",
          "LinkedIn → linkedin.com/in/razvan"
        ]; break;
      case 'clear':
        setLines([])
        return
      default:
        response = ["Unknown command: " + cmd]
    }
    setLines(prev => [...prev, "> " + cmd, ...response])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim() !== "") {
        handleCommand(input.trim())
        setInput("")
      }
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <PageWrapper>
      <div className="min-h-screen px-6 py-20 font-mono text-sm text-green-400 bg-black">
        {lines.map((line, i) => <div key={i} className="whitespace-pre-wrap">{line}</div>)}
        <form onSubmit={(e) => e.preventDefault()} className="mt-2">
          <span className="text-magenta">$</span> <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-green-400 bg-black border-none outline-none"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </form>
        <div ref={bottomRef} className="h-10"></div>
      </div>
    </PageWrapper>
  )
}

// rest of code unchanged...
function App() {
  return (
    <Router>
      <div className="min-h-screen font-mono text-white bg-dark">
        <Navbar />
        <div className="pt-20">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
