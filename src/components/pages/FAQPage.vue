<template>
  <div class="faq-page">
    <!-- Image en fond -->
    <div class="faq-header">
      <div class="faq-title-box">
        <h1>Questions Fréquentes</h1>
      </div>
    </div>

    <!-- Bloc blanc englobant toutes les questions -->
    <div class="faq-content">
      <div class="faq-container">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <button class="faq-question" @click="toggleFAQ(index)">
            {{ faq.question }}
            <span class="arrow" :class="{ open: activeIndex === index }">▼</span>
          </button>
          <transition name="slide">
            <p v-if="activeIndex === index" class="faq-answer">{{ faq.answer }}</p>
          </transition>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="faq-footer">
      <p>&copy; 2025 VotreSite - Tous droits réservés</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FAQPage",
  data() {
    return {
      faqs: [
        { question: "Comment puis-je m'inscrire ?", answer: "Vous pouvez vous inscrire en cliquant sur le bouton 'S'inscrire' dans la page d'accueil." },
        { question: "Puis-je accéder à mon profil ?", answer: "Oui, vous pouvez accéder à votre profil depuis le menu principal après vous être connecté." },
        { question: "Comment ajouter un appareil ?", answer: "Rendez-vous sur la page Ajouter un appareil via le menu pour enregistrer un nouvel appareil." },
        { question: "Quels modes de paiement acceptez-vous ?", answer: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard) et PayPal." },
        { question: "Comment suivre ma commande ?", answer: "Vous pouvez suivre votre commande depuis votre espace client dans la section 'Mes commandes'." },
        { question: "Quels sont les délais de livraison ?", answer: "Les délais varient entre 3 à 5 jours ouvrés selon votre localisation." },
        { question: "Puis-je modifier ou annuler ma commande ?", answer: "Oui, tant que votre commande n’a pas été expédiée, vous pouvez la modifier ou l'annuler dans votre espace client." },
        { question: "Comment contacter le support client ?", answer: "Vous pouvez nous contacter par e-mail à support@votresite.com ou via le chat en ligne." },
        { question: "Proposez-vous des garanties sur les produits ?", answer: "Oui, tous nos produits sont couverts par une garantie de 2 ans." },
        { question: "Puis-je retourner un produit ?", answer: "Vous disposez de 14 jours après réception pour retourner un produit en parfait état." }
      ],
      activeIndex: null,
    };
  },
  methods: {
    toggleFAQ(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style>
/* Styles de la page FAQ */
.faq-page {
  font-family: Arial, sans-serif;
  background-color: #f0f8ff; /* Bleu clair */
  text-align: center;
}

/* Image en fond */
.faq-header {
  background: lightskyblue center/cover no-repeat;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Bloc blanc autour du titre */
.faq-title-box {
  background: white;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.faq-title-box h1 {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  color: #007BFF;
}

/* Bloc blanc contenant toutes les questions */
.faq-content {
  background: white;
  max-width: 90%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Conteneur des FAQ */
.faq-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

/* Boutons arrondis */
.faq-question {
  width: 90%;
  background-color: #007BFF; /* Bleu */
  color: white;
  border: none;
  padding: 15px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  border-radius: 30px; /* Arrondi */
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
  margin-bottom: 10px;
}

.faq-question:hover {
  background-color: #0056b3; /* Bleu foncé */
}

/* Flèche animée */
.arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

/* Réponse animée */
.faq-answer {
  width: 90%;
  padding: 15px;
  color: #333;
  background-color: white;
  border-radius: 10px;
  margin-top: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

/* Animation plus fluide et rapide */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.2s ease-out, opacity 0.2s;
  transform-origin: top;
}

.slide-enter, .slide-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.slide-enter-to, .slide-leave {
  transform: scaleY(1);
  opacity: 1;
}

/* Footer */
.faq-footer {
  margin-top: 30px;
  padding: 15px;
  background: #0056b3; /* Bleu foncé */
  color: white;
}
</style>
