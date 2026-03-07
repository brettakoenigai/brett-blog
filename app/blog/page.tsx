import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No posts yet. Check back soon for new content!
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-12">
              <div className="mb-2 text-sm text-gray-500">{post.date}</div>
              <h2 className="text-3xl font-bold mb-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700 mb-4 text-lg">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
