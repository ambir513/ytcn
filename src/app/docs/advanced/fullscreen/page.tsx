import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { getPageNav } from "@/lib/navigation";

export default function FullscreenAdvancedPage() {
  const nav = getPageNav("/docs/advanced/fullscreen");

  return (
    <>
      <PageHeader
        badge="Advanced"
        title="Fullscreen"
        description="Deep dive into fullscreen behavior, popover portaling, and mobile quirks."
      />

      <h2 id="how-it-works" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        How it works
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        ytcn calls{" "}
        <code className="font-mono text-foreground text-sm">
          containerRef.current.requestFullscreen()
        </code>{" "}
        on the outermost player div — not the iframe. This means all custom
        controls, popovers, and overlays remain visible inside the fullscreen
        element.
      </p>

      <h2 id="popover-portaling" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Popover portaling
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Radix UI popovers portal to{" "}
        <code className="font-mono text-foreground text-sm">document.body</code>{" "}
        by default. In fullscreen, <code className="font-mono text-foreground text-sm">document.body</code>{" "}
        is outside the fullscreen element and invisible. ytcn solves this by
        passing{" "}
        <code className="font-mono text-foreground text-sm">
          container={"{containerRef.current}"}
        </code>{" "}
        to every Popover.
      </p>
      <CodeBlock
        filename="popover-portaling.tsx"
        code={`<Popover>
  <PopoverTrigger asChild>
    <button>Speed</button>
  </PopoverTrigger>
  <PopoverContent
    // Portal INTO the player container — visible in fullscreen
    container={containerRef.current}
    side="top"
    align="end"
  >
    {/* Speed options */}
  </PopoverContent>
</Popover>`}
      />

      <Callout type="warning" title="Don't remove the container prop">
        If you remove the <code className="font-mono">container</code> prop
        from any Popover, the speed picker (and any future popovers) will be
        invisible in fullscreen mode.
      </Callout>

      <h2 id="idle-controls" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Idle controls in fullscreen
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        In fullscreen, controls auto-hide after 3 seconds of mouse inactivity
        via the{" "}
        <code className="font-mono text-foreground text-sm">
          useIdleControls
        </code>{" "}
        hook. The cursor is also hidden using{" "}
        <code className="font-mono text-foreground text-sm">cursor-none</code>.
        Both reset immediately on mouse movement.
      </p>

      <h2 id="mobile" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Mobile behavior
      </h2>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Platform
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Behavior
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "iOS Safari",
                "Fullscreen opens native player — custom controls not visible",
              ],
              [
                "Android Chrome",
                "Fullscreen API works — custom controls visible",
              ],
              [
                "Android Firefox",
                "Fullscreen API works — custom controls visible",
              ],
            ].map(([platform, behavior]) => (
              <tr
                key={platform}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium">{platform}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {behavior}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
