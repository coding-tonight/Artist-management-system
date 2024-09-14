import axios from "axios";


console.log(import.meta.env.VITE_API_URL)
export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        "Content-Type": 'Application/json'
    }
})


API.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


API.interceptors.response.use((response) => {
return response;
}, (error) =>  {
return Promise.reject(error);
});
