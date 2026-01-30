import axios from "axios";

// The base URL for your API
const API_URL = "https://shop-manager-q9wf.onrender.com/api";

// Define what the API response looks like (based on your curl token)
export interface LoginResponse {
    user: {
        id: number;
        email: string;
        name: string;
    };
    token: string; // This is the Bearer token you'll use for other requests
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    // Note the path: /auth/login based on your curl command
    const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
    });
    return res.data;
};