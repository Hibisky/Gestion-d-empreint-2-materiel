<template>
  <div class="about-page">
    <!-- Image en fond -->
    <div class="about-header">
      <div class="about-title-box">
        <h1>Pourquoi louer votre matériel informatique avec Locamat ?</h1>
        <h2 class="subtitle">Innovation, flexibilité et responsabilité</h2>
      </div>
    </div>

    <!-- Bloc blanc englobant toutes les informations -->
    <div class="about-content">
      <div class="about-container">
        <div 
          class="about-section" 
          v-for="(section, index) in sections" 
          :key="index" 
          :class="{ 'reverse': index % 2 !== 0 }">
          <div class="about-text">
            <h3 class="title">{{ section.title }}</h3>
            <p>{{ section.text }}</p>
          </div>
          <div class="about-image">
            <img :src="section.image" :alt="section.title" />
          </div>
        </div>
      </div>
    </div>

    <!-- Utilisation du composant Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/layouts/FooterPage.vue";

export default {
  name: "AboutPage",
  components: {
    Footer,
  },
  data() {
    return {
      sections: [
        {
          title: "Optimisez vos coûts",
          text: " Investir dans du matériel informatique peut représenter une charge financière importante. En optant pour la location, vous réduisez les coûts initiaux et bénéficiez d’un matériel performant sans immobiliser vos fonds. Vous avez la possibilité d’ajuster votre parc informatique en fonction de votre croissance et de vos besoins sans surcoût inattendu",
          image: "https://source.unsplash.com/600x400/?technology,adaptability"
        },
        {
          title: "Flexibilité",
          text: "Dans un monde en perpétuelle évolution, votre entreprise doit pouvoir s’adapter rapidement. La location vous permet de renouveler régulièrement votre matériel et d’accéder aux dernières innovations sans vous soucier de l’obsolescence. Vous bénéficiez d’un matériel toujours à la pointe, adapté à vos exigences du moment.",
          image: "https://source.unsplash.com/600x400/?technology,adaptability"
        },
        {
          title: "Engagement écologique",
          text: "Nous avons tous un rôle à jouer dans la réduction de l’impact environnemental...\n En louant votre matériel, vous limitez le gaspillage et favorisez la réutilisation des équipements. Cette approche durable permet de prolonger la durée de vie des produits et de réduire les déchets électroniques.",
          image: "https://source.unsplash.com/600x400/?recycling,green"
        },
        {
          title: "Commerce circulaire",
          text: "Le commerce circulaire repose sur une économie plus responsable et durable. En réemployant et en optimisant l’utilisation des équipements informatiques, vous contribuez à limiter la production de nouveaux matériels et à préserver les ressources naturelles. Choisir la location, c’est participer activement à cette démarche tout en profitant d’un matériel performant et accessible.",
          image: "https://source.unsplash.com/600x400/?circular,economy"
        }
      ]
    };
  }
};
</script>

<style>
/* Styles de la page About */
.about-page {
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
  text-align: center;
}

/* Image en fond */
.about-header {
  background: lightgreen center/cover no-repeat;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Bloc blanc autour du titre */
.about-title-box {
  background: white;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.about-title-box h1 {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  color: #66CDAA;
}

/* Bloc blanc contenant toutes les informations */
.about-content {
  background: white;
  max-width: 90%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.about-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.about-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
}

.about-section.reverse {
  flex-direction: row-reverse;
}

.about-text {
  flex: 1;
  text-align: left;
  padding: 20px;
}

.about-text h3 {
  font-size: 24px;
  font-weight: bold;
  color: #66CDAA;
}

.about-image {
  flex: 1;
  text-align: center;
}

.about-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
