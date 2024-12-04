// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AuthExample from '../components/AuthExample.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthExample,  // Page de connexion
  },
  {
    path: '/hello-world',
    name: 'helloWorld',
    component: HelloWorld,  // Page Hello World après connexion
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
