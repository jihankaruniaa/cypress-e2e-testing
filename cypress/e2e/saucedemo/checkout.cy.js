describe('SauceDemo Checkout Complete Flow', () => {

  beforeEach(() => {
    // Login
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
  })

  // VERIFY USER CANNOT CHECKOUT WITHOUT ITEM
  it('should not proceed checkout without adding item', () => {

    cy.get('.shopping_cart_link').click()

    cy.get('.cart_item').should('not.exist')

    cy.get('[data-test="checkout"]')
      .should('be.visible')
      .click()

    cy.url().should('include', '/checkout-step-one.html')
  })

  // VERIFY CHECKOUT BUTTON FUNCTIONALITY
  it('should redirect to checkout information page', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.url().should('include', '/checkout-step-one.html')
  })

  // VALID CHECKOUT INFORMATION
  it('should continue checkout with valid information', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.url().should('include', '/checkout-step-two.html')
  })

  // EMPTY ALL FIELDS
  it('should show error when all fields are empty', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('contain', 'Error')
  })

  // EMPTY FIRST NAME
  it('should show error when first name is empty', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('contain', 'First Name is required')
  })

  // EMPTY LAST NAME
  it('should show error when last name is empty', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('contain', 'Last Name is required')
  })

  // EMPTY POSTAL CODE
  it('should show error when postal code is empty', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('contain', 'Postal Code is required')
  })

  // EDGE CASE INPUTS
  it('should handle edge case inputs', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('123456')
    cy.get('[data-test="lastName"]').type('@@@@@@')
    cy.get('[data-test="postalCode"]').type('!@#$%')

    cy.get('[data-test="continue"]').click()

    cy.url().should('include', '/checkout-step-two.html')
  })

  // CANCEL BUTTON IN YOUR INFORMATION PAGE
  it('should cancel checkout and redirect to cart page', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="cancel"]').click()

    cy.url().should('include', '/cart.html')
  })

  // VERIFY CHECKOUT OVERVIEW ITEMS
  it('should display correct selected items in overview page', () => {

    cy.get('[data-test^="add-to-cart"]')
      .eq(0)
      .click()

    cy.get('[data-test^="add-to-cart"]')
      .eq(1)
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.get('.cart_item')
      .should('have.length', 2)

    cy.get('.inventory_item_name')
      .should('have.length', 2)

    cy.get('.inventory_item_price')
      .should('have.length', 2)
  })

  // VERIFY PAYMENT METHOD
  it('should display payment information correctly', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.contains('Payment Information')
      .should('be.visible')
  })

  // VERIFY SHIPPING INFORMATION
  it('should display shipping information correctly', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.contains('Shipping Information')
      .should('be.visible')
  })

  // VERIFY TOTAL PRICE
  it('should calculate total price correctly', () => {

    cy.get('[data-test^="add-to-cart"]')
      .eq(0)
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.get('.summary_subtotal_label')
      .should('contain', 'Item total')
  })

  // CANCEL BUTTON IN OVERVIEW PAGE
  it('should cancel checkout overview and redirect to inventory', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="cancel"]').click()

    cy.url().should('include', '/inventory.html')
  })

  // FINISH BUTTON FUNCTIONALITY
  it('should finish checkout successfully', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="finish"]').click()

    cy.url().should('include', '/checkout-complete.html')
  })

  // SUCCESS MESSAGE
  it('should display success message after checkout', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="finish"]').click()

    cy.contains('Thank you for your order!')
      .should('be.visible')
  })

  // BACK HOME BUTTON
  it('should redirect to inventory page when clicking back home', () => {

    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Jihan')
    cy.get('[data-test="lastName"]').type('Putri')
    cy.get('[data-test="postalCode"]').type('20154')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="finish"]').click()

    cy.get('[data-test="back-to-products"]')
      .click()

    cy.url().should('include', '/inventory.html')
  })

})