import apiInstance from '../utils/axios';

export const coursesService = {
    getAllCourses: async (params = {}) => {
        const response = await apiInstance.get('/courses', { params });
        return response.data;
    },

    getCourseById: async (id) => {
        const response = await apiInstance.get(`/courses/${id}`);
        return response.data;
    },

    getCoursesByCategory: async (categoryId) => {
        const response = await apiInstance.get(`/courses/category/${categoryId}`);
        return response.data;
    },

    getPopularCourses: async () => {
        const response = await apiInstance.get('/courses/popular');
        return response.data;
    },

    enrollInCourse: async (courseId) => {
        const response = await apiInstance.post(`/courses/${courseId}/enroll`);
        return response.data;
    },

    getEnrolledCourses: async () => {
        const response = await apiInstance.get('/courses/enrolled');
        return response.data;
    }
};