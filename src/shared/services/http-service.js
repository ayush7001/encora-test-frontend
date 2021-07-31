import axios from 'axios';
const axiosInstance = axios.create({baseURL: 'http://encora-backend.herokuapp.com/'});
export default axiosInstance;