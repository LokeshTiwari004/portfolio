import { Download, Mail, MessageCircle, Share2, Code } from 'lucide-react'

export default function About() {
  const skills = {
    "Data Science & ML": ["Machine Learning", "Python", "TensorFlow", "Scikit-learn", "Statistical Analysis"],
    "Data Engineering": ["ETL Pipelines", "SQL", "Apache Spark", "Data Warehousing", "Web Scraping"],
    "Data Visualization": ["Tableau", "Power BI", "Matplotlib", "Plotly", "Data Storytelling"],
    "Backend & Frontend": ["React", "Python/Django", "JavaScript", "PostgreSQL", "APIs"],
    "Tools & Platforms": ["Git", "Docker", "AWS", "Jupyter", "Linux"]
  }

  const experience = [
    {
      title: "Senior Data Scientist",
      company: "Tech Company",
      duration: "2022 - Present",
      description: "Led ML projects for customer insights, built recommendation systems, and mentored junior team members.",
      highlights: ["Developed ML models with 94% accuracy", "Built automated reporting dashboards", "Led team of 3 engineers"]
    },
    {
      title: "Data Analyst",
      company: "Analytics Firm",
      duration: "2020 - 2022",
      description: "Performed statistical analysis, created dashboards, and provided actionable business insights.",
      highlights: ["Created 50+ data visualizations", "Reduced query time by 40%", "Led 10+ client projects"]
    },
    {
      title: "Junior Developer",
      company: "Startup",
      duration: "2019 - 2020",
      description: "Developed full-stack features, worked with databases, and contributed to product development.",
      highlights: ["Built REST APIs", "Implemented database optimizations", "Launched 3 product features"]
    }
  ]

  const education = [
    {
      degree: "Master's in Data Science",
      school: "University Name",
      year: "2019",
      details: "Focus on Machine Learning and Statistical Analysis"
    },
    {
      degree: "Bachelor's in Computer Science",
      school: "University Name",
      year: "2017",
      details: "Minor in Mathematics"
    }
  ]

  const certifications = [
    "TensorFlow Developer Certificate",
    "AWS Certified Machine Learning",
    "Google Data Analytics Certificate",
    "Advanced Python for Data Science"
  ]

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              I'm a passionate Data Scientist and Generalist with 5+ years of experience turning data into actionable insights. 
              I specialize in machine learning, data engineering, and building scalable solutions that drive business impact.
            </p>
          </div>
        </div>
      </section>

       {/* Profile Section */}
       <section className="py-16 mb-16 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Avatar & Bio */}
            <div className="md:col-span-2">
               <div className="card">
                 <h2 className="text-2xl font-bold mb-4">Professional Background</h2>
                 <p className="text-slate-600 dark:text-[#94A3B8] mb-4 leading-relaxed">
                   With a background in Computer Science and a Master's in Data Science, I've worked across various industries 
                   solving complex data problems. My expertise spans from building ML models to engineering data pipelines and 
                   creating compelling visualizations.
                 </p>
                 <p className="text-slate-600 dark:text-[#94A3B8] mb-6 leading-relaxed">
                   I'm passionate about continuous learning, staying updated with the latest technologies, and sharing knowledge 
                   with the community through writing and mentoring.
                 </p>
                <div className="flex flex-wrap gap-4">
                  <a href="mailto:you@example.com" className="btn-primary">
                    <Mail size={20} />
                    Contact Me
                  </a>
                  <a href="#resume" className="btn-secondary">
                    <Download size={20} />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>

             {/* Quick Stats */}
             <div className="space-y-4">
               <div className="card text-center">
                 <div className="text-4xl font-bold gradient-text mb-2">5+</div>
                 <p className="text-slate-600 dark:text-[#94A3B8]">Years Experience</p>
               </div>
               <div className="card text-center">
                 <div className="text-4xl font-bold gradient-text mb-2">15+</div>
                 <p className="text-slate-600 dark:text-[#94A3B8]">Projects Completed</p>
               </div>
               <div className="card text-center">
                 <div className="text-4xl font-bold gradient-text mb-2">50+</div>
                 <p className="text-slate-600 dark:text-[#94A3B8]">Happy Clients</p>
               </div>
             </div>
          </div>
        </div>
      </section>

       {/* Skills Section */}
       <section className="py-16 mb-16 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Skills & Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
             {Object.entries(skills).map(([category, skillList]) => (
               <div key={category} className="card">
                 <h3 className="text-lg font-bold mb-4 text-[#14B8A6]">{category}</h3>
                 <ul className="space-y-2">
                   {skillList.map((skill) => (
                     <li key={skill} className="text-slate-600 dark:text-[#94A3B8] text-sm flex items-start">
                       <span className="text-accent mr-2">→</span>
                       {skill}
                     </li>
                   ))}
                 </ul>
               </div>
             ))}
          </div>
        </div>
      </section>

       {/* Experience Section */}
       <section className="py-16 mb-16 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Experience</h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {experience.map((job, index) => (
              <div key={index} className="card">
               <div className="flex justify-between items-start mb-3">
                   <div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{job.title}</h3>
                     <p className="text-[#14B8A6] font-semibold">{job.company}</p>
                   </div>
                   <span className="text-slate-600 dark:text-[#94A3B8] text-sm whitespace-nowrap ml-4">{job.duration}</span>
                 </div>
                 
                 <p className="text-slate-600 dark:text-[#94A3B8] mb-4">{job.description}</p>
                 
                 <ul className="space-y-2">
                   {job.highlights.map((highlight, idx) => (
                     <li key={idx} className="text-slate-600 dark:text-[#94A3B8] text-sm flex items-start">
                       <span className="text-accent mr-2">✓</span>
                       {highlight}
                     </li>
                   ))}
                 </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Education Section */}
       <section className="py-16 mb-16 border-b border-slate-200 dark:border-[#1E293B]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Education */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Education</h2>
              <div className="space-y-6">
                 {education.map((edu, index) => (
                   <div key={index} className="card">
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{edu.degree}</h3>
                     <p className="text-[#14B8A6] font-semibold mb-2">{edu.school}</p>
                     <p className="text-slate-600 dark:text-[#94A3B8] text-sm mb-2">{edu.year}</p>
                     <p className="text-slate-600 dark:text-[#94A3B8] text-sm">{edu.details}</p>
                   </div>
                 ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Certifications</h2>
              <div className="space-y-3">
                 {certifications.map((cert, index) => (
                   <div key={index} className="card p-4">
                     <div className="flex items-center gap-3">
                       <span className="text-accent text-xl">🏆</span>
                       <span className="text-slate-900 dark:text-white font-semibold">{cert}</span>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Social Links Section */}
       <section className="py-16 mb-20 bg-slate-100 dark:bg-[#0A0F1F] rounded-2xl transition-colors duration-300">
         <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold mb-8">Connect With Me</h2>
           
           <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto mb-12">
             <a
               href="https://github.com"
               target="_blank"
               rel="noopener noreferrer"
               className="card inline-flex items-center gap-3 px-6 py-4 hover:border-[#14B8A6]"
             >
               <Code size={24} className="text-accent" />
               <span className="font-semibold">GitHub</span>
             </a>
             <a
               href="https://linkedin.com"
               target="_blank"
               rel="noopener noreferrer"
               className="card inline-flex items-center gap-3 px-6 py-4 hover:border-[#14B8A6]"
             >
               <MessageCircle size={24} className="text-accent" />
               <span className="font-semibold">LinkedIn</span>
             </a>
             <a
               href="https://twitter.com"
               target="_blank"
               rel="noopener noreferrer"
               className="card inline-flex items-center gap-3 px-6 py-4 hover:border-[#14B8A6]"
             >
               <Share2 size={24} className="text-accent" />
               <span className="font-semibold">Twitter</span>
             </a>
             <a
               href="mailto:you@example.com"
               className="card inline-flex items-center gap-3 px-6 py-4 hover:border-[#14B8A6]"
             >
               <Mail size={24} className="text-accent" />
               <span className="font-semibold">Email</span>
             </a>
           </div>

           <div className="border-t border-slate-200 dark:border-[#1E293B] pt-8">
             <p className="text-slate-600 dark:text-[#94A3B8] mb-6">Let's collaborate and create something amazing together!</p>
            <button className="btn-primary">
              Start a Project
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
