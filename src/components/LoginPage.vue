<template>
  <div class="login-page">
    <!-- Logo principal -->
    <img src="@/assets/images/logoDessin1.png" alt="Logo principal" class="logo logo-primary" />
    <img src="@/assets/images/locamat.png" alt="LocaMat" class="logo logo-secondary" />
    
    <main>
      <div class="login-form">
        <!-- Formulaire de connexion -->
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Identifiant (Email ou Matricule)</label>
            <input
              type="text" 
              id="email"
              v-model="email"
              placeholder="prenom.nom@domain.com ou Matricule"
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
        
        <!-- Liens d'options -->
        <div class="options">
          <router-link to="/auth" class="link">Mot de passe oublié ?</router-link>
        </div>
        <!-- Affichage des messages d'erreur -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "", // Peut aussi être un matricule
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Validation des champs (email ou matricule)
        if (!this.email.trim()) {
          this.errorMessage = "Veuillez entrer un identifiant valide.";
          return;
        }
        if (!this.validatePassword(this.password)) {
          this.errorMessage =
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
          return;
        }

        // Authentification utilisateur
        const user = await this.authenticateUser(this.email, this.password);
        if (user) {
          if (!user.active) {
            this.errorMessage = "Votre compte est inactif. Veuillez contacter l’administrateur.";
          } else {
            this.redirectUser(user.role);
          }
        } else {
          this.errorMessage = "Identifiant ou mot de passe incorrect.";
        }
      } catch (error) {
        this.errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
      }
    },
    validatePassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return regex.test(password);
    },
    async authenticateUser(email, password) {
      //PROBLEME TO DO 
      // Simulation d'une base d'utilisateurs (remplacer avec une API réelle)
      const mockUsers = [
        { email: "admin@domain.com", password: "Admin123", role: "admin", active: true },
        { email: "user@domain.com", password: "User123", role: "borrower", active: true },
      ];
      return mockUsers.find(
        (user) => user.email === email && user.password === password
      );
    },
    redirectUser(role) {
      const routes = {
        admin: "/admin-dashboard",
        borrower: "/borrower-dashboard",
      };
      this.$router.push(routes[role] || "/");
    },
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
    width: 400px; /* Ajout pour rendre le bouton plus large */
    max-width: 300px; /* Optionnel : Limite maximale si nécessaire */
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
