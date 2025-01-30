
const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require("body-parser"); 
const admin = require("firebase-admin"); 

// Charger la clé privée de Firebase (assure-toi que le fichier JSON est au bon endroit)
const serviceAccount = require("./test-securite-tp-firebase-adminsdk-1uizc-b4117ef7f7.json");


// Initialisation de Firebase avec la clé privée
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://console.firebase.google.com/u/0/project/test-securite-tp/" 
});

// Récupère la base de données Firestore et l'outil d'authentification de Firebase
const db = admin.firestore();
const auth = admin.auth();

// Crée l'application Express
const app = express();

// Ajoute les middlewares pour gérer les requêtes CORS et parser les données JSON
app.use(cors());
app.use(bodyParser.json());

// Route de test pour vérifier si le serveur fonctionne correctement
app.get("/", (req, res) => {
  res.send("Serveur backend fonctionne !");
});

// Route pour récupérer tous les utilisateurs depuis Firestore
app.get("/api/get-users", async (req, res) => {
  try {
    // Récupère tous les utilisateurs dans la collection 'users'
    const usersSnapshot = await db.collection("users").get();
    // Formate les utilisateurs pour renvoyer leur données
    const users = usersSnapshot.docs.map((doc) => ({
      uid: doc.id, // Identifiant unique du document
      ...doc.data(), // Données de l'utilisateur
    }));

    // Renvoie les utilisateurs sous forme de JSON
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour mettre à jour le rôle d'un utilisateur
app.post("/api/update-role", async (req, res) => {
  const { uid, role, adminUid } = req.body; // Récupère les données de la requête

  try {
    console.log("UID Admin reçu :", adminUid); // Affiche l'UID de l'admin

    // Vérifie si l'admin existe dans la base de données
    const adminSnapshot = await db.collection("users").where("uid", "==", adminUid).get();
    if (adminSnapshot.empty) {
      console.log("Admin non trouvé !");
      return res.status(403).json({ message: "Admin introuvable." });
    }

    const adminDoc = adminSnapshot.docs[0]; // Récupère les infos de l'admin
    console.log("Rôle de l'admin :", adminDoc.data().role); // Affiche le rôle de l'admin

    // Vérifie que l'admin a bien le rôle "admin"
    if (adminDoc.data().role !== "admin" && adminDoc.data().role !== "Admin") {
      return res.status(403).json({ message: "Accès refusé : vous devez être admin." });
    }

    // Cherche l'utilisateur à qui changer le rôle
    const userSnapshot = await db.collection("users").where("uid", "==", uid).get();
    if (userSnapshot.empty) {
      console.log("Utilisateur non trouvé !");
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    // Récupère l'ID du document Firestore de l'utilisateur
    const userDoc = userSnapshot.docs[0].ref;

    // Met à jour le rôle de l'utilisateur
    await userDoc.update({ role });

    res.status(200).json({ message: "Rôle mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour supprimer un utilisateur
app.post("/api/delete-user", async (req, res) => {
  const { uid, adminUid } = req.body; // Récupère les données de la requête

  try {
    console.log("UID Admin reçu pour suppression :", adminUid); // Affiche l'UID de l'admin

    // Vérifie si l'admin existe dans la base de données
    const adminSnapshot = await db.collection("users").where("uid", "==", adminUid).get();
    if (adminSnapshot.empty) {
      console.log("Admin non trouvé !");
      return res.status(403).json({ message: "Admin introuvable." });
    }

    const adminDoc = adminSnapshot.docs[0]; // Récupère les infos de l'admin
    console.log("Rôle de l'admin :", adminDoc.data().role); // Affiche le rôle de l'admin

    // Vérifie que l'admin a bien le rôle "admin"
    if (adminDoc.data().role !== "admin" && adminDoc.data().role !== "Admin") {
      return res.status(403).json({ message: "Accès refusé : vous devez être admin." });
    }

    // Vérifie si l'utilisateur existe dans Firebase Auth
    let userExists = true;
    try {
      await auth.getUser(uid);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        userExists = false;
      } else {
        throw error;
      }
    }

    // Cherche l'utilisateur à supprimer dans Firestore
    const userSnapshot = await db.collection("users").where("uid", "==", uid).get();
    if (userSnapshot.empty) {
      console.log("Utilisateur non trouvé dans Firestore !");
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    const userDoc = userSnapshot.docs[0].ref; // Récupère l'ID du document Firestore

    // Supprime l'utilisateur de Firebase Auth si il existe
    if (userExists) {
      await auth.deleteUser(uid);
    } else {
      console.log("Utilisateur non trouvé dans Firebase Auth, suppression uniquement de Firestore.");
    }

    // Supprime l'utilisateur de Firestore
    await userDoc.delete();

    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Démarre le serveur sur le port 3001
const PORT = 3001;
app.listen(PORT, () => console.log(`Serveur backend démarré sur le port 3001`));

// Exporte l'application et la connexion Firebase pour l'utiliser ailleurs si nécessaire
module.exports = { app, db, auth, admin };
