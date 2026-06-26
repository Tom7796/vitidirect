# Police Guidelines App

A self-contained, searchable reference for policing standard operating
procedures (SOPs), built as a section of this Next.js project at **`/police`**.

It is fully standalone: no database, no login, and no environment variables are
required. All content is seeded in `src/lib/police-data.ts`, so the section runs
out of the box.

> The content is generic, educational reference material modelled on common
> policing procedures. It is not legal advice and is not tied to any specific
> jurisdiction.

## Routes

| Route | Description |
| --- | --- |
| `/police` | Home — hero search, category grid, recently updated list |
| `/police/category/[slug]` | All guidelines within a category |
| `/police/guideline/[slug]` | Full guideline: key points, numbered sections, related links |
| `/police/search?q=...` | Full-text search across every guideline |

## Categories

Use of Force · Traffic & Vehicle Stops · Arrest & Detention · Evidence
Handling · Community Policing · Emergency Response · Conduct & Ethics
(19 guidelines in total).

## Structure

```
src/lib/police-data.ts              # Types, categories, guidelines + helpers
src/app/police/layout.tsx           # Standalone shell (own header/footer)
src/app/police/page.tsx             # Home
src/app/police/category/[slug]/     # Category listing (SSG)
src/app/police/guideline/[slug]/    # Guideline detail (SSG)
src/app/police/search/              # Search (dynamic)
src/components/police/              # SearchBox, GuidelineCard, CategoryIcon
```

Category and guideline pages are statically generated via
`generateStaticParams`. The section is excluded from the Supabase auth
middleware (see `src/middleware.ts`), like the booking system.

## Adding or editing content

Edit `src/lib/police-data.ts`. Add a `Category` to `categories` and/or a
`Guideline` to `guidelines`. Each guideline needs a unique `slug`, a
`categorySlug`, a `summary`, `keyPoints`, and `sections`. Optional
`relatedSlugs` render the "Related guidelines" block.

## Running

```bash
npm run dev      # http://localhost:3000/police
npm run build    # production build
```
