<template>
  <div class="device-list">
    <h1 class="title has-text-centered">Liste des Appareils Disponibles</h1>

    <!-- Formulaire de filtres compact -->
    <div class="box filters-container">
      <form @submit.prevent="filterDevices" class="filters-form">
        <div class="field">
          <label class="label is-sr-only">Recherche</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher"
            />
          </div>
        </div>

        <div class="field">
          <label class="label is-sr-only">Date de début</label>
          <div class="control">
            <input class="input" type="date" v-model="startDate" />
          </div>
        </div>

        <div class="field">
          <label class="label is-sr-only">Date de fin</label>
          <div class="control">
            <input class="input" type="date" v-model="endDate" />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-primary" type="submit">Filtrer</button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-light" type="button" @click="resetFilters">
              Réinitialiser
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Liste des appareils -->
    <div v-if="loading" class="loading">Chargement des appareils...</div>
    <div v-else>
      <div class="devices-grid">
        <div v-for="device in filteredDevices" :key="device.id" class="device-item">
          <img :src="device.image" alt="Image de l'appareil" class="device-image" v-if="device.image" />
          <h3>{{ device.name }}</h3>
          <p>Quantité : {{ device.quantity }}</p>
          <p>Description : {{ device.description }}</p>
          <button class="button is-primary" @click="goToReservation(device.id)">Réserver</button>
        </div>
      </div>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "DeviceList",
  data() {
    return {
      devices: [],
      reservations: [],
      loading: true,
      errorMessage: "",
      searchQuery: "",
      startDate: "",
      endDate: "",
    };
  },
  computed: {
    filteredDevices() {
      return this.devices.filter((device) => {
        const matchesSearch =
          this.searchQuery === "" ||
          device.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const isAvailable = this.isDeviceAvailable(device);
        return matchesSearch && isAvailable;
      });
    },
  },
  methods: {
    async fetchDevices() {
      try {
        const querySnapshot = await getDocs(collection(db, "devices"));
        this.devices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        this.errorMessage =
          "Erreur lors de la récupération des appareils : " + error.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchReservations() {
      try {
        const querySnapshot = await getDocs(collection(db, "reservations"));
        this.reservations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        this.errorMessage =
          "Erreur lors de la récupération des réservations : " + error.message;
      }
    },
    isDeviceAvailable(device) {
      if (!this.startDate || !this.endDate) return true;
      const overlappingReservations = this.reservations.filter(
        (reservation) =>
          reservation.materialId === device.id &&
          !(
            new Date(reservation.endDate) < new Date(this.startDate) ||
            new Date(reservation.startDate) > new Date(this.endDate)
          )
      );
      return overlappingReservations.length === 0;
    },
    filterDevices() {},
    resetFilters() {
      this.searchQuery = "";
      this.startDate = "";
      this.endDate = "";
    },
    goToReservation(deviceId) {
      this.$router.push({ name: "Reservation", query: { deviceId } });
    },
  },
  async mounted() {
    await Promise.all([this.fetchDevices(), this.fetchReservations()]);
    this.loading = false;
  },
};
</script>

<style scoped>
.device-list {
  padding: 20px;
}

.title {
  margin-bottom: 20px;
}

/* Conteneur des filtres centré */
.filters-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* Filtres en ligne */
.filters-form {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Largeur des champs de formulaire */
.input {
  width: auto;
  max-width: 150px;
}

/* Grille pour appareils : 3 par ligne */
.devices-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 appareils par ligne */
  gap: 20px;
  margin-top: 20px;
}

.device-item {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ffffff;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.device-item:hover {
  transform: scale(1.02);
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
}

.button {
  margin-top: 10px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.error {
  text-align: center;
  color: red;
  font-size: 16px;
}
</style>
