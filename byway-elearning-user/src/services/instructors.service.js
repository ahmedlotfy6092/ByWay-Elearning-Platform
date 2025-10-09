import apiInstance from '../utils/axios';

export const instructorsService = {
    getAllInstructors: async () => {
        const response = await apiInstance.get('/instructors');
        return response.data;
    },

    getInstructorById: async (id) => {
        const response = await apiInstance.get(`/instructors/${id}`);
        return response.data;
    },

    getInstructorCourses: async (id) => {
        const response = await apiInstance.get(`/instructors/${id}/courses`);
        return response.data;
    },

    getTopInstructors: async () => {
        const response = await apiInstance.get('/instructors/top');
        return response.data;
    },

    applyAsInstructor: async (instructorData) => {
        const response = await apiInstance.post('/instructors/apply', instructorData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};