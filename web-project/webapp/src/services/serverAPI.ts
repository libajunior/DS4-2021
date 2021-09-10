import axios from 'axios';

const serverAPI = axios.create({
    baseURL: 'http://localhost:3333'
})

export default serverAPI;
