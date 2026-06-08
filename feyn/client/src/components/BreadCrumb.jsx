import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb({product}) {
    
  return (
    <div className='px-6 py-3 text-sm text-gray-500'>
         <Link to="/">Home</Link>
         <span> / </span>
           
    <Link to={`/category/${product.category}`}>
  {product.category}
</Link>
    <span> / </span>
  <span>{product.name}</span>
    </div>
  )
}

export default BreadCrumb;