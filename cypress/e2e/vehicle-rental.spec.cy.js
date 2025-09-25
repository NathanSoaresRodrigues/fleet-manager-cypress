import LoginPage from '../pageObjects/LoginPage'
import HomePage from '../pageObjects/HomePage'
import RentalModal from '../pageObjects/RentalModal'

describe('Aluguel de Veículos', () => {
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

        cy.clearCookies();
        cy.clearLocalStorage();
    })

    afterEach(() => {
        // Força reload da página para evitar estado compartilhado entre testes
        cy.reload(true)
    })

    it('deve alugar um veículo disponível no crédito', () => {
        cy.viewport(1920, 1080)

        // Seleciona veículo disponível e inicia aluguel
        HomePage.getAvailableVehicles().first().then(($card) => {
            let vehicleName = $card.find('h3.tracking-tight.text-xl').text().trim(); // Armazena o nome do veículo para validação posterior
            cy.log('Veículo selecionado para aluguel:', vehicleName);
            HomePage.clickRentOnCard($card);

            // Configura e confirma o aluguel
            RentalModal
                .shouldBeOnRentalModal()
                .completeRentalProcess(5, 'credit'); // Configura modalidade crédito
    
            // Verifica se atualizou o status do veículo para "Alugado"
            HomePage.search(vehicleName)
            cy.wait(3000); // Espera para garantir que a UI foi atualizada
            cy.contains('span', 'Alugado').should('be.visible');
        });
    })

    it('deve alugar um veículo disponível no PIX', () => {
        cy.viewport(1920, 1080)

        // Seleciona veículo disponível e inicia aluguel
        HomePage.getAvailableVehicles().first().then(($card) => {
            let vehicleName = $card.find('h3.tracking-tight.text-xl').text().trim(); // Armazena o nome do veículo para validação posterior
            cy.log('Veículo selecionado para aluguel:', vehicleName);
            HomePage.clickRentOnCard($card);

            // Configura e confirma o aluguel
            RentalModal
                .shouldBeOnRentalModal()
                .completeRentalProcess(5, 'pix'); // Configura modalidade pix
    
            // Verifica se atualizou o status do veículo para "Alugado"
            HomePage.search(vehicleName)
            cy.wait(3000); // Espera para garantir que a UI foi atualizada
            cy.contains('span', 'Alugado').should('be.visible');
        });
    })

    it('validar limite de aluguel inferior a 1', () => {
        HomePage
            .getAvailableVehicles()
            .first()
            .then(card => {
                HomePage.clickRentOnCard(card)
            })

        // Tenta alugar com 0 dias
        RentalModal
            .setRentalDays(0)
            .elements.daysInput()
            .should('not.have.class', 'error')
        })

    it('validar limite de aluguel superior a 30', () => {
        HomePage
            .getAvailableVehicles()
            .first()
            .then(card => {
                HomePage.clickRentOnCard(card)
            })
        // Tenta alugar com mais de 30 dias
        RentalModal
            .setRentalDays(31)
            .elements.daysInput()
            .should('have.class', 'error')
    })

    it('não deve permitir aluguel de veículo com valor inferior ao do cupom', () => {
        cy.viewport(1920, 1080)

        HomePage.getVehiclesBelowCouponValue(50).first().then(($card) => {
            let vehiclePrice = parseInt($card.find('.text-3xl').text().trim().match(/R\$\s*(\d+)/)[1]); // Armazena o nome do veículo para validação posterior
            cy.log('Veículo selecionado para aluguel:', vehiclePrice);
            HomePage.clickRentOnCard($card);

            // Configura e confirma o aluguel
            RentalModal
                .shouldBeOnRentalModal()
                .confirmRental()
                .shouldBeOnPaymentModal()
                .applyCoupon('DESCONTO50');
            
            cy.wait(1000); // Espera para garantir que a UI foi atualizada
            // Verifica se o valor total foi subtraído corretamente
            cy.get('.text-2xl.font-bold').then(($element) => {
                let totalPrice = $element.text().trim().match(/R\$\s*(\d+)/)[1];
                cy.log(`Preço total após cupom: R$ ${totalPrice}`);
                cy.contains('Cupom aplicado com sucesso', { timeout: 500 }).should('not.exist');
            });
        });
    })

    it('deve permitir cancelar no modal de aluguel', () => {
       cy.viewport(1920, 1080)

        // Seleciona veículo disponível e inicia aluguel
        HomePage.getAvailableVehicles().first().then(($card) => {
            let vehicleName = $card.find('h3.tracking-tight.text-xl').text().trim(); // Armazena o nome do veículo para validação posterior
            cy.log('Veículo selecionado para aluguel:', vehicleName);
            HomePage.clickRentOnCard($card);

            // Cancele o aluguel
            RentalModal
                .cancelRental();
    
            // Verifica se atualizou o veículo continua "Disponível"
            HomePage.search(vehicleName);
            cy.wait(3000); // Espera para garantir que a UI foi atualizada
            cy.contains('span', 'Disponível').should('be.visible');
        });
    })

    it('deve permitir cancelar no modal de pagamento', () => {
        cy.viewport(1920, 1080)

        // Seleciona veículo disponível e inicia aluguel
        HomePage.getAvailableVehicles().first().then(($card) => {
            let vehicleName = $card.find('h3.tracking-tight.text-xl').text().trim(); // Armazena o nome do veículo para validação posterior
            cy.log('Veículo selecionado para aluguel:', vehicleName);
            HomePage.clickRentOnCard($card);

            // Cancele o aluguel
            RentalModal
                .confirmRental();

            //Espera carregamento do modal de pagamento e prossegue para cancelamento
            cy.wait(2000);
            RentalModal
                .cancelPayment();
    
            // Verifica se atualizou o veículo continua "Disponível"
            HomePage.search(vehicleName);
            cy.wait(3000); // Espera para garantir que a UI foi atualizada
            cy.contains('span', 'Disponível').should('be.visible');
        });
    })
})