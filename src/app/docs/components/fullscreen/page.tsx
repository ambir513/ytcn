import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function FullscreenPage() {
  const nav = getPageNav("/docs/components/fullscreen");

  return (
    <>
      <PageHeader
        badge="Component"
        title="Fullscreen"
        description="Fullscreen toggle button using the Fullscreen API."
      />

      <h2 id="overview" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Overview
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The fullscreen button toggles the player container between windowed and
        fullscreen mode using the browser&apos;s Fullscreen API. The entire player
        container (not just the iframe) enters fullscreen, ensuring that custom
        controls, popovers, and overlays remain visible.
      </p>

      <h2 id="usage" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Usage
      </h2>
      <CodeBlock
        filename="standalone-fullscreen.tsx"
        code={`import { YtcnFullscreen } from "@/components/ytcn/ytcn-fullscreen"

// Used within the controls bar:
<YtcnFullscreen
  isFullscreen={state.isFullscreen}
  onToggle={controls.toggleFullscreen}
/>`}
      />

      <h2 id="props" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Props
      </h2>
      <PropsTable
        props={[
          {
            name: "isFullscreen",
            type: "boolean",
            description: "Whether the player is currently in fullscreen mode.",
            required: true,
          },
          {
            name: "onToggle",
            type: "() => void",
            description: "Toggle between fullscreen and windowed mode.",
            required: true,
          },
        ]}
      />

      <h2 id="ios-behavior" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        iOS behavior
      </h2>
      <Callout type="warning" title="iOS limitation">
        On iOS Safari, the Fullscreen API is not available for arbitrary
        elements. When fullscreen is triggered on iOS, the native video
        player takes over. Custom controls are not visible in this mode. This
        is a browser limitation, not a ytcn limitation.
      </Callout>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
