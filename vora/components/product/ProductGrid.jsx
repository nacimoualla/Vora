import ProductCard from "./ProductCard";
import { prisma } from "@/lib/prisma";

export default async function ProductGrid({ searchParams = {} }) {
    const q = searchParams?.q || '';
    const category = searchParams?.category || '';

    const whereClause = {};
    if (q) {
        whereClause.name = {
            contains: q,
            mode: 'insensitive',
        };
    }
    if (category) {
        whereClause.category = category;
    }

    const products = await prisma.product.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
    });

    if (products.length === 0) {
        return (
            <section className="flex flex-col bg-gray-50 items-center justify-center py-32">
                <h2 className="text-2xl font-bold text-gray-700">No products found</h2>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </section>
        )
    }

    return (
        <section className="flex flex-col bg-gray-100 h-full py-20 px-4 border-2">
            <div className="grid grid-cols-4 gap-6 p-6 w-full justify-between">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image[0]}
                        name={product.name}
                        price={product.price}
                        description={product.description} />
                ))}
            </div>
        </section>
    )
}