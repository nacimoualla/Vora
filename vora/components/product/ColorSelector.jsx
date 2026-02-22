"use client";
import { productDetail } from "../../lib/data"
import { useState } from "react"
import Image from "next/image"
export default function ColorSelector(){
    const [selectedColor, setSelectedColor] = useState(productDetail.colors[0])
    return(
        <div>
      <h3 className="text-sm font-semibold mb-3 text-gray-900">Color</h3>
      
      <div className="flex gap-3">
                {productDetail.colors.map((color) =>(
                    <button
                     key={color.name}
                     onClick={() => setSelectedColor(color)}
                     style={{ backgroundColor: color.value }}
                     className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${selectedColor.name === color.name ? "border-[#008DFF]" : "border-transparent"}`}
                    >
                        <div 
              className="w-8 h-8 rounded-full border border-black/10"
              style={{ backgroundColor: color.hex }}
            />
                    </button>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
        Selected: {selectedColor.name}
      </p>
        </div>
    )
}
