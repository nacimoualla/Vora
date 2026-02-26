' use client '
import Links from "@/components/ui/Links";
import { Search, ShoppingBag, User } from 'lucide-react';
export default function Navbar(){
    return(
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
            <div className="flex gap-3 flex-row">
                <button className="hover:text-[#008DFF] hover:bg-[#CBDAEC] p-2 hover:rounded-2xl transition-all">
                    <Search size={22} strokeWidth={1.5} />
                </button>
                <button className="relative hover:text-[#008DFF] transition-all hover:bg-[#CBDAEC] p-2 hover:rounded-2xl">
                    <ShoppingBag size={22} strokeWidth={1.5} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#008DFF] rounded-full border-2 border-white" />
                </button>
                <button className="hover:text-[#008DFF] hover:bg-[#CBDAEC] p-2 hover:rounded-2xl transition-all">
                    <User size={22} strokeWidth={1.5} />
                </button> 
            </div>
        </div>
    )
};