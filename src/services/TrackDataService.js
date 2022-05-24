import http from "../http-common";

class TrackDataService{

    saveTrack(track,albumId){
        return http.post("/track",{albumId:albumId,track:track})
    }

    getAllTracks(albumId){
        return http.get("/track/all",{params:{albumId:albumId}});
    }

    deleteTrack(trackId){
        return http.delete("/track/"+trackId);
    }

}

export default new TrackDataService();