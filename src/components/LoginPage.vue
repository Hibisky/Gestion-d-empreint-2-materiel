<template>
    <div class="login-page">
      <img src="@/assets/images/logoDessin1.png" alt="Logo LocaMat" class="logo" />
      <img src="@/assets/images/locamat.png" alt="Logo LocaMat" class="logo" />
      <main>
        <div class="login-form">
         
          <form @submit.prevent="handleLogin">
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
            <router-link to="/register" class="link">Nouvel utilisateur</router-link>
          </div>
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
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async handleLogin() {
        try {
          // Validation des champs
          if (!this.validateEmail(this.email)) {
            this.errorMessage = "L'email est invalide.";
            return;
          }
          if (!this.validatePassword(this.password)) {
            this.errorMessage =
              "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
            return;
          }
  
          // Simuler l'authentification
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
      validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      },
      validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
      },
      async authenticateUser(email, password) {
        // Simuler une API (remplacer par une API réelle)
        const mockUsers = [
          { email: "admin@domain.com", password: "Admin123", role: "admin", active: true },
          { email: "user@domain.com", password: "User123", role: "borrower", active: true },
        ];
        return mockUsers.find(
          (user) => user.email === email && user.password === password
        );
      },
      redirectUser(role) {
        if (role === "admin") {
          this.$router.push("/admin-dashboard");
        } else if (role === "borrower") {
          this.$router.push("/borrower-dashboard");
        }
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
  .header h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
  }
  .login-form {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .logo {
    width: 80px;
    margin-bottom: 1rem;
  }
  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
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
  }
  .btn-primary:hover {
    background-color: #0056b3;
  }
  .options {
    margin-top: 1rem;
  }
  .link {
    margin: 0 0.5rem;
    color: #007bff;
    text-decoration: none;
  }
  .link:hover {
    text-decoration: underline;
  }
  .error-message {
    margin-top: 1rem;
    color: red;
  }
  .footer {
    margin-top: 2rem;
    font-size: 0.875rem;
  }
  </style>
  