'use client';
import Links from "@/components/ui/Links";
import { Search, ShoppingBag, User, LogOut } from 'lucide-react';
import useCartStore from '@/app/store/cartStore';
import CartSidebar from '@/components/ui/CartSidebar';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const { items, openCart } = useCartStore();
    const { data: session } = useSession();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <div className="flex flex-row justify-between max-w-full items-center bg-white text-black p-2 sticky z-50 top-0">
                <div className="flex flex-row gap-2 items-center">
                    <div className="relative w-8 h-8 bg-[#008DFF] rounded-sm flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-1" />
                        <div className="absolute inset-0 bg-black/10 transform skew-x-12 -translate-x-1" />
                    </div>
                    <h3>Vora</h3>
                </div>
                <div className="flex gap-5 flex-row">
                    <Links href="/">Shop</Links>
                    <Links href="/about">About</Links>
                    <Links href="/support">Support</Links>
                </div>
                <div className="flex gap-3 flex-row items-center">
                    <form onSubmit={handleSearch} className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-100 text-sm rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#008DFF] w-48 transition-all"
                        />
                        <button type="submit" className="absolute right-2 text-gray-500 hover:text-[#008DFF]">
                            <Search size={18} strokeWidth={2} />
                        </button>
                    </form>
                    <button
                        onClick={openCart}
                        className="relative hover:text-[#008DFF] transition-all hover:bg-[#CBDAEC] p-2 hover:rounded-2xl"
                    >
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-[#008DFF] text-white rounded-full border-2 border-white">
                                {itemCount}
                            </span>
                        )}
                    </button>
                    {session ? (
                        <div className="flex gap-2">
                            <Link
                                href="/profile"
                                className="hover:text-[#008DFF] hover:bg-[#CBDAEC] p-2 hover:rounded-2xl transition-all flex items-center"
                                title="Profile"
                            >
                                <User size={22} strokeWidth={1.5} />
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="hover:text-red-500 hover:bg-red-50 p-2 hover:rounded-2xl transition-all"
                                title="Sign out"
                            >
                                <LogOut size={22} strokeWidth={1.5} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="hover:text-[#008DFF] hover:bg-[#CBDAEC] p-2 hover:rounded-2xl transition-all flex items-center"
                        >
                            <User size={22} strokeWidth={1.5} />
                        </Link>
                    )}
                </div>
            </div>
            <CartSidebar />
        </>
    );
}