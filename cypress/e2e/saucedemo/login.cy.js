describe('SauceDemo Login Tests (Best Practice - data-test)', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  // EMPTY

  it('should show error when username and password are empty', () => {
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')
  })

  it('should show error when username is empty', () => {
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')
  })

  it('should show error when password is empty', () => {
    cy.get('[data-test="username"]').type('standard_user')

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Password is required')
  })

  // INVALID LOGIN

  it('should show error when credentials are invalid', () => {
    cy.get('[data-test="username"]').type('wrong_user')
    cy.get('[data-test="password"]').type('wrong_password')

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'do not match')
  })

  // SUCCESS LOGIN

  it('should login successfully with valid credentials', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')

    cy.get('.inventory_list').should('be.visible')
  })

})