export default function Loading() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Image Skeleton */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-20 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                    <div className="w-full h-[600px] bg-gray-200 rounded-2xl animate-pulse"></div>
                </div>

                {/* Details Skeleton */}
                <div className="flex flex-col gap-8">
                    <div className="flex justify-between items-start">
                        <div className="w-full">
                            <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-3 animate-pulse"></div>
                            <div className="h-5 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="h-8 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                    </div>

                    <div className="space-y-2 text-gray-500">
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse"></div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <div className="h-12 bg-gray-200 rounded-xl w-3/4 animate-pulse"></div>
                        <div className="h-12 bg-gray-200 rounded-xl w-12 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}
