import axios from 'axios';

const baseURL = 'https://api.wapizima.com/api';

const API = axios.create({baseURL});

export default API;