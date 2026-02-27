'use client';

import { X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import useCartStore from '@/app/store/cartStore';
import QuantitySelector from '@/components/ui/QuantitySelector';

export default function CartSidebar() {
    const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const total = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0 pointer-events-none'}`}
                onClick={closeCart}
            />

            <div className={`fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[22px] font-bold tracking-tight text-gray-900">Your Cart</h2>
                        {itemCount > 0 && (
                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                {itemCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="text-gray-400 hover:text-gray-800 transition-colors p-1"
                    >
                        <X size={20} strokeWidth={2} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                            <p className="font-medium text-lg">Your cart is empty</p>
                            <button onClick={closeCart} className="text-[#008DFF] font-semibold hover:underline">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-5">
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                                    {item.image && (
                                        <Image
                                            src={Array.isArray(item.image) ? item.image[0] : item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                    <div className="flex justify-between items-start">
                                        <div className="pr-2">
                                            <h3 className="font-semibold text-gray-900 leading-tight">{item.name}</h3>
                                            {item.subtitle && <p className="text-sm text-gray-500 mt-1.5">{item.subtitle}</p>}
                                        </div>
                                        <p className="font-bold text-gray-900 tracking-tight">${item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <QuantitySelector
                                            quantity={item.quantity}
                                            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                                            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabledDecrease={item.quantity <= 1}
                                        />
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-[13px] font-semibold text-[#8B92A5] hover:text-gray-800 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-gray-100 p-6 bg-white flex flex-col gap-5">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-500 font-semibold">Subtotal</span>
                            <span className="font-bold text-xl tracking-tight text-gray-900">${total.toFixed(2)}</span>
                        </div>

                        <p className="text-[13px] text-[#8B92A5] text-center font-medium">
                            Taxes and shipping calculated at checkout.
                        </p>

                        <button className="w-full bg-[#008DFF] text-white py-[18px] rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#007AE0] transition-all active:scale-[0.98]">
                            Checkout <ArrowRight size={18} strokeWidth={2.5} />
                        </button>

                        <button
                            onClick={closeCart}
                            className="text-[#646A7B] text-[15px] font-semibold hover:text-gray-900 transition-colors mt-1"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
