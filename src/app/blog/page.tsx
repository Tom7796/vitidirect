import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const ARTICLES = [
    {
        id: 1,
        title: "5 Tips for Farmers to Get Their Harvest \"Resort-Ready\"",
        excerpt: "Learn the grading standards hotels expect and how to properly clean and package your produce to secure premium prices.",
        category: "guides",
        date: "Feb 8, 2026",
    },
    {
        id: 2,
        title: "The Rise of Dalo Demand: Why Hotels are Switching to Direct Sourcing",
        excerpt: "Discover the market trends driving the shift towards farm-to-table sourcing and what it means for your root crop business.",
        category: "market-trends",
        date: "Feb 5, 2026",
    },
    {
        id: 3,
        title: "Understanding M-PAISA for Business: A Guide for Rural Middlemen",
        excerpt: "A step-by-step guide on setting up digital payments to manage your cash flow and pay farmers instantly.",
        category: "finance",
        date: "Jan 28, 2026",
    },
    {
        id: 4,
        title: "Seasonal Planting Guide: What to Grow for the 2026 Tourism Peak",
        excerpt: "Maximize your profits by aligning your planting schedule with the high season demands of the tourism sector.",
        category: "farming",
        date: "Jan 15, 2026",
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-heading">Viti-Direct Blog</h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        Expert advice, market trends, and success tips for Fiji's agricultural community.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
                    {ARTICLES.map((article) => (
                        <div key={article.id} className="flex flex-col bg-white rounded-2xl border shadow-sm hover:shadow-md hover:border-primary/50 transition-all overflow-hidden h-full">
                            <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                                <BookOpen className="h-10 w-10 opacity-20" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-4 uppercase tracking-wider">
                                    <span className="text-primary">{article.category}</span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading leading-tight group-hover:text-primary transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <Link
                                    href="#"
                                    className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors mt-auto"
                                >
                                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
