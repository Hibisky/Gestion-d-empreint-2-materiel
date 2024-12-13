<template>
  <header class="main-header">
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
    <nav>
      <router-link to="/" v-if="!user">Connexion</router-link>
      <router-link to="/profile" v-if="user">Profil</router-link>
      <router-link to="/reservation" v-if="user">Réservation</router-link>
      <router-link to="/home" v-if="!user">Accueil</router-link>
      <router-link to="/add-device" v-if="user">Ajouter un Appareil</router-link>

      
      <!-- Image pour déconnexion -->
      <img 
        v-if="user" 
        src="@/assets/logout.png" 
        alt="Déconnexion" 
        class="logout-icon" 
        @click="logout" 
      />
    </nav>
  </header>
</template>

<script>
import { auth } from '../firebase';

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
    });
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push('/'); // Rediriger vers la page de connexion
      });
    },
  },
};
</script>

<style scoped>
.main-header {
  background-color: #F8F8FF;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 50px;
  height: auto;
}

nav {
  display: flex;
  gap: 15px;
  align-items: center;
}

.logout-icon {
  width: 30px;
  height: 30px;
  cursor: pointer; /* Curseur main sur l'image */
  transition: opacity 0.3s; /* Animation lors du survol */
}

.logout-icon:hover {
  opacity: 0.8; /* Effet visuel au survol */
}
</style>
