describe('Social Brain Network Log In', () => {
    it.only('loads successfully', () => {
        // ARRANGE
        cy.visit(Cypress.env('BASE_URL'));
        // ACT
        // None: Loading only
        // ASSERT
        // Navbar
        cy.get('nav')
            .should('be.visible')
            .within(() => {
                cy.get('button')
                    .should('contain.text','Log In')
            })
        })
        it.only('logs in successfully with user1 credentials', () => {
            // ACT
            cy.get('nav').within(() => {cy.get('button').click()})
            cy.get('input[type=email]').type('user1@gmail.com')
            cy.get('input[type=password]').type('123456')
            cy.get('button[type=submit]').click()
            // ASSERT
        })
        it.only('loads successfully after login', () => {
            // ACT
            cy.get('nav')
                .should('be.visible')
                .within(() => {
                    cy.get('button')
                        .should('contain.text','Sign Out')
                })
            })
        
            it.only('Signs out successfully', () => {
                // ACT
                cy.get('nav').within(() => {cy.get('button').should('contain.text','Sign Out')
                    .click()
                })
            })
})