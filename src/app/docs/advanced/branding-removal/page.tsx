import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { getPageNav } from "@/lib/navigation";

export default function BrandingRemovalPage() {
  const nav = getPageNav("/docs/advanced/branding-removal");

  return (
    <>
      <PageHeader
        badge="Advanced"
        title="Branding Removal"
        description="How ytcn suppresses YouTube chrome — and the limits of each technique."
      />

      <h2 id="techniques" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Techniques used
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        ytcn uses a combination of IFrame API parameters, CSS, and lifecycle
        tricks to remove YouTube branding. Here&apos;s every technique and what it
        suppresses:
      </p>

      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Technique
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                What it removes
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["controls: 0", "Native YouTube controls bar"],
              ["modestbranding: 1", "YouTube logo in controls"],
              ["rel: 0", "Related videos at the end"],
              ["iv_load_policy: 3", "Annotations"],
              ["disablekb: 1", "YouTube keyboard shortcuts (we use our own)"],
              ["Thumbnail-first loading", "YouTube red play button on initial load"],
              ["Cover div overlay", "YouTube watermark during CUED state"],
              [
                "Iframe offset + overflow hidden",
                "Top info bar and bottom gradient",
              ],
              [
                "unloadModule('captions')",
                "Automatic caption overlay (signed-in users)",
              ],
            ].map(([technique, removes]) => (
              <tr
                key={technique}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  {technique}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {removes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="cover-div" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Cover div technique
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        During the &quot;loading&quot; phase (after click, before ready), a cover div
        sits on top of the iframe. This prevents the YouTube red play button
        and logo from appearing during initialization. The cover is removed
        with an opacity transition once the video starts playing.
      </p>
      <CodeBlock
        filename="cover-div.tsx"
        code={`{/* Cover div — hides YouTube branding during initialization */}
{state.phase !== "ready" && (
  <div className="absolute inset-0 bg-black z-10 transition-opacity duration-300" />
)}`}
      />

      <h2 id="caption-suppression" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Caption suppression
      </h2>
      <Callout type="warning" title="Flash possible">
        For signed-in YouTube users, captions may briefly flash before{" "}
        <code className="font-mono">unloadModule(&apos;captions&apos;)</code> fires. ytcn
        re-suppresses captions on every PLAYING event to minimize this, but a
        brief flash (under 200ms) is possible on initial play.
      </Callout>

      <h2 id="tos-note" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Terms of Service note
      </h2>
      <Callout type="danger" title="Use at your own risk">
        Hiding YouTube branding may violate the{" "}
        <a
          href="https://developers.google.com/youtube/terms/api-services-terms-of-service"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        >
          YouTube API Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="https://developers.google.com/youtube/terms/branding-guidelines"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        >
          Branding Guidelines
        </a>
        . Review these documents and make your own decision. ytcn provides the
        tools — you decide how to use them.
      </Callout>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
