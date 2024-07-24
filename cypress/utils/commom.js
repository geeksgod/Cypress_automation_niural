import 'cypress-wait-until';
export function handleDropDown(dropdown,value){   
        dropdown.click({force:true})  
        cy.wait(100) 
        dropdown.type(value+"{enter}",{force: true})  
        
}

export function checkAndType(element,value){
        let isElemetPresent
        element.then(($el) => {
                if ($el.length) {
                  cy.wrap($el).type(value)
                } 
        });       
}

export function waitUntilPresent(element){
        cy.waitUntil(() =>
                element.then(($el) => {
                        return $el.length > 0
                }),  
                {
                  timeout: 10000, // maximum time to wait for the condition to be true
                  interval: 500 // time to wait between retries
                }
              )
}