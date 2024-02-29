
//import SubirCurso from  './SubirCurso/SubirCurso'
//import FormularioFetch from './SubirCurso/FormularioFetch'

import { Route, Routes } from 'react-router-dom'
import { CursosProvider } from './context/cursosContext.jsx'
import FetchCursos from './SubirCurso/FetchCursos.jsx'
import FormularioFetch from './SubirCurso/FormularioFetch.jsx'
import FetchRutas from './SubirCurso/FetchRutas.jsx'
import AsignarCursoFetch from './SubirCurso/AsignarCursoFetch.jsx'
import AsignarCursos2 from './SubirCurso/AsignarCursos2.jsx'

function App() {
  return (

    <div className='bg-neutral-900 min-h-screen flex items-center'>
      <div className='px-10 container m-auto'>
        <CursosProvider>
          <Routes>
              <Route path="/" element={<FetchRutas />} />
              <Route path="/asignar-curso" element={<AsignarCursoFetch />} />
              <Route path="subir-curso" element={<FormularioFetch />}/>
              <Route path="/cursos" element={<FetchCursos />} />
              <Route path="/rutas" element={<FetchRutas />} />
              <Route path="/asignar" element={<AsignarCursos2 />} />
          </Routes>
        </CursosProvider>
      </div>    
    </div>

  )
}

export default App
