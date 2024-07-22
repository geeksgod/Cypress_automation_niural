export class WELCOMEPAGE{
    constructor(){
        cy.get('button[data-cy="button-next"]',{ timeout: 20000 }).should('be.visible')
        this.btnLetsStart = cy.get('button[data-cy="button-next"]')
    }

    clickOnStart(){
        this.btnLetsStart.click()
    }
}