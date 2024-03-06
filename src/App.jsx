
//import SubirCurso from  './SubirCurso/SubirCurso'
//import FormularioFetch from './SubirCurso/FormularioFetch'

import { Route, Routes } from 'react-router-dom'
import { CursosProvider } from './context/cursosContext.jsx'
import FetchCursos from './SubirCurso/FetchCursos.jsx'
import FormularioFetch from './SubirCurso/FormularioFetch.jsx'
import FetchRutas from './SubirCurso/FetchRutas.jsx'
import ModificarRuta from './SubirCurso/ModificarRuta.jsx'
import SubirRuta from './SubirCurso/SubirRuta.jsx'
import Registro from './InicioSesion/Registro.jsx'
import PerfilUsuario from './InicioSesion/PerfilUsuario.jsx'
import InicioSesion from './InicioSesion/InicioSesion.jsx'

function App() {
  return (

    <div className='bg-neutral-900 min-h-screen flex items-center'>
      <div className='px-10 container m-auto'>
        <CursosProvider>
          <Routes>
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/inicio-sesion" element={<InicioSesion />} />

              <Route path="/" element={<FetchRutas />} />
              <Route path="subir-curso" element={<FormularioFetch />}/>
              <Route path="/cursos" element={<FetchCursos />} />
              <Route path="/rutas" element={<FetchRutas />} />
              <Route path="/modificar" element={<ModificarRuta />} />
              <Route path="/subir-ruta" element={<SubirRuta />}/>
          </Routes>
        </CursosProvider>
      </div>    
    </div>

  )
}

export default App
