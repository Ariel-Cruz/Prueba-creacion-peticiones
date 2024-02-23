import React, { useState } from 'react';
import './Formulario.css'; // Importa el archivo CSS

function Formulario() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [contenidos, setContenidos] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Titulo:', titulo);
    console.log('Descripcion:', descripcion);
    console.log('Requisitos:', requisitos);
    console.log('Contenidos:', contenidos);
  };

  const opcionesDropdown = ['Opción 1', 'Opción 2', 'Opción 3'];

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="titulo" className="label">Título:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion" className="label">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="requisitos" className="label">Requisitos:</label>
        <input
          type="text"
          id="requisitos"
          value={requisitos}
          onChange={(e) => setRequisitos(e.target.value)}
          className="input"
        />
      </div>
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-button">
          {selectedOption ? selectedOption : 'Seleccione categoría'}
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {opcionesDropdown.map((option, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleOptionClick(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="contenidos" className="label">Contenido del curso:</label>
        <textarea
          id="contenidos"
          value={contenidos}
          onChange={(e) => setContenidos(e.target.value)}
          className="textarea"
        />
      </div>
    </form>
  );
}

export default Formulario;

