<template>
  <div id="app">
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

    <!-- Contenu principal -->
    <main class="section">
      <div class="container">
        <!-- Composants Vue -->
        <div class="box">
          <HelloWorld msg="Bienvenue sur votre application Vue.js" />
        </div>
        <div class="box">
          <AuthExample />
        </div>
        <div class="box">
          <FirestoreExample />
        </div>
      </div>
    </main>

    <!-- Pied de page -->
    <footer>
      <div class="footer-section">
        <h4>LOCAMAT</h4>
        <p>Dernier Blog Post</p>
        <p>
          Qui sommes nous ? LocaMat est une entreprise qui prête à ses collaborateurs tout type
          d'équipement, souris, claviers, écrans, casques, etc...
        </p>
      </div>
      <div class="footer-section">
        <h4>Produits</h4>
        <ul>
          <li>Produit1</li>
          <li>Produit2</li>
          <li>Produit3</li>
          <li>Produit4</li>
          <li>Produit5</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Départements</h4>
        <ul>
          <li>Dépt1</li>
          <li>Dépt2</li>
          <li>Dépt3</li>
          <li>Dépt4</li>
          <li>Dépt5</li>
        </ul>
      </div>
      <div class="footer-bottom">
        <p>© 2023 — 2024 Contrat — Privé</p>
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

<style scoped>
/* Styles spécifiques à ce composant */
/* Ajuste l'espacement des sections */
.section {
  margin-top: 20px;
}

/* Style des boîtes */
.box {
  margin-bottom: 20px;
}
</style>
