<template>
    <Layout>
      <h1>404 - Page non trouvée</h1>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <router-link to="/">Retour à l'accueil</router-link>
    </Layout>
  </template>
  
  <script>
  import Layout from '@/components/Layout.vue';
  
  export default {
    name: 'NotFound',
    components: {
      Layout,
    },
  };
  </script>
  