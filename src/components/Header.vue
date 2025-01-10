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
    <!-- Boutons à droite -->
    <div class="button-container">
      <router-link to="/formulaire" class="signup-button">S'inscrire</router-link>
      <router-link to="/Login" class="login-button">Connexion</router-link>
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
  color: #333;
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
  color: #007BFF;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-center a:hover {
  color: #0056b3;
}

.button-container {
  flex: 1; /* Espace occupé par les boutons à droite */
  display: flex;
  justify-content: flex-end; /* Aligner les boutons à droite */
  gap: 15px; /* Espacement entre les boutons */
}

.signup-button,
.login-button {
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.signup-button:hover,
.login-button:hover {
  background-color: #0056b3;
}
</style>
