"use client";

import Link from "next/link";
import { Plus, MessageSquare, ClipboardList, Package } from "lucide-react";
import { MyListings } from "@/components/dashboard/MyListings";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import { useUser } from "@/context/UserContext";
import { WeatherBanner } from "@/components/dashboard/WeatherBanner";
import { CropDoctor } from "@/components/dashboard/CropDoctor";

export default function FarmerDashboard() {
    const { user, profile, hasUnreadMessages } = useUser() as any;

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Farmer Dashboard</h1>
                <p className="text-muted-foreground">Manage your harvest, view bids, and chat with buyers.</p>
            </div>

            {/* Weather Alert Banner */}
            <WeatherBanner province={profile?.province} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Post New Harvest */}
                <Link href="/farmer/post-item" className="group flex flex-col items-center justify-center p-8 bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 transition-all hover:shadow-md cursor-pointer">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Post New Harvest</h3>
                    <p className="text-sm text-center text-gray-500 mt-2">List your produce for sale.</p>
                </Link>

                {/* Crop Doctor / AI Diagnostics */}
                <CropDoctor />

                {/* Active Chat Requests */}
                <Link href="/messages" className="group relative flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-2xl hover:border-primary/50 transition-all hover:shadow-md cursor-pointer h-full">
                    {hasUnreadMessages && (
                        <div className="absolute top-4 right-4 h-4 w-4 bg-red-500 rounded-full ring-4 ring-white animate-pulse" />
                    )}
                    <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                        <MessageSquare className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Active Chat Requests</h3>
                    <p className="text-sm text-center text-gray-500 mt-2">Messages from potential buyers.</p>
                </Link>
            </div>

            <div className="space-y-4">
                <MyListings />
            </div>
        </div>
    );
}
