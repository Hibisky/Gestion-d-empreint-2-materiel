import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../router/firebase';
//import AuthExample from '../components/AuthExample.vue';
import LoginPage from '../components/LoginPage.vue';
import HomePage from '../components/pages/HomePage.vue';
import AddDevice from '../components/AddDevice.vue';
import Device from '../components/Device.vue';
import ReservationPage from '../components/ReservationPage.vue';
import MyReservations from '../components/MyReservations.vue';
import AllReservations from "../components/AllReservations.vue";
import ProfilPage from '../components/pages/ProfilPage.vue';
import FAQPage from '../components/pages/FAQPage.vue'; // Import du composant FAQ
import SubscriptionPage from '../components/pages/SubscriptionPage.vue';
import AboutPage from '../components/pages/AboutPage.vue';
import HelpPage from '../components/pages/HelpPage.vue';

// Définition des routes
const routes = [
<<<<<<< HEAD
  { path: '/auth', name: 'auth', component: LoginPage, meta: { showFooter: true } },
  { path: '/', name: 'HomePage', component: HomePage, meta: { showFooter: true } },
  { path: '/faq', name: 'FAQPage', component: FAQPage, meta: { showFooter: true } },
  { path: '/about', name: 'AboutPage', component: AboutPage, meta: { showFooter: true } },
  { path: '/help', name: 'HelpPage', component: HelpPage, meta: { showFooter: true } },
  { path: '/add-device', name: 'AddDevice', component: AddDevice, meta: { showFooter: false } },
  { path: '/devices', name: 'Device', component: Device, meta: { showFooter: true } },
  { path: '/reservation', name: 'Reservation', component: ReservationPage, meta: { showFooter: false } },
  { path: '/my-reservations', name: 'MyReservations', component: MyReservations, meta: { showFooter: false } },
  { path: "/all-reservations", name: "AllReservations", component: AllReservations },
  { path: '/profil', name: 'Profil', component: ProfilPage, meta: { showFooter: false } },
  { path: '/subscription', name: 'SubscriptionPage', component: SubscriptionPage, meta: { showFooter: false } },
  { path: '/formulaire', name: 'Formulaire', component: SubscriptionPage }, // Formulaire d'inscription
  
=======
  {
    path: '/',
    name: 'auth',
    component: AuthExample, // Page de connexion
  },
  {
    path: '/home-page',
    name: 'HomePage',
    component: HomePage, // Page d'accueil
    meta: { requiresAuth: false }, // Cette route nécessite pas une authentification
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


>>>>>>> f7e3f53205de42590346b836cb03ba938238e1d4
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
