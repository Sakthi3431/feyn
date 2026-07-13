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
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    rating: 5,
    title: "",
    comment: ""
});
  const [submittingReview, setSubmittingReview] = useState(false);

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const { data } = await productAPI.getProduct(slug);
            setProduct(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchProduct();
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

    toast.success("Review added!");

    const [productRes, reviewsRes] = await Promise.all([
        productAPI.getProduct(slug),
        productAPI.getReviews(product.id),
    ]);

    setProduct(productRes.data);
    setReviews(reviewsRes.data);

    setReview({
        rating: 5,
        title: "",
        comment: "",
    });

} catch (error) {
    toast.error(
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        "Could not add review"
    );
}
    finally {
    setSubmittingReview(false);
}
  };

  return (
  <>
    <div className="container mx-auto p-4">
    <Navbar/>
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
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-8">

    <div className="flex items-center justify-between mb-6">

        <div>
            <h2 className="text-2xl font-bold">
                Write a Review
            </h2>

            <p className="text-gray-500 text-sm mt-1">
                Share your experience with this product.
            </p>
        </div>

        <span className="bg-cyan-50 text-cyan-600 px-4 py-2 rounded-full text-sm font-semibold">
            Your Opinion Matters
        </span>

    </div>

    <form onSubmit={handleReview}>

        {/* Rating */}

        <div className="mb-6">

            <label className="block text-sm font-semibold mb-3">
                Overall Rating
            </label>

            <div className="flex gap-2">

                {[1,2,3,4,5].map((s)=>(
                    <button
                        key={s}
                        type="button"
                        onClick={() =>
                            setReview({
                                ...review,
                                rating:s
                            })
                        }
                        className="transition hover:scale-125"
                    >
                        <FaStar
                            size={28}
                            className={
                                s<=review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                        />
                    </button>
                ))}

            </div>

        </div>

        {/* Title */}

        <div className="mb-5">

            <label className="block text-sm font-semibold mb-2">
                Review Title
            </label>

            <input
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="Summarize your review..."
                value={review.title}
                onChange={(e)=>
                    setReview({
                        ...review,
                        title:e.target.value
                    })
                }
            />

        </div>

        {/* Review */}

        <div className="mb-6">

            <label className="block text-sm font-semibold mb-2">
                Your Review
            </label>

            <textarea
                rows={5}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="Tell others what you liked or disliked about this product..."
                value={review.comment}
                onChange={(e)=>
                    setReview({
                        ...review,
                        comment:e.target.value
                    })
                }
            />

        </div>

        {/* Button */}

        <div className="flex justify-end">

            <button
                type="submit"
                disabled={submittingReview}
                className="px-8 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition disabled:opacity-60"
            >
                {submittingReview
                    ? "Submitting..."
                    : "Submit Review"}
            </button>

        </div>

    </form>
</div>
          )}
        </div>
    </div>
  </>
  );
}
