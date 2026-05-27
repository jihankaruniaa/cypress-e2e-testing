describe('Filter News', () => {
    beforeEach(() => {
        cy.session('loginSession', () => {
        cy.visit('https://utamatech.vercel.app/auth/login')

        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('password')
        cy.get('.gap-2').click()

        cy.url().should('include', '/general-dashboard')
        })

        cy.visit('https://utamatech.vercel.app/general-dashboard/news')
    })


    it('Should filter news by Active status', () => {
        cy.get('.w-full > .capitalize').click()
        cy.contains('Active').click()
        // cy.get('[data-testid="news-status"]').each(($el) => {
        //     cy.wrap($el).should('contain.text', 'Active')
        // })
        // cy.contains('Active').should('be.visible')
    })

})