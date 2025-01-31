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
      <div class="columns is-multiline">
        <!-- Économie -->
        <div class="column is-6">
          <div class="box has-text-centered">
            <span class="icon is-large">
              <i class="fas fa-piggy-bank fa-3x"></i>
            </span>
            <h3 class="title is-4">Optimisez vos coûts</h3>
            <p>Évitez un investissement initial lourd et maîtrisez votre budget grâce à la location.</p>
          </div>
        </div>
        
        <!-- Flexibilité -->
        <div class="column is-6">
          <div class="box has-text-centered">
            <span class="icon is-large">
              <i class="fas fa-exchange-alt fa-3x"></i>
            </span>
            <h3 class="title is-4">Flexibilité</h3>
            <p>Adaptez votre matériel en fonction de vos besoins et des évolutions technologiques.</p>
          </div>
        </div>
        
        <!-- Écologie -->
        <div class="column is-6">
          <div class="box has-text-centered">
            <span class="icon is-large">
              <i class="fas fa-leaf fa-3x"></i>
            </span>
            <h3 class="title is-4">Engagement écologique</h3>
            <p>Réduisez l’obsolescence et contribuez à une économie circulaire en réutilisant du matériel.</p>
          </div>
        </div>
        
        <!-- Technologie -->
        <div class="column is-6">
          <div class="box has-text-centered">
            <span class="icon is-large">
              <i class="fas fa-microchip fa-3x"></i>
            </span>
            <h3 class="title is-4">Accès à la dernière technologie</h3>
            <p>Bénéficiez d’un matériel toujours à jour pour une meilleure performance.</p>
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
