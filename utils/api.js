const API_URL = 'https://meta-blog-api-2n32.onrender.com/api';

export const login = async(email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
            credentials: 'include',
        });

        return await response.json();
    } catch(error) {
        console.error("Login error: ", error);
        throw error;
    }
};

export const register = async(name, email, password) => {
    try {
        const response = await fetch (`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ name, email, password}),
            credentials: 'include',
        });

        return await response.json();
    } catch (error) {
        console.error("Registration error: ", error);
        throw error;
    }
};

export const getAuthenticatedFetch = (token) => {
    return async (url, options = {}) => {
        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };

        return fetch(`${API_URL}${url}`, {
            ...options,
            headers,
            credentials: 'include',
        });
    };
};