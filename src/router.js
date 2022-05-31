import { createWebHistory, createRouter } from "vue-router";
import {isUsersLogged} from "./services/UserAuthenticationService";
const routes =  [

 {
    path: "/user/:id",
    name: "userhome",
    component: () => import("./views/UserHomeScreen.vue"),
    props:true
  },
  {
    path: "/album/:id",
    name: "album",
    component: ()=> import("./views/TrackList.vue"),
    props:true
  },

  {
    path: "/create",
    name: "create",
    component:()=>import("./views/CreateView.vue")
  },
  {
    path: "/createAlbum",
    name: "createAlbum",
    component: ()=> import("./views/CreateAlbum.vue")
  },
  {
    path: "/createTrack",
    name: "createTrack",
    component: ()=> import("./views/CreateTrack.vue")
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  console.log(to.name);
  if(isUsersLogged() && to.name=="home"){
      console.log("redirecting")
      const userId = localStorage.userId
      return "/user/"+userId;
  }
  return true
})

export default router;