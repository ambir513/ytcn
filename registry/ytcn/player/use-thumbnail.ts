"use client";

import { useState, useEffect } from "react";

export interface UseThumbnailReturn {
  thumbnailUrl: string | null;
  thumbnailLoaded: boolean;
  thumbnailFailed: boolean;
}

const THUMBNAIL_PRIORITY = (id: string): string[] => [
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  `https://i.ytimg.com/vi/${id}/default.jpg`,
];

export function useThumbnail(videoId: string | null): UseThumbnailReturn {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  useEffect(() => {
    if (!videoId) {
      setThumbnailUrl(null);
      setThumbnailLoaded(false);
      setThumbnailFailed(false);
      return;
    }
    setThumbnailUrl(null);
    setThumbnailLoaded(false);
    setThumbnailFailed(false);

    const urls = THUMBNAIL_PRIORITY(videoId);
    let cancelled = false;
    let i = 0;

    const tryNext = (): void => {
      if (cancelled || i >= urls.length) {
        if (!cancelled) setThumbnailFailed(true);
        return;
      }
      const img = new Image();
      const url = urls[i++]!;
      img.onload = () => {
        if (!cancelled) {
          setThumbnailUrl(url);
          setThumbnailLoaded(true);
        }
      };
      img.onerror = tryNext;
      img.src = url;
    };

    tryNext();
    return () => { cancelled = true; };
  }, [videoId]);

  return { thumbnailUrl, thumbnailLoaded, thumbnailFailed };
}
