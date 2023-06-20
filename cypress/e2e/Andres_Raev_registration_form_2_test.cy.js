beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

/* The main outcome of this assignment is the updated code with new functional tests for Registration Form 2. In this assignment, you will add tests to the file “registration_form_2_test.cy.js”.
/ # Add a test to “Section 1: Functional tests”, which checks that passwords should match in order to submit the page:
    a. Fill all mandatory fields on the page
    b. Fill in different values in the password and confirmation password input fields.
    c. Assert that the corresponding error message is visible and the submit button is not enabled (click on some other field or element on the page before in order to activate the assertion of the password matching).
    d. Change the test so, that now there are the same values in the password and confirmation password input fields.
    e. Assert that the error message is not visible anymore and the submit button is enabled (click on some other element before the assertion).*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible

        // Add username
        cy.get('[data-testid="user"]').type('Testuser')
        
        // Check that in username field only text is allowed (tpye=text) and only text and numbers are allowed
        cy.get('[data-testid="user"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z0-9_]+')
        
        // Add e-mail
        cy.get('input[name="email"]').type('user@email.com')
        
        // Check that e-mail field input type is e-mail and field is correctly validated (pattern is checked for username; @ symbol; domain name; "." symbol, top-level domain, 2-4 characters)
        cy.get('input[name="email"]').should('have.attr', 'type', 'email').should('have.attr','pattern','[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        
        // Add First name
        cy.get('[data-cy="name"]').type('firstname')
        
        // Check that first name field input type is text and field is correctly validated (pattern must be in text format)
        cy.get('[data-cy="name"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z]+')
        
        // Add Last name
        cy.get('[data-testid="lastNameTestId"]').type('lastname')
        
        // Check that last name field input type is text and field is correctly validated (pattern must be in text format)
        cy.get('[data-testid="lastNameTestId"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z]+')
        
        // Add Phone number
        cy.get('[data-testid="phoneNumberTestId"]').type('123456')
        
        // Check that phonenumber input type is number, and field maxlenght is 10
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number').should('have.attr','maxlength','10')

        // Add password and WRONG confirmation password
        cy.get('[name="password"]').type('MinuParool')
        cy.get('[name="confirm"]').type('MinuParool1')

        // in order to try to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        // Check that submit button is being disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is visible
        cy.get('#success_message').should('not.be.visible')
        cy.get('#success_message').should('have.css', 'display', 'none')

        // Assert that password error messages is shown
        cy.get('#password_error_message').should('be.visible')
        cy.get('#password_error_message').should('contain', 'Passwords do not match!')

        // Add correct password and confirmation
        // In order to re-write, user must overwrite confirmation password (select previous confirmation password->overwrite correct one)
        cy.get('[name="confirm"]').type('{selectAll}')
        cy.get('[name="confirm"]').type('MinuParool')

        // in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        // Check that after re-typing pass/confirmation Submit button is now enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')  

    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        // Add user
        cy.get('[data-testid="user"]').type('Testuser')
        
        // Check that in username field only text is allowed (tpye=text) and only text and numbers are allowed
        cy.get('[data-testid="user"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z0-9_]+')
        
        // Add e-mail
        cy.get('input[name="email"]').type('user@email.com')
        
        //Check that e-mail field input type is e-mail and field is correctly validated (pattern is checked for username; @ symbol; domain name; "." symbol, top-level domain, 2-4 characters)
        cy.get('input[name="email"]').should('have.attr', 'type', 'email').should('have.attr','pattern','[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        
        // Add First name
        cy.get('[data-cy="name"]').type('firstname')
        
        //Check that first name field input type is text and field is correctly validated (pattern is checked for text symbols only)
        cy.get('[data-cy="name"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z]+')
        
        // Add Last name
        cy.get('[data-testid="lastNameTestId"]').type('lastname')
        
        // Check that last name field input type is text and field is correctly validated (pattern is checked for text symbols only)
        cy.get('[data-testid="lastNameTestId"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z]+')
        
        // Add Phone number
        cy.get('[data-testid="phoneNumberTestId"]').type('123456')
        
        //Check that phonenumber input type is number, and field maxlenght is 10
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number').should('have.attr','maxlength','10')
        
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

        // Array of favorite transport are with given choices (checboxes) (3 elements)
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')
 
        // Selecting one vehicle will NOT remove selection from other checkboxes
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
        
        // Selecting one of cars (second choice)
        cy.get('#cars').select(1)

        // Advanced level how to check the content of the animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })
        
        // Selecting one of cars (second choice)
        cy.get('#animal').select(1)

        // Add password and confirmation
        cy.get('[name="password"]').type('MinuParool')
        cy.get('[name="confirm"]').type('MinuParool')

        // in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password section').click()

        // Check that Submit button is enabled and click on it
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')

    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message

        // Add username
        cy.get('[data-testid="user"]').type('Testuser')
        
        // Check that in username field only text is allowed (tpye=text) and only text and numbers are allowed
        cy.get('[data-testid="user"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z0-9_]+')
        
        // Add e-mail
        cy.get('input[name="email"]').type('user@email.com')
        
        //Check that e-mail field input type is e-mail and field is correctly validated (pattern is checked for username; @ symbol; domain name; "." symbol, top-level domain, 2-4 characters)
        cy.get('input[name="email"]').should('have.attr', 'type', 'email').should('have.attr','pattern','[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        
        // Add First name
        cy.get('[data-cy="name"]').type('firstname')
        
        // Check that first name field input type is text and field is correctly validated (pattern is checked for text symbols only)
        cy.get('[data-cy="name"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z]+')
        
        // Add Last name
        cy.get('[data-testid="lastNameTestId"]').type('lastname')
        
        //Check that last name field input type is text and field is correctly validated (pattern is checked for text symbols only)
        cy.get('[data-testid="lastNameTestId"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z]+')
        
        // Add Phone number
        cy.get('[data-testid="phoneNumberTestId"]').type('123456')
        
        // Check that phonenumber input type is number, and field maxlenght is 10
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number').should('have.attr','maxlength','10')

        // Add password and confirmation
        cy.get('[name="password"]').type('MinuParool')
        cy.get('[name="confirm"]').type('MinuParool')

        // in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password section').click()

        // Check that Submit button is enabled and click on it
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')

    })

    it('Input valid data to the page', () => {
        inputValidData('john.doe')
    })

    it('Submit button is not enabled when mandatory data is missing', ()=>{

        // Add username
        cy.get('[data-testid="user"]').type('Testuser')
        
        // Check that in username field only text is allowed (tpye=text) and only text and numbers are allowed
        cy.get('[data-testid="user"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z0-9_]+')
        
        // Add e-mail
        cy.get('input[name="email"]').type('user@email.com')
        
        //Check that e-mail field input type is e-mail and field is correctly validated (pattern is checked for username; @ symbol; domain name; "." symbol, top-level domain, 2-4 characters)
        cy.get('input[name="email"]').should('have.attr', 'type', 'email').should('have.attr','pattern','[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        
        // Don't Add First name, code is commented out
        // cy.get('[data-cy="name"]').type('firstname')
        
        //Check that first name field input type is text and field is correctly validated (pattern must be in text format)
        // cy.get('[data-cy="name"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z]+')
        
        // Add Last name
        cy.get('[data-testid="lastNameTestId"]').type('lastname')
        
        //Check that last name field input type is text and field is correctly validated (pattern must be in text format)
        cy.get('[data-testid="lastNameTestId"]').should('have.attr', 'type', 'text').should('have.attr','pattern','[a-zA-Z]+')
        
        // Add Phone number
        cy.get('[data-testid="phoneNumberTestId"]').type('123456')
        
        //Check that phonenumber input type is number, and field maxlenght is 10
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number').should('have.attr','maxlength','10')

        // Add password and WRONG confirmation password
        cy.get('[name="password"]').type('MinuParool')
        cy.get('[name="confirm"]').type('MinuParool')

        // in order to try to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        // Check that submit button is being disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is visible
        cy.get('#success_message').should('not.be.visible')
        cy.get('#success_message').should('have.css', 'display', 'none')
 
    })

    // You can add more similar tests for checking other mandatory field's absence

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Create similar test for checking second picture
    it('Check that Cypress picture (logo) is correct and has correct size', () => {
        cy.log('Will check Cypress logo source and size')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height and width less than 89 and greaterthan 87 (88)
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89).and('be.greaterThan', 87)
        // Get element and check its parameter width equals to 116
        cy.get('img[data-cy="cypress_logo"]').invoke('width').should('be.equal', 116)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    /* Add a test to check the second link in the navigation bar - the link to the Cerebrum Hub homepage:
    check that the link is correct
    verify, that the link is clickable */
    /* NB! This works correctly only in Chrome!! */

    it('Check second link', () => {

        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find its second child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/') // This works correctly only in Chrome browser
            .click()
        // cy.origin('https://cerebrumhub.com/', () => { cy.visit('https://cerebrumhub.com')}) <- this is when you want to visit other link than the page you are on and check something from there.
        
        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')

        // Go back to previous page
        cy.go('back')
        cy.log('Link is clickable, navigated back again in registration form 2')       

    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        //Checkbox list should have 3 elements in total and not checked by default
        cy.get('input[class="checkbox vehicles"]').should('have.length', 3)
        cy.get('input[class="checkbox vehicles"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[class="checkbox vehicles"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')
        
        //Multiple checkboxes can be checked
        cy.get('input[class="checkbox vehicles"]').eq(0).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).check().should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).check().should('be.checked')

        //Checking that multiple values are checked
        cy.get('input[class="checkbox vehicles"]').eq(0).should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(1).should('be.checked')
        cy.get('input[class="checkbox vehicles"]').eq(2).should('be.checked')
    
        cy.log('Multiple checkboxes can be checked')       

    })


    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#animal').select(1).screenshot('Animal Dropdown')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        
        //Check  that second element in the dropdown has text Cat
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        
        // Advanced level how to check the content of the Animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })

        // Advanced level how to check the content of the Animals dropdown (alternative from option text)
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.text)
            expect(actual).to.deep.eq(['Dog', 'Cat', 'Snake', 'Hippo', 'Cow', 'Horse'])

        cy.log('Animal dropdown is correct')       

        })    
    })

})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}