import {useState} from 'react'
import products from '../../data/products';
import { Link, useParams } from 'react-router-dom';


function ProductImages({ product, discount }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  if (!product) {
    return <h2>Product not found</h2>;
  }

  // Safe access
  const variant = product?.variants?.[selectedVariant] || {
    discount: 0
  };

const handleAddToCart = () => {
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
  const handleImgError = (idx) => {
    setImgErrors((prev) => ({
      ...prev,
      [idx]: true,
    }));
  };

  const images = [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/o/e/-original-imah7aff3gwhpgge.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/3/c/2/-original-imah7aff6hwsqrhb.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/l/0/p/-original-imah7affxfg6zfwy.jpeg?q=70",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/i/7/c/-original-imah7affhmqghkqv.jpeg?q=70",
  ];
  return (
    <div className="pdp-main">
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
              <div className="pdp-discount-badge">-{discount}%</div>
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
        </div>
  )
}

export default ProductImages;