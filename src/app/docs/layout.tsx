import { TopNav } from "@/components/docs/topnav";
import { DocsSidebar } from "@/components/docs/sidebar";
import { TableOfContents } from "@/components/docs/toc";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[260px] shrink-0 border-r border-border">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 px-4 z-10 ">
            <DocsSidebar />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="flex">
            <div className="flex-1 min-w-0 px-6 md:px-8 lg:px-12 py-10">
              <div className="max-w-[720px] mx-auto" data-docs-content>
                {children}
              </div>
            </div>

            {/* Table of contents */}
            <div className="hidden xl:block w-[220px] shrink-0">
              <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-10 pr-6">
                <TableOfContents />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
