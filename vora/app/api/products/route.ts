import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get('q');
        const category = searchParams.get('category');

        const whereClause: any = {};

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
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json(
            { error: "Failed to load products. Please try again later." },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        // Must be logged in
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Must be an ADMIN
        // @ts-ignore
        if (session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden - Admins only" }, { status: 403 });
        }

        const body = await req.json();
        const { name, subtitle, description, price, category, image } = body;

        // Validation
        if (!name || !description || !price || !category || !image || image.length === 0) {
            return NextResponse.json({ error: "Missing required product fields" }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                subtitle: subtitle || null,
                description,
                price: parseFloat(price),
                category,
                image: image, // Array of strings expected
            }
        });

        return NextResponse.json(product, { status: 201 });

    } catch (error) {
        console.error("Failed to create product:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
