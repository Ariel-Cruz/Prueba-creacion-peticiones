import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AsignarCursoARuta() {
    const [rutas, setRutas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [routeCourses, setRouteCourses] = useState([]);

    useEffect(() => {
        // Obtener las rutas disponibles
        axios.get('http://localhost:4000/rutas')
            .then(response => setRutas(response.data))
            .catch(error => console.error('Hubo un error al obtener las rutas:', error));

        // Obtener los cursos disponibles
        axios.get('http://localhost:4000/cursos')
            .then(response => setCursos(response.data))
            .catch(error => console.error('Hubo un error al obtener los cursos:', error));
    }, []);

    useEffect(() => {
        // Obtener la lista de cursos asociados a la ruta seleccionada
        if (selectedRoute) {
            axios.get(`http://localhost:4000/rutas/${selectedRoute}`)
                .then(response => setRouteCourses(response.data))
                .catch(error => console.error('Hubo un error al obtener los cursos de la ruta:', error));
        }
    }, [selectedRoute]);

    const handleRouteChange = (event) => {
        setSelectedRoute(event.target.value);
    };

    const handleCourseSelection = (courseId) => {
        setSelectedCourses(prevCourses => {
            if (prevCourses.includes(courseId)) {
                return prevCourses.filter(id => id !== courseId);
            } else {
                return [...prevCourses, courseId];
            }
        });
    };

    const handleAssignCourses = () => {
        // Enviar la solicitud al servidor para asignar los cursos a la ruta seleccionada
        axios.put(`http://localhost:4000/asignar-curso/${selectedRoute}`, { cursos: selectedCourses })
            .then(response => console.log('Cursos asignados correctamente:', response.data))
            .catch(error => console.error('Hubo un error al asignar los cursos:', error));
    };

    return (
        <div>
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
          </div>
        ))}
      </div>
    </div>











            <h2>Asignar Cursos a Ruta</h2>
            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <label htmlFor="route">Selecciona una Ruta:</label>
                    <select id="route" value={selectedRoute} onChange={handleRouteChange}>
                        <option value="">Selecciona una Ruta</option>
                        {rutas.map(ruta => (
                            <option key={ruta._id} value={ruta._id}>{ruta.nombreRuta}</option>
                        ))}
                    </select>
                </div>
            </form>
            <div className="card">
                <div className="card-body">
                {cursos.map(curso => (
                    <div key={curso._id} className="course-card">
                        <h3>{curso.nombreCurso}</h3>
                        <p>Categoría: {curso.filtro}</p>
                        <p>Profesor: {curso.profesor}</p>
                        {routeCourses.includes(curso._id) ? (
                            <p>Este curso ya está asignado a esta ruta</p>
                        ) : (
                            <button onClick={() => handleCourseSelection(curso._id)}>
                                {selectedCourses.includes(curso._id) ? 'Quitar' : 'Asignar'}
                            </button>
                        )}
                    </div>
                ))}
                </div>

            </div>
            <button onClick={handleAssignCourses} disabled={!selectedRoute || selectedCourses.length === 0}>
                Asignar Cursos
            </button>
        </div>
    );
}

export default AsignarCursoARuta;
