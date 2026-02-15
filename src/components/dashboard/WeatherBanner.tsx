"use client";

import { CloudRain, Wind, X, Sun, Cloud, Thermometer } from "lucide-react";
import { useState } from "react";

interface WeatherBannerProps {
    province?: string;
}

const FORCAST_DATA = [
    { day: "Today", temp: 31, condition: "Partly Cloudy", icon: Cloud },
    { day: "Tomorrow", temp: 29, condition: "Showers", icon: CloudRain },
    { day: "Monday", temp: 32, condition: "Sunny", icon: Sun },
    { day: "Tuesday", temp: 30, condition: "Thunderstorms", icon: CloudRain },
    { day: "Wednesday", temp: 31, condition: "Mostly Sunny", icon: Sun },
];

export function WeatherBanner({ province = "Naitasiri" }: WeatherBannerProps) {
    const [showForecast, setShowForecast] = useState(false);

    // Simulated weather logic based on real Fiji patterns
    const isHighRisk = province === "Naitasiri" || province === "Rewa" || province === "Namosi";

    return (
        <>
            <div className={`mb-8 p-4 rounded-xl border flex items-center gap-4 transition-all shadow-sm ${isHighRisk ? "bg-red-50 border-red-200 text-red-800" : "bg-blue-50 border-blue-200 text-blue-800"
                }`}>
                <div className={`p-3 rounded-full ${isHighRisk ? "bg-red-100" : "bg-blue-100"}`}>
                    {isHighRisk ? <Wind className="h-6 w-6" /> : <CloudRain className="h-6 w-6" />}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm uppercase tracking-wider">Weather Alert: {province}</h3>
                        {isHighRisk && (
                            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">Critical</span>
                        )}
                    </div>
                    <p className="text-sm font-medium opacity-90 text-balance">
                        {isHighRisk
                            ? "Heavy rain and high winds expected. Secure your greenhouses and harvest mature crops immediately."
                            : "Scattered showers expected throughout the week. Good time for fertilizing root crops."}
                    </p>
                </div>
                <button
                    onClick={() => setShowForecast(true)}
                    className="text-xs font-bold underline underline-offset-4 hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                    View Forecast
                </button>
            </div>

            {/* Forecast Modal */}
            {showForecast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="bg-primary p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">5-Day Forecast</h3>
                                <p className="text-sm opacity-80">{province}, Fiji</p>
                            </div>
                            <button onClick={() => setShowForecast(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {FORCAST_DATA.map((item, id) => (
                                <div key={id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{item.day}</p>
                                            <p className="text-xs text-gray-500">{item.condition}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <Thermometer className="h-4 w-4 opacity-50" />
                                        {item.temp}°C
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-gray-50 border-t text-center">
                            <button
                                onClick={() => setShowForecast(false)}
                                className="w-full bg-white border border-gray-200 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-100 transition-all text-gray-900"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
