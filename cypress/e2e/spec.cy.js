import {
  HOMEPAGE,
  SIGNINPAGE,
  SIGNUPPAGE1,
  SIGNUPPAGE2,
  WELCOMEPAGE,
  ACCESSPAGE,
  ONBOARDINGPAGE,
  ADDRESSREGISTRATIONPAGE,
  DASHBOARDPAGE,
  KYBPAGE,
  NIURALPAYPAGE
} from "../pages";
import "../fixtures/dropdownoptions";
import { EMPLOYEENUMBER } from "../fixtures/dropdownoptions";
import * as data from "../fixtures/signupdata.json";

const apiKey =
  "37d4b70a826d3dceecda79c299750c94daaef0dff33c1832fed2838e6883e673";

describe("User wants to Signup", () => {
  //reading data from json
  var userinfo = data.userinfo;
  var companyinfo = data.companyinfo;
  var companyaddress = data.companyaddress;

  beforeEach(() => {
    //using thirdparty mail server for otp verification will side up the email address and inbox id
    // cy.mailslurp({
    //   apiKey
    // }).then(mailslurp => mailslurp.createInbox()).then(inbox =>{
    //   cy.wrap(inbox.id).as('inboxId')
    //   cy.wrap(inbox.emailAddress).as('emailAddress')
    // })
    // cy.mailslurp()
    //         // fetch a phone number using the phone controller on the mailslurp instance
    //         .then(mailslurp => mailslurp.phoneController.getPhoneNumbers({
    //             phoneCountry: 'US',
    //         }))
    //         .then((phones) => {
    //             // insure you have phone number created in dashboard
    //             expect(phones.totalElements).gt(0);
    //             // IMPORTANT STEP, add the phone number details to the test context using `cy.wrap`
    //             const phoneNumber = phones.content[0]?phones.content:9841563154;
    //             cy.log(`Phone id ${phoneNumber.id}`)
    //             cy.wrap(phoneNumber.id).as('phoneNumberId')
    //             cy.wrap(phoneNumber.phoneNumber).as('phoneNumber')
    //         })
  });

  it.skip("User Creates a Account", function () {
    var home = new HOMEPAGE(); //Intilizing pageobject
    home.signInAsEmployer(); //function will select employer from the given options

    var signup = new SIGNINPAGE();
    signup.goToSignUp();

    var signup1 = new SIGNUPPAGE1();
    signup1.enterName(
      userinfo.FirstName,
      userinfo.MiddleName,
      userinfo.LastName
    );
    signup1.enterEmail(this.emailAddress);
    //fucntion below will enter the company information, the select option here is not generic unlicke the country etc so, tired to implement the enum concept
    signup1.enterCompanyInfo(
      userinfo.CompanyName,
      userinfo.CompanyWebsite,
      EMPLOYEENUMBER.BETWEEN25AND50
    );
    signup1.enterPassowrd(userinfo.Password);
    signup1.enterPhoneNumber(userinfo.PhoneNumber);
    signup1.clickNext();

    var signup2 = new SIGNUPPAGE2();
    //function will grab the otp and enter the opt for verification
    signup2.getAndVerifyOtpCode(apiKey, this.inboxId);

    var welcome = new WELCOMEPAGE();
    welcome.clickOnStart();

    var access = new ACCESSPAGE();
    access.chooseFullAccess();
  });

  it.skip("User login", function () {
    var home = new HOMEPAGE(); //Intilizing pageobject
    home.signInAsEmployer(); //function will select employer from the given options

    var signup = new SIGNINPAGE();
    signup.signIn(
      "bb065719-11ac-46a6-afc4-e8de11dde027@mailslurp.net",
      "Te$t12345678"
    );
    var onboard = new ONBOARDINGPAGE();
    onboard.setCountryOfRegistration(companyinfo.Country);
    onboard.enterTaxId(companyinfo.TaxId);
    onboard.setRegistrationdate(companyinfo.Registrationdate);
    onboard.setBusinessInfo(companyinfo.CompanyType, companyinfo.CompanyNature);
    onboard.clickNext();

    var address = new ADDRESSREGISTRATIONPAGE();
    address.enterAddressline1(
      companyaddress.AddressLine1,
      companyaddress.City,
      companyaddress.State,
      companyaddress.Zipcode
    );
    address.clickNext();

    var dashboardpage = new DASHBOARDPAGE();
    dashboardpage.verifySuccessfulSignIn();
  });

  it.skip("Verify Business Us flow", function () {
    var home = new HOMEPAGE(); //Intilizing pageobject
    home.signInAsEmployer(); //function will select employer from the given options

    var signup = new SIGNINPAGE();
    signup.signIn(
      "bb065719-11ac-46a6-afc4-e8de11dde027@mailslurp.net",
      "Te$t12345678"
    );
    var dashboardpage = new DASHBOARDPAGE();
    dashboardpage.verifySuccessfulSignIn();
    dashboardpage.clickVerifyBusiness();
    var kyb = new KYBPAGE();
    kyb.isGamblingBusiness(false);
    kyb.uploadFiles();
    kyb.waitForUploadAndContinue();
    kyb.setUserInfo(
      "CEO",
      "DOCTOR",
      "Up to 10k",
      "Government",
      false,
      "07-07-2000"
    );
    kyb.setAddressInfo(
      "United States",
      "test",
      "test",
      "test",
      "Alaska",
      "12345"
    );
    kyb.setSSN("123456789", true);
    kyb.clickNext();
    kyb.clickSendCode();
  });

  it.skip("Verify Business non-Us flow", function () {
    var home = new HOMEPAGE(); //Intilizing pageobject
    home.signInAsEmployer(); //function will select employer from the given options

    var signup = new SIGNINPAGE();
    signup.signIn(
      "2de16ee5-83b6-4b7c-b2b7-a1c43febbac0@mailslurp.net",
      "Te$t12345678"
    );
    var dashboardpage = new DASHBOARDPAGE();
    dashboardpage.verifySuccessfulSignIn();
    dashboardpage.clickVerifyBusiness();
    var kyb = new KYBPAGE();
    kyb.isGamblingBusiness(false);
    kyb.uploadFiles();
    kyb.waitForUploadAndContinue();
    kyb.setUserInfo(
      "CEO",
      "DOCTOR",
      "Up to 10k",
      "Government",
      false,
      "07-07-2000"
    );
    kyb.setAddressInfo("Turkey", "test", "test", "test", "", "12345");
    kyb.setSSN("", true);
    kyb.clickNext();
    kyb.addPersonalDocuments("Passport", "15634", "CDO", "05-02-2030");
    kyb.addAdditionalInfo("Over 5M", "Predictable");
    kyb.acceptAggreement();
  });

  it("Add uers", function () {
    var home = new HOMEPAGE(); //Intilizing pageobject
    home.signInAsEmployer(); //function will select employer from the given options

    var signup = new SIGNINPAGE();
    signup.signIn(
      "2de16ee5-83b6-4b7c-b2b7-a1c43febbac0@mailslurp.net",
      "Te$t12345678"
    );
    var dashboardpage = new DASHBOARDPAGE();
    dashboardpage.verifySuccessfulSignIn();
    dashboardpage.goToNiuralPay();

    var niuralpay = new NIURALPAYPAGE()
    //niuralpay.acceptAgreement()
    niuralpay.gotoUserANdPolicies()
    // data.vendorinfo.forEach((info)=>{
    //   niuralpay.gotoAddNewUser()
    //   niuralpay.addNewUser(info.FirstName,info.LastName,`${info.FirstName}@gmail.com`,info.Phone)
    // })
    niuralpay.goToPolicies()
    niuralpay.addPolicy("All",3)
    
  });
});
