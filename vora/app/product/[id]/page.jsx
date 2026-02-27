import { prisma } from "@/lib/prisma";
import ColorSelector from "../../../components/product/ColorSelector"
import ImageSelector from "../../../components/product/ImageSelector"
import { Star, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/ui/WishlistButton";
import ReviewForm from "@/components/product/ReviewForm";
import ReviewList from "@/components/product/ReviewList";

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id: id }
    });

    if (!product) {
        return <div className="p-16 text-center text-xl">Product not found!</div>;
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <ImageSelector images={product.image} />
                </div>
                <div className="flex flex-col gap-8">
                    <header className="flex justify-between items-start text-black">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-charcoal">{product.name}</h1>
                            <p>{product.subtitle}</p>
                        </div>
                        <span class="inline-flex items-center gap-1 text-amber-500 text-sm font-medium">
                            <span class="material-symbols-outlined text-[18px] fill-current">
                                <Star size={20} />
                            </span>
                            {product.rating}
                        </span>
                    </header>
                    <div className="flex gap-4 items-center text-black">
                        <h1>${product.price}</h1>-
                        <h2>${product.originalPrice}</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed">{product.description}</p>
                    <ColorSelector />
                    <div className="flex gap-4">
                        <AddToCartButton product={product} />
                        <Button variant="icon" >
                            <Heart size={20} />
                        </Button>
                        <div className="grid grid-cols-2 border border-gray-200 rounded-xl divide-x divide-gray-200">
                            <div className="p-6">
                                test
                            </div>
                            <div className="p-6">
                                test
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-24 border-t border-gray-100 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-1">
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Customer Reviews</h2>
                    <div className="flex items-center gap-2 mb-8">
                        <Star size={24} className="fill-amber-400 text-amber-400" />
                        <span className="text-2xl font-bold text-gray-900">{product.rating}</span>
                        <span className="text-gray-500">out of 5</span>
                    </div>
                    <ReviewForm productId={product.id} />
                </div>

                <div className="lg:col-span-2">
                    <ReviewList productId={product.id} />
                </div>
            </div>
        </main>
    )
}