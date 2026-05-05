"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full space-y-1">
      {navigation.map((group) => (
        <div key={group.group} className="pb-4">
          <h4 className="px-3 mb-1 mt-6 first:mt-0 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/60">
            {group.group}
          </h4>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-accent text-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent"
        aria-label="Open sidebar"
      >
        <IconMenu2 className="size-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border p-6 overflow-y-auto lg:hidden shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono font-bold text-sm tracking-tight">ytcn</span>
                <button
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent transition-colors"
                  aria-label="Close sidebar"
                >
                  <IconX className="size-4" />
                </button>
              </div>
              <DocsSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
