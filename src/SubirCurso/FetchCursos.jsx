import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FetchCursos() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cursos");
        setCursos(response.data);
      } catch (error) {
        console.error('Hubo un problema al obtener los cursos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cursos</h1>
      <div className='row'>
        {cursos.map((curso) => (
          <div key={curso._id} className='col mb-4'>
            <div className='card'>
              <Link to={`/curso/${curso._id}`}>
                <img src={curso.imagen?.url} alt={curso.nombreCurso} className='card-img-top' />
                <div className='card-body'>
                  <h5 className='card-title'>{curso.nombreCurso}</h5>
                  <p className='card-text'>Categoría: {curso.categoria}</p>
                  <p className='card-text'>Duración: {curso.duracion} hrs</p>
                  <p className='card-text'>Profesor a Cargo: {curso.profesor}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchCursos;
