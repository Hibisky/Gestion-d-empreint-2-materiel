const admin = require('firebase-admin');
const db = admin.firestore();
const express = require('express');
const app = express();

app.get("/api/get-users", async (req, res) => {
    try {
      const usersSnapshot = await db.collection("users").get();
      const users = usersSnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
  
      if (users.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé" });
      }
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  