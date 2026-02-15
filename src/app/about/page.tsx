import { ShieldCheck, Leaf, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-primary py-20 text-center text-white">
                <div className="container px-4 mx-auto">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-heading">
                        Bridging the Gap from Farm to Table
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
                        To empower Fiji’s agricultural backbone by connecting local producers directly to premium markets through transparency and technology.
                    </p>
                </div>
            </section>

            {/* Problem & Solution */}
            <section className="py-16">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                                The Problem We Solve
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                For too long, Fiji's farmers have struggled with market access while hotels struggled with consistent supply. Middlemen often took the lion's share of profits, leaving farmers with little return for their hard work, and buyers with inflated prices and uncertain quality.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Viti-Direct digitizes the supply chain to ensure fair prices for growers and fresh quality for buyers. We remove the uncertainty and build a direct line of trust between the people who grow the food and the people who serve it.
                            </p>
                        </div>
                        <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-xl bg-gray-200">
                            <img
                                src="/farm_chef_connection.png"
                                alt="Farmers & Hotels Connected"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-white py-16">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Core Values</h2>
                        <p className="mt-4 text-lg text-gray-600">The principles that drive Viti-Direct.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
                            <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                <ShieldCheck className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
                            <p className="text-gray-600">
                                No hidden middleman fees. We believe in clear pricing and honest transactions for everyone in the network.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-lg transition-shadow">
                            <div className="h-14 w-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                                <Leaf className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
                            <p className="text-gray-600">
                                Mandatory photo listings ensure you see exactly what you buy. We set high standards for produce grading.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
                            <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <Users className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                            <p className="text-gray-600">
                                Supporting all 14 provinces, from Naitasiri to Lau. We are committed to uplifting rural communities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
