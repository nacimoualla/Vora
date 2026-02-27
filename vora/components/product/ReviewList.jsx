import { Star } from 'lucide-react';
import { prisma } from "@/lib/prisma";

export default async function ReviewList({ productId }) {
    const reviews = await prisma.review.findMany({
        where: { productId },
        include: { user: { select: { name: true, image: true, email: true } } },
        orderBy: { createdAt: 'desc' },
    });

    if (reviews.length === 0) {
        return <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>;
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            {review.user?.name?.charAt(0) || review.user?.email?.charAt(0) || "U"}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{review.user?.name || "Verified User"}</p>
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < review.rating ? "fill-amber-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                        </div>
                        <span className="ml-auto text-sm text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-14">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
