<template>
  <div class="login-page">
    <img src="@/assets/images/logoDessin1.png" alt="Logo principal" class="logo logo-primary" />
    <img src="@/assets/images/locamat.png" alt="LocaMat" class="logo logo-secondary" />
    
    <main>
      <div class="login-form">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Identifiant (Email ou Matricule)</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="prenom.nom@domain.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Connexion</button>
        </form>

        <div class="options">
          <router-link to="/password-reset" class="link">Mot de passe oublié ?</router-link>
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
      <button @click="goToFormPage" class="btn btn-secondary">Créer un compte</button>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/router/firebase.js';

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    // Fonction de connexion
    const login = async () => {
      errorMessage.value = ''; // Réinitialiser le message d'erreur
      try {
        // Connexion à Firebase Auth
        await signInWithEmailAndPassword(auth, email.value, password.value);
        // const user = userCredential.user;

        // Récupérer le document correspondant dans la collection "users" pour trouver l'uid
        const q = query(collection(db, 'users'), where('email', '==', email.value));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          errorMessage.value = "Utilisateur non trouvé dans la base de données.";
          return;
        }

        // Chercher l'uid dans le document trouvé
        let userDoc = null;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data(); // On récupère la première correspondance
        });

        if (userDoc) {
          // const userUid = userDoc.uid; // Ici tu récupères l'uid de l'utilisateur
          const userRole = userDoc.role; // Récupérer le rôle de l'utilisateur

          // Redirection en fonction du rôle de l'utilisateur
          if (userRole) {
            if (userRole === 'admin') {
              router.push({ name: 'Device' }); // Redirige vers le tableau de bord pour l'admin
            } else {
              router.push({ name: 'Device' }); // Redirige vers la page des appareils pour l'utilisateur
            }
          } else {
            errorMessage.value = "Rôle de l'utilisateur non défini.";
          }
        }
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          errorMessage.value = "Utilisateur introuvable. Veuillez vérifier l'email.";
        } else if (error.code === 'auth/wrong-password') {
          errorMessage.value = "Mot de passe incorrect.";
        } else {
          errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
        }
      }
    };

    const goToFormPage = () => {
      router.push({ name: 'Formulaire' });
    };

    return {
      email,
      password,
      errorMessage,
      login,
      goToFormPage,
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
  .logo-primary {
    margin-bottom: 0.5rem;
  }
  .logo-secondary {
    width: 150px;
  }
  .login-form {
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
  .error-message {
    margin-top: 1rem;
    color: red;
    font-size: 0.875rem;
    text-align: center;
  }
</style>
