<template>
  <div class="add-device">
    <h1>Ajouter un Appareil</h1>
    <form @submit.prevent="addDevice">
      <div>
        <label for="name">Nom de l'appareil :</label>
        <input id="name" v-model="device.name" type="text" placeholder="Nom de l'appareil" required />
      </div>
      <div>
        <label for="quantity">Quantité :</label>
        <input id="quantity" v-model.number="device.quantity" type="number" placeholder="Quantité" required />
      </div>
      <div>
        <label for="description">Description :</label>
        <textarea
          id="description"
          v-model="device.description"
          placeholder="Description de l'appareil"
          required
        ></textarea>
      </div>
      <div>
        <label for="image">Lien de l'image :</label>
        <input id="image" v-model="device.image" type="url" placeholder="Lien de l'image (URL)" required />
      </div>
      <button type="submit">Ajouter</button>
    </form>
    <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { db } from '../../router/firebase'; // Assurez-vous que votre fichier firebase.js exporte `db`
import { addDoc, collection } from 'firebase/firestore'; // Importez les fonctions Firestore

export default {
  name: 'AddDevice',
  data() {
    return {
      device: {
        name: '',
        quantity: 0,
        description: '',
        image: '', // Nouveau champ pour l'image
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async addDevice() {
      try {
        const devicesCollection = collection(db, 'devices'); // Collection "devices" dans Firestore
        await addDoc(devicesCollection, {
          name: this.device.name,
          quantity: this.device.quantity,
          description: this.device.description,
          image: this.device.image, // Enregistrer l'image
          createdAt: new Date(), // Ajouter une date de création
        });
        this.successMessage = 'Appareil ajouté avec succès !';
        this.resetForm();
      } catch (error) {
        this.errorMessage = 'Erreur lors de l’ajout de l’appareil : ' + error.message;
      }
    },
    resetForm() {
      this.device.name = '';
      this.device.quantity = 0;
      this.device.description = '';
      this.device.image = ''; // Réinitialiser le champ image
    },
  },
};
</script>

<style scoped>
.add-device {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
}
input, textarea {
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
button:hover {
  background-color: #36976b;
}
</style>
