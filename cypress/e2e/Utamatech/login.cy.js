describe('Utamatech Login Tests', () => {

    beforeEach(() => {
        cy.visit('https://utamatech.vercel.app/auth/login')
    })

    //Empty
    it('should show required on email and password', () => {
        cy.get('.gap-2').click()

        cy.get('p')
            .filter(':contains("Required")')
            .should('have.length', 2)
    })

    it('should show error when username is empty', () => {
        cy.get('[name="password"]').type('password')
        cy.get('.gap-2').click()

        cy.get('p')
            .filter(':contains("Required")')
            .should('have.length', 1)
    })

    it('should show error when password is empty', () => {
        cy.get('[name="username"]').type('admin@email.com')
        cy.get('.gap-2').click()

        cy.get('p')
            .filter(':contains("Required")')
            .should('have.length', 1)
    })

    // Invalid Login
    it('should show error when credentials (password) are invalid', () => {
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('wrongpassword')
        cy.get('.gap-2').click()
        cy.contains('Invalid credentials').should('be.visible')
    })

    it('should show error when credentials (username) are invalid', () => {
        cy.get('[name="username"]').type('wrongusername')
        cy.get('[name="password"]').type('password')
        cy.get('.gap-2').click()
        cy.contains('Invalid credentials').should('be.visible')
    })

    // Success Login
    it('should login with valid credentials', () => {
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('password')

        cy.get('.gap-2').click()
        cy.url().should('include', '/general-dashboard')
    })
})