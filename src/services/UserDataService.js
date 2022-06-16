import http from "../http-common";

class UserDataService{
    login(data){
        return http.post("/login",data);
    }

    signup(data){
        return http.post("/signup",data);
    }

    getUser(userId){
        return http.get("/user/"+userId);
    }

    updateUser(user){
        return http.put("/user/"+user.id,{user:user})
    }

    forgotPassword(email){
        return http.post("/user/forgotpassword",{email:email});
    }

    verifyAndUpdatePassword(user){
        return http.post("/user/verifyandupdatePassword",{user:user});
    }

}

export default new UserDataService()
