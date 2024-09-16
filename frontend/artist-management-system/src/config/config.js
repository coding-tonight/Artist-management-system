import { useToken } from "@/hooks";
import axios from "axios";


export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        "Content-Type": 'Application/json'
    }
})


API.interceptors.request.use((config) => {
   const token = useToken()

   if(!token) return config
   
    config.headers.Authorization = `token ${token}`
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


API.interceptors.response.use((response) => {
return response;
}, (error) =>  {
return Promise.reject(error);
});
