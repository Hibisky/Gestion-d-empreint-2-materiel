<template>
    <div class="subscription-page">
      <h1>Inscription</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="confirmPassword">Confirmer le mot de passe :</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SubscriptionPage',
    data() {
      return {
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
        alert(`Compte créé pour : ${this.email}`);
        // Ajoutez ici la logique pour gérer l'inscription (ex. Firebase Auth)
      },
    },
  };
  </script>
  
  <style>
  .subscription-page {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .subscription-page h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .subscription-page form div {
    margin-bottom: 15px;
  }
  
  .subscription-page form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .subscription-page form input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .subscription-page form button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .subscription-page form button:hover {
    background-color: #2c3e50;
  }
  </style>
  