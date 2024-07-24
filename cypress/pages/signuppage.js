import '../utils/commom'
import { handleDropDown, setNoOfEmployees } from '../utils/commom'
import { EMPLOYEENUMBER } from '../fixtures/dropdownoptions'


export class SIGNUPPAGE1{
    constructor(){
        cy.get('button[data-cy="button-next"]').should("be.visible")
        this.tbFirstName = cy.get('input[data-cy="input-first-name"]')
        this.tbMiddleName = cy.get('input[data-cy="input-middle-name"]')
        this.tbLastNmae = cy.get('input[data-cy="input-last-name"]')
        this.tbEmail = cy.get('input[data-cy="input-email"]')
        this.tbCompanyName = cy.get('input[data-cy="input-company-name"]')
        this.tbCompanyWebsite = cy.get('input[data-cy="input-company-website"]')
        this.selectNoOfEmployee = cy.get('#select-company-number-members')
        this.tbPassoword = cy.get('input[data-cy="input-password"]')
        this.tbConfirmPassoword = cy.get('input[data-cy="input-confirm-password"]')
        this.selectPhoneNumber = cy.get('#select-phone-extension')
        this.tbPhoneNumber = cy.get('input[data-cy="input-phone-number"]')
        this.btnNext =  cy.get('button[data-cy="button-next"]')
        
    }

    enterName(firstName,middleName,lastName){
        this.tbFirstName.type(firstName)
        if(middleName) this.tbMiddleName.type(middleName)
        this.tbLastNmae.type(lastName)
    }

    enterEmail(email){
        this.tbEmail.type(email)
    }

    enterCompanyInfo(name,website,noOfEmplyee){
        if(name) this.tbCompanyName.type(name)
        this.tbCompanyWebsite.type(website)
        handleDropDown(this.selectNoOfEmployee,noOfEmplyee)        
    }

    enterPassowrd(pass){
        this.tbPassoword.type(pass)
        this.tbConfirmPassoword.type(pass)
    }

    enterPhoneNumber(number){
        handleDropDown(this.selectPhoneNumber,number.split('-')[0])
        this.tbPhoneNumber.type(number.split('-')[1])
    }

    clickNext(){
        this.btnNext.click()
    }
}

export class SIGNUPPAGE2{
    constructor(){
      //verifying the elements has loaded
      cy.get('button[data-cy="button-submit"]').should("be.visible")
      //Initiazling the elements in the page
      this.tbOtp =  cy.get('input[data-cy]')
      this.btnSubmit = cy.get('button[data-cy="button-submit"]')
    }
    
    getAndVerifyOtpCode(apiKey,inboxId){
        cy.mailslurp({apiKey}).then(function(mailslurp){
            return mailslurp.waitForLatestEmail(inboxId,12000,true)
        }).then(email => /\b\d{6}\b/.exec(email.body.trim())[0]).then((code)=>{
            this.tbOtp.then((elements)=>{
                var count = 0
                cy.log(elements.length)
                for(var element of elements ){
                    cy.wrap(element).type(code[count])
                    count =count+1
                }
            })
           
        })

        this.btnSubmit.click()
    }
   
}