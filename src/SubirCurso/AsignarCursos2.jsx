import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AsignarCursos2() {
    const [rutas, setRutas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [rutaSeleccionada, setRutaSeleccionada] = useState(null); // Estado para almacenar la ruta seleccionada

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

    // Función para manejar la selección de una ruta
    const handleSeleccionarRuta = (id) => {
        // Realizar la solicitud GET para obtener información según el ID de la ruta
        axios.get(`http://localhost:4000/rutas/${id}`)
            .then(response => {
                // Almacena la información de la ruta seleccionada en el estado
                setRutaSeleccionada(response.data);
            })
            .catch(error => console.error('Hubo un error al obtener la información de la ruta:', error));
    };

    // Función para verificar si un curso está asociado a la ruta seleccionada
    const cursoEstaEnRuta = (cursoId) => {
        return rutaSeleccionada && rutaSeleccionada.curso.some(curso => curso._id === cursoId);
    };

    // Función para asignar un curso a la ruta seleccionada
    const asignarCursoARuta = (cursoId) => {
        if (!rutaSeleccionada) return;

        axios.put(`http://localhost:4000/asignar-curso/${rutaSeleccionada._id}`, {
            curso: [cursoId]
        })
        .then(response => {
            console.log(response.data);
            // Actualizar la información de la ruta seleccionada con el curso asignado
            setRutaSeleccionada(response.data);
        })
        .catch(error => console.error('Hubo un error al asignar el curso a la ruta:', error));
    };

// Función para eliminar un curso de la ruta seleccionada
const eliminarCursoDeRuta = (cursoId) => {
    if (!rutaSeleccionada) return;

    // Realiza la solicitud DELETE para eliminar el curso de la ruta
    axios.delete(`http://localhost:4000/quitar-curso/${rutaSeleccionada._id}`, {
        data: { curso: cursoId }
    })
    .then(response => {
        console.log(response.data);
        // Actualiza la información de la ruta seleccionada sin el curso eliminado
        setRutaSeleccionada(response.data);
    })
    .catch(error => console.error('Hubo un error al eliminar el curso de la ruta:', error));
};


    return (
        <div>
            <h1>Rutas Disponibles</h1>
            <ul>
                {rutas.map(ruta => (
                    <div key={ruta._id}>
                        <li>
                            <h2>{ruta.nombreRuta}</h2>
                            <button onClick={() => handleSeleccionarRuta(ruta._id)}>Seleccionar</button>
                        </li>
                    </div>
                ))}
            </ul>
            <h2>Cursos Disponibles</h2>
            <ul>
                {cursos.map(curso => (
                    <li key={curso._id}>
                        {curso.nombreCurso}
                        {!cursoEstaEnRuta(curso._id) ? (
                            <button onClick={() => asignarCursoARuta(curso._id)}>Asignar Curso</button>
                        ) : (
                            <button onClick={() => eliminarCursoDeRuta(curso._id)}>Eliminar Curso</button>
                        )}
                    </li>
                ))}
            </ul>
            {rutaSeleccionada && (
                <div>
                    <h2>Información de la Ruta Seleccionada</h2>
                    <p>Nombre: {rutaSeleccionada.nombreRuta}</p>
                    <ul>
                        {rutaSeleccionada.curso.map((cursoRuta, index) => (
                            <li key={index}>{cursoRuta.nombreCurso}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AsignarCursos2;