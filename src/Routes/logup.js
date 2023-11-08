import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Importa la función Link de react-router-dom
import NavBar from '../components/Navbar';
import "./App.css";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      userInfo: null, // Estado para almacenar la información del usuario
    };
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    // Limpiar mensajes de error anteriores
    this.setState({
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    });

    const { email, password, confirmPassword } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

    // Validar el correo electrónico
    if (!emailRegex.test(email)) {
      this.setState({ emailError: 'Ingrese un correo electrónico válido.' });
      return;
    }

    // Validar la longitud de la contraseña
    if (password.length < 8) {
      this.setState({ passwordError: 'La contraseña debe tener al menos 8 caracteres.' });
      return;
    }

    // Validar la coincidencia de la contraseña
    if (password !== confirmPassword) {
      this.setState({ confirmPasswordError: 'Las contraseñas no coinciden.' });
      return;
    }

    // Realizar la solicitud POST para el registro
    try {
      const response = await fetch('Registro', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // La solicitud de registro se realizó correctamente, puedes manejar la respuesta del servidor aquí.
        
        // Realizar una solicitud GET para obtener información del usuario después del registro
        const userInfoResponse = await fetch('URL_DEL_SERVIDOR_USUARIO', {
          method: 'GET',
          // Puedes agregar parámetros de consulta si es necesario
        });

        if (userInfoResponse.ok) {
          const userInfoData = await userInfoResponse.json();
          // Almacena la información del usuario en el estado userInfo
          this.setState({ userInfo: userInfoData });
        } else {
          // Manejar errores de la solicitud GET para obtener información del usuario
        }
      } else {
        // Manejar errores de la solicitud de registro (por ejemplo, correo electrónico ya registrado)
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      // Manejar errores de red o del servidor
    }
  };

  render() {
   

    return (
      <div className="container mt-4">
        <h1>Registro</h1>
        <form onSubmit={this.handleFormSubmit} method="POST" action="URL_DEL_SERVIDOR">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email" // Nombre del campo para el servidor
              placeholder="Ingrese su correo electrónico"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <small className="error-msg">{this.state.emailError}</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password" // Nombre del campo para el servidor
              placeholder="Ingrese su contraseña"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <small className="error-msg">{this.state.passwordError}</small>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              name="confirmPassword" // Nombre del campo para el servidor
              placeholder="Confirme su contraseña"
              value={this.state.confirmPassword}
              onChange={(e) => this.setState({ confirmPassword: e.target.value })}
            />
            <small className="error-msg">{this.state.confirmPasswordError}</small>
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </form>
        <p>
          ¿Ya tienes una cuenta? <a href="Login">Inicia Sesión</a>
        </p>
        <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
      <NavBar />
      </div>
    );
  }
}

export default RegistrationForm;


