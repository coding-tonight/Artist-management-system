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
        return API.get(`artist/song/${id}/?page=${page}`)
    },
    delete: (id) => {
        return API.delete(`artist/${id}/`)
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
        return API.patch(`user/${id}/`, data)
    },
    getUserWithId: (_, id) => {
        return API.get(`user/${id}/`)
    },
    delete: (id) => {
        return API.delete(`user/${id}/`)
    }
}

const SongEndpoints = {
    getSongs: (page) => {
      return API.get(`song/?page=${page}`)
    },
    getSongWithId: (_, id) => {
        return API.get(`song/${id}/`,)
      },
    createSong: (data) => {
      return API.post('song/', data)
    },
    updateSong: (data, id) => {
        return API.put(`song/${id}/`, data)
    },
    delete: (id) => {
         return API.delete(`song/${id}/`)
    }
}

export { AuthEndpoints, ArtistEndpoints, UserEndpoints, SongEndpoints }