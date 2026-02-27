import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";

export default async function ProfilePage() {
    const session = await auth();

    // Protect the route
    if (!session?.user?.id) {
        redirect("/login");
    }

    // Fetch user details
    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    });

    // Fetch wishlist details directly via server context to render instantly
    const wishlistItems = await prisma.wishlist.findMany({
        where: { userId: session.user.id },
        include: { product: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Profile Header */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-24 h-24 bg-[#008DFF] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md">
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-black text-gray-900">{user?.name || "Verified User"}</h1>
                        <p className="text-gray-500 mt-1">{user?.email}</p>
                        <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                            Active Account
                        </div>
                    </div>
                </div>

                {/* Wishlist Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Wishlist</h2>

                    {wishlistItems.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                            <p className="mt-2 text-gray-500">Explore our products and tap the heart icon to save your favorites here!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {wishlistItems.map((item) => (
                                <ProductCard
                                    key={item.product.id}
                                    id={item.product.id}
                                    image={item.product.image[0]}
                                    name={item.product.name}
                                    price={item.product.price}
                                    description={item.product.description}
                                />
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}
