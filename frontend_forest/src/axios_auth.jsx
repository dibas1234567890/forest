import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default axios; 
