import axios from 'axios';
const axiosInstance = axios.create({baseURL: 'https://encora-backend.herokuapp.com/'});
export default axiosInstance;