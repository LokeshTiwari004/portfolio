import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import './App.css'

function AppContent() {
  const { isDark } = useTheme()

  useEffect(() => {
    // Apply theme to html element for Tailwind dark mode
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg text-slate-900 dark:text-text-primary transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
