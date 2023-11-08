import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa la función Link de react-router-dom
import NavBar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userInfo, setUserInfo] = useState(null); // Estado para almacenar la información recibida

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Limpiar errores anteriores
    setEmailError('');
    setPasswordError('');

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!emailRegex.test(email)) {
      setEmailError('Ingrese un correo electrónico válido.');
      return;
    }

    // Validación de contraseña
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Realizar la solicitud POST al servidor para iniciar sesión
    try {
      const response = await fetch('LOGIN', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // La solicitud de inicio de sesión se realizó correctamente, puedes manejar la respuesta del servidor aquí.
        // Después de iniciar sesión, puedes realizar una solicitud GET para obtener información adicional.
        const userInfoResponse = await fetch('URL_DEL_SERVIDOR_USUARIO', {
          method: 'GET',
          // Puedes agregar parámetros de consulta si es necesario
        });

        if (userInfoResponse.ok) {
          const data = await userInfoResponse.json();
          // Almacena la información del usuario en el estado userInfo
          setUserInfo(data);
        } else {
          // Manejar errores de la solicitud GET para obtener información del usuario
        }
      } else {
        // Manejar errores de la solicitud de inicio de sesión (por ejemplo, credenciales incorrectas)
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      // Manejar errores de red o del servidor
    }
  };

  useEffect(() => {
    // Puedes realizar otras acciones cuando se reciba la información en userInfo
    if (userInfo) {
      // Realizar acciones con la información, por ejemplo, redirigir al usuario a otra página
    }
  }, [userInfo]);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Iniciar Sesión</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small className="error-msg" id="email-error">{emailError}</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <small className="error-msg" id="password-error">{passwordError}</small>
        </div>
      </form>
      <p className="mt-3 text-center">¿No tienes una cuenta? <a href="Logup">Regístrate</a></p>
      <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
      <NavBar />
    </div>
    
  );
};

export default Login;

