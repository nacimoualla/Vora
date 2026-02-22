' use client '
import Image from "next/image"
import myphoto from "@/public/image.png"
export default function Hero(){
    return(
    <div className="flex flex-wrap flex-row-reverse max-h-3/5 justify-around gap-9 items-center bg-gray-100 text-black p-7 ">
        <Image className="rounded-xl hover:scale-105 transition-all duration-600" src={myphoto}></Image>
        <div className="flex flex-col gap-5 max-w-2xl">
            <h3 className="text-sm text-blue-500 font-semibold">NEXT GENERATION AUDIO</h3>
            <div className="text-9xl font-black">
                <h1>Sound,</h1>
                <h1>Refined</h1>
            </div>
            <div className="flex flex-wrap text-gray-400 font-medium text-lg">
                <p>Experience audio in its purest form with the MK-1
                Wireless Designed for the modern audiophile who 
                demands clarity and style</p>
            </div>
            <div className="flex gap-9">
                <button className="bg-blue-600 text-white py-3 px-9 rounded-3xl cursor-pointer hover:shadow-lg hover:bg-blue-700 transition-all">Pre-order Now</button>
                <button className="py-3 px-9 rounded-3xl border sm:border-gray-300 hover:bg-gray-200 cursor-pointer transition-all">Watch Film</button>
            </div>
        </div>
    </div>
    )
}