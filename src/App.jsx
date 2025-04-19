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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('nav')) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-white border-b dark:bg-dark backdrop-blur-sm border-magenta">
      <button
        onClick={toggleTheme}
        className="px-2 py-1 text-xs font-semibold transition border rounded text-magenta border-magenta hover:bg-magenta hover:text-black"
        aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="md:hidden">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen(!menuOpen)
          }}
          className="p-2 text-magenta focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      <div className={`absolute md:static top-16 right-0 left-0 mx-4 md:mx-0 md:right-auto md:top-auto md:left-auto bg-white dark:bg-dark md:bg-transparent md:dark:bg-transparent border md:border-none rounded-lg shadow-lg md:shadow-none md:flex md:space-x-6 space-y-3 md:space-y-0 px-6 py-4 md:p-0 ${menuOpen ? 'block' : 'hidden'} md:block z-50`}> 
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
      <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-24 sm:pt-32 text-center">
        <h1 className="mb-4 sm:mb-6 text-3xl font-bold leading-tight sm:text-5xl text-magenta">
          Razvan Paleacu's<br />
          Personal Portfolio
        </h1>
        <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          15-year-old competitive athlete from Timisoara with a passion for athletics and UFC. Explore my journey, achievements, and interests.
        </p>
        <div className="mt-8 sm:mt-12">
          <Link 
            to="/projects" 
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium transition border rounded-md text-magenta border-magenta hover:bg-magenta hover:text-white"
          >
            View My Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}

function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const galleryImages = [
    { src: "/IMG_7022.JPG", alt: "Gallery image 1" },
    { src: "/whatthehell.jpeg", alt: "Gallery image 2" },
    { src: "/nig.jpeg", alt: "Gallery image 3" },
    { src: "/negrutprostut.jpeg", alt: "Gallery image 4" }
  ];

  return (
    <PageWrapper>
      <div className="max-w-3xl px-4 py-12 mx-auto sm:px-6 sm:py-16">
        <h2 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl text-magenta">About Me</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          My name is Razvan Paleacu Ionut, and I'm a 15-year-old from Timisoara. I'm passionate about competitive athletics and enjoy watching UFC in my free time.
        </p>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          As a dedicated athlete, I strive for excellence in everything I do. My journey in athletics has taught me discipline, perseverance, and the importance of continuous improvement.
        </p>

        <div className="mb-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-magenta">My Interests & Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-magenta bg-opacity-10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">Athletics</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Competitive training and participation in athletic events</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-magenta bg-opacity-10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">UFC</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Following and analyzing mixed martial arts competitions</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-magenta bg-opacity-10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">Learning</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Constantly improving my skills and knowledge</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-magenta bg-opacity-10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">Teamwork</h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Collaborating effectively with others</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-magenta">My Athletic Journey</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 shadow-sm">
            <div className="space-y-4">
              <div className="border-l-4 border-magenta pl-4 py-1">
                <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">Achievements</h4>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-magenta mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Participated in regional athletics competitions</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-magenta mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Improved personal records in running events</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-magenta mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Trained with experienced coaches to refine technique</span>
                  </li>
                </ul>
              </div>
              <div className="border-l-4 border-magenta pl-4 py-1">
                <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">Future Goals</h4>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-magenta mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Qualify for national athletics championships</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-magenta mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Develop specialized skills in my preferred athletic events</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-magenta mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Inspire other young athletes to pursue their dreams</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

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
        <div className="mt-8">
          <h3 className="mb-2 text-xl font-semibold text-magenta">My Photo Gallery</h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">A glimpse into my athletic journey and personal moments. Click on any image to view it in full size.</p>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="cursor-pointer relative overflow-hidden rounded-xl shadow-lg group"
                onClick={() => openImage(image.src)}
                role="button"
                aria-label={`View ${image.alt}`}
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openImage(image.src);
                  }
                }}
              >
                <div className="absolute inset-0 bg-magenta opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="p-2 bg-magenta bg-opacity-80 rounded-full text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Full-size image modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-90"
            onClick={closeImage}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <div className="relative max-w-full max-h-full">
              <button 
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 text-white bg-magenta rounded-full hover:bg-opacity-80 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  closeImage();
                }}
                aria-label="Close image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="overflow-hidden touch-manipulation">
                <img 
                  src={selectedImage} 
                  alt="Full size" 
                  className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

function Contact() {
  return (
    <PageWrapper>
      <div className="max-w-3xl px-4 py-10 mx-auto sm:px-6 sm:py-16">
        <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl text-magenta">Contact</h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 sm:text-base leading-relaxed">
          Reach me at <a href="mailto:razvan.paleacu@gmail.com" className="underline text-magenta hover:text-opacity-80 transition-colors">razvan.paleacu@gmail.com</a>
        </p>

        <div className="mb-8 p-4 sm:p-6 border border-magenta rounded-lg bg-white bg-opacity-50 dark:bg-dark dark:bg-opacity-50">
          <h3 className="mb-3 text-lg font-medium text-magenta">Connect With Me</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <a 
              href="https://x.com/razvanp157" 
              className="flex items-center px-4 py-2 transition border rounded-md text-magenta border-magenta hover:bg-magenta hover:text-white"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </a>
            <a 
              href="https://www.linkedin.com/in/razvan-paleacu-811336229/" 
              className="flex items-center px-4 py-2 transition border rounded-md text-magenta border-magenta hover:bg-magenta hover:text-white"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              href="https://github.com/razvanpaleacu" 
              className="flex items-center px-4 py-2 transition border rounded-md text-magenta border-magenta hover:bg-magenta hover:text-white"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
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
      <div className="max-w-3xl px-4 py-10 mx-auto sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl text-magenta">FAQ</h2>
          <p className="mb-6 sm:mb-8 text-sm text-gray-600 dark:text-gray-400 sm:text-base leading-relaxed">
            Common questions and answers about cryptocurrency and blockchain technology.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-3 sm:space-y-4"
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
                className="flex items-center justify-between w-full p-3 sm:p-4 text-left bg-white dark:bg-dark"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: "rgba(236, 72, 153, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={activeIndex === index}
              >
                <span className="font-medium text-magenta text-sm sm:text-base pr-2">{item.question}</span>
                <motion.div
                  animate={{ 
                    rotate: activeIndex === index ? 180 : 0,
                    color: activeIndex === index ? "#ec4899" : "#ec4899"
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-magenta flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
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
                  className="p-3 sm:p-4 text-xs sm:text-sm text-gray-600 border-t dark:text-gray-400 border-magenta leading-relaxed"
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
      <div className="max-w-5xl px-4 py-10 mx-auto sm:px-6 sm:py-16">
        <h2 className="mb-5 text-2xl font-bold sm:mb-8 sm:text-3xl text-magenta">Projects</h2>

        {/* Filter buttons - scrollable on mobile */}
        <div className="flex mb-6 sm:mb-10 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <div className="flex gap-2 sm:gap-3 flex-nowrap sm:flex-wrap">
            {["All", "DePIN", "AI", "Infra"].map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-3 sm:px-4 py-1 rounded-full border text-sm whitespace-nowrap transition ${
                  filter === tag
                    ? "border-magenta text-magenta bg-magenta bg-opacity-5"
                    : "border-gray-500 text-gray-400 hover:border-magenta hover:text-magenta"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <motion.div 
          layout 
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2"
        >
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-4 sm:p-6 transition-transform duration-300 border bg-white dark:bg-dark border-magenta rounded-xl sm:rounded-2xl hover:shadow-lg"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <img 
                    src={project.logo} 
                    alt={project.title} 
                    className="h-10 sm:h-16" 
                    loading="lazy"
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold sm:text-xl text-magenta">{project.title}</h3>
                <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">{project.description}</p>
                <span className="inline-block px-3 py-1 mt-3 sm:mt-4 text-xs border rounded-full text-magenta border-magenta">
                  {project.tag}
                </span>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No projects found with this filter.</p>
            </div>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  )
}

function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-6 sm:py-8 mt-12 sm:mt-16 text-xs sm:text-sm text-center border-t border-magenta">
      <div className="max-w-5xl mx-auto">
        <p className="text-gray-500 mb-2">&copy; 2025 Razvan. Built for the Web3 era.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a 
            href="https://twitter.com" 
            className="text-gray-500 hover:text-magenta transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a 
            href="https://linkedin.com" 
            className="text-gray-500 hover:text-magenta transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href="https://github.com" 
            className="text-gray-500 hover:text-magenta transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
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
