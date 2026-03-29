import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const STORAGE_KEY = 'veloura:cart';
const CartContext = createContext(null);

const keyOf = (productId, size) => `${productId}::${size}`;

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { item } = action;
      const k = keyOf(item.productId, item.size);
      const existing = state.find((i) => keyOf(i.productId, i.size) === k);
      if (existing) {
        return state.map((i) =>
          keyOf(i.productId, i.size) === k
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...state, item];
    }
    case 'update': {
      const { productId, size, quantity } = action;
      if (quantity <= 0) {
        return state.filter((i) => keyOf(i.productId, i.size) !== keyOf(productId, size));
      }
      return state.map((i) =>
        keyOf(i.productId, i.size) === keyOf(productId, size) ? { ...i, quantity } : i
      );
    }
    case 'remove':
      return state.filter(
        (i) => keyOf(i.productId, i.size) !== keyOf(action.productId, action.size)
      );
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return {
      items,
      count,
      subtotal,
      add: (item) => dispatch({ type: 'add', item }),
      update: (productId, size, quantity) =>
        dispatch({ type: 'update', productId, size, quantity }),
      remove: (productId, size) => dispatch({ type: 'remove', productId, size }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
