import '../utils/commom'
import { handleDropDown } from '../utils/commom';

export class NIURALPAYPAGE{
   

    element ={
        getLinkUserPolicies:()=>cy.get('a[data-cy="side-menu-Users & Policies"]',{timeout:10000}),
        getCheckboxPayement:() => cy.get('._checkboxLabel_agc6n_33'),
        getButtonPayment:() => cy.get('.space-y-6 > .font-medium'),
        getBtnAddNewUser:()=>cy.get('a > .font-medium',{timeout:10000}),   
        getTbMemberFirstName:()=>cy.get('input[data-cy="input-first-name"]'),
        getTbMemberLastName:()=> cy.get('input[name="lastName"]'),
        getTbMemberEmail:()=> cy.get('input[type="email"]'),
        getTbMemberPhoneNumber:()=> cy.get('input[data-cy="input-phone-number"]'),
        getSelectCountryCode:()=> cy.get('.css-1u6tjmp>input'),
        getBtnSubmit:() => cy.get('button[type="submit"]'),
        getBtnPolicies:()=> cy.get('#policies'),
        getSelectApprovers:()=> cy.get('.css-1u6tjmp>input',{timeout:10000}),
        getCreateButton:()=>cy.get('.bg-grey-primary > button'),
        getCheckbox:()=> cy.get('._checkboxLabel_agc6n_33')

    }

    acceptAgreement(){
        this.element.getCheckboxPayement().click();
        this.element.getButtonPayment().click();
      
    }
    gotoUserANdPolicies(){
        cy.contains('Bills',{timeout:10000})
        this.element.getLinkUserPolicies().click()
    }
    gotoAddNewUser(){
        this.element.getBtnAddNewUser().click()
    }
    addNewUser(FirstName,LastName,email,phoneNumber){
        this.element.getTbMemberFirstName().type(FirstName)
        this.element.getTbMemberLastName().type(LastName)
        this.element.getTbMemberEmail().type(email)
        handleDropDown(this.element.getSelectCountryCode(),phoneNumber.split('-')[0])
        this.element.getTbMemberPhoneNumber().type(phoneNumber.split('-')[1])
        this.element.getBtnSubmit().click()
        
    }
    goToPolicies(){
        this.element.getBtnPolicies().click()
    }
    addPolicy(criteria,number){
        handleDropDown(this.element.getSelectApprovers(),criteria)
        this.element.getCheckbox().then(($el)=>{
            for(let i =0;i<number;i++){
                cy.wrap($el[i]).click()
            }
        })
        this.element.getCreateButton().click()
    }

}