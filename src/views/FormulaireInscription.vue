<template>
    <div class="formulaire-inscription">
      <h1>Inscription</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nom :</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Entrez votre nom"
          />
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>
  
        <div class="form-group">
          <label for="email">Email :</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Entrez votre email"
          />
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>
  
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Entrez un mot de passe"
          />
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>
  
        <div class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="Confirmez le mot de passe"
          />
          <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
        </div>
  
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FormulaireInscription',
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        errors: {},
      };
    },
    methods: {
      validateForm() {
        const errors = {};
        if (!this.form.name) {
          errors.name = 'Le nom est requis.';
        }
        if (!this.form.email) {
          errors.email = "L'email est requis.";
        } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
          errors.email = "L'email n'est pas valide.";
        }
        if (!this.form.password) {
          errors.password = 'Le mot de passe est requis.';
        } else if (this.form.password.length < 6) {
          errors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
        }
        if (this.form.confirmPassword !== this.form.password) {
          errors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        }
        this.errors = errors;
        return Object.keys(errors).length === 0;
      },
      handleSubmit() {
        if (this.validateForm()) {
          alert('Formulaire soumis avec succès !');
          // Logique pour envoyer les données au serveur ou effectuer une autre action
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .formulaire-inscription {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
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
    border-radius: 4px;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  .error-message {
    color: red;
    font-size: 0.9em;
  }
  </style>
  