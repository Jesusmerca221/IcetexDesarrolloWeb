import React, { useState, useEffect } from 'react';


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Realizar una solicitud a la API para obtener productos deportivos
    fetch('https://fakestoreapi.com/products/')
      .then((response) => response.json())
      .then((data) => {
        // Limitar la lista de productos a los primeros 10
        const first10Products = data.slice(0, 10);
        setProducts(first10Products);
      })
      .catch((error) => {
        console.error('Error al obtener datos de productos deportivos:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    // Copiar el carrito actual y agregar el nuevo producto
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    // Actualizar el estado del carrito
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (product) => {
    // Filtrar el producto del carrito
    const updatedCart = cart.filter((item) => item.id !== product.id);
    // Actualizar el estado del carrito
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const comprarCarrito = () => {
    // Lógica para procesar la compra del carrito
    if (cart.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }
  
    // Calcular el costo total del carrito
    const costoTotal = cart.reduce((total, producto) => total + producto.price * producto.quantity, 0);
  
    // Crear un objeto con la información del carrito
    const carritoInfo = {
      elementos: cart,
      precioUnitario: cart.map((producto) => producto.price),
      costoTotal,
    };
  
    // Reemplaza 'URL_DEL_SERVIDOR' con la URL real de tu servidor
    const URL_DEL_SERVIDOR = 'https://tuservidor.com/comprar';
  
    // Enviar la información al servidor
    fetch(URL_DEL_SERVIDOR, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carritoInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Compra realizada. Gracias por tu compra.');
        setCart([]); // Vacía el carrito después de la compra
      })
      .catch((error) => {
        console.error('Error al procesar la compra:', error);
        alert('Hubo un error al procesar la compra. Por favor, inténtalo nuevamente.');
      });
  };
  

  // Resto de tu código...

return (
  <div className="container mt-4">
    <h1>Bienvenido, [Nombre de Usuario]</h1>
    <div className="row" id="productos-container">
    {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Precio: ${product.price.toFixed(2)}</p>
                <p className="card-text">Descripción: {product.description}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
    <form className="mt-4">
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Buscar productos" />
      </div>
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
    <div className="mt-4">
      <h2>Carrito de compras</h2>
      <ul className="list-group">
        {cart.map((product) => (
          <li key={product.id} className="list-group-item">
            {product.title} x{product.quantity} - ${product.price.toFixed(2)}{' '}
            <button className="btn btn-danger" onClick={() => handleRemoveFromCart(product)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal().toFixed(2)}</p>
      <button className="btn btn-success" onClick={comprarCarrito}>
        Comprar
      </button>
    </div>
  </div>
);

}

export default App;

