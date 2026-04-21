import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-dark-surface border-b border-slate-200 dark:border-dark-surface sticky top-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-heading font-bold text-2xl gradient-text">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Home</Link>
          <Link to="/projects" className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Projects</Link>
          <Link to="/blog" className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Blog</Link>
          <Link to="/about" className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">About</Link>
          <Link to="/contact" className="btn-primary">Contact</Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2D3E52] transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-slate-700" />}
          </button>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="md:hidden flex gap-2 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2D3E52] transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-slate-700" />}
          </button>
          <button
            className="flex flex-col gap-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`block h-0.5 w-6 bg-slate-700 dark:bg-accent transition ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-slate-700 dark:bg-accent transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-slate-700 dark:bg-accent transition ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-dark-surface border-b border-slate-200 dark:border-dark-surface md:hidden transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Home</Link>
              <Link to="/projects" className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Projects</Link>
              <Link to="/blog" className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Blog</Link>
              <Link to="/about" className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">About</Link>
              <Link to="/contact" className="btn-primary w-full">Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
