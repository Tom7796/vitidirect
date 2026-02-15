"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Edit, Package, Eye } from "lucide-react";
import Link from "next/link";

export function MyListings() {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('seller_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching listings:", error);
        } else {
            setListings(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this listing? This action cannot be undone.")) return;

        try {
            const { error, count } = await supabase
                .from('products')
                .delete({ count: 'exact' })
                .eq('id', id);

            if (error) {
                throw error;
            }

            // Check if a row was actually deleted
            if (count === 0) {
                alert("Could not delete listing. This is likely a permission issue. Please ensuring you have run the 'fix_products_rls.sql' script in Supabase.");
                // Re-fetch to ensure UI is in sync
                fetchListings();
            } else {
                setListings(listings.filter(l => l.id !== id));
            }
        } catch (error: any) {
            console.error("Delete error:", error);
            alert("Error deleting listing: " + error.message);
        }
    };

    if (loading) {
        return <div className="animate-pulse space-y-4">
            {[1, 2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-lg" />)}
        </div>;
    }

    if (listings.length === 0) {
        return (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 text-center text-muted-foreground">
                <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>You haven't posted any items for sale yet.</p>
                {/* Contextual link could be passed as prop, but typical logic: */}
                {/* Farmer posts harvest, Middleman might too? Assuming generic 'Post' logic or role check */}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Active Listings</h2>
            <div className="grid gap-4">
                {listings.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-500">${item.price}/{item.unit} • {item.stock_quantity} left</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/marketplace/product/${item.id}`}
                                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                                title="View Details"
                            >
                                <Eye className="h-4 w-4" />
                            </Link>
                            {/* Edit could go here later */}
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Delete Listing"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
