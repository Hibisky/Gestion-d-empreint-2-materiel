<template>
    <div class="hello m'hammed">
      <h1>{{ msg }}</h1>
      <p>
        For a guide and recipes on how to configure / customize this project,<br>
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
      </p>
      <h3>Installed CLI Plugins</h3>
      <ul>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      </ul>
      <h3>Essential Links</h3>
      
    
    </div>
  </template>
  
  <script>
  import { auth } from "../firebase"; // Importez Firebase depuis votre fichier firebase.js
  
  export default {
    name: "ProfilPage",
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
  