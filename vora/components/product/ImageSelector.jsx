"use client";
import { useState } from "react"
import Image from "next/image"


export default function ImageSelector({ images }) {
    const [mainImage, setMainImage] = useState(images[0])

    return(
        <div className="flex flex-col gap-4 w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#F8F9FA]">
                <Image
                    src={mainImage}
                    alt="Product Main Image" 
                    fill
                    className="object-cover transition-all duration-500"
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) =>(
                    <button
                        key={index} 
                        onClick={() => setMainImage(image)} 
                        
                        className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition-all
                        ${mainImage === image 
                            ? "border-[#008DFF] opacity-100" 
                            : "border-transparent opacity-60 hover:opacity-100" 
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}