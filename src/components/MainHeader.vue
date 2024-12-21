<template>
  <div class="main-header">
    <img src="@/assets/images/locamat.png" alt="Logo" class="logo" />

    <div class="header-actions">
      <button @click="goToProfile" v-if="user">Profil</button>
      <button @click="logout" v-if="user">Déconnexion</button>
    </div>

    <!-- Sidebar Toggle Button -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      ☰
    </button>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <button class="close-sidebar" @click="toggleSidebar">✖</button>
      <nav>
        <router-link to="/home" v-if="user">Accueil</router-link>
        <router-link to="/devices" v-if="user">Appareils Disponibles</router-link>
        <router-link to="/add-device" v-if="user">Ajouter un Appareil</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import { auth } from '../router/firebase'; // Importer Firebase
//import { useRouter } from 'vue-router'; // Utiliser useRouter pour naviguer

export default {
  name: 'main-header',
  data() {
    return {
      user: null, // Stocker l'utilisateur connecté
      isSidebarOpen: false, // État pour ouvrir/fermer la sidebar
    };
  },
  mounted() {
    // Mettre à jour l'état de l'utilisateur en temps réel
    auth.onAuthStateChanged((currentUser) => {
      this.user = currentUser;
    });
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push('/'); // Rediriger vers la page de connexion
      });
    },
    goToProfile() {
      this.$router.push('/profile'); // Naviguer vers la page de profil
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Alterner l'état de la sidebar
    },
  },
};
</script>

<style scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  position: relative;
}

.logo {
  width: 50px;
  height: auto;
}

.header-actions {
  display: flex;
  gap: 10px;
}

button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  text-decoration: underline;
}

.sidebar-toggle {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100vh;
  background-color: #f4f4f4;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: left 0.3s ease;
  padding: 20px;
  z-index: 1000;
}

.sidebar.open {
  left: 0;
}

.close-sidebar {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

router-link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
}

router-link:hover {
  color: #42b983;
}
</style>
