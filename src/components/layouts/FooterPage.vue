<template>
  <footer class="main-footer">
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
  </footer>
</template>

<script>
export default {
  name: 'FooterPage',
};
</script>

<style scoped>
.footer {
  text-align: center;
  background-color: #333;
  color: white;
  padding: 20px;
}
</style>
