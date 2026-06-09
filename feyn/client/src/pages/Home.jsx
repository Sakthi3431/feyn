import "../index.css";
import Hero from "../components/Home/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryBar from "../components/Home/CategoryBar";
import { useState } from "react";
import products from "../data/products";
import { Link } from "react-router-dom";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm.trim() ? (
        <div className="search-results">
          <p className="search-results-label">
            Showing <strong>{searchedProducts.length}</strong> results for "{searchTerm}"
          </p>
          <div className="product-grid">
            {searchedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product-card/${product.category}/${product.id}`}>
                  <div className="product-card-img-wrap">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-card-body">
                    <div className="product-card-name">{product.name}</div>
                    <div className="product-card-price">₹{product.price}</div>
                  </div>
                </Link>
                <div style={{ padding: "0 16px 16px" }}>
                  <button className="product-card-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Hero />
          <CategoryBar />
        </>
      )}
      <Footer />
    </>
  );
}
