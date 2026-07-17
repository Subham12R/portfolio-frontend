// Case study mock data
// Shape is ready for backend/admin later — page reads from here for now.

export interface CaseStudyLink {
  label: string;
  href: string;
  type: "github" | "live" | "docs" | "npm" | "other";
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  role: string;
  timeline: string;
  status: "completed" | "in-progress" | "maintained";
  overview: string;
  technologies: string[];
  links: CaseStudyLink[];
  metrics: CaseStudyMetric[];
  features: string[];
  problem: string;
  challenges: { title: string; description: string }[];
  architecture: {
    summary: string;
    /** Mermaid diagram source (flowchart / sequence / etc.) */
    mermaid: string;
  };
  images: CaseStudyImage[];
  learnings: string[];
  nextSteps: string[];
  bannerImage?: string;
  youtubeId?: string;
  videoUrl?: string;
  loomId?: string;
  /** Optional next project for footer nav */
  nextProject?: {
    title: string;
    href: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "ruse",
    slug: "ruse",
    title: "Ruse",
    tagline:
      "A private watch-party platform with secure rooms, real-time media, and ephemeral chat — no accounts, no recordings, no lasting history.",
    role: "Full Stack · Product",
    timeline: "2025 · 3 months",
    status: "maintained",
    overview:
      "Ruse is a private, temporary room for small-group screen sharing. Create a room, share its code, approve people as they arrive, then collaborate over screen share, camera, microphone, and ephemeral chat — without accounts, recordings, or persistent chat history. Built for friends, study groups, and quick collab sessions that should feel private by default.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Go",
      "Redis",
      "LiveKit",
      "WebRTC",
      "Nginx",
      "Docker",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ruse-org/ruse",
        type: "github",
      },
      {
        label: "Live Site",
        href: "https://ruse.app",
        type: "live",
      },
    ],
    metrics: [
      { label: "Max participants", value: "8 / room" },
      { label: "Room lifetime", value: "8 hours" },
      { label: "Empty cleanup", value: "60 seconds" },
      { label: "Global rooms", value: "3 active" },
    ],
    features: [
      "Temporary rooms with random share codes and owner-controlled admission",
      "Up to eight connected participants per room, three active rooms globally",
      "Screen video and optional system audio via LiveKit",
      "Camera and microphone for every participant; stream host controls screen share",
      "Participant tiles, pinning, draggable/resizable pinned video, and fullscreen",
      "Ephemeral room chat that disappears when the room ends",
      "Automatic cleanup when the owner ends the room, after eight hours, or one minute empty",
    ],
    problem:
      "Most watch-party and screen-share tools assume accounts, permanent history, or large meetings. For small groups that just want a private room for a few hours — movie nights, pair debugging, study sessions — that overhead is noise. Existing tools either feel bloated, force identity, or leave chat and media lingering after everyone leaves. Ruse targets the opposite: temporary, owner-gated rooms that vanish when the session is over.",
    challenges: [
      {
        title: "Admission without accounts",
        description:
          "Owners need control over who joins, but guests should not create accounts. The flow uses room codes plus an approval gate: joiners wait in a lobby until the owner admits them, keeping friction low without opening the room to the public internet.",
      },
      {
        title: "Real-time media under constraints",
        description:
          "Screen share, camera, and mic for up to eight people is non-trivial. LiveKit handles SFU routing and media tracks while the app owns room lifecycle, host roles, and UI state (pin, fullscreen, layout). Coordinating host handoff and track subscription without race conditions took several iterations.",
      },
      {
        title: "Ephemeral by design",
        description:
          "Nothing should linger after the room dies. Chat is in-memory for the session only; rooms expire after eight hours or one empty minute. That required careful server-side timers, owner-end flows, and ensuring reconnects do not resurrect deleted rooms.",
      },
      {
        title: "Global capacity limits",
        description:
          "To keep costs and abuse under control, the platform caps concurrent rooms and participants. Enforcing those limits fairly under concurrent create/join races meant treating capacity as a first-class invariant in the room service, not a soft check in the UI.",
      },
    ],
    architecture: {
      summary:
        "The browser talks HTTPS/WSS through Nginx to the Next.js frontend and Go API (backed by Redis). Media streams go peer-to-SFU over LiveKit WebRTC to LiveKit Cloud — separate from the app control plane.",
      mermaid: `flowchart LR
  Browser["Browser (Next.js)"]
  Nginx["Nginx"]
  Next["Next.js frontend"]
  GoAPI["Go API"]
  Redis["Redis"]
  LiveKit["LiveKit Cloud"]

  Browser -->|"HTTPS / WSS"| Nginx
  Nginx --> Next
  Nginx --> GoAPI
  GoAPI --> Redis
  Browser -->|"LiveKit WebRTC"| LiveKit`,
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
        alt: "Ruse room lobby with share code",
        caption: "Lobby — share code + waiting guests",
      },
      {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
        alt: "Active watch party with participant tiles",
        caption: "Session — tiles, pin, and screen share",
      },
      {
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
        alt: "Owner admission controls",
        caption: "Owner gate — approve joiners in real time",
      },
      {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
        alt: "Ephemeral chat panel",
        caption: "Chat — lives only as long as the room",
      },
    ],
    learnings: [
      "Ephemeral products force clearer product boundaries — if it should not persist, the architecture must make persistence impossible, not merely unlikely.",
      "Owner-gated rooms without accounts is a sweet spot for trust: low friction for guests, real control for the host.",
      "Media UX is product work as much as infra: pin, layout, host roles, and empty states matter more than raw WebRTC plumbing to users.",
      "Hard capacity limits early are kinder than soft limits later — both for cost and for designing honest UI around scarcity.",
    ],
    nextSteps: [
      "Optional end-to-end encryption modes for chat and signaling where threat models demand it",
      "Better mobile layout for tiles and pinned video",
      "Room templates (watch party vs. pair-programming defaults)",
      "Lightweight moderation tools for the room owner",
    ],
    bannerImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
    nextProject: {
      title: "React Wheel Picker",
      href: "/projects",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.id === id);
}

/** Default mock case study used by /casestudy until dynamic routes land */
export function getDefaultCaseStudy(): CaseStudy {
  return caseStudies[0];
}
