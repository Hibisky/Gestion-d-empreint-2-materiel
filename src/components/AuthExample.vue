<template>
  <div>
    <h1>Authentication Example</h1>

    <!-- Formulaire de connexion -->
    <form v-if="!isSigningUp" @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <!-- Formulaire d'inscription -->
    <form v-if="isSigningUp" @submit.prevent="signUp">
      <div>
        <label for="newEmail">Email:</label>
        <input type="email" v-model="newEmail" required />
      </div>
      <div>
        <label for="newPassword">Password:</label>
        <input type="password" v-model="newPassword" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required />
      </div>
      <button type="submit">Create Account</button>
    </form>

    <!-- Affichage de l'erreur si la connexion ou l'inscription échoue -->
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    
    <!-- Affichage de l'utilisateur connecté -->
    <p v-if="user">Logged in as: {{ user.email }}</p>

    <!-- Lien pour basculer entre la connexion et l'inscription -->
    <button @click="toggleForm">{{ isSigningUp ? 'Already have an account? Login' : 'Create an account' }}</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js'; // Assurez-vous que ce fichier contient la configuration Firebase
import { useRouter } from 'vue-router';  // Importer useRouter

export default {
  name: 'AuthExample',
  setup() {
    const router = useRouter();  // Utiliser useRouter pour accéder à l'objet router
    
    const email = ref('');
    const password = ref('');
    const user = ref(null);
    const errorMessage = ref('');
    
    // Champs pour l'inscription
    const newEmail = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const isSigningUp = ref(false); // État pour basculer entre connexion et inscription

    // Connexion de l'utilisateur
    const login = async () => {
      errorMessage.value = ''; // Réinitialise les messages d'erreur
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
      } catch (error) {
        console.error('Error logging in:', error);
        errorMessage.value = error.message; // Affiche l'erreur dans l'UI
      }
    };

    // Création d'un nouvel utilisateur
    const signUp = async () => {
      errorMessage.value = ''; // Réinitialise les messages d'erreur

      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match.';
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, newEmail.value, newPassword.value);
      } catch (error) {
        console.error('Error signing up:', error);
        errorMessage.value = error.message; // Affiche l'erreur dans l'UI
      }
    };

    // Basculer entre le formulaire de connexion et d'inscription
    const toggleForm = () => {
      isSigningUp.value = !isSigningUp.value;
      errorMessage.value = ''; // Réinitialise les messages d'erreur lors du changement de formulaire
    };

    // Vérification de l'utilisateur connecté
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;

      // Si l'utilisateur est connecté, redirige vers la page HelloWorld
      if (currentUser) {
        // Rediriger vers la page HelloWorld après une connexion réussie
        router.push({ name: 'HomePage' });
      }
    });

    // Watch pour vérifier l'utilisateur et rediriger si nécessaire
    watch(user, (newUser) => {
      if (newUser) {
        // Si l'utilisateur est connecté, on peut rediriger
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
      toggleForm
    };
  },
};
</script>
