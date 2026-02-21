"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

interface UserContextType {
    user: User | null;
    session: Session | null;
    profile: any | null;
    role: string | null;
    hasUnreadMessages: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkUnread = async (userId: string) => {
        const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("receiver_id", userId)
            .eq("read", false);

        setHasUnreadMessages((count || 0) > 0);
    };

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (data) {
            setProfile(data);
            setRole(data.role);
        }
    };

    useEffect(() => {
        // Initial session check
        const initSession = async () => {
            const { data: { session: fetchedSession } } = await supabase.auth.getSession();

            // Safeguard against stringified session in store
            let parsedSession = fetchedSession;
            if (typeof parsedSession === 'string') {
                try {
                    parsedSession = JSON.parse(parsedSession);
                } catch (e) {
                    parsedSession = null;
                }
            }

            setSession(parsedSession);
            setUser(parsedSession?.user ?? null);

            if (parsedSession?.user) {
                // Prefer metadata role if available for speed
                if (parsedSession.user.user_metadata?.role) {
                    setRole(parsedSession.user.user_metadata.role);
                }
                await fetchProfile(parsedSession.user.id);
                await checkUnread(parsedSession.user.id);
            }
            setLoading(false);
        };

        initSession();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
            // Safeguard against stringified session
            let parsedSession = newSession;
            if (typeof parsedSession === 'string') {
                try {
                    parsedSession = JSON.parse(parsedSession);
                } catch (e) {
                    parsedSession = null;
                }
            }

            setSession(parsedSession);
            setUser(parsedSession?.user ?? null);

            if (parsedSession?.user) {
                if (parsedSession.user.user_metadata?.role) {
                    setRole(parsedSession.user.user_metadata.role);
                }
                await fetchProfile(parsedSession.user.id);
                await checkUnread(parsedSession.user.id);
            } else {
                setProfile(null);
                setRole(null);
                setHasUnreadMessages(false);
            }
            setLoading(false);
        });

        // Realtime subscription for notifications
        let channel: any;

        if (user?.id) {
            channel = supabase
                .channel('global_notifications')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'messages', filter: `receiver_id=eq.${user.id}` },
                    (payload) => {
                        setHasUnreadMessages(true);
                    }
                )
                .subscribe();
        }

        return () => {
            subscription.unsubscribe();
            if (channel) supabase.removeChannel(channel);
        };
    }, [user?.id]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
        setRole(null);
        setHasUnreadMessages(false);
    };

    return (
        <UserContext.Provider value={{ user, session, profile, role, loading, signOut, hasUnreadMessages }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
