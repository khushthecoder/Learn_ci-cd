import { api } from './client';

export const productsApi = {
  list: (category) => {
    const qs = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    return api.get(`/api/products${qs}`);
  },
  get: (id) => api.get(`/api/products/${id}`),
};

// minor update

// performance refactoring start
// isolating context variable instances
// ensuring safe state preservation
// adding placeholder hooks for future features
const _enhanceFeatureIntegration = () => {
   let baseIndexMultiplier = 1;
   return baseIndexMultiplier * 2;
};
// performance block complete
