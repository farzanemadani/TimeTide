import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        title:"Home",
      },
      // route level code-splitting
      // this generates a separate chunk (Home.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta:{
        title:"Dashboard",
      },
      // route level code-splitting
      // this generates a separate chunk (Dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Dashboard.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      meta:{
        title:"Weather",
      },
      // route level code-splitting
      // this generates a separate chunk (Weather.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Weather.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      meta:{
        title:"Todo List",
      },
      // route level code-splitting
      // this generates a separate chunk (Todo.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Todo.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta:{
        title:"My Profile",
      },
      // route level code-splitting
      // this generates a separate chunk (Profile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Profile.vue')
    },
  ]
})
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title === 'Home' ? 'Home' : `Home | ${to.meta.title} `;
  next();
})
export default router