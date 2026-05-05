import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PageNavProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export function PageNav({ prev, next }: PageNavProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-12 pt-6 border-t border-border">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex-1 flex items-center gap-2 rounded-lg border border-border p-4 hover:border-foreground/30 transition-colors"
        >
          <IconChevronLeft className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <div>
            <p className="text-xs text-muted-foreground">Previous</p>
            <p className="text-sm font-medium">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex-1 flex items-center justify-end gap-2 rounded-lg border border-border p-4 hover:border-foreground/30 transition-colors text-right"
        >
          <div>
            <p className="text-xs text-muted-foreground">Next</p>
            <p className="text-sm font-medium">{next.title}</p>
          </div>
          <IconChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
