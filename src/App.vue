<template>
  <div id="app">
    <!-- Le header global -->
    <MainHeader />

    <!-- Le composant qui affichera la vue selon la route active -->
    <router-view />

    <!-- Afficher le footer uniquement si la route ne l'exclut pas -->
    <FooterPage />
  </div>
</template>



<style>
nav {
  display: flex;
  gap: 20px;
}
</style>


<script>
import { defineComponent } from 'vue';
import MainHeader from '@/components/layouts/Header.vue'; // Importez le composant Header
//import MainHeader from '@/components/MainHeader.vue';
import FooterPage from '@/components/layouts/FooterPage.vue'; // Importez le composant Footer

export default defineComponent({
  name: 'App',
  components: {
    MainHeader, // Déclarez le composant Header
    FooterPage, // Déclarez le composant Footer
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

header {
  font-size: 16px;
  text-align: left;
  padding: 10px;
  background-color: #42b983;
  color: white;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

router-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

router-link:hover {
  text-decoration: underline;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the app takes up the full viewport height */
}

router-view {
  flex: 1; /* Allows the main content to grow and push the footer down */
}

footer {
  text-align: center;
  background-color: #333;
  color: white;
  padding: 20px;
}

</style>
