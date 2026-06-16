import { CalendarIcon } from "lucide-react";

export default function Activities() {
  return (
    <div className="h-full w-full flex flex-col">
      <div
        data-about-item
        className="w-full px-2 backdrop-blur-3xl rounded-md inline-flex items-center gap-2 mb-4"
      >
        <CalendarIcon size={20} className="mb-1" />
        <h1 className="tracking-tighter text-lg font-medium">Activities</h1>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div
          data-about-item
          className="rounded-xl bg-bg-elevated flex justify-start flex-col items-start px-2 py-2"
        >
          <div className="flex justify-between items-center w-full">
            <h3 className="tracking-tighter">
              CYCODERS - Tech Lead & Core Team Member
            </h3>
            <a href="https://cycoders.in" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted">
              CYCODERS Tech Community
            </a>
          </div>

          <div className="pl-2 border-l flex flex-col gap-1 w-full">
            <span className="tracking-tighter text-sm">
              Contributing to community initiatives and technical sessions while
              building and maintaining scalable full-stack solutions for
              community projects.
            </span>
          </div>
        </div>

        <div
          data-about-item
          className="rounded-xl bg-bg-elevated flex justify-start flex-col items-start px-2 py-2"
        >
          <div className="flex justify-between items-center w-full">
            <h3 className="tracking-tighter">ACM x Adamas - Lead Developer</h3>
            <a href="https://acm-web-two.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted">
              ACM x Adamas Student Chapter
            </a>
          </div>

          <div className="pl-2 border-l flex flex-col gap-1 w-full">
            <span className="tracking-tighter text-sm">
              Leading development efforts for chapter projects and mentoring
              peers in modern software engineering practices.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
