import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { loadAllMarkdownPosts } from '../lib/markdown'

export default function Blog() {
  const [allPosts, setAllPosts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(["All"])

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await loadAllMarkdownPosts()
        setAllPosts(posts)
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(posts.map(p => p.category))]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  const filteredPosts = allPosts
    .filter(post => {
      const categoryMatch = selectedCategory === "All" || post.category === selectedCategory
      const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && searchMatch
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p className="text-slate-600 dark:text-[#94A3B8]">Loading blog posts...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-slate-600 dark:text-[#94A3B8]">
              Thoughts, insights, and tutorials on data science, machine learning, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-[#94A3B8]" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
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
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6] text-[#0F172A]'
                    : 'border border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:bg-opacity-10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 mb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="card">
                    <div className="flex gap-6">
                      {/* Icon */}
                      <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {post.image}
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                         {/* Meta */}
                         <div className="flex items-center gap-3 mb-3">
                           <span className="text-sm text-accent">{post.date}</span>
                           <span className="text-slate-400 dark:text-[#2E3E4E]">•</span>
                           <span className="text-sm text-slate-600 dark:text-[#94A3B8]">{post.readTime}</span>
                           <span className="text-slate-400 dark:text-[#2E3E4E]">•</span>
                           <span className="text-sm font-semibold text-[#14B8A6]">{post.category}</span>
                         </div>

                         {/* Title */}
                         <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors">
                           {post.title}
                         </h3>

                         {/* Excerpt */}
                         <p className="text-slate-600 dark:text-[#94A3B8] mb-4 leading-relaxed line-clamp-2">
                           {post.content.substring(0, 150)}...
                         </p>

                        {/* Tags and Link */}
                        <div className="flex items-center justify-between">
                           <div className="flex flex-wrap gap-2">
                             {post.tags.slice(0, 3).map((tag) => (
                               <span
                                 key={tag}
                                 className="text-xs font-semibold text-accent bg-[#0F766E] bg-opacity-20 px-2 py-1 rounded"
                               >
                                 {tag}
                               </span>
                             ))}
                           </div>
                           <div className="inline-flex items-center gap-2 text-accent group-hover:text-[#14B8A6] transition-colors font-semibold">
                             Read More
                             <ArrowRight size={16} />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
             ) : (
               <div className="text-center py-16">
                 <p className="text-slate-600 dark:text-[#94A3B8] text-lg mb-4">No articles found matching your search.</p>
                 <button
                   onClick={() => {
                     setSearchQuery("")
                     setSelectedCategory("All")
                   }}
                   className="btn-secondary"
                 >
                   Clear Filters
                 </button>
               </div>
             )}
          </div>

           {/* Results Count */}
           {filteredPosts.length > 0 && (
             <div className="text-center mt-12">
               <p className="text-slate-600 dark:text-[#94A3B8]">
                 Showing {filteredPosts.length} of {allPosts.length} articles
               </p>
             </div>
           )}
        </div>
      </section>

       {/* Newsletter CTA */}
       <section className="py-16 bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-opacity-10 border border-[#14B8A6] border-opacity-30 rounded-2xl mx-4 md:mx-0 transition-colors duration-300">
         <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
           <p className="text-slate-600 dark:text-[#94A3B8] mb-6">Subscribe to my newsletter for the latest articles and insights.</p>
           <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
             <input
               type="email"
               placeholder="Enter your email"
               className="flex-grow bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] text-slate-900 dark:text-white placeholder-slate-600 dark:placeholder-[#94A3B8] rounded-lg py-3 px-4 focus:outline-none focus:border-[#14B8A6] transition-colors duration-300"
             />
             <button className="btn-primary whitespace-nowrap">Subscribe</button>
           </div>
         </div>
       </section>
    </div>
  )
}
