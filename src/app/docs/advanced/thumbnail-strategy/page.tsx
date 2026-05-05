import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function ThumbnailStrategyPage() {
  const nav = getPageNav("/docs/advanced/thumbnail-strategy");

  return (
    <>
      <PageHeader
        badge="Advanced"
        title="Thumbnail Strategy"
        description="How ytcn loads thumbnails and why it matters for perceived performance."
      />

      <h2 id="three-phase-lifecycle" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Three-phase lifecycle
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        ytcn uses a three-phase state machine to manage the player lifecycle.
        This eliminates the black flash that occurs when loading YouTube iframes
        directly.
      </p>

      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Phase
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                What&apos;s visible
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "thumbnail",
                "CDN thumbnail + play button overlay",
                "< 100ms to first paint",
              ],
              [
                "loading",
                "Blurred thumbnail + spinner",
                "1–3s (iframe initialization)",
              ],
              [
                "ready",
                "Live video with custom controls",
                "Rest of session",
              ],
            ].map(([phase, visible, duration]) => (
              <tr
                key={phase}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-sm font-medium">
                  {phase}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {visible}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="thumbnail-probing" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Thumbnail probing
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The{" "}
        <code className="font-mono text-foreground text-sm">useThumbnail</code>{" "}
        hook probes YouTube&apos;s CDN in priority order. It uses imperative{" "}
        <code className="font-mono text-foreground text-sm">Image()</code>{" "}
        objects (not <code className="font-mono text-foreground text-sm">fetch</code>)
        to avoid CORS issues.
      </p>

      <CodeBlock
        filename="thumbnail probing order"
        language="text"
        code={`Priority 1: https://img.youtube.com/vi/{id}/maxresdefault.jpg  (1280×720)
Priority 2: https://img.youtube.com/vi/{id}/hqdefault.jpg       (480×360)
Priority 3: https://img.youtube.com/vi/{id}/mqdefault.jpg       (320×180)
Priority 4: https://img.youtube.com/vi/{id}/default.jpg          (120×90)`}
      />

      <Callout type="note" title="Why not just use maxresdefault?">
        Not all videos have a maxresdefault thumbnail. Videos uploaded in
        standard definition (480p or below) only have the lower-resolution
        options. The probing strategy ensures ytcn always shows the best
        available thumbnail without requiring the user to specify a URL.
      </Callout>

      <h2 id="performance" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Performance impact
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Loading a thumbnail from YouTube&apos;s CDN is dramatically faster than
        loading the full iframe:
      </p>
      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          <strong className="text-foreground">Thumbnail:</strong> ~20KB image,
          loads in under 100ms on broadband
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          <strong className="text-foreground">YouTube iframe:</strong> ~500KB+
          of JavaScript, 1–3 seconds to initialize
        </li>
      </ul>

      <h2 id="custom-thumbnails" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Custom thumbnails
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        If you want to use your own thumbnails instead of YouTube&apos;s CDN, bypass
        the hook and pass a URL directly:
      </p>
      <CodeBlock
        filename="custom-thumbnail.tsx"
        code={`// Skip useThumbnail and provide your own
<img
  src="/my-custom-thumbnail.jpg"
  alt="Video thumbnail"
  className="absolute inset-0 w-full h-full object-cover"
/>`}
      />

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
