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
// Visao Geral
it('Exibe todos os produtos do carrinho no checkout', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

  cy.get('.shopping_cart_link').click()

  cy.contains('Sauce Labs Backpack').should('be.visible')
  cy.contains('Sauce Labs Bike Light').should('be.visible')
  cy.contains('Sauce Labs Bolt T-Shirt').should('be.visible')
})
it('Exibe os preços corretos dos produtos no carrinho', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

  cy.get('.shopping_cart_link').click()

  cy.contains('.cart_item', 'Sauce Labs Backpack')
    .should('contain.text', '$29.99')

  cy.contains('.cart_item', 'Sauce Labs Bike Light')
    .should('contain.text', '$9.99')

  cy.contains('.cart_item', 'Sauce Labs Bolt T-Shirt')
    .should('contain.text', '$15.99')
})
it('Calcula o subtotal corretamente somando os preços dos produtos', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

  cy.get('.shopping_cart_link').click()

  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="postalCode"]').type('49000-000')
  cy.get('[data-test="continue"]').click()

  cy.get('.summary_subtotal_label').invoke('text').then((text) => {
    const subtotalExibido = parseFloat(text.replace('Item total: $', ''))
    const somaEsperada = 29.99 + 9.99 + 15.99
    
    expect(subtotalExibido).to.eq(somaEsperada)
  })
})
it('Exibe o valor de Tax corretamente no checkout', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

  cy.get('.shopping_cart_link').click()

  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="postalCode"]').type('49000-000')
  cy.get('[data-test="continue"]').click()

  cy.get('.summary_tax_label')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const valorTax = parseFloat(text.replace('Tax: $', ''))
      expect(valorTax).to.be.greaterThan(0)
    })
})
it('Valida que o total é igual ao subtotal + tax', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="postalCode"]').type('49000000')
  cy.get('[data-test="continue"]').click()

  cy.get('.summary_subtotal_label').invoke('text').then((subtotalText) => {
    const subtotal = parseFloat(subtotalText.replace('Item total: $', ''))

    cy.get('.summary_tax_label').invoke('text').then((taxText) => {
      const tax = parseFloat(taxText.replace('Tax: $', ''))

      cy.get('.summary_total_label').invoke('text').then((totalText) => {
        const total = parseFloat(totalText.replace('Total: $', ''))

        expect(total).to.eq(subtotal + tax)
      })
    })
  })
})
it('Cancelar no checkout mantém os itens no carrinho', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="cancel"]').click()

  cy.url().should('include', '/cart.html')

  cy.get('.cart_item').should('have.length', 2)
})
//Checkout-Completo
it('Finalizar checkout redireciona para Checkout Complete', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="postalCode"]').type('49000000')
  cy.get('[data-test="continue"]').click()

  cy.get('[data-test="finish"]').click()

  cy.url().should('include', '/checkout-complete.html')
  cy.contains('Thank you for your order!').should('be.visible')
})
it('Exibe imagem de confirmação do pedido (pônei)', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="postalCode"]').type('49000000')
  cy.get('[data-test="continue"]').click()

  cy.get('[data-test="finish"]').click()

  cy.get('.pony_express').should('be.visible')
})
it('Botão Back Home retorna para Products', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="postalCode"]').type('49000000')
  cy.get('[data-test="continue"]').click()

  cy.get('[data-test="finish"]').click()

  cy.get('[data-test="back-to-products"]').click()

  cy.url().should('include', '/inventory.html')
  cy.contains('Products').should('be.visible')
})
it('Carrinho fica vazio após finalizar o pedido', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  cy.get('.shopping_cart_link').click()
  cy.get('[data-test="checkout"]').click()

  cy.get('[data-test="firstName"]').type('Italo')
  cy.get('[data-test="lastName"]').type('Oliveira')
  cy.get('[data-test="postalCode"]').type('49000000')
  cy.get('[data-test="continue"]').click()

  cy.get('[data-test="finish"]').click()

  cy.get('.shopping_cart_badge').should('not.exist')

  cy.get('[data-test="back-to-products"]').click()
  cy.get('.shopping_cart_badge').should('not.exist')
})
})