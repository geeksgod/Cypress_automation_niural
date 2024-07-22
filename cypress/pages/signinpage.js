export class SIGNINPAGE{
    constructor(){
        cy.get('button[data-cy="button-login"]').should("be.visible")
        this.linkSignup = cy.get('span[data-cy="button-signUp"]')
    }

    goToSignUp(){
        this.linkSignup.click()
    }
}