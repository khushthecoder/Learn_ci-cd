import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2 className="cart-empty-title">Nothing to checkout</h2>
          <p className="cart-empty-text">Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">Shop Now →</Link>
        </div>
      </div>
    );
  }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const orderId = `DV-${Date.now().toString(36).toUpperCase()}`;
    const orderTotal = subtotal;
    setTimeout(() => {
      clear();
      navigate('/order-success', { state: { orderId, total: orderTotal, name: form.name } });
    }, 600);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1 className="cart-title">Checkout</h1>
        <p className="cart-count">
          {items.length} {items.length === 1 ? 'item' : 'items'} · ₹{subtotal.toLocaleString('en-IN')}
        </p>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form">
          <h3 className="checkout-section-title">Contact</h3>
          <div className="form-grid">
            <label className="form-field">
              <span>Full name</span>
              <input required value={form.name} onChange={update('name')} />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input type="email" required value={form.email} onChange={update('email')} />
            </label>
            <label className="form-field">
              <span>Phone</span>
              <input type="tel" required value={form.phone} onChange={update('phone')} />
            </label>
          </div>

          <h3 className="checkout-section-title">Shipping address</h3>
          <div className="form-grid">
            <label className="form-field form-field-full">
              <span>Street address</span>
              <input required value={form.address} onChange={update('address')} />
            </label>
            <label className="form-field">
              <span>City</span>
              <input required value={form.city} onChange={update('city')} />
            </label>
            <label className="form-field">
              <span>Pincode</span>
              <input required value={form.pincode} onChange={update('pincode')} />
            </label>
          </div>

          <h3 className="checkout-section-title">Payment</h3>
          <div className="checkout-payment-note">
            This is a demo — no real payment will be charged.
          </div>
        </div>

        <aside className="cart-summary checkout-summary">
          <h3 className="cart-summary-title">Order Summary</h3>
          <div className="checkout-summary-items">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="checkout-summary-item">
                <img src={item.image} alt={item.name} className="checkout-summary-img" />
                <div className="checkout-summary-item-body">
                  <div className="checkout-summary-item-name">{item.name}</div>
                  <div className="checkout-summary-item-meta">
                    {item.color} · {item.size} · Qty {item.quantity}
                  </div>
                </div>
                <div className="checkout-summary-item-price">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary-divider" />
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
            type="submit"
            className="btn btn-primary cart-checkout-btn"
            disabled={submitting}
          >
            {submitting ? 'Placing order...' : 'Place Order'}
          </button>
          <Link to="/cart" className="cart-continue-link">
            ← Back to Cart
          </Link>
        </aside>
      </form>
    </div>
  );
}

export default Checkout;
