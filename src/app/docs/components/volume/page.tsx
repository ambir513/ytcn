import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { getPageNav } from "@/lib/navigation";

export default function VolumePage() {
  const nav = getPageNav("/docs/components/volume");

  return (
    <>
      <PageHeader
        badge="Component"
        title="Volume"
        description="Volume slider with mute toggle. Slider expands on hover."
      />

      <h2 id="behavior" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Behavior
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The volume slider is hidden by default and expands on hover using a CSS
        width transition — no JavaScript toggle needed. This keeps the controls
        bar compact while remaining fully accessible.
      </p>

      <h3 id="icon-states" className="text-lg font-semibold mt-8 mb-3 scroll-mt-20">
        Icon states
      </h3>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Condition
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Icon
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Muted or volume = 0", "VolumeX (crossed out)"],
              ["Volume 1–49", "Volume1 (single wave)"],
              ["Volume 50–100", "Volume2 (double wave)"],
            ].map(([condition, icon]) => (
              <tr
                key={condition}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{condition}</td>
                <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                  {icon}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="props" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Props
      </h2>
      <PropsTable
        props={[
          {
            name: "volume",
            type: "number",
            description: "Current volume level from 0 to 100.",
            required: true,
          },
          {
            name: "isMuted",
            type: "boolean",
            description: "Current mute state.",
            required: true,
          },
          {
            name: "onVolumeChange",
            type: "(volume: number) => void",
            description: "Called with the new volume level (0–100).",
            required: true,
          },
          {
            name: "onToggleMute",
            type: "() => void",
            description: "Toggle between muted and unmuted states.",
            required: true,
          },
        ]}
      />

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
