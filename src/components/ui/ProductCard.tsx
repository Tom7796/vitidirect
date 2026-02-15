"use client";

import { MapPin, Tag, User, MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    unit: string; // kg, bundle, etc.
    grade: string;
    province: string;
    imageUrl: string;
    sellerName?: string;
    sellerAvatar?: string;
    sellerId: string;
}

export function ProductCard({
    id,
    title,
    price,
    unit,
    grade,
    province,
    imageUrl,
    sellerName = "Unknown Farmer",
    sellerId,
}: ProductCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    <div className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary shadow-sm border border-primary/20">
                        {grade.includes('Grade') ? grade : `${grade} Grade`}
                    </div>
                    {grade.includes('Imperfect') && (
                        <div className="bg-amber-500 text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter shadow-sm animate-pulse">
                            Rescued
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {province}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Tag className="h-3 w-3" /> {unit}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                    <User className="h-3 w-3" /> {sellerName}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">
                        ${price.toFixed(2)} <span className="text-xs font-normal text-muted-foreground">/ {unit}</span>
                    </p>
                    <div className="flex gap-2">
                        <Link
                            href={`/messages/${sellerId}?offer=true&productId=${id}&price=${price}&title=${encodeURIComponent(title)}`}
                            className="inline-flex h-8 items-center justify-center rounded-md bg-secondary px-3 text-[10px] font-bold text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80"
                        >
                            Make Offer
                        </Link>
                        <Link
                            href={`/marketplace/product/${id}`}
                            className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-[10px] font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
