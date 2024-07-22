import '../utils/commom'
import { handleDropDown } from '../utils/commom'
export class ONBOARDINGPAGE{
    constructor(){
        cy.get('img[alt="logo"]',{timeout:6000}).should("be.visible")
        this.selectCountryOfRegistration = cy.get('#dropdown-country-of-registration')
        this.tbTaxId = cy.get('input[data-cy="input-ein"]')
        this.tbRegisteredDate = cy.get("#date-registered-date")
        this.selectBusinessType = cy.get("#dropdown-business-entity-type")
        this.selectNatureOfBusiness = cy.get('#dropdown-nature-of-business')
        this.btnNext = cy.get('button[data-cy="button-next"]')
    }
    setCountryOfRegistration(value){
        handleDropDown(this.selectCountryOfRegistration,value)
    }
    enterTaxId(tid){
        this.tbTaxId.type(tid)
    }

    setRegistrationdate(date){
        this.tbRegisteredDate.type(date)
    }
    setBusinessInfo(type,nature){
        handleDropDown(this.selectBusinessType,type)
        handleDropDown(this.selectNatureOfBusiness,nature)
    }
    clickNext(){
        this.btnNext.click()
    }
}