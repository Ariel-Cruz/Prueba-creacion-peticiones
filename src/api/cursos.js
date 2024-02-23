import axios from 'axios';

export const getCursosRequests = async () => await axios.get('/cursos');

export const createCursosRequests = async (curso) => await axios.post('/cursos', curso)