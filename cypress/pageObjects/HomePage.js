class HomePage {
    elements = {
        searchInput: () => cy.get('input[placeholder="Buscar por placa ou modelo..."]').should('be.visible'),
        vehicleCards: () => cy.get('.vehicle-card'),
        logoutButton: () => cy.contains('button', 'Sair').should('be.visible')
    }

    // Realiza busca por termo específico
    search(term) {
        this.elements.searchInput().clear().type(term)
        return this
    }

    // Limpa o campo de busca
    clearSearch() {
        this.elements.searchInput().clear()
        return this
    }

    // Obtém um card de veículo pelo índice
    getVehicleCardByIndex(index) {
        return this.elements.vehicleCards().eq(index)
    }

    // Obtém um card de veículo pelo modelo
    getVehicleCardByModel(model) {
        return this.elements.vehicleCards()
            .contains(model)
            .parents('.vehicle-card')
            .should('be.visible')
    }

    // Clica no botão Alugar de um card específico
    clickRentOnCard(card) {
        cy.wrap(card).within(() => {
            cy.contains('button', 'Alugar')
                .should('be.visible')
                .click()
        })
        return this
    }

    // Obtém lista de veículos disponíveis
    getAvailableVehicles() {
        return this.elements.vehicleCards()
            .filter(':has(span:contains("Disponível"))')
            .filter((index, card) => {
                const priceText = Cypress.$(card).find('.text-3xl').text().trim();
                const match = priceText.match(/R\$ ?(\d+)/);
                if (match) {
                    const price = parseInt(match[1], 10);
                    return price >= 50;
                }
                return false;
            });
    }

    //Obtém lista de veículos com valor abaixo do cupom
    getVehiclesBelowCouponValue() {
        return this.elements.vehicleCards()
            .filter(':has(span:contains("Disponível"))')
            .filter((index, card) => {
                const priceText = Cypress.$(card).find('.text-3xl').text().trim();
                const match = priceText.match(/R\$ ?(\d+)/);
                if (match) {
                    const price = parseInt(match[1], 10);
                    return price < 50;
                }
                return false;
            });
    }

    // Obtém lista de veículos alugados
    getRentedVehicles() {
        return this.elements.vehicleCards()
            .contains('span', 'Alugado')
            .parents('.vehicle-card')
    }

    // Obtém lista de veículos em manutenção
    getMaintenanceVehicles() {
        return this.elements.vehicleCards()
            .contains('span', 'Em manutenção')
            .parents('.vehicle-card')
    }

    // Verifica o status de todos os veículos e seus respectivos botões
    verifyVehicleStatus() {
        this.elements.vehicleCards().each(($card) => {
            const cardText = $card.text()
            if (cardText.includes('Disponível')) {
                cy.wrap($card).contains('button', 'Alugar').should('be.visible')
            } else {
                cy.wrap($card).contains('button', 'Alugar').should('not.exist')
            }
        })
        return this
    }

    // Realiza logout do sistema
    logout() {
        this.elements.logoutButton().click()
        return this
    }
}

export default new HomePage()