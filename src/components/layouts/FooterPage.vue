<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo and Slogan -->
      <div class="footer-logo">
        <img src="@/assets/images/logoDessin1.png" alt="Informatics Rentals Logo" />
        <p>Your one-stop shop for renting IT equipment!</p>
      </div>

      <!-- Navigation Links -->
      <div class="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/services">Services</router-link></li>
          <li><router-link to="/contact">Contact Us</router-link></li>
        </ul>
      </div>

      <!-- Interactive Contact Section -->
      <div class="footer-contact">
        <h3>Contact Us</h3>
        <p><strong>Email:</strong> <a href="mailto:info@informaticsrentals.com">info@informaticsrentals.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a></p>
        <p><strong>Location:</strong> 123 Tech Avenue, Silicon City</p>
        <button class="contact-button" @click="handleContactClick">Get in Touch</button>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <p>© 2024 Informatics Rentals. All Rights Reserved. | 
        <router-link to="/privacy-policy">Privacy Policy</router-link> | 
        <router-link to="/terms-conditions">Terms & Conditions</router-link>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterPage',
  methods: {
    handleContactClick() {
      alert("Redirecting to contact form...");
      this.$router.push("/contact");
    },
  },
};
</script>

<style scoped>
/* General Footer Styles */
.footer {
  background-color: #00509e; /* Deep Blue */
  color: #ffffff;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

/* Footer Logo and Slogan */
.footer-logo {
  flex: 1;
  min-width: 250px;
  text-align: center;
}

.footer-logo img {
  width: 80px;
  margin-bottom: 10px;
}

.footer-logo p {
  font-size: 0.9em;
  margin: 0;
  color: #d8eefe;
}

/* Navigation Links */
.footer-links {
  flex: 1;
  min-width: 200px;
}

.footer-links h3 {
  font-size: 1.2em;
  color: #a8d0ff;
  margin-bottom: 10px;
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
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #a8d0ff;
}

/* Contact Section */
.footer-contact {
  flex: 1;
  min-width: 200px;
}

.footer-contact h3 {
  font-size: 1.2em;
  color: #a8d0ff;
  margin-bottom: 10px;
}

.footer-contact p {
  margin: 5px 0;
  color: #ffffff;
}

.footer-contact a {
  color: #d8eefe;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-contact a:hover {
  color: #a8d0ff;
}

.contact-button {
  margin-top: 10px;
  background-color: #a8d0ff;
  border: none;
  color: #00509e;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.contact-button:hover {
  background-color: #ffffff;
  color: #00509e;
}

/* Bottom Bar */
.footer-bottom {
  text-align: center;
  border-top: 1px solid #a8d0ff;
  margin-top: 20px;
  padding-top: 10px;
  font-size: 0.9em;
  color: #d8eefe;
}

.footer-bottom a {
  color: #ffffff;
  text-decoration: none;
  margin: 0 5px;
  transition: color 0.3s ease;
}

.footer-bottom a:hover {
  color: #a8d0ff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
  }

  .footer-links,
  .footer-contact {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
