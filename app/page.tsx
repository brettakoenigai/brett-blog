import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { getBlogPosts } from "@/lib/blog";

export default function Home() {
  const posts = getBlogPosts().slice(0, 3); // Get latest 3 posts

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Hi, I'm Brett Koenig
          </h1>
          <p className="text-xl mb-8">
            Welcome to my corner of the internet. I write about leadership, technology, and life.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/blog"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Read the Blog
            </Link>
            <a
              href="https://youtube.com/@brettkoenig"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        {posts.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View All Posts
            </Link>
          </div>
        )}
      </section>

      {/* Content Links */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">More From Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a
              href="https://youtube.com/@brettkoenig"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <svg className="w-12 h-12 text-red-600 mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <h3 className="text-2xl font-semibold">YouTube Channel</h3>
              </div>
              <p className="text-gray-600">
                Watch my latest videos on leadership, productivity, and personal development.
              </p>
            </a>
            <a
              href="https://open.spotify.com/show/your-podcast-id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <svg className="w-12 h-12 text-green-600 mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <h3 className="text-2xl font-semibold">Podcast on Spotify</h3>
              </div>
              <p className="text-gray-600">
                Listen to in-depth conversations and insights on the topics that matter.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Join My Newsletter</h2>
          <p className="text-lg mb-8">
            Get my latest posts, insights, and updates delivered straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
