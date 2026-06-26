import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import {
  categories,
  getCategory,
  getGuidelinesByCategory,
} from "@/lib/police-data";
import { CategoryIcon } from "@/components/police/CategoryIcon";
import { GuidelineCard } from "@/components/police/GuidelineCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getGuidelinesByCategory(slug);

  return (
    <div className="space-y-8">
      <Link
        href="/police#categories"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
      >
        <ChevronLeft className="h-4 w-4" />
        All categories
      </Link>

      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CategoryIcon name={category.icon} className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{category.name}</h1>
          <p className="mt-1 text-slate-500">{category.description}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((g) => (
          <GuidelineCard key={g.slug} guideline={g} />
        ))}
      </div>
    </div>
  );
}
