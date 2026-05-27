describe('Utamatech Dashboard Navigation', () => {

    beforeEach(() => {
        cy.session('loginSession', () => {
        cy.visit('https://utamatech.vercel.app/auth/login')

        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('password')
        cy.get('.gap-2').click()

        cy.url().should('include', '/general-dashboard')
        })

        cy.visit('https://utamatech.vercel.app/general-dashboard')
    })

    it('should navigate to Manage News', () => {
        cy.contains('Manage News').click()
        cy.url().should('include', '/news')
    })

    it('should navigate to Manage Online Form', () => {
        cy.contains('Manage Online Form').click()
        cy.url().should('include', '/online-form')
    })

    it('should navigate to Calendar', () => {
        cy.contains('See Details').click()
        cy.url().should('include', '/calendar')
    })

    it('should navigate to Calendar', () => {
        cy.get('.px-3').click()
        cy.get('.min-w-\\[200px\\]').should('be.visible')
    })

    it('should go to next month', () => {
        cy.contains('May 2026').should('be.visible')

        cy.get('[name="next-month"]').click()
        cy.get('[name="previous-month"]').click()
    })

    it('should navigate to Manage Link', () => {
        cy.contains('Manage Link').click()
        cy.url().should('include', '/link')
    })

    it('should navigate to Manage E-Library', () => {
        cy.contains('Manage E-Library').click()
        cy.url().should('include', '/e-library')
    })

    it('should navigate to Manage Staff Directory', () => {
        cy.contains('Manage Staff Directory').click()
        cy.url().should('include', '/staff')
    })

    it('should navigate to Manage Delivery', () => {
        cy.contains('Delivery').click()
        cy.url().should('include', '/delivery')
    })

    it('should navigate to Update Setting', () => {
        cy.contains('Update Setting').click()
        cy.url().should('include', '/settings/account-setting')
    })

})