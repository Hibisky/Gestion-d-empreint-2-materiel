<template>
  <div class="subscription-page">
    <div class="form-section">
      <h1>Créer un compte</h1>
      <form @submit.prevent="submitForm" class="form-container">
        <div class="form-group">
          <label for="first-name">Prénom :</label>
          <input type="text" id="first-name" v-model="firstName" required />
        </div>
        <div class="form-group">
          <label for="last-name">Nom :</label>
          <input type="text" id="last-name" v-model="lastName" required />
        </div>
        <div class="form-group">
          <label for="email">Adresse e-mail :</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirmer le mot de passe :</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button type="submit" class="submit-button">Créer un compte</button>
      </form>
    </div>
    <div class="image-section">
      <img src="../../assets/images/image1.png"  />
    </div>
  </div>
</template>

<script>
export default {
  name: "SubscriptionPage",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
      alert(`Compte créé pour : ${this.firstName} ${this.lastName}`);
      // Logique d'inscription (Firebase ou autre)
    },
  },
};
</script>

<style>
.subscription-page {
  display: flex;
  height: 100vh;
  align-items: center;
}

.form-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-section img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.submit-button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #f9F9F9;
}
</style>
