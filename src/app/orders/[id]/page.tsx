"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { Package, Truck, CheckCircle, Clock, MapPin, QrCode, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    product:products!orders_product_id_fkey(*),
                    buyer:profiles!orders_buyer_id_fkey(*),
                    seller:profiles!orders_seller_id_fkey(*)
                `)
                .eq('id', params.id)
                .single();

            if (data) setOrder(data);
            setLoading(false);
        };

        fetchOrder();
    }, [params.id]);

    if (loading) return <div className="container py-8 animate-pulse">Loading...</div>;
    if (!order) return <div className="container py-8">Order not found.</div>;

    const statusSteps = [
        { id: 'pending', label: 'Ordered', icon: Clock },
        { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
        { id: 'delivered', label: 'In Transit', icon: Truck },
        { id: 'received', label: 'Delivered', icon: Package },
    ];

    const currentStepIndex = statusSteps.findIndex(s => s.id === order.status);

    return (
        <div className="container max-w-4xl py-8 px-4">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Orders
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Status Tracker */}
                    <div className="bg-white p-6 rounded-2xl border shadow-sm">
                        <div className="flex justify-between relative mb-8">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
                            {statusSteps.map((step, idx) => {
                                const isCompleted = idx <= currentStepIndex;
                                const isCurrent = idx === currentStepIndex;
                                return (
                                    <div key={step.id} className="relative z-10 flex flex-col items-center">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all",
                                            isCompleted ? "bg-primary text-white" : "bg-gray-200 text-gray-500",
                                            isCurrent && "ring-4 ring-primary/20 scale-110"
                                        )}>
                                            <step.icon className="h-5 w-5" />
                                        </div>
                                        <p className={cn(
                                            "text-[10px] font-bold mt-2 uppercase tracking-wider",
                                            isCompleted ? "text-primary" : "text-gray-400"
                                        )}>{step.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="pt-6 border-t">
                            <h3 className="text-lg font-bold mb-2">Order Tracking: {order.id.slice(0, 8).toUpperCase()}</h3>
                            <p className="text-sm text-muted-foreground">Estimated Delivery: Tomorrow by 4:00 PM</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-6 rounded-2xl border shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Items Details</h3>
                        <div className="flex gap-4">
                            <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border">
                                <img src={order.product?.image_url} alt="Item" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h4 className="font-bold">{order.product?.title}</h4>
                                    <p className="font-bold">${order.total_price}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{order.quantity} {order.product?.unit} @ ${order.product?.price}/{order.product?.unit}</p>
                                <div className="mt-2 text-xs bg-gray-100 w-fit px-2 py-1 rounded">
                                    Grade: {order.product?.grade}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Farm-to-Fork Traceability */}
                    {order.status === 'received' ? (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div className="max-w-[70%]">
                                    <h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5" />
                                        Farm-to-Fork Verified
                                    </h3>
                                    <p className="text-sm text-green-600 mt-2">
                                        This order is fully traceable. Scan the QR code to see the harvest date, farm location, and soil health report.
                                    </p>
                                    <div className="mt-4 flex gap-4">
                                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-green-200 hover:scale-105 transition-transform flex items-center gap-2">
                                            Download Certificate
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
                                    <QrCode className="h-24 w-24 text-green-600" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* QR Crate Tracking Placeholder */
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div className="max-w-[70%]">
                                    <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                                        <QrCode className="h-5 w-5" />
                                        Crate QR Scanning
                                    </h3>
                                    <p className="text-sm text-primary/80 mt-2">
                                        Scan the QR code on the delivery crate to confirm pick-up or receipt.
                                        Ensures 100% traceability for food safety.
                                    </p>
                                    <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
                                        <QrCode className="h-4 w-4" /> Open Scanner
                                    </button>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-inner border border-primary/10 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <QrCode className="h-24 w-24 text-gray-300" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* M-Paisa Escrow Security */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div className="max-w-[70%]">
                                <h3 className="text-lg font-bold text-yellow-800 flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    M-Paisa Escrow Shield
                                </h3>
                                <p className="text-sm text-yellow-700 mt-2">
                                    Funds are held securely by Viti-Direct until you confirm receipt of the harvest.
                                    Protection for both Farmer and Buyer.
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Security Status</p>
                                <p className="text-lg font-black text-yellow-800">ENCRYPTED</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Delivery Address */}
                    <div className="bg-white p-6 rounded-2xl border shadow-sm">
                        <h3 className="font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest text-muted-foreground">
                            <MapPin className="h-4 w-4" /> Pick-up Location
                        </h3>
                        <div className="space-y-1">
                            <p className="font-bold">{order.seller?.full_name}</p>
                            <p className="text-sm text-muted-foreground">{order.seller?.province}, Fiji Island</p>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <Link href={`/messages/${order.seller_id}`} className="text-primary text-sm font-bold hover:underline">Message Seller</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
