import { HOMEPAGE,SIGNINPAGE,SIGNUPPAGE1,SIGNUPPAGE2,WELCOMEPAGE,ACCESSPAGE,ONBOARDINGPAGE,ADDRESSREGISTRATIONPAGE } from "../pages"
import '../fixtures/dropdownoptions'
import { EMPLOYEENUMBER } from "../fixtures/dropdownoptions"

const apiKey = "37d4b70a826d3dceecda79c299750c94daaef0dff33c1832fed2838e6883e673"

describe('template spec', () => {
  beforeEach(()=>{
    cy.mailslurp({
      apiKey
    }).then(mailslurp => mailslurp.createInbox()).then(inbox =>{
      cy.wrap(inbox.id).as('inboxId')
      cy.wrap(inbox.emailAddress).as('emailAddress')
    })
  })

  it('passes', function(){
    var hp = new HOMEPAGE() 
    hp.signInAsEmployer() 
    var sp = new SIGNINPAGE()  
    sp.goToSignUp()
    var su1 = new SIGNUPPAGE1()
    su1.enterName('test','test','test')
    su1.enterEmail(this.emailAddress)
    su1.enterCompanyInfo("test","test.com",EMPLOYEENUMBER.BETWEEN25AND50)
    su1.enterPassowrd("Te$t12345678")
    su1.enterPhoneNumber("+1-9842354894")
    su1.clickNext()
    var su2 = new SIGNUPPAGE2()
    su2.getAndVerifyOtpCode(apiKey,this.inboxId)
    var wp = new WELCOMEPAGE()
    wp.clickOnStart()

    var ap = new ACCESSPAGE()
    ap.chooseFullAccess()
    
    var op = new ONBOARDINGPAGE()
    op.setCountryOfRegistration("United States")
    op.enterTaxId("123456789")
    op.setRegistrationdate("04-05-2023")
    op.setBusinessInfo("Limited liability company","Bar")
    op.clickNext()

    var ar = new ADDRESSREGISTRATIONPAGE()
    ar.enterAddressline1("testaddress","testcity","Alaska","12345")
    ar.clickNext()
  })
})