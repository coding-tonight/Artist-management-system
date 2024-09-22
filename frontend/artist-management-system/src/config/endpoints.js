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
    getArtistWithId: (_, id) => {
        return API.get(`artist/${id}/`)
    },
    createArtist: (data) =>  {
       return API.post(`artist/`, data)
    },
    updateArtist: (data, id) => {
       return API.put(`artist/${id}/`, data)
    },
    getArtistsListWithoutPagination: () => {
        return API.get('artist/')
    },
    getArtistRecord: (page, id) => {
        return API.get(`artist/record/${id}/?page=${page}`)
    }
}

const UserEndpoints = {
    getUser: (page) => {
        return API.get(`user/?page=${page}`)
    },
    createUser: (data) =>  {
        return API.post(`user/`, data)
    },
    updateUser: (data, id) => {
        return API.put(`user/${id}/`, data)
    },
    getUserWithId: (_, id) => {
        return API.get(`user/${id}/`)
    },
}

export { AuthEndpoints, ArtistEndpoints, UserEndpoints }