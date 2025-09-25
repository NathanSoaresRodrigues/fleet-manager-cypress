import LoginPage from '../pageObjects/LoginPage'
import HomePage from '../pageObjects/HomePage'

describe('Autenticação', () => {
    let user

    beforeEach(() => {
        cy.fixture('user.json').then((userData) => {
            user = userData
        })
        LoginPage.visit()
    })

    it('deve fazer login com credenciais válidas', () => {
        LoginPage
            .login(user.email, user.password)
            .shouldBeOnLoginPage()

        HomePage.elements
            .searchInput()
            .should('be.visible')
    })

    it('deve mostrar mensagem de erro com credenciais inválidas', () => {
        LoginPage
            .login('invalido@email.com', 'senhaerrada')
            .shouldBeOnLoginPage()

        // Assumindo que existe uma mensagem de erro
        cy.contains('Credenciais inválidas').should('be.visible')
    })

    it('deve validar campo de email obrigatório', () => {
        LoginPage
            .elements.submitButton()
            .click()

        // Validar mensagem do campo email vazio
        LoginPage.elements
            .emailInput()
            .invoke('prop', 'validationMessage')
            .should('equal', 'Preencha este campo.')
    })

    it('deve validar campo de senha obrigatório', () => {
        // Preenche apenas o email e tenta fazer login
        LoginPage
            .typeEmail('admin@teste.com')
            .elements.submitButton()
            .click()

        // Validar mensagem do campo senha vazio
        LoginPage.elements
            .passwordInput()
            .invoke('prop', 'validationMessage')
            .should('equal', 'Preencha este campo.')
    })

    it('deve fazer logout corretamente', () => {
        LoginPage.login(user.email, user.password)
        HomePage.logout()
        LoginPage.shouldBeOnLoginPage()
    })
})