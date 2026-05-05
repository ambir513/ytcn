import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function SsrPage() {
  const nav = getPageNav("/docs/advanced/ssr");

  return (
    <>
      <PageHeader
        badge="Advanced"
        title="SSR / Next.js"
        description="How ytcn works with Server Components and server-side rendering."
      />

      <h2 id="overview" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Overview
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        All ytcn components are marked with{" "}
        <code className="font-mono text-foreground text-sm">
          &quot;use client&quot;
        </code>
        . This means they run exclusively in the browser. However, you can
        safely import them from Server Components — Next.js handles the client
        boundary automatically.
      </p>

      <h2 id="safe-import" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Safe import pattern
      </h2>
      <CodeBlock
        filename="app/videos/[id]/page.tsx"
        code={`// This is a Server Component (no "use client" directive)
import { YtcnPlayer } from "@/components/ytcn/ytcn-player"

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Server-side data fetching
  const video = await getVideoDetails(id)

  return (
    <main>
      <h1>{video.title}</h1>
      {/* YtcnPlayer is "use client" — Next.js handles the boundary */}
      <YtcnPlayer videoId={id} />
    </main>
  )
}`}
      />

      <Callout type="note" title="No window access at module level">
        ytcn components never access{" "}
        <code className="font-mono">window</code>,{" "}
        <code className="font-mono">document</code>, or{" "}
        <code className="font-mono">navigator</code> at module scope. All
        browser APIs are accessed inside{" "}
        <code className="font-mono">useEffect</code> or event handlers. This
        ensures zero SSR errors during the build phase.
      </Callout>

      <h2 id="dynamic-import" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Dynamic import (optional)
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        If you want to lazy-load the player to reduce the initial JavaScript
        bundle, use <code className="font-mono text-foreground text-sm">next/dynamic</code>:
      </p>
      <CodeBlock
        filename="components/lazy-player.tsx"
        code={`import dynamic from "next/dynamic"

const LazyPlayer = dynamic(
  () => import("@/components/ytcn/ytcn-player").then((m) => m.YtcnPlayer),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-muted rounded-lg animate-pulse" />
    ),
  }
)

export function VideoSection({ videoId }: { videoId: string }) {
  return <LazyPlayer videoId={videoId} />
}`}
      />

      <h2 id="pages-router" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Pages Router
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        ytcn works with both the App Router and Pages Router. In the Pages
        Router, all pages are client components by default, so no special
        handling is needed. Just import and use directly.
      </p>
      <CodeBlock
        filename="pages/video.tsx"
        code={`import { YtcnPlayer } from "@/components/ytcn/ytcn-player"

export default function VideoPage() {
  return <YtcnPlayer videoId="dQw4w9WgXcQ" />
}`}
      />

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
