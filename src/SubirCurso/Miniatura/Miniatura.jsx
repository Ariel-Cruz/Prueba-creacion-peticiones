import './Miniatura.css';
import React, { useState } from 'react';


function Miniatura() {
  const [miniatura, setMiniatura] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMiniatura(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="seccion-derecha">
      <h2 style={{ fontSize: 'medium', textAlign: 'left' }}>Miniatura</h2>
      {miniatura && <img src={miniatura} alt="Miniatura" style={{ maxWidth: '100%', height: 'auto' }} />}
      <div className="selectFile">
        <label htmlFor="file">Seleccionar archivo</label>
        <input type="file" name="files[]" id="file" onChange={handleFileChange} />
      </div>
      </div>
  );
}

export default Miniatura;
