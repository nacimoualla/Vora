'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Split image URLs by comma and trim whitespace
            const imageArray = formData.image
                .split(',')
                .map(url => url.trim())
                .filter(url => url.length > 0);

            if (imageArray.length === 0) {
                toast.error("At least one image URL is required");
                setLoading(false);
                return;
            }

            const payload = {
                ...formData,
                image: imageArray
            };

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create product');
            }

            toast.success("Product created successfully!");
            router.push('/admin');
            router.refresh();

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-3xl mx-auto px-6 py-12 bg-white min-h-screen">
            <div className="mb-8">
                <Link href="/admin" className="text-gray-500 hover:text-gray-900 flex items-center gap-2 mb-6 transition-colors w-fit">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add New Product</h1>
                <p className="text-gray-500 mt-2">Create a new item in your store's catalog.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl border border-gray-100">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="e.g. AirPods Pro"
                        />
                    </div>

                    {/* Price */}
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            min="0"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="249.00"
                        />
                    </div>

                    {/* Category */}
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Phones">Phones</option>
                            <option value="Audio">Audio</option>
                            <option value="Wearables">Wearables</option>
                            <option value="Computers">Computers</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    {/* Subtitle */}
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (Optional)</label>
                        <input
                            type="text"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Magic like you've never heard"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        required
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
                        placeholder="Detailed product capabilities and specs..."
                    ></textarea>
                </div>

                {/* Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
                    <textarea
                        name="image"
                        required
                        rows="3"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y font-mono text-sm"
                        placeholder="https://example.com/img1.png, https://example.com/img2.png"
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-2">Enter one or more external image URLs separated by commas.</p>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Creating Product...' : 'Create Product'}
                    </Button>
                </div>

            </form>
        </main>
    );
}
