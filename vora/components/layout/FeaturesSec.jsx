import { AudioLines, BatteryCharging, Radio } from 'lucide-react';
export default function FeaturesSec(){
    return(
        <div className='max-w-7xl mx-auto w-full px-10 py-5'>
        <div className='bg-white text-black grid grid-cols-3 gap-6 p-6 py-8'>
            <div className='bg-gray-50 rounded-2xl px-5 flex flex-col gap-4 py-3 group hover:bg-white hover:shadow-md hover:scale-105 duration-200 transition-all'>
                <div className="w-12 h-12 rounded-xl bg-[#008DFF]/10 flex items-center justify-center text-[#008DFF] group-hover:scale-110 transition-all duration-200">
                    <AudioLines size={24} strokeWidth={2} />
                </div>
                <h2 className="font-bold text-lg text-gray-900">Crystal Clear</h2>
                <p className='text-sm text-gray-500 leading-relaxed'>Custom drivers engineered for superior sound fidelity across all ranges.</p>
            </div>
            <div className='bg-gray-50 rounded-2xl px-5 flex flex-col gap-4 py-3 group hover:shadow-md hover:scale-105 duration-200 transition-all'>
                <div className="w-12 h-12 rounded-xl bg-[#008DFF]/10 flex items-center justify-center text-[#008DFF] group-hover:scale-110 transition-all duration-200">
                    <BatteryCharging size={24} strokeWidth={2} />
                </div>
                <h2 className="font-bold text-lg text-gray-900">All Day Battery</h2>
                <p className='text-sm text-gray-500 leading-relaxed'>Enjoy up to 30 hours of continuous playback on a single quick charge.</p>
            </div>
            <div className='bg-gray-50 rounded-2xl px-5 flex flex-col gap-4 py-3 group hover:shadow-md hover:scale-105 duration-200 transition-all'>
                <div className="w-12 h-12 rounded-xl bg-[#008DFF]/10 flex items-center justify-center text-[#008DFF] group-hover:scale-110 transition-all duration-200 ">
                  <Radio size={24} strokeWidth={2} />
                </div>
                <h2 className="font-bold text-lg text-gray-900">Seamless Connect</h2>
                <p className='text-sm text-gray-500 leading-relaxed'>Instant pairing with all your devices using the latest Bluetooth 5.3 technology.</p>
            </div>
        </div>
        </div>
    )
}