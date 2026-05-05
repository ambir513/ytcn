import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function LimitationsPage() {
  const nav = getPageNav("/docs/limitations");

  return (
    <>
      <PageHeader
        badge="Reference"
        title="Limitations"
        description="What ytcn cannot do, and why."
      />

      <Callout type="warning" title="Read before shipping">
        This page exists because honest documentation builds trust. Read it
        before building production features that depend on YouTube API behavior.
      </Callout>

      <h2 id="youtube-tos" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        YouTube Terms of Service
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Hiding YouTube branding may violate the{" "}
        <a
          href="https://developers.google.com/youtube/terms/api-services-terms-of-service"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          YouTube API Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="https://developers.google.com/youtube/terms/branding-guidelines"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          Branding Guidelines
        </a>
        . These documents require that the YouTube player be displayed &quot;as
        provided&quot; and prohibit modifications that obscure the YouTube logo.
        ytcn provides the tools — you are responsible for compliance with
        YouTube&apos;s terms.
      </p>

      <h2 id="quality-control" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Quality control
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The YouTube IFrame API&apos;s{" "}
        <code className="font-mono text-foreground text-sm">
          setPlaybackQualityRange()
        </code>{" "}
        is advisory, not imperative. YouTube uses DASH adaptive streaming,
        which automatically selects quality based on bandwidth, screen size,
        and device capabilities. You can request a quality level, but YouTube
        may ignore it.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4">
        For this reason, ytcn does not include quality controls. Displaying a
        quality selector that doesn&apos;t actually work would be dishonest. The
        video will play at the best quality YouTube deems appropriate.
      </p>

      <h2 id="mobile-browsers" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Mobile browsers
      </h2>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Limitation
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Affected platform
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Autoplay blocked",
                "iOS, Android",
                "Browser requires user interaction before playing audio. Muted autoplay usually works.",
              ],
              [
                "Native fullscreen",
                "iOS Safari",
                "Fullscreen opens the native video player. Custom controls are not visible.",
              ],
              [
                "cursor-none ignored",
                "All touch devices",
                "Touch devices don't have a cursor. The idle controls cursor-hiding has no effect.",
              ],
              [
                "Volume control",
                "iOS",
                "iOS manages volume at the system level. The YouTube IFrame API volume methods have no effect.",
              ],
            ].map(([limitation, platform, details]) => (
              <tr
                key={limitation}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium">{limitation}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {platform}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="caption-flash" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Caption flash (signed-in users)
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        YouTube automatically enables captions for signed-in users who have
        caption preferences set. ytcn calls{" "}
        <code className="font-mono text-foreground text-sm">
          unloadModule(&apos;captions&apos;)
        </code>{" "}
        on every PLAYING event to suppress them. However, there may be a brief
        flash (under 200ms) before the suppression takes effect on initial play.
      </p>

      <h2 id="private-videos" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Private / embeds-disabled videos
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        If a video is private or has embedding disabled:
      </p>
      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Thumbnail probing fails →{" "}
          <code className="font-mono text-foreground text-sm">
            thumbnailFailed = true
          </code>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          ytcn skips the thumbnail phase and goes straight to iframe loading
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          The iframe may show a YouTube error message. Handle this via the YT
          error event.
        </li>
      </ul>

      <h2 id="ssr-note" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        SSR
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        All ytcn components use the{" "}
        <code className="font-mono text-foreground text-sm">
          &quot;use client&quot;
        </code>{" "}
        directive. They do not render meaningful HTML on the server — the
        player is a client-side iframe. You can safely import them from Server
        Components without hydration errors.
      </p>
      <Callout type="note">
        If SEO for video content matters, add structured data (JSON-LD) with
        the video&apos;s title, description, and thumbnail URL to your page head.
        The ytcn player itself is not indexable by search engines.
      </Callout>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
