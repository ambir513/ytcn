# ytcn

> **ytcn** is a headless, unstyled-by-default YouTube player component library built on [shadcn/ui](https://ui.shadcn.com) primitives. Copy the components you need. Own them completely.

<div align="center">

![ytcn](https://img.shields.io/badge/ytcn-YouTube%20%C3%97%20shadcn-000000?style=for-the-badge&logo=youtube&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18%2B-61dafb?style=for-the-badge&logo=react&logoColor=black)

</div>

---

## What is ytcn?

**ytcn** gives you production-ready, fully customizable YouTube iframe player components — the same way shadcn/ui gives you fully customizable UI primitives.

You run a command. The components land in **your** codebase. You own every line.

No black-box npm package. No fighting `!important`. No YouTube branding leaking through.

```bash
npx ytcn@latest add player
```

Done. `components/ytcn/ytcn-player.tsx` is yours now.

---

## Quick Start

### 1. Prerequisites

| Dependency | Version |
|---|---|
| React | `^18.0.0` |
| TypeScript | `^5.0.0` |
| Tailwind CSS | `^3.4.0` or `^4.0.0` |
| shadcn/ui | Latest |
| `@tabler/icons-react` | `^3.0.0` |

### 2. Install required shadcn primitives

```bash
npx shadcn@latest add button slider dropdown-menu popover
```

### 3. Install Tabler icons

```bash
npm install @tabler/icons-react
```

### 4. Add the full player

```bash
npx ytcn@latest add player
```

### 5. Use it

```tsx
import { YtcnPlayer } from "@/components/ytcn/ytcn-player";

export default function CoursePage() {
  return (
    <YtcnPlayer
      videoId="dQw4w9WgXcQ"
      onEnd={() => console.log("video ended")}
      onTimeUpdate={(current, duration) => {
        console.log(`${current}s / ${duration}s`);
      }}
    />
  );
}
```

---

## Components

| Component | Description |
|---|---|
| `YtcnPlayer` | Top-level composed player with all features |
| `YtcnControls` | Full controls bar (progress, play, volume, quality, speed, fullscreen) |
| `YtcnProgress` | Timeline scrub bar with hover tooltip and buffer indicator |
| `YtcnVolume` | Volume slider with mute toggle |
| `YtcnSpeed` | Playback speed picker (Radix Popover) |
| `YtcnQuality` | Quality selector dropdown |
| `YtcnFullscreen` | Fullscreen toggle button |
| `YtcnOverlay` | Click-to-play transparent overlay |
| `YtcnLoader` | Loading state overlay with spinner |

---

## Hooks

### `useYtcnPlayer`

The core hook for building fully custom UIs:

```tsx
const { containerRef, playerDivRef, state, controls } = useYtcnPlayer({
  videoId: "dQw4w9WgXcQ",
  onEnd: () => {},
  onTimeUpdate: (current, duration) => {},
});
```

### Other hooks

| Hook | Description |
|---|---|
| `useYouTubeAPI` | Singleton API loader — returns `{ isReady }` |
| `useFullscreen` | Fullscreen API abstraction — `{ isFullscreen, toggle }` |
| `useTimeline` | Progress bar drag/hover state |
| `useKeyboardShortcuts` | Configurable global keyboard listener |

---

## Props

### `<YtcnPlayer />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `videoId` | `string` | — | YouTube video ID (required) |
| `autoplay` | `boolean` | `false` | Auto-start playback |
| `defaultQuality` | `QualityLevel \| "auto"` | `"auto"` | Initial quality |
| `defaultSpeed` | `PlaybackSpeed` | `1` | Initial playback rate |
| `startAt` | `number` | `0` | Resume from timestamp (seconds) |
| `keyboardShortcuts` | `boolean` | `true` | Enable keyboard shortcuts |
| `onEnd` | `() => void` | — | Video ended callback |
| `onTimeUpdate` | `(current, duration) => void` | — | Polled every 250ms |

---

## How It Works

### Quality Enforcement — Dual Strategy

- **Strategy A (vq)**: Set via `playerVars.vq` at player creation. Works for 720p+.
- **Strategy B (setPlaybackQualityRange)**: Called after `onReady` and on every PLAYING state change. Locks min/max to the same level. Makes 360p/240p stick.

Both are always applied together.

### Player Recreation on Quality Change

Quality changes require full player destruction + recreation. YouTube's embed does not reliably respond to mid-session quality changes.

### Fullscreen Portal Fix

Radix portals to `document.body` by default — invisible in fullscreen. ytcn passes `containerRef.current` as the portal container.

### iframe Branding Removal

```ts
iframe.style.top = "-60px";
iframe.style.height = "calc(100% + 120px)";
iframe.style.pointerEvents = "none";
```

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Toggle play/pause |
| `F` | Toggle fullscreen |
| `M` | Toggle mute |
| `←` | Seek -10 seconds |
| `→` | Seek +10 seconds |

---

## Known Limitations

- **YouTube ToS**: You are responsible for compliance. See [YouTube API ToS](https://developers.google.com/youtube/terms/api-services-tos).
- **Mobile quality**: `setPlaybackQualityRange()` has limited effect on mobile browsers.
- **Quality list**: Available qualities populate after playback starts, not in `onReady`.
- **Autoplay**: Browsers block autoplay with sound. `autoplay: true` starts muted.

---

## License

MIT © ytcn contributors
