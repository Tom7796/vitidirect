"use client";

import Link from "next/link";
import { Package, TrendingUp, Users } from "lucide-react";
import { MyListings } from "@/components/dashboard/MyListings";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function MiddlemanDashboard() {
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

    useEffect(() => {
        const checkUnread = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { count } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('receiver_id', user.id)
                .eq('read', false);

            setHasUnreadMessages((count || 0) > 0);
        };

        checkUnread();

        const channel = supabase
            .channel('unread_middleman_dashboard')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => checkUnread())
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="container mx-auto px-4 min-h-screen py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Middleman Dashboard</h1>
                <p className="text-muted-foreground">Manage your trade network and track orders.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Trade Feed */}
                <Link
                    href="/marketplace"
                    className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="h-24 w-24 text-primary" />
                    </div>
                    <div className="relative z-10">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Trade Feed</h3>
                        <p className="text-sm text-gray-500">Browse current harvest listings from farmers across Fiji.</p>
                    </div>
                </Link>

                {/* My Orders / Managed Orders */}
                <Link
                    href="/orders"
                    className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-500/50"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Package className="h-24 w-24 text-blue-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Package className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Orders I'm Managing</h3>
                        <p className="text-sm text-gray-500">Track status of deliveries and payments.</p>
                    </div>
                </Link>

                {/* Network / Farmers */}
                <Link
                    href="/messages"
                    className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-purple-500/50"
                >
                    {hasUnreadMessages && (
                        <div className="absolute top-4 right-4 h-4 w-4 bg-red-500 rounded-full ring-4 ring-white animate-pulse z-20" />
                    )}
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="h-24 w-24 text-purple-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Users className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">My Network</h3>
                        <p className="text-sm text-gray-500">Communicate with farmers and buyers.</p>
                    </div>
                </Link>
            </div>

            <div className="mt-12">
                <MyListings />
            </div>
        </div>
    );
}
