import React, { useState } from 'react';
import Carrito from '../components/Carrito';

function App() {
  const [carrito, setCarrito] = useState([]);
  const productos = [
    { nombre: 'Producto 1', precio: 10.00, cantidadDisponible: 10 },
    // Agrega más productos aquí
  ];

  const agregarAlCarrito = (producto) => {
    if (producto.cantidadDisponible > 0) {
      setCarrito([...carrito, producto]);
      producto.cantidadDisponible--;
      mostrarCarrito();
    } else {
      alert('No hay suficiente cantidad disponible.');
    }
  };

  const mostrarCarrito = () => {
    // Tu lógica para mostrar el carrito aquí
  };

  const comprarCarrito = () => {
    // Lógica para procesar la compra del carrito
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }
     // Calcular el costo total del carrito
     const costoTotal = carrito.reduce((total, producto) => total + producto.precio, 0);

     // Crear un objeto con la información del carrito
     const carritoInfo = {
       elementos: carrito,
       precioUnitario: carrito.map(producto => producto.precio),
       costoTotal,
      };

      // Enviar la información al servidor
    fetch('URL_DEL_SERVIDOR', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carritoInfo),
    })
    .then((response) => response.json())
      .then((data) => {
        alert('Compra realizada. Gracias por tu compra.');
        setCarrito([]); // Vacía el carrito después de la compra
      })
      .catch((error) => {
        console.error('Error al procesar la compra:', error);
        alert('Hubo un error al procesar la compra. Por favor, inténtalo nuevamente.');
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* ... Código de navegación ... */}
      </nav>

      <div id="contenedorAdmin" className="container mt-4">
        <h1>Bienvenido al Panel de Administrador</h1>
        <div className="row">
          {productos.map((producto, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <img src={`producto${index + 1}.jpg`} className="card-img-top" alt={`Producto ${index + 1}`} />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">Descripción del {producto.nombre}. Cantidad disponible: <span className="cantidad-disponible">{producto.cantidadDisponible}</span></p>
                  <button className="btn btn-primary agregar-al-carrito" onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form className="mt-4">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Buscar productos" />
          </div>
          <button type="submit" className="btn btn-primary">Buscar</button>
        </form>
      </div>
       <div>
      {/* Resto del código... */}
      <Carrito carrito={carrito} comprarCarrito={comprarCarrito} />
    </div>

      <footer className="bg-dark text-light text-center py-2">
        © 2023 Total Sport
      </footer>
    </div>
    
  );
}

export default App;

