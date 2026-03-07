import { getPostBySlug, getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="text-blue-600 hover:text-blue-800 mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      <div className="mb-4 text-sm text-gray-500">{post.date}</div>
      <h1 className="text-5xl font-bold mb-8">{post.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </article>
  );
}
