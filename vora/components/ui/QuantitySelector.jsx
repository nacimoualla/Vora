'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onDecrease, onIncrease, disabledDecrease }) {
    return (
        <div className="flex items-center border border-gray-200 rounded-full h-8">
            <button
                onClick={onDecrease}
                className="px-3 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors disabled:opacity-50"
                disabled={disabledDecrease}
            >
                <Minus size={14} strokeWidth={2} />
            </button>
            <span className="text-sm w-4 text-center font-semibold text-gray-700">{quantity}</span>
            <button
                onClick={onIncrease}
                className="px-3 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors"
            >
                <Plus size={14} strokeWidth={2} />
            </button>
        </div>
    );
}
