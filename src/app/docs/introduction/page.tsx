import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { Callout } from "@/components/docs/callout";
import { getPageNav } from "@/lib/navigation";

export default function IntroductionPage() {
  const nav = getPageNav("/docs/introduction");

  return (
    <>
      <PageHeader
        badge="Guide"
        title="Introduction"
        description="What ytcn is, why it exists, and when to use it."
      />

      <h2 id="what-is-ytcn" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        What is ytcn?
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        ytcn is a copy-paste YouTube IFrame player component library built on
        shadcn/ui primitives. Instead of installing a package and fighting its
        API, you run one command and own the code. Every component lands in your
        project — you can read, modify, and extend it without forking a library.
      </p>

      <Callout type="info" title="The shadcn philosophy">
        ytcn follows the shadcn/ui philosophy: components are copied into your
        project, not installed as a dependency. This means you can modify
        anything without forking a library.
      </Callout>

      <h2 id="core-principles" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Core principles
      </h2>
      <div className="space-y-3 mb-6">
        {[
          {
            emoji: "🎯",
            title: "Copy, don't install",
            desc: "Components live in your codebase. You own them completely.",
          },
          {
            emoji: "🎨",
            title: "Design system native",
            desc: "Uses your shadcn tokens and Tailwind CSS variables. No extra theme configuration.",
          },
          {
            emoji: "📺",
            title: "Zero branding",
            desc: "YouTube chrome is fully hidden — no red play button, no watermark, no related videos.",
          },
          {
            emoji: "🔍",
            title: "Honest about limits",
            desc: "The quality API is advisory. We document what works and what doesn't — clearly.",
          },
        ].map((item) => (
          <div key={item.title} className="flex gap-3">
            <span className="text-lg shrink-0">{item.emoji}</span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 id="philosophy" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Philosophy
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Most YouTube player libraries are black boxes. You install them, wrap
        your video ID in a component, and hope the API does what you need. When
        it doesn&apos;t — and it always doesn&apos;t eventually — you&apos;re stuck filing
        issues and waiting for maintainers. ytcn takes a different approach.
        Every component is a plain React file in your project. The YouTube
        IFrame API complexity is contained in hooks that you can read, debug,
        and extend. The UI layer uses the same shadcn/ui primitives you already
        know — Button, Slider, Popover — so it inherits your theme with zero
        extra configuration.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4">
        The tradeoff is intentional: you get full control at the cost of owning
        the code. For teams building products where video is a core feature —
        LMS platforms, course builders, portfolio sites — this tradeoff is
        almost always worth it.
      </p>

      <h2 id="when-to-use" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        When to use ytcn
      </h2>
      <div className="border border-border rounded-lg overflow-hidden my-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Use Case
              </th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Recommended?
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["LMS / course platform", "✅ Perfect fit"],
              ["Portfolio with video", "✅ Great fit"],
              ["Marketing site", "✅ Good fit"],
              ["YouTube playlist browser", "❌ Use YouTube Data API"],
              ["Guaranteed quality control", "❌ YouTube API cannot do this"],
              ["React Native app", "❌ Web only"],
            ].map(([useCase, rec]) => (
              <tr
                key={useCase}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{useCase}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {rec}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="built-on" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Built on these primitives
      </h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "shadcn/ui",
          "Tailwind CSS",
          "@tabler/icons-react",
          "React 18+",
          "TypeScript 5",
          "Next.js (optional)",
        ].map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
