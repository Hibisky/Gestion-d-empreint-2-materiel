<template>
  <div id="app">
    <router-view /> <!-- Affiche la page courante -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Styles globaux */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
