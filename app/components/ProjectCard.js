export default function ProjectCard({ project }) {
    return (
      <div className="border p-4 my-2">
        <h2 className="text-2xl font-bold">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">{project.name}</a>
        </h2>
        <p>{project.description}</p>
        <p><strong>Language:</strong> {project.language}</p>
        <p>Stars: {project.stargazers_count} | Forks: {project.forks_count}</p>
      </div>
    );
  }
  