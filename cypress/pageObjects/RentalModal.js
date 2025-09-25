class RentalModal {
    elements = {
        // Modal de Aluguel
        daysInput: () => cy.get('input#days').should('be.visible'),
        rentPriceInfo: () => cy.get('.bg-green-50').should('be.visible'),
        totalPrice: () => this.elements.rentPriceInfo().get('.text-2xl').eq(1),
        cancelButton: () => cy.contains('button', 'Cancelar').should('be.visible'),
        confirmRentButton: () => cy.contains('button', 'Confirmar Aluguel').should('be.visible'),

        // Modal de Pagamento
        couponInput: () => cy.get('input[placeholder="Ex: DESCONTO50"]').should('be.visible'),
        applyCouponButton: () => cy.contains('button', 'Aplicar').should('be.visible'),
        creditCardOption: () => cy.get('button#cartao').should('be.visible'),
        pixOption: () => cy.get('button#pix').should('be.visible'),
        cancelPaymentButton: () => cy.get('button.button-secondary:contains("Cancelar")').should('be.visible'),
        confirmPaymentButton: () => cy.get('button.button-primary:contains("Confirmar Pagamento")').scrollIntoView().should('be.visible')
    }

    // Ações do modal de Aluguel
    // Define o número de dias para o aluguel
    setRentalDays(days) {
        this.elements.daysInput().type('{selectall}').type(days)
        return this
    }

    // Obtém informações de preço do aluguel
    getRentalPriceInfo() {
        return {
            total: this.elements.totalPrice()
        }
    }

    // Cancela o processo de aluguel
    cancelRental() {
        this.elements.cancelButton().click()
        return this
    }

    // Confirma o aluguel e avança para pagamento
    confirmRental() {
        this.elements.confirmRentButton().click()
        return this
    }

    // Ações do modal de Pagamento
    // Aplica um cupom de desconto
    applyCoupon(couponCode) {
        this.elements.couponInput().clear().type(couponCode)
        this.elements.applyCouponButton().click()
        return this
    }

    // Seleciona pagamento por cartão de crédito
    selectCreditCardPayment() {
        this.elements.creditCardOption().click()
        return this
    }

    // Seleciona pagamento por PIX
    selectPixPayment() {
        this.elements.pixOption().click()
        return this
    }

    // Cancela o processo de pagamento
    cancelPayment() {
        this.elements.cancelPaymentButton().click()
        return this
    }

    // Confirma o pagamento
    confirmPayment() {
        this.elements.confirmPaymentButton().click()
        return this
    }

    // Realiza o processo completo de aluguel
    completeRentalProcess(days, paymentMethod, couponCode = null) {
        this.setRentalDays(days)
        this.confirmRental()
        
        if (couponCode) {
            this.applyCoupon(couponCode)
        }

        if (paymentMethod === 'credit') {
            this.selectCreditCardPayment()
        } else if (paymentMethod === 'pix') {
            this.selectPixPayment()
        }

        this.confirmPayment()
        return this
    }

    // Verifica se o modal de aluguel está visível
    shouldBeOnRentalModal() {
        this.elements.daysInput().should('be.visible')
        this.elements.rentPriceInfo().should('be.visible')
        return this
    }

    // Verifica se o modal de pagamento está visível
    shouldBeOnPaymentModal() {
        this.elements.couponInput().should('be.visible')
        this.elements.creditCardOption().should('be.visible')
        this.elements.pixOption().should('be.visible')
        return this
    }
}

export default new RentalModal()