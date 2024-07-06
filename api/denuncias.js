import api from "../api/api";

export const fetchDenuncias = async () => {
  try {
    const response = await fetch('http://192.168.0.244:8080/api/denuncias');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener denuncias:', error);
    throw error;
  }
};

export const createDenuncia = async (denuncia) => {
  try {
    const response = await api.post('/denuncias', denuncia);
    return response.data;
  } catch (error) {
    console.error("Error al crear denuncia", error);
    throw error;
  }
};

export const fetchDenunciaById = async (id) => {
  try {
    // Validar y convertir el id a BigInt si es necesario
    if (typeof id === 'string' || typeof id === 'number') {
      id = BigInt(id);
    } else if (typeof id !== 'bigint') {
      throw new Error(`Invalid id type. Expected string, number, or bigint, received ${typeof id}`);
    }

    const response = await fetch('http://192.168.0.244:8080/api/denuncias/${id}');
    if (!response.ok) {
      throw new Error('Error al obtener denuncia con id ${id}');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener denuncia con id ${id}', error);
    throw error;
  }
};

export const fetchDenunciasByUser = async (userId) => {
  try {
    const response = await axios.get(`http://192.168.0.244:8080/api/denuncias/usuario/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching denuncias", error);
    throw error;
  }
};

export default {fetchDenuncias,createDenuncia,fetchDenunciaById,fetchDenunciasByUser};