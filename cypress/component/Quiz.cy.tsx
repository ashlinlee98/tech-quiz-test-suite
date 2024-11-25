import * as React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz.jsx'; 
import questions from '../fixtures/questions.json';

describe('Quiz Component', () => {
    beforeEach(() => {
        // Mock the API call for questions and use the provided fixture
        cy.intercept('GET', '/api/questions/random', { body: questions }).as('getQuestions');
        mount(<Quiz />);
    });

    it('renders the Start button initially', () => {
        cy.get('button').contains('Start').should('exist');
    });

    it('starts the quiz and shows the first question', () => {
        cy.get('button').contains('Start').click();
        
        // Ensure that the first question is displayed correctly
        cy.get('h2').contains(questions[0].question).should('be.visible');
    });

    it('displays the next question after an answer', () => {
        cy.get('button').contains('Start').click();
        cy.get('h2').contains(questions[0].question).should('be.visible');
        
        // Answer the first question (assuming button "1" is the correct choice)
        cy.get('button').contains('1').click();
        
        // Verify that the next question is displayed
        cy.get('h2').contains(questions[1].question).should('be.visible');
    });

    it('displays the score after completing the quiz', () => {
        cy.get('button').contains('Start').click();

        // Answer all 10 questions (clicking answer options 1, 2, 3, or 4, assuming index < 4)
        questions.forEach((_, index) => {
            if (index < 4) {
                cy.get('button').contains(index + 1).click(); // Click buttons 1, 2, 3, or 4
            }
        });

        // Ensure the quiz completion message is displayed
        cy.get('h2').should('include.text', 'Quiz Completed');

        // Ensure the score message appears and contains the score
        cy.get('div').contains('Your score:', { timeout: 10000 }).should('be.visible');
    });

    it('restarts the quiz when clicking Start New Quiz', () => {
        cy.get('button').contains('Start').click();

        // Answer all 10 questions (again using index < 4 logic for this example)
        questions.forEach((_, index) => {
            if (index < 4) {
                cy.get('button').contains(index + 1).click(); // Correct selection for answer div
            }
        });

        // Verify the quiz completion message is shown
        cy.get('h2').should('include.text', 'Quiz Completed');
        cy.get('div').contains('Your score:', { timeout: 10000 }).should('be.visible');

        // Click to take a new quiz
        cy.contains('Take New Quiz').click();
    });
});
