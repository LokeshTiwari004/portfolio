import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '/blog' }
  ]

  return (
    <header className="bg-white dark:bg-dark-surface border-b border-slate-200 dark:border-dark-surface sticky top-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="font-heading font-bold text-2xl gradient-text hover:opacity-80 transition-opacity">
          Lokesh
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors smooth-scroll"
            >
              {link.label}
            </a>
          ))}
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
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-700 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors smooth-scroll"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
