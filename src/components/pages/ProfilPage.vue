<template>
  <div class="profil-container">
    <h1>Profil Utilisateur</h1>

    <!-- Informations Utilisateur -->
    <div class="profil-info">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Nom complet:</strong> {{ user.fullName }}</p>
      <p><strong>Rôle:</strong> {{ user.role }}</p>
      <p><strong>Adresse:</strong> {{ user.address }}</p>
    </div>

    <!-- Bouton pour changer le mot de passe -->
    <button @click="showPasswordChangeForm = true">Changer le mot de passe</button>

    <!-- Formulaire de changement de mot de passe -->
    <div v-if="showPasswordChangeForm" class="password-change-form">
      <h2>Changer votre mot de passe</h2>
      <form @submit.prevent="changePassword">
        <label for="old-password">Ancien mot de passe:</label>
        <input type="password" v-model="oldPassword" required /><br />

        <label for="new-password">Nouveau mot de passe:</label>
        <input type="password" v-model="newPassword" required /><br />

        <label for="confirm-password">Confirmer le nouveau mot de passe:</label>
        <input type="password" v-model="confirmPassword" required /><br />

        <button type="submit">Mettre à jour</button>
      </form>
      <button @click="showPasswordChangeForm = false">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Informations de l'utilisateur
      user: {
        username: "Utilisateur123",
        email: "utilisateur@example.com",
        fullName: "Jean Dupont",
        role: "Utilisateur",
        address: "123 rue Exemple, Paris"
      },
      // Variables pour la gestion du mot de passe
      showPasswordChangeForm: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  methods: {
    // Méthode pour changer le mot de passe
    changePassword() {
      if (this.newPassword === this.confirmPassword) {
        // Logique pour mettre à jour le mot de passe (par exemple, via une API)
        // Exemple d'appel API fictif :
        // this.$axios.post('/update-password', { oldPassword: this.oldPassword, newPassword: this.newPassword })
        alert("Mot de passe mis à jour avec succès !");
        this.showPasswordChangeForm = false;
      } else {
        alert("Les mots de passe ne correspondent pas.");
      }
    }
  }
};
</script>

<style scoped>
.profil-container {
  max-width: 600px;
  margin: 30px auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

.profil-info {
  margin-bottom: 20px;
}

.profil-info p {
  margin: 10px 0;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

.password-change-form {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.password-change-form input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.password-change-form button {
  background-color: #008CBA;
}

.password-change-form button:hover {
  background-color: #007B9E;
}
</style>
