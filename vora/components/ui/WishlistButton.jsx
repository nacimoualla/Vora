'use client';

import { Heart } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import toast from 'react-hot-toast';

export default function WishlistButton({ productId }) {
    const { data: session } = useSession();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.user) {
            fetch('/api/wishlist')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setIsWishlisted(data.some(item => item.id === productId));
                    }
                });
        }
    }, [session, productId]);

    const toggleWishlist = async () => {
        if (!session?.user) return toast.error("Please log in to save items.");

        setIsLoading(true);
        try {
            if (isWishlisted) {
                await fetch(`/api/wishlist?productId=${productId}`, { method: 'DELETE' });
                setIsWishlisted(false);
                toast.success("Removed from Wishlist");
            } else {
                await fetch('/api/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId })
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
        <Button variant="icon" onClick={toggleWishlist} disabled={isLoading}>
            <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
        </Button>
    );
}
