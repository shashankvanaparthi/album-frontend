import http from "../http-common";

class ArtistDataService{
    getAllArtistForUser(userId){
        return http.get("/artist/user/all",{params:{userId:userId}})
    }

    saveArtistForUser(userId,artist){
        return http.post("/artist/user",{userId:userId,artist:artist})
    }

}

export default new ArtistDataService()