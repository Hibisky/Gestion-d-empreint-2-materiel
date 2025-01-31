<template>
  <div class="faq-page">
    <!-- Image en fond -->
    <div class="faq-header">
      <h1>Questions Fréquentes </h1>
    </div>

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

/* Image en fond du titre */
.faq-header {
  background: lightskyblue center/cover no-repeat;
  padding: 80px 20px;
  color: white;
}

.faq-header h1 {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

/* Conteneur des FAQ */
.faq-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

/* Boutons arrondis */
.faq-question {
  width: 100%;
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
  padding: 15px;
  color: #333;
  background-color: white;
  border-radius: 10px;
  margin-top: 5px;
}

/* Animation slide */
.slide-enter-active, .slide-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  opacity: 1;
}

/* Footer */
.faq-footer {
  margin-top: 30px;
  padding: 15px;
  background: #0056b3; /* Bleu foncé */
  color: white;
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

</style>
