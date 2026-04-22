import { useState, useEffect } from 'react'
import { ExternalLink, Code, Search, Filter } from 'lucide-react'
import { loadProjectsData } from '../lib/markdown'
import { useIntersectionObserver } from '../utils/useIntersectionObserver'

export default function Projects() {
  const [allProjects, setAllProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [categories, setCategories] = useState(["All"])
  const [expandedProject, setExpandedProject] = useState(null)
  const [projectsRef, projectsVisible] = useIntersectionObserver()

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await loadProjectsData()
        setAllProjects(projects)

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(projects.map(p => p.category))]
        setCategories(uniqueCategories)
        setFilteredProjects(projects)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Filter projects based on search and category
  useEffect(() => {
    let filtered = allProjects

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredProjects(filtered)
  }, [searchQuery, selectedCategory, allProjects])

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p className="text-slate-600 dark:text-[#94A3B8]">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        ref={projectsRef}
        className={`py-16 md:py-24 mb-12 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0A0F1F] dark:to-[#0F172A] transition-colors duration-300 ${projectsVisible ? 'reveal-up' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">My Projects</h1>
            <p className="text-xl text-slate-600 dark:text-[#94A3B8]">
              A showcase of my work in machine learning, deep learning, data science, and software development.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-[#94A3B8]" size={20} />
              <input
                type="text"
                placeholder="Search projects by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] text-slate-900 dark:text-white placeholder-slate-600 dark:placeholder-[#94A3B8] rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#14B8A6] transition-colors duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 mb-16 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <Filter size={20} className="text-slate-600 dark:text-[#94A3B8]" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 active:scale-95 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white shadow-lg'
                    : 'border border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:bg-opacity-10 hover:shadow-md'
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
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className={`h-full ${projectsVisible ? `reveal-up stagger-${(idx % 5) + 1}` : ''}`}
                >
                  <div
                    className="card group h-full hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  >
                    {/* Header with Icon and Featured Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </div>
                      {project.featured && (
                        <span className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors">
                      {project.title}
                    </h3>

                    {/* Category Badge */}
                    <span className="text-xs font-semibold text-accent bg-[#0F766E] bg-opacity-20 dark:bg-opacity-30 px-3 py-1 rounded-full w-fit mb-4">
                      {project.category}
                    </span>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-[#94A3B8] mb-4 flex-grow">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-[#1E293B]">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-xs text-slate-600 dark:text-[#94A3B8] capitalize">{key}</span>
                            <span className="text-sm font-bold text-[#14B8A6]">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold text-accent bg-[#0F766E] bg-opacity-20 dark:bg-opacity-30 px-3 py-1 rounded-full hover:bg-opacity-40 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Details */}
                    {expandedProject === project.id && (
                      <div className={`mb-6 pb-6 border-b border-slate-200 dark:border-[#1E293B] ${expandedProject === project.id ? 'slide-up' : ''}`}>
                        <h4 className="font-bold text-[#14B8A6] mb-3 text-sm">Project Details</h4>
                        {project.details && (
                          <p className="text-xs text-slate-600 dark:text-[#94A3B8] mb-3 leading-relaxed">
                            {project.details}
                          </p>
                        )}
                        {project.keyFeatures && (
                          <div>
                            <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Key Features:</p>
                            <ul className="text-xs text-slate-600 dark:text-[#94A3B8] space-y-1">
                              {project.keyFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-accent mr-2">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-[#1E293B]">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 text-accent hover:text-[#14B8A6] hover:bg-[#0F766E] hover:bg-opacity-20 transition-all duration-200 text-sm font-semibold py-2 rounded active:scale-95"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 text-accent hover:text-[#14B8A6] hover:bg-[#0F766E] hover:bg-opacity-20 transition-all duration-200 text-sm font-semibold py-2 rounded active:scale-95"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Code size={16} />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-600 dark:text-[#94A3B8] text-lg mb-4">
                No projects found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                className="btn-secondary hover:shadow-lg transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Results Count */}
          {filteredProjects.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-slate-600 dark:text-[#94A3B8]">
                Showing {filteredProjects.length} of {allProjects.length} projects
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-opacity-10 border border-[#14B8A6] border-opacity-30 rounded-2xl mx-4 md:mx-0 mb-20 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in My Work?</h2>
          <p className="text-slate-600 dark:text-[#94A3B8] mb-6">Check out my GitHub for more projects and contributions.</p>
          <a
            href="https://github.com/LokeshTiwari004"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 hover:shadow-lg transition-all duration-200"
          >
            Visit GitHub
          </a>
        </div>
      </section>
    </div>
  )
}
