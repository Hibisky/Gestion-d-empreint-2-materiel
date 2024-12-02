import { createApp } from 'vue'
import App from './App.vue'

//Import librairie bulma
import 'bulma/css/bulma.css'

import { db, auth } from './firebase.js'; //import firebase

const app = createApp(App);

//ajouter firebase à l'instance Vue si nécessaire

app.config.globalProperties.$db = db;
app.config.globalProperties.$auth=auth;

app.mount('#app');
