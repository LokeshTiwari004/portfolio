import { useState, useEffect } from 'react'
import { ExternalLink, Code } from 'lucide-react'
import { loadProjectsData } from '../lib/markdown'

export default function Projects() {
  const [allProjects, setAllProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [categories, setCategories] = useState(["All"])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await loadProjectsData()
        setAllProjects(projects)
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(projects.map(p => p.category))]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const filteredProjects = selectedCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p className="text-slate-600 dark:text-[#94A3B8]">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Projects</h1>
            <p className="text-xl text-slate-600 dark:text-[#94A3B8]">
              A selection of projects I've built ranging from data analytics, machine learning, and full-stack development.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 mb-16 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white'
                    : 'border border-accent text-accent hover:bg-accent hover:bg-opacity-10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="card group h-full flex flex-col transform transition-all duration-300 hover:scale-105"
              >
                {/* Project Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-slate-600 dark:text-[#94A3B8] mb-6 flex-grow text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-accent bg-[#0F766E] bg-opacity-30 dark:bg-opacity-30 px-3 py-1 rounded-full border border-[#0F766E]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics (if available) */}
                {project.metrics && (
                  <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-[#2E3E4E]">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-xs text-slate-600 dark:text-[#94A3B8] capitalize">{key}</span>
                        <span className="text-sm font-bold text-[#14B8A6]">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-[#2E3E4E]">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-accent hover:text-[#14B8A6] transition-colors text-sm font-semibold py-2 rounded hover:bg-[#0F766E] hover:bg-opacity-20"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-accent hover:text-[#14B8A6] transition-colors text-sm font-semibold py-2 rounded hover:bg-[#0F766E] hover:bg-opacity-20"
                  >
                    <Code size={16} />
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-600 dark:text-[#94A3B8] text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-opacity-10 border border-[#14B8A6] border-opacity-30 dark:border-opacity-30 rounded-2xl mx-4 md:mx-0">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-slate-600 dark:text-[#94A3B8] mb-6">Let's collaborate and build something amazing together.</p>
          <button className="btn-primary">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  )
}
