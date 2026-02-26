import { PrismaClient } from "./generated/client";
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL as string 
});

const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("starting seed...")
    const sonicAnc = await prisma.product.create({
        data: {
            name: "Sonic ANC",
            subtitle: "Series X - Studio Edition",
            price: 349.00,
            originalPrice: 399.00,
            rating: 4.7,
            review: 128,
             description: "Experience pure sound with industry-leading noise cancellation and 30-hour battery life. Designed for the modern audiophile who demands precision and comfort in every note.",
      
            image: [
                "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1200"
            ],
            inTheBox: [
                "Sonic ANC Wireless Headphones",
                "Premium hard-shell carrying case",
                "USB-C charging cable",
                "3.5mm audio cable for wired listening",
                "Quick start guide"
            ]
        }
    })
    console.log(`Success! Created product with id: ${sonicAnc.id}`);
    console.log('Seeding finished.');
}
main().catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
})
  .finally(async () => {
    await prisma.$disconnect();
});