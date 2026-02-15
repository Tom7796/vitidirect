"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useSearchParams } from "next/navigation";
import { Send, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatRoomPage() {
    const params = useParams(); // { id: string }
    const searchParams = useSearchParams();
    const otherUserId = params.id as string;
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [listingId, setListingId] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [otherUserProfile, setOtherUserProfile] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isOffer = searchParams.get('offer');
        const productId = searchParams.get('productId');
        const price = searchParams.get('price');
        const title = searchParams.get('title');

        if (isOffer && title && price) {
            setNewMessage(`I am interested in ${title}. Would you accept $${price}?`);
            if (productId) setListingId(productId);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchWrappers();
    }, [otherUserId]);

    useEffect(() => {
        if (!currentUser?.id) return;

        // Subscribe to new messages
        const channel = supabase
            .channel(`chat_room_${otherUserId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `receiver_id=eq.${currentUser.id}`,
                },
                (payload) => {
                    if (payload.new.sender_id === otherUserId) {
                        setMessages(prev => [...prev, payload.new]);
                        // Mark this message as read automatically if we are in the chat
                        supabase
                            .from('messages')
                            .update({ read: true })
                            .eq('id', payload.new.id)
                            .then();
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [currentUser?.id, otherUserId]);

    useEffect(() => {
        // Scroll to bottom
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchWrappers = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setCurrentUser(user);

        // Fetch other user profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', otherUserId)
            .single();

        if (profile) setOtherUserProfile(profile);

        // Fetch history
        const { data: msgs } = await supabase
            .from('messages')
            .select('*')
            .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
            .order('created_at', { ascending: true });

        if (msgs) setMessages(msgs);

        // Mark as read
        if (msgs && msgs.length > 0) {
            await supabase
                .from('messages')
                .update({ read: true })
                .eq('sender_id', otherUserId)
                .eq('receiver_id', user.id)
                .eq('read', false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;

        const { error } = await supabase.from('messages').insert({
            sender_id: currentUser.id,
            receiver_id: otherUserId,
            content: newMessage,
            product_id: listingId
        });

        if (error) {
            alert("Failed to send");
        } else {
            setMessages(prev => [...prev, {
                id: Date.now(), // temp id
                sender_id: currentUser.id,
                receiver_id: otherUserId,
                content: newMessage,
                created_at: new Date().toISOString()
            }]);
            setNewMessage("");
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)]">
            {/* Header */}
            <div className="border-b bg-white p-4 shadow-sm flex justify-between items-center z-10">
                <div>
                    <h2 className="text-lg font-bold">{otherUserProfile?.full_name || "Chat"}</h2>
                    {otherUserProfile?.province && <p className="text-xs text-muted-foreground">{otherUserProfile.province}</p>}
                </div>

                {/* Preferred Contact Method Display */}
                {otherUserProfile?.preferred_contact_method && (
                    <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium border border-yellow-200">
                        {otherUserProfile.preferred_contact_method === 'whatsapp' && <MessageCircle className="h-3 w-3" />}
                        {otherUserProfile.preferred_contact_method === 'phone' && <Phone className="h-3 w-3" />}
                        <span>This {otherUserProfile.role || 'user'} prefers {otherUserProfile.preferred_contact_method}</span>
                    </div>
                )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, index) => {
                    const isMe = msg.sender_id === currentUser?.id;
                    return (
                        <div key={index} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                isMe ? "bg-primary text-primary-foreground rounded-br-none" : "bg-white border rounded-bl-none"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition-colors"
                        disabled={!newMessage.trim()}
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
