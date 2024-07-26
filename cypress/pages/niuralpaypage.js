import '../utils/commom'
import { getdateAndTIme, handleDropDown, handleDropDownWithText } from '../utils/commom';

export class NIURALPAYPAGE{
   

    element ={
        //link
        getLinkUserPolicies:()=>cy.get('a[data-cy="side-menu-Users & Policies"]',{timeout:10000}),
        getLinkCustomers:() => cy.get('a[data-cy="side-menu-Customers"]',{timeout:10000}),
        getLinkVendors:() => cy.get('a[data-cy="side-menu-Vendors"]',{timeout:10000}),

        //button
        getButtonPayment:() => cy.get('.space-y-6 > .font-medium'),
        getBtnAddNewUser:()=>cy.get('a > .font-medium',{timeout:20000}),   
        getBtnSubmit:() => cy.get('button[type="submit"]'),
        getBtnPolicies:()=> cy.get('#policies'),
        getBtnAddNewVendor:() => cy.get('a > .font-medium',{timeout:10000}),
        getCreateButton:()=>cy.get('.bg-grey-primary > button'),
        getBtnAddVendorPayment:()=> cy.contains('button','Add Vendor Payment Details',{timeout:20000}),
        getBtnSubmitPop: ()=> cy.get('#headlessui-portal-root button[type="submit"'),
        getBtnCreatePayment:()=> cy.contains('button',"Create Payment"),
        getVendorEmail:() => cy.get('input[name="vendorEmail"]',{timeout:20000}),
        getBtnSendForApproval:()=> cy.contains('button',"Send for approval"),

        //checkbox        
        getCheckbox:()=> cy.get('._checkboxLabel_agc6n_33'),

        //textbox
        getTbMemberFirstName:()=>cy.get('input[data-cy="input-first-name"]'),
        getTbMemberLastName:()=> cy.get('input[name="lastName"]'),
        getTbMemberEmail:()=> cy.get('input[type="email"]'),
        getTbMemberPhoneNumber:()=> cy.get('input[data-cy="input-phone-number"]'),
        getTbVendorName:()=> cy.get('[data-cy="input-legal-name"]'),
        getTbBankAccountNumber:()=> cy.get('input[data-cy="input-bank-account-number"]'),
        getTbRoutingNumber:()=> cy.get('input[data-cy="input-routing-number"]'),
        getSchedulePayDate:()=> cy.contains('label','Schedule pay date').parent().parent().find('input'),
        getInvoiceDate:()=> cy.contains('label','Invoice Date').parent().parent().find('input'),
        

        //dropdown
        getSelectCountryCode:()=> cy.get('.css-1u6tjmp>input'),
        getSelectApprovers:()=> cy.get('.css-1u6tjmp>input',{timeout:10000}),
        getSelectVendorType:()=> cy.contains('label',"Vendor Type").parent().parent().find('input'),
        getSelectCountry:()=> cy.contains('label',"Country").parent().parent().find('input'),
        getSelectPaymentMethod:()=> cy.contains('label',"Link payment method").parent().parent().find('input'),
        getSelectVendorName:()=> cy.contains('label',"Vendor Name").parent().parent().find('input'),
        getSelectCurrency:()=> cy.contains('label',"Currency").parent().parent().find('input'),
        getSelectPaymentType:()=> cy.contains('label',"Payment Type").parent().parent().find('input'),
        getSelectPaymentTo:()=> cy.contains('label',"Send Payments to").parent().parent().find('input'),
        getSelectPaymentCurrency:()=> cy.contains('label',"Payment currency").parent().parent().find('input'),

        //file
        getUploadPayemntInvoice:()=> cy.get('input[type="file"]')

    }

    acceptAgreement(){
        this.element.getCheckbox().click();
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
        this.element.getTbMemberFirstName().clear().type(FirstName)
        this.element.getTbMemberLastName().clear().type(LastName)
        this.element.getTbMemberEmail().clear().type(email)
        handleDropDown(this.element.getSelectCountryCode(),phoneNumber.split('-')[0])
        this.element.getTbMemberPhoneNumber().clear().type(phoneNumber.split('-')[1])
        this.element.getBtnSubmit().click()
        
    }
    goToPolicies(){
        this.element.getBtnPolicies().click()
    }
    addPolicy(criteria,number){
        handleDropDownWithText(this.element.getSelectApprovers(),"All approvers must accept")
        this.element.getCheckbox().then(($el)=>{
            for(let i =0;i<number;i++){
                cy.wrap($el[i]).click()
            }
        })
        this.element.getCreateButton().click()
        cy.contains('Active policies')
    }
    goToCustomers(){
        this.element.goToCustomers().click()
    }

    goToVendors(){
        this.element.getLinkVendors().click()
    }
    addNewVendor(name,type,country,paymentMethod,accountNumber,routingNumber){
        this.element.getBtnAddNewVendor().click()
        this.element.getTbVendorName().type(name+getdateAndTIme())
        handleDropDown(this.element.getSelectVendorType(),type)
        handleDropDownWithText(this.element.getSelectCountry(),country)
        this.element.getBtnSubmit().click({force:true})
        this.element.getBtnAddVendorPayment().click()
        handleDropDown(this.element.getSelectPaymentMethod(),paymentMethod)
        this.element.getTbBankAccountNumber().type(accountNumber)
        this.element.getTbRoutingNumber().type(routingNumber)
        this.element.getBtnSubmitPop().click()
        this.element.getBtnSubmit().click()

    }

    addNewPayment(vendorName,billDate,scheduleDate,payType,payTo,payIn,amount){       
        this.element.getBtnCreatePayment().click()
        this.element.getUploadPayemntInvoice().selectFile('cypress/assets/payment.jpg',{force: true})
        cy.contains('Extracting invoice details').should('not.be.visible',{timeout:10000})
        handleDropDownWithText(this.element.getSelectVendorName().click(),vendorName)
        handleDropDownWithText(this.element.getSelectCurrency().click(),"USD")        
        this.element.getInvoiceDate().type(billDate)
        cy.contains('Tax amount').click()
        this.element.getSchedulePayDate().type(scheduleDate)       
        this.element.getBtnSubmit().click({force:true})
        cy.contains(amount,{timeout:20000})
        this.element.getVendorEmail().type("test@gmail.com")
        handleDropDownWithText(this.element.getSelectPaymentType(),payType)
        handleDropDown(this.element.getSelectPaymentTo(),payTo)
        handleDropDownWithText(this.element.getSelectPaymentCurrency(),payIn)
        this.element.getBtnSubmit().click({force:true})
        this.element.getBtnSendForApproval().click()
        cy.contains('Bills')
    }

}