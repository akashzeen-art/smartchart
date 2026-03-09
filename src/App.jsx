import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Features from './Components/Features'
import Stories from './Components/Stories'
import FAQ from './Components/FAQ'
import Pricing from './Components/Pricing'
import VoiceRecording from './Components/VoiceRecording'
import Preloader from './Components/Preloader'

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  useEffect(() => {
    if (location.pathname === "/" && !showPreloader && !initialLoadDone) {
      setShowPreloader(true)
      setLoading(true)
      const fadeTimer = setTimeout(() => {
        setFadeOut(true)
      }, 3000)

      const loadTimer = setTimeout(() => {
        setLoading(false)
        setShowPreloader(false)
        setInitialLoadDone(true)
      }, 4000)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(loadTimer)
      }
    } else {
      setLoading(false)
      setShowPreloader(false)
      setFadeOut(false)
    }
  }, [location.pathname, initialLoadDone])

  if (loading && showPreloader) {
    return <Preloader fadeOut={fadeOut} />
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/voice" element={<VoiceRecording />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
