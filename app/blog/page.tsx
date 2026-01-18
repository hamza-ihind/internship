import { getAllBlogs, getAllCategories, getAllTags } from '@/lib/blog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Search } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Blog - Internship Platform',
  description:
    'Career advice, interview tips, and professional development resources for students and interns.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string; search?: string }>;
}) {
  const params = await searchParams;
  const allBlogs = getAllBlogs();
  const categories = getAllCategories();
  const allTags = getAllTags();

  // Filter blogs based on search params
  let filteredBlogs = allBlogs;

  if (params.category) {
    filteredBlogs = filteredBlogs.filter(
      (blog) =>
        blog.frontmatter.category.toLowerCase() ===
        params.category?.toLowerCase()
    );
  }

  if (params.tag) {
    filteredBlogs = filteredBlogs.filter((blog) =>
      blog.frontmatter.tags.some(
        (tag) => tag.toLowerCase() === params.tag?.toLowerCase()
      )
    );
  }

  if (params.search) {
    const query = params.search.toLowerCase();
    filteredBlogs = filteredBlogs.filter(
      (blog) =>
        blog.frontmatter.title.toLowerCase().includes(query) ||
        blog.frontmatter.description.toLowerCase().includes(query)
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Career Insights & Resources
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert advice on internships, interviews, professional
                development, and career growth
              </p>

              {/* Search Bar */}
              <form action="/blog" method="GET" className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  name="search"
                  placeholder="Search articles..."
                  defaultValue={params.search}
                  className="pl-12 h-12 text-lg"
                />
              </form>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/blog">
                    <Button
                      variant={!params.category ? 'default' : 'ghost'}
                      className="w-full justify-start"
                    >
                      All Posts
                    </Button>
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${encodeURIComponent(category)}`}
                    >
                      <Button
                        variant={
                          params.category === category ? 'default' : 'ghost'
                        }
                        className="w-full justify-start"
                      >
                        {category}
                      </Button>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                      >
                        <Badge
                          variant={params.tag === tag ? 'default' : 'secondary'}
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Blog Grid */}
            <main className="flex-1">
              {/* Active Filters */}
              {(params.category || params.tag || params.search) && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Filtered by:
                  </span>
                  {params.category && (
                    <Badge variant="outline" className="gap-2">
                      Category: {params.category}
                      <Link href="/blog" className="hover:text-destructive">
                        ×
                      </Link>
                    </Badge>
                  )}
                  {params.tag && (
                    <Badge variant="outline" className="gap-2">
                      Tag: {params.tag}
                      <Link href="/blog" className="hover:text-destructive">
                        ×
                      </Link>
                    </Badge>
                  )}
                  {params.search && (
                    <Badge variant="outline" className="gap-2">
                      Search: {params.search}
                      <Link href="/blog" className="hover:text-destructive">
                        ×
                      </Link>
                    </Badge>
                  )}
                  <Link href="/blog">
                    <Button variant="ghost" size="sm">
                      Clear all
                    </Button>
                  </Link>
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredBlogs.length}{' '}
                  {filteredBlogs.length === 1 ? 'article' : 'articles'}
                </p>
              </div>

              {/* Blog Cards */}
              {filteredBlogs.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground text-lg mb-4">
                    No articles found
                  </p>
                  <Link href="/blog">
                    <Button>View all articles</Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredBlogs.map((blog) => (
                    <Link key={blog.slug} href={`/blog/${blog.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={blog.frontmatter.image}
                            alt={blog.frontmatter.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                              {blog.frontmatter.category}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader>
                          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                            {blog.frontmatter.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {blog.frontmatter.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {blog.frontmatter.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>

                        <CardFooter className="text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {blog.frontmatter.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(
                              new Date(blog.frontmatter.date),
                              'MMM d, yyyy'
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {blog.frontmatter.readTime}
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
