"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);

        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                product:products(title, image_url, unit),
                buyer:profiles!buyer_id(full_name),
                seller:profiles!seller_id(full_name)
            `)
            .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching orders:", error);
        } else {
            setOrders(data || []);
        }
        setLoading(false);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'confirmed': return <CheckCircle className="h-5 w-5 text-blue-500" />;
            case 'delivered': return <Truck className="h-5 w-5 text-purple-500" />;
            case 'received': return <Package className="h-5 w-5 text-green-500" />;
            default: return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Order Placed';
            case 'confirmed': return 'Confirmed';
            case 'delivered': return 'Delivered';
            case 'received': return 'Received';
            default: return status;
        }
    };

    if (loading) {
        return (
            <div className="container max-w-4xl py-8 px-4 animate-pulse space-y-4">
                <div className="h-8 w-1/4 bg-gray-200 rounded mb-8"></div>
                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>)}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="container max-w-4xl py-8 px-4">
                <h1 className="text-3xl font-bold tracking-tight mb-8">My Orders</h1>
                <div className="text-center py-12 border rounded-xl bg-gray-50">
                    <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                    <p className="text-muted-foreground">Purchases and sales will appear here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl py-8 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-8">My Orders</h1>
            <div className="space-y-4">
                {orders.map((order) => {
                    const isBuyer = order.buyer_id === userId;
                    return (
                        <Link
                            key={order.id}
                            href={`/orders/${order.id}`}
                            className="block bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="p-4 sm:p-6 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {order.product?.image_url && (
                                            <img src={order.product.image_url} alt="Product" className="h-full w-full object-cover" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900">{order.product?.title || "Unknown Product"}</h3>
                                            <span className={cn(
                                                "px-2 py-0.5 text-xs rounded-full font-medium capitalize",
                                                isBuyer ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                            )}>
                                                {isBuyer ? "Buying" : "Selling"}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {isBuyer ? `Seller: ${order.seller?.full_name}` : `Buyer: ${order.buyer?.full_name}`}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2 text-sm">
                                            {getStatusIcon(order.status)}
                                            <span className="font-medium text-gray-700">{getStatusLabel(order.status)}</span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-gray-600">${order.total_price} ({order.quantity} {order.product?.unit})</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
