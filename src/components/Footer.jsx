export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-100 dark:bg-dark-surface border-t border-slate-200 dark:border-dark-surface mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Lokesh Tiwari</h3>
            <p className="text-slate-600 dark:text-text-secondary text-sm">
              Data Science Student at IIT Madras | Deep Learning & NLP Enthusiast | Building ML Solutions
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">About</a></li>
              <li><a href="#projects" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Contact</a></li>
              <li><a href="/blog" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com/LokeshTiwari004" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/lokeshtiwari" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">LinkedIn</a>
              <a href="mailto:lokeshtiwari001vns@gmail.com" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Email</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 dark:border-dark-surface pt-8">
          <p className="text-center text-slate-600 dark:text-text-secondary text-sm">
            © {currentYear} Lokesh Tiwari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
