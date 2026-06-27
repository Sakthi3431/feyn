import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/ProductDetails.css"
import { useCart } from "../context/CartContext";

function Navbar({ searchTerm, setSearchTerm }) {
  const {cartItems} = useCart();
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <>
    <nav className="pdp-nav">
        <div className="pdp-nav-inner">
          <div className="pdp-logo">
            <Link to="/">
            <span className="pdp-logo-text">Feyn</span>
            </Link>
          </div>
          <div className="pdp-search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search for products, brands and more" onChange={(e)=> setSearchTerm(e.target.value)}
            value={searchTerm} />
          </div>
          <div className="pdp-nav-actions">
            <button className="pdp-nav-btn"><Link to='/login'>Login</Link></button>
            <button className="pdp-nav-btn pdp-cart-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              <Link to="/cart">Cart({cartItems.length})</Link>
            </button>
          </div>
        </div>
      </nav>
            </>
  
  );
}

export default Navbar;
