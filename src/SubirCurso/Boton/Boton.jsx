import './Boton.css';
import React, { useState } from 'react';

function Boton({ guardarArchivosSubidos }) {
  // Estado para manejar si los campos del formulario están completos o no
  const [camposCompletos, setCamposCompletos] = useState(false);

  // Función que maneja el clic del botón
  const handleClick = () => {
    // Verificar si los campos del formulario están completos
    if (camposCompletos) {
      // Simulando archivos subidos (puedes obtenerlos de alguna fuente real)
      const nuevosArchivos = ['archivo1.pdf', 'archivo2.png', 'archivo3.docx'];
      // Llamar a la función de guardarArchivosSubidos proporcionada por el componente padre
      guardarArchivosSubidos(nuevosArchivos);
      // Mostrar una alerta cuando se haga clic en el botón
      window.alert('¡Se han guardado los archivos subidos en la lista del formulario!');
    } else {
      // Mostrar una alerta indicando que los campos del formulario no están completos
      window.alert('Porfavor, complete todos los campos');
    }
  };

  return (
    <div>
      <button className="custom-button" onClick={handleClick}>
        Subir curso
      </button>
    </div>
  );
}

export default Boton;
