describe('Testar carrinho SauceDemo', () => {

  beforeEach(() => {
    cy.login("standard_user", "secret_sauce")
    cy.contains('Products', { timeout: 10000 }).should('be.visible')
  })
  it('adicionar 1 produtos no carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('contain','1')
  })
  it('adicionar varios produtos ao carrinho', () =>{
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

    cy.get('[data-test="shopping-cart-badge"]').should('contain','4')
  })
  it('valida que cada produto adicionado esta no carrinho', () => {
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    cy.contains('Sauce Labs Onesie').should('be.visible')
  cy.contains('Test.allTheThings() T-Shirt (Red)').should('be.visible')
  })
})