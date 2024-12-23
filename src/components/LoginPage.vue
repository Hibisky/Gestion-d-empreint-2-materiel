<template>
  <div class="login-page">
    <!-- Logos -->
    <img src="@/assets/images/logoDessin1.png" alt="Logo principal" class="logo logo-primary" />
    <img src="@/assets/images/locamat.png" alt="LocaMat" class="logo logo-secondary" />

    <!-- Formulaire de connexion -->
    <form v-if="!isSigningUp" @submit.prevent="login" class="auth-form">
      <div class="form-group">
        <label for="email">Email :</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input id="password" type="password" v-model="password" required />
      </div>

      <!-- Bouton de connexion -->
      <button type="submit" class="btn-primary">Connexion</button>

      <!-- Lien mot de passe oublié -->
      <div class="forgot-password">
        <a href="#" @click.prevent="forgotPassword">Mot de passe oublié ?</a>
      </div>
    </form>

    <!-- Formulaire d'inscription -->
    <form v-if="isSigningUp" @submit.prevent="signUp" class="auth-form">
      <div class="form-group">
        <label for="newEmail">Email :</label>
        <input id="newEmail" type="email" v-model="newEmail" required />
      </div>
      <div class="form-group">
        <label for="newPassword">Mot de passe :</label>
        <input id="newPassword" type="password" v-model="newPassword" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe :</label>
        <input id="confirmPassword" type="password" v-model="confirmPassword" required />
      </div>

      <!-- Bouton de création de compte -->
      <button type="submit" class="btn-primary">Créer un compte</button>
    </form>

    <!-- Messages d'erreur -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Lien pour basculer entre connexion et inscription -->
    <button @click="toggleForm" class="toggle-form-btn">
      {{ isSigningUp ? "Vous avez déjà un compte ? Connectez-vous" : "Créer un compte" }}
    </button>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import "../assets/styles/style.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../router/firebase.js";
import { useRouter } from "vue-router";

export default {
  name: "AuthExample",
  setup() {
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const user = ref(null);
    const errorMessage = ref("");

    const newEmail = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const isSigningUp = ref(false);

    const validatePassword = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return regex.test(password);
    };

    const login = async () => {
      errorMessage.value = "";
      if (!validatePassword(password.value)) {
        errorMessage.value =
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
        return;
      }
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
      } catch (error) {
        errorMessage.value = "Erreur : " + error.message;
      }
    };

    const signUp = async () => {
      errorMessage.value = "";
      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = "Les mots de passe ne correspondent pas.";
        return;
      }
      if (!validatePassword(newPassword.value)) {
        errorMessage.value =
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, newEmail.value, newPassword.value);
      } catch (error) {
        errorMessage.value = "Erreur : " + error.message;
      }
    };

    const toggleForm = () => {
      isSigningUp.value = !isSigningUp.value;
      errorMessage.value = "";
    };

    const forgotPassword = async () => {
      errorMessage.value = "";
      if (!email.value) {
        errorMessage.value = "Veuillez entrer votre adresse email.";
        return;
      }
      try {
        await sendPasswordResetEmail(auth, email.value);
        alert("Un email de réinitialisation de mot de passe a été envoyé.");
      } catch (error) {
        errorMessage.value = "Erreur : " + error.message;
      }
    };

    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      if (currentUser) {
        router.push({ name: "HomePage" });
      }
    });

    watch(user, (newUser) => {
      if (newUser) {
        router.push({ name: "HomePage" });
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
      forgotPassword,
    };
  },
};
</script>

<style scoped>
.login-page {
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

.auth-form {
  max-width: 400px;
  width: 100%;
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

.error-message {
  margin-top: 1rem;
  color: red;
  font-size: 0.875rem;
  text-align: center;
}

.forgot-password {
  margin-top: 1rem;
  text-align: center;
}

.toggle-form-btn {
  margin-top: 1rem;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.toggle-form-btn:hover {
  text-decoration: underline;
}
</style>
