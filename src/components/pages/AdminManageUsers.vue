<template>
    <div class="manage-users">
      <h1>Gérer les utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Numéro de téléphone</th>
            <th>Ville</th>
            <th>Code postal</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.uid">
            <td>{{ user.email }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.city }}</td>
            <td>{{ user.zipCode }}</td>
            <td>
              <select v-model="user.role">
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </td>
            <td>
              <button @click="saveRole(user)">Enregistrer</button>
              <button @click="deleteUser(user.uid)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal de confirmation -->
      <div v-if="showConfirmationModal" class="confirmation-modal">
        <h2>Confirmation requise</h2>
        <p>Veuillez entrer votre mot de passe pour confirmer l'action.</p>
        <input
          type="password"
          v-model="adminPassword"
          placeholder="Mot de passe"
        />
        <div class="modal-actions">
          <button @click="confirmRoleUpdate">Confirmer</button>
          <button @click="cancelRoleUpdate">Annuler</button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
<script>
import { ref, onMounted } from "vue";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/router/firebase";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default {
  name: "AdminManageUsers",
  setup() {
    const users = ref([]);
    const showConfirmationModal = ref(false);
    const adminPassword = ref(""); // Mot de passe de l'utilisateur connecté
    const errorMessage = ref("");
    const userToUpdate = ref(null);
    const currentUserUid = ref(""); // UID de l'utilisateur connecté

    // Charger les utilisateurs depuis Firestore
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const allUsers = querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));

        // Exclure le compte générique (par email ou un champ `protected`)
        users.value = allUsers.filter(
          (user) => user.email !== "generic@example.com" && !user.protected
        );

        // Récupérer l'utilisateur actuellement connecté
        const currentUser = auth.currentUser;
        if (currentUser) {
          currentUserUid.value = currentUser.uid;
        }
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    };

    // Enregistrer un rôle avec double authentification
    const saveRole = (user) => {
      userToUpdate.value = user;
      showConfirmationModal.value = true;
    };

    const confirmRoleUpdate = async () => {
      try {
        // Vérifier le mot de passe de l'utilisateur connecté
        const currentUser = auth.currentUser;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          adminPassword.value
        );
        await reauthenticateWithCredential(currentUser, credential);

        // Mettre à jour le rôle dans Firestore
        const userRef = doc(db, "users", userToUpdate.value.uid);
        await updateDoc(userRef, { role: userToUpdate.value.role });

        alert("Rôle mis à jour avec succès !");
        showConfirmationModal.value = false;
        adminPassword.value = "";
        userToUpdate.value = null;
        fetchUsers();
      } catch (error) {
        console.error("Erreur lors de la confirmation :", error);
        if (error.code === "auth/wrong-password") {
          errorMessage.value = "Mot de passe incorrect.";
        } else {
          errorMessage.value = "Une erreur est survenue.";
        }
      }
    };

    const cancelRoleUpdate = () => {
      showConfirmationModal.value = false;
      adminPassword.value = "";
      userToUpdate.value = null;
      errorMessage.value = "";
    };

    // Supprimer un utilisateur (empêcher la suppression du compte connecté ou générique)
    const deleteUser = async (uid) => {
      if (uid === currentUserUid.value) {
        alert("Vous ne pouvez pas supprimer votre propre compte.");
        return;
      }

      if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        try {
          const userRef = doc(db, "users", uid);
          await deleteDoc(userRef);
          alert("Utilisateur supprimé !");
          users.value = users.value.filter((u) => u.uid !== uid);
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
        }
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      showConfirmationModal,
      adminPassword,
      errorMessage,
      saveRole,
      confirmRoleUpdate,
      cancelRoleUpdate,
      deleteUser,
    };
  },
};
</script>
<style scoped>
.manage-users {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

select {
  padding: 5px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.confirmation-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.modal-actions {
  margin-top: 15px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
  