// client/src/services/api.js
import axios from 'axios';

// Ensure this matches your Node.js server port (default 5000)
const API_BASE_URL = 'http://localhost:5000/api'; 

export const fetchParticipants = async (searchTerm = '') => {
    try {
        // Build the URL with the search term if it exists
        const url = searchTerm 
            ? `${API_BASE_URL}/participants?search=${encodeURIComponent(searchTerm)}` 
            : `${API_BASE_URL}/participants`;
            
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch participants.', error);
        throw error;
    }
};

export const fetchParticipantLookupData = async () => {
    try {
        // Fetches Institutes, Hostels, and Messes
        const response = await axios.get(`${API_BASE_URL}/participants/data/lookup`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch lookup data.', error);
        throw error;
    }
};

export const createParticipant = async (participantData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/participants`, participantData);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to create participant.', error.response.data);
        throw error.response.data;
    }
};

