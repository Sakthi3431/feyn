import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
import toast from "react-hot-toast";
import { useCart } from '../../context/CartContext';
function Products({products}) {
    const { wishlist, toggleWishlist, isWishlisted } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
  {products.map(product => (
<div
  key={product.id}
  className="group bg-white rounded-2xl overflow-hidden border p-4 border-gray-200
             hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>
      
      {/* image */}
      <div className="relative bg-gray-50">

    <img
        src={product.primary_image || product.image}
        alt={product.name}
        className="w-full h-60 object-contain p-5 transition-transform duration-300 group-hover:scale-105"
    />

    <button
        onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        toggleWishlist(product.id);
    }}
        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50"
    >{isWishlisted(product.id)
        ? <FaHeart className="text-red-500" />
        : <FaRegHeart className="text-gray-500" />
    }
    </button>

    {product.compare_price && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-semibold">
            {Math.round(
                ((product.compare_price-product.price)/product.compare_price)*100
            )}% OFF
        </span>
    )}

</div>
{/* title */}
<Link to={`/products/${product.slug}`}>
<h3 className="font-semibold text-lg mt-3 h-14 line-clamp-2">
    {product.name}
</h3>
{/* rating */}
<div className="flex items-center gap-2 mt-3">

    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
        ⭐ {product.rating}
    </span>

    <span className="text-gray-500 text-sm">
        ({product.review_count || 0} Reviews)
    </span>

</div>
{/* seller */}
<p className="text-sm text-gray-500 mt-2">
    Seller :
    <span className="text-cyan-600 font-medium">
        {product.seller_name}
    </span>
</p>
{/* price */}
<div className="flex items-center gap-3 mt-3">

    <span className="text-2xl font-bold">
        ₹{product.price}
    </span>

    <span className="line-through text-gray-400">
        ₹{product.compare_price}
    </span>

</div>
      </Link>
 
      <div className="flex gap-3 mt-5">

<button
className="flex-1 py-2.5 rounded-xl border border-cyan-500
text-cyan-600 font-semibold hover:bg-cyan-50 transition"
>
Add to Cart
</button>

<button
className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-white
font-semibold hover:bg-cyan-600 transition"
>
Buy Now
</button>

</div>
    </div>
    
  ))}
</div>
  )
}

export default Products