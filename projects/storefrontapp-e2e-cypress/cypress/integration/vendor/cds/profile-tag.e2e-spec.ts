import * as anonymousConsents from '../../../helpers/anonymous-consents';
import { waitForPage } from '../../../helpers/checkout-flow';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
describe.skip('Profile-tag events', () => {
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();

    const homePage = waitForPage('homepage', 'getHomePage');
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    cy.get('cx-profiletag');
    cy.wait(`@${homePage}`)
      .its('status')
      .should('eq', 200);

    profileTagHelper.triggerLoaded();
  });
  it('should send a CartChanged event on adding an item to cart', () => {
    const productCode = 'ProductPage&code=280916';
    const productPage = waitForPage(productCode, 'getProductPage');
    cy.get('.Section4 cx-banner')
      .first()
      .find('img')
      .click({ force: true });
    cy.wait(`@${productPage}`)
      .its('status')
      .should('eq', 200);
    cy.get('cx-add-to-cart button.btn-primary').click();
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer.length).to.equal(2);
      expect((<any>win).Y_TRACKING.eventLayer[1]['name']).to.equal(
        'CartSnapshot'
      );
      expect((<any>win).Y_TRACKING.eventLayer[1]['data']).to.exist;
      expect((<any>win).Y_TRACKING.eventLayer[1]['data']['cart']).to.exist;
      expect(
        JSON.stringify((<any>win).Y_TRACKING.eventLayer[1]['data']['cart'])
      ).to.include('code');
    });
  });
  it('should send a Navigated event when a navigation occurs', () => {
    const categoryPage = waitForPage('CategoryPage', 'getCategory');
    cy.get(
      'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
    ).click();
    cy.wait(`@${categoryPage}`)
      .its('status')
      .should('eq', 200);
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal('Navigated');
    });
  });
  it('should wait for a user to accept consent and then send a ConsentChanged event', () => {
    anonymousConsents.clickAllowAllFromBanner();
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]).to.have.property('name');
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal(
        'ConsentChanged'
      );
    });
  });
});