<template>
  <footer-page class="main-footer">
    <div class="footer-container">
      <!-- Section logo and copyright -->
      <div class="footer-logo">
        <img src="@/assets/images/logoDessin1.png" alt="Logo" class="logo" />
        <p>© 2024 MonApplication. Tous droits réservés.</p>
      </div>

      <!-- Navigation links -->
      <nav class="footer-nav">
        <a href="/" class="footer-link">Accueil</a>
        <a href="/about" class="footer-link">À propos</a>
        <a href="/contact" class="footer-link">Contact</a>
        <a href="/privacy" class="footer-link">Politique de confidentialité</a>
      </nav>

      <!-- Social media icons -->
      <div class="footer-socials">
        <a href="https://facebook.com" target="_blank" class="social-link" aria-label="Facebook">
          <img src="@/assets/images/fb.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" class="social-link" aria-label="Twitter">
          <img src="@/assets/images/twitter.png" alt="Twitter" />
        </a>
        <a href="https://tiktok.com" target="_blank" class="social-link" aria-label="TikTok">
          <img src="@/assets/images/tiktok.png" alt="LinkedIn" />
        </a>
        <a href="https://instagram.com" target="_blank" class="social-link" aria-label="Instagram">
          <img src="@/assets/images/instagram.png" alt="Instagram" />
        </a>
      </div>
    </div>

    <!-- Decorative bottom bar -->
    <div class="footer-bar">
      <p>Made with ❤️ by MonApplication Team</p>
    </div>
  </footer-page>
</template>

<script>
export default {
  name: "FooterPage",
};
</script>

<style scoped>
.main-footer {
  background-color: #1a1a1a;
  color: #f5f5f5;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 3px solid #3498db;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  gap: 20px;
}

.footer-logo {
  text-align: center;
}

.logo {
  width: 70px;
  height: auto;
  margin-bottom: 10px;
}

.footer-nav {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: #f5f5f5;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #3498db;
}

.footer-socials {
  display: flex;
  gap: 15px;
}

.social-link img {
  width: 30px;
  height: 30px;
  transition: transform 0.3s, filter 0.3s;
}

.social-link img:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
}

.footer-bar {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #aaa;
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
  }

  .footer-socials {
    justify-content: center;
  }
}
</style>
