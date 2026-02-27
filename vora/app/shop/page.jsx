import ProductGrid from "@/components/product/ProductGrid";

export default async function ShopPage({ searchParams }) {
    // searchParams in Next 15+ Server Components is a promise, so we await it
    const resolvedSearchParams = await searchParams;
    const isSearch = !!resolvedSearchParams?.q;

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8 border-b pb-4">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        {isSearch
                            ? `Search Results for "${resolvedSearchParams.q}"`
                            : "All Products"
                        }
                    </h1>
                    <p className="mt-2 text-gray-500">
                        {isSearch
                            ? "Explore the matching items below."
                            : "Browse our entire collection of premium tech."
                        }
                    </p>
                </div>

                {/* Re-using the updated ProductGrid which takes resolvedSearchParams */}
                <ProductGrid searchParams={resolvedSearchParams} />
            </div>
        </main>
    );
}
