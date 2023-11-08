import React, { Component } from 'react';

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
      registrationSuccess: false, // Para manejar el estado de registro exitoso
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    // Clear previous error messages
    this.setState({
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    });

    const { email, password, confirmPassword } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

    // Validate email
    if (!emailRegex.test(email)) {
      this.setState({ emailError: 'Ingrese un correo electrónico válido.' });
      return; // Detener el proceso si hay un error de validación
    }

    // Validate password length
    if (password.length < 8) {
      this.setState({ passwordError: 'La contraseña debe tener al menos 8 caracteres.' });
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      this.setState({ confirmPasswordError: 'Las contraseñas no coinciden.' });
      return;
    }

    // Enviar la información al servidor
    fetch('https://tu-servidor.com/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Enviar el correo y la contraseña
    })
      .then((response) => response.json())
      .then((data) => {
        // Verificar la respuesta del servidor, aquí puedes ajustar según la respuesta
        if (data.success) {
          this.setState({
            registrationSuccess: true, // Marcar el registro como exitoso
          });
        } else {
          // Manejar posibles errores de registro desde el servidor
          // Puedes mostrar un mensaje de error o tomar medidas adecuadas.
        }
      })
      .catch((error) => {
        console.error('Error al procesar el registro:', error);
        // Puedes manejar errores de red o del servidor aquí
      });
  };

  render() {
    if (this.state.registrationSuccess) {
      // Si el registro es exitoso, puedes mostrar un mensaje o redirigir al usuario a otra página.
      return (
        <div className="container mt-4">
          <h1>Registro Exitoso</h1>
          <p>Tu registro ha sido exitoso. Puedes iniciar sesión con tu nueva cuenta.</p>
        </div>
      );
    }

    return (
      <div className="container mt-4">
        <h1>Registro</h1>
        <form onSubmit={this.handleFormSubmit}>
          {/* ... Resto del formulario sin cambios ... */}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;