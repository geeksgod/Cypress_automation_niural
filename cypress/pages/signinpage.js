export class SIGNINPAGE{
    constructor(){
        cy.get('button[data-cy="button-login"]').should("be.visible")
        this.linkSignup = cy.get('span[data-cy="button-signUp"]')
        this.tbEmail = cy.get('input[data-cy="input-email"]')
        this.password = cy.get('input[data-cy="input-password"]')
        this.btnLogin = cy.get('button[data-cy="button-login"]')
    }

    goToSignUp(){
        this.linkSignup.click()
    }
    signIn(username,password){
        this.tbEmail.type(username)
        this.password.type(password)
        this.btnLogin.click()
    }
}