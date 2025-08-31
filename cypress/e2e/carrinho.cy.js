describe('Testar carrinho SauceDemo', () => {

  beforeEach(() => {
    cy.login("standard_user", "secret_sauce")
    cy.contains('Products', { timeout: 10000 }).should('be.visible')
  })
  // Adicionar produtos ao carrinnho
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
  // Remover produtos do carrinho
  it('Remove produto do carrinho, valida badge e confirma remoção do item', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('contain','2')

    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('contain','1')
    cy.contains('[data-test="shopping-cart-badge"]').should('not.exist')

    cy.contains('Sauce Labs Backpack').should('be.visible')
  })
  it('Remove todos os itens e valida que o carrinho fica vazio', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

    cy.get('[data-test="shopping-cart-badge"]').should('contain','3')
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')

    cy.get('[data-test="remove-sauce-labs-onesie"]').click()
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()

    cy.get('.shopping_cart_badge').should('not.exist')
    cy.get('.cart_item').should('have.length', 0)
  })
  // Validação de produto e preço
  it('Valida que o nome do produto no carrinho corresponde ao adicionado', () => {
  const produto = 'Sauce Labs Backpack'
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.url().should('include', '/cart.html')

  cy.get('.inventory_item_name')
    .should('contain.text', produto)
    .and('be.visible')
})
it('Valida que o preço de cada produto no carrinho está correto', () => {
  const produtos = [
    { nome: 'Sauce Labs Backpack', preco: '$29.99' },
    { nome: 'Sauce Labs Bike Light', preco: '$9.99' },
    { nome: 'Sauce Labs Fleece Jacket', preco: '$49.99' }
  ]
  produtos.forEach((produto) => {
    const dataTest = `add-to-cart-${produto.nome.toLowerCase().replace(/ /g, '-')}`
    cy.get(`[data-test="${dataTest}"]`).click()
  })

  cy.get('.shopping_cart_link').click()
  cy.url().should('include', '/cart.html')

  produtos.forEach((produto) => {
    cy.contains('.inventory_item_name', produto.nome)
      .parents('.cart_item')
      .find('.inventory_item_price')
      .should('have.text', produto.preco)
  })
})
// navegação
it('Carrinho vazio permite voltar à loja com o botão Continue Shopping', () => {
  cy.get('.shopping_cart_link').click()
  cy.get('.cart_item').should('have.length', 0)

  cy.get('[data-test="continue-shopping"]').should('be.visible').click()
  cy.url().should('include', '/inventory.html')
})
it('mantém produtos no carrinho ao voltar para a página de produtos', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('[data-test="shopping-cart-badge"]').should('contain', '1')

  cy.get('.shopping_cart_link').click()
  cy.contains('Your Cart').should('be.visible')
  cy.contains('Sauce Labs Backpack').should('be.visible')

  cy.get('[data-test="continue-shopping"]').click()
  cy.contains('Products').should('be.visible')

  cy.get('[data-test="shopping-cart-badge"]').should('contain', '1')
  cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')
})
})