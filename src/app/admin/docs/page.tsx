import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpenText, ClipboardList, Target, TrendingUp } from "lucide-react";
import { loadSalesPlaybook, type AdminDocBlock } from "@/lib/admin-docs";

export const metadata: Metadata = {
  title: "Admin Docs | Spiffy Tec",
};

function renderInlineText(text: string) {
  return text.split(/(`[^`]+`)/g).map((segment, index) => {
    if (!segment) return null;

    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code
          key={`${segment}-${index}`}
          className="rounded-md bg-primary-50 px-1.5 py-0.5 text-[0.9em] font-semibold text-primary-700"
        >
          {segment.slice(1, -1)}
        </code>
      );
    }

    return <span key={`${segment}-${index}`}>{segment}</span>;
  });
}

function renderBlock(block: AdminDocBlock, index: number): ReactNode {
  if (block.type === "heading") {
    if (block.level === 1) {
      return null;
    }

    if (block.level === 2) {
      return (
        <section key={block.id} id={block.id} className="scroll-mt-24 border-t border-gray-100 pt-8 first:border-t-0 first:pt-0">
          <h2 className="text-2xl font-bold text-navy">{block.text}</h2>
        </section>
      );
    }

    return (
      <h3
        key={block.id}
        id={block.id}
        className="scroll-mt-24 text-lg font-semibold text-navy"
      >
        {block.text}
      </h3>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p key={`paragraph-${index}`} className="text-sm leading-7 text-gray-600">
        {renderInlineText(block.text)}
      </p>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={`quote-${index}`}
        className="rounded-2xl border border-primary-100 bg-primary-50/60 px-5 py-4 text-sm font-medium leading-7 text-primary-800"
      >
        {renderInlineText(block.text)}
      </blockquote>
    );
  }

  if (block.type === "code") {
    return (
      <pre
        key={`code-${index}`}
        className="overflow-x-auto rounded-2xl bg-navy px-5 py-4 text-sm leading-6 text-white"
      >
        <code>{block.code}</code>
      </pre>
    );
  }

  return (
    <ul key={`list-${index}`} className="space-y-3">
      {block.items.map((item, itemIndex) => (
        <li
          key={`${item.text}-${itemIndex}`}
          className="flex items-start gap-3 text-sm leading-7 text-gray-700"
          style={{ marginLeft: `${item.depth * 1.25}rem` }}
        >
          <span className="mt-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
            {block.ordered ? itemIndex + 1 : "•"}
          </span>
          <span>{renderInlineText(item.text)}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function AdminDocsPage() {
  const playbook = await loadSalesPlaybook();

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
              Admin Docs
            </p>
            <h1 className="mt-2 text-3xl font-bold text-navy">{playbook.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Keep this open during outreach, calls, and weekly review so the offer, scripts, and
              KPI targets stay in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Lead Scanner
            </Link>
            <a
              href="#outreach-workflow"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              <BookOpenText className="h-4 w-4" />
              Jump to Scripts
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px,minmax(0,1fr)] lg:px-8">
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Quick Jump
            </p>
            <div className="mt-4 space-y-2">
              {playbook.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-2xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-navy"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-primary-100 bg-primary-50/70 p-5">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary-600" />
                <p className="text-sm font-semibold text-navy">Default Plan</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Lead with <strong className="text-navy">Business at $149/mo</strong> unless price
                sensitivity is obvious.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-amber-600" />
                <p className="text-sm font-semibold text-navy">Daily Target</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Research <strong className="text-navy">10 leads</strong>, send 10 first touches,
                and 5 follow-ups.
              </p>
            </div>

            <div className="rounded-3xl border border-green-200 bg-green-50/80 p-5">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <p className="text-sm font-semibold text-navy">Weekly Goal</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Aim for <strong className="text-navy">3-5 calls</strong> and keep at least one
                active proposal out.
              </p>
            </div>
          </div>

          {playbook.updated && (
            <div className="rounded-3xl border border-gray-200 bg-white p-5 text-sm text-gray-500 shadow-sm">
              Updated {playbook.updated}
            </div>
          )}
        </aside>

        <article className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {playbook.blocks.map((block, index) => renderBlock(block, index))}
        </article>
      </div>
    </div>
  );
}
