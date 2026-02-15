"use client";

import Link from "next/link";
import { NotificationBell } from "@/components/ui/NotificationBell";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export function Navbar() {
    const { user, role, signOut, hasUnreadMessages } = useUser() as any;
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
        setIsOpen(false);
    };

    const getDashboardLink = () => {
        if (!role) return '/marketplace';
        if (role === 'farmer') return '/farmer/dashboard';
        if (role === 'buyer') return '/buyer/dashboard';
        if (role === 'middleman') return '/middleman/dashboard';
        return '/marketplace';
    };

    return (
        <nav className="sticky top-0 z-50 w-full glass border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <span>Viti-Direct</span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        About Us
                    </Link>
                    <Link href="/media" className="text-sm font-medium hover:text-primary transition-colors">
                        Media
                    </Link>
                    <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                        Blog
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                        Contact Us
                    </Link>
                    <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
                        Marketplace
                    </Link>
                    {role === 'farmer' && (
                        <Link href="/farmer/post-item" className="text-sm font-medium hover:text-primary transition-colors">
                            Sell Produce
                        </Link>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {user && <NotificationBell hasUnread={hasUnreadMessages} />}

                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href={getDashboardLink()}
                                className="hidden md:inline-flex h-9 items-center justify-center rounded-md border border-input bg-background/50 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <LogOut className="mr-2 h-4 w-4" /> Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link href="/signup" className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                            Join Now
                        </Link>
                    )}

                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t p-4 bg-background">
                    <div className="flex flex-col gap-4">
                        <Link href="/about" className="text-sm font-medium" onClick={() => setIsOpen(false)}>About Us</Link>
                        <Link href="/media" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Media</Link>
                        <Link href="/blog" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/contact" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Contact Us</Link>
                        <Link href="/marketplace" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Marketplace</Link>
                        {role === 'farmer' && (
                            <Link href="/farmer/post-item" className="text-sm font-medium" onClick={() => setIsOpen(false)}>Sell Produce</Link>
                        )}
                        {user ? (
                            <>
                                <Link href={getDashboardLink()} className="text-sm font-medium" onClick={() => setIsOpen(false)}>My Dashboard</Link>
                                <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="text-sm font-medium text-left text-red-600">Sign Out</button>
                            </>
                        ) : (
                            <Link href="/signup" className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" onClick={() => setIsOpen(false)}>
                                Join Now
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
