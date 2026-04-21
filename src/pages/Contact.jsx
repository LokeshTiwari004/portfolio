import ContactForm from '../components/ContactForm'
import { Mail, MessageCircle, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-slate-600 dark:text-[#94A3B8]">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 mb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
             {/* Email */}
             <div className="card text-center">
               <div className="text-4xl mb-4 flex justify-center">
                 <Mail className="text-accent" size={40} />
               </div>
               <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Email</h3>
               <a href="mailto:your@email.com" className="text-[#14B8A6] hover:text-accent transition-colors">
                 your@email.com
               </a>
             </div>

             {/* Phone */}
             <div className="card text-center">
               <div className="text-4xl mb-4 flex justify-center">
                 <Phone className="text-accent" size={40} />
               </div>
               <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Phone</h3>
               <a href="tel:+1234567890" className="text-[#14B8A6] hover:text-accent transition-colors">
                 +1 (234) 567-890
               </a>
             </div>

             {/* Location */}
             <div className="card text-center">
               <div className="text-4xl mb-4 flex justify-center">
                 <MapPin className="text-accent" size={40} />
               </div>
               <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Location</h3>
               <p className="text-[#14B8A6]">
                 San Francisco, CA
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 mb-16">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>

       {/* FAQ Section */}
       <section className="py-16 bg-slate-100 dark:bg-[#0A0F1F] rounded-2xl mx-4 md:mx-0 mb-8 transition-colors duration-300">
         <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
           
           <div className="max-w-2xl mx-auto space-y-4">
             {[
               {
                 q: "What's your typical response time?",
                 a: "I try to respond to all inquiries within 24 hours. If it's urgent, please call or email directly."
               },
               {
                 q: "Do you take freelance projects?",
                 a: "Yes! I'm always interested in new projects. Please describe what you need and I'll let you know if I'm available."
               },
               {
                 q: "What's your hourly rate?",
                 a: "Rates depend on the project scope and complexity. Let's discuss your specific needs and I'll provide a quote."
               },
               {
                 q: "Do you offer consulting services?",
                 a: "Yes, I offer consulting for data science, ML strategy, and technical architecture. Happy to discuss!"
               }
             ].map((faq, idx) => (
               <div key={idx} className="card">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                 <p className="text-slate-600 dark:text-[#94A3B8]">{faq.a}</p>
               </div>
             ))}
           </div>
         </div>
       </section>

       {/* Response Time Info */}
       <div className="max-w-3xl mx-auto px-4 text-center">
         <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-opacity-10 border border-[#14B8A6] border-opacity-30 rounded-2xl p-8 transition-colors duration-300">
           <MessageCircle className="mx-auto mb-4 text-accent" size={40} />
           <h3 className="text-xl font-bold mb-2">Quick Response Guarantee</h3>
           <p className="text-slate-600 dark:text-[#94A3B8]">
             I'm committed to responding to every message. Whether it's a collaboration opportunity or just a question, I'd love to hear from you!
           </p>
         </div>
       </div>
    </div>
  )
}
