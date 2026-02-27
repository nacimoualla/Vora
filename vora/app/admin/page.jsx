import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, Users, Star, ArrowRight, Plus } from "lucide-react";

export default async function AdminDashboard() {
    const session = await auth();

    // @ts-ignore
    if (!session || session.user.role !== "ADMIN") {
        redirect("/");
    }

    const [totalProducts, totalUsers, totalReviews] = await Promise.all([
        prisma.product.count(),
        prisma.user.count(),
        prisma.review.count()
    ]);

    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    return (
        <main className="max-w-7xl mx-auto px-6 py-16 bg-white min-h-screen">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
                <p className="text-gray-500 mt-2">Manage your platform and view high-level statistics.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
                    <div className="p-4 bg-blue-500 text-white rounded-xl">
                        <Package size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Products</p>
                        <p className="text-3xl font-black text-gray-900">{totalProducts}</p>
                    </div>
                </div>

                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                    <div className="p-4 bg-emerald-500 text-white rounded-xl">
                        <Users size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">Users</p>
                        <p className="text-3xl font-black text-gray-900">{totalUsers}</p>
                    </div>
                </div>

                <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-4">
                    <div className="p-4 bg-amber-500 text-white rounded-xl">
                        <Star size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-amber-600 uppercase tracking-widest">Reviews</p>
                        <p className="text-3xl font-black text-gray-900">{totalReviews}</p>
                    </div>
                </div>
            </div>

            {/* Recent Products */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Recent Products</h2>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/add-product" className="bg-[#008DFF] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                            <Plus size={18} /> New Product
                        </Link>
                        <Link href="/shop" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-semibold text-gray-700">Product Name</th>
                                <th className="p-4 font-semibold text-gray-700">Price</th>
                                <th className="p-4 font-semibold text-gray-700">Category</th>
                                <th className="p-4 font-semibold text-gray-700">Added On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{product.name}</td>
                                    <td className="p-4 text-gray-600">${product.price.toFixed(2)}</td>
                                    <td className="p-4 text-gray-600">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                            {product.category || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}
