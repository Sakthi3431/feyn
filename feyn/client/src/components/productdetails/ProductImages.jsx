import {useState} from 'react'
import products from '../../data/products';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaHeart,FaRegHeart  } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

function ProductImages({ product, discount }) {
  const {user} = useAuth()
  const { toggleWishlist, isWishlisted } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const wishlisted = product ? isWishlisted(product.id) : false;
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
                  alt=""
                  className="pdp-main-image"
                  onError={() => handleImgError(activeImage)}
                />
              ) : (
                <div className="pdp-img-placeholder">
                  <span>📱</span>
                  <span></span>
                </div>
              )}
              <button
                  onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!user) {
                      navigate("/login");
                      return;
                  }

                  toggleWishlist(product.id);
              }}
                  className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50 transition"
              >
                  {wishlisted ? (
                      <FaHeart className="text-red-500 text-xl" />
                  ) : (
                      <FaRegHeart className="text-gray-500 text-xl" />
                  )}
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