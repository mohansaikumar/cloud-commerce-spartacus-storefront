import { checkAllElements, TabElement } from '../tabbing-order';
import { formats } from '../../../sample-data/viewports';

export function headerTabbingOrder(
  config: TabElement[],
  mobile: boolean = false,
  loggedIn: boolean = false
) {
  cy.visit('/');

  if (mobile) {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  }

  // Ensures components are loaded before tabbing
  cy.get('.SiteContext')
    .find('cx-site-context-selector select')
    .should('have.length', 2);

  // Load differing amounts of nav nodes depending on if logged in or not
  const navLength: number = loggedIn ? 43 : 30;
  cy.get('header cx-navigation-ui')
    .find('nav')
    .should('have.length', navLength);

  if (!mobile) {
    cy.get('header cx-site-context-selector select')
      .first()
      .focus();
  } else {
    cy.get('header cx-hamburger-menu button')
      .first()
      .click()
      .focus();
  }

  checkAllElements(config);
}

export function subCategoryTabbingOrder(
  config: TabElement[],
  subCategoryName: string,
  mobile: boolean = false
) {
  cy.visit('/');

  if (mobile) {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  }

  cy.wait(1000); // TODO: Wait stabilizes test, change after cx-navigation-ui refactor
  if (mobile) {
    cy.get('cx-hamburger-menu button')
      .first()
      .click()
      .focus();
  }

  cy.get('cx-category-navigation').within(() => {
    cy.get('cx-navigation-ui')
      .find('nav')
      .should('have.length', 30);
    cy.get('cx-navigation-ui nav h5')
      .contains(subCategoryName)
      .should('be.visible');
    cy.wait(1000); // TODO: Wait stabilizes test, change after cx-navigation-ui refactor
    cy.get('cx-navigation-ui nav span')
      .first()
      .focus();
    cy.focused().trigger('keydown', {
      key: ' ',
      code: 'Space',
      force: true,
    });
  });
  cy.pressTab();

  checkAllElements(config);
}
