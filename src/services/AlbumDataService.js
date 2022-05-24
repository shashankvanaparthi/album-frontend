import http from "../http-common";

class AlbumDataService{
    getAllAlbums(userId){
        return http.get("/album/all",{params:{userId:userId}});
    }

    deleteAlbum(albumId){
        return http.delete("/album/"+albumId);
    }

    saveAlbum(album,userId){
        return http.post("/album",{userId:userId,album:album})
    }

    searchAlbums(searchKey,userId){
        return http.get("/album/search",{params:{userId:userId,key:searchKey}})
    }

}

export default new AlbumDataService()
