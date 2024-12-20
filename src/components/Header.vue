<template>
  <header class="main-header">
    <!-- Logo à gauche -->
    <div class="logo-container">
      <img src="@/assets/logoDessin1.png" alt="Logo" class="logo" />
    </div>
    <!-- Liens centrés -->
    <nav class="nav-center">
      <router-link to="/home">Accueil</router-link>
      <router-link to="/faq">FAQ</router-link>
      <router-link to="/help">Aide</router-link>
      <router-link to="/about">À propos</router-link>
    </nav>
    <!-- Bouton à droite -->
    <div class="button-container">
      <router-link to="/signup" class="signup-button">S'inscrire</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
};
</script>

<style scoped>
.main-header {
  background-color: #F8F8FF;
  color: #333; /* Texte avec un bon contraste */
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ddd;
}

.logo-container {
  flex: 1; /* Espace occupé par le logo à gauche */
}

.logo {
  width: 50px;
  height: auto;
}

.nav-center {
  flex: 2; /* Espace au centre pour la navigation */
  display: flex;
  justify-content: center; /* Centrer les liens */
  gap: 30px; /* Espacement entre les liens */
}

.nav-center a {
  text-decoration: none;
  color: #007BFF; /* Bleu pour les liens */
  font-weight: bold;
  transition: color 0.3s;
}

.nav-center a:hover {
  color: #0056b3; /* Couleur au survol */
}

.button-container {
  flex: 1; /* Espace occupé par le bouton à droite */
  display: flex;
  justify-content: flex-end; /* Aligner le bouton à droite */
}

.signup-button {
  background-color: #007BFF; /* Couleur bleue pour le bouton */
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background-color: #0056b3; /* Couleur plus sombre au survol */
}
</style>
