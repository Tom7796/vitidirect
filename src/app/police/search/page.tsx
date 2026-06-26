import { SearchX } from "lucide-react";
import { searchGuidelines } from "@/lib/police-data";
import { SearchBox } from "@/components/police/SearchBox";
import { GuidelineCard } from "@/components/police/GuidelineCard";

export const metadata = { title: "Search | Police Guidelines" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? searchGuidelines(query) : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-2xl font-bold text-slate-900">
          Search guidelines
        </h1>
        <SearchBox initialValue={query} autoFocus />
      </div>

      {query ? (
        <div>
          <p className="mb-4 text-sm text-slate-500">
            {results.length} result{results.length === 1 ? "" : "s"} for{" "}
            <span className="font-medium text-slate-700">
              &ldquo;{query}&rdquo;
            </span>
          </p>
          {results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((g) => (
                <GuidelineCard key={g.slug} guideline={g} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 py-16 text-center">
              <SearchX className="h-8 w-8 text-slate-400" />
              <p className="mt-3 font-medium text-slate-700">
                No guidelines matched your search
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try a different term, such as &ldquo;arrest&rdquo;,
                &ldquo;evidence&rdquo; or &ldquo;pursuit&rdquo;.
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-500">
          Enter a term above to search across all guidelines.
        </p>
      )}
    </div>
  );
}
