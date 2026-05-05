import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function UseKeyboardShortcutsPage() {
  const nav = getPageNav("/docs/hooks/use-keyboard-shortcuts");

  return (
    <>
      <PageHeader
        badge="Hook"
        title="useKeyboardShortcuts"
        description="Registers keyboard shortcuts for the player. Automatically disabled on input elements."
      />

      <h2 id="shortcuts" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Registered shortcuts
      </h2>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Action</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Control method</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Space", "Play / Pause", "controls.togglePlay()"],
              ["F", "Toggle fullscreen", "controls.toggleFullscreen()"],
              ["M", "Toggle mute", "controls.toggleMute()"],
              ["ArrowLeft", "Seek -10s", "controls.seekRelative(-10)"],
              ["ArrowRight", "Seek +10s", "controls.seekRelative(10)"],
            ].map(([key, action, method]) => (
              <tr key={key} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <kbd className="rounded bg-muted border border-border px-2 py-0.5 font-mono text-xs text-foreground">{key}</kbd>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{action}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="options" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Options
      </h2>
      <PropsTable
        props={[
          { name: "enabled", type: "boolean", default: "true", description: "Whether keyboard shortcuts are active." },
          { name: "controls", type: "PlayerControls", description: "The controls object from useYtcnPlayer.", required: true },
        ]}
      />

      <h2 id="input-safety" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Input safety
      </h2>
      <Callout type="note" title="Auto-disabled on form elements">
        The hook checks <code className="font-mono">document.activeElement</code> before
        firing any action. If focus is on an <code className="font-mono">input</code>,{" "}
        <code className="font-mono">textarea</code>, or <code className="font-mono">contenteditable</code>{" "}
        element, the shortcut is silently ignored.
      </Callout>

      <h2 id="usage" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Usage
      </h2>
      <CodeBlock
        filename="custom-shortcuts.tsx"
        code={`import { useKeyboardShortcuts } from "@/hooks/ytcn/use-keyboard-shortcuts"

// Inside your custom player:
useKeyboardShortcuts({
  enabled: keyboardShortcuts,
  controls,
})`}
      />

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
