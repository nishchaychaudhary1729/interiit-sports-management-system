// client/src/services/api.jsx
import axios from 'axios';

// Ensure this matches your Node.js server port (default 5000)
const API_BASE_URL = 'http://localhost:5000/api'; 

// --- PARTICIPANT API (Existing Logic) ---

export const fetchParticipants = async (searchTerm = '') => {
    try {
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

// --- NEW DASHBOARD API ---

export const fetchStandings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard/standings`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch standings.', error);
        throw error;
    }
};

export const fetchRecentResults = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard/recent-results`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch recent results.', error);
        throw error;
    }
};

// --- EVENTS API (From previous steps - for completeness) ---

export const fetchEventLookupData = async () => {
    try {
        const [events, teams, venues] = await Promise.all([
            axios.get(`${API_BASE_URL}/events/data/events-list`),
            axios.get(`${API_BASE_URL}/events/data/teams-list`),
            axios.get(`${API_BASE_URL}/events/data/venues-list`),
        ]);
        return { events: events.data, teams: teams.data, venues: venues.data };
    } catch (error) {
        console.error('API Error: Failed to fetch event lookup data.', error);
        throw error;
    }
};

export const registerIndividualEvent = async (participantId, eventId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/events/register/individual`, { participantId, eventId });
        return response.data;
    } catch (error) {
        console.error('API Error: Individual registration failed.', error.response.data);
        throw error.response.data;
    }
};

export const assignToTeam = async (participantId, teamId, role) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/events/register/team`, { participantId, teamId, role });
        return response.data;
    } catch (error) {
        console.error('API Error: Team assignment failed.', error.response.data);
        throw error.response.data;
    }
};

export const createMatch = async (matchData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/events/matches`, matchData);
        return response.data;
    } catch (error) {
        console.error('API Error: Match creation failed.', error.response.data);
        throw error.response.data;
    }
};

export const fetchMatches = async (status = 'Scheduled') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events/matches?status=${status}`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch matches.', error);
        throw error;
    }
};

export const updateMatchResult = async (matchId, resultData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/events/results/${matchId}`, resultData);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to update result.', error.response.data);
        throw error.response.data;
    }
};

export const fetchUpcomingMatches = async () => {
    try {
        // We use the same general match endpoint but request 'Scheduled' status
        const response = await axios.get(`${API_BASE_URL}/events/matches?status=Scheduled&limit=5`);
        return response.data.slice(0, 5); // Limit to top 5 results for dashboard overview
    } catch (error) {
        console.error('API Error: Failed to fetch upcoming matches.', error);
        throw error;
    }
};


// --- NEW LOGISTICS API ---

export const fetchStaffRoster = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logistics/staff`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch staff roster.', error);
        throw error;
    }
};

export const fetchRolesLookup = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logistics/data/roles-list`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch roles lookup data.', error);
        throw error;
    }
};



export const createStaffMember = async (staffData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/logistics/staff`, staffData);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to create staff member.', error.response.data);
        throw error.response.data;
    }
};



export const fetchEquipmentInventory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logistics/equipment/inventory`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch equipment inventory.', error);
        throw error;
    }
};

export const fetchEquipmentCheckouts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logistics/equipment/checkouts`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch equipment checkouts.', error);
        throw error;
    }
};

export const checkoutEquipment = async (staffId, itemId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/logistics/equipment/checkout`, { staffId, itemId });
        return response.data;
    } catch (error) {
        console.error('API Error: Checkout failed.', error.response.data);
        throw error.response.data;
    }
};

export const checkinEquipment = async (itemId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/logistics/equipment/checkin/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('API Error: Checkin failed.', error.response.data);
        throw error.response.data;
    }
};


export const fetchTransportRoutes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logistics/transport/routes`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch transport routes.', error);
        throw error;
    }
};

export const fetchTransportVehicles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logistics/transport/vehicles`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch transport vehicles.', error);
        throw error;
    }
};

export const fetchTransportSchedules = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logistics/transport/schedules`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch transport schedules.', error);
        throw error;
    }
};


export const createTransportRoute = async (routeData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/logistics/transport/routes`, routeData);
        return response.data;
    } catch (error) {
        console.error('API Error: Route creation failed.', error.response.data);
        throw error.response.data;
    }
};


export const createTransportVehicle = async (vehicleData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/logistics/transport/vehicles`, vehicleData);
        return response.data;
    } catch (error) {
        console.error('API Error: Vehicle creation failed.', error.response.data);
        throw error.response.data;
    }
};


export const createTransportSchedule = async (scheduleData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/logistics/transport/schedules`, scheduleData);
        return response.data;
    } catch (error) {
        console.error('API Error: Schedule creation failed.', error.response.data);
        throw error.response.data;
    }
};


export const fetchTransactions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/financials/transactions`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch transactions.', error);
        throw error;
    }
};

export const createTransaction = async (transactionData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/financials/transactions`, transactionData);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to create transaction.', error.response.data);
        throw error.response.data;
    }
};

export const fetchIncidents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/financials/incidents`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch incidents.', error);
        throw error;
    }
};

export const createIncident = async (incidentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/financials/incidents`, incidentData);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to create incident.', error.response.data);
        throw error.response.data;
    }
};

// --- TEAMS API ---
export const fetchInstitutes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams/institutes`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch institutes.', error);
        throw error;
    }
};

export const fetchTeamEvents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams/team-events`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch team events.', error);
        throw error;
    }
};

export const fetchParticipantsByInstitute = async (instituteId, gender = 'Mixed') => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams/participants/${instituteId}/${gender}`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch participants.', error);
        throw error;
    }
};



export const fetchTeams = async (filters = {}) => {
    try {
        const params = new URLSearchParams(filters).toString();
        const response = await axios.get(`${API_BASE_URL}/teams/teams${params ? `?${params}` : ''}`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch teams.', error);
        throw error;
    }
};


export const createTeam = async (teamData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/teams/teams`, teamData);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to create team.', error.response?.data || error);
        throw error.response?.data || error;
    }
};

export const updateTeamStatus = async (teamId, isActive) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/teams/teams/${teamId}/status`, { isActive });
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to update team status.', error);
        throw error;
    }
};
export const checkTeamExists = async (instituteId, eventId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams/teams/check/${instituteId}/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to check team.', error);
        throw error;
    }
};

export const updateTeamMembers = async (teamId, memberData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/teams/teams/${teamId}/members`, memberData);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to update team members.', error);
        throw error;
    }
};

export const fetchTeamDetails = async (teamId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams/teams/${teamId}`);
        return response.data;
    } catch (error) {
        console.error('API Error: Failed to fetch team details.', error);
        throw error;
    }
};

