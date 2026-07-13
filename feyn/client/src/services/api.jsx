import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  res => res,
  async err => {
    if (err.response?.status === 401 && 
      !err.config.url.includes("/token/refresh/")
    ) {
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const res = await API.post('/users/token/refresh/', { refresh });
          localStorage.setItem('access_token', res.data.access);
          err.config.headers.Authorization = `Bearer ${res.data.access}`;
          return API(err.config);
        } catch {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: data => API.post('/users/register/', data),
  login: data => API.post('/users/login/', data),
  getProfile: () => API.get('/users/profile/'),
  updateProfile: data => API.put('/users/profile/', data),
  getAddresses: () => API.get('/users/addresses/'),
  addAddress: data => API.post('/users/addresses/', data),
  updateAddress: (id, data) => API.put(`/users/addresses/${id}/`, data),
  deleteAddress: id => API.delete(`/users/addresses/${id}/`),
  getSellerProfile: () => API.get('/users/seller-profile/'),
  updateSellerProfile: data => API.put('/users/seller-profile/', data),
  getSellers: () => API.get('/users/sellers/'),
};

export const productAPI = {
  getProducts: params => API.get('/products/', { params }),
  getProduct: slug => API.get(`/products/${slug}/`),
  getFeatured: () => API.get('/products/featured/'),
  getCategories: () => API.get('/products/categories/'),
  createProduct: data => API.post('/products/', data),
  updateProduct: (slug, data) => API.put(`/products/${slug}/`, data),
  deleteProduct: slug => API.delete(`/products/${slug}/`),
  getMyProducts: () => API.get('/products/my_products/'),
  addReview: (productId, data) => API.post(`/products/${productId}/reviews/`, data),
  getReviews: (productId) =>  API.get(`/products/${productId}/reviews/`),
  getCart: () => API.get('/products/cart/'),
  addToCart: data => API.post('/products/cart/add/', data),
  updateCartItem: (id, data) => API.put(`/products/cart/update/${id}/`, data),
  removeCartItem: id => API.delete(`/products/cart/remove/${id}/`),
  clearCart: () => API.delete('/products/cart/clear/'),
  getWishlist: () => API.get('/products/wishlist/'),
  toggleWishlist: productId => API.post(`/products/wishlist/toggle/${productId}/`),
};

export const orderAPI = {
  getOrders: () => API.get('/orders/'),
  getOrder: id => API.get(`/orders/${id}/`),
  createOrder: data => API.post('/orders/create/', data),
  cancelOrder: id => API.put(`/orders/${id}/cancel/`),
  getSellerOrders: () => API.get('/orders/seller/'),
  updateOrderStatus: (id, status) => API.put(`/orders/seller/${id}/status/`, { status }),
  validateCoupon: code => API.post('/orders/coupon/validate/', { code }),
};

export default API;