# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2024-12-01

### Added

- Initial release
- `YtcnPlayer` — Top-level composed player
- `YtcnControls` — Full controls bar
- `YtcnProgress` — Timeline scrub bar with hover tooltip
- `YtcnVolume` — Volume slider with mute toggle
- `YtcnSpeed` — Playback speed picker
- `YtcnQuality` — Quality selector dropdown
- `YtcnFullscreen` — Fullscreen toggle button
- `YtcnOverlay` — Click-to-play overlay
- `YtcnLoader` — Loading state overlay
- `useYtcnPlayer` — Core player lifecycle hook
- `useYouTubeAPI` — Singleton API loader hook
- `useFullscreen` — Fullscreen API abstraction
- `useTimeline` — Progress bar interaction hook
- `useKeyboardShortcuts` — Configurable keyboard shortcuts
- Dual-strategy quality enforcement (vq + setPlaybackQualityRange)
- Stale closure safety via refs pattern
- Fullscreen dropdown portal fix
- iframe branding removal via CSS offset
- Player recreation on quality change
- SSR-safe YouTube API loading
- TypeScript strict mode support
