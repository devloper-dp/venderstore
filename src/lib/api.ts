import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/shop-api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginInput {
  email: string;
  password: string;
}

export const authApi = {
  login: async (input: LoginInput) => {
    const { data } = await api.post('/login', input);
    return data;
  },
  logout: () => api.post('/logout'),
};

export const productsApi = {
  getAll: async () => {
    const { data } = await api.get('/products');
    return data.items;
  },
  getOne: async (slug: string) => {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  },
};

export const cartApi = {
  get: async () => {
    const { data } = await api.get('/cart');
    return data;
  },
  addItem: async (productId: string, quantity: number) => {
    const { data } = await api.post('/cart/items', { productId, quantity });
    return data;
  },
  updateQuantity: async (itemId: string, quantity: number) => {
    const { data } = await api.put(`/cart/items/${itemId}`, { quantity });
    return data;
  },
  removeItem: async (itemId: string) => {
    await api.delete(`/cart/items/${itemId}`);
  },
};