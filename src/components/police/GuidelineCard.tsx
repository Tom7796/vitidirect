import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Guideline, getCategory } from "@/lib/police-data";

export function GuidelineCard({ guideline }: { guideline: Guideline }) {
  const category = getCategory(guideline.categorySlug);
  return (
    <Link
      href={`/police/guideline/${guideline.slug}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {category?.name}
        </span>
        <span className="text-xs font-medium text-slate-400">
          {guideline.reference}
        </span>
      </div>
      <h3 className="mt-3 flex items-start gap-1 font-semibold text-slate-900">
        {guideline.title}
        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-blue-600" />
      </h3>
      <p className="mt-1.5 flex-1 text-sm text-slate-500">{guideline.summary}</p>
    </Link>
  );
}
