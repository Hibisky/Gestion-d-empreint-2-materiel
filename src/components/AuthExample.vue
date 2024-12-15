<template>
  <div class="auth-container">
    <h1>Authentication</h1>

    <!-- Formulaire de connexion -->
    <form v-if="!isSigningUp" @submit.prevent="login" class="auth-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>

      <!-- Bouton Connexion -->
      <button type="submit" class="btn-full">Connexion</button>

      <!-- Lien mot de passe oublié -->
      <div class="forgot-password">
        <a href="#" @click.prevent="forgotPassword">Mot de passe oublié ?</a>
      </div>
    </form>

    <!-- Formulaire d'inscription -->
    <form v-if="isSigningUp" @submit.prevent="signUp" class="auth-form">
      <div class="form-group">
        <label for="newEmail">Email:</label>
        <input type="email" v-model="newEmail" required />
      </div>
      <div class="form-group">
        <label for="newPassword">Password:</label>
        <input type="password" v-model="newPassword" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit" class="btn-full">Create Account</button>
    </form>

    <!-- Affichage de l'erreur si la connexion ou l'inscription échoue -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Affichage de l'utilisateur connecté -->
    <p v-if="user">Logged in as: {{ user.email }}</p>

    <!-- Lien pour basculer entre la connexion et l'inscription -->
    <button @click="toggleForm" class="toggle-form-btn">
      {{ isSigningUp ? 'Already have an account? Login' : 'Create an account' }}
    </button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import '../assets/style.css';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase.js';
import { useRouter } from 'vue-router';

export default {
  name: 'AuthExample',
  setup() {
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const user = ref(null);
    const errorMessage = ref('');

    const newEmail = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const isSigningUp = ref(false);

    const login = async () => {
      errorMessage.value = '';
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const signUp = async () => {
      errorMessage.value = '';
      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match.';
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, newEmail.value, newPassword.value);
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const toggleForm = () => {
      isSigningUp.value = !isSigningUp.value;
      errorMessage.value = '';
    };

    const forgotPassword = async () => {
      errorMessage.value = ''; // Réinitialise le message d'erreur
      if (!email.value) {
        errorMessage.value = 'Veuillez entrer votre adresse email.';
        return;
      }
      try {
        await sendPasswordResetEmail(auth, email.value);
        alert('Un email de réinitialisation de mot de passe a été envoyé.');
      } catch (error) {
        console.error('Error sending password reset email:', error);
        errorMessage.value = error.message; // Affiche un message d'erreur en cas d'échec
      }
    };

    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      if (currentUser) {
        router.push({ name: 'HomePage' });
      }
    });

    watch(user, (newUser) => {
      if (newUser) {
        router.push({ name: 'HomePage' });
      }
    });

    return {
      email,
      password,
      user,
      errorMessage,
      newEmail,
      newPassword,
      confirmPassword,
      isSigningUp,
      login,
      signUp,
      toggleForm,
      forgotPassword
    };
  },
};
</script>

<style>
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}

.auth-form .btn-full {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.auth-form .btn-full:hover {
  background-color: #0056b3;
}

.forgot-password {
  text-align: right;
  margin-top: 10px;
}

.forgot-password a {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>
