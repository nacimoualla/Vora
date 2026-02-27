import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const wishlistItems = await prisma.wishlist.findMany({
            where: { userId: session.user.id },
            include: { product: true },
            orderBy: { createdAt: 'desc' }
        });

        // Map over to just return the array of products
        const products = wishlistItems.map(item => item.product);

        return NextResponse.json(products);
    } catch (error) {
        console.error("Fetch wishlist error:", error);
        return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({ error: "Product ID is missing" }, { status: 400 });
        }

        // Add to wishlist safely handling uniques
        const wishlistItem = await prisma.wishlist.upsert({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId: productId
                }
            },
            create: {
                userId: session.user.id,
                productId: productId
            },
            update: {} // Do nothing if it already exists
        });

        return NextResponse.json({ message: "Added to wishlist", item: wishlistItem }, { status: 201 });
    } catch (error) {
        console.error("Add wishlist error:", error);
        return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json({ error: "Product ID is missing" }, { status: 400 });
        }

        await prisma.wishlist.delete({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId: productId
                }
            }
        });

        return NextResponse.json({ message: "Removed from wishlist" }, { status: 200 });
    } catch (error) {
        // Known issue: Prisma throws if record not found on delete, but that's fine for our idempotency
        console.error("Delete wishlist error:", error);
        return NextResponse.json({ message: "Removed from wishlist or not found" }, { status: 200 });
    }
}
