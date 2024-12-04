<template>
  <div id="app">
    <!-- Header -->
    <header class="navbar is-primary">
      <div>
    <!-- Barre de navigation -->
    <header class="navbar is-primary">
      <!-- Logo à gauche -->
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img alt="Vue logo" src="./assets/locamat.png" style="height: 40px;">
        </a>
      </div>

      <!-- Menu centré -->
      <div class="navbar-menu is-active">
        <div class="navbar-start" style="margin: auto;">
          <a class="navbar-item has-text-white" href="#">Accueil</a>
          <a class="navbar-item has-text-white" href="#aide">Aide</a>
          <a class="navbar-item has-text-white" href="#faq">FAQ</a>
          <a class="navbar-item has-text-white" href="#contact">À propos</a>
        </div>
      </div>

      <!-- Bouton "S'inscrire" à droite -->
      <div class="navbar-end">
        <div class="navbar-item">
          <a class="button is-light is-outlined" href="#inscription">
            S'inscrire
          </a>
        </div>
      </div>
    </header>
  </div>
    </header>

    <!-- Main Content -->
    <main class="section">
      <div class="container">

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
          <strong>Mon Site</strong> 
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