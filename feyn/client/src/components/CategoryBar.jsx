import products from '../data/products';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryBar() {
    const buttonStlye = {    padding: "10px 20px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = [
        "All",
        "Fashion",
        "Mobiles",
        "Beauty",
        "Electronics",
        "Home",
        "Appliances",
        "Toys",
        "Food",
        "Auto",
        "Sports"
    ];
    const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product)=> product.category === selectedCategory);
    
  return (
    <>
        <div className="flex flex-wrap justify-center gap-3 my-6">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`px-4 py-2 rounded-full border transition
        ${
          selectedCategory === category
            ? "bg-blue-600 text-white"
            : "bg-white hover:bg-gray-100"
        }`}
    >
      {category}
    </button>
  ))}
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
  {filteredProducts.map((product) => (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
    >
      <Link to={`/product-card/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg">
            {product.name}
          </h3>

          <p className="text-blue-600 font-bold mt-2">
            ₹{product.price}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          className="w-full text-white py-2 rounded-lg hover:bg-orange-600"
        style={{background: "#ff4d4d"}}
        >
          Buy Now
        </button>
      </div>
    </div>
  ))}
</div>
        </>
  )
}

export default CategoryBar;