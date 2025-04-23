import axios from 'axios';

//Base URL's
const BASE_URL = 'https://meta-blog-api-2n32.onrender.com/api';
const AUTH_URL = `${BASE_URL}/auth`;

//create axios instance
const api = axios.create({
    baseURL: BASE_URL,
});

//Use axios interceptors to include token with requests passing in config as a parameter.
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
}, (error) => Promise.reject(error));

//Now for the Authentication i.e login and signup, using credentials as a parameter.
export const authService = {
    login: async(credentials) => {
        //TRY creating a variable called response and AWAIT api.posting the user credentials and return the response
        try{
            const response = await api.post(`${AUTH_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Login failed', success: false};
        }
    },

    signup: async(userData) => {
        //TRY creating a variable
        try{
            const response = await api.post(`${AUTH_URL}/register`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Registration failed', success: false};
        }
    },
};

export default api;