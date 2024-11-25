describe('Tech Quiz E2E Tests', () => {
    it('Starts the quiz', () => {
      cy.visit('http://127.0.0.1:3001');
      cy.contains('button', 'Start Quiz').click();
  
      cy.get('h2').should('include.text', '?');
    });
  
    it('Completes the quiz and shows score', () => {
      cy.visit('http://127.0.0.1:3001');
      cy.contains('button', 'Start Quiz').click();
 
      for (let i = 0; i < 10; i++) { 
        cy.get('h2').should('include.text', '?'); 
        cy.get('.btn.btn-primary').first().click();
      }

      cy.get('h2').should('include.text', 'Quiz Completed');

      cy.get('div').contains('Your score:', { timeout: 10000 }).should('be.visible'); 
    });
  
    it('Restarts the quiz', () => {
      cy.visit('http://127.0.0.1:3001');
      cy.contains('button', 'Start Quiz').click();

      for (let i = 0; i < 10; i++) {
        cy.get('.btn.btn-primary').first().click();
      }
  
      cy.get('h2').should('include.text', 'Quiz Completed'); 

      cy.get('div').contains('Your score:', { timeout: 10000 }).should('be.visible'); 
      cy.contains('button', 'Take New Quiz').click(); 
      cy.get('h2').should('include.text', '?'); 
    });
  });
  