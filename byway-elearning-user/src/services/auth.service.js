import apiInstance from '../utils/axios';

export const authService = {
    login: async (credentials) => {
        const response = await apiInstance.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData) => {
        const response = await apiInstance.post('/auth/register', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('userToken');
        window.location.href = '/signin';
    },

    getCurrentUser: async () => {
        const response = await apiInstance.get('/auth/current');
        return response.data;
    },
};