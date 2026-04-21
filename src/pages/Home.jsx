import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadProjectsData, loadAllMarkdownPosts } from '../lib/markdown'

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [latestPosts, setLatestPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load featured projects
        const projects = await loadProjectsData()
        const featured = projects.filter(p => p.featured).slice(0, 3)
        setFeaturedProjects(featured)

        // Load latest blog posts
        const posts = await loadAllMarkdownPosts()
        const latest = posts
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3)
        setLatestPosts(latest)
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#0F766E] to-transparent rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#14B8A6] to-transparent rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Greeting Badge */}
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold text-accent bg-slate-100 dark:bg-[#1E293B] px-4 py-2 rounded-full border border-[#0F766E]">
                Welcome to my portfolio
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Hi, I'm <span className="gradient-text">Your Name</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-[#94A3B8] mb-8 leading-relaxed">
              Data Scientist & Generalist turning data into insights and building innovative solutions
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/projects" className="btn-primary">
                View My Projects
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text">15+</div>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm mt-2">Projects Completed</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text">50+</div>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm mt-2">Happy Clients</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text">5yrs</div>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm mt-2">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] text-lg">
              Showcase of my recent work across data science, analytics, and automation projects.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <Link key={project.id} to="/projects" className="group">
                  <div className="card h-full">
                    {/* Icon */}
                    <div className="text-6xl mb-4">{project.image}</div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-[#94A3B8] mb-4 flex-grow">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold text-accent bg-[#0F766E] bg-opacity-20 dark:bg-opacity-30 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-slate-600 dark:text-[#94A3B8]">Loading projects...</p>
              </div>
            )}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">
              View All Projects
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-20 md:py-32 bg-slate-100 dark:bg-[#0A0F1F] rounded-2xl mx-4 md:mx-0 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Latest Articles</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] text-lg">
              Thoughts, insights, and tutorials on data science, machine learning, and technology.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                  <div className="card h-full flex flex-col">
                    {/* Date and Read Time */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm text-accent">{post.date}</span>
                      <span className="text-sm text-slate-600 dark:text-[#94A3B8]">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors flex-grow">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 dark:text-[#94A3B8] mb-4 line-clamp-2 text-sm">
                      {post.content.substring(0, 100)}...
                    </p>

                    {/* Read More */}
                    <div className="inline-flex items-center gap-2 text-accent group-hover:text-[#14B8A6] transition-colors">
                      Read more
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-slate-600 dark:text-[#94A3B8]">Loading blog posts...</p>
              </div>
            )}
          </div>

          {/* View All Posts Button */}
          <div className="text-center mt-12">
            <Link to="/blog" className="btn-primary">
              Read All Articles
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-opacity-10 border border-[#14B8A6] border-opacity-30 dark:border-opacity-30 rounded-2xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] text-lg mb-8">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
            <Link to="/contact" className="btn-primary">
              Get In Touch
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
