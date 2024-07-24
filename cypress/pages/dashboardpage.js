export class DASHBOARDPAGE{
    constructor(){
        cy.get('[data-testid="rk-connect-button"]',{timeout:40000}).should('be.visible')
        this.btnConnectWallet = cy.get('[data-testid="rk-connect-button"]')
        this.btnVerifyBusiness = cy.get('button[data-cy="button-verify"]',{timeout:10000})
    }
    verifySuccessfulSignIn(){
        this.btnConnectWallet.should('be.visible')        
    }
    clickVerifyBusiness(){
        this.btnVerifyBusiness.click()
    }
}