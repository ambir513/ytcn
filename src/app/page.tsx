"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconBrandGithub,
  IconCopy,
  IconCheck,
  IconPlayerPlayFilled,
  IconCode,
  IconPuzzle,
  IconKeyboard,
  IconPhoto,
  IconMaximize,
  IconServer,
  IconBrandTypescript,
  IconTerminal2,
  IconArrowRight,
} from "@tabler/icons-react";

const FEATURES = [
  {
    icon: IconPlayerPlayFilled,
    title: "Zero YouTube Branding",
    description:
      "Thumbnail-first loading, iframe offset, and cover div eliminate all YouTube chrome before a single frame plays.",
  },
  {
    icon: IconCopy,
    title: "Copy, Don't Install",
    description:
      "One CLI command copies components into your project. You own every line. Modify anything without forking.",
  },
  {
    icon: IconPuzzle,
    title: "shadcn/ui Native",
    description:
      "Built on Button, Slider, and Popover. Uses your existing design tokens. Zero new dependencies.",
  },
  {
    icon: IconPhoto,
    title: "Autoplay Without Flicker",
    description:
      "Thumbnail shown instantly while iframe loads in background. Seamless fade when video is ready. No black screen.",
  },
  {
    icon: IconBrandTypescript,
    title: "Fully Typed",
    description:
      "Strict TypeScript throughout. Every prop, state field, and control method has explicit types and JSDoc.",
  },
  {
    icon: IconServer,
    title: "SSR Compatible",
    description:
      'All components are "use client". Safe to import from Server Components. No window access at module level.',
  },
];

const USAGE_TABS = [
  {
    label: "Basic",
    code: `import { YtcnPlayer } from "@/components/ytcn/ytcn-player"

export default function VideoPage() {
  return (
    <YtcnPlayer videoId="dQw4w9WgXcQ" />
  )
}`,
  },
  {
    label: "With Resume",
    code: `import { YtcnPlayer } from "@/components/ytcn/ytcn-player"

export default function CoursePage() {
  const saved = localStorage.getItem("progress") ?? "0"

  return (
    <YtcnPlayer
      videoId="dQw4w9WgXcQ"
      startAt={Number(saved)}
      onTimeUpdate={(current) => {
        localStorage.setItem("progress", String(current))
      }}
      onEnd={() => {
        localStorage.removeItem("progress")
        console.log("Course complete!")
      }}
    />
  )
}`,
  },
  {
    label: "Headless",
    code: `import { useYtcnPlayer } from "@/hooks/ytcn/use-ytcn-player"

function CustomPlayer({ videoId }: { videoId: string }) {
  const { containerRef, playerDivRef, state, controls } =
    useYtcnPlayer({ videoId })

  return (
    <div ref={containerRef} className="relative aspect-video">
      <div ref={playerDivRef} className="absolute inset-0" />
      <button onClick={controls.togglePlay}>
        {state.isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  )
}`,
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center justify-center h-7 w-7 rounded-md hover:bg-white/10 transition-colors shrink-0"
      aria-label="Copy"
    >
      {copied ? (
        <IconCheck className="size-3.5 text-green-400" />
      ) : (
        <IconCopy className="size-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between h-14 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-6 rounded-md bg-foreground flex items-center justify-center">
              <IconPlayerPlayFilled className="size-3 text-background" />
            </div>
            <span className="font-mono font-bold text-sm">ytcn</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/demo"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block font-medium"
            >
              Demo
            </Link>
            <Link
              href="/docs/introduction"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Docs
            </Link>
            <a
              href="https://github.com/nicholasxjy/ytcn"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-1.5"
            >
              <IconBrandGithub className="size-4" />
              GitHub
            </a>
            <Link
              href="/docs/introduction"
              className="inline-flex h-8 items-center rounded-full bg-foreground text-background px-4 text-xs font-medium hover:bg-foreground/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground mb-8 gap-1.5">
            <IconPuzzle className="size-3" />
            Built on shadcn/ui
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent pb-2">
            YouTube Player
            <br />
            Components
          </h1>

          {/* Subtext */}
          <p className="text-xl text-muted-foreground max-w-[520px] mx-auto mt-6 leading-relaxed">
            Copy-paste YouTube IFrame player components. Zero branding. Full
            control. Built for shadcn.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <Link
              href="/demo"
              className="inline-flex h-10 items-center rounded-full bg-foreground text-background px-6 text-sm font-medium hover:bg-foreground/90 transition-colors gap-2 shadow-lg shadow-primary/20"
            >
              <IconPlayerPlayFilled className="size-4" />
              Live Demo
            </Link>
            <Link
              href="/docs/introduction"
              className="inline-flex h-10 items-center rounded-full border border-border px-6 text-sm font-medium hover:bg-accent transition-colors gap-2"
            >
              Documentation
              <IconArrowRight className="size-4" />
            </Link>
            <a
              href="https://github.com/nicholasxjy/ytcn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-full border border-border px-6 text-sm font-medium hover:bg-accent transition-colors gap-2 hidden sm:flex"
            >
              <IconBrandGithub className="size-4" />
              GitHub
            </a>
          </div>

          {/* Install command */}
          <div className="max-w-lg mx-auto mt-8">
            <div className="flex items-center gap-2 rounded-lg bg-muted border border-border px-4 py-2.5 font-mono text-sm">
              <IconTerminal2 className="size-4 text-muted-foreground shrink-0" />
              <code className="flex-1 text-left text-muted-foreground truncate">
                npx shadcn@latest add https://ytcn.dev/r/player.json
              </code>
              <CopyButton text="npx shadcn@latest add https://ytcn.dev/r/player.json" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border p-6 bg-card hover:border-border/80 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
            >
              <div className="size-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <feature.icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Simple to use. Powerful to extend.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Drop in a one-liner or go fully headless with the hook API.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-border mb-0">
            {USAGE_TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm -mb-px transition-colors ${
                  activeTab === i
                    ? "border-b-2 border-foreground text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code block */}
          <div className="rounded-b-lg border border-t-0 border-border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
              <span className="text-xs text-muted-foreground font-mono">
                page.tsx
              </span>
              <CopyButton text={USAGE_TABS[activeTab]?.code ?? ""} />
            </div>
            <div className="bg-code-bg p-4 overflow-x-auto">
              <pre className="text-[13px] font-mono leading-relaxed">
                <code>{USAGE_TABS[activeTab]?.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Components list */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything you need
          </h2>
          <p className="text-muted-foreground mt-3">
            Each component is independently copyable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {[
            { name: "player", desc: "Full composed player" },
            { name: "controls", desc: "Controls bar" },
            { name: "progress", desc: "Timeline scrub bar" },
            { name: "volume", desc: "Volume + mute" },
            { name: "speed", desc: "Speed picker" },
            { name: "fullscreen", desc: "Fullscreen toggle" },
            { name: "overlay", desc: "Click-to-play" },
            { name: "loader", desc: "Loading state" },
          ].map((c) => (
            <div
              key={c.name}
              className="rounded-lg border border-border bg-card p-4 hover:border-foreground/20 transition-colors"
            >
              <p className="font-mono text-sm font-medium">ytcn-{c.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Ready to build?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Get started with ytcn in under 2 minutes. Read the docs or jump
          straight into the code.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/docs/introduction"
            className="inline-flex h-10 items-center rounded-full bg-foreground text-background px-6 text-sm font-medium hover:bg-foreground/90 transition-colors gap-2"
          >
            Read the Docs
            <IconArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/quick-start"
            className="inline-flex h-10 items-center rounded-full border border-border px-6 text-sm font-medium hover:bg-accent transition-colors"
          >
            Quick Start
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>ytcn — MIT License</p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/nicholasxjy/ytcn"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/docs/introduction"
              className="hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
