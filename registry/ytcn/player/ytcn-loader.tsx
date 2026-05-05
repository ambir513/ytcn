"use client";

import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface YtcnLoaderProps {
  isLoading: boolean;
  className?: string;
}

export function YtcnLoader({ isLoading, className }: YtcnLoaderProps): React.JSX.Element | null {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm",
        className
      )}
      aria-label="Loading video"
    >
      <IconLoader2 className="size-8 animate-spin text-primary mb-2" />
      <p className="text-sm text-muted-foreground">Loading video...</p>
    </div>
  );
}
