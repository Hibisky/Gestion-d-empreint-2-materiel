<template>
  <section class="section my-reservations">
    <div class="container">
      <h1 class="title has-text-centered">Mes Réservations</h1>

      <!-- Liste des réservations -->
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom du Matériel</th>
              <th>Quantité Réservée</th>
              <th>Date de Début</th>
              <th>Date de Fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations" :key="reservation.id">
              <td>
                <figure class="image is-64x64">
                  <img :src="reservation.materialImage" alt="Image du matériel" />
                </figure>
              </td>
              <td>{{ reservation.materialName }}</td>
              <td>{{ reservation.requestedQuantity }}</td>
              <td>{{ reservation.startDate }}</td>
              <td>{{ reservation.endDate }}</td>
              <td>
                <button class="button is-info" @click="editReservation(reservation)">
                  Modifier
                </button>
                <button class="button is-danger" @click="deleteReservation(reservation.id)">
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal pour modifier une réservation -->
    <div class="modal" :class="{ 'is-active': isEditModalOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modifier Réservation</p>
          <button class="delete" aria-label="close" @click="closeEditModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Quantité</label>
            <div class="control">
              <input
                class="input"
                type="number"
                v-model="editForm.requestedQuantity"
                min="1"
                :max="editForm.maxAvailableQuantity"
              />
            </div>
            <p class="help is-info">
              Maximum disponible : {{ editForm.maxAvailableQuantity }}.
            </p>
          </div>
          <div class="field">
            <label class="label">Date de Début</label>
            <div class="control">
              <input class="input" type="date" v-model="editForm.startDate" />
            </div>
          </div>
          <div class="field">
            <label class="label">Date de Fin</label>
            <div class="control">
              <input class="input" type="date" v-model="editForm.endDate" />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateReservation">Enregistrer</button>
          <button class="button" @click="closeEditModal">Annuler</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../router/firebase";

export default {
  name: "MyReservations",
  setup() {
    const reservations = ref([]);
    const isEditModalOpen = ref(false);
    const editForm = ref({
      id: "",
      requestedQuantity: 1,
      startDate: "",
      endDate: "",
      maxAvailableQuantity: 0,
    });

    // Charger les réservations de l'utilisateur connecté
    const fetchReservations = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const querySnapshot = await getDocs(collection(db, "reservations"));
        reservations.value = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((reservation) => reservation.userId === user.uid);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
      }
    };

    // Ouvrir le modal de modification
    const editReservation = async (reservation) => {
      isEditModalOpen.value = true;
      editForm.value = { ...reservation };

      // Récupérer la quantité disponible pour le matériel
      const materialDoc = await getDoc(doc(db, "devices", reservation.materialId));
      if (materialDoc.exists()) {
        const material = materialDoc.data();
        editForm.value.maxAvailableQuantity = material.quantity;
      }
    };

    // Fermer le modal de modification
    const closeEditModal = () => {
      isEditModalOpen.value = false;
    };

    // Mettre à jour une réservation
    const updateReservation = async () => {
      try {
        const reservationRef = doc(db, "reservations", editForm.value.id);
        await updateDoc(reservationRef, {
          requestedQuantity: editForm.value.requestedQuantity,
          startDate: editForm.value.startDate,
          endDate: editForm.value.endDate,
        });
        alert("Réservation mise à jour avec succès !");
        closeEditModal();
        fetchReservations();
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la réservation :", error);
        alert("Une erreur est survenue lors de la mise à jour.");
      }
    };

    // Supprimer une réservation
    const deleteReservation = async (id) => {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
        try {
          await deleteDoc(doc(db, "reservations", id));
          alert("Réservation supprimée avec succès !");
          fetchReservations();
        } catch (error) {
          console.error("Erreur lors de la suppression de la réservation :", error);
          alert("Une erreur est survenue lors de la suppression.");
        }
      }
    };

    onMounted(() => {
      fetchReservations();
    });

    return {
      reservations,
      isEditModalOpen,
      editForm,
      fetchReservations,
      editReservation,
      closeEditModal,
      updateReservation,
      deleteReservation,
    };
  },
};
</script>

<style scoped>
.my-reservations {
  padding: 2rem;
}
.table-container {
  margin-top: 2rem;
}
.title {
  margin-bottom: 1.5rem;
  text-align: center;
}
.image img {
  max-width: 100%;
  border-radius: 8px;
}
</style>
