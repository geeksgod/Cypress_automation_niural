export class HOMEPAGE{
    
    constructor(){
        cy.visit('/')
        this.btnEmployer =  cy.get('a[data-cy="employer-login"]')
    }       

    signInAsEmployer() {
        this.btnEmployer.click()
    }

}