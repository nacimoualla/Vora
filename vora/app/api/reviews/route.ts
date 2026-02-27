import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { productId, rating, comment } = body;

        if (!productId || rating === undefined || !comment) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
        }

        // 1. Create the new review
        const newReview = await prisma.review.create({
            data: {
                rating: Number(rating),
                comment: String(comment),
                userId: session.user.id,
                productId: String(productId),
            }
        });

        // 2. Recalculate the product's average rating
        const allReviews = await prisma.review.findMany({
            where: { productId: String(productId) }
        });

        const totalReviews = allReviews.length;
        const sumRatings = allReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalReviews > 0 ? Number((sumRatings / totalReviews).toFixed(1)) : 0;

        // 3. Update the Product model with the new average and count
        await prisma.product.update({
            where: { id: String(productId) },
            data: {
                rating: averageRating,
                review: totalReviews
            }
        });

        return NextResponse.json({ message: "Review submitted successfully", review: newReview }, { status: 201 });
    } catch (error) {
        console.error("Failed to submit review:", error);
        return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
    }
}
