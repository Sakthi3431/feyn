import { useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryBar({categories, selectedCategory, setSelectedCategory}) {
    const buttonStlye = {    padding: "10px 20px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

  return (
    <>
         <div className="flex flex-wrap justify-center gap-3 my-6">

            <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-full border ${
                    selectedCategory === "All"
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                }`}
            >
                All
            </button>

            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-full border ${
                        selectedCategory === category.name
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                    }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
        </>
  )
}

export default CategoryBar;
