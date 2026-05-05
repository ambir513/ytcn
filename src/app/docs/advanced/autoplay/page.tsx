import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function AutoplayPage() {
  const nav = getPageNav("/docs/advanced/autoplay");

  return (
    <>
      <PageHeader
        badge="Advanced"
        title="Autoplay"
        description="How autoplay works across browsers and how ytcn handles it."
      />

      <h2 id="browser-policies" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Browser autoplay policies
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Modern browsers restrict autoplay to prevent unwanted noise. The
        general rule is: autoplay with sound is blocked unless the user has
        interacted with the page. Autoplay with muted audio is usually allowed.
      </p>

      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Browser
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Muted autoplay
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Unmuted autoplay
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Chrome (desktop)", "✅ Always", "🔶 After user interaction"],
              ["Firefox", "✅ Always", "🔶 After user interaction"],
              ["Safari (desktop)", "✅ Always", "❌ Blocked by default"],
              ["iOS Safari", "✅ Always (inline)", "❌ Blocked"],
              ["Android Chrome", "✅ Always", "🔶 After user interaction"],
            ].map(([browser, muted, unmuted]) => (
              <tr
                key={browser}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{browser}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{muted}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{unmuted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="ytcn-approach" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        ytcn&apos;s approach
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        ytcn uses a thumbnail-first strategy by default. The video does not
        autoplay — the user clicks the thumbnail to start. This avoids all
        browser autoplay restrictions and provides a faster perceived load time.
      </p>

      <Callout type="info" title="No flicker">
        Because ytcn loads a CDN thumbnail first (under 100ms), the user sees
        content immediately. The iframe loads behind the thumbnail. When the
        user clicks play, the transition is seamless — no black screen, no
        YouTube branding flash.
      </Callout>

      <h2 id="force-autoplay" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Forcing autoplay (advanced)
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        If you need autoplay behavior, you can use the headless hook to
        programmatically start playback after a user interaction elsewhere on
        the page:
      </p>
      <CodeBlock
        filename="autoplay-after-interaction.tsx"
        code={`"use client"

import { useYtcnPlayer } from "@/hooks/ytcn/use-ytcn-player"
import { useEffect, useRef } from "react"

export function AutoplayPlayer({ videoId }: { videoId: string }) {
  const { containerRef, playerDivRef, state, controls } =
    useYtcnPlayer({ videoId })
  const hasAutoPlayed = useRef(false)

  // Autoplay once the player is ready
  useEffect(() => {
    if (state.phase === "ready" && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true
      controls.togglePlay()
    }
  }, [state.phase, controls])

  return (
    <div ref={containerRef} className="relative aspect-video">
      <div ref={playerDivRef} className="absolute inset-0" />
    </div>
  )
}`}
      />

      <Callout type="warning" title="Muted autoplay">
        For reliable autoplay without user interaction, you must mute the
        video. Call{" "}
        <code className="font-mono">controls.toggleMute()</code> before{" "}
        <code className="font-mono">controls.togglePlay()</code>.
      </Callout>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
