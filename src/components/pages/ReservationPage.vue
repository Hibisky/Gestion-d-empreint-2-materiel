<template>
  <section class="section reservation-page">
    <div class="container">
      <h1 class="title has-text-centered">Réserver un Matériel</h1>

      <div class="box">
        <!-- Image du matériel -->
        <figure class="image is-128x128 is-centered">
          <img :src="equipment.image" alt="Image du matériel" v-if="equipment.image" />
        </figure>

        <!-- Formulaire de réservation -->
        <form @submit.prevent="reserveMaterial">
          <!-- Matériel -->
          <div class="field">
            <label class="label">Matériel</label>
            <div class="control">
              <input
                class="input is-static"
                type="text"
                v-model="equipment.name"
                readonly
              />
            </div>
          </div>

          <!-- Quantité -->
          <div class="field">
            <label class="label">Quantité souhaitée</label>
            <div class="control">
              <input
                class="input"
                type="number"
                v-model="requestedQuantity"
                :max="maxAvailableQuantity"
                min="1"
                required
              />
            </div>
            <!-- Message en italique pour le nombre d'équipements restants -->
            <p class="help is-info" v-if="maxAvailableQuantity > 0">
              Il reste <em>{{ maxAvailableQuantity }}</em> équipements disponibles.
            </p>
            <p class="help is-danger" v-else>
              Aucun équipement disponible pour les dates sélectionnées.
            </p>
          </div>

          <!-- Date de début -->
          <div class="field">
            <label class="label">Date de début</label>
            <div class="control">
              <input class="input" type="date" v-model="startDate" :min="today" required />
            </div>
          </div>

          <!-- Date de fin -->
          <div class="field">
            <label class="label">Date de fin</label>
            <div class="control">
              <input class="input" type="date" v-model="endDate" :min="startDate" required />
            </div>
          </div>

          <!-- Bouton de réservation -->
          <div class="field">
            <div class="control">
              <button
                class="button is-primary"
                :disabled="requestedQuantity > maxAvailableQuantity || maxAvailableQuantity <= 0 || !canReserve"
              >
                Réserver
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { collection, addDoc, getDoc, query, where, getDocs, doc } from "firebase/firestore";
import { db, auth } from "../../router/firebase";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ReservationPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const equipmentId = route.query.deviceId || "";
    const equipment = ref({});
    const reservations = ref([]);
    const requestedQuantity = ref(1);
    const startDate = ref("");
    const endDate = ref("");
    const today = ref(new Date().toISOString().split("T")[0]);

    // Calculer la quantité maximale disponible en fonction des réservations
    const maxAvailableQuantity = computed(() => {
      if (!startDate.value || !endDate.value) return equipment.value.quantity;

      // Filtrer les réservations qui se chevauchent avec les dates sélectionnées
      const overlappingReservations = reservations.value.filter((reservation) => {
        const reservedStart = new Date(reservation.startDate);
        const reservedEnd = new Date(reservation.endDate);
        const selectedStart = new Date(startDate.value);
        const selectedEnd = new Date(endDate.value);

        return (
          selectedStart <= reservedEnd &&
          selectedEnd >= reservedStart &&
          reservation.materialId === equipmentId
        );
      });

      // Calculer la quantité déjà réservée pour les dates sélectionnées
      const reservedQuantity = overlappingReservations.reduce(
        (sum, reservation) => sum + reservation.requestedQuantity,
        0
      );

      // Retourner la quantité disponible
      return Math.max(0, equipment.value.quantity - reservedQuantity);
    });

    const canReserve = computed(() => {
      return requestedQuantity.value <= maxAvailableQuantity.value;
    });

    // Récupérer les infos du matériel et les réservations existantes
    const fetchEquipmentAndReservations = async () => {
      if (!equipmentId) return;

      // Récupérer les infos du matériel
      const equipmentDoc = await getDoc(doc(db, "devices", equipmentId));
      if (equipmentDoc.exists()) {
        equipment.value = { id: equipmentDoc.id, ...equipmentDoc.data() };
      }

      // Récupérer les réservations existantes
      const q = query(collection(db, "reservations"), where("materialId", "==", equipmentId));
      const querySnapshot = await getDocs(q);
      reservations.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    // Fonction pour réserver
    const reserveMaterial = async () => {
      if (!canReserve.value || maxAvailableQuantity.value <= 0) {
        alert("Quantité demandée non disponible ou dates invalides.");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        alert("Veuillez vous connecter pour effectuer une réservation.");
        return;
      }

      const newReservation = {
        userId: user.uid,
        userName: user.displayName || "Utilisateur",
        materialId: equipment.value.id,
        materialName: equipment.value.name,
        materialImage: equipment.value.image,
        requestedQuantity: requestedQuantity.value,
        startDate: startDate.value,
        endDate: endDate.value,
      };

      try {
        await addDoc(collection(db, "reservations"), newReservation);
        alert("Réservation effectuée avec succès !");
        router.push("/devices");
      } catch (error) {
        console.error("Erreur lors de la réservation :", error);
        alert("Une erreur est survenue lors de la réservation.");
      }
    };

    onMounted(() => {
      const user = auth.currentUser;
      if (!user) {
        alert("Veuillez vous connecter pour effectuer une réservation.");
        router.push({ name: 'auth' });// Redirige vers la page de connexion
        return;
      }

      fetchEquipmentAndReservations();
    });

    return {
      equipment,
      requestedQuantity,
      startDate,
      endDate,
      today,
      maxAvailableQuantity,
      canReserve,
      reserveMaterial,
    };
  },
};
</script>

<style scoped>
.reservation-page {
  padding: 2rem;
}
.box {
  margin-top: 2rem;
}
.title {
  margin-bottom: 1rem;
}
.image img {
  max-width: 100px;
  border-radius: 8px;
}
.help {
  font-style: italic;
}
</style>
