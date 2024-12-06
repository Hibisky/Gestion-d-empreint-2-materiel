<template>
    <header class="navbar is-primary">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img alt="LocaMat Logo" src="@/assets/locamat.png" style="height: 40px;">
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item has-text-white" to="/">Accueil</router-link>
          <router-link class="navbar-item has-text-white" to="/help">Aide</router-link>
          <router-link class="navbar-item has-text-white" to="/faq">FAQ</router-link>
          <router-link class="navbar-item has-text-white" to="/about">À propos</router-link>
          <router-link class="navbar-item has-text-white" to="/contact">Contact</router-link>
        </div>
        <div class="navbar-end">
          <a class="button is-light is-outlined" href="#inscription">S'inscrire</a>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  .navbar {
    padding: 10px 20px;
  }
  
  .navbar-item {
    margin-right: 15px;
  }
  
  .button {
    margin-left: 10px;
  }
  </style>
  