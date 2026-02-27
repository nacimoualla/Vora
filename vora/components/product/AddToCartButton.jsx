'use client';

import { ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import useCartStore from '@/app/store/cartStore';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product }) {
    const { addItem, openCart } = useCartStore();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
        toast.success("Added to Bag!");
        openCart();
    };

    return (
        <Button variant="primary" className="flex-1" onClick={handleAddToCart}>
            <ShoppingBag size={20} />
            Add to bag
        </Button>
    );
}
