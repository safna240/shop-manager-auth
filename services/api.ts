import axios from 'axios';

const API_BASE_URL = 'https://shop-manager-q9wf.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
    },
});

// Matches the --data-raw for Registration
export const registerUser = (data: any) => api.post('/registrations', data);

// Matches the --data-raw for Login
export const loginUser = (data: any) => api.post('/auth/login', data);

export default api;