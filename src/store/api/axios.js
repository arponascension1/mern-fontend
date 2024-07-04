import axios from 'axios';

const instance = axios.create({
    baseURL: '/api/', // Adjust this URL to your backend server's URL
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    withCredentials: true, // Include credentials (cookies) with requests
});

export default instance;