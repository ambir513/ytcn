import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function QuickStartPage() {
  const nav = getPageNav("/docs/quick-start");

  return (
    <>
      <PageHeader
        badge="Guide"
        title="Quick Start"
        description="Working YouTube player in your app in under 5 minutes."
      />

      <h2 id="basic-usage" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Basic usage
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The simplest way to add a YouTube player to your app. Just pass a video
        ID and ytcn handles everything — thumbnail loading, iframe creation,
        controls, keyboard shortcuts, and fullscreen.
      </p>
      <CodeBlock
        filename="app/page.tsx"
        code={`import { YtcnPlayer } from "@/components/ytcn/ytcn-player"

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <YtcnPlayer videoId="dQw4w9WgXcQ" />
    </div>
  )
}`}
      />

      <h2 id="nextjs-app-router" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        With Next.js App Router
      </h2>
      <Callout type="note" title="Server Components are safe">
        YtcnPlayer is already marked with &quot;use client&quot;. You can import it from
        Server Components — Next.js handles the client boundary automatically.
      </Callout>
      <CodeBlock
        filename="app/videos/[id]/page.tsx"
        code={`// This is a Server Component — no "use client" directive needed
import { YtcnPlayer } from "@/components/ytcn/ytcn-player"

interface Props {
  params: Promise<{ id: string }>
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Video</h1>
      <YtcnPlayer videoId={id} />
    </main>
  )
}`}
      />

      <h2 id="resume-playback" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Resume from saved position
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Use <code className="font-mono text-foreground text-sm">startAt</code>{" "}
        combined with{" "}
        <code className="font-mono text-foreground text-sm">onTimeUpdate</code>{" "}
        to implement resume-from-where-you-left-off. This pattern is perfect
        for LMS platforms and course builders.
      </p>
      <CodeBlock
        filename="components/resumable-player.tsx"
        code={`"use client"

import { YtcnPlayer } from "@/components/ytcn/ytcn-player"
import { useRef, useCallback } from "react"

export function ResumablePlayer({ videoId }: { videoId: string }) {
  const key = \`ytcn-progress-\${videoId}\`
  const saved = typeof window !== "undefined"
    ? Number(localStorage.getItem(key) ?? 0)
    : 0

  const lastSave = useRef(0)

  const handleTimeUpdate = useCallback(
    (current: number) => {
      // Throttle saves to every 5 seconds
      if (current - lastSave.current > 5) {
        localStorage.setItem(key, String(Math.floor(current)))
        lastSave.current = current
      }
    },
    [key]
  )

  const handleEnd = useCallback(() => {
    localStorage.removeItem(key)
    console.log("Video complete!")
  }, [key])

  return (
    <YtcnPlayer
      videoId={videoId}
      startAt={saved}
      onTimeUpdate={handleTimeUpdate}
      onEnd={handleEnd}
    />
  )
}`}
      />

      <h2 id="playlist" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Playlist auto-advance
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Use the <code className="font-mono text-foreground text-sm">onEnd</code>{" "}
        callback to advance to the next video in a playlist.
      </p>
      <CodeBlock
        filename="components/playlist-player.tsx"
        code={`"use client"

import { YtcnPlayer } from "@/components/ytcn/ytcn-player"
import { useState } from "react"

const VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up" },
  { id: "jNQXAC9IVRw", title: "Me at the zoo" },
  { id: "9bZkp7q19f0", title: "Gangnam Style" },
]

export function PlaylistPlayer() {
  const [index, setIndex] = useState(0)
  const video = VIDEOS[index]!

  return (
    <div>
      <YtcnPlayer
        videoId={video.id}
        onEnd={() => {
          if (index < VIDEOS.length - 1) {
            setIndex((i) => i + 1)
          }
        }}
      />
      <div className="mt-4 space-y-2">
        {VIDEOS.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setIndex(i)}
            className={\`block w-full text-left px-3 py-2 rounded-md text-sm \${
              i === index
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-accent"
            }\`}
          >
            {v.title}
          </button>
        ))}
      </div>
    </div>
  )
}`}
      />

      <h2 id="headless" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Headless — custom UI
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        If the default controls don&apos;t match your design, use the{" "}
        <code className="font-mono text-foreground text-sm">useYtcnPlayer</code>{" "}
        hook to build a completely custom UI. See the{" "}
        <a
          href="/docs/advanced/headless"
          className="text-foreground underline underline-offset-4 hover:text-foreground/80"
        >
          Headless Usage
        </a>{" "}
        guide for full examples.
      </p>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
