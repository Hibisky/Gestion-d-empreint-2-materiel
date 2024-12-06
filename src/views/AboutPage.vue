<template>
  <div class="about-page">
    <h1>À Propos</h1>
    <p>
      Bienvenue sur notre application ! Nous sommes une équipe dédiée à offrir une
      expérience utilisateur exceptionnelle grâce à des solutions innovantes et faciles à utiliser.
    </p>
    <p>
      Notre mission est de rendre la gestion des emprunts matériels simple, efficace,
      et accessible pour tout le monde. Merci de nous faire confiance !
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
};
</script>

<style scoped>
.about-page {
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
p {
  margin: 10px 0;
  line-height: 1.6;
}
</style>
