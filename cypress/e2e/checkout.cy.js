describe('Testar checkout sauCedemo', () => {

  beforeEach(() => {
    cy.login("standard_user", "secret_sauce")
    cy.contains('Products', { timeout: 10000 }).should('be.visible')
  })

  it('deve permitir abrir checkout mesmo com carrinho vazio (BUG conhecido)', () => {
    cy.get('.shopping_cart_link').click()
    cy.contains('Your Cart').should('be.visible')

    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', 'checkout-step-one.html')
    cy.log('BUG: Checkout pode ser iniciado sem produto no carrinho')
  })

  it('deve permitir checkout somente após adicionar produto (fluxo esperado)', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.contains('Your Cart').should('be.visible')

    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', 'checkout-step-one.html')
    cy.contains('Checkout: Your Information').should('be.visible')
  })

  // Novo teste para validar campos obrigatórios
  it('Valida que os campos First Name, Last Name e Postal Code aparecem', () => {
    // Adiciona produto para não depender do bug
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').should('be.visible')
    cy.get('[data-test="lastName"]').should('be.visible')
    cy.get('[data-test="postalCode"]').should('be.visible')
  })
it('Completa checkout com dados válidos e vai para Overview', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="postalCode"]').type('49000-000')

  cy.get('[data-test="continue"]').click()

  cy.url().should('include', '/checkout-step-two.html')
  cy.contains('Checkout: Overview').should('be.visible')

  cy.contains('Sauce Labs Backpack').should('be.visible')
})
it('Tentar avançar com todos os campos vazios e deve mostrar erro', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="continue"]').click()

  cy.get('[data-test="error"]').should('be.visible')
    .and('contain.text', 'Error: First Name is required')
})
it('Não permite continuar se algum campo obrigatório estiver vazio', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="continue"]').click()
  cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain.text', 'Error: Last Name is required')

  cy.get('[data-test="firstName"]').clear()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="continue"]').click()
  cy.get('[data-test="error"]')
    .should('be.visible')
    .and('contain.text', 'Error: Postal Code is required')
})
it('Checkout cancelado mantém produtos no carrinho', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.url().should('include', '/checkout-step-one.html')
  cy.contains('Checkout: Your Information').should('be.visible')

  cy.get('[data-test="cancel"]').click()

  cy.url().should('include', '/cart.html')
  cy.contains('Your Cart').should('be.visible')

  cy.contains('Sauce Labs Backpack').should('be.visible')
})

})
