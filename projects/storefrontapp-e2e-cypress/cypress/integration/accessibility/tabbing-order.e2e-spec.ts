import { addProduct } from '../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig as config } from '../../helpers/accessibility/tabbing-order.config';
import { addToCartTabbingOrder } from '../../helpers/accessibility/tabbing-order/add-to-cart';
import {
  addressBookDirectoryTabbingOrder,
  addressBookFormTabbingOrder,
  setupForAddressBookTests,
} from '../../helpers/accessibility/tabbing-order/my-account/address-book';
import { cartTabbingOrder } from '../../helpers/accessibility/tabbing-order/cart';
import { changePasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/change-password';
import { checkoutDeliveryModeTabbingOrder } from '../../helpers/accessibility/tabbing-order/checkout/delivery-mode';
import {
  checkoutBillingAddressTabbingOrder,
  checkoutPaymentDetailsTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/checkout/payment-details';
import { checkoutReviewOrderTabbingOrder } from '../../helpers/accessibility/tabbing-order/checkout/review-order';
import {
  checkoutShippingAddressExistingTabbingOrder,
  checkoutShippingAddressNewTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/checkout/shipping-address';
import { closeAccountTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/close-account';
import { consentManagementTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/consent-management';
import { footerTabbingOrder } from '../../helpers/accessibility/tabbing-order/footer';
import {
  headerTabbingOrder,
  subCategoryTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/header';
import { homeTabbingOrder } from '../../helpers/accessibility/tabbing-order/home';
import { loginTabbingOrder } from '../../helpers/accessibility/tabbing-order/login';
import { orderDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/order-details';
import {
  orderHistoryNoOrdersTabbingOrder,
  orderHistoryWithOrdersTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/my-account/order-history';
import { paymentDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/payment-details';
import { personalDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/personal-details';
import {
  productListTabbingOrderDesktop,
  productListTabbingOrderMobile,
  productListTabbingOrderMobileFilters,
  toggleProductView,
} from '../../helpers/accessibility/tabbing-order/product-list';
import { productPageTabbingOrder } from '../../helpers/accessibility/tabbing-order/product-page';
import { productPageTabsTabbingOrder } from '../../helpers/accessibility/tabbing-order/product-page-tabs';
import { registerTabbingOrder } from '../../helpers/accessibility/tabbing-order/register';
import { myAccountTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account';
import { notificationPreferenceTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/notification-preference';
import { myInterestTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/my-interests';
import { forgotPasswordTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/reset-password';
import { updateEmailTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/update-email';
import { wishlistTabbingOrder } from '../../helpers/accessibility/tabbing-order/my-account/wishlist';
import { searchResultsTabbingOrder } from '../../helpers/accessibility/tabbing-order/store-finder/search-results';
import { defaultViewTabbingOrder } from '../../helpers/accessibility/tabbing-order/store-finder/default-view';
import { storeDetailsTabbingOrder } from '../../helpers/accessibility/tabbing-order/store-finder/store-details';
import { countriesListTabbingOrder } from '../../helpers/accessibility/tabbing-order/store-finder/countries-list';
import { storesListTabbingOrder } from '../../helpers/accessibility/tabbing-order/store-finder/stores-list';
import {
  stockNotificationNotLoginTabbingOrder,
  stockNotificationNoEnbaledPreferenceTabbingOrder,
  stockNotificationProductSubscribedTabbingOrder,
  stockNotificationDialogTabbingOrder,
  stockNotificationTabbingOrder,
} from '../../helpers/accessibility/tabbing-order/stock-notification';

describe("Tabbing order - tests don't require user to be logged in", () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  context('Header - Desktop (not logged in)', () => {
    it('should allow to navigate with tab key', () => {
      headerTabbingOrder(config.headerDesktopNotLoggedIn);
    });
  });

  context('Header - Mobile (not logged in)', () => {
    it('should allow to navigate with tab key', () => {
      headerTabbingOrder(config.headerMobileNotLoggedIn, true);
    });
  });

  describe('Header Sub Categories - Desktop', () => {
    context('Brands', () => {
      // TODO: Test currently fails because navigation-ui works incorrectly
      it('should allow to navigate with tab key', () => {
        subCategoryTabbingOrder(config.headerCategoryBrands, 'Brands');
      });
    });

    context('Digital Cameras', () => {
      it('should allow to navigate with tab key', () => {
        subCategoryTabbingOrder(
          config.headerCategoryDigitalCameras,
          'Digital Cameras'
        );
      });
    });

    context('Accessories', () => {
      // TODO: This test fails with the current navigation-ui implementation for unknown reasons.
      // Better fixed after nav-ui refactor (#6743)
      it('should allow to navigate with tab key', () => {
        subCategoryTabbingOrder(
          config.headerCategoryAccessories,
          'Accessories'
        );
      });
    });
  });

  describe('Header Sub Categories - Mobile', () => {
    context('Brands', () => {
      it('should allow to navigate with tab key', () => {
        subCategoryTabbingOrder(config.headerCategoryBrands, 'Brands', true);
      });
    });

    context('Digital Cameras', () => {
      it('should allow to navigate with tab key', () => {
        subCategoryTabbingOrder(
          config.headerCategoryDigitalCameras,
          'Digital Cameras',
          true
        );
      });
    });

    context('Accessories', () => {
      it('should allow to navigate with tab key', () => {
        subCategoryTabbingOrder(
          config.headerCategoryAccessories,
          'Accessories',
          true
        );
      });
    });
  });

  context('Home page', () => {
    it('should allow to navigate with tab key', () => {
      homeTabbingOrder(config.home);
    });
  });

  context('Footer', () => {
    it('should allow to navigate with tab key', () => {
      footerTabbingOrder(config.footer);
    });
  });

  context('Login page', () => {
    it('should allow to navigate with tab key (empty form)', () => {
      loginTabbingOrder(config.login);
    });

    it('should allow to navigate with tab key (filled out form)', () => {
      loginTabbingOrder(config.login, true);
    });
  });

  context('Register page', () => {
    it('should allow to navigate with tab key', () => {
      registerTabbingOrder(config.register);
    });
  });

  context('Reset password', () => {
    it('should allow to navigate with tab key', () => {
      forgotPasswordTabbingOrder(config.resetPassword);
    });
  });

  context('Product List', () => {
    it('should allow to navigate with tab key (desktop - list view)', () => {
      productListTabbingOrderDesktop(config.productListDesktop);
    });

    it('should allow to navigate with tab key (desktop - grid view)', () => {
      toggleProductView(); // switch to grid view
      productListTabbingOrderDesktop(config.productListDesktop);
      toggleProductView(); // reset to default (list view)
    });

    it('should allow to navigate with tab key (mobile)', () => {
      productListTabbingOrderMobile(config.productListMobile);
    });

    it('should allow to navigate with tab key (mobile filters)', () => {
      productListTabbingOrderMobileFilters(config.productListMobileFilters);
    });
  });

  context('Product Page', () => {
    it('should allow to navigate with tab key', () => {
      productPageTabbingOrder(config.productPage);
    });
  });

  context('Product Page Tabs', () => {
    it('should allow to navigate with tab key', () => {
      productPageTabsTabbingOrder();
    });
  });

  context('Add to cart', () => {
    it('should allow to navigate with tab key', () => {
      addToCartTabbingOrder(config.addToCart);
    });
  });

  context('Cart', () => {
    it('should allow to navigate with tab key', () => {
      cartTabbingOrder(config.cart);
    });
  });

  context('Store finder', () => {
    context('Default view', () => {
      it('should allow to navigate with tab key', () => {
        defaultViewTabbingOrder(config.storeFinder);
      });
    });

    context('Search results page', () => {
      it('should allow to navigate with tab key', () => {
        searchResultsTabbingOrder(config.storeFinderSearchResults);
      });
    });

    context('Store details page', () => {
      it('should allow to navigate with tab key', () => {
        storeDetailsTabbingOrder(config.storeFinderStoreDetails);
      });
    });

    context('Countries list', () => {
      it('should allow to navigate with tab key', () => {
        countriesListTabbingOrder(config.storeFinderCountriesList);
      });
    });

    context('Stores list', () => {
      it('should allow to navigate with tab key', () => {
        storesListTabbingOrder(config.storeFinderStoresList);
      });
    });
  });

  context('Stock Notification', () => {
    it('should allow to navigate with tab key (not login)', () => {
      stockNotificationNotLoginTabbingOrder(config.stockNotificationNotLogin);
    });
  });
});

describe('Tabbing order - tests do require user to be logged in', () => {
  before(() => {
    cy.requireLoggedIn();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context('Header - Desktop (logged in)', () => {
    it('should allow to navigate with tab key', () => {
      headerTabbingOrder(config.headerDesktopLoggedIn, false, true);
    });
  });

  context('Header - Mobile (logged in)', () => {
    it('should allow to navigate with tab key', () => {
      headerTabbingOrder(config.headerMobileLoggedIn, true, true);
    });
  });

  context('My Account - Desktop', () => {
    it('should allow to navigate with tab key', () => {
      myAccountTabbingOrder(config.myAccount);
    });
  });

  context('My Account - Mobile', () => {
    it('should allow to navigate with tab key', () => {
      myAccountTabbingOrder(config.myAccount, true);
    });
  });

  describe('Checkout', () => {
    before(() => {
      cy.restoreLocalStorage();
      addProduct();
      cy.getAllByText(/Proceed to checkout/i)
        .first()
        .click(); // move to checkout
      cy.get('cx-breadcrumb').should('contain', 'Checkout'); // check if we begin checkout tests in checkout
      cy.saveLocalStorage();
    });

    context('Shipping address', () => {
      it('should allow to navigate with tab key (add address)', () => {
        checkoutShippingAddressNewTabbingOrder(config.shippingAddressNew);
      });

      it('should allow to navigate with tab key (choose existing)', () => {
        cy.visit('/checkout/shipping-address'); // revisit shipping address page, so the address card is visible
        checkoutShippingAddressExistingTabbingOrder(
          config.shippingAddressExisting
        );
      });
    });

    context('Delivery mode', () => {
      it('should allow to navigate with tab key', () => {
        checkoutDeliveryModeTabbingOrder(config.deliveryMode);
      });
    });

    context('Payment details', () => {
      it('should allow to navigate with tab key (card)', () => {
        checkoutPaymentDetailsTabbingOrder(config.paymentDetailsCard);
      });

      it('should allow to navigate with tab key (billing address)', () => {
        checkoutBillingAddressTabbingOrder(config.paymentDetailsBillingAddress);
      });
    });

    context('Review order', () => {
      it('should allow to navigate with tab key', () => {
        checkoutReviewOrderTabbingOrder(config.checkoutReviewOrder);
      });
    });
  });

  context('Order History', () => {
    it('should allow to navigate with tab key (no orders)', () => {
      orderHistoryNoOrdersTabbingOrder(config.orderHistoryNoOrders);
    });

    it('should allow to navigate with tab key (with orders)', () => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.requireLoggedIn();
      orderHistoryWithOrdersTabbingOrder();
    });
  });

  context('Notification preference', () => {
    it('should allow to navigate with tab key', () => {
      notificationPreferenceTabbingOrder(config.notificationPreference);
    });
  });

  context('Change password', () => {
    it('should allow to navigate with tab key', () => {
      changePasswordTabbingOrder(config.changePassword);
    });
  });

  context('Personal details', () => {
    it('should allow to navigate with tab key', () => {
      personalDetailsTabbingOrder(config.personalDetails);
    });
  });

  context('Update email', () => {
    it('should allow to navigate with tab key', () => {
      updateEmailTabbingOrder(config.updateEmail);
    });
  });

  context('Close account', () => {
    it('should allow to navigate with tab key', () => {
      closeAccountTabbingOrder(config.closeAccount);
    });
  });

  context('Consent Management', () => {
    it('should allow to navigate with tab key', () => {
      consentManagementTabbingOrder(config.consentManagement);
    });
  });

  context('Address Book (Form)', () => {
    it('should allow to navigate with tab key (Directory)', () => {
      setupForAddressBookTests();
      addressBookFormTabbingOrder(config.addressBookForm);
    });

    it('should allow to navigate with tab key (Form)', () => {
      addressBookDirectoryTabbingOrder(config.addressBookDirectory);
    });
  });

  context('Payment Details', () => {
    it('should allow to navigate with tab key', () => {
      paymentDetailsTabbingOrder(config.paymentDetails);
    });
  });

  context('Order Details', () => {
    it('should allow to navigate with tab key', () => {
      orderDetailsTabbingOrder(config.orderDetails);
    });
  });

  context('Wishlist', () => {
    it('should allow to navigate with tab key', () => {
      wishlistTabbingOrder(config.wishlist);
    });
  });

  context('My Interest', () => {
    it('should allow to navigate with tab key', () => {
      myInterestTabbingOrder(config.myInterests);
    });
  });

  context('Stock Notification', () => {
    it('should allow to navigate with tab key (no enabled notification preference)', () => {
      stockNotificationNoEnbaledPreferenceTabbingOrder(
        config.stockNotificationNoEnabledPreference
      );
    });

    it('should allow to navigate with tab key (product was been subscribed)', () => {
      stockNotificationProductSubscribedTabbingOrder(
        config.stockNotificationSubscribed
      );
    });

    it('should allow to navigate with tab key (dialog)', () => {
      stockNotificationDialogTabbingOrder(config.stockNotificationDialog);
    });

    it('should allow to navigate with tab key', () => {
      stockNotificationTabbingOrder(config.stockNotification);
    });
  });
});
