import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
        <li><Link to="/logup">Registrarse</Link></li>
      </ul>
      <footer className="bg-dark text-light text-center py-2">
        © 2023 Total Sport
      </footer>
    </nav>
  );
}

export default Navbar;
