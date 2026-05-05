import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";
import { Tabs } from "@/components/docs/tabs";
import { StepList, Step } from "@/components/docs/step-list";
import { getPageNav } from "@/lib/navigation";

export default function InstallationPage() {
  const nav = getPageNav("/docs/installation");

  return (
    <>
      <PageHeader
        badge="Guide"
        title="Installation"
        description="Set up ytcn in your project in under 2 minutes."
      />

      <h2 id="prerequisites" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Prerequisites
      </h2>
      <PropsTable
        props={[
          {
            name: "React",
            type: "18+",
            default: "—",
            description: "Hooks required",
          },
          {
            name: "TypeScript",
            type: "5+",
            default: "—",
            description: "Strict mode recommended",
          },
          {
            name: "Tailwind CSS",
            type: "3.4+",
            default: "—",
            description: "CSS variables required",
          },
          {
            name: "shadcn/ui",
            type: "Latest",
            default: "—",
            description: "Must be initialized first",
          },
          {
            name: "Node.js",
            type: "18+",
            default: "—",
            description: "LTS recommended",
          },
        ]}
      />

      <h2 id="setup" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Step-by-step setup
      </h2>

      <StepList>
        <Step number={1} title="Initialize shadcn/ui">
          <Callout type="note">Skip this step if shadcn/ui is already initialized in your project.</Callout>
          <Tabs items={["npm", "pnpm", "yarn"]}>
            <CodeBlock code="npx shadcn@latest init" language="bash" />
            <CodeBlock code="pnpm dlx shadcn@latest init" language="bash" />
            <CodeBlock code="yarn dlx shadcn@latest init" language="bash" />
          </Tabs>
        </Step>

        <Step number={2} title="Install required shadcn primitives">
          <p className="mb-3">
            ytcn uses Button for controls, Slider for volume and progress,
            Popover for speed picker — all portaled into the player container
            so they&apos;re visible in fullscreen mode.
          </p>
          <CodeBlock
            code="npx shadcn@latest add button slider popover"
            language="bash"
          />
        </Step>

        <Step number={3} title="Install Tabler Icons">
          <Tabs items={["npm", "pnpm", "yarn"]}>
            <CodeBlock code="npm install @tabler/icons-react" language="bash" />
            <CodeBlock code="pnpm add @tabler/icons-react" language="bash" />
            <CodeBlock code="yarn add @tabler/icons-react" language="bash" />
          </Tabs>
        </Step>

        <Step number={4} title="Add ytcn components">
          <CodeBlock
            code="npx shadcn@latest add https://ytcn.dev/r/player.json"
            language="bash"
          />

          <p className="mt-4 mb-2 text-foreground font-medium text-sm">
            Expected file tree after installation:
          </p>
          <CodeBlock
            filename="Project structure"
            language="text"
            code={`components/ytcn/
├── ytcn-player.tsx
├── ytcn-controls.tsx
├── ytcn-progress.tsx
├── ytcn-volume.tsx
├── ytcn-speed.tsx
├── ytcn-fullscreen.tsx
├── ytcn-loader.tsx
└── ytcn-overlay.tsx
hooks/ytcn/
├── use-ytcn-player.ts
├── use-thumbnail.ts
├── use-idle-controls.ts
└── use-keyboard-shortcuts.ts
lib/ytcn/
├── loader.ts
├── format.ts
└── types.ts`}
          />
        </Step>

        <Step number={5} title="Verify installation">
          <p className="mb-3">
            Create a simple page to verify everything works:
          </p>
          <CodeBlock
            filename="app/page.tsx"
            code={`import { YtcnPlayer } from "@/components/ytcn/ytcn-player"

export default function Page() {
  return <YtcnPlayer videoId="dQw4w9WgXcQ" />
}`}
          />
        </Step>
      </StepList>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
