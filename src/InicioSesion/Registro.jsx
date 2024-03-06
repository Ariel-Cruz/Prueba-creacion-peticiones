import { useState } from 'react';
import { Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
import axios from 'axios';
function Registro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const registroData = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contrasena: contrasena,
            direccion: direccion,
            fechaNacimiento: fechaNacimiento,
            imagen: imagen
        }

        axios.post ("http://localhost:4000/usuarios", registroData)
        .then(response => {
            console.log("Usuario registrado: ",response.data);

            // Guardar los datos del usuario en localStorage
            //localStorage.setItem('usuario', JSON.stringify(registroData));

            setNombre('');
            setApellido('');
            setCorreo('');
            setContrasena('');
            setDireccion('');
            setFechaNacimiento('');
            setImagen(null);

            // Redirigir al perfil del usuario
            //history.push('/perfil');
        })
        .catch(error => {
            console.error("Error al registrar usuario: ",error);
        })
    }



  const getPasswordStrength = (password) => {
    // Lógica para calcular la fortaleza de la contraseña (puede ser una implementación más compleja)
    return password.length >= 8 ? 'Fuerte' : 'Débil';
  };

  const getPasswordColor = (password) => {
    const strength = getPasswordStrength(password);
    if (strength === 'Fuerte') {
      return 'green';
    } else {
      return password.length > 0 ? 'yellow' : 'red';
    }
  };

  return (
    <div className="registro-container">
      <div className="container-fluid">
        <form className="formulario" onSubmit={handleSubmit} style={{backgroundColor: loginTheme.backgroundColor, color: loginTheme.color }}>
          <h3 className="titulo">Registrarse</h3>
          <br />
          <Link to="/" className="link" title="Home"><img src={logo} alt="Registrarse Imagen" className="logo" /></Link>
          <br />
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    className="form"
                    placeholder="Nombre:"
                    type="text"
                    id="name"
                    name="name"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    className="form"
                    placeholder="Apellido:"
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    className="form"
                    placeholder="Correo Electrónico:"
                    type="correo"
                    id="correo"
                    name="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className="form"
                    placeholder="Fecha de Nacimiento:"
                    type="date"
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    className="form"
                    placeholder="Dirección:"
                    type="direccion"
                    id="direccion"
                    name="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className="form"
                    placeholder="Contraseña:"
                    type="contrasena"
                    id="contrasena"
                    name="contrasena"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                  <div
                    className="password-strength"
                    style={{ backgroundColor: getPasswordColor(contrasena) }}
                  >
                    Fortaleza de la contraseña: {getPasswordStrength(contrasena)}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="fileInput">Subir RSH y Certificado de Estudios:</label>
                  <input
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    accept=".pdf, image/*" // Opcional: especifica el tipo de archivos permitidos
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <Link to="/perfil" >
          <button type="submit" className="botonRegister">
            Registrarse
          </button>
          </Link>
          <br />
          <a className="text" href="#" onClick={() => console.log('Ir a login')}>
            ¿Ya tiene una cuenta? Ingrese
          </a>
        </form>
      </div>
    </div>
  );
}

export default Registro;