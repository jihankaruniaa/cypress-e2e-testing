describe('SauceDemo Cart Page Testing', () => {

  beforeEach(() => {
    // Login
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
  })

  // ADD ITEM TO CART
  it('should add item to the cart successfully', () => {
    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_badge')
      .should('contain', '1')
  })

  // REMOVE ITEM FROM CART
  it('should remove item from the cart successfully', () => {
    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test^="remove"]')
      .click()

    cy.get('.cart_item')
      .should('not.exist')
  })

  // PROCEED TO CHECKOUT
  it('should proceed to checkout', () => {
    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]')
      .click()

    cy.url().should('include', '/checkout-step-one.html')
  })

  // CONTINUE SHOPPING
  it('should continue shopping from cart page', () => {
    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="continue-shopping"]')
      .click()

    cy.url().should('include', '/inventory.html')
  })

  // CART BADGE COUNT
  it('should update cart badge count correctly', () => {
    cy.get('[data-test^="add-to-cart"]')
      .eq(0)
      .click()

    cy.get('.shopping_cart_badge')
      .should('contain', '1')

    cy.get('[data-test^="add-to-cart"]')
      .eq(1)
      .click()

    cy.get('.shopping_cart_badge')
      .should('contain', '2')
  })

  // EMPTY CART
  it('should show empty cart behavior correctly', () => {
    cy.get('.shopping_cart_link').click()

    cy.get('.cart_item')
      .should('not.exist')

    cy.contains('Checkout')
      .should('be.visible')
  })

  // ADD MULTIPLE ITEMS
  it('should add multiple items to cart', () => {
    cy.get('[data-test^="add-to-cart"]')
      .eq(0)
      .click()

    cy.get('[data-test^="add-to-cart"]')
      .eq(1)
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('.cart_item')
      .should('have.length', 2)
  })

  // PREVENT DUPLICATE ITEM
  it('should prevent adding same item multiple times', () => {
    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_badge')
      .should('contain', '1')

    cy.get('[data-test^="remove"]')
      .should('exist')
  })

  // MOBILE RESPONSIVE
  it('should display responsive layout on mobile devices', () => {
    cy.viewport('iphone-x')

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('.cart_item')
      .should('be.visible')

    cy.get('[data-test="checkout"]')
      .should('be.visible')
  })

  // VERIFY ITEM DETAILS
  it('should display item name, price, and description correctly', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('.inventory_item_name')
      .should('be.visible')
      .and('not.be.empty')

    cy.get('.inventory_item_price')
      .should('be.visible')

    cy.get('.inventory_item_desc')
      .should('be.visible')
      .and('not.be.empty')
  })

})