describe('Saucedemo Fluxos de Login', () => {
  beforeEach(() => {
    cy.visit('/')
    })
  it('verificar site', () => {
    cy.contains('Swag Labs').should('be.visible')
  })
  it('login correto saucedemo', () => {
    cy.login("standard_user", "secret_sauce")

    cy.contains('Products').should('be.visible')
    cy.url().should('include', '/inventory.html')
  })
  it('exibir mensagem de erro ao tentar login com usuário incorreto', () => {
    cy.get('[data-test="username"]').type('teste-invalido')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('.error-message-container').should('be.visible')
    .and('contain.text', 'Epic sadface: Username and password do not match any user in this service')
  })
  it('exibir mensagem de erro ao tentar login com senha incorreta', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('senha-errada')
    cy.get('[data-test="login-button"]').click()

    cy.get('.error-message-container').should('be.visible')
    .and('contain.text', 'Epic sadface: Username and password do not match any user in this service')
  })
  it('exibir mensagem de erro ao tentar login sem preencher usuário e senha', () => {
    //deixa os campos em branco
    cy.get('[data-test="login-button"]').click()

    cy.get('.error-message-container').should('be.visible')
    .and('contain.text', 'Epic sadface: Username is required')
  })
  it('exibir mensagem de erro ao tentar login sem preencher usuário', () => {
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    
    cy.get('.error-message-container').should('be.visible')
    .and('contain.text', 'Epic sadface: Username is required')
  })
it('exibir mensagem de erro ao tentar login sem preencher senha', () => {
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="login-button"]').click()
    
    cy.get('.error-message-container').should('be.visible')
    .and('contain.text', 'Epic sadface: Password is required')
    })
    it('exibir mensagem de erro ao tentar login com usuário bloqueado', () =>{
      cy.get('[data-test="username"]').type('locked_out_user')
      cy.get('[data-test="password"]').type('secret_sauce')
      cy.get('[data-test="login-button"]').click()

      cy.get('.error-message-container').should('be.visible')
    .and('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
    })
  })