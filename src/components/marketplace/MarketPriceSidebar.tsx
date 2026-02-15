"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const MARKET_DATA = [
    { name: "Dalo (Taro)", price: "2.50", unit: "kg", change: "+5%", trend: "up" },
    { name: "Ginger", price: "4.80", unit: "kg", change: "-2%", trend: "down" },
    { name: "Cassava", price: "1.20", unit: "kg", change: "0%", trend: "neutral" },
    { name: "Kava (Waka)", price: "85.00", unit: "kg", change: "+10%", trend: "up" },
    { name: "Chillies", price: "3.50", unit: "bundle", change: "-5%", trend: "down" },
];

export function MarketPriceSidebar() {
    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm h-fit sticky top-20">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Fiji Market Rates
            </h2>
            <div className="space-y-4">
                {MARKET_DATA.map((item) => (
                    <div key={item.name} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                            <p className="text-xs text-muted-foreground">${item.price} / {item.unit}</p>
                        </div>
                        <div className="text-right">
                            <div className={`flex items-center gap-1 text-xs font-bold ${item.trend === 'up' ? 'text-green-600' :
                                    item.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                                }`}>
                                {item.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                                {item.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                                {item.trend === 'neutral' && <Minus className="h-3 w-3" />}
                                {item.change}
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-tight">vs last week</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-primary font-medium">
                    Tip: Grade 1 Export prices are currently 20% higher in the Western Division.
                </p>
            </div>
        </div>
    );
}
