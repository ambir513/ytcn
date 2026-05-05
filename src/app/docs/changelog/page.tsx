import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { getPageNav } from "@/lib/navigation";

export default function ChangelogPage() {
  const nav = getPageNav("/docs/changelog");

  return (
    <>
      <PageHeader
        badge="Reference"
        title="Changelog"
        description="All notable changes to ytcn."
      />

      <h2 id="v1-0-0" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        v1.0.0 — Initial Release
      </h2>
      <p className="text-xs text-muted-foreground mb-4">May 2026</p>

      <h3 id="v1-components" className="text-lg font-semibold mt-6 mb-3 scroll-mt-20">
        Components
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">YtcnPlayer</code> — Full composed player with thumbnail-first loading
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">YtcnControls</code> — Complete controls bar with progress, volume, speed, fullscreen
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">YtcnProgress</code> — Timeline scrub bar with hover tooltip and drag-to-seek
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">YtcnVolume</code> — Volume slider with mute toggle, expand-on-hover
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">YtcnSpeed</code> — Playback speed picker with fullscreen-safe popover
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">YtcnFullscreen</code> — Fullscreen toggle button
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">YtcnLoader</code> — Loading state with blurred thumbnail backdrop
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">YtcnOverlay</code> — Click-to-play overlay with thumbnail
        </li>
      </ul>

      <h3 id="v1-hooks" className="text-lg font-semibold mt-6 mb-3 scroll-mt-20">
        Hooks
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">useYtcnPlayer</code> — Core hook with state machine, imperative controls, ref-sync pattern
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">useThumbnail</code> — Priority-ordered thumbnail probing
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">useIdleControls</code> — Auto-hide controls in fullscreen after 3s idle
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          <code className="font-mono text-foreground text-xs">useKeyboardShortcuts</code> — Space, F, M, ←, → keyboard shortcuts
        </li>
      </ul>

      <h3 id="v1-features" className="text-lg font-semibold mt-6 mb-3 scroll-mt-20">
        Features
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          Thumbnail-first loading — eliminates black flash and YouTube branding on load
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          shadcn registry compatible — install via{" "}
          <code className="font-mono text-foreground text-xs">
            npx shadcn@latest add
          </code>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          Full TypeScript with strict mode
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          SSR/Next.js compatible — all components are &quot;use client&quot;
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-400 mt-0.5">+</span>
          Zero YouTube branding via cover div, iframe offset, and caption suppression
        </li>
      </ul>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
