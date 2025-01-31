import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../router/firebase';
import LoginPage from '../components/pages/LoginPage.vue';
import HomePage from '../components/pages/HomePage.vue';
import AddDevice from '../components/pages/AddDevice.vue';
import Device from '../components/pages/Device.vue';
import ReservationPage from '../components/pages/ReservationPage.vue';
import MyReservations from '../components/pages/MyReservations.vue';
import AllReservations from "../components/pages/AllReservations.vue";
import AdminManageUsers from '@/components/pages/AdminManageUsers.vue';
import ProfilPage from '../components/pages/ProfilPage.vue';
import FAQPage from '../components/pages/FAQPage.vue';
import SubscriptionPage from '../components/pages/SubscriptionPage.vue';
import AboutPage from '../components/pages/AboutPage.vue';
import HelpPage from '../components/pages/HelpPage.vue';
import MainProfile from '@/components/pages/MainProfile.vue'; 

// Définition des routes
const routes = [
  { path: '/', name: 'HomePage', component: HomePage, meta: { showFooter: true, requiresAuth: false } },
  { path: '/auth', name: 'auth', component: LoginPage, meta: { showFooter: true } },
  { path: '/faq', name: 'FAQPage', component: FAQPage, meta: { showFooter: true } },
  { path: '/about', name: 'AboutPage', component: AboutPage, meta: { showFooter: true } },
  { path: '/add-device', name: 'AddDevice', component: AddDevice, meta: { requiresAuth: true, showFooter: false } },
  { path: '/devices', name: 'Device', component: Device, meta: { requiresAuth: false, showFooter: true } },
  { path: '/reservation', name: 'Reservation', component: ReservationPage, meta: { requiresAuth: true, showFooter: false } },
  { path: '/my-reservations', name: 'MyReservations', component: MyReservations, meta: { requiresAuth: true, showFooter: false } },
  { path: '/manage-users', name: 'AdminManageUsers', component: AdminManageUsers, meta: { requiresAuth: true, showFooter: false } },
  { path: '/all-reservations', name: 'AllReservations', component: AllReservations, meta: { requiresAuth: true } },
  { path: '/profil', name: 'Profil', component: ProfilPage, meta: { requiresAuth: true, showFooter: false } },
  { path: '/subscription', name: 'SubscriptionPage', component: SubscriptionPage, meta: { requiresAuth: false, showFooter: false } },
  { path: '/formulaire', name: 'Formulaire', component: SubscriptionPage, meta: { requiresAuth: false, showFooter: true } },
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
    next('/auth'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  } else {
    next(); // Continuer la navigation
  }
});

export default router;
