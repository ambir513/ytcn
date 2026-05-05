"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  IconBrandGithub,
  IconSun,
  IconMoon,
  IconPlayerPlayFilled,
  IconSearch,
} from "@tabler/icons-react";
import { MobileSidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { CommandSearch } from "./command-search";

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-14 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-full items-center justify-between px-6 max-w-[1400px] mx-auto">
          {/* Left */}
          <div className="flex items-center gap-4">
            <MobileSidebar />
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-6 rounded-md bg-foreground flex items-center justify-center">
                <IconPlayerPlayFilled className="size-3 text-background" />
              </div>
              <span className="font-mono font-bold text-sm tracking-tight">
                ytcn
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                v1.0.0
              </span>
            </Link>
          </div>

          {/* Center — Search */}
          <div className="hidden md:flex flex-1 justify-center max-w-md mx-8">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <IconSearch className="size-4" />
              <span className="flex-1 text-left">Search docs...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/nicholasxjy/ytcn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <IconBrandGithub className="size-[18px]" />
            </a>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <IconSun className="size-[18px]" />
                ) : (
                  <IconMoon className="size-[18px]" />
                )}
              </button>
            )}
            <Link
              href="/docs/introduction"
              className="hidden sm:inline-flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium hover:bg-accent transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
