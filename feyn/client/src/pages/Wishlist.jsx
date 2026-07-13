import {React, useEffect} from 'react';
import { useCart } from '../context/CartContext';
function Wishlist({ open, onClose }) {
    const { wishlist } = useCart();
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">

            {/* Dark Background */}

            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Sidebar */}

            <div className="absolute right-0 top-0 h-screen w-[420px] bg-white shadow-xl flex flex-col flex-1 overflow-y-auto">

                <div className="flex justify-between items-center p-5 border-b">

                    <div className="p-5 border-b shrink-0 text-blue-400">
                        <h2>❤️ My Wishlist</h2>
                    </div>

                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>

                {/* Wishlist Items */}
                {wishlist.length === 0 ? (
    <p className="text-center mt-10 text-gray-500">
        Your wishlist is empty
    </p>
) : (
    wishlist.map((item) => (

        <div
            key={item.id}
            className="flex gap-4 p-4 border-b"
        >
            {/* Image */}
            <div className="w-20 h-20 bg-gray-200 rounded"></div>

            {/* Product Details */}
            <div className="flex-1">
                <h3 className="font-semibold text-lg text-blue-400">
                    {item.product.name}
                </h3>

                <p className="text-green-600 font-medium">
                    ⭐ {item.product.rating}
                </p>

                <p className="text-xl font-bold text-blue-400">
                    ₹{item.product.price}
                </p>

                <p className="text-gray-500">
                    Stock: {item.product.stock}
                </p>

                <button className="mt-3 px-4 py-2 bg-cyan-500 text-white rounded-lg">
                    Move to Cart
                </button>
            </div>
        </div>
        
    ))
)}

            </div>

        </div>
    );
}

export default Wishlist