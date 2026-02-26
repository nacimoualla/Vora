import { prisma } from "@/lib/prisma";
import { productDetail } from "../../../lib/data";
import ColorSelector from "../../../components/product/ColorSelector"
import ImageSelector from "../../../components/product/ImageSelector"
import { Star, Heart, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
export default async function ProductPage({params}){
    const product = await prisma.product.findFirst();
    if (!product) {
    return <div className="p-16 text-center text-xl">Product not found!</div>;
  }
    return(
        <main className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <ImageSelector images={product.image}/>
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
                    <ColorSelector/>
                    <div className="flex gap-4">
                        <Button variant="primary" className="flex-1">
                            <ShoppingBag size={20}/>
                                Add to bag
                        </Button>
                        <Button variant="icon" >
                            <Heart size={20}/>
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
        </main>
    )
}