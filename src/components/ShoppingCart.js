import React from 'react';

function ShoppingCart({ cart, onRemoveFromCart, onCheckout }) {
  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div id="carrito" className="mt-4">
      <h2>Carrito de compras</h2>
      <ul className="list-group">
        {cart.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.nombre} x{item.cantidad} - ${item.precio * item.cantidad}
            <button
              className="btn btn-danger eliminar-del-carrito"
              onClick={() => onRemoveFromCart(item)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button className="btn btn-success" onClick={onCheckout}>
        Comprar
      </button>
    </div>
  );
}

export default ShoppingCart;
