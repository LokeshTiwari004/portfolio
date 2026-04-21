import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Share2, Calendar, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { loadAllMarkdownPosts, getPostBySlug } from '../lib/markdown'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const foundPost = await getPostBySlug(slug)
        
        if (foundPost) {
          setPost(foundPost)
          
          // Load related posts from same category
          const allPosts = await loadAllMarkdownPosts()
          const related = allPosts
            .filter(p => p.category === foundPost.category && p.slug !== slug)
            .slice(0, 2)
          setRelatedPosts(related)
        }
      } catch (error) {
        console.error('Error loading post:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p className="text-slate-600 dark:text-[#94A3B8]">Loading article...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-slate-600 dark:text-[#94A3B8] mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 mb-16">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#14B8A6] hover:text-[#20C997] transition-colors mb-8">
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        {/* Hero Image / Icon */}
        <div className="text-8xl mb-8 text-center">{post.image}</div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{post.title}</h1>

         {/* Meta Information */}
         <div className="flex flex-wrap gap-6 items-center mb-8 pb-8 border-b border-slate-200 dark:border-[#1E293B]">
           <div className="flex items-center gap-2 text-slate-600 dark:text-[#94A3B8]">
             <Calendar size={18} />
             {post.date}
           </div>
           <div className="flex items-center gap-2 text-slate-600 dark:text-[#94A3B8]">
             <Clock size={18} />
             {post.readTime}
           </div>
           <span className="text-[#14B8A6] font-semibold">{post.category}</span>
           <button className="ml-auto btn-secondary text-sm">
             <Share2 size={16} />
             Share
           </button>
         </div>

         {/* Author */}
         <div className="mb-12 pb-8 border-b border-slate-200 dark:border-[#1E293B]">
           <p className="text-slate-600 dark:text-[#94A3B8]">Written by <span className="text-slate-900 dark:text-white font-semibold">{post.author}</span></p>
         </div>

         {/* Article Content - Rendered Markdown */}
         <div className="prose prose-invert max-w-none mb-12 text-slate-600 dark:text-[#94A3B8] leading-relaxed">
           <ReactMarkdown
             components={{
               h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 mt-8" {...props} />,
               h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 mt-6" {...props} />,
               h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 mt-4" {...props} />,
               p: ({node, ...props}) => <p className="mb-4 text-slate-600 dark:text-[#94A3B8]" {...props} />,
               ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 text-slate-600 dark:text-[#94A3B8]" {...props} />,
               ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 text-slate-600 dark:text-[#94A3B8]" {...props} />,
               li: ({node, ...props}) => <li className="mb-2" {...props} />,
               code: ({node, inline, ...props}) => 
                 inline ? 
                   <code className="bg-slate-100 dark:bg-[#1E293B] px-2 py-1 rounded text-accent font-mono text-sm" {...props} /> :
                   <code className="block bg-slate-100 dark:bg-[#1E293B] p-4 rounded mb-4 text-slate-600 dark:text-[#94A3B8] font-mono text-sm overflow-x-auto" {...props} />,
               blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#14B8A6] pl-4 italic text-slate-600 dark:text-[#94A3B8] mb-4" {...props} />,
               a: ({node, ...props}) => <a className="text-accent hover:text-[#14B8A6] transition-colors" {...props} />,
               strong: ({node, ...props}) => <strong className="text-slate-900 dark:text-white font-bold" {...props} />,
               em: ({node, ...props}) => <em className="italic" {...props} />,
             }}
           >
             {post.content}
           </ReactMarkdown>
         </div>

         {/* Tags */}
         <div className="flex flex-wrap gap-3 pb-12 border-b border-slate-200 dark:border-[#1E293B]">
           {post.tags.map((tag) => (
             <span
               key={tag}
               className="text-accent bg-[#0F766E] bg-opacity-30 px-4 py-2 rounded-full border border-[#0F766E] text-sm font-semibold"
             >
               #{tag}
             </span>
           ))}
         </div>
      </article>

      {/* Navigation to Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 mb-20">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relPost) => (
              <Link key={relPost.slug} to={`/blog/${relPost.slug}`} className="group">
               <div className="card h-full">
                   <div className="text-4xl mb-4">{relPost.image}</div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#14B8A6] transition-colors mb-2">
                     {relPost.title}
                   </h3>
                   <p className="text-sm text-slate-600 dark:text-[#94A3B8]">{relPost.date}</p>
                 </div>
              </Link>
            ))}
          </div>
        </div>
      )}

       {/* Comments Section Placeholder */}
       <section className="max-w-4xl mx-auto px-4 mb-20">
         <div className="card">
           <h2 className="text-2xl font-bold mb-6">Comments</h2>
           <p className="text-slate-600 dark:text-[#94A3B8]">Comments feature coming soon! Share your thoughts on this article.</p>
         </div>
       </section>

       {/* More Articles CTA */}
       <section className="max-w-4xl mx-auto px-4">
         <div className="bg-gradient-to-r from-[#0F766E] to-[#14B8A6] bg-opacity-10 border border-[#14B8A6] border-opacity-30 rounded-2xl p-8 text-center transition-colors duration-300">
           <h2 className="text-2xl font-bold mb-4">More Articles</h2>
           <p className="text-slate-600 dark:text-[#94A3B8] mb-6">Check out more articles on data science, machine learning, and technology.</p>
          <Link to="/blog" className="btn-primary">
            Read More Articles
          </Link>
        </div>
      </section>
    </div>
  )
}
