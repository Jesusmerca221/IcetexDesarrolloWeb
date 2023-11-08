const products = [
    { name: 'Producto 1', price: 10.00, available: 10 },
    // Add more products here
  ];
  
  const addToCart = (name, price, available) => {
    if (available > 0) {
      setCart([...cart, { name, price }]);
      // Update the available quantity
      // You can implement this logic as needed
    } else {
      alert('No hay suficiente cantidad disponible.');
    }
  };
  