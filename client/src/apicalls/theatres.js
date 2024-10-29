import { axiosInstance } from "./index";

const API_BASE_URL = "/api/theatres";

// Get all theatres
export const getAllTheatres = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/get-all-theatres`);
        return response.data;
    } catch (error) {
        console.error('Error fetching theatres:', error);
        throw error;
    }
};

// Get a single theatre by ID
export const getTheatreById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/theatres/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching theatre with ID ${id}:`, error);
        throw error;
    }
};

// Create a new theatre
export const addTheatre = async (theatreData) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/add-theatre`, theatreData);
        return response.data;
    } catch (error) {
        return error;
    }
};

// Update an existing theatre
export const updateTheatre = async (payload) => {
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/update-theatre`, payload);
        return response.data;
    } catch (error) {
        console.error(`Error updating theatre with ID :`, error);
        throw error;
    }
};

// Delete a theatre
export const deleteTheatre = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_BASE_URL}/delete-theatre/`, id);
        return response.data;
    } catch (error) {
        console.error(`Error deleting theatre with ID ${id}:`, error);
        throw error;
    }
};