import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { productsApi } from '../api/products';

const categories = [
  { name: 'T-Shirts', icon: '👕', slug: 'tshirt' },
  { name: 'Shirts', icon: '🎽', slug: 'shirt' },
  { name: 'Hoodies', icon: '🧥', slug: 'hoodie' },
];

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi
      .list()
      .then((data) => setFeatured(data.slice(0, 6)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">New Season Drop</div>
          <h1 className="hero-title">
            Wear the <span>Culture</span>
          </h1>
          <p className="hero-subtitle">
            Discover bold, expressive fashion built for the next generation.
            Curated drops, premium quality, unmatched style.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Shop Now →</Link>
            <Link to="/products" className="btn btn-secondary">Browse Collections</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="section-label">Categories</p>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="categories" style={{ padding: 0, margin: 0, maxWidth: 'none' }}>
          {categories.map((cat) => (
            <Link
              to={`/products?category=${cat.slug}`}
              key={cat.slug}
              className="category-card"
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="section-label">Featured</p>
          <h2 className="section-title">Trending Right Now</h2>
        </div>
        {loading ? (
          <Loading text="Loading products..." />
        ) : (
          <div className="featured-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/products" className="btn btn-secondary">View All Products →</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
