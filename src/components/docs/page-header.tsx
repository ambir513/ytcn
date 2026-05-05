interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="mb-10">
      {badge && (
        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-lg text-muted-foreground mt-2 leading-relaxed">
        {description}
      </p>
      <div className="border-b border-border mt-6" />
    </div>
  );
}
