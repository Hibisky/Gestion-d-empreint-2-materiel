<template>
    <div class="reservation-container">
      <h1>Réservations</h1>
  
      <!-- Section des réservations déjà effectuées -->
      <div class="reservations-list">
        <h2>Réservations déjà effectuées</h2>
        <table>
          <thead>
            <tr>
              <th>Élément</th>
              <th>Date de réservation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations" :key="reservation.id">
              <td>{{ reservation.item }}</td>
              <td>{{ reservation.date }}</td>
              <td>
                <button @click="cancelReservation(reservation.id)">Annuler</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Section pour réserver un nouvel élément -->
      <div class="new-reservation-form">
        <h2>Nouvelle réservation</h2>
        <form @submit.prevent="makeReservation">
          <label for="item">Choisissez un élément à réserver :</label>
          <select v-model="newReservation.item" required>
            <option value="Salle A">Salle A</option>
            <option value="Salle B">Salle B</option>
            <option value="Matériel X">Matériel X</option>
            <option value="Matériel Y">Matériel Y</option>
          </select>
  
          <label for="date">Choisissez une date :</label>
          <input type="date" v-model="newReservation.date" required />
  
          <button type="submit">Réserver</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Liste des réservations existantes
        reservations: [
          { id: 1, item: 'Salle A', date: '2024-12-25' },
          { id: 2, item: 'Matériel X', date: '2024-12-28' },
          { id: 3, item: 'Salle B', date: '2024-12-30' }
        ],
        // Données du formulaire de nouvelle réservation
        newReservation: {
          item: '',
          date: ''
        }
      };
    },
    methods: {
      // Fonction pour annuler une réservation
      cancelReservation(reservationId) {
        const index = this.reservations.findIndex(res => res.id === reservationId);
        if (index !== -1) {
          this.reservations.splice(index, 1);
          alert('Réservation annulée avec succès.');
        }
      },
  
      // Fonction pour effectuer une nouvelle réservation
      makeReservation() {
        if (this.newReservation.item && this.newReservation.date) {
          const newReservation = {
            id: this.reservations.length + 1,
            item: this.newReservation.item,
            date: this.newReservation.date
          };
          this.reservations.push(newReservation);
          alert('Réservation effectuée avec succès.');
  
          // Réinitialiser le formulaire après réservation
          this.newReservation.item = '';
          this.newReservation.date = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .reservation-container {
    max-width: 800px;
    margin: 30px auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1, h2 {
    text-align: center;
  }
  
  .reservations-list table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .reservations-list th, .reservations-list td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }
  
  button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #e53935;
  }
  
  .new-reservation-form {
    margin-top: 20px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
  }
  
  .new-reservation-form input,
  .new-reservation-form select,
  .new-reservation-form button {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  .new-reservation-form button {
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  
  .new-reservation-form button:hover {
    background-color: #45a049;
  }
  </style>
  