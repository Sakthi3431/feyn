import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb({items}) {
  return (
    <div className='px-6 py-3 text-sm text-gray-500'>
        {items.map((item, index)=>(
            <span key={index}>
                {index !== items.length -1 ? (
                    <>
                    <Link to={item.path}
                    className='hover:text-blue-600'
                    >
                        {item.label}
                    </Link>
                    <span className='mx-2'>/</span>
                    </>
                ) : (
                    <span className="text-green-800 font-medium">
                        {item.label}
                    </span>
                )}
            </span>
        ))}
    </div>
  )
}

export default BreadCrumb;