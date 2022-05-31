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

    updateAlbum(album,userId){
        return http.put("/album",{userId:userId,album:album});
    }

    getAlbumById(albumId,userId){
        return http.get("/album/"+albumId,{params:{userId:userId}})
    }

}

export default new AlbumDataService()
