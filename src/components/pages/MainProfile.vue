<template>
  <div class="main-profile">
    <h1>Profil de l'utilisateur</h1>
    <div v-if="userData">
      <p><strong>Nom :</strong> {{ userData.firstName }} {{ userData.lastName }}</p>
      <p><strong>Email :</strong> {{ userData.email }}</p>
      <p><strong>Téléphone :</strong> {{ userData.phone }}</p>
      <p><strong>Code Postal :</strong> {{ userData.zipCode }}</p>
      <p><strong>Ville :</strong> {{ userData.city }}</p>
      <p><strong>Rôle :</strong> {{ userData.role }}</p>
      <p><strong>Date d'inscription :</strong> {{ userData.createdAt.toDate().toLocaleDateString() }}</p>
    </div>
    <div v-else>
      <p>Chargement des données...</p>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "@/router/firebase"; // Assurez-vous que Firebase est configuré
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "MainProfile",
  setup() {
    const userData = ref(null);
    const errorMessage = ref("");

    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Récupérer l'utilisateur connecté (peut être via Vuex ou Firebase Auth directement)

      if (user) {
        try {
          // Utiliser l'UID de l'utilisateur pour récupérer ses données dans Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // L'utilisateur existe, on récupère les données
            userData.value = userDoc.data();
          } else {
            errorMessage.value = "Utilisateur non trouvé dans la base de données.";
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error);
          errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
        }
      } else {
        errorMessage.value = "Utilisateur non connecté.";
      }
    };

    // Récupérer les données au moment de la création du composant
    fetchUserData();

    return {
      userData,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.main-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}
</style>
