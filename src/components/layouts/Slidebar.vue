<template>
  <div class="sidebar">
    <h2>Menu</h2>
    <ul>
      <li><router-link to="/">Connexion</router-link></li>
      <li><router-link to="/home">Accueil</router-link></li>
      <li><router-link to="/profil">Profil</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
.sidebar {
  width: 250px; /* Largeur de la sidebar */
  height: 100vh; /* Hauteur égale à la fenêtre */
  background-color: #add8e6; /* Bleu clair */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Ombre légère */
  position: fixed; /* Position fixe sur le côté gauche */
  top: 0;
  left: 0;
}

.sidebar h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar ul li a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

.sidebar ul li a:hover {
  color: #000;
}
</style>
