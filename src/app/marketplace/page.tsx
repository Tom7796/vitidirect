"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/ui/ProductCard";
import { Search, Filter, Leaf } from "lucide-react";
import { MarketPriceSidebar } from "@/components/marketplace/MarketPriceSidebar";
import { cn } from "@/lib/utils";

const PROVINCES = [
    "Ba", "Bua", "Cakaudrove", "Kadavu", "Lau", "Lomaiviti", "Macuata",
    "Nadroga-Navosa", "Naitasiri", "Namosi", "Ra", "Rewa", "Serua", "Tailevu"
];

const GRADES = ["Grade 1 (Export)", "Grade 2 (Local)", "Imperfect (Discounted)"];

export default function MarketplacePage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [rescuedOnly, setRescuedOnly] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let query = supabase
                    .from('products')
                    .select(`
                        *,
                        profiles (
                            full_name,
                            province
                        )
                    `)
                    .eq('status', 'available');

                if (selectedProvince) {
                    query = query.eq('province', selectedProvince);
                }

                if (selectedGrade) {
                    query = query.eq('grade', selectedGrade);
                }

                if (rescuedOnly) {
                    query = query.ilike('grade', '%Imperfect%');
                }

                const { data, error } = await query;

                if (error) {
                    console.error("Error fetching products:", error);
                } else {
                    let filtered = data || [];
                    if (searchTerm) {
                        filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
                    }
                    setProducts(filtered);
                }
            } catch (err: any) {
                console.error("Unexpected error in fetchProducts:", err);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timer);
    }, [selectedProvince, selectedGrade, rescuedOnly, searchTerm]);



    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
                    <p className="text-muted-foreground">Fresh produce from Fiji's best farmers.</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                        onClick={() => setRescuedOnly(!rescuedOnly)}
                        className={cn(
                            "h-9 px-3 rounded-md border text-sm font-medium flex items-center gap-2 transition-colors",
                            rescuedOnly ? "bg-amber-100 border-amber-300 text-amber-800" : "bg-background border-input hover:bg-accent"
                        )}
                    >
                        <Leaf className={cn("h-4 w-4", rescuedOnly ? "text-amber-600" : "text-gray-400")} />
                        Rescued Only
                    </button>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search produce..."
                            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary sm:w-[200px] md:w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                    >
                        <option value="">All Provinces</option>
                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                    >
                        <option value="">All Grades</option>
                        {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-[300px] rounded-lg bg-gray-100 animate-pulse" />
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    unit={product.unit}
                                    grade={product.grade}
                                    province={product.province || product.profiles?.province || "Unknown"}
                                    imageUrl={product.image_url}
                                    sellerName={product.profiles?.full_name}
                                    sellerId={product.seller_id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Leaf className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-1">
                    <MarketPriceSidebar />
                </div>
            </div>
        </div>
    );
}
