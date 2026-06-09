import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb({product}) {
    
  return (
    
    <div className='px-6 py-3 text-sm text-gray-500'>
      <div className="pdp-breadcrumb">
        <span><Link to="/">Home</Link></span><span className="sep"> / </span>
            <Link to={`/category/${product.category}`}>
              {product.category}
            </Link>
            <span className="sep"> / </span>
        <span className="sep">{product.name}</span>
      </div>
    </div>
  )
}

export default BreadCrumb;