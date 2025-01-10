# Documentation des Tests Cypress

## Table des matières
1. [Introduction](#introduction)
2. [Configuration initiale](#configuration-initiale)
3. [Structure des tests](#structure-des-tests)
4. [Problèmes rencontrés et solutions](#problèmes-rencontrés-et-solutions)
5. [Configuration finale](#configuration-finale)

## Introduction
Ce document retrace la mise en place des tests automatisés avec Cypress pour le projet de gestion d'emprunt de matériel. Il documente le processus d'implémentation, les problèmes rencontrés et leurs solutions.

## Configuration initiale

### Installation de Cypress
```bash
npm install cypress --save-dev
```

### Configuration du package.json
Scripts ajoutés pour l'exécution des tests :
```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "test:e2e": "cypress run"
  }
}
```

### Configuration de Mochawesome pour les rapports
```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

## Structure des tests

### Tests implémentés
1. Test de la page d'accueil
   - Vérification de la présence du header
   - Vérification du logo
   - Vérification de la navigation

2. Test de navigation vers le formulaire d'ajout
   - Connexion utilisateur
   - Navigation vers la page d'ajout
   - Vérification de l'URL

3. Test d'ajout d'appareil
   - Remplissage du formulaire
   - Soumission
   - Vérification du message de succès

### Commandes personnalisées
Création d'une commande de connexion dans `commands.js` :
```javascript
Cypress.Commands.add('login', () => {
  // Augmenter le timeout pour la commande
  Cypress.config('defaultCommandTimeout', 10000)
  
  cy.visit('http://localhost:8080/auth')
  
  // Attendre que la page soit complètement chargée
  cy.get('.login-page', { timeout: 10000 }).should('be.visible')
  
  // Attendre et remplir l'email
  cy.get('#email', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('aito.kenza@gmail.com', { delay: 100 })
  
  // Attendre et remplir le mot de passe
  cy.get('#password', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type('TP2test&securiT*123', { delay: 100 })
  
  // Cliquer sur le bouton plutôt que submit le formulaire
  cy.get('button[type="submit"]', { timeout: 10000 })
    .should('be.visible')
    .click()
  
  // Attendre plus longtemps pour la redirection
  cy.url({ timeout: 15000 }).should('include', '/devices')
})
```

## Problèmes rencontrés et solutions

### 1. Problème de sélecteurs
**Problème** : Les sélecteurs initiaux ne correspondaient pas à la structure HTML.
**Solution** : Analyse des composants Vue.js et mise à jour des sélecteurs pour correspondre à la structure réelle.

### 2. Problème de timing
**Problème** : Les tests échouaient à cause des délais de chargement.
**Solution** : 
- Augmentation des timeouts
- Ajout de vérifications de visibilité
- Utilisation de `delay` pour les actions de frappe

### 3. Problème d'authentification
**Problème** : Difficulté à maintenir l'état de connexion.
**Solution** : 
- Amélioration de la commande de connexion
- Attente explicite des redirections
- Vérification de l'état de la page après connexion

## Configuration finale

### Structure des fichiers de test
```
cypress/
├── e2e/
│   └── home.cy.js
├── support/
│   └── commands.js
├── reports/
└── ReadmeTests.md
```

### Exécution des tests
Pour exécuter les tests :
```bash
# Ouvrir l'interface Cypress
npm run cypress:open

# Exécuter les tests en mode headless
npm run test:e2e
```

### Bonnes pratiques identifiées
1. Utiliser des sélecteurs spécifiques (IDs, classes dédiées)
2. Ajouter des timeouts appropriés
3. Vérifier la visibilité des éléments avant interaction
4. Utiliser des commandes personnalisées pour les actions répétitives
5. Documenter les tests et les changements

## Notes supplémentaires
- Les tests nécessitent que l'application soit en cours d'exécution (`npm run serve`)
- Les identifiants de test doivent être valides dans Firebase
- Les rapports de test sont générés dans le dossier `cypress/reports` 