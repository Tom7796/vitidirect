"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Phone, Clock, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "Farmer", // Default
        subject: "I am a Farmer needing help with my first listing", // Default
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('contact_messages')
            .insert([formData]);

        if (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        } else {
            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                role: "Farmer",
                subject: "I am a Farmer needing help with my first listing",
                message: ""
            });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container px-4 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-heading">We’re Here to Help You Grow</h1>
                    <p className="mt-4 text-lg text-gray-600">Have questions? Reach out to our team in Suva.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Contact Info Sidebar */}
                    <div className="bg-primary p-12 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-8 font-heading">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 mt-1 opacity-80" />
                                    <div>
                                        <p className="font-medium text-lg">+679 7292532</p>
                                        <p className="text-primary-foreground/70 text-sm">Mon-Fri, 8am - 5pm</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 mt-1 opacity-80" />
                                    <div>
                                        <p className="font-medium text-lg">tomasikororua@gmail.com</p>
                                        <p className="text-primary-foreground/70 text-sm">Send us an email anytime</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="h-6 w-6 mt-1 opacity-80" />
                                    <div>
                                        <p className="font-medium text-lg">Operating Hours</p>
                                        <p className="text-primary-foreground/80 mt-1">Monday – Friday: 8:00 AM – 5:00 PM</p>
                                        <p className="text-primary-foreground/80">Saturday (Harvest Support): 8:00 AM – 12:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-primary-foreground/20">
                            <p className="text-primary-foreground/60 text-sm">
                                Viti-Direct HQ <br />
                                Suva, Fiji Islands
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-12">
                        {success ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                    <CheckCircle2 className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600 mb-8 max-w-sm">Thank you for reaching out. Our team will get back to you shortly.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="text-primary font-medium hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        placeholder="Jone Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        placeholder="jone@example.com"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white"
                                        >
                                            <option value="Farmer">Farmer</option>
                                            <option value="Hotel Manager">Hotel Manager</option>
                                            <option value="Middleman">Middleman</option>
                                            <option value="Driver">Driver</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-white"
                                        >
                                            <option value="I am a Farmer needing help with my first listing">Help with Listing</option>
                                            <option value="I am a Hotel Manager looking for a demo">Request a Demo</option>
                                            <option value="I am a Driver interested in logistics partnerships">Logistics Partnership</option>
                                            <option value="Other Inquiry">Other Inquiry</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            Spread the Word <Send className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
