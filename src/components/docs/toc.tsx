"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const updateHeadings = useCallback(() => {
    const elements = document.querySelectorAll(
      "[data-docs-content] h2[id], [data-docs-content] h3[id]"
    );
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);
  }, []);

  useEffect(() => {
    updateHeadings();

    // Small delay to catch dynamically rendered headings
    const timer = setTimeout(updateHeadings, 500);
    return () => clearTimeout(timer);
  }, [updateHeadings]);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0]!.target.id);
        }
      },
      { rootMargin: "-80px 0% -80% 0%", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/60 mb-3">
        On This Page
      </p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={`block text-sm py-1 transition-colors border-l-2 ${
            heading.level === 3 ? "pl-5" : "pl-3"
          } ${
            activeId === heading.id
              ? "text-foreground font-medium border-foreground"
              : "text-muted-foreground hover:text-foreground border-transparent"
          }`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(heading.id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
