import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function ProductDetails({product, onAddCart}) {
    if (!product) {
    return <h2>Product not found</h2>;
  } 
    const [additem, setAddItem] = useState(1);
    const stars =
    "★".repeat(Math.floor(product.rating)) +
    "☆".repeat(5 - Math.floor(product.rating));

  return (
    <>
    <div className='pcard-body'>

    <div>
        <h2 className="pcard-name">{product.name}</h2>
          <span className="pcard-price">₹{product.price.toLocaleString()}</span>
        <p className="pcard-brand">{product.description}</p>
        <p className="pcard-brand">Brand: {product.brand}</p>
        <div className="flex items-center gap-2">
  <span className="text-yellow-500 text-xl">
    {stars}
  </span>
  <span className="text-gray-500">
    ({product.rating})
  </span>
</div>
        <div className="pcard-pricing">
          <div className='flex gap-2'>
            <div className='flex'>
          <button
          disabled={additem === 1}
          className='w-5 h-5 lg:w-10 lg:h-10 bg-gray-800 text-white rounded'
          onClick={()=> setAddItem(additem-1)}>-
          </button>
          <p className='w-10 lg:px-3 lg:py-3 text-center  font-semibold'>
  {additem}
</p>
          <button
          disabled={additem >= product.stock}
          className='w-5 h-5 lg:w-10 lg:h-10 bg-gray-800 text-white rounded'
          onClick={() => {
            if (additem < product.stock) {
              setAddItem(additem + 1);
            }
          }
          
          }>+
          </button>
          </div>
          </div>
        </div>
        <div className='flex gap-10'>
          
        <button
            className="buynow mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
            onClick={() =>
              onAddCart({
                ...product,
                quantity: additem,
              })
            }
            disabled={product.stock === 0}
            >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button
            className="buynow mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
            onClick={() =>
              onAddCart({
                ...product,
                quantity: additem,
              })
            }
            disabled={product.stock === 0}
            >
          Buy Now
        </button>
          </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetails;