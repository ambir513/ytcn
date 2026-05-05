import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function UseIdleControlsPage() {
  const nav = getPageNav("/docs/hooks/use-idle-controls");

  return (
    <>
      <PageHeader
        badge="Hook"
        title="useIdleControls"
        description="Auto-hides controls and cursor after 3 seconds of mouse inactivity in fullscreen."
      />

      <h2 id="behavior-rules" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Behavior rules
      </h2>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Condition</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Controls visible?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Fullscreen + playing + idle 3s", "Hidden"],
              ["Fullscreen + playing + mouse moves", "Visible (timer resets)"],
              ["Fullscreen + paused", "Always visible"],
              ["Fullscreen + popover open", "Always visible"],
              ["Windowed mode (any state)", "CSS group-hover only"],
            ].map(([condition, visible]) => (
              <tr key={condition} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-sm">{condition}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{visible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="usage" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Usage
      </h2>
      <CodeBlock
        filename="idle-controls.tsx"
        code={`const { controlsVisible, showControls } = useIdleControls({
  isPlaying: state.isPlaying,
  isFullscreen: state.isFullscreen,
  isSettingsOpen,
})`}
      />

      <h2 id="returns" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Returns
      </h2>
      <PropsTable
        props={[
          { name: "controlsVisible", type: "boolean", description: "Whether the controls should be rendered visible right now." },
          { name: "showControls", type: "() => void", description: "Manually show controls and reset the idle timer." },
        ]}
      />

      <h2 id="cursor-hiding" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Cursor hiding
      </h2>
      <Callout type="info" title="How cursor hiding works">
        <code className="font-mono">cursor-none</code> is applied to the player container
        (not the iframe) when controls are hidden in fullscreen. The iframe has{" "}
        <code className="font-mono">pointer-events: none</code> so the container&apos;s cursor
        style governs what the user sees.
      </Callout>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
