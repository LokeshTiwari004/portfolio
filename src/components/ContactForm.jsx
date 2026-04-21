import { useState } from 'react'
import { Send, AlertCircle, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [status, setStatus] = useState(null) // 'success', 'error', or null
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // In a real app, you'd send this to a backend or email service
      // For now, we'll just simulate success
      console.log('Form data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus(null), 5000)
    } catch (error) {
      setStatus('error')
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="card">
        <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
        
        {/* Status Messages */}
        {status === 'success' && (
          <div className="mb-6 p-4 bg-[#0F766E] bg-opacity-20 border border-[#14B8A6] rounded-lg flex items-center gap-3">
            <CheckCircle size={20} className="text-[#14B8A6]" />
            <p className="text-[#14B8A6]">Thank you! I'll get back to you soon.</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg flex items-center gap-3">
            <AlertCircle size={20} className="text-red-500" />
            <p className="text-red-500">Failed to send message. Please try again.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
           {/* Name Field */}
           <div>
             <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
               Name
             </label>
             <input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
               placeholder="Your name"
               className="w-full bg-white dark:bg-[#0A0F1F] border border-slate-200 dark:border-[#1E293B] text-slate-900 dark:text-white placeholder-slate-600 dark:placeholder-[#94A3B8] rounded-lg py-3 px-4 focus:outline-none focus:border-[#14B8A6] transition-colors duration-300"
             />
             {errors.name && (
               <p className="text-red-500 text-sm mt-1">{errors.name}</p>
             )}
           </div>

           {/* Email Field */}
           <div>
             <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
               Email
             </label>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               placeholder="your@email.com"
               className="w-full bg-white dark:bg-[#0A0F1F] border border-slate-200 dark:border-[#1E293B] text-slate-900 dark:text-white placeholder-slate-600 dark:placeholder-[#94A3B8] rounded-lg py-3 px-4 focus:outline-none focus:border-[#14B8A6] transition-colors duration-300"
             />
             {errors.email && (
               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
             )}
           </div>

           {/* Subject Field */}
           <div>
             <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
               Subject
             </label>
             <input
               type="text"
               name="subject"
               value={formData.subject}
               onChange={handleChange}
               placeholder="What's this about?"
               className="w-full bg-white dark:bg-[#0A0F1F] border border-slate-200 dark:border-[#1E293B] text-slate-900 dark:text-white placeholder-slate-600 dark:placeholder-[#94A3B8] rounded-lg py-3 px-4 focus:outline-none focus:border-[#14B8A6] transition-colors duration-300"
             />
             {errors.subject && (
               <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
             )}
           </div>

           {/* Message Field */}
           <div>
             <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
               Message
             </label>
             <textarea
               name="message"
               value={formData.message}
               onChange={handleChange}
               placeholder="Your message..."
               rows={6}
               className="w-full bg-white dark:bg-[#0A0F1F] border border-slate-200 dark:border-[#1E293B] text-slate-900 dark:text-white placeholder-slate-600 dark:placeholder-[#94A3B8] rounded-lg py-3 px-4 focus:outline-none focus:border-[#14B8A6] transition-colors duration-300 resize-none"
             />
             {errors.message && (
               <p className="text-red-500 text-sm mt-1">{errors.message}</p>
             )}
           </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Message'}
            <Send size={20} />
          </button>

           <p className="text-slate-600 dark:text-[#94A3B8] text-sm text-center">
             I'll try to respond within 24 hours.
           </p>
        </form>
      </div>
    </div>
  )
}
