import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ContactPage from '@/views/ContactPage.vue';
import FAQPage from '@/views/FAQPage.vue';
import AboutPage from '@/views/AboutPage.vue';
import FormulaireInscription from '@/views/FormulaireInscription.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/contact', name: 'ContactPage', component: ContactPage },
  { path: '/faq', name: 'FAQPage', component: FAQPage },
  { path: '/aide', name: 'AboutPage', component: AboutPage },
  { path: '/inscription', name: 'FormulaireInscription', component: FormulaireInscription },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

