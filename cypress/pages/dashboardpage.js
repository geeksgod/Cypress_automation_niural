export class DASHBOARDPAGE{
    constructor(){
        cy.contains('Welcome back',{timeout:20000})       
        
    }
    elements={
        getBtnConnectWallet: () => cy.get('[data-testid="rk-connect-button"]',{timeout:10000}),
        getBtnVerifyBusiness:() => cy.get('button[data-cy="button-verify"]',{timeout:10000}),
        getLinkNiural:() => cy.get('a[data-cy="side-menu-Niural Pay"]')
    }
    verifySuccessfulSignIn(){
        this.elements.getBtnConnectWallet().should('be.visible')        
    }
    clickVerifyBusiness(){
        this.elements.getBtnVerifyBusiness().click()
    }
    goToNiuralPay(){
        this.elements.getLinkNiural().click()
    }
}