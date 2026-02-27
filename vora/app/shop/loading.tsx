export default function Loading() {
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8 border-b pb-4">
                    <div className="h-10 bg-gray-200 rounded-md w-64 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-96 animate-pulse"></div>
                </div>

                <section className="flex flex-col bg-gray-100 h-full py-20 px-4 border-2">
                    <div className="grid grid-cols-4 gap-6 p-6 w-full justify-between">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="aspect-4/5 h-full py-6 rounded-2xl bg-gray-200 animate-pulse w-full mb-2"></div>
                                <div className="flex flex-row w-full items-center justify-between">
                                    <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                    <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mt-1"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}
