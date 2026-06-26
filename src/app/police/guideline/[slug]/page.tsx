import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, FileText, CheckCircle2 } from "lucide-react";
import {
  guidelines,
  getGuideline,
  getCategory,
  getRelatedGuidelines,
} from "@/lib/police-data";
import { GuidelineCard } from "@/components/police/GuidelineCard";

export function generateStaticParams() {
  return guidelines.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuideline(slug);
  return { title: g ? `${g.title} | Police Guidelines` : "Police Guidelines" };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function GuidelinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guideline = getGuideline(slug);
  if (!guideline) notFound();

  const category = getCategory(guideline.categorySlug);
  const related = getRelatedGuidelines(guideline);

  return (
    <article className="space-y-8">
      <Link
        href={`/police/category/${guideline.categorySlug}`}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
      >
        <ChevronLeft className="h-4 w-4" />
        {category?.name}
      </Link>

      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700">
            <FileText className="h-3.5 w-3.5" />
            {guideline.reference}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Updated {formatDate(guideline.lastUpdated)}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          {guideline.title}
        </h1>
        <p className="mt-2 text-lg text-slate-600">{guideline.summary}</p>
      </header>

      <section className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-800">
          Key points
        </h2>
        <ul className="mt-3 space-y-2">
          {guideline.keyPoints.map((point) => (
            <li key={point} className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-6">
        {guideline.sections.map((section, i) => (
          <section key={section.heading}>
            <h2 className="flex items-baseline gap-2 text-lg font-semibold text-slate-900">
              <span className="text-sm font-mono text-slate-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </h2>
            <p className="mt-2 leading-relaxed text-slate-700">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      {related.length > 0 && (
        <section className="border-t border-slate-200 pt-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Related guidelines
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((g) => (
              <GuidelineCard key={g.slug} guideline={g} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
