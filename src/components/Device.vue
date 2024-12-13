<template>
  <div class="device-list">
    <h1>Liste des Appareils Disponibles</h1>
    <div v-if="loading" class="loading">Chargement des appareils...</div>
    <div v-else>
      <ul>
        <li v-for="device in devices" :key="device.id" class="device-item">
          <!-- Affichage de l'image -->
          <img :src="device.image" alt="Image de l'appareil" class="device-image" v-if="device.image" />
          <h3>{{ device.name }}</h3>
          <p>Quantité : {{ device.quantity }}</p>
          <p>Description : {{ device.description }}</p>
        </li>
      </ul>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { db } from '../firebase'; // Importer Firestore
import { collection, getDocs } from 'firebase/firestore'; // Fonctions Firestore

export default {
  name: 'DeviceList', // Respecte la règle multi-word-component-names
  data() {
    return {
      devices: [], // Stocker la liste des appareils
      loading: true, // Indicateur de chargement
      errorMessage: '', // Message d'erreur
    };
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
.device-list {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.loading {
  font-size: 18px;
  color: #555;
}

.error {
  color: red;
}

ul {
  list-style: none;
  padding: 0;
}

.device-item {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.device-item h3 {
  margin: 10px 0;
  color: #42b983;
}

.device-item p {
  margin: 5px 0;
  color: #333;
}

.device-image {
  width: 150px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
