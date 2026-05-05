"use client";

export interface YtcnOverlayProps {
  onClick: () => void;
}

export function YtcnOverlay({ onClick }: YtcnOverlayProps): React.JSX.Element {
  return (
    <div
      className="absolute inset-0 z-[25] cursor-pointer"
      onClick={onClick}
      aria-label="Toggle playback"
      role="button"
      tabIndex={-1}
    />
  );
}
