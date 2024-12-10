import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'; // Import du fichier CSS global
import router from './router';
import 'bulma/css/bulma.css'  //import bulma
import { db, auth } from './firebase.js'; //import firebase

const app = createApp(App);


console.log('Application is starting...');

app.mount('#app');

createApp(App).mount('#app');


app.config.globalProperties.$db = db;
app.config.globalProperties.$auth=auth;

app.use(router);





