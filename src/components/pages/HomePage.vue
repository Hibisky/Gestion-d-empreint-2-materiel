<template>
  <div class="home-page">
    <!-- Main Welcome Section -->
    <section class="main-info">
      <h2>{{ msg }}</h2>
      <p>Bienvenue sur la page d'accueil !</p>
      <img src="@/assets/images/vague.png" alt="Logo" class="logo" />
      <p>Cette page est en cours de construction. Plus d'informations à venir.</p>
    </section>
  </div>
</template>

<script>


export default {
  name: "HomePage",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.home-page {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
  min-height: calc(100vh - 80px); /* Adjust based on your header and footer height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-info {
  margin-top: 40px;
}

.main-info h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.main-info p {
  font-size: 1.2rem;
  color: #555;
}

.logo {
  width: 150px;
  margin-top: 20px;
}
</style>
