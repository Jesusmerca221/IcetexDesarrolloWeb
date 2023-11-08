import React from 'react';
import { Link } from 'react-router-dom'; // Importa la función Link de react-router-dom
import NavBar from '../components/Navbar';
import "./App.css";


function Index() {
  return (
    
    <div className="container mt-4">
      
      <h1>Bienvenido a Total Sport</h1>
      <section>
        <h2>¿Quiénes Somos?</h2>
        <p>Somos una tienda deportiva dedicada a ofrecer una amplia gama de productos y equipos deportivos de alta calidad. Nuestra pasión es ayudar a los entusiastas del deporte a encontrar todo lo que necesitan para su actividad deportiva favorita. Con años de experiencia en la industria, estamos comprometidos a brindar un excelente servicio y productos de primera clase a nuestros clientes.</p>
      </section>
      <section>
        <h2>Contacto</h2>
        <p>Si deseas ponerte en contacto con nosotros, puedes hacerlo a través de los siguientes medios:</p>
        <ul>
          <li><strong>Teléfono:</strong> +123 456 789</li>
          <li><strong>Correo Electrónico:</strong> info@totalsport.com</li>
          <li><strong>Dirección:</strong> Calle Deportiva #123, Ciudad Deportiva</li>
        </ul>
      </section>
      <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
      <NavBar />
    </div>
    
    
  );
}

export default Index;
