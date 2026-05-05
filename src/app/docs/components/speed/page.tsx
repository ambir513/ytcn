import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function SpeedPage() {
  const nav = getPageNav("/docs/components/speed");

  return (
    <>
      <PageHeader
        badge="Component"
        title="Speed"
        description="Playback speed picker with four preset options."
      />

      <h2 id="available-speeds" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Available speeds
      </h2>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Value
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Label
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                When to use
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["0.75", "0.75x", "Slow down for complex or dense content"],
              ["1", "Normal", "Default playback speed"],
              ["1.5", "1.5x", "Efficient viewing for familiar material"],
              ["2", "2x", "Maximum speed for quick review"],
            ].map(([value, label, when]) => (
              <tr
                key={value}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-sm">{value}</td>
                <td className="px-4 py-3 text-sm">{label}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {when}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="fullscreen-compat" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Fullscreen compatibility
      </h2>
      <Callout type="warning" title="Portal required">
        The speed popover uses{" "}
        <code className="font-mono">container={"{containerRef.current}"}</code>{" "}
        to portal its content inside the player element. This is required for
        the popover to be visible in fullscreen mode. Do not remove this prop.
      </Callout>

      <h2 id="props" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Props
      </h2>
      <PropsTable
        props={[
          {
            name: "playbackRate",
            type: "0.75 | 1 | 1.5 | 2",
            description: "Currently active playback speed.",
            required: true,
          },
          {
            name: "onSpeedChange",
            type: "(speed: PlaybackSpeed) => void",
            description: "Called with the new speed when user selects one.",
            required: true,
          },
          {
            name: "containerRef",
            type: "RefObject<HTMLDivElement>",
            description: "Fullscreen container element for popover portaling.",
            required: true,
          },
        ]}
      />

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
