<template>
  <div>
    <h1>Profil de l'utilisateur</h1>
    <p>Nom : {{ user?.displayName || 'Nom non disponible' }}</p>
    <p>Email : {{ user?.email || 'Email non disponible' }}</p>
  </div>
</template>

<script>
import { auth } from '../firebase';

export default {
  name: 'Profile',
  data() {
    return {
      user: auth.currentUser, // Récupérer l'utilisateur connecté
    };
  },
};
</script>
