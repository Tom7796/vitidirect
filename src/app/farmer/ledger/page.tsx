"use client";

import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, Filter } from "lucide-react";
import { useState } from "react";

const TRANSACTIONS = [
    { id: "TX-901", date: "2026-02-05", buyer: "Grand Pacific Hotel", amount: 450.00, status: "Paid", type: "Sale" },
    { id: "TX-902", date: "2026-02-06", buyer: "Nadi Central Market", amount: 120.50, status: "In Escrow", type: "Sale" },
    { id: "TX-903", date: "2026-02-06", buyer: "Logistics Fee", amount: -25.00, status: "Paid", type: "Fee" },
];

export default function LedgerPage() {
    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">My Digital Khata</h1>
                <p className="text-muted-foreground">Sales ledger and payment tracking.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl border bg-white shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Earnings</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900">$2,450.00</span>
                        <span className="text-xs font-bold text-green-600 mb-1 flex items-center bg-green-50 px-2 py-0.5 rounded-full">
                            <ArrowUpRight className="h-3 w-3" /> +12%
                        </span>
                    </div>
                </div>
                <div className="p-6 rounded-2xl border bg-white shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">In Escrow (Pending)</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-orange-600">$580.20</span>
                        <Clock className="h-5 w-5 text-orange-400 mb-2" />
                    </div>
                </div>
                <div className="p-6 rounded-2xl border bg-white shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Next Payout</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-primary">$1,200.00</span>
                        <span className="text-xs font-medium text-muted-foreground mb-2">Est. Feb 10</span>
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-bold flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        Recent Transactions
                    </h2>
                    <button className="text-xs font-bold flex items-center gap-1 border rounded-md px-2 py-1 bg-white">
                        <Filter className="h-3 w-3" /> Filter
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50/50">
                                <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">ID</th>
                                <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">Date</th>
                                <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">Party</th>
                                <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">Amount</th>
                                <th className="px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {TRANSACTIONS.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-500">{tx.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{tx.buyer}</td>
                                    <td className={`px-6 py-4 text-sm font-bold text-right ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${tx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-primary text-white flex items-center justify-between shadow-xl shadow-primary/20">
                <div>
                    <h3 className="text-xl font-bold">Withdraw to M-Paisa</h3>
                    <p className="text-sm opacity-90">Transfer your available balance to your mobile wallet instantly.</p>
                </div>
                <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
                    Withdraw $1,870
                </button>
            </div>
        </div>
    );
}
