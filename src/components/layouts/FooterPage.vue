<template>
    <footer class="main-footer">
      <div class="footer-container">
        <!-- Section logo et copyright -->
        <div class="footer-logo">
          <img src="@/assets/images/logoDessin1.png" alt="Logo" class="logo" />
          <p>© 2024 MonApplication. Tous droits réservés.</p>
        </div>
  
        <!-- Section des liens de navigation -->
        <nav class="footer-nav">
          <router-link to="/home" class="footer-link">Accueil</router-link>
          <router-link to="/faq" class="footer-link">FAQ</router-link>
          <router-link to="/help" class="footer-link">Aide</router-link>
          <router-link to="/about" class="footer-link">À propos</router-link>
          <router-link to="/contact" class="footer-link">Contact</router-link>
        </nav>
  
        <!-- Section des réseaux sociaux -->
        <div class="footer-socials">
          <a href="https://facebook.com" target="_blank" class="social-link" aria-label="Facebook">
            <img src="@/assets/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" class="social-link" aria-label="Twitter">
            <img src="@/assets/twitter-icon.png" alt="Twitter" />
          </a>
          <a href="https://linkedin.com" target="_blank" class="social-link" aria-label="LinkedIn">
            <img src="@/assets/linkedin-icon.png" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .main-footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
  }
  
  .footer-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .logo {
    width: 50px;
    height: auto;
    margin-bottom: 10px;
  }
  
  .footer-nav {
    display: flex;
    gap: 15px;
  }
  
  .footer-link {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-link:hover {
    color: #3498db;
  }
  
  .footer-socials {
    display: flex;
    gap: 10px;
  }
  
  .social-link img {
    width: 25px;
    height: 25px;
    transition: transform 0.3s;
  }
  
  .social-link img:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-nav {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }

  .footer-socials {
    justify-content: center;
  }
}

  </style>
  