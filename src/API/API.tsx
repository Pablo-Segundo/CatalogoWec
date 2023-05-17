import axios from 'axios';

const baseURL = 'https://testapi.wapizima.com/api';

const API = axios.create({baseURL});

export default API;