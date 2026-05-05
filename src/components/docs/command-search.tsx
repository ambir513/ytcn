"use client";

import { useRouter } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { IconSearch, IconFileText, IconCode, IconWebhook } from "@tabler/icons-react";
import { useEffect, useRef, useState, useMemo } from "react";

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = useMemo(
    () => navigation.flatMap((g) => g.items.map((item) => ({ ...item, group: g.group }))),
    []
  );

  const filtered = useMemo(() => {
    if (!query) return allItems;
    const lower = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.group.toLowerCase().includes(lower)
    );
  }, [query, allItems]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      onOpenChange(false);
      router.push(filtered[selectedIndex].href);
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  }

  function getIcon(group: string) {
    if (group === "Hooks") return IconWebhook;
    if (group === "Components") return IconCode;
    return IconFileText;
  }

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed left-1/2 top-[20%] z-[60] w-full max-w-lg -translate-x-1/2 rounded-xl border border-border bg-popover shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <IconSearch className="size-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </p>
          ) : (
            filtered.map((item, i) => {
              const Icon = getIcon(item.group);
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    onOpenChange(false);
                    router.push(item.href);
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    i === selectedIndex
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <span className="text-xs text-muted-foreground/60">
                    {item.group}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
