import { useState } from "react";
import "./ProductDetails.css";

const product = {
  name: "REDMI Note 15 SE 5G",
  subtitle: "Snapdragon Edition",
  badge: "Flipkart Assured",
  rating: 4.2,
  ratingCount: "12,847 ratings",
  color: "Crimson Reserve",
  variants: [
    { storage: "128 GB", ram: "6 GB", originalPrice: 34999, price: 22999, discount: 34, pid: "MOBHN52FTTUWZGBA" },
    { storage: "128 GB", ram: "8 GB", originalPrice: 35999, price: 24999, discount: 31, pid: "MOBHN52F84BRGFEG" },
    { storage: "256 GB", ram: "8 GB", originalPrice: 37999, price: 26999, discount: 29, pid: "MOBHN52FUSYGZSZD" },
  ],
  highlights: [
    { icon: "💾", label: "Memory", value: "6 GB RAM | 128 GB ROM" },
    { icon: "⚡", label: "Processor", value: "Snapdragon 6 Gen 3 | Octa Core | 2.4 GHz" },
    { icon: "📷", label: "Camera", value: "50MP Rear | 20MP Front" },
    { icon: "🖥️", label: "Display", value: '6.77" 120Hz Adaptive FHD+ | 3200 nits' },
    { icon: "🔋", label: "Battery", value: "5800 mAh" },
    { icon: "📶", label: "Network", value: "5G Enabled" },
  ],
  specs: [
    { group: "Display", items: [
      { label: "Size", value: "6.77 inches" },
      { label: "Resolution", value: "FHD+ Adaptive" },
      { label: "Refresh Rate", value: "120Hz" },
      { label: "Touch Sampling", value: "240Hz" },
      { label: "Peak Brightness", value: "3200 nits" },
    ]},
    { group: "Performance", items: [
      { label: "Processor", value: "Snapdragon 6 Gen 3" },
      { label: "CPU Cores", value: "Octa Core" },
      { label: "Clock Speed", value: "2.4 GHz" },
    ]},
    { group: "Camera", items: [
      { label: "Rear Camera", value: "50MP" },
      { label: "Front Camera", value: "20MP" },
    ]},
    { group: "Battery", items: [
      { label: "Capacity", value: "5800 mAh" },
    ]},
  ],
  warranty: "1 Year Manufacturer Warranty for Phone and 6 Months for In-Box Accessories",
  seller: { name: "MYTHANGLORYTAIL", rating: 4.2, years: 4 },
  delivery: "by Tomorrow",
  pincode: "641037",
  serviceCenter: "Brand authorised service centre is just 3 km from your pincode (641037)",
};

const images = [
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/o/e/-original-imah7aff3gwhpgge.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/3/c/2/-original-imah7aff6hwsqrhb.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/l/0/p/-original-imah7affxfg6zfwy.jpeg?q=70",
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/i/7/c/-original-imah7affhmqghkqv.jpeg?q=70",
];

function StarRating({ value }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`star ${i <= Math.round(value) ? "filled" : i - 0.5 <= value ? "half" : ""}`}>★</span>
      ))}
    </div>
  );
}

export default function ProductDetails() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("highlights");
  const [pincode, setPincode] = useState("641037");
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const variant = product.variants[selectedVariant];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleImgError = (idx) => {
    setImgErrors(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="pdp-root">
      {/* Top Nav */}
      <nav className="pdp-nav">
        <div className="pdp-nav-inner">
          <div className="pdp-logo">
            <span className="pdp-logo-f">F</span>
            <span className="pdp-logo-text">lipkart</span>
          </div>
          <div className="pdp-search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search for products, brands and more" />
          </div>
          <div className="pdp-nav-actions">
            <button className="pdp-nav-btn">Login</button>
            <button className="pdp-nav-btn pdp-cart-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Cart
            </button>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="pdp-breadcrumb">
        <span>Home</span><span className="sep">›</span>
        <span>Mobiles</span><span className="sep">›</span>
        <span>Redmi</span><span className="sep">›</span>
        <span className="active">Redmi Note 15 SE 5G</span>
      </div>

      {/* Main Content */}
      <div className="pdp-main">
        {/* Left: Images */}
        <div className="pdp-images-col">
          <div className="pdp-images-sticky">
            <div className="pdp-main-image-wrap">
              {!imgErrors[activeImage] ? (
                <img
                  src={images[activeImage]}
                  alt="Redmi Note 15 SE 5G"
                  className="pdp-main-image"
                  onError={() => handleImgError(activeImage)}
                />
              ) : (
                <div className="pdp-img-placeholder">
                  <span>📱</span>
                  <span>Redmi Note 15 SE 5G</span>
                </div>
              )}
              <button
                className={`pdp-wishlist-btn ${wishlist ? "active" : ""}`}
                onClick={() => setWishlist(w => !w)}
                aria-label="Wishlist"
              >
                <svg viewBox="0 0 24 24" fill={wishlist ? "#ff3f6c" : "none"} stroke={wishlist ? "#ff3f6c" : "#666"} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </button>
              <div className="pdp-discount-badge">-{variant.discount}%</div>
            </div>
            <div className="pdp-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`pdp-thumb ${activeImage === i ? "active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  {!imgErrors[`thumb_${i}`] ? (
                    <img src={img} alt={`View ${i+1}`} onError={() => setImgErrors(prev => ({...prev, [`thumb_${i}`]: true}))} />
                  ) : (
                    <span className="pdp-thumb-placeholder">📱</span>
                  )}
                </button>
              ))}
            </div>
            <div className="pdp-cta-desktop">
              <button className="pdp-btn-cart" onClick={handleAddToCart}>
                {addedToCart ? (
                  <><span>✓</span> Added to Cart</>
                ) : (
                  <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> ADD TO CART</>
                )}
              </button>
              <button className="pdp-btn-buy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="13 17 18 12 13 7"/><path d="M6 12h11"/></svg>
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="pdp-details-col">
          {/* Title */}
          <div className="pdp-title-section">
            <div className="pdp-assured-badge">
              <svg viewBox="0 0 20 20" fill="#2874f0"><path d="M10 1l2.5 5 5.5.8-4 3.9.9 5.5L10 13.5l-4.9 2.7.9-5.5L2 6.8l5.5-.8z"/></svg>
              Flipkart Assured
            </div>
            <h1 className="pdp-title">{product.name} <span className="pdp-subtitle">{product.subtitle}</span></h1>
            <p className="pdp-color-label">Color: <strong>{product.color}</strong></p>
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
              <span className="pdp-price">{variant.price.toLocaleString("en-IN")}</span>
              <span className="pdp-original">₹{variant.originalPrice.toLocaleString("en-IN")}</span>
              <span className="pdp-save-tag">{variant.discount}% off</span>
            </div>
            <p className="pdp-emi-info">EMI from <strong>₹{Math.round(variant.price / 12).toLocaleString("en-IN")}/mo</strong> · No Cost EMI available</p>
          </div>

          {/* Variants */}
          <div className="pdp-variants-section">
            <p className="pdp-section-label">Storage & RAM</p>
            <div className="pdp-variants-grid">
              {product.variants.map((v, i) => (
                <button
                  key={i}
                  className={`pdp-variant-btn ${selectedVariant === i ? "active" : ""}`}
                  onClick={() => setSelectedVariant(i)}
                >
                  <span className="pdp-variant-storage">{v.storage} + {v.ram}</span>
                  <span className="pdp-variant-price">₹{v.price.toLocaleString("en-IN")}</span>
                  <span className="pdp-variant-disc">↓{v.discount}%</span>
                </button>
              ))}
            </div>
          </div>

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

          {/* Delivery */}
          <div className="pdp-delivery-section">
            <p className="pdp-section-label">Delivery</p>
            <div className="pdp-delivery-row">
              <div className="pdp-pin-input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="16"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <input
                  type="text"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  maxLength={6}
                  className="pdp-pin-input"
                />
                <button className="pdp-check-btn">Check</button>
              </div>
              <div className="pdp-delivery-info">
                <svg viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="2" width="18"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span>FREE Delivery <strong>{product.delivery}</strong></span>
              </div>
            </div>
            <div className="pdp-service-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2874f0" strokeWidth="2" width="16"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              {product.serviceCenter}
            </div>
          </div>

          {/* Seller */}
          <div className="pdp-seller-section">
            <p className="pdp-section-label">Seller</p>
            <div className="pdp-seller-card">
              <div className="pdp-seller-info">
                <span className="pdp-seller-name">{product.seller.name}</span>
                <div className="pdp-seller-rating">
                  <span className="pdp-rating-pill sm">{product.seller.rating} ★</span>
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

          {/* Warranty */}
          <div className="pdp-warranty-section">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2874f0" strokeWidth="2" width="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>{product.warranty}</span>
          </div>

          {/* Tabs */}
          <div className="pdp-tabs">
            <div className="pdp-tab-nav">
              {["highlights", "specifications"].map(tab => (
                <button
                  key={tab}
                  className={`pdp-tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === "highlights" && (
              <div className="pdp-tab-content">
                <div className="pdp-highlights-grid">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="pdp-highlight-card">
                      <span className="pdp-highlight-icon">{h.icon}</span>
                      <div>
                        <p className="pdp-highlight-label">{h.label}</p>
                        <p className="pdp-highlight-value">{h.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="pdp-tab-content">
                {product.specs.map((group, gi) => (
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

          {/* Mobile CTA */}
          <div className="pdp-cta-mobile">
            <button className="pdp-btn-cart" onClick={handleAddToCart}>
              {addedToCart ? "✓ Added!" : "ADD TO CART"}
            </button>
            <button className="pdp-btn-buy">BUY NOW</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pdp-footer">
        <div className="pdp-footer-inner">
          <div className="pdp-footer-brand">
            <span className="pdp-logo-f">F</span>
            <span className="pdp-logo-text">lipkart</span>
          </div>
          <p className="pdp-footer-copy">© 2025 Flipkart. Product listing for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
}
