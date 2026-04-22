import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Download, ExternalLink, Code, Mail, Share2, ChevronDown } from 'lucide-react'
import { loadProjectsData } from '../lib/markdown'
import ContactForm from '../components/ContactForm'
import { useIntersectionObserver } from '../utils/useIntersectionObserver'
import { useTheme } from '../context/ThemeContext'

export default function Landing() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [expandedProject, setExpandedProject] = useState(null)
  const [maxCardHeight, setMaxCardHeight] = useState(0)
  const projectsContainerRef = useRef(null)
  const { isDark } = useTheme()

  // Intersection observers for sections
  const [heroRef, heroVisible] = useIntersectionObserver()
  const [aboutRef, aboutVisible] = useIntersectionObserver()
  const [projectsRef, projectsVisible] = useIntersectionObserver()
  const [contactRef, contactVisible] = useIntersectionObserver()

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await loadProjectsData()
        const featured = projects.filter(p => p.featured)
        setFeaturedProjects(featured)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Measure max card height on initial load (when cards are collapsed)
  useEffect(() => {
    if (projectsContainerRef.current && !loading) {
      const cards = projectsContainerRef.current.querySelectorAll('[data-card]')
      if (cards.length > 0) {
        // Use a timeout to ensure DOM is fully rendered before measuring
        const timer = setTimeout(() => {
          const heights = Array.from(cards).map(card => card.offsetHeight)
          const max = Math.max(...heights)
          setMaxCardHeight(max)
        }, 0)
        return () => clearTimeout(timer)
      }
    }
  }, [loading])

  const skills = {
    "Programming": ["Python", "Java", "SQL", "Bash"],
    "ML/DL": ["PyTorch", "Scikit-learn", "HuggingFace", "TensorFlow"],
    "Data Tools": ["Pandas", "NumPy", "Matplotlib", "Plotly"],
    "DevOps": ["Git", "Docker", "Jupyter Notebooks", "VS Code"],
    "Concepts": ["Neural Networks", "NLP", "Deep Learning", "Supervised Learning"]
  }

  return (
    <div className="w-full">
      {/* HERO SECTION with Parallax */}
      <section
        ref={heroRef}
        id="hero"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${heroVisible ? 'reveal-up' : ''}`}
        style={{ backgroundPosition: `0 ${scrollY * 0.5}px` }}
      >
        {/* Parallax Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(/data/${isDark ? 'bg.png' : 'bg-light.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%)',
            }}
          ></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#0F766E] to-transparent rounded-full blur-3xl opacity-20 animate-pulse" style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#14B8A6] to-transparent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s', transform: `translateY(${scrollY * 0.25}px)` }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold text-accent bg-slate-100 dark:bg-[#1E293B] px-4 py-2 rounded-full border border-[#0F766E]">
                Data Science Student | IIT Madras
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Hi, I'm <span className="gradient-text">Lokesh Tiwari</span>
            </h1>

            {/* Subheading */}
            <p className="text-2xl md:text-3xl text-slate-600 dark:text-[#94A3B8] mb-12 leading-relaxed max-w-3xl mx-auto">
              Building Deep Learning solutions | NLP Enthusiast | Kaggle Competitor
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <a href="#projects" className="btn-primary inline-flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 transition-all duration-200 group">
                View My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a href="#contact" className="btn-secondary inline-flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 transition-all duration-200">
                Get In Touch
              </a>
              <a href="/Resume.pdf" download="Lokesh_Tiwari_Resume.pdf" className="btn-secondary inline-flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 transition-all duration-200 group">
                <Download size={20} className="group-hover:animate-bounce" />
                Download Resume
              </a>
            </div>

            {/* Stats */}
             <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto mt-16">
               <div className="text-center">
                 <div className="text-5xl font-bold gradient-text mb-2">9.16</div>
                 <p className="text-slate-600 dark:text-[#94A3B8]">CGPA</p>
               </div>
               <div className="text-center">
                 <div className="text-5xl font-bold gradient-text mb-2">4</div>
                 <p className="text-slate-600 dark:text-[#94A3B8]">Projects</p>
               </div>
             </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section 
        ref={aboutRef}
        id="about" 
        className={`py-32 bg-slate-100 dark:bg-[#0A0F1F] transition-colors duration-300 ${aboutVisible ? 'reveal-up' : ''}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">About Me</h2>

          <div className="max-w-4xl mx-auto mb-20">
            <div className="card mb-12">
              <p className="text-xl text-slate-600 dark:text-[#94A3B8] mb-6 leading-relaxed">
                I'm a passionate Data Science student at IIT Madras with a strong focus on Deep Learning and Natural Language Processing. With a CGPA of 9.16/10, I've built practical ML solutions that tackle real-world problems.
              </p>
              <p className="text-xl text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                My expertise spans from fine-tuning Transformer models to building scalable neural networks. I'm driven by the intersection of theory and application, consistently pushing the boundaries of what's possible with modern ML techniques.
              </p>
            </div>

             {/* Skills Grid */}
             <div className="mb-20">
               <h3 className="text-3xl font-bold mb-8">Technical Skills</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                 {Object.entries(skills).map(([category, skillList], idx) => (
                   <div key={category} className={`card hover:border-accent hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95 ${aboutVisible ? `reveal-up stagger-${idx + 1}` : ''}`}>
                     <h4 className="font-bold text-[#14B8A6] mb-4 group-hover:text-[#20C997] transition-colors duration-200">{category}</h4>
                     <ul className="space-y-2">
                       {skillList.map((skill) => (
                         <li key={skill} className="text-slate-600 dark:text-[#94A3B8] text-sm flex items-start hover:text-[#14B8A6] transition-colors duration-200 cursor-default">
                           <span className="text-accent mr-2 group-hover:text-[#20C997] transition-colors duration-200">→</span>
                           {skill}
                         </li>
                       ))}
                     </ul>
                   </div>
                 ))}
               </div>
             </div>

             {/* Education */}
             <div>
               <h3 className="text-3xl font-bold mb-8">Education</h3>
               <div className="space-y-6">
                 <div className="card hover:border-accent hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95">
                   <div className="flex justify-between items-start mb-2">
                     <div>
                       <h4 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors duration-200">BS in Data Science and Applications</h4>
                       <p className="text-[#14B8A6] font-semibold group-hover:text-[#20C997] transition-colors duration-200">Indian Institute of Technology Madras</p>
                     </div>
                     <span className="text-slate-600 dark:text-[#94A3B8]">2022 - 2027</span>
                   </div>
                   <p className="text-slate-600 dark:text-[#94A3B8]">CGPA: 9.16/10.0</p>
                 </div>
                 <div className="card hover:border-accent hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95">
                   <div className="flex justify-between items-start mb-2">
                     <div>
                       <h4 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors duration-200">High School & Intermediate</h4>
                       <p className="text-[#14B8A6] font-semibold group-hover:text-[#20C997] transition-colors duration-200">Central Hindu Boys School</p>
                     </div>
                     <span className="text-slate-600 dark:text-[#94A3B8]">2017 - 2021</span>
                   </div>
                   <p className="text-slate-600 dark:text-[#94A3B8]">Percentage: 95%</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION with Parallax */}
      <section 
        ref={projectsRef}
        id="projects" 
        className={`py-32 relative overflow-hidden ${projectsVisible ? 'reveal-up' : ''}`}
      >
        {/* Parallax Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{ transform: `translateY(${(scrollY - 1500) * 0.2}px)` }}
        >
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-[#0F766E] to-transparent rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">Featured Projects</h2>

           <div className="overflow-x-auto pb-4 -mx-4 px-4 scroll-container">
             <div className="flex gap-8 min-w-max items-start" ref={projectsContainerRef}>
               {!loading && featuredProjects.length > 0 ? (
                  featuredProjects.map((project) => (
                    <div
                      key={project.id}
                      data-card
                      className={`card group w-96 flex-shrink-0 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col`}
                      style={{ minHeight: expandedProject !== project.id && maxCardHeight > 0 ? `${maxCardHeight}px` : 'auto' }}
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                    >
                      <div className="flex-1">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {project.image}
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-slate-600 dark:text-[#94A3B8] mb-4">
                        {project.description}
                      </p>

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
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-[#1E293B] mt-auto">
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedProject(expandedProject === project.id ? null : project.id);
                          }}
                          className={`flex-1 inline-flex items-center justify-center gap-2 text-accent hover:text-[#14B8A6] hover:bg-[#0F766E] hover:bg-opacity-20 transition-all duration-200 text-sm font-semibold py-2 rounded active:scale-95 ${expandedProject === project.id ? 'bg-[#0F766E] bg-opacity-20' : ''}`}
                          title={expandedProject === project.id ? 'Hide details' : 'Show details'}
                        >
                          <ChevronDown size={16} className={`transition-transform duration-300 ${expandedProject === project.id ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  ))
               ) : (
                 <div className="text-center py-8 w-full">
                   <p className="text-slate-600 dark:text-[#94A3B8]">Loading projects...</p>
                 </div>
               )}
             </div>
           </div>

           <div className="text-center mt-16">
             <a href="/projects" className="btn-primary inline-flex items-center gap-2 hover:shadow-lg transition-all duration-200 group">
               View All Projects
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
             </a>
           </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section 
        ref={contactRef}
        id="contact" 
        className={`py-32 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0A0F1F] dark:to-[#0F172A] transition-colors duration-300 ${contactVisible ? 'reveal-up' : ''}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">Let's Connect</h2>

           <div className="max-w-5xl mx-auto">
             {/* Contact Info Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
               <div className="card text-center hover:border-accent hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95">
                 <div className="mb-4 flex justify-center transition-all duration-300 group-hover:scale-110">
                   <Mail className="text-accent group-hover:scale-125 transition-transform duration-300" size={48} />
                 </div>
                 <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">Email</h3>
                 <a href="mailto:lokeshtiwari001vns@gmail.com" className="text-accent hover:text-[#14B8A6] font-semibold break-all hover:underline transition-all duration-200">
                   lokeshtiwari001vns@gmail.com
                 </a>
               </div>

                <div className="card text-center hover:border-accent hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95">
                  <div className="mb-4 flex justify-center transition-all duration-300 group-hover:scale-110">
                    <Share2 className="text-accent group-hover:scale-125 transition-transform duration-300" size={48} />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/lokesh-tiwari-24898b1b3/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-[#14B8A6] font-semibold hover:underline transition-all duration-200">
                    Lokesh Tiwari
                  </a>
                </div>

               <div className="card text-center hover:border-accent hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95">
                 <div className="mb-4 flex justify-center transition-all duration-300 group-hover:scale-110">
                   <Code className="text-accent group-hover:scale-125 transition-transform duration-300" size={48} />
                 </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">GitHub</h3>
                <a href="https://github.com/LokeshTiwari004" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-[#14B8A6] font-semibold">
                  @LokeshTiwari004
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
