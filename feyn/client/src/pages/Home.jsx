import "../index.css";
import Hero from "../components/Home/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryBar from "../components/Home/CategoryBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../services/api";
import toast from "react-hot-toast";
import Products from "../components/Home/Products";

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
      console.log(products)
  return (
    <>
      <Navbar searchTserm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm.trim() ? (
        <div className="search-results">
          <p className="search-results-label">
            Showing <strong>{searchedProducts.length}</strong> results for "{searchTerm}"
          </p>
            <Products products={searchedProducts}/>
        </div>
      ) : (
        <>
          <Hero />
          <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
          />
          <Products products={filteredProducts}/>
        </>
      )}
    </>
  );
}