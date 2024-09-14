import { API } from "./config";

const AuthEndpoints = {
    signIn: (data) => {
         return API.post('/login/', data)
    }
}

export { AuthEndpoints }