<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Liste des Matériels</h1>

      <!-- Formulaire de filtres -->
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

      <!-- Liste des matériels -->
      <div v-if="loading" class="loading">Chargement des matériels...</div>
      <div v-else>
        <div class="columns is-multiline is-centered">
          <div v-for="device in filteredDevices" :key="device.id" class="column is-one-third">
            <div class="box">
              <!-- Image centrée -->
              <figure class="image is-128x128 is-centered mx-auto">
                <img :src="device.image" alt="Image du matériel" v-if="device.image" />
              </figure>

              <h2 class="title is-4 has-text-centered">{{ device.name }}</h2>
              <p class="has-text-centered">
                <strong>Quantité disponible :</strong> {{ device.quantity }}
              </p>

              <!-- Boutons Modifier / Supprimer visibles uniquement pour l'admin -->
              <div v-if="isAuthenticated && isAdmin" class="buttons is-centered mt-3">
                <button class="button is-warning" @click="editDevice(device.id)">Modifier</button>
                <button class="button is-danger" @click="deleteDevice(device.id)">Supprimer</button>
              </div>

              <!-- Bouton de réservation -->
              <div class="has-text-centered mt-2">
                <button class="button is-primary" @click="reserveDevice(device.id)">
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../router/firebase";
import { useRouter } from "vue-router";

export default {
  name: "DevicePage",
  setup() {
    const devices = ref([]);
    const filteredDevices = ref([]);
    const isAdmin = ref(false);
    const isAuthenticated = ref(false);
    const searchQuery = ref("");
    const startDate = ref("");
    const endDate = ref("");
    const router = useRouter();

    // Vérification de l'utilisateur et du rôle admin en temps réel
    const checkUserRole = async (user) => {
      if (user) {
        isAuthenticated.value = true;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          isAdmin.value = true;
        } else {
          isAdmin.value = false;
        }
      } else {
        isAuthenticated.value = false;
        isAdmin.value = false;
      }
    };

    // Écoute les changements d'authentification Firebase
    onMounted(() => {
      auth.onAuthStateChanged(async (user) => {
        await checkUserRole(user);
      });
      fetchDevices();
    });

    // Récupérer la liste des matériels
    const fetchDevices = async () => {
      const querySnapshot = await getDocs(collection(db, "devices"));
      devices.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      filteredDevices.value = devices.value; // Initialisation des appareils
    };

    // Appliquer les filtres sur les appareils
    const filterDevices = () => {
      filteredDevices.value = devices.value.filter((device) => {
        const matchesSearch =
          searchQuery.value === "" ||
          device.name.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesStartDate = !startDate.value || new Date(device.date) >= new Date(startDate.value);
        const matchesEndDate = !endDate.value || new Date(device.date) <= new Date(endDate.value);

        return matchesSearch && matchesStartDate && matchesEndDate;
      });
    };

    // Réinitialiser les filtres
    const resetFilters = () => {
      searchQuery.value = "";
      startDate.value = "";
      endDate.value = "";
      filteredDevices.value = devices.value; // Réinitialisation
    };

    // Supprimer un matériel (admin uniquement)
    const deleteDevice = async (deviceId) => {
      if (!confirm("Voulez-vous vraiment supprimer ce matériel ?")) return;
      try {
        await deleteDoc(doc(db, "devices", deviceId));
        alert("Matériel supprimé avec succès !");
        fetchDevices();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Impossible de supprimer le matériel.");
      }
    };

    // Rediriger vers la page de modification (admin uniquement)
    const editDevice = (deviceId) => {
      router.push(`/edit-device?deviceId=${deviceId}`);
    };

    // Rediriger vers la page de réservation
    const reserveDevice = (deviceId) => {
      router.push(`/reservation?deviceId=${deviceId}`);
    };

    return {
      devices,
      filteredDevices,
      searchQuery,
      startDate,
      endDate,
      isAdmin,
      isAuthenticated,
      deleteDevice,
      editDevice,
      reserveDevice,
      filterDevices,
      resetFilters,
    };
  },
};
</script>

<style scoped>
/* Style pour le formulaire de filtres et la liste des appareils */
.filters-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filters-form {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input {
  width: auto;
  max-width: 150px;
}

.columns {
  display: flex;
  justify-content: center;
}

.box {
  padding: 1.5rem;
  text-align: center;
}

.image img {
  max-width: 100px;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
