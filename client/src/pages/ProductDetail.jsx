import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { productsApi } from '../api/products';
import { useCart } from '../context/CartContext';

function stockStatus(stock) {
  if (stock === 0) return { label: 'Out of Stock', className: 'stock-out' };
  if (stock < 15) return { label: `Only ${stock} left`, className: 'stock-low' };
  return { label: `${stock} in stock`, className: 'stock-in' };
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedSize(null);
    setQuantity(0);
    setJustAdded(false);
    productsApi
      .get(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail">
        <Loading text="Loading product..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail">
        <ErrorState
          message={error || 'Product not found'}
          action={
            <button className="btn btn-secondary" onClick={() => navigate('/products')}>
              ← Back to Products
            </button>
          }
        />
      </div>
    );
  }

  const stock = stockStatus(product.stock);
  const sizes = product.size.split(',').map((s) => s.trim());
  const isOutOfStock = product.stock === 0;
  const canAdd = !isOutOfStock && selectedSize && quantity > 0;

  const handleAddToCart = () => {
    add({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      color: product.color,
      size: selectedSize,
      maxStock: product.stock,
      quantity,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const decQty = () => setQuantity((q) => Math.max(0, q - 1));
  const incQty = () => setQuantity((q) => Math.min(product.stock, q + 1));

  const handleBuyNow = () => {
    if (!canAdd) return;
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="product-detail">
      <div className="product-detail-back" onClick={() => navigate(-1)}>
        ← Back
      </div>

      <div className="product-detail-grid">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-meta">
            <div className="product-detail-meta-item">
              <span className="meta-label">Color</span>
              <span className="meta-value">{product.color}</span>
            </div>
            <div className="product-detail-meta-item">
              <span className="meta-label">Sizes</span>
              <div className="size-options">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-chip ${selectedSize === s ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(s)}
                    disabled={isOutOfStock}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="product-detail-meta-item">
              <span className="meta-label">Status</span>
              <span className={`product-detail-stock ${stock.className}`}>
                {stock.label}
              </span>
            </div>
            {!isOutOfStock && (
              <div className="product-detail-meta-item">
                <span className="meta-label">Qty</span>
                <div className="qty-control">
                  <button
                    type="button"
                    onClick={decQty}
                    disabled={quantity <= 0}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    type="button"
                    onClick={incQty}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="product-detail-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={!canAdd}
            >
              {justAdded ? '✓ Added to Cart' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleBuyNow}
              disabled={!canAdd}
            >
              Buy Now →
            </button>
          </div>
          {!isOutOfStock && !canAdd && (
            <p className="product-detail-hint">
              {!selectedSize ? 'Select a size' : 'Set quantity to continue'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
