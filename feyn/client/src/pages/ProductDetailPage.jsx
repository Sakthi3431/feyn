import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiMinus, FiPlus } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import "../css/ProductDetails.css";
import Navbar from "../components/Navbar"
import BreadCrumb from "../components/productdetails/BreadCrumb.jsx"
import ProductImages from '../components/productdetails/ProductImages.jsx';
import ProductDetails from '../components/productdetails/ProductDetails.jsx';

export default function ProductDetailPage() {
  const { slug } = useParams();
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
    productAPI.getProduct(slug).then(r => setProduct(r.data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (!product) return <div className="loading-state">Product not found</div>;

  const images = product.images || [];
  const primaryImg = images[activeImg]?.image;
  // const wishlisted = isWishlisted(product.slug);
  const wishlist = false
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;

  const handleAddToCart = () => {
    
  };

  // const handleWishlist = () => {
  //   if (!user) { navigate('/login'); return; }
  //   toggleWishlist(product.id);
  // };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmittingReview(true);
    try {
      await productAPI.addReview(product.id, review);
      toast.success('Review added!');
      const res = await productAPI.getProduct(slug);
      setProduct(res.data);
      setReview({ rating: 5, title: '', comment: '' });
    } catch { toast.error('Could not add review'); }
    finally { setSubmittingReview(false); }
  };

  return (
  <>
    <div className="container mx-auto p-4">    
    <BreadCrumb product={product}/>  
    <div className="pcard flex flex-col md:flex-row gap-10">
    <ProductImages product= {product} discount={discount}/>
    <ProductDetails product= {product} discount={discount}/> 
    </div>
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
  </>
  );
}
