import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CursoDetail() {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cursos/${id}`);
        setCurso(response.data);
      } catch (error) {
        console.error('Hubo un problema al obtener el curso:', error);
      }
    };

    fetchCurso();
  }, [id]);

  return (
    <div>
      <h1>Detalles del Curso</h1>
      {curso && (
        <div>
          <h2>{curso.nombreCurso}</h2>
          <p>Categoría: {curso.categoria}</p>
          <p>Profesor: {curso.profesor}</p>
          <p>Duración: {curso.duracion} horas</p>
          {/* Otros detalles del curso aquí */}
        </div>
      )}
    </div>
  );
}

export default CursoDetail;
