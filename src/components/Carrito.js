import React from 'react';

function Carrito({ carrito, comprarCarrito }) {
  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.map((producto, index) => (
          <li key={index}>{producto.nombre} - ${producto.precio}</li>
        ))}
      </ul>
      <button className="btn btn-success" onClick={comprarCarrito}>Comprar</button>
    </div>
  );
}

export default Carrito;
