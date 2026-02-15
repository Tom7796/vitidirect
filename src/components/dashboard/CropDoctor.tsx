"use client";

import { Stethoscope, Upload, Loader2, Sparkles, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useRef } from "react";

const DISEASE_RESULTS = [
    {
        name: "Taro Leaf Blight",
        symptoms: "Circular, water-soaked spots with yellow halos. Brown discharge at center.",
        treatment: "Clear infected debris immediately. Improve air circulation. Apply Copper-based fungicide if severe.",
        severity: "High"
    },
    {
        name: "Cassava Mosaic Virus",
        symptoms: "Mottling and yellowing of leaves. Twisted or stunted leaf growth.",
        treatment: "Use virus-free planting materials. Control whitefly populations. Rough out infected plants.",
        severity: "Critical"
    },
    {
        name: "Ginger Bacterial Wilt",
        symptoms: "Yellowing of lower leaves. Sudden wilting of the whole plant. Rhizome rot.",
        treatment: "Solarize soil before planting. Use clean seed ginger. Ensure proper drainage.",
        severity: "Critical"
    },
    {
        name: "Black Sigatoka (Banana)",
        symptoms: "Small reddish-brown streaks on leaf underside. Streaks turn into dark spots with grey centers.",
        treatment: "Prune infected leaves. Ensure good spacing. Maintain soil fertility.",
        severity: "Moderate"
    }
];

export function CropDoctor() {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'result'>('idle');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [diagnosis, setDiagnosis] = useState<typeof DISEASE_RESULTS[0] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setStatus('uploading');
        }
    };

    const handleDiagnosis = () => {
        setStatus('analyzing');
        // Simulate deep learning analysis
        setTimeout(() => {
            const randomResult = DISEASE_RESULTS[Math.floor(Math.random() * DISEASE_RESULTS.length)];
            setDiagnosis(randomResult);
            setStatus('result');
        }, 3500);
    };

    const resetScan = () => {
        setStatus('idle');
        setPreviewUrl(null);
        setDiagnosis(null);
    };

    return (
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="p-6 border-b bg-green-50/50">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2 text-green-800">
                            <Stethoscope className="h-5 w-5" />
                            Crop Doctor AI
                        </h3>
                        <p className="text-sm text-green-700 mt-1">Instant diagnostics for pests and plant diseases.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                {status === 'idle' && (
                    <>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                            <Upload className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Upload a photo of your sick plant</p>
                            <p className="text-xs text-muted-foreground mt-1">Supports Dalo, Cassava, Ginger, and more.</p>
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
                        >
                            Select Image
                        </button>
                    </>
                )}

                {status === 'uploading' && previewUrl && (
                    <div className="w-full space-y-4 animate-in fade-in duration-300">
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border bg-gray-100">
                            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <Sparkles className="h-10 w-10 text-white animate-pulse" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={resetScan}
                                className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDiagnosis}
                                className="flex-[2] bg-primary text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
                            >
                                <Sparkles className="h-4 w-4" /> Run AI Diagnosis
                            </button>
                        </div>
                    </div>
                )}

                {status === 'analyzing' && (
                    <div className="py-8 space-y-6 animate-in fade-in duration-300 w-full">
                        <div className="relative">
                            <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto opacity-20" />
                            <Sparkles className="h-8 w-8 text-primary absolute inset-0 m-auto animate-bounce" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">AI is analyzing plant tissues...</p>
                            <p className="text-xs text-muted-foreground mt-2 max-w-[200px] mx-auto italic">
                                "Cross-referencing satellite data & local disease strain records"
                            </p>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4 overflow-hidden">
                            <div className="bg-primary h-full animate-progress-fast"></div>
                        </div>
                    </div>
                )}

                {status === 'result' && diagnosis && (
                    <div className="w-full animate-in zoom-in-95 duration-300">
                        <div className={`border rounded-2xl text-left overflow-hidden bg-white shadow-sm ${diagnosis.severity === 'Critical' ? 'border-red-200' : 'border-amber-200'
                            }`}>
                            <div className={`p-4 flex items-center justify-between ${diagnosis.severity === 'Critical' ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-800'
                                }`}>
                                <div className="flex items-center gap-2 font-bold">
                                    <AlertCircle className="h-4 w-4" />
                                    {diagnosis.name}
                                </div>
                                <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${diagnosis.severity === 'Critical' ? 'bg-red-200 text-red-900 font-black' : 'bg-amber-200 text-amber-900'
                                    }`}>
                                    {diagnosis.severity}
                                </span>
                            </div>

                            <div className="p-4 space-y-4">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Symptoms</p>
                                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                                        {diagnosis.symptoms}
                                    </p>
                                </div>

                                <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                                    <p className="text-[10px] font-black text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <CheckCircle className="h-3 w-3" />
                                        Recommended Treatment
                                    </p>
                                    <p className="text-xs text-green-800 leading-relaxed">
                                        {diagnosis.treatment}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={resetScan}
                            className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-bold text-primary hover:bg-primary/5 py-3 rounded-xl transition-all"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Scan Another Plant
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
