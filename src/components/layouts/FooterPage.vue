<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Brand and Slogan -->
      <div class="footer-brand">
        <h2>Informatics Rentals</h2>
        <p>Your reliable partner for IT equipment rentals. Fast, efficient, and affordable solutions.</p>
      </div>

      <!-- Navigation Links -->
      <div class="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/services">Services</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>

      <!-- Contact Information -->
      <div class="footer-contact">
        <h3>Contact Us</h3>
        <p><strong>Email:</strong> <a href="mailto:info@informaticsrentals.com">info@informaticsrentals.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a></p>
        <p><strong>Location:</strong> 123 Tech Avenue, Silicon City</p>
      </div>

      <!-- Social Media Links -->
      <div class="footer-social">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="#" target="_blank" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" target="_blank" aria-label="Twitter">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" target="_blank" aria-label="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="#" target="_blank" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <p>© 2024 Informatics Rentals - All rights reserved.</p>
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
  background-color: #0b3d91; /* Deep blue */
  color: #ffffff;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 20px;
}

.footer-brand {
  flex: 1;
  min-width: 250px;
}

.footer-brand h2 {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #50c8ff; /* Light blue */
}

.footer-brand p {
  font-size: 1em;
  margin: 0;
  line-height: 1.5;
}

.footer-links,
.footer-contact,
.footer-social {
  flex: 1;
  min-width: 200px;
}

.footer-links h3,
.footer-contact h3,
.footer-social h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #50c8ff;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #50c8ff;
}

.footer-contact p {
  margin: 5px 0;
}

.footer-contact a {
  color: #ffffff;
  text-decoration: none;
}

.footer-contact a:hover {
  text-decoration: underline;
}

.footer-social .social-icons {
  display: flex;
  gap: 15px;
}

.footer-social a {
  color: #ffffff;
  font-size: 1.5em;
  transition: color 0.3s;
}

.footer-social a:hover {
  color: #50c8ff;
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid #50c8ff;
  padding-top: 10px;
  font-size: 0.9em;
  width: 100%;
}
</style>
