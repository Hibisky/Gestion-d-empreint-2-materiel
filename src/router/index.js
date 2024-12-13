import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: { template: '<div>Page d\'accueil</div>' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
