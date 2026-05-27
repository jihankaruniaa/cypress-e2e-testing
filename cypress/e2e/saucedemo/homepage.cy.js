describe('SauceDemo Home Page E2E Testing', () => {

  beforeEach(() => {
    // Login
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
  })

  // VERIFY PRODUCT NAME
  it('should display product names correctly', () => {
    cy.get('.inventory_item_name')
      .should('have.length.greaterThan', 0)
      .each(($el) => {
        cy.wrap($el).should('not.be.empty')
      })
  })

  // VERIFY PRODUCT PRICE
  it('should display product prices correctly', () => {
    cy.get('.inventory_item_price')
      .each(($price) => {
        cy.wrap($price)
          .invoke('text')
          .should('match', /^\$\d+\.\d{2}$/)
      })
  })

  // VERIFY PRODUCT DESCRIPTION
  it('should display product descriptions correctly', () => {
    cy.get('.inventory_item_desc')
      .should('have.length.greaterThan', 0)
      .each(($desc) => {
        cy.wrap($desc).should('not.be.empty')
      })
  })

  // SORT NAME A-Z
  it('should sort products from A to Z', () => {
    cy.get('[data-test="product-sort-container"]')
      .select('Name (A to Z)')

    cy.get('.inventory_item_name')
      .then(($items) => {
        const names = [...$items].map(el => el.innerText)
        const sorted = [...names].sort()

        expect(names).to.deep.equal(sorted)
      })
  })

  // SORT NAME Z-A
  it('should sort products from Z to A', () => {
    cy.get('[data-test="product-sort-container"]')
      .select('Name (Z to A)')

    cy.get('.inventory_item_name')
      .then(($items) => {
        const names = [...$items].map(el => el.innerText)
        const sorted = [...names].sort().reverse()

        expect(names).to.deep.equal(sorted)
      })
  })

  // SORT PRICE LOW TO HIGH
  it('should sort products price low to high', () => {
    cy.get('[data-test="product-sort-container"]')
      .select('Price (low to high)')

    cy.get('.inventory_item_price')
      .then(($prices) => {
        const prices = [...$prices].map(el =>
          parseFloat(el.innerText.replace('$', ''))
        )

        const sorted = [...prices].sort((a, b) => a - b)

        expect(prices).to.deep.equal(sorted)
      })
  })

  // SORT PRICE HIGH TO LOW
  it('should sort products price high to low', () => {
    cy.get('[data-test="product-sort-container"]')
      .select('Price (high to low)')

    cy.get('.inventory_item_price')
      .then(($prices) => {
        const prices = [...$prices].map(el =>
          parseFloat(el.innerText.replace('$', ''))
        )

        const sorted = [...prices].sort((a, b) => b - a)

        expect(prices).to.deep.equal(sorted)
      })
  })

  // ADD TO CART
  it('should add product to cart', () => {
    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('.shopping_cart_badge')
      .should('contain', '1')
  })

  // REMOVE PRODUCT
  it('should remove product from cart', () => {
    cy.get('[data-test^="add-to-cart"]')
      .first()
      .click()

    cy.get('[data-test^="remove"]')
      .first()
      .click()

    cy.get('.shopping_cart_badge')
      .should('not.exist')
  })

  // OPEN PRODUCT DETAIL PAGE
  it('should redirect to product detail page', () => {
    cy.get('.inventory_item_name')
      .first()
      .click()

    cy.url().should('include', '/inventory-item.html')
  })

  // OPEN CART PAGE
  it('should redirect to cart page', () => {
    cy.get('.shopping_cart_link').click()

    cy.url().should('include', '/cart.html')
  })

  // LOGOUT
  it('should logout successfully', () => {
    cy.get('#react-burger-menu-btn').click()

    cy.contains('Logout')
      .click()

    cy.url().should('eq', 'https://www.saucedemo.com/')
  })

})