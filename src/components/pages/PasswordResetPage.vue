<template>
    <div class="password-reset-page">
      <img src="@/assets/images/logoDessin1.png" alt="Logo principal" class="logo logo-primary" />
      <img src="@/assets/images/locamat.png" alt="LocaMat" class="logo logo-secondary" />
  
      <main>
        <div class="reset-form">
          <form @submit.prevent="resetPassword">
            <div class="form-group">
              <label for="email">Identifiant (Email)</label>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="prenom.nom@domain.com"
                required
              />
            </div>
  
            <button type="submit" class="btn btn-primary">Envoyer un lien de réinitialisation</button>
          </form>
  
          <!-- Options supplémentaires -->
          <div class="options">
            <router-link to="/auth" class="link">Retour à la page de connexion</router-link>
          </div>
  
          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <!-- Message de succès -->
          <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { sendPasswordResetEmail } from 'firebase/auth';
  import { auth } from '@/router/firebase.js'; // Assurez-vous que le fichier firebase.js est bien configuré
  
  export default {
    name: 'PasswordResetPage',
    setup() {
      const email = ref('');
      const errorMessage = ref('');
      const successMessage = ref('');
  
      // Fonction de réinitialisation du mot de passe
      const resetPassword = async () => {
        errorMessage.value = ''; // Réinitialiser le message d'erreur
        successMessage.value = ''; // Réinitialiser le message de succès
        try {
          await sendPasswordResetEmail(auth, email.value);
          successMessage.value = 'Un email de réinitialisation a été envoyé à votre adresse.';
        } catch (error) {
          console.error('Erreur de réinitialisation :', error);
          if (error.code === 'auth/user-not-found') {
            errorMessage.value = 'Aucun utilisateur trouvé avec cet email.';
          } else {
            errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.';
          }
        }
      };
  
      return {
        email,
        errorMessage,
        successMessage,
        resetPassword,
      };
    },
  };
  </script>
  
  <style scoped>
  .password-reset-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f9fa;
  }
  
  .logo {
    width: 150px;
    margin-bottom: 1rem;
  }
  
  .logo-primary {
    margin-bottom: 0.5rem;
  }
  
  .logo-secondary {
    width: 150px;
  }
  
  .reset-form {
    max-width: 400px;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .options {
    margin-top: 1rem;
    text-align: center;
  }
  
  .link {
    color: #007bff;
    text-decoration: none;
  }
  
  .link:hover {
    text-decoration: underline;
  }
  
  .error-message,
  .success-message {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.875rem;
  }
  
  .error-message {
    color: red;
  }
  
  .success-message {
    color: green;
  }
  </style>
  