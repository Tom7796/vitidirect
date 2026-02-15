import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-[80vh] flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl font-bold tracking-tight text-primary">404 - Page Not Found</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="mt-8 flex gap-4">
                <Link
                    href="/marketplace"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                    Browse Marketplace
                </Link>
                <Link
                    href="/"
                    className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
