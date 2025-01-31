<template>
  <div class="register-page">
    <h1>Créer un compte</h1>
    <form @submit.prevent="registerUser">
      <!-- Adresse email -->
      <div class="form-group">
        <label for="email">Adresse e-mail :</label>
        <input type="email" id="email" v-model="email" placeholder="prenom.nom@domain.com" required />
      </div>

      <!-- Mot de passe -->
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" placeholder="Mot de passe sécurisé" required />
        <small>8 caractères min., majuscule, minuscule, chiffre et caractère spécial</small>
      </div>

      <!-- Confirmation du mot de passe -->
      <div class="form-group">
        <label for="confirm-password">Confirmer le mot de passe :</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirmez votre mot de passe" required />
      </div>

      <!-- Prénom -->
      <div class="form-group">
        <label for="first-name">Prénom :</label>
        <input type="text" id="first-name" v-model="firstName" placeholder="Votre prénom" required />
      </div>

      <!-- Nom -->
      <div class="form-group">
        <label for="last-name">Nom :</label>
        <input type="text" id="last-name" v-model="lastName" placeholder="Votre nom" required />
      </div>

      <!-- Numéro de téléphone -->
      <div class="form-group">
        <label for="phone">Numéro de téléphone :</label>
        <input type="tel" id="phone" v-model="phone" placeholder="Votre numéro de téléphone" required />
      </div>

      <!-- Code postal -->
      <div class="form-group">
        <label for="zip-code">Code postal :</label>
        <input type="text" id="zip-code" v-model="zipCode" placeholder="Code postal" required />
      </div>

      <!-- Ville -->
      <div class="form-group">
        <label for="city">Ville :</label>
        <input type="text" id="city" v-model="city" placeholder="Ville" required />
      </div>

      <!-- Bouton d'inscription -->
      <button type="submit" class="btn btn-primary">Créer un compte</button>

      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/router/firebase";

export default {
  name: "RegisterPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const phone = ref("");
    const zipCode = ref("");
    const city = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const isValidPassword = (password) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const isValidText = (text) => {
      return /^[A-Za-zÀ-ÿ\s-]+$/.test(text);
    };

    const isValidPhone = (phone) => {
      return /^\+?[0-9]{10,15}$/.test(phone);
    };

    const registerUser = async () => {
      errorMessage.value = "";

      if (!isValidPassword(password.value)) {
        errorMessage.value = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
        return;
      }

      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Les mots de passe ne correspondent pas.";
        return;
      }

      if (!isValidText(firstName.value) || !isValidText(lastName.value) || !isValidText(city.value)) {
        errorMessage.value = "Le prénom, le nom et la ville ne doivent contenir que des lettres.";
        return;
      }

      if (!isValidPhone(phone.value)) {
        errorMessage.value = "Le numéro de téléphone est invalide.";
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        await addDoc(collection(db, "users"), {
          uid: user.uid,
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          zipCode: zipCode.value,
          city: city.value,
          role: "user",
          createdAt: new Date(),
        });

        alert("Inscription réussie !");
        router.push("/login");
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone,
      zipCode,
      city,
      errorMessage,
      registerUser,
    };
  },
};
</script>

<style scoped>
.register-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #36976b;
}

.error-message {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}
</style>
