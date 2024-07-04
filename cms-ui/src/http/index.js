import axios from "axios";
import { toast } from "react-toastify";
import { readFromStorage } from "../lib";
const http = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_BASE_URL,
});
http.interceptors.request.use(
  (config) => {
    const token = readFromStorage('user-token')
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
);

http.interceptors.response.use(


  (resp) => {

    if ('message' in resp?.data){
        toast.success(resp.data.message)
    }
    return resp;
  },
  
  (err) => {
    if ("message" in err?.response.data) {
  
      toast.error(err.response.data.message);
    }
    return Promise.reject(err);
  },


);
export default http;
