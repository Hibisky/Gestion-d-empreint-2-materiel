<template>
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="@/assets/locamat.png" alt="Logo LocaMat" style="height: 40px;">
        </router-link>
      </div>
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <router-link class="navbar-item has-text-white" to="/">Accueil</router-link>
          <router-link class="navbar-item has-text-white" to="/aide">About</router-link>
          <router-link class="navbar-item has-text-white" to="/faq">FAQ</router-link>
          <router-link class="navbar-item has-text-white" to="/contact">À propos</router-link>
        </div>
      </div>
      <div class="navbar-end">
        <router-link class="button is-light is-outlined" to="/inscription">
          S'inscrire
        </router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavbarEx',
  };
  </script>
  
  <style scoped>
  .navbar {
    padding: 10px 20px;
  }
  </style>
  