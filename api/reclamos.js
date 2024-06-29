import api from "../api/api";

export const fetchReclamos = async () => {
  try {
    const response = await fetch('http://192.168.0.18:8080/api/reclamos');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reclamos:', error);
    throw error;
  }
};

export const createReclamo = async (reclamo) => {
  try {
    const response = await api.post('/reclamo', reclamo);
    return response.data;
  } catch (error) {
    console.error("Error creating reclamo", error);
    throw error;
  }
};

export const fetchReclamoById = async (id) => {
  try {
    const response = await fetch('http://192.168.0.18:8080/api/reclamos/${id}');
    if (!response.ok) {
      throw new Error(`Failed to fetch reclamo with id ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching reclamo with id ${id}:`, error);
    throw error;
  }
};

export default { fetchReclamos, createReclamo, fetchReclamoById };
