import "../index.css";
import Hero from "../components/Home/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryBar from "../components/Home/CategoryBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../services/api";
import toast from "react-hot-toast";

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState([])
  useEffect(() => {
  const fetchData = async () => {
    try {
      const [categoryRes, productRes] = await Promise.all([
        productAPI.getCategories(),
        productAPI.getProducts(),
      ]);
      
      setCategories(categoryRes.data);
      setProducts(productRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load data");
    }
  };

  fetchData();
}, []);
  const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter(
        product => product.category_name === selectedCategory
      );
  return (
    <>
      <Navbar searchTserm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm.trim() ? (
        <div className="search-results">
          <p className="search-results-label">
            Showing <strong>{searchedProducts.length}</strong> results for "{searchTerm}"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {searchedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                <Link to={`/api/products/${product.category_name}/${product.slug}`}>
                  <div className="product-card-img-wrap">
                    <img src={product.image} alt={product.name} className="w-full h-56 object-cover"/>
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-lg">{product.name}</div>
                    <div className="text-blue-600 font-bold mt-2">₹{product.price}</div>
                  </div>
                </Link>
                <div className="p-4 flex">
                  <button className="w-full text-white py-2 rounded-lg hover:bg-orange-600"
        style={{background: "#ff4d4d"}}>Add to Cart</button>
                  <button className="w-full text-white py-2 rounded-lg hover:bg-orange-600"
        style={{background: "#ff4d4d"}}>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Hero />
          <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
  {filteredProducts.map(product => (
<div
      key={product.id}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
    >
      <Link to={`/products/${product.slug}`}>
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
      )}
    </>
  );
}