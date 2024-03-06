import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function InicioSesion() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/login", { correo, contrasena });

            // Guardar el token de sesión en localStorage si el inicio de sesión es exitoso
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('usuario', JSON.stringify(response.data.data));
            
            console.log("token: ",response.data.token);
            console.log("Sesión iniciada: ", response.data);
            console.log("datos usuario: ",response.data.data);
            console.log("id usuario: ",response.data.data.id);
            // Establecer la variable de estado redirect en true para activar la redirección
            setRedirect(true);
        } catch (error) {
            console.error("Error al iniciar sesión: ", error);
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        }
    }

    // Redirige al usuario a la página de perfil después de iniciar sesión correctamente
    if (redirect) {
        return <Navigate to="/perfil" />;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Correo:</label>
                <input type="text" value={correo} onChange={(event) => setCorreo(event.target.value)} />

                <label>Contraseña:</label>
                <input type="password" value={contrasena} onChange={(event) => setContrasena(event.target.value)} />

                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    )
}

export default InicioSesion;
