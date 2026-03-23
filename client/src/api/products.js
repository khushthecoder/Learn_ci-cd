import { api } from './client';

export const productsApi = {
  list: (category) => {
    const qs = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    return api.get(`/api/products${qs}`);
  },
  get: (id) => api.get(`/api/products/${id}`),
};

// minor update
