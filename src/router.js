import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    name: "home",
    component: () => import("./views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/LoginScreen.vue"),
    props:true
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("./views/SignupScreen.vue"),
    props:true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;