import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions } from '../../../auth/store/actions/index';
import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { ConsentTemplate } from '../../../model/consent.model';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { CustomerCouponSearchResult } from '../../../model/customer-coupon.model';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import {
  OrderHistoryList,
  ReturnRequestList,
  ReturnRequest,
  Order,
} from '../../../model/order.model';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import {
  REGIONS,
  RegionsState,
  UserState,
  USER_ADDRESSES,
  USER_CONSENTS,
  USER_ORDERS,
  USER_PAYMENT_METHODS,
  CUSTOMER_COUPONS,
  NOTIFICATION_PREFERENCES,
  PRODUCT_INTERESTS,
  USER_RETURN_REQUESTS,
  USER_ORDER_DETAILS,
  USER_RETURN_REQUEST_DETAILS,
} from '../user-state';
import * as fromBillingCountriesReducer from './billing-countries.reducer';
import * as fromConsignmentTrackingReducer from './consignment-tracking.reducer';
import * as fromDeliveryCountries from './delivery-countries.reducer';
import * as fromNotificationPreferenceReducer from './notification-preference.reducer';
import * as fromOrderDetailsReducer from './order-details.reducer';
import * as fromPaymentReducer from './payment-methods.reducer';
import * as fromRegionsReducer from './regions.reducer';
import * as fromResetPasswordReducer from './reset-password.reducer';
import * as fromTitlesReducer from './titles.reducer';
import * as fromAddressesReducer from './user-addresses.reducer';
import * as fromUserConsentsReducer from './user-consents.reducer';
import * as fromUserDetailsReducer from './user-details.reducer';
import * as fromUserOrdersReducer from './user-orders.reducer';
import * as fromCustomerCouponReducer from './customer-coupon.reducer';
import * as fromInterestsReducer from './product-interests.reducer';
import * as fromOrderReturnRequestReducer from './order-return-request.reducer';

export function getReducers(): ActionReducerMap<UserState> {
  return {
    account: combineReducers({
      details: fromUserDetailsReducer.reducer,
    }),
    addresses: loaderReducer<Address[]>(
      USER_ADDRESSES,
      fromAddressesReducer.reducer
    ),
    billingCountries: fromBillingCountriesReducer.reducer,
    consents: loaderReducer<ConsentTemplate[]>(
      USER_CONSENTS,
      fromUserConsentsReducer.reducer
    ),
    payments: loaderReducer<PaymentDetails[]>(
      USER_PAYMENT_METHODS,
      fromPaymentReducer.reducer
    ),
    orders: loaderReducer<OrderHistoryList>(
      USER_ORDERS,
      fromUserOrdersReducer.reducer
    ),
    order: loaderReducer<Order>(
      USER_ORDER_DETAILS,
      fromOrderDetailsReducer.reducer
    ),
    orderReturn: loaderReducer<ReturnRequest>(USER_RETURN_REQUEST_DETAILS),
    orderReturnList: loaderReducer<ReturnRequestList>(
      USER_RETURN_REQUESTS,
      fromOrderReturnRequestReducer.reducer
    ),
    countries: fromDeliveryCountries.reducer,
    titles: fromTitlesReducer.reducer,
    regions: loaderReducer<RegionsState>(REGIONS, fromRegionsReducer.reducer),
    resetPassword: fromResetPasswordReducer.reducer,
    consignmentTracking: fromConsignmentTrackingReducer.reducer,
    customerCoupons: loaderReducer<CustomerCouponSearchResult>(
      CUSTOMER_COUPONS,
      fromCustomerCouponReducer.reducer
    ),
    notificationPreferences: loaderReducer<NotificationPreference[]>(
      NOTIFICATION_PREFERENCES,
      fromNotificationPreferenceReducer.reducer
    ),
    productInterests: loaderReducer<ProductInterestSearchResult>(
      PRODUCT_INTERESTS,
      fromInterestsReducer.reducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  UserState
>> = new InjectionToken<ActionReducerMap<UserState>>('UserReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserState];
