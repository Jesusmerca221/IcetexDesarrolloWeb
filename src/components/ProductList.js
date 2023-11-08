import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart }) {
  return (
    <div className="row" id="productos-container">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductList;
