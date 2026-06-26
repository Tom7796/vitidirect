import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import {
  categories,
  guidelines,
  countByCategory,
  getCategory,
} from "@/lib/police-data";
import { CategoryIcon } from "@/components/police/CategoryIcon";
import { SearchBox } from "@/components/police/SearchBox";

const accentClasses: Record<string, string> = {
  rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
  amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
  violet: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
  orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
  teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-100",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PoliceHome() {
  const recent = [...guidelines]
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
    .slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 px-6 py-12 text-center text-white sm:px-12">
        <p className="text-sm font-medium uppercase tracking-widest text-blue-300">
          Field Reference
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Police Guidelines &amp; Procedures
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">
          Quick, searchable access to standard operating procedures across use
          of force, arrest, evidence, community policing and more.
        </p>
        <div className="mx-auto mt-7 max-w-2xl">
          <SearchBox />
        </div>
        <p className="mt-4 text-xs text-slate-400">
          {guidelines.length} guidelines across {categories.length} categories
        </p>
      </section>

      <section id="categories" className="scroll-mt-20">
        <h2 className="mb-5 text-xl font-semibold text-slate-900">
          Browse by category
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/police/category/${cat.slug}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <span
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition ${
                  accentClasses[cat.accent] ?? accentClasses.blue
                }`}
              >
                <CategoryIcon name={cat.icon} className="h-5 w-5" />
              </span>
              <span className="font-semibold text-slate-900">{cat.name}</span>
              <span className="mt-1 flex-1 text-sm text-slate-500">
                {cat.description}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                {countByCategory(cat.slug)} guidelines
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-xl font-semibold text-slate-900">
          Recently updated
        </h2>
        <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {recent.map((g) => (
            <Link
              key={g.slug}
              href={`/police/guideline/${g.slug}`}
              className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">{g.title}</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {getCategory(g.categorySlug)?.name} · {g.reference}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                {formatDate(g.lastUpdated)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
