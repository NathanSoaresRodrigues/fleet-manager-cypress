class LoginPage {
    elements = {
        emailInput: () => cy.get('#email').should('be.visible'),
        passwordInput: () => cy.get('#password').should('be.visible'),
        submitButton: () => cy.get('button[type="submit"]').should('be.visible')
    }

    // Navega para a página inicial
    visit() {
        cy.visit('/login', { failOnStatusCode: false })
        // Aguarda a página carregar completamente
        cy.get('#email').should('be.visible')
        return this
    }

    // Digite o email no campo de email
    typeEmail(email) {
        this.elements.emailInput().clear().type(email)
        return this
    }

    // Digite a senha no campo de senha
    typePassword(password) {
        this.elements.passwordInput().clear().type(password)
        return this
    }

    // Clica no botão de login
    clickLogin() {
        this.elements.submitButton().click()
        return this
    }

    // Realiza o processo de login completo
    login(email = 'admin@teste.com', password) {
        this.typeEmail(email)
        this.typePassword(password)
        this.clickLogin()
        return this
    }

    // Verifica se está na página de login

    shouldBeOnLoginPage() {
        this.elements.emailInput().should('exist')
        this.elements.passwordInput().should('exist')
        this.elements.submitButton().should('exist')
        return this
    }
}

export default new LoginPage()