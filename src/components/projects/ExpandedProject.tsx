import { Project } from "@/data/project";

function ExpandedProject({ project }: { project: Project }) {
  return (
    <div className="px-5 pb-6 space-y-6">

      {/* BANNER / VIDEO */}
      {project.youtubeId ? (
        <div className="aspect-video rounded-lg overflow-hidden border border-zinc-800">
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}`}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      ) : project.bannerImage ? (
        <img
          src={project.bannerImage}
          alt={project.title}
          className="rounded-lg border border-zinc-800"
        />
      ) : null}

      {/* DESCRIPTION */}
      <p className="text-zinc-300 text-sm leading-relaxed">
        {project.description}
      </p>

      {/* FEATURES */}
      <ul className="space-y-2 text-sm text-zinc-300">
        {project.features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-zinc-500">•</span>
            {f}
          </li>
        ))}
      </ul>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ExpandedProject;