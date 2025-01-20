<template>
  <div id="app">
    <!-- Le header global -->
    <MainHeader />
    <!-- Le composant qui affichera la vue selon la route active -->
    <router-view />
    <!-- Afficher le footer uniquement si la route ne l'exclut pas -->
    <Footer v-if="$route.meta.showFooter" />
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
<<<<<<< HEAD
import MainHeader from '@/components/layouts/Header.vue'; // Importez le composant Header
//import MainHeader from '@/components/MainHeader.vue';
=======
import MainHeader from '@/components/MainHeader.vue'; // Importez le composant Header
>>>>>>> f7e3f53205de42590346b836cb03ba938238e1d4

export default defineComponent({
  name: 'App',
  components: {
    MainHeader, // Déclarez le composant Header
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

header-side {
  font-size: 16px;
  text-align: left;
  padding: 10px;
  background-color: #42b983;
  color: white;
}

nav-side {
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
</style>
