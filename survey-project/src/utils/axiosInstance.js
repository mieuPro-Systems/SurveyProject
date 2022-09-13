import axios from "axios";
const axiosInstance = axios.create({ baseURL: "https://fafaco.herokuapp.com" });
export default axiosInstance;
