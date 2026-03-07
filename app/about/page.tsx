export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-6">
          Hi, I'm Brett Koenig. Welcome to my personal blog where I share my
          thoughts on leadership, technology, and life.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">What I Do</h2>
        <p className="text-gray-700 mb-4">
          I'm passionate about helping people grow as leaders and leveraging
          technology to make a positive impact. Through my writing, videos, and
          podcast, I explore topics that matter to me and hopefully to you too.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Where to Find Me</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="https://youtube.com/@brettkoenig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              YouTube Channel
            </a>{" "}
            - Watch my latest videos
          </li>
          <li>
            <a
              href="https://open.spotify.com/show/your-podcast-id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Podcast on Spotify
            </a>{" "}
            - Listen to in-depth conversations
          </li>
          <li>
            <a
              href="/#newsletter"
              className="text-blue-600 hover:text-blue-800"
            >
              Newsletter
            </a>{" "}
            - Get updates in your inbox
          </li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-4">
          I'd love to hear from you! Subscribe to my newsletter below to stay
          connected.
        </p>
      </div>
    </div>
  );
}
