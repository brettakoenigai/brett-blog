export default function ProjectsPage() {
  const projects = [
    {
      name: "LeadWell",
      url: "https://leadwell.brettkoenig.com",
      description: "A comprehensive leadership development platform helping managers grow their skills, track progress with direct reports, and build effective teams through structured conversations and goal setting.",
      tags: ["Leadership", "Management", "SaaS"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-xl text-gray-600 mb-12">
        Things I'm building and working on.
      </p>

      <div className="space-y-8">
        {projects.map((project) => (
          <article
            key={project.name}
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                {project.name} →
              </a>
            </h2>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
