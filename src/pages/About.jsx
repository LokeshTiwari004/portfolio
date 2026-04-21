import { Download, Mail, MessageCircle, Share2, Code } from 'lucide-react'

export default function About() {
  const skills = {
    "Programming": ["Python", "Java", "SQL", "Bash"],
    "ML/DL": ["PyTorch", "Scikit-learn", "HuggingFace", "TensorFlow"],
    "Data Tools": ["Pandas", "NumPy", "Matplotlib", "Plotly"],
    "DevOps": ["Git", "Docker", "Jupyter Notebooks", "VS Code"],
    "Concepts": ["Neural Networks", "NLP", "Deep Learning", "Supervised Learning"]
  }

  const experience = [
    {
      title: "Data Science Student",
      company: "Indian Institute of Technology Madras",
      duration: "Sep 2022 - Apr 2027",
      description: "Pursuing BS in Data Science and Applications with a focus on Deep Learning, NLP, and ML systems.",
      highlights: ["CGPA: 9.16/10.0", "Completed projects in NLP and Neural Networks", "Hands-on with PyTorch and HuggingFace"]
    },
    {
      title: "Deep Learning & NLP Enthusiast",
      company: "Self-Taught & Projects",
      duration: "2023 - Present",
      description: "Building practical ML solutions and contributing to open-source projects.",
      highlights: ["Social Media Extremism Detection using Transformers (94% accuracy)", "Diabetes Prediction with Neural Networks", "Loan Payback Prediction classifier (0.922 ROC AUC)"]
    }
  ]

  const education = [
    {
      degree: "BS in Data Science and Applications",
      school: "Indian Institute of Technology Madras",
      year: "2022 - 2027",
      details: "CGPA: 9.16/10.0"
    },
    {
      degree: "High School & Intermediate",
      school: "Central Hindu Boys School",
      year: "2017 - 2021",
      details: "Percentage: 95%"
    }
  ]

  const certifications = [
    "Deep Learning Fundamentals",
    "Natural Language Processing",
    "Neural Networks & Architecture Design",
    "Machine Learning with Scikit-learn & PyTorch"
  ]

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-slate-600 dark:text-[#94A3B8] leading-relaxed">
              I'm Lokesh Tiwari, a Data Science student at IIT Madras with a passion for Deep Learning and NLP. I specialize in building practical ML solutions, working with Transformers, and solving complex data problems using Python and PyTorch.
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
                    Currently pursuing a BS in Data Science and Applications at IIT Madras with a CGPA of 9.16/10. My expertise spans Deep Learning, Natural Language Processing, and building machine learning models with PyTorch and HuggingFace Transformers.
                  </p>
                  <p className="text-slate-600 dark:text-[#94A3B8] mb-6 leading-relaxed">
                    I have worked on diverse projects including Social Media Extremism Detection using fine-tuned BERT models (94% accuracy), Diabetes Prediction using Neural Networks, and Loan Payback Prediction achieving 0.922 ROC AUC. I'm passionate about practical ML applications and continuous learning.
                  </p>
                 <div className="flex flex-wrap gap-4">
                   <a href="mailto:lokeshtiwari001vns@gmail.com" className="btn-primary">
                     <Mail size={20} />
                     Contact Me
                   </a>
                   <a href="/Resume.pdf" download="Lokesh_Tiwari_Resume.pdf" className="btn-secondary">
                     <Download size={20} />
                     Download Resume
                   </a>
                 </div>
              </div>
            </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="card text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">9.16</div>
                  <p className="text-slate-600 dark:text-[#94A3B8]">CGPA at IIT</p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">6+</div>
                  <p className="text-slate-600 dark:text-[#94A3B8]">Projects Built</p>
                </div>
                <div className="card text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">94%</div>
                  <p className="text-slate-600 dark:text-[#94A3B8]">Best Accuracy</p>
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

       {/* Resume Section */}
       <section className="py-16 mb-20">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto">
             <div className="card bg-gradient-to-br from-slate-100 dark:from-[#1E293B] to-slate-50 dark:to-[#0F172A] border border-accent border-opacity-30">
               <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                 <div>
                   <h2 className="text-3xl font-bold mb-3">My Resume</h2>
                   <p className="text-slate-600 dark:text-[#94A3B8] mb-4 leading-relaxed">
                     Download my complete resume to see detailed information about my education, projects, skills, and achievements in Deep Learning and Data Science.
                   </p>
                   <a href="/Resume.pdf" download="Lokesh_Tiwari_Resume.pdf" className="btn-primary inline-flex items-center gap-2">
                     <Download size={20} />
                     Download PDF Resume
                   </a>
                 </div>
                 <div className="text-6xl">📄</div>
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
               href="https://github.com/LokeshTiwari004"
               target="_blank"
               rel="noopener noreferrer"
               className="card inline-flex items-center gap-3 px-6 py-4 hover:border-[#14B8A6]"
             >
               <Code size={24} className="text-accent" />
               <span className="font-semibold">GitHub</span>
             </a>
             <a
               href="https://linkedin.com/in/lokeshtiwari"
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
               href="mailto:lokeshtiwari001vns@gmail.com"
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
