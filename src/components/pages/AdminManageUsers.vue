<template>
  <div class="container manage-users">
    <h1 class="title is-3 has-text-centered">Gérer les utilisateurs</h1>

    <table class="table is-fullwidth is-bordered is-striped is-hoverable">
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
            <div class="select is-small">
              <select v-model="user.role">
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
          </td>
          <td>
            <button class="button is-primary is-small" @click="saveRole(user)">Enregistrer</button>
            <button class="button is-danger is-small" @click="deleteUser(user.uid)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de confirmation -->
    <div v-if="showConfirmationModal" class="modal is-active">
      <div class="modal-background" @click="cancelRoleUpdate"></div>
      <div class="modal-content">
        <div class="box">
          <h2 class="title is-4">Confirmation requise</h2>
          <p>Veuillez entrer votre mot de passe pour confirmer l'action.</p>
          <input
            class="input"
            type="password"
            v-model="adminPassword"
            placeholder="Mot de passe"
          />
          <div class="modal-actions">
            <button class="button is-primary" @click="confirmRoleUpdate">Confirmer</button>
            <button class="button is-light" @click="cancelRoleUpdate">Annuler</button>
          </div>
          <p v-if="errorMessage" class="has-text-danger mt-3">{{ errorMessage }}</p>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="cancelRoleUpdate"></button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth } from "@/router/firebase";

export default {
  name: "AdminManageUsers",
  setup() {
    const users = ref([]);
    const showConfirmationModal = ref(false);
    const adminPassword = ref("");
    const errorMessage = ref("");
    const userToUpdate = ref(null);
    const currentUserUid = ref("");

    // Charger les utilisateurs via l'API backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/get-users");
        if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs.");
        users.value = await response.json();

        // Récupérer l'utilisateur connecté
        const currentUser = auth.currentUser;
        if (currentUser) {
          currentUserUid.value = currentUser.uid;
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    // Préparer la mise à jour du rôle
    const saveRole = (user) => {
      userToUpdate.value = user;
      showConfirmationModal.value = true;
    };

    // Confirmer la mise à jour du rôle via l'API backend
    const confirmRoleUpdate = async () => {
      try {
        const currentUser = auth.currentUser;

        const response = await fetch("http://localhost:3001/api/update-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: userToUpdate.value.uid,
            role: userToUpdate.value.role,
            adminUid: currentUser.uid,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          fetchUsers();
          showConfirmationModal.value = false;
        } else {
          errorMessage.value = result.message;
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du rôle :", error);
        errorMessage.value = "Une erreur est survenue.";
      }
    };

    const cancelRoleUpdate = () => {
      showConfirmationModal.value = false;
      adminPassword.value = "";
      userToUpdate.value = null;
      errorMessage.value = "";
    };

    // Supprimer un utilisateur via l'API backend
    const deleteUser = async (uid) => {
      if (uid === currentUserUid.value) {
        alert("Vous ne pouvez pas supprimer votre propre compte.");
        return;
      }

      if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        try {
          const response = await fetch("http://localhost:3001/api/delete-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid, adminUid: auth.currentUser.uid }),
          });

          const result = await response.json();
          if (response.ok) {
            alert(result.message);
            users.value = users.value.filter((u) => u.uid !== uid);
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          alert("Une erreur est survenue.");
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
  margin-top: 20px;
}

button {
  margin-right: 10px;
}

.modal-actions {
  margin-top: 20px;
}

.error-message {
  color: red;
}

.modal {
  z-index: 1050;
}
</style>
