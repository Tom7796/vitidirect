"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

export function RecentOrdersList() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                product:products(title, image_url)
            `)
            .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
            .order('created_at', { ascending: false })
            .limit(5); // Show only recent 5

        if (error) {
            console.error("Error fetching recent orders:", error);
        } else {
            setOrders(data || []);
        }
        setLoading(false);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'confirmed': return <CheckCircle className="h-4 w-4 text-blue-500" />;
            case 'delivered': return <Truck className="h-4 w-4 text-purple-500" />;
            case 'received': return <Package className="h-4 w-4 text-green-500" />;
            default: return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    if (loading) {
        return <div className="space-y-4 animate-pulse">
            {[1, 2].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>)}
        </div>;
    }

    if (orders.length === 0) {
        return (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 text-center text-muted-foreground">
                <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>No recent orders found.</p>
                <Link href="/marketplace" className="text-primary hover:underline mt-2 inline-block">Start shopping</Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Recent Orders</h2>
                <Link href="/orders" className="text-sm text-primary hover:underline">View All</Link>
            </div>
            <div className="grid gap-4">
                {orders.map((order) => (
                    <Link key={order.id} href={`/orders/${order.id}`} className="block">
                        <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                    {order.product?.image_url && <img src={order.product.image_url} alt="Product" className="h-full w-full object-cover" />}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 line-clamp-1">{order.product?.title || "Unknown Product"}</h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        {getStatusIcon(order.status)}
                                        <span className="capitalize">{order.status}</span>
                                        <span>•</span>
                                        <span>${order.total_price}</span>
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
