"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
    const [conversations, setConversations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch all messages involving me
        const { data, error } = await supabase
            .from('messages')
            .select(`
        *,
        sender:profiles!messages_sender_id_fkey(full_name, avatar_url),
        receiver:profiles!messages_receiver_id_fkey(full_name, avatar_url)
      `)
            .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching messages:", error);
        } else {
            // Group by other user
            const convoMap = new Map();
            data.forEach((msg: any) => {
                const otherUserId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
                const otherUserProfile = msg.sender_id === user.id ? msg.receiver : msg.sender;

                if (!convoMap.has(otherUserId)) {
                    convoMap.set(otherUserId, {
                        userId: otherUserId,
                        profile: otherUserProfile,
                        lastMessage: msg.content,
                        timestamp: msg.created_at,
                        isUnread: !msg.read && msg.receiver_id === user.id
                    });
                }
            });
            setConversations(Array.from(convoMap.values()));
        }
        setLoading(false);
    };

    return (
        <div className="container max-w-4xl py-8 px-4 mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Messages</h1>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />)}
                </div>
            ) : conversations.length > 0 ? (
                <div className="space-y-2">
                    {conversations.map((convo) => (
                        <Link key={convo.userId} href={`/messages/${convo.userId}`} className="block">
                            <div className={cn(
                                "flex items-center p-4 bg-white border rounded-xl hover:shadow-md transition-all",
                                convo.isUnread ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/50"
                            )}>
                                <div className="relative">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                        {convo.profile?.avatar_url ? (
                                            <img src={convo.profile.avatar_url} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                                        ) : (
                                            <User className="h-6 w-6 text-gray-400" />
                                        )}
                                    </div>
                                    {convo.isUnread && (
                                        <div className="absolute top-0 right-3 h-3 w-3 bg-primary rounded-full ring-2 ring-white" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className={cn("text-lg truncate", convo.isUnread ? "font-bold text-gray-900" : "font-semibold")}>
                                            {convo.profile?.full_name || "Unknown User"}
                                        </h3>
                                        <span className="text-xs text-muted-foreground">{new Date(convo.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <p className={cn("text-sm truncate", convo.isUnread ? "text-gray-900 font-medium" : "text-gray-500")}>
                                        {convo.lastMessage}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border rounded-xl bg-gray-50">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                    <p className="text-muted-foreground">Start a conversation from the marketplace.</p>
                    <div className="mt-6">
                        <Link href="/marketplace" className="text-primary hover:underline">Go to Marketplace</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
