import { prisma } from '../lib/prisma'

async function main() {
    await prisma.product.deleteMany()

    const products = [
        {
            name: "Noise Cancelling Pro",
            price: 299.00,
            description: "Industry-leading noise cancellation. Hear every word, note, and tune with incredible clarity, no matter your environment.",
            subtitle: "Matte Black",
            category: "Audio",
            rating: 4.8,
            originalPrice: 349.00,
            review: 128,
            image: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"],
            colors: ["Matte Black", "Silver"],
            spec: ["Bluetooth 5.0", "30h Battery Life", "Active Noise Cancellation", "USB-C Fast Charging"],
            inTheBox: ["Headphones", "USB-C Cable", "Carrying Case", "Quick Start Guide"]
        },
        {
            name: "Silicone Loop",
            price: 49.00,
            description: "Designed for fitness and everyday wear. Made from a custom high-performance fluoroelastomer, the Sport Band is durable and strong, yet surprisingly soft.",
            subtitle: "Storm Blue",
            category: "Wearables",
            rating: 4.6,
            originalPrice: 59.00,
            review: 85,
            image: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800"],
            colors: ["Storm Blue", "Starlight", "Midnight"],
            spec: ["Water Resistant", "Fluoroelastomer Material", "Pin-and-tuck closure"],
            inTheBox: ["Watch Band"]
        },
        {
            name: "Leather Carry Case",
            price: 99.00,
            description: "Crafted from specially tanned and finished European leather for a luxurious look and feel. The case snaps quickly into place and fits snugly over your device without adding bulk.",
            subtitle: "Saddle Brown",
            category: "Accessories",
            rating: 4.9,
            originalPrice: 129.00,
            review: 210,
            image: ["https://images.unsplash.com/photo-1606744887309-8472f854df11?auto=format&fit=crop&q=80&w=800"],
            colors: ["Saddle Brown", "Midnight Blue"],
            spec: ["Genuine European Leather", "Microfiber lining", "Wireless charging compatible"],
            inTheBox: ["Leather Case", "Care Instructions"]
        }
    ]

    for (const product of products) {
        await prisma.product.create({
            data: product
        })
    }

    console.log('Database has been seeded. 🌱')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })