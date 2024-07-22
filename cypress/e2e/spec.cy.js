import { HOMEPAGE,SIGNINPAGE } from "../pages"
import { SIGNUPPAGE1 } from "../pages/signuppage"
import '../fixtures/dropdownoptions'
import { EMPLOYEENUMBER } from "../fixtures/dropdownoptions"

describe('template spec', () => {
  it('passes', () => {
    var hp = new HOMEPAGE() 
    hp.signInAsEmployer() 
    var sp = new SIGNINPAGE()  
    sp.goToSignUp()
    var su1 = new SIGNUPPAGE1()
    su1.enterName('test','test','test')
    su1.enterEmail("test@gmail.com")
    su1.enterCompanyInfo("test","test.com",EMPLOYEENUMBER.BETWEEN25AND50)
    su1.enterPassowrd("Te$t12345678")
    su1.enterPhoneNumber("+1-9842354894")
    su1.clickNext()
  })
})