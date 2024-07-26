import 'cypress-wait-until';

/**
 * handles dropdowns manual flow
 */
export function handleDropDown(dropdown,value){   
        dropdown.click({force:true})  
        cy.wait(100) 
        dropdown.type(value+"{enter}",{force: true})  
        
}

/**
 * handles dropdowns with help of text
 */
export function handleDropDownWithText(dropdown,value){   
        dropdown.click({force:true})  
        cy.wait(100) 
        dropdown.type(value,{force: true})  
        cy.contains('div[role="option"]',value).click()        
        
}

/**
 * Type the value only if the element is present
 */
export function checkAndType(element,value){
        let isElemetPresent
        element.then(($el) => {
                if ($el.length) {
                  cy.wrap($el).type(value)
                } 
        });       
}

/**
 * Click the element only if the elemnet is present
 */
export function checkAndClick(element,value){
        let isElemetPresent
        element.then(($el) => {
                if ($el.length) {
                  cy.wrap($el).click()
                } 
        });       
}

/**
 * Waits untill the element is present
 */
export function waitUntilPresent(element,timeout){
        cy.waitUntil(() =>
                element.then(($el) => {
                        return $el.length > 0
                }),  
                {
                  timeout: timeout, // maximum time to wait for the condition to be true
                  interval: 500 // time to wait between retries
                }
              )
}

/**
 * Return date and time string. use this function to make the data unique
 */
export function getdateAndTIme() {
 
  const currentDateTime = new Date();

  const year = currentDateTime.getFullYear();
  const month = (currentDateTime.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = currentDateTime.getDate().toString().padStart(2, "0");
  const hours = currentDateTime.getHours().toString().padStart(2, "0");
  const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");

  const customDateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}`;

  return customDateTimeString;
}