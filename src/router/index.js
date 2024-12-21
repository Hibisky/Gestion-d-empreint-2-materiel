import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase'; // Import Firebase auth
import AuthExample from '../components/AuthExample.vue';
import HomePage from '../components/HomePage.vue';
import AddDevice from '../components/AddDevice.vue';
import Device from '../components/Device.vue';
import ProfilPage from '../components/ProfilPage.vue';
import FAQPage from '../components/FAQPage.vue'; // Import du composant FAQ

// Définition des routes
const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthExample, // Page de connexion
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage, // Page d'accueil
    meta: { requiresAuth: false },
  },
  {
    path: '/faq',
    name: 'FAQPage',
    component: FAQPage, // Page FAQ
    meta: { requiresAuth: false },
  },
  { 
    path: '/add-device', 
    name: 'AddDevice', 
    component: AddDevice,
    meta: { requiresAuth: true },
  },
  { 
    path: '/devices', 
    name: 'Device', 
    component: Device, 
    meta: { requiresAuth: false },
  }, 
  {
    path: '/profil',
    name: 'Profil',
    component: ProfilPage,
    meta: { requiresAuth: true },
  },
];

// Création du routeur
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Redirection avant chaque navigation
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next('/'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  } else {
    next(); // Continuer la navigation
  }
});

export default router;
