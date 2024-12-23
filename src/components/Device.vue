<template>
  <div class="container">
    <header>
      <h1>Liste des Appareils Disponibles</h1>
    </header>
    
    <div class="main-content">
      <div class="sidebar">
        <h3>Filtrer par</h3>
        
        <!-- Filtre par nom -->
        <div class="filter-item">
          <label for="search">Nom de l'appareil:</label>
          <input v-model="filters.name" type="text" id="search" placeholder="Rechercher...">
        </div>

        <!-- Filtre par catégorie -->
        <div class="filter-item">
          <label for="category">Catégorie:</label>
          <select v-model="filters.category" id="category">
            <option value="">Tous</option>
            <option value="electronics">Électronique</option>
            <option value="tools">Outils</option>
            <option value="furniture">Mobilier</option>
            <option value="audio">Audio</option>
          </select>
        </div>

        <!-- Filtre par stock -->
        <div class="filter-item">
          <label for="stock">En stock:</label>
          <select v-model="filters.stock" id="stock">
            <option value="">Tous</option>
            <option value="inStock">Disponible</option>
            <option value="outOfStock">Épuisé</option>
          </select>
        </div>

        <!-- Filtre par couleur -->
        <div class="filter-item">
          <label for="color">Couleur:</label>
          <select v-model="filters.color" id="color">
            <option value="">Toutes</option>
            <option value="red">Rouge</option>
            <option value="blue">Bleu</option>
            <option value="black">Noir</option>
            <option value="white">Blanc</option>
          </select>
        </div>

        <!-- Filtre par prix -->
        <div class="filter-item">
          <label for="minPrice">Prix minimum:</label>
          <input v-model="filters.minPrice" type="number" id="minPrice" placeholder="Prix minimum">
        </div>
        
        <div class="filter-item">
          <label for="maxPrice">Prix maximum:</label>
          <input v-model="filters.maxPrice" type="number" id="maxPrice" placeholder="Prix maximum">
        </div>

        <!-- Filtre par marque -->
        <div class="filter-item">
          <label for="brand">Marque:</label>
          <select v-model="filters.brand" id="brand">
            <option value="">Toutes</option>
            <option value="brandA">Marque A</option>
            <option value="brandB">Marque B</option>
            <option value="brandC">Marque C</option>
          </select>
        </div>
      </div>

      <div class="device-list">
        <div v-if="loading" class="loading">Chargement des appareils...</div>
        <div v-else>
          <div class="device-grid">
            <div v-for="device in filteredDevices" :key="device.id" class="device-item">
              <!-- Affichage de l'image carrée -->
              <img :src="device.image" alt="Image de l'appareil" class="device-image" v-if="device.image" />
            </div>
          </div>
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../router/firebase" // Importer Firestore
import { collection, getDocs } from 'firebase/firestore'; // Fonctions Firestore

export default {
  name: 'DeviceList',
  data() {
    return {
      devices: [], // Stocker la liste des appareils
      loading: true, // Indicateur de chargement
      errorMessage: '', // Message d'erreur
      filters: {
        name: '',
        category: '',
        stock: '',
        color: '',
        minPrice: null,
        maxPrice: null,
        brand: ''
      }
    };
  },
  computed: {
    filteredDevices() {
      return this.devices.filter(device => {
        return (
          (!this.filters.name || device.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
          (!this.filters.category || device.category === this.filters.category) &&
          (!this.filters.stock || (this.filters.stock === 'inStock' ? device.quantity > 0 : device.quantity === 0)) &&
          (!this.filters.color || device.color === this.filters.color) &&
          (this.filters.minPrice === null || device.price >= this.filters.minPrice) &&
          (this.filters.maxPrice === null || device.price <= this.filters.maxPrice) &&
          (!this.filters.brand || device.brand === this.filters.brand)
        );
      });
    }
  },
  async mounted() {
    try {
      // Récupérer les appareils depuis Firestore
      const querySnapshot = await getDocs(collection(db, 'devices'));
      this.devices = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      this.errorMessage = 'Erreur lors de la récupération des appareils : ' + error.message;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
}

header {
  background-color: #42b983;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 24px;
}

.main-content {
  display: flex;
  flex: 1;
  height: 100%; /* Prend toute la hauteur restante */
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ccc;
  position: fixed; /* Garde la sidebar fixée à gauche */
  top: 80px; /* Positionne la sidebar sous le header */
  left: 0;
  bottom: 0; /* Prend toute la hauteur restante */
  overflow-y: auto;
}

.sidebar h3 {
  margin-bottom: 15px;
}

.filter-item {
  margin-bottom: 15px;
}

.device-list {
  margin-left: 270px; /* Espace pour la sidebar */
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 20px; /* Décale la device list sous le header */
}

.loading {
  font-size: 18px;
  color: #555;
}

.error {
  color: red;
}

.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.device-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.device-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}
</style>
