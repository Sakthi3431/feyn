import React from 'react'

function categoryView() {
  return (
     <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            <p>{category}</p>
          </div>
        ))}
      </div>
    
  )
}

export default categoryView;
