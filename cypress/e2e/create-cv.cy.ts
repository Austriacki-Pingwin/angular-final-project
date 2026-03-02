describe('Create CV flow', () => {
  beforeEach(() => {
    cy.intercept('**/firestore.googleapis.com/**').as('firestore');

    cy.visit('/auth/sign-in');

    cy.get('input').first().type('user@gmail.com');
    cy.get('input').eq(1).type('Qwer!2');

    cy.contains('Sign in').click();

    cy.url({ timeout: 10000 }).should('not.include', 'sign-in');
    cy.wait('@firestore');
  });

  it('should create CV successfully', () => {
    cy.get('[data-cy="create-cv"]', { timeout: 10000 }).should('be.visible').click();

    cy.get('input').last().type('E2E Test CV');

    cy.contains('Add').click();

    cy.contains('E2E Test CV', { timeout: 10000 }).should('exist');
  });

  it('should show error notification if API fails', () => {
    cy.intercept('POST', '**/cvs', {
      statusCode: 500,
      body: {},
    });

    cy.get('[data-cy="create-cv"]', { timeout: 10000 }).should('be.visible').click();

    cy.get('input').last().type('Broken CV');

    cy.contains('Add').click();
  });
});
