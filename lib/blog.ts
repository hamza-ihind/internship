import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogFrontmatter {
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

/**
 * Get all blog posts
 */
export function getAllBlogs(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(blogsDirectory);

    const blogs = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          frontmatter: data as BlogFrontmatter,
          content,
        };
      })
      .sort((a, b) => {
        // Sort by date descending (newest first)
        return (
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
        );
      });

    return blogs;
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error);
    return null;
  }
}

/**
 * Get blogs filtered by category
 */
export function getBlogsByCategory(category: string): BlogPost[] {
  const allBlogs = getAllBlogs();
  return allBlogs.filter(
    (blog) => blog.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get blogs filtered by tag
 */
export function getBlogsByTag(tag: string): BlogPost[] {
  const allBlogs = getAllBlogs();
  return allBlogs.filter((blog) =>
    blog.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Search blogs by title or description
 */
export function searchBlogs(query: string): BlogPost[] {
  const allBlogs = getAllBlogs();
  const lowerQuery = query.toLowerCase();

  return allBlogs.filter(
    (blog) =>
      blog.frontmatter.title.toLowerCase().includes(lowerQuery) ||
      blog.frontmatter.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const allBlogs = getAllBlogs();
  const categories = new Set<string>();

  allBlogs.forEach((blog) => {
    categories.add(blog.frontmatter.category);
  });

  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allBlogs = getAllBlogs();
  const tags = new Set<string>();

  allBlogs.forEach((blog) => {
    blog.frontmatter.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get related posts based on tags and category
 */
export function getRelatedBlogs(slug: string, limit: number = 3): BlogPost[] {
  const currentBlog = getBlogBySlug(slug);
  if (!currentBlog) return [];

  const allBlogs = getAllBlogs().filter((blog) => blog.slug !== slug);

  // Score blogs based on shared tags and category
  const scoredBlogs = allBlogs.map((blog) => {
    let score = 0;

    // Same category: +10 points
    if (blog.frontmatter.category === currentBlog.frontmatter.category) {
      score += 10;
    }

    // Shared tags: +5 points each
    const sharedTags = blog.frontmatter.tags.filter((tag) =>
      currentBlog.frontmatter.tags.includes(tag)
    );
    score += sharedTags.length * 5;

    return { blog, score };
  });

  // Sort by score and return top results
  return scoredBlogs
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.blog);
}

/**
 * Extract table of contents from markdown content
 */
export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function extractTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    toc.push({ id, title, level });
  }

  return toc;
}
