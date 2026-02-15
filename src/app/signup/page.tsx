"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronRight, ChevronLeft, Upload, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PROVINCES = [
    "Ba", "Bua", "Cakaudrove", "Kadavu", "Lau", "Lomaiviti", "Macuata",
    "Nadroga-Navosa", "Naitasiri", "Namosi", "Ra", "Rewa", "Serua", "Tailevu"
];

const ROLES = [
    { id: "farmer", label: "Farmer", description: "I grow and sell produce." },
    { id: "middleman", label: "Middleman", description: "I buy and resell produce." },
    { id: "buyer", label: "Commercial Buyer", description: "I buy for a hotel, restaurant, or market." }
];

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        role: "",
        province: "",
        mpaisa: "",
        bankName: "",
        accountNumber: "",
        hasTransport: false,
        contactMethod: "", // whatsapp, phone, in_app
        avatarFile: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, avatarFile: e.target.files![0] }));
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const metaData = {
                full_name: formData.fullName,
                role: formData.role,
                province: formData.province,
                phone: formData.phone,
                mpaisa: formData.mpaisa,
                bankName: formData.bankName,
                accountNumber: formData.accountNumber,
                hasTransport: formData.hasTransport,
                contactMethod: formData.contactMethod,
            };

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: metaData
                }
            });

            if (authError) throw authError;

            if (authData.user) {
                // If we have a session (Auto-confirm ON), we can upload the avatar and update the profile.
                if (authData.session && formData.avatarFile) {
                    const fileExt = formData.avatarFile.name.split('.').pop();
                    const fileName = `${authData.user.id}-${Math.random()}.${fileExt}`;

                    const { error: uploadError } = await supabase.storage
                        .from('avatars')
                        .upload(fileName, formData.avatarFile);

                    if (!uploadError) {
                        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);

                        // Update profile with avatar URL
                        await supabase
                            .from('profiles')
                            .update({ avatar_url: publicUrl })
                            .eq('id', authData.user.id);
                    }
                }

                // Redirect based on role
                if (formData.role === 'farmer') router.push('/farmer/dashboard');
                else if (formData.role === 'buyer') router.push('/buyer/dashboard');
                else if (formData.role === 'middleman') router.push('/middleman/dashboard');
                else router.push('/marketplace');
            }
        } catch (error: any) {
            console.error(error);
            alert("Error signing up: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Join Viti-Direct
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Step {step} of 5
                    </p>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    {/* Step 1: Identity */}
                    {step === 1 && (
                        <div className="space-y-4 animate-accordion-down">
                            <h3 className="text-lg font-medium text-gray-900">Your Identity</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input name="fullName" type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.fullName} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input name="email" type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input name="password" type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.password} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                                <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90">
                                                <span>Upload a file</span>
                                                <input name="avatar" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Role Selector */}
                    {step === 2 && (
                        <div className="space-y-4 animate-accordion-down">
                            <h3 className="text-lg font-medium text-gray-900">I am a...</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {ROLES.map((role) => (
                                    <div
                                        key={role.id}
                                        className={cn(
                                            "relative rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors",
                                            formData.role === role.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-300"
                                        )}
                                        onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-gray-900">{role.label}</p>
                                                <p className="text-sm text-gray-500">{role.description}</p>
                                            </div>
                                            {formData.role === role.id && <Check className="h-5 w-5 text-primary" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Location */}
                    {step === 3 && (
                        <div className="space-y-4 animate-accordion-down">
                            <h3 className="text-lg font-medium text-gray-900">Where are you located?</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Province</label>
                                <select name="province" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.province} onChange={handleChange}>
                                    <option value="">Select a Province</option>
                                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Business Details */}
                    {step === 4 && (
                        <div className="space-y-4 animate-accordion-down">
                            <h3 className="text-lg font-medium text-gray-900">Business Details</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">M-PAISA Number</label>
                                <input name="mpaisa" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.mpaisa} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                                <input name="bankName" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.bankName} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                                <input name="accountNumber" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" value={formData.accountNumber} onChange={handleChange} />
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="hasTransport"
                                    name="hasTransport"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    checked={formData.hasTransport}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hasTransport: e.target.checked }))}
                                />
                                <label htmlFor="hasTransport" className="ml-2 block text-sm text-gray-900">
                                    I have my own transport
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Preferred Contact */}
                    {step === 5 && (
                        <div className="space-y-4 animate-accordion-down">
                            <h3 className="text-lg font-medium text-gray-900">How should buyers contact you?</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {['whatsapp', 'phone', 'in_app'].map((method) => (
                                    <div
                                        key={method}
                                        className={cn(
                                            "relative rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors",
                                            formData.contactMethod === method ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-300"
                                        )}
                                        onClick={() => setFormData(prev => ({ ...prev, contactMethod: method }))}
                                    >
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium text-gray-900 capitalize">{method.replace('_', ' ')}</p>
                                            {formData.contactMethod === method && <Check className="h-5 w-5 text-primary" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-6">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Back
                            </button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        {step < 5 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Next <ChevronRight className="ml-2 h-4 w-4" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                            >
                                {loading ? "Creating Account..." : "Complete Signup"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
