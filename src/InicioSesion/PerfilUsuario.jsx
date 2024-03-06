import React, { useEffect, useState } from 'react';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLocalStorage = localStorage.getItem('usuario');
    if (usuarioLocalStorage) {
      setUsuario(JSON.parse(usuarioLocalStorage));
    }
  }, []);

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      {usuario && (
        <div>
          
          <p>Nombre: {usuario.nombre}</p>
          <p>id: {usuario.id}</p>
          <p>Apellido: {usuario.apellido}</p>
          <p>Dirección: {usuario.direccion}</p>
          <p>Fecha de Nacimiento: {usuario.fechaNacimiento}</p>
          <p>Correo Electrónico: {usuario.correo}</p>
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
