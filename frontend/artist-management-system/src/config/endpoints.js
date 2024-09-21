import { API } from "./config";

const AuthEndpoints = {
    signIn: (data) => {
         return API.post('/login/', data)
    },
    signUP: (data) => {
      return API.post('register/', data)
    }
}

const ArtistEndpoints = {
    getArtists: (page) => {
        return API.get(`artist/?page=${page}`)
    },
    getArtistRecord: (page, id) => {
        return API.get(`artist/record/${id}/?page=${page}`)
    }
}

export { AuthEndpoints, ArtistEndpoints }