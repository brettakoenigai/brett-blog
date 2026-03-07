import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brett Koenig | Personal Blog",
  description: "Thoughts on leadership, technology, and life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-900 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
                  Brett Koenig
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link href="/" className="hover:text-gray-300 transition">
                  Home
                </Link>
                <Link href="/blog" className="hover:text-gray-300 transition">
                  Blog
                </Link>
                <Link href="/about" className="hover:text-gray-300 transition">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Brett Koenig</h3>
                <p className="text-gray-400">
                  Sharing thoughts on leadership, technology, and life.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <div className="space-y-2">
                  <a
                    href="https://youtube.com/@daily-dot-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-white transition"
                  >
                    YouTube Channel
                  </a>
                  <a
                    href="https://open.spotify.com/show/4ohzJZdYU19g7S9IIiQyZn?si=v1oJBr4jRviQxmdd_XwB_w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-white transition"
                  >
                    Podcast on Spotify
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Get updates delivered to your inbox.
                </p>
                <Link href="/#newsletter" className="text-blue-400 hover:text-blue-300 transition">
                  Subscribe →
                </Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Brett Koenig. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
