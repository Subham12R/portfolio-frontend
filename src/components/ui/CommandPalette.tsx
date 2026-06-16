"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Search,
  Share2,
  Moon,
  Sun,
  Music,
  Home,
  Briefcase,
  FolderKanban,
  Wrench,
  FileText,
  Mail,
  Camera,
  Trophy,
  ArrowUp,
  Command,
  Globe,
  ExternalLink,
  Download,
  Send,
  Cat,
} from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { siteConfig } from "@/data/site.config";
import { useLenis } from "@/components/providers/SmoothScroll";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  shortcut?: string;
  action: () => void;
  section: "recent" | "navigation" | "actions";
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const [nekoMascotMode, setNekoMascotMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const { lenis } = useLenis();

  // Load recent + neko state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cmd-recent");
      if (saved) setRecentCommands(JSON.parse(saved));
    } catch {
      // ignore
    }
    const storedMascot = localStorage.getItem("neko-mascot");
    setNekoMascotMode(storedMascot === "true");

    const onMascotToggle = () => setNekoMascotMode((prev) => !prev);
    window.addEventListener("neko-sprite-toggle", onMascotToggle);
    return () => {
      window.removeEventListener("neko-sprite-toggle", onMascotToggle);
    };
  }, []);

  const saveRecent = useCallback(
    (id: string) => {
      try {
        const updated = [id, ...recentCommands.filter((r) => r !== id)].slice(
          0,
          5
        );
        setRecentCommands(updated);
        localStorage.setItem("cmd-recent", JSON.stringify(updated));
      } catch {
        // ignore
      }
    },
    [recentCommands]
  );

  const commands: CommandItem[] = [
    {
      id: "share",
      label: "Share Page",
      description: "Share the current page URL",
      icon: <Share2 size={16} className="text-text-secondary" />,
      shortcut: "Shift+S",
      action: async () => {
        const url = window.location.href;
        if (navigator.share) {
          try {
            await navigator.share({ url });
            return;
          } catch {
            // user cancelled or API failed — fall through to clipboard
          }
        }
        navigator.clipboard.writeText(url);
      },
      section: "actions",
    },
    {
      id: "theme",
      label: resolvedTheme === "dark" ? "Switch to Light" : "Switch to Dark",
      description: "Toggle between light and dark mode",
      icon:
        resolvedTheme === "dark" ? (
          <Sun size={16} className="text-text-secondary" />
        ) : (
          <Moon size={16} className="text-text-secondary" />
        ),
      shortcut: "Ctrl+T",
      action: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      section: "actions",
    },
    {
      id: "spotify",
      label: "Open Spotify Song",
      description: "Open the currently playing or last played Spotify song",
      icon: <Music size={16} className="text-text-secondary" />,
      shortcut: "Shift+M",
      action: async () => {
        try {
          const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
          if (res.ok) {
            const data = (await res.json()) as { url?: string | null };
            if (data.url) {
              window.open(data.url, "_blank");
              return;
            }
          }
          window.open("https://open.spotify.com", "_blank");
        } catch {
          window.open("https://open.spotify.com", "_blank");
        }
      },
      section: "actions",
    },
    {
      id: "top",
      label: "Scroll to Top",
      description: "Scroll back to the top of the page",
      icon: <ArrowUp size={16} className="text-text-secondary" />,
      shortcut: "Ctrl+U",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      section: "actions",
    },
    {
      id: "github",
      label: "Visit GitHub",
      description: "Open GitHub profile in a new tab",
      icon: <Globe size={16} className="text-text-secondary" />,
      action: () => window.open(siteConfig.socials.github.url, "_blank"),
      section: "actions",
    },
    {
      id: "linkedin",
      label: "Visit LinkedIn",
      description: "Open LinkedIn profile in a new tab",
      icon: <ExternalLink size={16} className="text-text-secondary" />,
      action: () => window.open(siteConfig.socials.linkedin.url, "_blank"),
      section: "actions",
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Download the latest resume PDF",
      icon: <Download size={16} className="text-text-secondary" />,
      action: () => window.open(siteConfig.resume.path, "_blank"),
      section: "actions",
    },
    {
      id: "mail",
      label: "Send Mail",
      description: `Send an email to ${siteConfig.email}`,
      icon: <Send size={16} className="text-text-secondary" />,
      action: () => window.open(`mailto:${siteConfig.email}`, "_blank"),
      section: "actions",
    },

    {
      id: "neko-mascot",
      label: nekoMascotMode ? "Switch to Neko" : "Switch to Mascot",
      description: "Toggle between default neko and custom mascot sprites",
      icon: <Cat size={16} className="text-text-secondary" />,
      action: () => window.dispatchEvent(new Event("neko-sprite-toggle")),
      section: "actions",
    },
    {
      id: "home",
      label: "Go to Home",
      description: "Navigate to the homepage",
      icon: <Home size={16} className="text-text-secondary" />,
      shortcut: "H",
      action: () => {
        window.location.href = "/";
      },
      section: "navigation",
    },
    {
      id: "work",
      label: "Go to Work",
      description: "View work experience",
      icon: <Briefcase size={16} className="text-text-secondary" />,
      shortcut: "W",
      action: () => {
        window.location.href = "/#experience";
      },
      section: "navigation",
    },
    {
      id: "projects",
      label: "Go to Projects",
      description: "Browse projects",
      icon: <FolderKanban size={16} className="text-text-secondary" />,
      shortcut: "P",
      action: () => {
        window.location.href = "/#projects";
      },
      section: "navigation",
    },
    {
      id: "skills",
      label: "Go to Skills",
      description: "View tech stack and skills",
      icon: <Wrench size={16} className="text-text-secondary" />,
      shortcut: "S",
      action: () => {
        window.location.href = "/#skills";
      },
      section: "navigation",
    },
    {
      id: "blog",
      label: "Go to Blog",
      description: "Read blog posts",
      icon: <FileText size={16} className="text-text-secondary" />,
      shortcut: "B",
      action: () => {
        window.location.href = "/blog";
      },
      section: "navigation",
    },
    {
      id: "photography",
      label: "Go to Photography",
      description: "View photography gallery",
      icon: <Camera size={16} className="text-text-secondary" />,
      shortcut: "G",
      action: () => {
        window.location.href = "/photography";
      },
      section: "navigation",
    },
    {
      id: "hackathons",
      label: "Go to Hackathons",
      description: "View hackathon achievements",
      icon: <Trophy size={16} className="text-text-secondary" />,
      shortcut: "K",
      action: () => {
        window.location.href = "/hackathons";
      },
      section: "navigation",
    },
    {
      id: "contact",
      label: "Go to Contact",
      description: "Get in touch",
      icon: <Mail size={16} className="text-text-secondary" />,
      shortcut: "C",
      action: () => {
        window.location.href = "/#contact";
      },
      section: "navigation",
    },
  ];

  // Filter commands
  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  // Group by section
  const recentItems = filtered.filter(
    (c) => recentCommands.includes(c.id) && c.section !== "navigation"
  );
  const recentNavItems = filtered.filter(
    (c) => recentCommands.includes(c.id) && c.section === "navigation"
  );
  const navItems = filtered.filter(
    (c) => !recentCommands.includes(c.id) && c.section === "navigation"
  );
  const actionItems = filtered.filter(
    (c) => !recentCommands.includes(c.id) && c.section !== "navigation"
  );

  // Build ordered list for keyboard navigation
  const orderedItems: CommandItem[] = [
    ...recentItems,
    ...actionItems,
    ...recentNavItems,
    ...navItems,
  ];

  // Reset selected when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Lock body scroll when opened — compensate scrollbar width to prevent layout shift
  const scrollYRef = useRef(0);
  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.scrollBehavior = "auto";
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.scrollBehavior = "";
      window.scrollTo(0, scrollYRef.current);
      lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.scrollBehavior = "";
      window.scrollTo(0, scrollYRef.current);
      lenis?.start();
    };
  }, [open]);

  // GSAP open/close animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      const t = setTimeout(() => {
        if (backdropRef.current) {
          gsap.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "power2.out" }
          );
        }
        if (modalRef.current) {
          gsap.fromTo(
            modalRef.current,
            { opacity: 0, scale: 0.95, y: -10 },
            { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out", delay: 0.05 }
          );
        }
        inputRef.current?.focus();
      }, 10);
      return () => clearTimeout(t);
    } else if (mounted) {
      const tl = gsap.timeline({
        onComplete: () => setMounted(false),
      });
      if (modalRef.current) {
        tl.to(modalRef.current, {
          opacity: 0,
          scale: 0.97,
          y: -8,
          duration: 0.18,
          ease: "power2.in",
        });
      }
      if (backdropRef.current) {
        tl.to(
          backdropRef.current,
          { opacity: 0, duration: 0.2, ease: "power2.in" },
          "<0.05"
        );
      }
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (!open) {
        // Quick nav shortcuts when closed
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        const key = e.key.toLowerCase();
        if (!e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
          const match = commands.find(
            (c) => c.section === "navigation" && c.shortcut?.toLowerCase() === key
          );
          if (match) {
            e.preventDefault();
            match.action();
            saveRecent(match.id);
          }
        }
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % orderedItems.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + orderedItems.length) % orderedItems.length);
      }
      if (e.key === "Enter" && orderedItems[selectedIndex]) {
        e.preventDefault();
        const item = orderedItems[selectedIndex];
        item.action();
        saveRecent(item.id);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, orderedItems, selectedIndex, saveRecent, commands]);

  // Scroll selected into view
  useEffect(() => {
    if (open && listRef.current) {
      const selected = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (selected) {
        selected.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, open]);

  const handleSelect = (item: CommandItem) => {
    item.action();
    saveRecent(item.id);
    setOpen(false);
  };

  const renderItem = (item: CommandItem) => {
    const actualIndex = orderedItems.findIndex((o) => o.id === item.id);
    return (
      <button
        key={item.id}
        data-index={actualIndex}
        onClick={() => handleSelect(item)}
        onMouseEnter={() => setSelectedIndex(actualIndex)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors cursor-pointer rounded-md hover:bg-hover-tint"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded bg-bg-elevated border border-border-primary shrink-0">
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-text-primary truncate">
            {item.label}
          </div>
          <div className="text-xs text-text-muted truncate">
            {item.description}
          </div>
        </div>
        {item.shortcut && (
          <div className="flex items-center gap-1 shrink-0">
            {item.shortcut.split("+").map((part, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 text-[10px] font-medium text-text-muted bg-bg-elevated border border-border-primary rounded"
              >
                {part}
              </span>
            ))}
          </div>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 h-9 px-2.5 rounded-md bg-bg-badge/10 border-2 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-border-primary hover:border-border-secondary transition-colors duration-200 cursor-pointer"
        aria-label="Open command palette"
      >
        <Search size={14} className="text-text-muted" />
        <div className="flex items-center gap-0.5">
          <span className="px-1 py-0.5 text-[10px] font-medium text-text-muted bg-bg-elevated border border-border-primary rounded">
            Ctrl
          </span>
          <span className="px-1 py-0.5 text-[10px] font-medium text-text-muted bg-bg-elevated border border-border-primary rounded">
            K
          </span>
        </div>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-bg-badge/10 border border-border-primary hover:border-border-secondary transition-colors duration-200 cursor-pointer"
        aria-label="Open command palette"
      >
        <Search size={16} className="text-text-muted" />
      </button>

      {/* Overlay — rendered via portal to escape navbar backdrop-blur containing block */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999]">
            {/* Full-page backdrop blur + noise */}
            <div
              ref={backdropRef}
              className="absolute inset-0 bg-bg-primary/40"
              style={{
                backdropFilter: "blur(5px) saturate(180%)",
                WebkitBackdropFilter: "blur(80px) saturate(180%)",
                filter: "brightness(0.92)",
                opacity: 0,
              }}
            />

            {/* Modal */}
            <div
              className="absolute inset-0 flex items-start justify-center pt-[20vh] px-4"
              onClick={() => setOpen(false)}
            >
              <div
                ref={modalRef}
                className="w-full max-w-md bg-bg-card rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-border-primary/40 overflow-hidden flex flex-col max-h-[60vh]"
                style={{ opacity: 0 }}
                onWheel={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent-touch
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border-primary/30 bg-bg-elevated/40">
                  <Search size={18} className="text-text-muted shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none focus:outline-none focus-visible:outline-none !outline-none"
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="px-1.5 py-0.5 text-[10px] font-medium text-text-muted bg-bg-elevated border border-border-primary rounded">
                      ESC
                    </span>
                  </div>
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2 hide-scrollbar touch-pan-y"
                  onWheel={(e) => e.stopPropagation()}
                >
                  {orderedItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-text-muted">
                      <Command size={32} className="mb-2 opacity-50" />
                      <p className="text-sm">No commands found</p>
                    </div>
                  ) : (
                    <>
                      {/* Recent Actions */}
                      {recentItems.length > 0 && (
                        <div className="mb-2">
                          <div className="px-3 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                            Recent
                          </div>
                          {recentItems.map((item, i) =>
                            renderItem(item)
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      {actionItems.length > 0 && (
                        <div className="mb-2">
                          {recentItems.length === 0 && (
                            <div className="px-3 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                              Actions
                            </div>
                          )}
                          {actionItems.map((item, i) =>
                            renderItem(item)
                          )}
                        </div>
                      )}

                      {/* Recent Navigation */}
                      {recentNavItems.length > 0 && (
                        <div className="mb-2">
                          <div className="px-3 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                            Recent
                          </div>
                          {recentNavItems.map((item, i) =>
                            renderItem(item)
                          )}
                        </div>
                      )}

                      {/* Navigation */}
                      {navItems.length > 0 && (
                        <div>
                          {recentNavItems.length === 0 && (
                            <div className="px-3 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                              Navigation
                            </div>
                          )}
                          {navItems.map((item, i) =>
                            renderItem(item)
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-3 px-4 py-2 border-t border-border-primary/30 bg-bg-elevated/40 text-[10px] text-text-muted">
                  <div className="flex items-center gap-1">
                    <span className="px-1 py-0.5 bg-bg-elevated border border-border-primary rounded">
                      ↑↓
                    </span>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="px-1 py-0.5 bg-bg-elevated border border-border-primary rounded">
                      ↵
                    </span>
                    <span>to select</span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
