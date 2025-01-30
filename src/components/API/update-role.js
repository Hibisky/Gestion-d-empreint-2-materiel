const express = require('express');
const app = express();
const admin = require('firebase-admin');

// Initialize Firestore
admin.initializeApp();
const db = admin.firestore();

// Route pour mettre à jour le rôle d'un utilisateur avec vérification du token
app.post("/api/update-role", async (req, res) => {
  const { uid, role } = req.body;
  const adminUid = req.user.uid; // Utilise l'UID de l'utilisateur connecté (issu du token)

  try {
    // Vérifie si l'utilisateur connecté est un admin
    const adminSnapshot = await db.collection("users").where("uid", "==", adminUid).get();
    if (adminSnapshot.empty) {
      console.log("Admin introuvable !");
      return res.status(403).json({ message: "Admin introuvable." });
    }

    const adminDoc = adminSnapshot.docs[0];
    console.log("Rôle de l'admin :", adminDoc.data().role);

    // Vérifie que l'admin est bien autorisé à effectuer cette action
    if (adminDoc.data().role !== "admin" && adminDoc.data().role !== "Admin") {
      return res.status(403).json({ message: "Accès refusé : vous devez être admin." });
    }

    // Recherche de l'utilisateur cible dans Firestore
    const userSnapshot = await db.collection("users").where("uid", "==", uid).get();
    if (userSnapshot.empty) {
      console.log("Utilisateur introuvable !");
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    const userDoc = userSnapshot.docs[0].ref;
    await userDoc.update({ role });

    res.status(200).json({ message: "Rôle mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle :", error);
    res.status(500).json({ message: "Problème serveur" });
  }
});
