// Simple frontmatter parser that works in browser (doesn't rely on Node.js Buffer)
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content }
  }

  const [, frontmatterStr, body] = match
  const data = {}

  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) return

    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()

    // Parse different value types
    if (value.startsWith('[') && value.endsWith(']')) {
      // Parse array: [Tag1, Tag2, Tag3]
      value = value
        .slice(1, -1)
        .split(',')
        .map(v => v.trim())
    } else if (value === 'true') {
      value = true
    } else if (value === 'false') {
      value = false
    }

    data[key] = value
  })

  return { data, content: body }
}

// Cache for loaded markdown files
const markdownCache = {}

// Load a markdown file and parse it
export async function loadMarkdownPost(filename) {
  if (markdownCache[filename]) {
    return markdownCache[filename]
  }

  try {
    const response = await fetch(`/markdown/${filename}.md`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}`)
    }
    
    const text = await response.text()
    const { data, content } = parseFrontmatter(text)
    
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
    'data-science-iit-madras',
    'extremism-detection-deep-dive',
    'pytorch-transformers-guide',
    'nlp-social-good',
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
