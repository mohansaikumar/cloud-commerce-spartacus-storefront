import {
  pathsUrlMatcherFactory,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { getSuffixUrlMatcher } from './suffix-routes/suffix.url-matcher';

export const defaultStorefrontRoutesConfig: RoutesConfig = {
  home: { paths: [''] },
  notFound: { paths: ['not-found'] },
  cart: { paths: ['cart'] },

  // semantic links for login related pages
  login: { paths: ['login'], protected: false },
  register: { paths: ['login/register'], protected: false },
  forgotPassword: { paths: ['login/forgot-password'], protected: false },
  resetPassword: { paths: ['login/pw/change'], protected: false },
  logout: { paths: ['logout'] },
  checkoutLogin: { paths: ['checkout-login'] },

  checkout: { paths: ['checkout'] },
  checkoutShippingAddress: { paths: ['checkout/shipping-address'] },
  checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
  checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
  checkoutReviewOrder: { paths: ['checkout/review-order'] },
  orderConfirmation: { paths: ['order-confirmation'] },

  // plp routes
  search: { paths: ['search/:query'] },
  category: {
    paths: ['category/:categoryCode'],
    paramsMapping: { categoryCode: 'code' },
    matchers: [
      pathsUrlMatcherFactory,
      getSuffixUrlMatcher({ marker: 'c', paramName: 'categoryCode' }),
    ],
  },
  brand: { paths: ['Brands/:brandName/c/:brandCode'] },

  // pdp routes
  product: {
    paths: ['product/:productCode/:name'],
    paramsMapping: { productCode: 'code' },
    matchers: [
      pathsUrlMatcherFactory,
      getSuffixUrlMatcher({ marker: 'p', paramName: 'categoryCode' }),
    ],
  },

  termsAndConditions: { paths: ['terms-and-conditions'] },
  orders: {
    paths: ['my-account/orders'],
  },
  orderDetails: {
    paths: ['my-account/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderGuest: {
    paths: ['guest/order/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderReturn: {
    paths: ['my-account/order/return/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderReturnConfirmation: {
    paths: ['my-account/order/return/confirmation/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderCancel: {
    paths: ['my-account/order/cancel/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  orderCancelConfirmation: {
    paths: ['my-account/order/cancel/confirmation/:orderCode'],
    paramsMapping: { orderCode: 'code' },
  },
  returnRequestDetails: {
    paths: ['my-account/return-request/:returnCode'],
    paramsMapping: { returnCode: 'rma' },
  },
  coupons: { paths: ['my-account/coupons'] },
  couponClaim: {
    paths: ['my-account/coupon/claim/:couponCode'],
    paramsMapping: { couponCode: 'code' },
  },
};

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultStorefrontRoutesConfig,
  },
};
