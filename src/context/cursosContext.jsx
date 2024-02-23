import { useState, createContext, useContext, useEffect } from 'react';
import { getCursosRequests, createCursosRequests } from '../api/cursos';

const cursosContext = createContext()

export const useCursos = () => {
    const context = useContext(cursosContext)
    return context
}

export const CursosProvider = ({children}) => {

    const [cursos, setCursos] = useState([]);

    const getCursos = async () => {
        const res= await getCursosRequests()
        setCursos(res.data)
        console.log(res.data)
    }

    const createCursos = async (curso) => {
        const res = await createCursosRequests(curso)
        setCursos([...cursos, res.data])
    }

    useEffect(() => {
        getCursos()
    }, [])

    return (
        <cursosContext.Provider value={{cursos, getCursos, createCursos}}>
            {children}
        </cursosContext.Provider>
    )

    
}
