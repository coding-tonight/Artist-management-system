import { useToken } from "@/hooks";
import axios from "axios";
// import { toast } from "sonner";


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
  if (error.response.status === 403) {
    window.location.href = '/permission/denied'
    // toast.error('Your do not have permission perform this task')
  }
return Promise.reject(error);
});
