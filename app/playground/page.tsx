import Link from "next/link";

export default function PlaygroundPage() {
  const games = [
    {
      name: "Snake Game",
      slug: "snake",
      description: "Classic snake game with score tracking",
      emoji: "🐍"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-4">Playground</h1>
      <p className="text-xl text-gray-600 mb-12">
        Simple games and interactive experiments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/playground/${game.slug}`}
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition cursor-pointer"
          >
            <div className="text-5xl mb-4">{game.emoji}</div>
            <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
            <p className="text-gray-600">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
