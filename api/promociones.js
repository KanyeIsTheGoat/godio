import api from "../api/api";

export const fetchPromociones = async () => {
  try {
    const response = await fetch('http://192.168.0.244:8080/api/promociones');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    throw error;
  }
};

export const createPromocion = async (promocion) => {
  try {
    const response = await api.post('/promociones', promocion);
    return response.data;
  } catch (error) {
    console.error("Error al crear promoción", error);
    throw error;
  }
};

export const fetchPromocionById = async (id) => {
  try {
    const response = await fetch('http://192.168.0.244:8080/api/promociones/${id}');
    if (!response.ok) {
      throw new Error('Error al obtener promocion con id ${id}');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener promocion con id ${id}:', error);
    throw error;
  }
};

export default { fetchPromociones, createPromocion, fetchPromocionById};