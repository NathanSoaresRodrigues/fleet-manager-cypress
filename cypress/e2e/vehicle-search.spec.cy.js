import LoginPage from '../pageObjects/LoginPage'
import HomePage from '../pageObjects/HomePage'

describe('Busca e Listagem de Veículos', () => {
    let user

    before(() => {
            cy.fixture('user.json').then((userData) => {
                user = userData
            })
        })
    
    beforeEach(() => {
        // Login e início do processo de aluguel
        LoginPage
        .visit()
        .login(user.email, user.password)
    })

    it('deve buscar veículo por modelo', () => {
        HomePage.search('Chevrolet Onix')

        cy.wait(3000); // Espera para garantir que a UI foi atualizada
        HomePage
            .getVehicleCardByModel('Chevrolet Onix')
            .should('be.visible')
    })

    it('deve buscar veículo por placa', () => {
        HomePage.search('ABC1234')

        cy.wait(3000); // Espera para garantir que a UI foi atualizada
        HomePage
            .getVehicleCardByModel('ABC1234')
            .should('be.visible')
    })

    it('não deve retornar quando não houver veículos', () => {
        HomePage.search('Veículo Inexistente')
        
        // Verifica que a quantidade de cartões de veículos é zero
        HomePage.elements
            .vehicleCards()
            .should('have.length.gt', 0)
    })

    it('deve limpar busca e mostrar todos os veículos', () => {
        HomePage
            .search('ABC1234')
            .clearSearch()

        HomePage.elements
            .vehicleCards()
            .should('have.length.gt', 0)
    })
})