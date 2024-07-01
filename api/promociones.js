import api from "../api/api";

export const fetchPromociones = async () => {
  try {
    const response = await fetch('http://192.168.0.244:8080/api/promociones');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching promociones:', error);
    throw error;
  }
};

export const createPromocion = async (promocion) => {
  try {
    const response = await api.post('/promociones', promocion);
    return response.data;
  } catch (error) {
    console.error("Error creating promoción", error);
    throw error;
  }
};

export const fetchPromocionById = async (id) => {
  try {
    const response = await fetch('http://192.168.0.18:8080/api/promociones/${id}');
    if (!response.ok) {
      throw new Error('Failed to fetch promocion with id ${id}');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching promoción with id ${id}:', error);
    throw error;
  }
};

export default { fetchPromociones, createPromocion, fetchPromocionById};