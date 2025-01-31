<template>
  <section class="hero is-primary is-medium">
    <div class="hero-body has-text-centered">
      <div class="container">
        <h1 class="title">Pourquoi louer votre matériel informatique avec Locamat ?</h1>
        <h2 class="subtitle">Innovation, flexibilité et responsabilité</h2>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="columns is-multiline is-variable is-8">
        <!-- Économie -->
        <div class="column is-12">
          <div class="columns is-vcentered">
            <div class="column is-6 has-text-centered">
              <h3 class="title is-4">Optimisez vos coûts</h3>
              <p>Évitez un investissement initial lourd et maîtrisez votre budget grâce à la location.</p>
            </div>
            <div class="column is-6">
              <figure class="image is-4by3">
                <img src="https://source.unsplash.com/600x400/?money,savings" alt="Optimisation des coûts">
              </figure>
            </div>
          </div>
        </div>
        
        <!-- Flexibilité -->
        <div class="column is-12">
          <div class="columns is-vcentered">
            <div class="column is-6">
              <figure class="image is-4by3">
                <img src="https://source.unsplash.com/600x400/?technology,adaptability" alt="Flexibilité">
              </figure>
            </div>
            <div class="column is-6 has-text-centered">
              <h3 class="title is-4">Flexibilité</h3>
              <p>Adaptez votre matériel en fonction de vos besoins et des évolutions technologiques.</p>
            </div>
          </div>
        </div>
        
        <!-- Écologie -->
        <div class="column is-12">
          <div class="columns is-vcentered">
            <div class="column is-6 has-text-centered">
              <h3 class="title is-4">Engagement écologique</h3>
              <p>Réduisez l’obsolescence et contribuez à une économie circulaire en réutilisant du matériel.</p>
            </div>
            <div class="column is-6">
              <figure class="image is-4by3">
                <img src="https://source.unsplash.com/600x400/?recycling,green" alt="Écologie">
              </figure>
            </div>
          </div>
        </div>

        <!-- Commerce circulaire -->
        <div class="column is-12">
          <div class="columns is-vcentered">
            <div class="column is-6">
              <figure class="image is-4by3">
                <img src="https://source.unsplash.com/600x400/?circular,economy" alt="Commerce circulaire">
              </figure>
            </div>
            <div class="column is-6 has-text-centered">
              <h3 class="title is-4">Commerce circulaire</h3>
              <p>Participer au commerce circulaire, c'est donner une seconde vie aux équipements et réduire le gaspillage technologique.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LocamatMission"
};
</script>

<style scoped>
.hero {
  background-image: url('https://source.unsplash.com/1600x900/?technology,laptop');
  background-size: cover;
  background-position: center;
}
.box {
  transition: transform 0.3s;
}
.box:hover {
  transform: scale(1.05);
}
</style>
