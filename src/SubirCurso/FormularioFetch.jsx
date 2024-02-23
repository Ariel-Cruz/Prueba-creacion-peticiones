import React, { useState } from 'react';
import axios from 'axios'; // Importa axios para realizar la solicitud POST

const CursoForm = () => {
  const [nombreCurso, setNombreCurso] = useState('');
  const [categoria, setCategoria] = useState('');
  const [profesor, setProfesor] = useState('');
  const [duracion, setDuracion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const cursoData = {
      nombreCurso: nombreCurso,
      categoria: categoria,
      profesor: profesor,
      duracion: duracion
    };

    // Realiza la solicitud POST utilizando axios
    axios.post("http://localhost:4000/cursos", cursoData)
      .then(response => {
        console.log('Curso creado:', response.data);
        // Limpiar los campos del formulario después de enviar el curso
        setNombreCurso('');
        setCategoria('');
        setProfesor('');
        setDuracion('');
      })
      .catch(error => {
        console.error('Hubo un problema al enviar el curso:', error);
      });
  };

  return (
    <div>
      <h2>Formulario de Nuevo Curso</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre del Curso:
            <input type="text" value={nombreCurso} onChange={(e) => setNombreCurso(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Categoría:
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Profesor:
            <input type="text" value={profesor} onChange={(e) => setProfesor(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Duración:
            <input type="text" value={duracion} onChange={(e) => setDuracion(e.target.value)} />
          </label>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CursoForm;
