<template>
  <header class="main-header">
    <!-- Logo à gauche -->
    <div class="logo-container">
      <img :src="require('@/assets/images/logoDessin1.png')" alt="Logo" class="logo" />
    </div>

    <!-- Liens centrés -->
    <nav class="nav-center">
      <!-- Liens pour les non-connectés -->
      <router-link v-if="!user" to="/">Accueil</router-link>
      <router-link v-if="!user" to="/faq">FAQ</router-link>
      <router-link v-if="!user" to="/help">Support</router-link>
      <router-link v-if="!user" to="/about">À propos</router-link>

      <!-- Liens pour les utilisateurs connectés -->
      <router-link v-if="user" to="/profile">Profil</router-link>
      <router-link v-if="user" to="/reservation">Réservation</router-link>
      <router-link v-if="user" to="/add-device">Ajouter un Appareil</router-link>
      <router-link v-if="user" to="/devices">Appareils Disponibles</router-link>
    </nav>

    <!-- Déconnexion ou boutons de connexion -->
    <div class="right-container">
      <!-- Image de déconnexion -->
      <img
        v-if="user"
        :src="require('@/assets/images/logout.png')"
        alt="Déconnexion"
        class="logout-icon"
        @click="logout"
      />

      <!-- Boutons pour les non-connectés -->
      <div v-if="!user">
        <router-link to="/auth" class="login-button">Connexion</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { auth } from '../../router/firebase';

export default {
  name: 'MainHeader',
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    // Mettre à jour l'état de l'utilisateur en temps réel
    auth.onAuthStateChanged((currentUser) => {
      this.user = currentUser;
      if (this.user) {
        // Si l'utilisateur est connecté, rediriger vers la page des appareils
        this.$router.push('/devices');
      }
    });
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push('/'); // Rediriger vers la page d'accueil après déconnexion
      });
    },
  },
};
</script>

<style scoped>
.main-header {
  background-color: #F8F8FF;
  color: #333;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.right-container {
  flex: 1; /* Espace pour la zone à droite */
  display: flex;
  justify-content: flex-end; /* Placer les éléments à droite */
  align-items: center;
}

.logout-icon {
  width: 60px;
  height: auto;
  cursor: pointer;
}

.login-button {
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
