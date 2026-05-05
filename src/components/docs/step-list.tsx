interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="relative flex gap-4">
      {/* Number and line */}
      <div className="flex flex-col items-center">
        <div className="size-7 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">
          {number}
        </div>
        <div className="flex-1 w-px bg-border mt-2" />
      </div>

      {/* Content */}
      <div className="pb-10 flex-1 min-w-0">
        <h3 className="text-base font-semibold mb-3 mt-0.5">{title}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function StepList({ children }: { children: React.ReactNode }) {
  return <div className="my-6">{children}</div>;
}
