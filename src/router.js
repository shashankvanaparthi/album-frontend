import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/user/:id",
    name: "userhome",
    component: () => import("./views/UserHomeScreen.vue"),
    props:true
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;