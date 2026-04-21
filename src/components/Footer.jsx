export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-100 dark:bg-dark-surface border-t border-slate-200 dark:border-dark-surface mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">About</h3>
            <p className="text-slate-600 dark:text-text-secondary text-sm">
              A Data Scientist & Generalist passionate about building data-driven solutions and sharing knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Home</a></li>
              <li><a href="/projects" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Projects</a></li>
              <li><a href="/blog" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Blog</a></li>
              <li><a href="/about" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">About</a></li>
              <li><a href="/contact" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Follow</h3>
            <div className="flex gap-4">
              <a href="#" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">Twitter</a>
              <a href="#" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">GitHub</a>
              <a href="#" className="text-slate-600 dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 dark:border-dark-surface pt-8">
          <p className="text-center text-slate-600 dark:text-text-secondary text-sm">
            © {currentYear} Your Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
