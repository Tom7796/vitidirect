"use client";

import { MapPin, Box, Truck, CheckCircle, Clock, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PENDING_PICKUPS = [
    { id: "ORD-101", farmer: "Sanjay Prasad", location: "Naitasiri", items: "50kg Dalo", status: "Priority" },
    { id: "ORD-102", farmer: "Mereani Cavu", location: "Tailevu", items: "20kg Ginger", status: "Scheduled" },
    { id: "ORD-103", farmer: "Viliame Ratov", location: "Serua", items: "100kg Cassava", status: "Pending" },
];

export default function LogisticsDashboard() {
    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Logistics Portal</h1>
                    <p className="text-muted-foreground">Manage pick-ups and track delivery crates across the island.</p>
                </div>
                <div className="flex gap-2">
                    <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow">
                        <Search className="mr-2 h-4 w-4" /> Route Optimizer
                    </button>
                    <button className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                        <Box className="mr-2 h-4 w-4" /> Inventory
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pending Pickups List */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orange-500" />
                        Pending Pick-ups
                    </h2>
                    <div className="space-y-4">
                        {PENDING_PICKUPS.map((pickup) => (
                            <div key={pickup.id} className="p-4 rounded-xl border bg-white shadow-sm hover:border-primary transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-bold text-gray-900">{pickup.id}</p>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                        pickup.status === 'Priority' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                                    )}>
                                        {pickup.status}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm flex items-center gap-2 text-gray-600">
                                        <MapPin className="h-3 w-3 text-primary" /> {pickup.location} ({pickup.farmer})
                                    </p>
                                    <p className="text-sm flex items-center gap-2 text-gray-600">
                                        <Truck className="h-3 w-3 text-secondary" /> {pickup.items}
                                    </p>
                                </div>
                                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-[10px] font-bold text-primary hover:underline underline-offset-4">Assign to Me</button>
                                    <button className="text-[10px] font-bold text-muted-foreground hover:underline underline-offset-4">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map View Placeholder */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Route Map
                    </h2>
                    <div className="bg-gray-100 rounded-2xl border-2 border-dashed aspect-video flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-17.7134,178.0650,7/800x450?access_token=YOUR_TOKEN')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="relative z-10 text-center p-6 bg-white/80 backdrop-blur-md rounded-xl border shadow-lg max-w-sm mx-auto">
                            <MapPin className="h-12 w-12 text-primary mx-auto mb-4 animate-bounce" />
                            <h3 className="text-lg font-bold">Interactive Island Map</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Logistics partners can see real-time locations of farmers with pending harvest pickups.
                                [Map Integration Pending]
                            </p>
                        </div>

                        {/* Fake Map Markers */}
                        <div className="absolute top-1/4 left-1/3 p-2 bg-primary text-white rounded-full shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
                            <MapPin className="h-4 w-4" />
                        </div>
                        <div className="absolute top-1/2 right-1/4 p-2 bg-secondary text-white rounded-full shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
                            <MapPin className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border bg-primary/5 border-primary/10 flex items-center gap-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                                <Box className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary">12</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Crates Out</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border bg-secondary/5 border-secondary/10 flex items-center gap-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                                <CheckCircle className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-secondary">48</p>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Fulfilled Today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
