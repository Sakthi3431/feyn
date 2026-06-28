
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiMinus, FiPlus } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
// import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [review, setReview] = useState({ rating: 5, title: '', comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    productAPI.getProduct(id).then(r => setProduct(r.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!product) return <div className="loading-state">Product not found</div>;

  const images = product.images || [];
  const primaryImg = images[activeImg]?.image;
  const wishlisted = isWishlisted(product.id);
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;

  const handleAddToCart = () => {
    if (!user) { navigate('/login'); return; }
    addToCart(product.id, qty);
  };

  const handleWishlist = () => {
    if (!user) { navigate('/login'); return; }
    toggleWishlist(product.id);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmittingReview(true);
    try {
      await productAPI.addReview(product.id, review);
      toast.success('Review added!');
      const res = await productAPI.getProduct(id);
      setProduct(res.data);
      setReview({ rating: 5, title: '', comment: '' });
    } catch { toast.error('Could not add review'); }
    finally { setSubmittingReview(false); }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-grid">
          {/* Images */}
          <div className="product-gallery">
            <div className="main-image">
              {primaryImg ? <img src={primaryImg} alt={product.name} /> : <div className="img-placeholder">🛍️</div>}
              {discount > 0 && <span className="detail-discount-badge">-{discount}%</span>}
            </div>
            {images.length > 1 && (
              <div className="thumbnail-strip">
                {images.map((img, i) => (
                  <button key={i} className={`thumbnail ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                    <img src={img.image} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-info-panel">
            <div className="info-badges">
              <span className="badge badge-primary">{product.category_name}</span>
              {product.stock > 0 ? <span className="badge badge-success">In Stock</span> : <span className="badge badge-error">Out of Stock</span>}
            </div>
            <h1 className="detail-title">{product.name}</h1>
            <div className="seller-info">By <strong>{product.seller_name}</strong></div>

            <div className="detail-rating">
              {[1,2,3,4,5].map(s => (
                <FaStar key={s} className={s <= Math.round(product.rating) ? 'star-filled' : 'star-empty'} />
              ))}
              <span>{Number(product.rating).toFixed(1)} ({product.review_count} reviews)</span>
            </div>

            <div className="detail-price">
              <span className="detail-main-price">₹{Number(product.price).toLocaleString()}</span>
              {product.compare_price && (
                <><span className="detail-compare-price">₹{Number(product.compare_price).toLocaleString()}</span>
                <span className="detail-savings">Save {discount}%</span></>
              )}
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="qty-selector">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}><FiMinus /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}><FiPlus /></button>
            </div>

            <div className="detail-actions">
              <button className="btn btn-primary detail-btn" onClick={handleAddToCart} disabled={product.stock === 0}>
                <FiShoppingCart /> Add to Cart
              </button>
              <button className={`wishlist-toggle ${wishlisted ? 'active' : ''}`} onClick={handleWishlist}>
                {wishlisted ? <FaHeart /> : <FiHeart />}
              </button>
            </div>

            <div className="detail-guarantees">
              <div className="guarantee-item"><FiTruck /><span>Free delivery on orders over ₹500</span></div>
              <div className="guarantee-item"><FiShield /><span>Secure payment & buyer protection</span></div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          {product.reviews?.length > 0 ? (
            <div className="reviews-list">
              {product.reviews.map(r => (
                <div key={r.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-avatar">{r.user_name?.[0]?.toUpperCase()}</div>
                    <div>
                      <strong>{r.user_name}</strong>
                      <div className="review-stars">
                        {[1,2,3,4,5].map(s => <FaStar key={s} className={s <= r.rating ? 'star-filled' : 'star-empty'} />)}
                      </div>
                    </div>
                  </div>
                  {r.title && <h4 className="review-title">{r.title}</h4>}
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          ) : <p className="no-reviews">No reviews yet. Be the first to review!</p>}

          {user && (
            <div className="add-review">
              <h3>Write a Review</h3>
              <form onSubmit={handleReview}>
                <div className="star-picker">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setReview({...review, rating: s})}>
                      <FaStar className={s <= review.rating ? 'star-filled' : 'star-empty'} />
                    </button>
                  ))}
                </div>
                <input className="review-input" placeholder="Review title (optional)" value={review.title}
                  onChange={e => setReview({...review, title: e.target.value})} />
                <textarea className="review-input" rows="4" placeholder="Share your experience..." required
                  value={review.comment} onChange={e => setReview({...review, comment: e.target.value})} />
                <button type="submit" className="btn btn-primary btn-sm" disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
