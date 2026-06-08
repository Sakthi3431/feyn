import "../index.css";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";
import { useState } from "react";
import products from "../data/products";
import { Link, useParams } from "react-router-dom";

export default function App() {

    const [searchTerm, setSearchTerm] = useState("");
      const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
        <>
    <Navbar
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
     />
      {searchTerm.trim() ? (
        <div className="grid grid-cols-4 gap-4 p-4">
          {searchedProducts.map((product) => (
            <div
      key={product.id}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
    >
      <Link to={`/product-card/${product.category}/${product.id}`}>
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
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Buy Now
        </button>
      </div>
    </div>
          ))}
        </div>
      ) : (
        <>
        <Hero/>
        <CategoryBar />
        </>
      )}
    <Footer/>
        </>
);
}
