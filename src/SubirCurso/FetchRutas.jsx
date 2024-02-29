import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AsignarCursoFetch from './AsignarCursoFetch.jsx';
function FetchRutas() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/rutas");
        setRutas(response.data);
      } catch (error) {
        console.error('Hubo un problema al obtener las rutas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Rutas de Aprendizaje</h1>
      <div className='row'>
        {rutas.map((ruta) => (
          <div key={ruta._id} className='col mb-4'>
            <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{ruta.nombreRuta}</h5>
                  <div>
                    {ruta.curso.map((cursosRuta) => (
                      <div key={cursosRuta._id}>
                        <div className='card'>
                          <img src={cursosRuta.imagen?.url} alt={cursosRuta.nombreCurso} className='card-img-top' />
                          <div className='card-body'>
                            <h5 className='card-title'>{cursosRuta.nombreCurso}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            <Link to={`/asignar`}><button>Asignar Curso a la Ruta</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchRutas;
