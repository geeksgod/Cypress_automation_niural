import '../utils/commom'
import { handleDropDown } from '../utils/commom'
export class ADDRESSREGISTRATIONPAGE{
    constructor(){
        cy.get('input[data-cy="input-registeredAddress-zipCode"]',{timeout:10000}).should('be.visible')
        this.tbAddressLine1 = cy.get('input[data-cy="input-registeredAddress-address1"]')
        this.tbCity = cy.get('input[data-cy="input-registeredAddress-city"]')
        this.selectState = cy.get('#dropdown-state')
        this.tbZipcode = cy.get('input[data-cy="input-registeredAddress-zipCode"]')
        this.btnNext = cy.get('button[data-cy="button-next"')
    }
    enterAddressline1(address,city,state,zipCode){
        this.tbAddressLine1.type(address)
        this.tbCity.type(city)
        handleDropDown(this.selectState,state)
        this.tbZipcode.type(zipCode)        
    }

    clickNext(){
        this.btnNext.click()
    }
}