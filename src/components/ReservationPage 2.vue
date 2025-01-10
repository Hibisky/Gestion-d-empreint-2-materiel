<template>
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">Réservation de Matériel</h1>
        <div class="box">
          <h2 class="subtitle">Réserver un matériel</h2>
          <form @submit.prevent="reserveMaterial">
            <div class="field">
              <label class="label">Matériel</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="equipment.name"
                  readonly
                  placeholder="Nom du matériel"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Date de début</label>
              <div class="control">
                <input class="input" type="date" v-model="startDate" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Date de fin</label>
              <div class="control">
                <input class="input" type="date" v-model="endDate" required />
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary" type="submit">Réserver</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { collection, addDoc, getDoc, doc } from "firebase/firestore";
  import { db } from "../firebase.js";
  import { useRoute } from "vue-router";
  
  export default {
    name: "ReservationPage",
    setup() {
      const route = useRoute();
      const equipmentId = route.query.deviceId || "";
      const equipment = ref({});
      const startDate = ref("");
      const endDate = ref("");
  
      const fetchEquipment = async () => {
        if (!equipmentId) return;
        const equipmentDoc = await getDoc(doc(db, "devices", equipmentId));
        if (equipmentDoc.exists()) {
          equipment.value = { id: equipmentDoc.id, ...equipmentDoc.data() };
        }
      };
  
      const reserveMaterial = async () => {
        if (startDate.value > endDate.value) {
          alert("La date de fin doit être postérieure à la date de début.");
          return;
        }
        const newReservation = {
          materialId: equipment.value.id,
          materialName: equipment.value.name,
          startDate: startDate.value,
          endDate: endDate.value,
        };
        await addDoc(collection(db, "reservations"), newReservation);
        alert("Matériel réservé avec succès !");
        startDate.value = "";
        endDate.value = "";
      };
  
      onMounted(() => {
        fetchEquipment();
      });
  
      return { equipment, startDate, endDate, reserveMaterial };
    },
  };
  </script>
  
  <style>
  .section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .title {
    margin-bottom: 20px;
  }
  .box {
    margin-top: 20px;
  }
  </style>
  