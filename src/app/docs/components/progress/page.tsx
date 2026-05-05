import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function ProgressPage() {
  const nav = getPageNav("/docs/components/progress");

  return (
    <>
      <PageHeader
        badge="Component"
        title="Progress"
        description="Timeline scrub bar with hover tooltip, buffer indicator, and drag-to-seek."
      />

      <h2 id="features" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Features
      </h2>
      <div className="space-y-2 mb-6">
        {[
          "Hover tooltip showing time at cursor position",
          "Click to seek to any position",
          "Drag to scrub through video",
          "Buffer progress indicator",
          "Smooth scrubber dot that appears on hover",
          "ARIA slider accessibility attributes",
        ].map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm">
            <span className="text-green-400">✓</span>
            <span className="text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>

      <h2 id="props" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Props
      </h2>
      <PropsTable
        props={[
          {
            name: "currentTime",
            type: "number",
            description: "Current playback position in seconds.",
            required: true,
          },
          {
            name: "duration",
            type: "number",
            description: "Total video duration in seconds.",
            required: true,
          },
          {
            name: "loadedFraction",
            type: "number",
            description: "Buffer progress from 0 to 1.",
            required: true,
          },
          {
            name: "onSeek",
            type: "(seconds: number) => void",
            description: "Called with the target position in seconds when the user seeks.",
            required: true,
          },
        ]}
      />

      <h2 id="implementation" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Implementation notes
      </h2>
      <Callout type="info" title="Drag behavior">
        Drag-to-seek uses global <code className="font-mono">window</code>{" "}
        mousemove/mouseup listeners so dragging outside the component still
        works. Listeners are cleaned up immediately on mouseup. The scrubber
        position updates in real-time during drag without triggering actual
        seeks until the user releases the mouse button.
      </Callout>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
