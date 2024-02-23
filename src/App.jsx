
//import SubirCurso from  './SubirCurso/SubirCurso'
//import FormularioFetch from './SubirCurso/FormularioFetch'

import { Route, Routes } from 'react-router-dom'
import { CursosProvider } from './context/cursosContext.jsx'
import FetchCursos from './SubirCurso/FetchCursos.jsx'
import FormularioFetch from './SubirCurso/FormularioFetch.jsx'

function App() {
  return (

    <div className='bg-neutral-900 min-h-screen flex items-center'>
      <div className='px-10 container m-auto'>
        <CursosProvider>
          <Routes>
              <Route path="/" element={<FetchCursos />} />
              <Route path="subir-curso" element={<FormularioFetch />}/>
          </Routes>
        </CursosProvider>
      </div>    
    </div>

  )
}

export default App
