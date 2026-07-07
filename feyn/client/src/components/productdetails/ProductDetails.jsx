import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
function ProductDetails({product, discount}) {
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState(
      product?.highlights?.length > 0 ? "highlights" : "specifications"
    );
    const [pincode, setPincode] = useState("641037");
    const [wishlist, setWishlist] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [imgErrors, setImgErrors] = useState({});
    const {addToCart} = useCart();

const images = [
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/o/e/-original-imah7aff3gwhpgge.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/3/c/2/-original-imah7aff6hwsqrhb.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/l/0/p/-original-imah7affxfg6zfwy.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/i/7/c/-original-imah7affhmqghkqv.jpeg?q=70",
];
const handleAddToCart = () => {
  console.log("button clicked")
  addToCart({
    id: variant.pid,
    name: product.name,
    image: images[0],
    price: variant.price,
    mrp: variant.originalPrice,
    variant: `${variant.ram} RAM / ${variant.storage}`,
    spec: product.subtitle,
  });
};
const variant = product.variants[selectedVariant];
    if (!product) {
    return <h2>Product not found</h2>;
  } 
    const [additem, setAddItem] = useState(1);
    const stars =
    "★".repeat(Math.floor(product.rating)) +
    "☆".repeat(5 - Math.floor(product.rating));
console.log(product)
  return (
    <>
    <div className="pdp-details-col">
<div className="pdp-title-section">
            <h1 className="pdp-title">
            {product.name}
            {product.subtitle && (
              <span className="pdp-subtitle"> {product.subtitle}</span>
            )}
          </h1>

          {product.color?.trim() && (
            <p className="pdp-color-label">
              Color: <strong>{product.color}</strong>
            </p>
          )}
            <div className="pdp-rating-row">
              <div className="pdp-rating-pill">
                <span className="pdp-rating-val">{product.rating}</span>
                <svg viewBox="0 0 12 12" fill="#fff" width="12" height="12"><path d="M6 0l1.5 3 3.3.5-2.4 2.3.6 3.3L6 7.5l-3 1.6.6-3.3L1.2 3.5 4.5 3z"/></svg>
              </div>
              <span className="pdp-rating-count">{product.ratingCount}</span>
              <span className="pdp-verified">✓ 5,200+ Verified Buyers</span>
            </div>
          </div>
                    {/* Price */}
          <div className="pdp-price-section">
            <div className="pdp-price-main">
              <span className="pdp-currency">₹</span>
              <span className="pdp-price">{product.price.toLocaleString("en-IN")}</span>
              <span className="pdp-original">₹{product.compare_price.toLocaleString("en-IN")}</span>
              <span className="pdp-save-tag">{discount}% off</span>
            </div>
            <p className="pdp-emi-info">EMI from <strong>₹{Math.round(product.price / 12).toLocaleString("en-IN")}/mo</strong> · No Cost EMI available</p>
          </div>

          {/* Variants */}
          {product?.variants?.length > 0 && (
  <div className="pdp-variants-section">
    <span className="pdp-variant-storage">{v.name}</span>

    <div className="pdp-variants-grid">
      {product.variants.map((v, i) => (
        <button
          key={i}
          className={`pdp-variant-btn ${
            selectedVariant === i ? "active" : ""
          }`}
          onClick={() => setSelectedVariant(i)}
        >
          <span className="pdp-variant-storage">
            {v.storage || "-"} {v.ram ? `+ ${v.ram}` : ""}
          </span>

          <span className="pdp-variant-price">
            ₹{Number(v.price || 0).toLocaleString("en-IN")}
          </span>

          {v.discount > 0 && (
            <span className="pdp-variant-disc">
              ↓{v.discount}%
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
)}

          {/* Offers */}
          <div className="pdp-offers-section">
            <p className="pdp-section-label">Available Offers</p>
            <ul className="pdp-offers-list">
              <li>
                <span className="pdp-offer-tag">Bank Offer</span>
                10% off on HDFC Bank Credit/Debit Cards, up to ₹1,500 on orders ≥ ₹5,000
              </li>
              <li>
                <span className="pdp-offer-tag">Special Price</span>
                Extra ₹2,000 off — Limited time deal
              </li>
              <li>
                <span className="pdp-offer-tag">Partner Offer</span>
                Sign up for Flipkart Pay Later and get ₹100 cashback
              </li>
            </ul>
          </div>
          {/* delivery */}

<div className="pdp-delivery-section">
  <p className="pdp-section-label">Delivery</p>

  <div className="pdp-delivery-row">
    <div className="pdp-pin-input-wrap">
      <div className="pdp-delivery-info">
        <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="16"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>
          FREE Delivery <strong>{product.delivery}</strong>
        </span>
      </div>
    </div>

    {product.delivery && (
      <div className="pdp-delivery-info">
        <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="16"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span>
          FREE Delivery <strong>{product.delivery}</strong>
        </span>
      </div>
    )}
  </div>

        {product.serviceCenter && (
          <div className="pdp-service-info">
            <svg viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="2" width="18"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="#2874f0" strokeWidth="2" width="16"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            {product.serviceCenter}
          </div>
        )}
      </div>

  
              {/* Warranty */}
              {product.warranty && (
                  <div className="pdp-warranty-section">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2874f0" strokeWidth="2" width="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span>{product.warranty}</span>
                  </div>
                )}


          {/* Tabs */}
          {(product?.highlights?.length > 0 || product?.specifications?.length > 0) && (
            <div className="pdp-tabs">
              <div className="pdp-tab-nav">

                {product?.highlights?.length > 0 && (
                  <button
                    className={`pdp-tab-btn ${activeTab === "highlights" ? "active" : ""}`}
                    onClick={() => setActiveTab("highlights")}
                  >
                    Highlights
                  </button>
                )}

                {product?.specifications?.length > 0 && (
                  <button
                    className={`pdp-tab-btn ${activeTab === "specifications" ? "active" : ""}`}
                    onClick={() => setActiveTab("specifications")}
                  >
                    Specifications
                  </button>
                )}

              </div>

              {/* Highlights */}
              {activeTab === "highlights" &&
                product?.highlights?.length > 0 && (
                  <div className="pdp-tab-content">
                    <div className="pdp-highlights-grid">
                      {product.highlights.map((h, i) => (
                        <div key={i} className="pdp-highlight-card">
                          <span className="pdp-highlight-icon">
                            {h.icon || "📌"}
                          </span>

                          <div>
                            <p className="pdp-highlight-label">
                              {h.label || h.title}
                            </p>

                            <p className="pdp-highlight-value">
                              {h.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              )}

              {/* Specifications */}
              {activeTab === "specifications" &&
                product?.specifications?.length > 0 && (
                  <div className="pdp-tab-content">
                    {product.specifications.map((group, gi) => (
                      <div key={gi} className="pdp-spec-group">
                        <h3 className="pdp-spec-group-title">{group.group}</h3>

                        <table className="pdp-spec-table">
                          <tbody>
                            {group.items.map((item, ii) => (
                              <tr key={ii}>
                                <td className="pdp-spec-label">{item.label}</td>
                                <td className="pdp-spec-value">{item.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
              )}
            </div>
          )}

          {/* Mobile CTA */}
          <div className="pdp-cta-mobile">
            <button className="pdp-btn-cart" onClick={handleAddToCart}>
              {addedToCart ? "✓ Added!" : "ADD TO CART"}
            </button>
            <button className="pdp-btn-buy">BUY NOW</button>
          </div>
           {/* Seller */}
          <div className="pdp-seller-section">
            <p className="pdp-section-label">Seller</p>
            <div className="pdp-seller-card">
              <div className="pdp-seller-info">
                <span className="pdp-seller-name">{product.seller_name}</span>
                <div className="pdp-seller-rating">
                  <span className="pdp-rating-pill sm">{product.rating} ★</span>
                  <span className="pdp-seller-years">{product.seller.years} years on Flipkart</span>
                </div>
              </div>
              <div className="pdp-trust-badges">
                <span className="pdp-trust-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="2" width="14"><polyline points="20 6 9 17 4 12"/></svg>
                  7-day returns
                </span>
                <span className="pdp-trust-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="2" width="14"><polyline points="20 6 9 17 4 12"/></svg>
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>
          </div>
          
    </>
  )
}

export default ProductDetails;