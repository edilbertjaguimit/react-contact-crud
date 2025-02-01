import axios from 'axios';
const baseURL = 'http://localhost:5132/api/'; // Default API base URL
// console.log('baseURL', baseURL);
console.log(import.meta.env);
console.log(import.meta.env.BASE_API_URL);
console.log(import.meta.env.BASE_TEST);
const api = axios.create({
    baseURL: baseURL, // Replace with your API base URL
    timeout: 1 * 60 * 1000, // 1 minute request timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
