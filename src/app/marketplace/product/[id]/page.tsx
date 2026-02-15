"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ChevronLeft, MapPin, Tag, User, MessageCircle, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [purchasing, setPurchasing] = useState(false);
    const router = useRouter();

    const handleBuy = async () => {
        setPurchasing(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/login'); // Should actually direct to signup/login
            return;
        }

        if (user.id === product.seller_id) {
            alert("You cannot buy your own product.");
            setPurchasing(false);
            return;
        }

        const totalPrice = product.price * quantity;

        const { data, error } = await supabase
            .from('orders')
            .insert({
                buyer_id: user.id,
                seller_id: product.seller_id,
                product_id: product.id,
                quantity: quantity,
                total_price: totalPrice,
                status: 'pending'
            })
            .select() // Select to get ID
            .single();

        if (error) {
            console.error("Error creating order:", error);
            alert("Failed to place order. Please try again.");
        } else {
            router.push(`/orders/${data.id}`);
        }
        setPurchasing(false);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;

            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select(`
                    *,
                    profiles (
                        full_name,
                        province,
                        role,
                        avatar_url
                    )
                `)
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching product:", error);
                setError("Product not found or has been removed.");
            } else {
                setProduct(data);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="container px-4 py-8 animate-pulse">
                <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
                <div className="aspect-video w-full bg-gray-200 rounded-lg mb-8"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Product not found"}</h2>
                <Link href="/marketplace" className="text-primary hover:underline">
                    Back to Marketplace
                </Link>
            </div>
        );
    }

    return (
        <div className="container max-w-5xl px-4 py-8">
            <Link
                href="/marketplace"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Marketplace
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 border">
                    <img
                        src={product.image_url}
                        alt={product.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-md text-sm font-bold text-primary shadow-sm border border-primary/20">
                        Grade {product.grade}
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                                {product.category || "Fresh Produce"}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {product.province || product.profiles?.province}
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                            {product.title}
                        </h1>

                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-3xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                            <span className="text-lg text-muted-foreground">
                                / {product.unit}
                            </span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {product.description || "No description provided by the seller."}
                        </p>
                    </div>

                    <div className="mt-auto border-t pt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Seller Information</h3>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border">
                            <div className="flex items-center gap-3">
                                {product.profiles?.avatar_url ? (
                                    <img src={product.profiles.avatar_url} alt={product.profiles.full_name} className="h-10 w-10 rounded-full object-cover" />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-gray-900">{product.profiles?.full_name || "Unknown Farmer"}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{product.profiles?.role || "Farmer"}</p>
                                </div>
                            </div>

                            <Link
                                href={`/messages/${product.seller_id}`}
                                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <MessageCircle className="h-4 w-4 mr-2" /> Message
                            </Link>
                        </div>

                        {/* Buying Section */}
                        <div className="mt-6 p-6 bg-white border rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Purchase this item</h3>
                            <div className="flex items-end gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="quantity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Quantity ({product.unit})
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        min="1"
                                        max={product.stock_quantity}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 mb-2 text-right">Total: <span className="font-bold text-lg text-primary">${(product.price * quantity).toFixed(2)}</span></p>
                                    <button
                                        onClick={handleBuy}
                                        disabled={purchasing}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        {purchasing ? "Processing..." : (
                                            <>
                                                <Truck className="mr-2 h-4 w-4" /> Place Order
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
