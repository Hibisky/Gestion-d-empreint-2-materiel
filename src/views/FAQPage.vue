<template>
    <div class="faq-page">
      <h1>Foire Aux Questions (FAQ)</h1>
      <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
        <h2>{{ faq.question }}</h2>
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FAQPage',
    data() {
      return {
        faqs: [
          {
            question: 'Comment puis-je m’inscrire ?',
            answer: 'Vous pouvez vous inscrire en cliquant sur le bouton "Inscription" en haut de la page.',
          },
          {
            question: 'Comment gérer mes emprunts ?',
            answer: 'Accédez à la section "Mes Emprunts" après vous être connecté.',
          },
          {
            question: 'Que faire si j’ai oublié mon mot de passe ?',
            answer: 'Cliquez sur "Mot de passe oublié" sur la page de connexion pour réinitialiser votre mot de passe.',
          },
          {
            question: 'Comment contacter l’équipe de support ?',
            answer: 'Vous pouvez nous envoyer un message via la page de contact ou par email à support@notreapp.com.',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .faq-page {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  h1 {
    text-align: center;
    color: #007bff;
  }
  .faq-item {
    margin-bottom: 20px;
  }
  h2 {
    margin-bottom: 10px;
    font-size: 1.2em;
    color: #333;
  }
  p {
    margin: 0;
    line-height: 1.6;
  }
  </style>
  