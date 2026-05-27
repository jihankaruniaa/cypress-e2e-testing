describe('Create News Feature', () => {
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

    // Add Category
    it('Should show validation when category name is empty', () => {
        cy.contains('Create News').click()
        cy.contains('Add Category').click()
        cy.contains('Add Category').click()
        cy.contains('Required').should('be.visible')
    })

    it('Should add category successfully', () => {
        cy.contains('Create News').click()
        cy.contains('Add Category').click()
        cy.get('[name="categoryName"]').type('e2e')
        cy.contains('Add Category').click()
        cy.contains('Your category has been added.').should('be.visible')
    })

    it('Should create news with empty fields', () => {
        cy.contains('Create News').click()
        cy.contains('Publish').click()
        cy.get('p')
            .filter(':contains("Required")')
            .should('have.length', 3)
    })

    // Create News with valid data (without thumbnail)
    it('Should create news successfully', () => {
        cy.contains('Create News').click()
        cy.contains('Select Category').click()
        cy.contains('Holiday').click()
        cy.get('input[placeholder="Write Title Here"]')
        .type('Cypress Testing News')
        cy.contains('Without Thumbnail').click()
        cy.get('[contenteditable="true"]')
        .type('This is automation test for create news without thumbnail using Cypress.')

        cy.contains('Publish').click()
        cy.contains('Your news has been update status.').should('be.visible')
    })

    // Create News with valid data (with thumbnail)
    it('Should create news with thumbnail successfully', () => {
        cy.contains('Create News').click()

        cy.contains('Select Category').click()
        cy.contains('Media', { timeout: 10000 })
        .should('be.visible')
        .click()

        cy.get('input[placeholder="Write Title Here"]')
        .type('Cypress Testing News with Thumbnail')
        cy.contains('With Thumbnail').click()
        const filePath = 'images/holiday.jpg'
        cy.get('input[type="file"]').attachFile(filePath)
        cy.get('[contenteditable="true"]')
        .type('This is automation test for create news with thumbnail using Cypress.')
        cy.contains('Publish').click()
        cy.contains('Your news has been update status.').should('be.visible')
    })
})