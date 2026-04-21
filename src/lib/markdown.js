import matter from 'gray-matter'

// Cache for loaded markdown files
const markdownCache = {}

// Load a markdown file and parse it
export async function loadMarkdownPost(filename) {
  if (markdownCache[filename]) {
    return markdownCache[filename]
  }

  try {
    const response = await fetch(`/markdown/${filename}.md`)
    const text = await response.text()
    const { data, content } = matter(text)
    
    const post = {
      ...data,
      content,
      slug: filename
    }
    
    markdownCache[filename] = post
    return post
  } catch (error) {
    console.error(`Error loading markdown: ${filename}`, error)
    return null
  }
}

// Load all markdown posts from a directory
export async function loadAllMarkdownPosts() {
  const filenames = [
    'getting-started-ml',
    'data-visualization-best-practices',
    'python-data-analysis',
    'building-production-ml-models',
    'advanced-sql-techniques'
  ]

  const posts = await Promise.all(
    filenames.map(filename => loadMarkdownPost(filename))
  )

  return posts.filter(post => post !== null)
}

// Load projects data
export async function loadProjectsData() {
  try {
    const response = await fetch('/data/projects.json')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading projects data:', error)
    return []
  }
}

// Get a single post by slug
export async function getPostBySlug(slug) {
  const posts = await loadAllMarkdownPosts()
  return posts.find(post => post.slug === slug) || null
}

// Get related posts (same category, different post)
export async function getRelatedPosts(currentSlug, category, limit = 3) {
  const posts = await loadAllMarkdownPosts()
  return posts
    .filter(post => post.category === category && post.slug !== currentSlug)
    .slice(0, limit)
}
