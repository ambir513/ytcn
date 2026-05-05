"use client";

import {
  IconVolume,
  IconVolumeOff,
  IconVolume2,
} from "@tabler/icons-react";
import { Slider } from "@/components/ui/slider";

export interface YtcnVolumeProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
}

export function YtcnVolume({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: YtcnVolumeProps): React.JSX.Element {
  const VolumeIcon =
    isMuted || volume === 0
      ? IconVolumeOff
      : volume < 50
        ? IconVolume2
        : IconVolume;

  return (
    <div className="group/volume flex items-center gap-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleMute();
        }}
        className="flex items-center justify-center rounded-sm p-1 text-white transition-colors hover:bg-white/10"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <VolumeIcon className="size-5" />
      </button>
      <div className="w-0 overflow-hidden transition-[width] duration-200 group-hover/volume:w-20">
        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={([val]) => { if (val !== undefined) onVolumeChange(val); }}
          className="w-20 cursor-pointer"
          aria-label="Volume"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
