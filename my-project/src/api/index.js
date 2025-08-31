import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

export const fetchUserProfile = () => API.get('/users/profile');

// --- Product APIs ---

export const fetchProducts = (keyword = '', pageNumber = 1) => API.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`);
export const fetchProductById = (id) => API.get(`/products/${id}`);

// --- Auth APIs ---
export const loginUser = (formData) => API.post('/users/login', formData);
export const signupUser = (formData) => API.post('/users', formData);

// --- Order APIs ---
export const createOrder = (orderData) => API.post('/orders', orderData);
export const fetchMyOrders = () => API.get('/orders/myorders');

// --- Artisan Product APIs ---
export const fetchMyProducts = () => API.get('/products/myproducts');
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const becomeArtisan = (artisanData) => API.put('/users/profile/become-artisan', artisanData);

// --- NEW: Admin APIs ---
export const fetchAllUsers = () => API.get('/users');
export const verifyArtisan = (id) => API.put(`/users/${id}/verify`);
export const fetchAllProducts = () => API.get('/products/all');
export const approveProduct = (id) => API.put(`/products/${id}/approve`);
export const rejectArtisan = (id) => API.delete(`/users/${id}`);
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return API.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const rejectProduct = (id) => deleteProduct(id);