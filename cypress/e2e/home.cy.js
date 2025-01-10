describe('Test de la page d\'accueil', () => {
  it('devrait charger la page d\'accueil correctement', () => {
    cy.visit('http://localhost:8080')
    cy.get('.main-header').should('exist')
    cy.get('.logo').should('exist')
    cy.get('.nav-center').should('exist')
  })

  it('devrait pouvoir naviguer vers le formulaire d\'ajout', () => {
    cy.login()
    cy.get('.nav-center a').contains('Ajouter un Appareil').click()
    cy.url().should('include', '/add-device')
  })

  it('devrait pouvoir ajouter un nouvel appareil', () => {
    cy.login()
    cy.get('.nav-center a').contains('Ajouter un Appareil').click()
    
    // Remplir le formulaire avec les IDs corrects
    cy.get('#name').type('Appareil Test')
    cy.get('#quantity').type('1')
    cy.get('#description').type('Description test')
    cy.get('#image').type('https://example.com/image.jpg')
    
    // Soumettre le formulaire
    cy.get('button[type="submit"]').click()
    
    // Vérifier le message de succès
    cy.get('.add-device p').contains('Appareil ajouté avec succès').should('exist')
  })
})