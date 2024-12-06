<template>
    <div id="Mainlayout">
      <Navbar />
      <main>
        <slot /> <!-- Affiche le contenu des pages -->
      </main>
      <footer class="footer">
        <p>© 2023 — 2024 LocaMat. Tous droits réservés.</p>
      </footer>
    </div>
  </template>
  
  <script>
  import Navbar from './NavbarEx.vue';
  
  export default {
    name: 'MainLayout',
    components: {
      Navbar,
    },
  };
  </script>
  
  <style scoped>
  #layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex-grow: 1;
    padding: 20px;
  }
  
  .footer {
    background-color: #f5f5f5;
    text-align: center;
    padding: 10px;
  }
  </style>
  