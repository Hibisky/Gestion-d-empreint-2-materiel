<template>
  <div class="hello m'hammed">
    <h1>{{ msg }}</h1>
    <p>coucou </p>
    <img src="@/assets/images/vague.png" alt="Logo" class="logo" />
    <h1>{{ msg }}</h1>
    <p>
        Home Page a faire 
    </p>
    
  </div>
</template>

<script>
import { auth } from "../firebase"; // Importez Firebase depuis votre fichier firebase.js

export default {
  name: "HomePage",
  props: {
    msg: String,
  },
  mounted() {
    // Ajouter un écouteur pour la fermeture de la page
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  beforeUnmount() {
    // Nettoyer l'écouteur pour éviter des fuites de mémoire
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  methods: {
    handleBeforeUnload(event) {
      // Déconnecter l'utilisateur Firebase avant de fermer la page
      auth
        .signOut()
        .then(() => {
          console.log("Utilisateur déconnecté automatiquement.");
        })
        .catch((error) => {
          console.error("Erreur lors de la déconnexion :", error);
        });

      // Optionnel : Ajouter un message d'avertissement pour la fermeture
      event.preventDefault();
      event.returnValue = "";
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
