import { PageHeader } from "@/components/docs/page-header";
import { PageNav } from "@/components/docs/page-nav";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { getPageNav } from "@/lib/navigation";

export default function LoaderPage() {
  const nav = getPageNav("/docs/components/loader");

  return (
    <>
      <PageHeader
        badge="Component"
        title="Loader"
        description="Loading state overlay shown while the YouTube iframe initializes."
      />

      <h2 id="overview" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Overview
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        YtcnLoader is a visual overlay displayed during the &quot;loading&quot; phase —
        after the user clicks the thumbnail and before the iframe is ready to
        play. It shows a blurred backdrop of the thumbnail with a centered
        spinner, providing a polished transition between the static thumbnail
        and the live video.
      </p>

      <h2 id="usage" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Usage
      </h2>
      <CodeBlock
        filename="custom-loader.tsx"
        code={`import { YtcnLoader } from "@/components/ytcn/ytcn-loader"

// Inside your custom player layout:
{state.phase === "loading" && (
  <YtcnLoader thumbnailUrl={thumbnailUrl} />
)}`}
      />

      <h2 id="props" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Props
      </h2>
      <PropsTable
        props={[
          {
            name: "thumbnailUrl",
            type: "string | null",
            description:
              "URL of the thumbnail to use as the blurred backdrop. Falls back to a solid dark background if null.",
          },
        ]}
      />

      <h2 id="customization" className="text-xl font-semibold mt-10 mb-4 scroll-mt-20">
        Customization
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Since the loader is copied into your project, you can fully customize
        the loading experience. Common modifications include:
      </p>
      <ul className="space-y-2 text-sm text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Replacing the spinner with a branded animation or skeleton
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Adjusting the backdrop blur intensity or overlay opacity
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Adding a loading progress indicator
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground mt-0.5">•</span>
          Showing a &quot;Loading video...&quot; text label
        </li>
      </ul>

      <PageNav prev={nav.prev} next={nav.next} />
    </>
  );
}
