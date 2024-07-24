import '../utils/commom'
import { checkAndType, handleDropDown } from '../utils/commom'
export class KYBPAGE{
   

    elements = {
        btnNoGamblng:() => cy.get('button[data-cy="button-no"]',{timeout:10000}),
        btnYesGamblng: ()=> cy.get('button[data-cy="button-yes"]'),
        fileUpload: ()=> cy.get('input[data-cy=upload-w9]',{timeout:20000}),
        buttonNext: () => cy.get('button[data-cy="button-next"]',{timeout:10000}),
        getSelectJobTitle:() => cy.get('#react-select-8-input',{timeout:10000}),        
        getSelectOccupation:() => cy.get('#react-select-9-input'),
        getSelectAnnualIncome:() => cy.get('#react-select-10-input'),
        getSelectSourceIncome:() => cy.get('#react-select-11-input'),
        getIsMale:()=> cy.get('div[data-cy="radio-gender-male"]'),
        getIsFemale:()=> cy.get('div[data-cy="radio-gender-female"]'),
        getTbDate:()=>cy.get('#input-date'),
        getSelectPrimaryCountry:()=>cy.get('#react-select-12-input'),
        getTbAddressLine1: ()=> cy.get('input[data-cy="input-addressLine1"]'),
        getTbAddressLine2: ()=> cy.get('input[data-cy="input-addressLine2"]'),
        getTbCity: ()=> cy.get('input[data-cy="input-city"]'),
        getSelectState: ()=> cy.get('#react-select-13-input'),
        getTbZipCode: ()=> cy.get('input[data-cy="input-zip-code"]'),
        getTbSSN:() => cy.get('input[data-cy="input-ssn"]'),
        getCheckbox:()=> cy.get('input[data-cy="checkbox-isBeneficialOwner"]').parent(),
        getBtnSendCode:()=> cy.get('button[type="submit"]'),
        getSelectDocumentType:()=> cy.get('div[class=" css-1u6tjmp"]>input',{timeout:10000}),
        getTbDocumentId:() => cy.get('input[data-cy="input-documentValue"]'),
        getTbAuthority:() => cy.get('input[data-cy="input-issuer"]'),
        getTbDate: () => cy.get('button>div>input'),
        getFileId:() => cy.get('input[accept]'),
        getAnnualRevenue:() => cy.get('div[id="dropdown-annual-revenue"] input',{timeout:10000}).as('renevueInput'),
        getDataFlow:() => cy.get('#dropdown-cash-flow input'),
        getCheckboxTerms:()=> cy.get('input[data-cy="checkbox-acceptTermsAndConditions"]',{timeout:10000}),
        getButtonSubmit:()=> cy.get('button[data-cy="button-submit"]'),
        getBtnContinue:()=>cy.get('.mt-4 > .font-medium',{timeout:10000})
    }
    

    isGamblingBusiness(isTrue){
        cy.get('body').then(($body) => {
            if ($body.find('.mt-4 > .font-medium',{timeout:10000}).length > 0) {
                this.elements.getBtnContinue().click();
            } else {
                
                if (isTrue) {
                    this.elements.btnYesGamblng().click();
                } else {
                    this.elements.btnNoGamblng().click();
                }
            }
        });
    }

    uploadFiles(){
        this.elements.fileUpload().then((elements)=>{
            var count = 1
            for(var element of elements ){
                cy.wrap(element).selectFile(`cypress/assets/${count.toString()}.jpeg`,{force: true})      
                count++          
            }
        })
    }
    
    waitForUploadAndContinue(){
        cy.contains('2-',{timeout:10000}).then(()=>{
            this.elements.buttonNext().click()
        });

    }
    setUserInfo(job,occupation,annual,source,isMale,DOB){
      
        handleDropDown( this.elements.getSelectJobTitle(),job)
        handleDropDown(this.elements.getSelectOccupation(),occupation)
        handleDropDown(this.elements.getSelectAnnualIncome(),annual)
        handleDropDown(this.elements.getSelectSourceIncome(),source)
        if(!isMale) this.elements.getIsFemale().click()
        this.elements.getTbDate().type(DOB)
    }
    setAddressInfo(country,address1,address2,city,state,Zipcode){
      
        if(country) handleDropDown(this.elements.getSelectPrimaryCountry(),country)
        if(address1) this.elements.getTbAddressLine1().type(address1)
        if(address2) this.elements.getTbAddressLine2().type(address2)
        if(city) this.elements.getTbCity().type(city)
        if(state) handleDropDown(this.elements.getSelectState(),state)
        if(Zipcode) this.elements.getTbZipCode().type(Zipcode)
        if(state) handleDropDown(this.elements.getSelectState(),state)
    }

    setSSN(ssn,agree){
        if(ssn)checkAndType(this.elements.getTbSSN(),ssn)
        if(agree) this.elements.getCheckbox().click()
    }
    clickNext(){
        this.elements.buttonNext().click()
    }
    clickSendCode(){
        this.elements.getBtnSendCode().click()
    }

    addPersonalDocuments(type,docId,authority,date){
        handleDropDown(this.elements.getSelectDocumentType(),type)
        this.elements.getTbDocumentId().type(docId)
        this.elements.getTbAuthority().type(authority)
        this.elements.getTbDate().type(date)
        this.elements.getFileId().selectFile('cypress/assets/sample.pdf',{force: true})
        cy.contains("Submitted")
        this.elements.buttonNext().click()
    }
    addAdditionalInfo(Revenue,flow){
        cy.wait(5000)
        this.elements.getAnnualRevenue()
        handleDropDown(cy.get('@renevueInput'),Revenue)
        handleDropDown(this.elements.getDataFlow(),flow)
        this.elements.buttonNext().click()
    }

    acceptAggreement(){
        this.elements.getCheckboxTerms().click()
        this.elements.getButtonSubmit().click()
        cy.contains('verified',{timeout:10000})
    }
}