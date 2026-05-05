import {
  IconInfoCircle,
  IconAlertTriangle,
  IconBulb,
  IconAlertOctagon,
} from "@tabler/icons-react";

type CalloutType = "note" | "warning" | "info" | "danger";

const config: Record<
  CalloutType,
  { border: string; bg: string; icon: typeof IconInfoCircle }
> = {
  note: {
    border: "border-blue-500",
    bg: "bg-blue-500/5",
    icon: IconInfoCircle,
  },
  info: {
    border: "border-foreground/30",
    bg: "bg-foreground/5",
    icon: IconBulb,
  },
  warning: {
    border: "border-yellow-500",
    bg: "bg-yellow-500/5",
    icon: IconAlertTriangle,
  },
  danger: {
    border: "border-red-500",
    bg: "bg-red-500/5",
    icon: IconAlertOctagon,
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "note", title, children }: CalloutProps) {
  const { border, bg, icon: Icon } = config[type];

  return (
    <div
      className={`border-l-4 ${border} ${bg} rounded-r-lg px-4 py-3 my-6`}
    >
      <div className="flex items-start gap-2.5">
        <Icon className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          {title && (
            <p className="text-sm font-medium text-foreground mb-1">{title}</p>
          )}
          <div className="text-sm text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
