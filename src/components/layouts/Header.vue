<template>
  <header class="main-header">
    <!-- Logo à gauche -->
    <div class="logo-container">
      <img :src="require('@/assets/images/logoDessin1.png')" alt="Logo" class="logo" />
    </div>

    <!-- Menu de navigation -->
    <nav class="nav-center">
      <!-- Liens pour les non-connectés -->
      <router-link v-if="!user" to="/" class="navbar-item">Accueil</router-link>
      <router-link v-if="!user" to="/faq" class="navbar-item">FAQ</router-link>
      <router-link v-if="!user" to="/help" class="navbar-item">Support</router-link>
      <router-link v-if="!user" to="/about" class="navbar-item">À propos</router-link>
      <router-link v-if="!user" to="/devices" class="navbar-item">Appareils Disponibles</router-link>

      <!-- Liens pour les utilisateurs connectés -->
      <router-link v-if="user" to="/profile" class="navbar-item">Profil</router-link>
      <router-link v-if="user" to="/my-reservations" class="navbar-item">Mes Réservations</router-link>
      <router-link v-if="user" to="/add-device" class="navbar-item">Ajouter un Appareil</router-link>
      <router-link v-if="user" to="/devices" class="navbar-item">Appareils Disponibles</router-link>
      <router-link v-if="user" to="/all-reservations" class="navbar-item">Toutes les Réservations</router-link>
      <router-link v-if="user" to="/manage-users" class="navbar-item">Gestion des utilisateurs</router-link>
    </nav>

    <!-- Boutons de connexion ou déconnexion -->
    <div class="right-container">
      <!-- Déconnexion -->
      <button v-if="user" class="button is-danger" @click="logout">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        <span>Déconnexion</span>
      </button>

      <!-- Connexion -->
      <router-link v-if="!user" to="/auth" class="button is-primary">
        Connexion
      </router-link>
    </div>
  </header>
</template>

<script>
import { auth } from '@/router/firebase';

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
        // Rediriger vers la page des appareils si l'utilisateur est connecté
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
  background-color: #f8f9fa;
  color: #333;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ddd;
}

.logo-container {
  flex: 1;
}

.logo {
  width: 50px;
  height: auto;
}

.nav-center {
  display: flex;
  gap: 20px;
}

.navbar-item {
  color: #007bff;
  font-weight: bold;
  transition: color 0.3s;
}

.navbar-item:hover {
  color: #0056b3;
}

.right-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.button {
  font-weight: bold;
  transition: background-color 0.3s;
}

.button.is-primary:hover {
  background-color: #0056b3;
}

.button.is-danger:hover {
  background-color: #d9534f;
}

button .icon {
  margin-right: 5px;
}
</style>
