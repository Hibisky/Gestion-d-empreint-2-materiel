<template>
  <div class="subscription-container">
    <!-- Colonne gauche : Formulaire -->
    <div class="form-section">
      <h1>Créer un compte</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="firstName">Prénom :</label>
          <input type="text" id="firstName" v-model="firstName" required />
        </div>
        <div>
          <label for="lastName">Nom :</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>
        <div>
          <label for="email">Adresse E-mail :</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="confirmPassword">Confirmez le mot de passe :</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <!-- Bouton d'inscription -->
        <button type="submit">Créer un compte</button>
      </form>
    </div>

    <!-- Colonne droite : Image -->
    <div class="image-section">
      <img src="../../assets/images/image1.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }
      alert(`Compte créé pour : ${this.firstName} ${this.lastName}`);
      // Ajoutez ici la logique pour gérer l'inscription (ex. Firebase Auth)
    },
  },
};
</script>

<style scoped>
.subscription-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.form-section {
  flex: 1;
  max-width: 500px;
  padding: 20px;
  background-color: #f9f9f9;
  border-right: 1px solid #ccc;
}

.form-section h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-section form div {
  margin-bottom: 15px;
}

.form-section label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-section input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-section button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.form-section button:hover {
  background-color: #ffffff;
}

.image-section {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.image-section img {
  max-width: 100%;
  height: auto;
}
</style>
