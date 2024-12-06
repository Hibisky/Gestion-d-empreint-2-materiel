import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ContactPage from '@/views/ContactPage.vue';
import FAQ from '@/views/FAQPage.vue';
import Aide from '@/views/AboutPage.vue';
import InscriptionPage from '@/views/FormulaireInscription.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/contact', name: 'ContactPage', component: ContactPage },
  { path: '/faq', name: 'FAQPage', component: FAQPage },
  { path: '/aide', name: 'AboutPage', component: AboutPage },
  { path: '/inscription', name: 'FormulaireInscription', component: FormulaireInscription },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
