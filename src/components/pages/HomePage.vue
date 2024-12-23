<template>
  <div class="home-page">


    <!-- Message principal -->
    <section class="main-info">
      <h2>{{ msg }}</h2>
      <p>Bienvenue sur la page d'accueil !</p>
      <img src="@/assets/images/vague.png" alt="Logo" class="logo" />
      <p>Cette page est en cours de construction. Plus d'informations à venir.</p>
    </section>

    <!-- Footer -->
    <footer>
      <p>&copy; 2024 Mon Site Web. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script>
import { auth } from "../../router/firebase"; // Importation de Firebase

export default {
  name: "HomePage",
  props: {
    msg: String,
  },
  data() {
    return {
      images: [
        { src: require("@/assets/images/image1.png"), alt: "Image 1" },
        { src: require("@/assets/images/image2.png"), alt: "Image 2" },
        { src: require("@/assets/images/image3.png"), alt: "Image 3" },
      ],
    };
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
      // Message de confirmation avant de quitter
      const confirmationMessage = "Êtes-vous sûr de vouloir quitter sans sauvegarder vos modifications ?";
      
      // Déclenche un message de confirmation dans les navigateurs modernes
      event.returnValue = confirmationMessage; 

      // Optionnel: Déconnecter l'utilisateur Firebase
      auth
        .signOut()
        .then(() => {
          console.log("Utilisateur déconnecté automatiquement.");
        })
        .catch((error) => {
          console.error("Erreur lors de la déconnexion :", error);
        });

      // La ligne suivante est redondante et peut être supprimée
      // return confirmationMessage;
    },
  },
};
</script>

<style scoped>
.home-page {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}

header h1 {
  color: #333;
}

.carousel {
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin-top: 30px;
}

.carousel-item {
  flex: 0 0 100%;
  transition: transform 0.5s ease;
}

.carousel-item img {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-info {
  margin-top: 40px;
}

.main-info h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.main-info p {
  font-size: 1.2rem;
  color: #555;
}

.logo {
  width: 150px;
  margin-top: 20px;
}

footer {
  margin-top: 40px;
  padding: 10px;
  background-color: #333;
  color: white;
}

footer p {
  margin: 0;
}
</style>
