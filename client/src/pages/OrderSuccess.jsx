import { Link, Navigate, useLocation } from 'react-router-dom';

function OrderSuccess() {
  const { state } = useLocation();

  if (!state || !state.orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="order-success-icon">✓</div>
        <h1 className="order-success-title">Order placed</h1>
        <p className="order-success-subtitle">
          Thanks{state.name ? `, ${state.name.split(' ')[0]}` : ''} — your order is confirmed.
        </p>

        <div className="order-success-meta">
          <div className="order-success-meta-row">
            <span className="meta-label">Order ID</span>
            <span className="order-success-code">{state.orderId}</span>
          </div>
          <div className="order-success-meta-row">
            <span className="meta-label">Total</span>
            <span className="order-success-total">
              ₹{Number(state.total || 0).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <p className="order-success-note">
          We&rsquo;ll send shipping updates to your email. (Demo — no real payment charged.)
        </p>

        <Link to="/products" className="btn btn-primary">Continue Shopping →</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;

// minor update
