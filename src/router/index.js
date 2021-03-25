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
    meta: {},
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      onlyUnauthenticated: true,
    },
  },
  {
    path: '/register',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/Signin.vue'),
    meta: {
      onlyUnauthenticated: true,
    },
  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import(/* webpackChunkName: "manage" */ '../views/Manage.vue'),
    meta: {
      authorize: ['admin'],
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize, onlyUnauthenticated } = to.meta;
  const currentUser = store.getters.getProfile;
  const { isAuthenticated } = store.getters;
  if (!isAuthenticated && !onlyUnauthenticated) {
    // not logged in so redirect to login page with the return url
    return next({ path: '/login' });
  }
  // redirect user if route is unauthenticated only
  if(isAuthenticated && onlyUnauthenticated) return next({ path: '/' });
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