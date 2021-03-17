import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      // allowed to all users
      isAuthenticated: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      allowUnauthenticated: true,
    },
  },
  {
    path: '/register',
    name: 'Signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue'),
    meta: {
      allowUnauthenticated: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize, allowUnauthenticated } = to.meta;
  const currentUser = store.getters.getProfile;
  const { isAuthenticated } = store.getters;
  if (!isAuthenticated && !allowUnauthenticated) {
    // not logged in so redirect to login page with the return url
    return next({ path: '/login' });
  }
  if (authorize) {
    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: '/' });
    }
  }
  return next();
});

export default router
