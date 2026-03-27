import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const close = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={close}>
          Veloura
        </Link>
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={close}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => `cart-link ${isActive ? 'active' : ''}`}
              onClick={close}
              aria-label="Cart"
            >
              <span className="cart-icon">🛒</span>
              <span>Cart</span>
              {count > 0 && <span className="cart-badge">{count}</span>}
            </NavLink>
          </li>
        </ul>
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

// minor update
