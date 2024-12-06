<template>
    <div class="help-page">
      <h1>Aide</h1>
      <p>Bienvenue dans la section d'aide. Voici quelques ressources pour vous guider :</p>
  
      <div class="help-section">
        <h2>Questions fréquentes</h2>
        <p>
          Consultez notre <router-link to="/faq">Foire Aux Questions (FAQ)</router-link> pour des réponses aux questions courantes.
        </p>
      </div>
  
      <div class="help-section">
        <h2>Guide utilisateur</h2>
        <p>
          Téléchargez notre <a href="/guide-utilisateur.pdf" target="_blank">Guide utilisateur</a> pour des instructions détaillées sur
          l'utilisation de l'application.
        </p>
      </div>
  
      <div class="help-section">
        <h2>Contactez-nous</h2>
        <p>
          Si vous avez besoin d'aide supplémentaire, vous pouvez nous contacter via notre
          <router-link to="/contact">page de contact</router-link>.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelpPage',
  };
  </script>
  
  <style scoped>
  .help-page {
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
    margin-bottom: 20px;
  }
  .help-section {
    margin-bottom: 20px;
  }
  h2 {
    margin-bottom: 10px;
    color: #333;
  }
  p {
    margin: 0;
    line-height: 1.6;
  }
  a {
    color: #007bff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  </style>
  