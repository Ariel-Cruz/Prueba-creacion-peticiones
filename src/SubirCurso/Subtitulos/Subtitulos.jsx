import './Subtitulos.css';

import React from 'react';

function Subtitulos () {
    return (
        <><h4 style={{ textAlign: 'left' }}>Añadir subtítulos</h4><div className="selectFile">
            <label htmlFor="file">Seleccionar archivo</label>
            <input type="file" name="files[]" id="file" />
        </div></>
    )
}

export default Subtitulos;