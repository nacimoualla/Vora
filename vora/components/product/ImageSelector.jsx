"use client";
import { productDetail } from "../../lib/data"
import { useState } from "react"
import Image from "next/image"
export default function imageSelector(){
    const [mainImage, setMainImage] = useState(productDetail.images[0])
    return(
        <div className="flex flex-col gap-4 w-full">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-[#F8F9FA]s">
                <Image
                    src={mainImage}
                    alt={productDetail.name}
                    fill
                    className="object-cover transition-all duration-500"
                ></Image>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {productDetail.images.map((image, index) =>(
                    <button
                    Key={index}
                    onclick={() => setMainImage(image)}
                    className={`relative aspect-4/3 w-full overflow-hidden rounded-xl border-2 transition-all
              ${mainImage === imageURL 
                ? "border-[#008DFF] opacity-100" 
                : "border-transparent opacity-60 hover:opacity-100" // Dim the unselected ones slightly!
              }`}
                    >
                        <Image
                            src={image}
                            alt={`thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        >

                        </Image>
                    </button>
                ))}
            </div>
        </div>
    )
}