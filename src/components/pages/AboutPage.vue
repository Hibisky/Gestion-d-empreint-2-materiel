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
              <p>Investir dans du matériel informatique peut représenter une charge financière importante. En optant pour la location, vous réduisez les coûts initiaux et bénéficiez d’un matériel performant sans immobiliser vos fonds. Vous avez la possibilité d’ajuster votre parc informatique en fonction de votre croissance et de vos besoins sans surcoût inattendu.</p>
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
              <p>Dans un monde en perpétuelle évolution, votre entreprise doit pouvoir s’adapter rapidement. La location vous permet de renouveler régulièrement votre matériel et d’accéder aux dernières innovations sans vous soucier de l’obsolescence. Vous bénéficiez d’un matériel toujours à la pointe, adapté à vos exigences du moment.</p>
            </div>
          </div>
        </div>
        
        <!-- Écologie -->
        <div class="column is-12">
          <div class="columns is-vcentered">
            <div class="column is-6 has-text-centered">
              <h3 class="title is-4">Engagement écologique</h3>
              <p>Nous avons tous un rôle à jouer dans la réduction de l’impact environnemental. En louant votre matériel, vous limitez le gaspillage et favorisez la réutilisation des équipements. Cette approche durable permet de prolonger la durée de vie des produits et de réduire les déchets électroniques.</p>
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
              <p>Le commerce circulaire repose sur une économie plus responsable et durable. En réemployant et en optimisant l’utilisation des équipements informatiques, vous contribuez à limiter la production de nouveaux matériels et à préserver les ressources naturelles. Choisir la location, c’est participer activement à cette démarche tout en profitant d’un matériel performant et accessible.</p>
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
