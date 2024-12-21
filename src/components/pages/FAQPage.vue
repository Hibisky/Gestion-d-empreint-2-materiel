<template>
    <div class="faq-page">
      <h1>Foire aux Questions (FAQ)</h1>
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
          { question: "Comment puis-je m'inscrire ?", answer: "Vous pouvez vous inscrire en cliquant sur le bouton 'S'inscrire' dans la page d'accueil." },
          { question: "Puis-je accéder à mon profil ?", answer: "Oui, vous pouvez accéder à votre profil depuis le menu principal après vous être connecté." },
          { question: "Comment ajouter un appareil ?", answer: "Rendez-vous sur la page Ajouter un appareil via le menu pour enregistrer un nouvel appareil." },
        ],
      };
    },
  };
  </script>
  
  <style>
  .faq-page {
    padding: 20px;
  }
  
  .faq-item {
    margin-bottom: 20px;
  }
  
  .faq-item h2 {
    margin-bottom: 10px;
  }
  
  .faq-item p {
    margin: 0;
  }
  </style>
  