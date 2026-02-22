import Image from "next/image"
import { ShoppingCart } from 'lucide-react';
export default function ProductCard({name, price, description, badge, image}){
    return(
        <div className="flex flex-col group gap-1 cursor-pointer text-black">
            <div className="relative  aspect-4/5 h-full py-6 rounded-2xl overflow-hidden mb-5 w-full">
                <Image className="object-cover transition-transform duration-700 group-hover:scale-105" fill src={image} alt={name}></Image>
                {badge && (<div className="top-4 left-4 px-3 py-1.5 text-xs font-semibold rounded-md z-10 ${badge === 'New' 
                ? 'bg-[#1A1A1A] text-white' 
                : 'bg-[#E3F2FF] text-[#008DFF]'}`
            }"></div>)}
                <button className="absolute cursor-pointer bottom-4 right-4 z-20 bg-white text-charcoal p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500 hover:text-white">
                    <span className="material-symbols-outlined text-xl">
                        <ShoppingCart></ShoppingCart>
                    </span>
                </button>
            </div>
            <div className="flex flex-row w-full items-center justify-between">
                <p className="font-semibold hover:text-blue-400">{name}</p>
                <p>${price}</p>
            </div>
            <p className='text-sm text-gray-300 leading-relaxed'>{description}</p>
        </div>
    )
}