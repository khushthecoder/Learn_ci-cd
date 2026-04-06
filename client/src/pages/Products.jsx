import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { productsApi } from '../api/products';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'T-Shirts', value: 'tshirt' },
  { label: 'Shirts', value: 'shirt' },
  { label: 'Hoodies', value: 'hoodie' },
];

const titleFor = (cat) => {
  const match = filters.find((f) => f.value === cat);
  return match && match.value !== 'all' ? match.label : 'All Products';
};

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    productsApi
      .list(activeCategory)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleFilter = (value) => {
    if (value === 'all') setSearchParams({});
    else setSearchParams({ category: value });
  };

  if (error) {
    return (
      <div className="products-page">
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-page-header">
        <h1 className="products-page-title">{titleFor(activeCategory)}</h1>
        <p className="products-page-count">
          {loading ? 'Loading...' : `${products.length} items`}
        </p>
      </div>

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-btn ${activeCategory === f.value ? 'active' : ''}`}
            onClick={() => handleFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading text="Loading products..." />
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
