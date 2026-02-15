"use client";

import Link from "next/link";
import { Plus, Users, FileText, ShoppingBag, MessageSquare } from "lucide-react";
import { RecentOrdersList } from "@/components/dashboard/RecentOrdersList";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function BuyerDashboard() {
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
            .channel('unread_buyer_dashboard')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => checkUnread())
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Buyer Dashboard</h1>
                <p className="text-muted-foreground">Source produce, manage orders, and find trusted farmers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Post Request (RFQ) */}
                <div className="group flex flex-col items-center justify-center p-8 bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 transition-all hover:shadow-md cursor-pointer">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Post Request (RFQ)</h3>
                    <p className="text-sm text-center text-gray-500 mt-2">Request specific produce or bulk orders.</p>
                </div>

                {/* Browse Farmers */}
                <Link href="/marketplace" className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-2xl hover:border-primary/50 transition-all hover:shadow-md cursor-pointer">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                        <Users className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Browse Farmers</h3>
                    <p className="text-sm text-center text-gray-500 mt-2">Find farmers by province or grade.</p>
                </Link>

                {/* Messages */}
                <Link href="/messages" className="group relative flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-2xl hover:border-primary/50 transition-all hover:shadow-md cursor-pointer">
                    {hasUnreadMessages && (
                        <div className="absolute top-4 right-4 h-4 w-4 bg-red-500 rounded-full ring-4 ring-white animate-pulse" />
                    )}
                    <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                        <MessageSquare className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">My Messages</h3>
                    <p className="text-sm text-center text-gray-500 mt-2">Chat history and notifications.</p>
                </Link>
            </div>

            <div className="space-y-4">
                <RecentOrdersList />
            </div>
        </div>
    );
}
