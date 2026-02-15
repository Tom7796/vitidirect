import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="flex h-[80vh] flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary">403 - Unauthorized</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                You do not have permission to access this page.
            </p>
            <div className="mt-8 flex gap-4">
                <Link href="/" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    Go Home
                </Link>
            </div>
        </div>
    );
}
