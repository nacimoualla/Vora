'use client';

import Image from "next/image"
import { ShoppingCart, Heart } from 'lucide-react';
import useCartStore from '@/app/store/cartStore';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProductCard({ id, name, price, description, badge, image }) {
    const { addItem } = useCartStore();
    const { data: session } = useSession();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Initial check (optional, could be passed as prop for better performance)
    useEffect(() => {
        if (session?.user) {
            fetch('/api/wishlist')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setIsWishlisted(data.some(item => item.id === id));
                    }
                })
        }
    }, [session, id]);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({ id: id || name, name, price, image });
        toast.success("Added to Bag!");
    };

    const toggleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!session?.user) return toast.error("Please log in to save items.");

        setIsLoading(true);
        try {
            if (isWishlisted) {
                await fetch(`/api/wishlist?productId=${id}`, { method: 'DELETE' });
                setIsWishlisted(false);
                toast.success("Removed from Wishlist");
            } else {
                await fetch('/api/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: id })
                });
                setIsWishlisted(true);
                toast.success("Added to Wishlist!");
            }
        } catch (error) {
            console.error("Failed to toggle wishlist", error);
            toast.error("Failed to update wishlist");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Link href={`/product/${id}`} className="flex flex-col group gap-1 cursor-pointer text-black">
            <div className="relative aspect-[4/5] h-full py-6 rounded-2xl overflow-hidden mb-5 w-full">
                <Image className="object-cover transition-transform duration-700 group-hover:scale-105" fill src={image} alt={name}></Image>
                {badge && (
                    <div className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold rounded-md z-10 ${badge === 'New' ? 'bg-[#1A1A1A] text-white' : 'bg-[#E3F2FF] text-[#008DFF]'}`}>
                        {badge}
                    </div>
                )}

                <button
                    onClick={toggleWishlist}
                    disabled={isLoading}
                    className="absolute cursor-pointer top-4 right-4 z-20 bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors"
                >
                    <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                </button>
                <button
                    onClick={handleAddToCart}
                    className="absolute cursor-pointer bottom-4 right-4 z-20 bg-white text-charcoal p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                >
                    <span className="material-symbols-outlined text-xl">
                        <ShoppingCart></ShoppingCart>
                    </span>
                </button>
            </div>
            <div className="flex flex-row w-full items-center justify-between">
                <p className="font-semibold hover:text-blue-400">{name}</p>
                <p>${price}</p>
            </div>
            <p className='text-sm text-gray-500 leading-relaxed line-clamp-2'>{description}</p>
        </Link>
    )
}