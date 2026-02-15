"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NotificationBellProps {
    hasUnread?: boolean;
    className?: string;
}

export function NotificationBell({ hasUnread = false, className }: NotificationBellProps) {
    return (
        <Link href="/messages" className={cn("relative p-2 rounded-full hover:bg-secondary/20 transition-colors inline-block", className)}>
            <Bell className="w-6 h-6 text-foreground" />
            {hasUnread && (
                <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
            )}
        </Link>
    );
}
