interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden w-full my-6">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-muted">
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Prop
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Type
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Default
            </th>
            <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-t border-border hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-sm font-medium text-foreground whitespace-nowrap">
                {prop.name}
                {prop.required && (
                  <span className="text-red-400 ml-0.5">*</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-blue-400 whitespace-nowrap">
                {prop.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {prop.default || "—"}
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
