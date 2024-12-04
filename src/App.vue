<template>
  <div id="app">
    <!-- Header -->
    <header class="navbar is-primary">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img alt="Vue logo" src="./assets/logo.png" style="height: 40px;">
        </a>
        <a class="navbar-item has-text-white" href="#">Accueil</a>
        <a class="navbar-item has-text-white" href="#about">À propos</a>
        <a class="navbar-item has-text-white" href="#contact">Contact</a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="section">
      <div class="container">
        <h1 class="title has-text-centered">Bienvenue dans votre application Vue.js</h1>
        <p class="subtitle has-text-centered">
          Profitez des fonctionnalités suivantes :
        </p>

        <!-- Vue components -->
        <div class="box">
          <HelloWorld msg="Welcome to Your Vue.js App" />
        </div>
        <div class="box">
          <AuthExample />
        </div>
        <div class="box">
          <FirestoreExample />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Mon Site</strong> - Créé avec Vue.js et Bulma. &copy; 2024.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import AuthExample from './components/AuthExample.vue';
import FirestoreExample from './components/FirestoreExample.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    AuthExample,
    FirestoreExample,
  },
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

/* Ajuste les marges et l'espacement */
.section {
  margin-top: 20px;
}

.box {
  margin-bottom: 20px;
}
</style>