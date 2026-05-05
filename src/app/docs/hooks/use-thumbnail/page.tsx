import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { getPageNav } from "@/lib/navigation";

export default function UseThumbnailPage() {
  const nav = getPageNav("/docs/hooks/use-thumbnail");

  return (
    <>
      <PageHeader
        badge="Hook"
        title="useThumbnail"
        description="Resolves the highest available YouTube thumbnail for a video ID."
      />

      <h2 id="how-it-works" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        How it works
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Probes thumbnail URLs in priority order using imperative{" "}
        <code className="font-mono text-foreground text-sm">Image()</code>{" "}
        objects. Stops at the first URL that loads successfully. Resets
        automatically when <code className="font-mono text-foreground text-sm">videoId</code>{" "}
        changes.
      </p>

      <h2 id="priority-order" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Priority order
      </h2>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Priority</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">URL</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resolution</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Always exists?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "maxresdefault.jpg", "1280×720", "No (720p+ uploads only)"],
              ["2", "hqdefault.jpg", "480×360", "Almost always"],
              ["3", "mqdefault.jpg", "320×180", "Yes"],
              ["4", "default.jpg", "120×90", "Yes"],
            ].map(([priority, url, res, exists]) => (
              <tr key={priority} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-sm font-medium">{priority}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{url}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{res}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{exists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="returns" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Returns
      </h2>
      <PropsTable
        props={[
          { name: "thumbnailUrl", type: "string | null", description: "Best available thumbnail URL, or null while still loading." },
          { name: "thumbnailLoaded", type: "boolean", description: "True when the thumbnail image has loaded successfully." },
          { name: "thumbnailFailed", type: "boolean", description: "True when all thumbnail URLs failed to load (private video)." },
        ]}
      />

      <h2 id="handling-failures" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Handling failures
      </h2>
      <CodeBlock
        filename="failure-handling.tsx"
        code={`const { thumbnailUrl, thumbnailFailed } = useThumbnail(videoId)

// If thumbnail failed, skip directly to iframe loading
if (thumbnailFailed) {
  setPhase("loading")
  initializeIframe()
}

// Otherwise show the thumbnail while loading
if (thumbnailUrl) {
  return <img src={thumbnailUrl} alt="Video thumbnail" />
}`}
      />

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
