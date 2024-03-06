import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModificarRuta.css';
import { Link } from 'react-router-dom';



function ModificarRuta() {
  const [rutas, setRutas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);
  const [nombreRuta, setNombreRuta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mostrarRutas, setMostrarRutas] = useState(false); // Estado para controlar la visibilidad de las rutas

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

  const handleSeleccionarRuta = (id) => {
    axios.get(`http://localhost:4000/rutas/${id}`)
      .then(response => {
        setRutaSeleccionada(response.data);
        console.log(response.data);
        setMostrarRutas(false); // Ocultar las rutas después de seleccionar una
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


  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleGuardarCambios = () => {
    // Realizar una solicitud PUT para actualizar la ruta seleccionada con los nuevos valores
    axios.put(`http://localhost:4000/rutas/${rutaSeleccionada._id}`, {
      nombreRuta: nombreRuta,
      descripcion: descripcion
    })
    .then(response => {
      console.log(response.data);
      // Actualizar la información de la ruta seleccionada con los nuevos valores
      setRutaSeleccionada(response.data);
      window.location.reload();
    })
    .catch(error => console.error('Hubo un error al actualizar la ruta:', error));
  };

  return (
    <div className="mc-container">
      <h2 className='tituloFormularioSubida'>Modificar Categoría</h2>
      <form className='contenedorFormulario' onSubmit={handleSubmit}>
        <div className='descripcionFormulario'>
          <div className='textoFormulario'>
          <div >
              <select onChange={(e) => handleSeleccionarRuta(e.target.value)}>
                <option value="">Selecciona una ruta</option>
                {rutas.map(ruta => (
                  <option key={ruta._id} value={ruta._id}>{ruta.nombreRuta}</option>
                ))}
              </select>
            </div>
            <h2>Modificar Ruta: {rutaSeleccionada ? rutaSeleccionada.nombreRuta : ''}</h2>
            <input
              placeholder='Nombre Ruta'
              type="text"
              value={rutaSeleccionada ? rutaSeleccionada.nombreRuta : ''}
              onChange={(e) => setNombreRuta(e.target.value)}
              className="input"
            />
            <input
              placeholder='Descripcion Ruta'
              type="text"
              value={rutaSeleccionada ? rutaSeleccionada.descripcion : ''}
              onChange={(e) => setDescripcion(e.target.value)}
              className="input"
            />

            <div className='cursosDisponibles'>
              <h2>Cursos Disponibles</h2>
              <div className="cardsContainer">
                {cursos.map(curso => (
                  <div key={curso._id} className="card">
                    <h3>{curso.nombreCurso}</h3>
                    <p>{curso.descripcion}</p>
                    <div className="buttonContainer">
                      {!cursoEstaEnRuta(curso._id) ? (
                        <button onClick={() => asignarCursoARuta(curso._id)}>Asignar Curso</button>
                      ) : (
                        <button onClick={() => eliminarCursoDeRuta(curso._id)}>Eliminar Curso</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
          <div className="descripcionFormulario">
            <table className='tablaFormulario'>
              <tbody>
                <tr>
                  <td>
                    <select className='selectButtonFormulario'>
                      <option value="">Selecciona un color</option>
                      <option value="Rojo">Rojo</option>
                      <option value="Azul">Azul</option>
                      <option value="Verde">Verde</option>
                      <option value="Amarillo">Amarillo</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button className='buttonForm'>Seleccionar Archivo</button>
                    <input type="file" style={{ display: 'none' }} />
                  </td>
                  <td><p className='labelFormulario'>Certificado Final</p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='PrevisualizacionFormulario'>
          <h3>{rutaSeleccionada ? rutaSeleccionada.nombreRuta : ''}</h3>
          <button type="submit" className='buttonSubir' onClick={handleGuardarCambios}><span>Guardar Cambios</span></button>
          <button className='buttonEliminar'>Eliminar Ruta</button>
        </div>
      </form>
      <Link to="/rutas"><button>Volver</button></Link>
    </div>
  );
}

export default ModificarRuta;
