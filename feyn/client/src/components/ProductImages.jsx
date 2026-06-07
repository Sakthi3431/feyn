import React from 'react'
import products from '../data/products';
import { Link, useParams } from 'react-router-dom';


function ProductImages({product}) {
  if (!product) {
    return <h2>Product not found</h2>;
  }
  return (
    <div className="pcard-img-wrap">
        <img src={product.image} alt={product.name} className="pcard-img" loading="lazy" />
        <div className='flex m-4 justify-between'>
            <img src={product.image} alt={product.name} className="pcard-sm-img" loading="lazy" />
            <img src={product.image} alt={product.name} className="pcard-sm-img" loading="lazy" />
            <img src={product.image} alt={product.name} className="pcard-sm-img" loading="lazy" />
        </div>
        
      </div>
  )
}

export default ProductImages;