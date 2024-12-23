<template>
  <div class="login-page">
    <!-- Logo principal -->
    <img src="@/assets/images/logoDessin1.png" alt="Logo principal" class="logo logo-primary" />
    <img src="@/assets/images/locamat.png" alt="LocaMat" class="logo logo-secondary" />
    
    <main>
      <div class="login-form">
        <!-- Formulaire de connexion -->
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

        <!-- Options supplémentaires -->
        <div class="options">
          <router-link to="/password-reset" class="link">Mot de passe oublié ?</router-link>
        </div>

        <!-- Message d'erreur -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Correct imports
import { auth } from '@/router/firebase.js'; // Assurez-vous d'importer votre instance d'auth Firebase

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
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Initialiser Firestore et récupérer le rôle de l'utilisateur
        const db = getFirestore(); // Initialiser Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userRole = userDoc.data().role; // Récupérer le rôle de l'utilisateur
          
          // Redirection en fonction du rôle
          if (userRole === 'admin') {
            router.push({ name: 'Dashboard' });
          } else {
            router.push({ name: 'Devices' });
          }
        } else {
          errorMessage.value = "Utilisateur non trouvé dans la base de données.";
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

    // Observer l'état de l'utilisateur
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Si l'utilisateur est connecté, vérifier son rôle
        const db = getFirestore(); // Initialiser Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          if (userRole === 'admin') {
            router.push({ name: 'Dashboard' });
          } else {
            router.push({ name: 'Devices' });
          }
        }
      }
    });

    return {
      email,
      password,
      errorMessage,
      login,
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
