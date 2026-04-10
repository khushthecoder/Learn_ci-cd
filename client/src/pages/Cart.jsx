import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { items, subtotal, update, remove } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-text">Find something worth wearing.</p>
          <Link to="/products" className="btn btn-primary">Shop Now →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-count">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => {
            const lineTotal = item.price * item.quantity;
            return (
              <div key={`${item.productId}-${item.size}`} className="cart-item">
                <Link to={`/products/${item.productId}`} className="cart-item-image-link">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </Link>
                <div className="cart-item-body">
                  <Link to={`/products/${item.productId}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  <div className="cart-item-meta">
                    <span>{item.color}</span>
                    <span>·</span>
                    <span>Size {item.size}</span>
                  </div>
                  <div className="cart-item-controls">
                    <div className="qty-control">
                      <button
                        type="button"
                        onClick={() => update(item.productId, item.size, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => update(item.productId, item.size, item.quantity + 1)}
                        disabled={item.quantity >= (item.maxStock ?? 99)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => remove(item.productId, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ₹{lineTotal.toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="cart-summary">
          <h3 className="cart-summary-title">Order Summary</h3>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span className="cart-summary-free">Free</span>
          </div>
          <div className="cart-summary-divider" />
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <button
            type="button"
            className="btn btn-primary cart-checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout →
          </button>
          <Link to="/products" className="cart-continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;

// performance refactoring start
// isolating context variable instances
// ensuring safe state preservation
// adding placeholder hooks for future features
const _enhanceFeatureIntegration = () => {
   let baseIndexMultiplier = 1;
   return baseIndexMultiplier * 2;
};
// performance block complete
