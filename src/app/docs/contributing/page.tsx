import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { CodeBlock } from "@/components/docs/code-block";
import { StepList, Step } from "@/components/docs/step-list";
import { getPageNav } from "@/lib/navigation";

export default function ContributingPage() {
  const nav = getPageNav("/docs/contributing");

  return (
    <>
      <PageHeader
        badge="Reference"
        title="Contributing"
        description="How to contribute to ytcn — code, docs, or bug reports."
      />

      <h2 id="getting-started" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Getting started
      </h2>
      <StepList>
        <Step number={1} title="Fork and clone">
          <CodeBlock
            language="bash"
            code={`git clone https://github.com/your-username/ytcn.git
cd ytcn
npm install`}
          />
        </Step>

        <Step number={2} title="Start the dev server">
          <CodeBlock language="bash" code="npm run dev" />
          <p className="mt-2">
            The docs site runs at{" "}
            <code className="font-mono text-foreground text-sm">
              http://localhost:3000
            </code>
            . Component source files are in{" "}
            <code className="font-mono text-foreground text-sm">
              src/components/ytcn/
            </code>
            .
          </p>
        </Step>

        <Step number={3} title="Make your changes">
          <p>
            Edit components, hooks, or docs. All changes hot-reload in the dev
            server.
          </p>
        </Step>

        <Step number={4} title="Build and test">
          <CodeBlock language="bash" code="npm run build" />
          <p className="mt-2">
            Ensure the build passes with zero TypeScript errors before
            submitting a PR.
          </p>
        </Step>

        <Step number={5} title="Submit a pull request">
          <p>
            Push your branch and open a PR against{" "}
            <code className="font-mono text-foreground text-sm">main</code>.
            Include a clear description of what changed and why.
          </p>
        </Step>
      </StepList>

      <h2 id="guidelines" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Guidelines
      </h2>
      <ul className="space-y-3 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          <strong className="text-foreground">TypeScript strict:</strong> All
          code must pass{" "}
          <code className="font-mono text-foreground text-xs">tsc --strict</code>{" "}
          with zero errors.
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          <strong className="text-foreground">No new dependencies:</strong>{" "}
          ytcn intentionally has minimal dependencies. If your change requires
          a new package, discuss it in an issue first.
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          <strong className="text-foreground">Registry sync:</strong> If you
          modify a component or hook, update the corresponding file in{" "}
          <code className="font-mono text-foreground text-xs">registry/</code>{" "}
          to maintain parity.
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          <strong className="text-foreground">Document changes:</strong> Update
          the relevant docs page and add a changelog entry.
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          <strong className="text-foreground">Test manually:</strong> Verify
          your changes work across at least Chrome and Firefox. Test fullscreen
          mode and keyboard shortcuts.
        </li>
      </ul>

      <h2 id="bug-reports" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Bug reports
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Open an issue on{" "}
        <a
          href="https://github.com/nicholasxjy/ytcn/issues"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          GitHub Issues
        </a>{" "}
        with:
      </p>
      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Browser and version
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Video ID that reproduces the issue
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Steps to reproduce
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Expected vs actual behavior
        </li>
      </ul>

      <h2 id="license" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        License
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        ytcn is released under the{" "}
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          MIT License
        </a>
        . By contributing, you agree that your contributions will be licensed
        under the same license.
      </p>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
