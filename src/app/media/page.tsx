import { ArrowDownToLine, Newspaper } from "lucide-react";
import Image from "next/image";

export default function MediaPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <section className="bg-white border-b py-16 text-center">
                <div className="container px-4 mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-heading">Media & Press</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        See Viti-Direct in action and read about our impact on Fiji's agriculture.
                    </p>
                </div>
            </section>

            {/* Success Stories Gallery */}
            <section className="py-16">
                <div className="container px-4 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">Success Stories</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Placeholder 1 */}
                        <div className="group relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/3] shadow-md hover:shadow-xl transition-all">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 text-center p-4">
                                <span className="font-medium">Image: Farmer in Sigatoka holding a "Sold" sign</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="font-semibold">Sigatoka Valley Success</p>
                            </div>
                        </div>

                        {/* Placeholder 2 */}
                        <div className="group relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/3] shadow-md hover:shadow-xl transition-all">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 text-center p-4">
                                <span className="font-medium">Image: Chef at Denarau inspecting dalo delivery</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="font-semibold">Quality Check at Denarau</p>
                            </div>
                        </div>

                        {/* Placeholder 3 (Generic) */}
                        <div className="group relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/3] shadow-md hover:shadow-xl transition-all">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 text-center p-4">
                                <span className="font-medium">Image: Truck loaded with generic produce</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="font-semibold">Logistics in Motion</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* In The News */}
            <section className="bg-white py-16 border-y">
                <div className="container px-4 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 flex items-center justify-center gap-3">
                        <Newspaper className="h-8 w-8 text-primary" /> In the News
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="p-8 rounded-2xl border bg-gray-50 hover:border-primary/50 transition-colors">
                            <div className="text-sm font-medium text-primary mb-2">Fiji Sun • 2026</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">"Viti-Direct Launches Fiji’s First B2B Agri-App"</h3>
                            <p className="text-gray-600 mb-6">
                                A look at how technology is revolutionizing the way farmers connect with commercial buyers across the main island.
                            </p>
                            <a href="#" className="font-semibold text-primary hover:underline">Read Full Article &rarr;</a>
                        </div>

                        <div className="p-8 rounded-2xl border bg-gray-50 hover:border-primary/50 transition-colors">
                            <div className="text-sm font-medium text-primary mb-2">Fiji Times • 2026</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">"How Digital Bidding is Saving Fiji’s Root Crop Industry"</h3>
                            <p className="text-gray-600 mb-6">
                                Farmers are seeing a 30% increase in revenue by bypassing traditional market hurdles through Viti-Direct.
                            </p>
                            <a href="#" className="font-semibold text-primary hover:underline">Read Full Article &rarr;</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Assets */}
            <section className="py-16">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Brand Assets</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-sm font-medium text-white shadow hover:bg-gray-800 transition-colors">
                            <ArrowDownToLine className="mr-2 h-4 w-4" /> Download Logo Pack
                        </button>
                        <button className="inline-flex items-center justify-center rounded-full bg-white border border-gray-300 px-8 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                            <ArrowDownToLine className="mr-2 h-4 w-4" /> Download Press Photos
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
