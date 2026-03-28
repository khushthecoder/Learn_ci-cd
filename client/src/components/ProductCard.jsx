import { Link } from 'react-router-dom';

function stockStatus(stock) {
  if (stock === 0) return { label: 'Out of Stock', className: 'stock-out' };
  if (stock < 15) return { label: 'Low Stock', className: 'stock-low' };
  return { label: 'In Stock', className: 'stock-in' };
}

function ProductCard({ product }) {
  const stock = stockStatus(product.stock);

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />
        <span className="product-card-category">{product.category}</span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-color">{product.color}</p>
        <div className="product-card-footer">
          <span className="product-card-price">₹{product.price.toLocaleString('en-IN')}</span>
          <span className={`product-card-stock ${stock.className}`}>{stock.label}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

// minor update
