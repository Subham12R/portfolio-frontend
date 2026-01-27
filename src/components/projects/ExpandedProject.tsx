import Image from "next/image"
import { Project } from "@/data/project"
import { getTechIcon } from "@/data/tech-icons"

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
        <Image
          src={project.bannerImage}
          alt={project.title}
          width={800}
          height={450}
          className="rounded-lg border border-zinc-800 w-full"
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

      {/* TECH ICONS */}
      <div className="flex flex-wrap gap-3">
        {project.tags.map((tag) => {
          const iconPath = getTechIcon(tag)
          return iconPath ? (
            <div
              key={tag}
              className="p-1.5 rounded-xl bg-neutral-800 border border-white/10 outline-2 outline-offset-2 outline-white/20"
              title={tag}
            >
              <Image
                src={iconPath}
                alt={tag}
                width={20}
                height={20}
                className="rounded-md"
              />
            </div>
          ) : (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs rounded-xl bg-neutral-800 border border-white/10 outline-2 outline-offset-2 outline-white/20 text-zinc-300"
            >
              {tag}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default ExpandedProject
