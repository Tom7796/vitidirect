"use client";

import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
    province?: string;
    hasTransport?: boolean;
    className?: string;
}

export function ProfileCard({ province = "N/A", hasTransport = false, className }: ProfileCardProps) {
    return (
        <div className={cn("flex flex-col gap-1 p-4 bg-card rounded-xl border shadow-sm", className)}>
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">User Profile</span>
                    <span className="text-xs text-muted-foreground">{province}</span>
                </div>
            </div>
            {/* Transport Badge */}
            <div className="mt-2">
                {hasTransport ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Has Transport
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        No Transport
                    </span>
                )}
            </div>
        </div>
    );
}
