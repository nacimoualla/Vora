import ProductCard from "./ProductCard";
import { newArrivals } from "../../lib/data";

export default function ProductGrid(){
    return(
        <section className="flex flex-col bg-gray-100 h-full py-20 px-4 border-2">
            <div className="grid grid-cols-4 gap-6 p-6 w-full justify-between">
                {newArrivals.map((product) =>(
                    <ProductCard
                    key={product.id}
                    image={product.image}
                    badge={product.badge}
                    name={product.name}
                    price={product.price}
                    description={product.description}/>
                ))}
            </div>
        </section>
    )
}