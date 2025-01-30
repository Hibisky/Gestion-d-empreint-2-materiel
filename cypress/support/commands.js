// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

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

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })