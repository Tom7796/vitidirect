"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PROVINCES = [
    "Ba", "Bua", "Cakaudrove", "Kadavu", "Lau", "Lomaiviti", "Macuata",
    "Nadroga-Navosa", "Naitasiri", "Namosi", "Ra", "Rewa", "Serua", "Tailevu"
];

const GRADES = ["Grade 1 (Export)", "Grade 2 (Local)", "Imperfect (Discounted)"];
const UNITS = ["kg", "bundle", "ton", "bag", "box"];

export default function PostItemPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        unit: "kg",
        grade: "Grade 2 (Local)",
        province: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `product-${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
            setImageUrl(publicUrl);
        } catch (error: any) {
            alert("Error uploading image: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrl) return; // Should be disabled anyway

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // Get profile to use province if not set? 
            // Simplified: we just use form province or default

            const { error } = await supabase.from('products').insert({
                seller_id: user.id,
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                unit: formData.unit,
                grade: formData.grade,
                province: formData.province || "N/A", // Should mandate province
                image_url: imageUrl,
                status: 'available'
            });

            if (error) throw error;

            router.push('/farmer/dashboard');
        } catch (error: any) {
            alert("Error creating listing: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container max-w-2xl py-12 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Post New Harvest</h1>
                <p className="text-muted-foreground">Fill in the details to list your produce.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
                {/* Image Upload - Mandatory */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Product Photo <span className="text-red-500">*</span></label>
                    {imageUrl ? (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 group">
                            <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setImageUrl("")}
                                className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                {uploading ? (
                                    <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
                                ) : (
                                    <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                )}
                                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/90"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    )}
                    {!imageUrl && (
                        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                            Photo is required to submit.
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input name="title" type="text" required placeholder="e.g., Red Chillies" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.title} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Province</label>
                        <select name="province" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.province} onChange={handleChange}>
                            <option value="">Select Province</option>
                            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input name="price" type="number" step="0.01" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                        <select name="unit" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.unit} onChange={handleChange}>
                            {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Grade</label>
                        <select name="grade" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.grade} onChange={handleChange}>
                            {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border" value={formData.description} onChange={handleChange}></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!imageUrl || loading || uploading}
                        className="w-full h-12 inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Harvest"}
                    </button>
                    {!imageUrl && (
                        <p className="text-center text-xs text-gray-500 mt-2">
                            Please upload a photo to enable submission.
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
