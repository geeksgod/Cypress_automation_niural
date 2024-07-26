export class ACCESSPAGE{
    constructor(){
        cy.get('button[data-cy="full-access-option"').should("be.visible")
        this.btnFullaccess = cy.get('button[data-cy="full-access-option"')
        this.btnNext = cy.get('button[data-cy="button-next"')
    }

    chooseFullAccess(){
        this.btnFullaccess.click()
        this.btnNext.click()
        cy.contains('h2',"Company Details")
    }

    
}