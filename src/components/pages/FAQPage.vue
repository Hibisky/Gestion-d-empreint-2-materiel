<template>
  <div class="faq-page">
    <h1>Foire aux Questions (FAQ)</h1>
    <div class="chat-container">
      <div v-for="(faq, index) in faqs" :key="index" class="chat-message" :class="{'user': index % 2 === 0, 'bot': index % 2 !== 0}">
        <p class="message">{{ faq.question }}</p>
        <p class="message response">{{ faq.answer }}</p>
      </div>
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
  max-width: 600px;
  margin: auto;
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-message {
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
}

.user {
  align-self: flex-end;
  background-color: #d1e7ff;
}

.bot {
  align-self: flex-start;
  background-color: #e1e1e1;
}

.message {
  margin: 5px 0;
}

.response {
  font-weight: bold;
}
</style>
