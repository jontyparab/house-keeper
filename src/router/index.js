import { createRouter, createWebHashHistory } from 'vue-router'

import Auth from '../views/Auth.vue'
// import WorkerForm from '../views/WorkerForm.vue'
// import UserForm from '../views/UserForm.vue'
import WorkersList from '../views/WorkerList.vue'
// import WorkerDetails from '../views/WorkerDetails.vue'
import About from '../views/About.vue'
import store from '../store'

const WorkerForm = () => import('../views/WorkerForm.vue')
const UserForm = () => import('../views/UserForm.vue')
const WorkerDetails = () => import('../views/WorkerDetails.vue')

const routes = [
  { path: '/', redirect: { name: 'Auth' } },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { requiresUnauth: false }
  },
  {
    path: '/workerslist',
    name: 'WorkersList',
    component: WorkersList,
  },
  {
    path: '/workerdetails/:id',
    name: 'WorkerDetails',
    component: WorkerDetails,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/workerdetails/:id/hire',
    name: 'HireForm',
    component: UserForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/user', name: 'UserForm', component: UserForm, meta: { requiresAuth: true }

  },

  {
    path: '/worker', name: 'WorkerForm', component: WorkerForm, meta: { requiresAuth: true }

  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(function (to, _, next) {
  if (!store.getters.isLoggedIn) {
    store.dispatch('tryLogin');
  }

  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next({ name: 'Auth' });
  } else if (to.meta.requiresUnauth && store.getters.isLoggedIn) {
    next({ name: 'WorkerList' });
  } else {
    next();
  }
})

export default router
