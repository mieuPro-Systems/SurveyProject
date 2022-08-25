import axios from "axios";
const axiosInstance = axios.create({ baseURL: "http://192.168.0.171:5000" });
export default axiosInstance;
