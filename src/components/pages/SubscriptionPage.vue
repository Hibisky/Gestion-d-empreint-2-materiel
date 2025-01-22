<template>
  <div class="register-page">
    <!-- Première colonne vide -->
    <div class="column empty-column"></div>

    <!-- Deuxième colonne avec le formulaire -->
    <div class="column form-column">
      <h1>Créer un compte</h1>
      <form @submit.prevent="submitForm" class="form-container">
        <!-- Informations Personnelles -->
        <div class="form-group">
          <label for="email">Adresse e-mail :</label>
          <input type="email" id="email" v-model="email" placeholder="Votre e-mail" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" placeholder="Mot de passe sécurisé" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirmer le mot de passe :</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirmez le mot de passe" required />
        </div>

        <!-- Détails du compte -->
        <div class="form-group">
          <label for="first-name">Prénom :</label>
          <input type="text" id="first-name" v-model="firstName" placeholder="Votre prénom" required />
        </div>
        <div class="form-group">
          <label for="last-name">Nom :</label>
          <input type="text" id="last-name" v-model="lastName" placeholder="Votre nom" required />
        </div>

        <!-- Adresse -->
        <div class="form-group">
          <label for="address">Adresse :</label>
          <input type="text" id="address" v-model="address" placeholder="Votre adresse" required />
        </div>
        <div class="form-group">
          <label for="zip-code">Code postal :</label>
          <input type="text" id="zip-code" v-model="zipCode" placeholder="Code postal" required />
        </div>
        <div class="form-group">
          <label for="city">Ville :</label>
          <input type="text" id="city" v-model="city" placeholder="Ville" required />
        </div>

        <!-- Conditions et inscription -->
        <div class="form-group terms">
          <input type="checkbox" id="terms" v-model="acceptTerms" required />
          <label for="terms">
            J'accepte les <a href="/terms" target="_blank">termes et conditions</a> et la
            <a href="/privacy" target="_blank">politique de confidentialité</a>.
          </label>
        </div>

        <button type="submit" class="submit-button">Créer un compte</button>
      </form>
    </div>

    <!-- Troisième colonne avec une image -->
    <div class="column image-column">
      <img src="../../assets/images/image1.png" alt="Créer un compte" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: "",
      zipCode: "",
      city: "",
      acceptTerms: false,
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
      if (!this.acceptTerms) {
        alert("Veuillez accepter les termes et conditions.");
        return;
      }
      alert("Inscription réussie !");
      // Logique pour l'envoi des données à un backend ici
    },
  },
};
</script>

<style>
.register-page {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Trois colonnes : 1 vide, 1 formulaire, 1 image */
  gap: 20px;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.column {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-column {
  /* Colonne vide, aucune règle spécifique */
}

.form-column {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-column img {
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

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.terms {
  display: flex;
  align-items: center;
}

.terms label {
  margin-left: 10px;
  font-size: 14px;
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
  background-color: #f5f5f5;
}
</style>
