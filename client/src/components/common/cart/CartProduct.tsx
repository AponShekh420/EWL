"use client"; // Required for Next.js 13+ App Router
import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { getImageUrl } from '@/utils/getImageUrl';

const CartProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-2xl max-w-xl relative border border-gray-100 shadow-sm">
      {/* Product Image - Scaled down */}
      <div className="w-24 h-24 bg-[#E9ECEF] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 relative">
        <Image 
          src={getImageUrl("607888854_122158982096747653_6169231412878268448_n_1769354911641.jpg", "products")}
          alt="Keyboard"
          className="object-cover w-full h-full absolute"
          width={100}
          height={100}
        />
      </div>

      {/* Product Details - Mini Text */}
      <div className="flex-grow pr-10">
        <h3 className="text-xs font-bold text-gray-900 leading-tight">
          QwertyKey100 Matrix Hotswap RGB Screen Pixel Bluetooth Gasket Mount Mechanical Gaming Keyboard
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Bedroom
        </p>

        <div className="mt-2">
          <p className="text-gray-400 line-through text-xs">
            Tk 18,878.15
          </p>
          <p className="text-[#FF4D00] text-xs font-bold">
            Tk 15,969.34
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end justify-between h-full absolute right-3 py-1">
        <button className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
          <X size={12} className="text-gray-600" />
        </button>

        {/* State-controlled Quantity Counter */}
        <div className="flex items-center bg-white border border-gray-100 rounded-full p-0.5 shadow-sm mt-auto">
          <button 
            onClick={decrement}
            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Minus size={12} />
          </button>
          
          <span className="px-3 text-sm font-semibold min-w-[24px] text-center">
            {quantity}
          </span>
          
          <button 
            onClick={increment}
            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;