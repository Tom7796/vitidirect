import Link from "next/link";
import { ArrowRight, Leaf, Truck, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 z-10 bg-black/50" /> {/* Dark overlay for text readability */}

        <div className="container px-4 md:px-6 relative z-20 flex flex-col items-center space-y-6 text-center text-white">
          <div className="space-y-4 max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-heading drop-shadow-md text-center">
              Fiji&apos;s First Professional <br /> B2B Agri-Network
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl font-light drop-shadow text-center">
              Connect directly. Sell faster. Buy smarter. Transform your agricultural business with Viti-Direct.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-white shadow transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Join the Network
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-8 text-sm font-medium text-white shadow-sm transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white flex flex-col items-center justify-center text-center">
        <div className="container px-4 md:px-6 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center w-full max-w-3xl mx-auto">
            <div className="space-y-2 flex flex-col items-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-heading text-foreground text-center">How It Works</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center mx-auto">
                Tailored solutions for every player in Fiji&apos;s agriculture sector.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12 w-full">

            {/* Farmer Card */}
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-green-50/50 border border-green-100 hover:shadow-lg transition-all duration-300 h-full text-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading">For Farmers</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                List your harvest, set your price, and connect directly with hotels and commercial buyers. No more middlemen fees.
              </p>
            </div>

            {/* Middleman Card */}
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-blue-50/50 border border-blue-100 hover:shadow-lg transition-all duration-300 h-full text-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold font-heading">For Middlemen</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Aggregate produce from multiple farmers and fulfill large bulk orders efficiently with managed logistics.
              </p>
            </div>

            {/* Commercial Buyer Card */}
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-purple-50/50 border border-purple-100 hover:shadow-lg transition-all duration-300 h-full text-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold font-heading">For Hotels & Buyers</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Source fresh, graded produce directly from the farm. Track orders and manage simplified invoices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <div className="space-y-2 flex flex-col items-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading text-center">
                Ready to Grow Your Business?
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl text-center">
                Join thousands of Fijian farmers and businesses on Viti-Direct today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-10" />
      </section>
    </div>
  );
}
