import http from "../http-common";

class UserDataService{
    login(data){
        return http.post("/login",data);
    }

    signup(data){
        return http.post("/signup",data);
    }
}

export default new UserDataService()
