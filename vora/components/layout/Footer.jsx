' use client '
import Link from "next/link"
import { Globe,Camera } from 'lucide-react';
export default function Footer(){
    return(
        <footer className="flex flex-col max-w-full px-16 py-3 gap-8 bg-white text-black">
            <div className="flex justify-between">
                <div className="flex flex-col p-2 text-center gap-3.5">
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 bg-[#008DFF] rounded-sm flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-1" />
                        <div className="absolute inset-0 bg-black/10 transform skew-x-12 -translate-x-1" />
                        </div>
                        <h3>Vora</h3>
                    </div>
                    <p className="text-gray-400 font-medium">Precission engineering meets minimalist design. We create audio equipment for the modern creator.</p>
                    <div className="flex gap-5">
                        <Globe size={24} strokeWidth={2} />
                        <Camera size={24} strokeWidth={2} />
                    </div>
                </div>
                <div className="flex flex-col py-1 gap-2">
                    <h3 className="font-bold">SHOP</h3>
                    <div className="text-gray-400 flex flex-col gap-2 font-medium">
                    <Link className="hover:text-blue-400" href="/headphones">Headphones</Link>
                    <Link className="hover:text-blue-400" href="/earbuds">Earbuds</Link>
                    <Link className="hover:text-blue-400" href="/speakers">Speakers</Link>
                    <Link className="hover:text-blue-400" href="/accessories">Accessories</Link>
                    </div>
                </div>
                <div className="flex flex-col py-1 gap-2">
                    <h3 className="font-bold">COMPANY</h3>
                     <div className="text-gray-400 flex flex-col gap-2 font-medium">
                    <Link className="hover:text-blue-400" href="/about">About</Link>
                    <Link className="hover:text-blue-400" href="/careers">Careers</Link>
                    <Link className="hover:text-blue-400" href="/press">Press</Link>
                    </div>
                </div>
                <div className="flex flex-col py-1 gap-2">
                    <h3 className="font-bold">SUPPORT</h3>
                     <div className="text-gray-400 flex flex-col gap-2 font-medium">
                    <Link className="hover:text-blue-400" href="/help-center">Help Center</Link>
                    <Link className="hover:text-blue-400" href="/returns">Returns</Link>
                    <Link className="hover:text-blue-400" href="/contact">Contact</Link>
                    </div>
                </div>
            </div>
            <div className="text-gray-400 flex flex-row justify-between gap-2 font-medium text-xs ">
                <p>© 2026 Vora. All rights reserved</p>
                <div className="flex gap-3">
                    <Link className="hover:text-blue-400" href="/pp">Privacy Policy</Link>
                    <Link className="hover:text-blue-400" href="/tos">Terms of Service</Link>
                </div>
            </div>
        </footer>
    )
}