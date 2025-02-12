import axios from 'axios';

// Updated API URL to match your API's base URL.
const API_URL = 'https://localhost:7167/api/user';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const getPendingAdmins = async () => {
    const headers = getAuthHeader();
    const response = await axios.get(`${API_URL}/pendingAdmins`, { headers });
    return response.data;
};

export const approveAdmin = async (id) => {
    const headers = getAuthHeader();
    const response = await axios.put(`${API_URL}/approveAdmin/${id}`, {}, { headers });
    return response.data;
};

export const rejectAdmin = async (id) => {
    const headers = getAuthHeader();
    const response = await axios.delete(`${API_URL}/rejectAdmin/${id}`, { headers });
    return response.data;
};
