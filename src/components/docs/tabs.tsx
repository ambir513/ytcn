"use client";

import { useState } from "react";

interface TabsProps {
  items: string[];
  children: React.ReactNode[];
}

export function Tabs({ items, children }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-4">
      <div className="flex border-b border-border">
        {items.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm transition-colors -mb-px ${
              active === i
                ? "border-b-2 border-foreground text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-0">{children[active]}</div>
    </div>
  );
}
