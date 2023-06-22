beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

describe('Section 1: visual tests', ()=> {

    it('Check logo', () => {
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo.png')
        // get element and check its parameter height and width
        cy.get('img').invoke('height').should('be.equal', 165.994)
        cy.get('img').invoke('width').should('be.equal', 177.997)
    })
    
    it('Check that radio button list (newsletters) is correct', () => {
        // Newsletter list
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Check that only one option can be checked
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

        cy.log('Newsletter is working correctly');
    });

    it('Country and city dropdowns are correct', () => {
   
        // Advance level how to check country list
        cy.get('#country').find('option').then(options => {
             const actual = [...options].map(option => option.label)
             expect(actual).to.deep.eq(['', 'Spain', 'Estonia', 'Austria'])
         })

        //Check that if country isn't seleted, then city is empty
        cy.get('#country').select('')
        cy.get('#city').find('option').should('have.text', '')

        //Check that when Spain is selected, the city dropdown is correct
        cy.get('#country').select('Spain')

        // Advance level how to check city list in Spain
        cy.get('[ng-model="citySrc"]').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        }) 

        //Check that when Estonia is selected, the city dropdown is correct
        cy.get('#country').select('Estonia')
        
        // Advance level how to check city list in Estonia
        cy.get('[ng-model="citySrc"]').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Tallinn', 'Haapsalu', 'Tartu'])
        }) 

        //Check that when Austria is selected, the city dropdown is correct
        cy.get('#country').select('Austria')
        cy.get('[ng-model="citySrc"]').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Vienna', 'Salzburg', 'Innsbruck'])
        }) 
        cy.log('Country list ok');
    });

    it('Check that privacy checboxes are correct, link is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 2)
        //Accept our privacy policy doesn't have text visible on the page
        cy.get('input[type="checkbox"]').next().eq(0).should('not.have.text', 'Accept our privacy policy ').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'Accept our cookie policy').and('not.be.checked')

        //Check that both checkboxes can be checked at the same time 
        cy.get('input[type="checkbox"]').eq(0).click().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).click().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')

        // Check that cookie policy link is active
        cy.get('button').children().should('have.length', 1)
        cy.get('button').children().eq(0).should('be.visible')
         .and('have.attr', 'href', 'cookiePolicy.html')
         .click()
        // Check that opened URL is correct
        cy.url().should('contain', '/cookiePolicy.html')
        // Check cookie policy text
        cy.get('#successMessage').should('have.text', 'This is a demo page, no cookie policies are used for demo')
        // Go back to previous page
        cy.go('back')
    });

    it('Check email format and error messages', () => {
        // Proper error message when e-mail is not correct and error message in red color
        cy.get('[type="email"]').type('proov123')
        cy.get('#emailAlert').should('be.visible')
        cy.get('span[ng-show="myForm.email.$error.email"]').should('contain', 'Invalid email address').and('have.css', 'color', 'rgb(255, 0, 0)')

        // Proper error message when e-mail is missing and error message in red color
        cy.get('[type="email"]').clear()
        cy.get('#emailAlert').should('be.visible')
        cy.get('span[ng-show="myForm.email.$error.required"]').should('contain', 'Email is required').and('have.css', 'color', 'rgb(255, 0, 0)')
    });  

})
    
describe('Section 2: Functional tests', ()=> {   
    it('User can submit form with all fields added + validations', () => {

        //Firstly check cookie policy because Submit button can't be pressed if cookie policy is checked at the end (cookies aren't used)
        cy.get('button').should('have.text', 'Accept our cookie policy').children().should('be.visible').and('have.attr', 'href', 'cookiePolicy.html')
        .click()

        // Confirm url and success message
        cy.url().should('contain', '/cookiePolicy.html')
        cy.get('#successMessage').should('have.text', 'This is a demo page, no cookie policies are used for demo')
    
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 3')

        cy.get('#name').clear().type('Testname') //clear the field and type name
        cy.get('#name').should('have.attr', 'type', 'text')
        cy.get('input[name="email"]').type('user@email.com')
        cy.get('input[name="email"]').should('have.attr', 'type', 'email')

        // Select first country
        cy.get('#country').select(1)

        // Advance level how to check country list
        cy.get('#country').find('option').then(options => {
             const actual = [...options].map(option => option.label)
             expect(actual).to.deep.eq(['', 'Spain', 'Estonia', 'Austria'])
         })

        // Advance level how to check city list in Spain
         cy.get('[ng-model="citySrc"]').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        }) 
        
        // Select first city in the country
        cy.get('#city').select(2)

        // Select date of birth
        cy.contains('Date of birth').next().type('1991-01-01')

        // Select newsletter frequency
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked') //Check the first item
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Select birthday and validate that it has max value
        cy.get('input[name="birthday"]').type('1991-01-01').should('have.attr', 'max') 

        // Accepty privacy policy
        cy.get('[type="checkbox"]').first().check()
        cy.contains('Accept our privacy policy') // Why can't I include this in the get checkbox line?

        // Accept cookie policy and check if there is a link and it works
        cy.get('[type="checkbox"]').last().check()
        cy.get('button').should('have.text', 'Accept our cookie policy').children().should('be.visible').and('have.attr', 'href', 'cookiePolicy.html')

        // Upload a file
        cy.get('input[type=file]').selectFile('load_this_file_reg_form_3.txt')
        
        // Find Submit button, click on it
        cy.get('input[type="submit"]').last().click()
        
        // Confirm success message
        cy.get('h1').should('be.visible')
        cy.get('h1').should('have.text', 'Submission received')

    });

    it('User can submit form with only mandatory fields added', () => {
        cy.get('[type="email"]').type('andres@email.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('input[type="checkbox"]').first().click()
        cy.get('input[type="checkbox"]').last().click()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.enabled')
        cy.get('input[ng-disabled="myForm.$invalid"]').click()
        cy.get('h1').contains('Submission received')
        cy.go('back')
    });

    it('User can not submit form with empty email field', () => {
        inputMandatoryData()
        // Clear e-mail
        cy.get('[type="email"]').clear()
        // Error message in red should be visible
        cy.get('span[ng-show="myForm.email.$error.required"]').should('contain', 'Email is required').and('be.visible').and('have.css', 'color', 'rgb(255, 0, 0)')
        // Submit button is disabled
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.disabled')
    });

    it('User can not submit form with empty country field', () => {
        inputMandatoryData()
        // Clear country
        cy.get('#country').select('')
        // Submit button is disabled
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.disabled')
    });

    it('User can not submit form with empty city field', () => {
        inputMandatoryData()
        // Clear city
        cy.get('#city').select('')
        // Check that submit button is disabled
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.disabled')
    });

    it('User can not submit form with unchecked checkboxes', () => {
        inputMandatoryData()
        // Privacy policy checkbox
        cy.get('input[type="checkbox"]').first().uncheck()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.disabled')
        // Cookie policy checkbox
        cy.get('input[type="checkbox"]').last().uncheck()
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.disabled')
    });
    
    it('City is already chosen and country is updated, then city choice should be removed', () => {
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('#country').select('Spain')
        // Tallinn is removed
        cy.get('#city').should('not.have.text', 'Tallinn')
        // City options should be correct to country selected (Austria)
        // Advance level how to check city list in Spain
        cy.get('[ng-model="citySrc"]').find('option').then(options => {
            const actual = [...options].map(option => option.label)
            expect(actual).to.deep.eq(['', 'Malaga', 'Madrid', 'Valencia', 'Corralejo'])
        }) 
    });
    
    it('File upload works correctly', () => {
        inputMandatoryData()
        // Upload file
        cy.get('input[type=file]').selectFile('load_this_file_reg_form_3.txt')
        cy.readFile('load_this_file_reg_form_3.txt')
        // Check that Submit button is enabled and clickable
        cy.get('input[ng-disabled="myForm.$invalid"]').should('be.enabled').click()
        cy.get('h1').contains('Submission received')
        cy.log('Mandatory data + file upload works correctly')

    })
    

})

function inputMandatoryData() {
    cy.log('Filling mandatory fields')
    cy.get('[type="email"]').type('user@email.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.get('input[type="checkbox"]').first().click()
    cy.get('input[type="checkbox"]').last().click()
}