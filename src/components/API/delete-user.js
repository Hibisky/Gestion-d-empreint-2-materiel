const { app, db, auth } = require("../server"); // 🔹 Importe Firebase Admin SDK depuis `server.js`

app.post("/api/delete-user", async (req, res) => {
  const { uid, adminUid } = req.body;

  try {
    // 🔹 Vérifier si l'admin qui fait la requête a bien les droits
    const adminDoc = await db.collection("users").doc(adminUid).get();
    
    if (!adminDoc.exists || adminDoc.data().role !== "admin") {
      return res.status(403).json({ message: "Accès refusé : vous devez être admin." });
    }

    // 🔹 Supprimer l'utilisateur de Firebase Authentication
    await auth.deleteUser(uid);

    // 🔹 Supprimer l'utilisateur de Firestore
    await db.collection("users").doc(uid).delete();

    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
