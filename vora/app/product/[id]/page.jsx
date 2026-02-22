import { productDetail } from "../../../lib/data"
import ColorSelector from "../../../components/product/ColorSelector"
import imageSelector from "../../../components/product/ImageSelector"
import { Star, Heart, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
export default function ProductPage({params}){
    const product = productDetail
    return(
        <main className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <imageSelector/>
                </div>
                <div className="flex flex-col gap-8">
                    <header className="flex justify-between items-start">
                        <h1>{product.name}</h1>
                        <p>{product.subtitle}</p>
                    </header>
                    <div className="flex gap-4 items-center">
                        <h1>{product.price}</h1>
                        <h2>{product.originalPrice}</h2>
                    </div>
                    <p className="text-gray-500 leading-relaxed">{product.description}</p>
                    <ColorSelector/>

                </div>
            </div>
        </main>
    )
}