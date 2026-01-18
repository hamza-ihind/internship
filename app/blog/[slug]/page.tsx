import { getBlogBySlug, getAllBlogs, getRelatedBlogs, extractTableOfContents } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { TableOfContents } from '@/components/blog/table-of-contents';
import dynamic from 'next/dynamic';

const BlogContent = dynamic(
  () => import('@/components/blog/blog-content').then(mod => ({ default: mod.BlogContent })),
  { ssr: true }
);

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }
  
  return {
    title: `${blog.frontmatter.title} - Internship Platform Blog`,
    description: blog.frontmatter.description,
    openGraph: {
      title: blog.frontmatter.title,
      description: blog.frontmatter.description,
      images: [blog.frontmatter.image],
      type: 'article',
      authors: [blog.frontmatter.author],
      publishedTime: blog.frontmatter.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }
  
  const relatedBlogs = getRelatedBlogs(slug, 3);
  const toc = extractTableOfContents(blog.content);
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={blog.frontmatter.image}
            alt={blog.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog">
                <Button variant="ghost" size="sm" className="mb-4 hover:bg-background/80">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              
              <Badge className="mb-4">{blog.frontmatter.category}</Badge>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                {blog.frontmatter.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                {blog.frontmatter.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.frontmatter.author}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(blog.frontmatter.date), 'MMMM d, yyyy')}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.frontmatter.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              <Card>
                <CardContent className="p-8 md:p-12">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {blog.frontmatter.tags.map(tag => (
                      <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                        <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  {/* Blog Content */}
                  <BlogContent content={blog.content} />

                  {/* Share Section */}
                  <Separator className="my-8" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Share this article</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedBlogs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedBlogs.map(relatedBlog => (
                      <Link key={relatedBlog.slug} href={`/blog/${relatedBlog.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={relatedBlog.frontmatter.image}
                              alt={relatedBlog.frontmatter.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardHeader>
                            <Badge className="w-fit mb-2">{relatedBlog.frontmatter.category}</Badge>
                            <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedBlog.frontmatter.title}
                            </CardTitle>
                            <CardDescription className="text-sm line-clamp-2">
                              {relatedBlog.frontmatter.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar - Table of Contents */}
            <aside className="lg:w-80 hidden lg:block">
              <TableOfContents toc={toc} />
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
