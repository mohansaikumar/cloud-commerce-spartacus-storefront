import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Order, OrderHistoryList } from '../../model/order.model';
import { USERID_CURRENT } from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import * as fromStore from '../store/index';
import { USER_FEATURE } from '../store/user-state';
import { UserOrderService } from './user-order.service';

describe('UserOrderService', () => {
  let service: UserOrderService;
  let store: Store<fromStore.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromStore.getReducers()),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [UserOrderService],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    service = TestBed.get(UserOrderService);
  });

  it('should UserOrderService is injected', inject(
    [UserOrderService],
    (userOrderService: UserOrderService) => {
      expect(userOrderService).toBeTruthy();
    }
  ));

  it('should be able to get order details', () => {
    store.dispatch(
      new fromStore.LoadOrderDetailsSuccess({ code: 'testOrder' })
    );

    let order: Order;
    service
      .getOrderDetails()
      .subscribe(data => {
        order = data;
      })
      .unsubscribe();
    expect(order).toEqual({ code: 'testOrder' });
  });

  it('should be able to load order details', () => {
    service.loadOrderDetails('orderCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadOrderDetails({
        userId: USERID_CURRENT,
        orderCode: 'orderCode',
      })
    );
  });

  it('should be able to clear order details', () => {
    service.clearOrderDetails();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearOrderDetails()
    );
  });

  it('should be able to get order history list', () => {
    store.dispatch(
      new fromStore.LoadUserOrdersSuccess({
        orders: [],
        pagination: {},
        sorts: [],
      })
    );

    let orderList: OrderHistoryList;
    service
      .getOrderHistoryList(1)
      .subscribe(data => {
        orderList = data;
      })
      .unsubscribe();
    expect(orderList).toEqual({
      orders: [],
      pagination: {},
      sorts: [],
    });
  });

  it('should be able to get order list loaded flag', () => {
    store.dispatch(new fromStore.LoadUserOrdersSuccess({}));

    let orderListLoaded: boolean;
    service
      .getOrderHistoryListLoaded()
      .subscribe(data => {
        orderListLoaded = data;
      })
      .unsubscribe();
    expect(orderListLoaded).toEqual(true);
  });

  it('should be able to load order list data', () => {
    service.loadOrderList(10, 1, 'byDate');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserOrders({
        userId: USERID_CURRENT,
        pageSize: 10,
        currentPage: 1,
        sort: 'byDate',
      })
    );
  });

  it('should be able to clear order list', () => {
    service.clearOrderList();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearUserOrders()
    );
  });

  it('should be able to get consignment tracking', () => {
    store.dispatch(
      new fromStore.LoadConsignmentTrackingSuccess({ trackingID: '1234567890' })
    );
    service
      .getConsignmentTracking()
      .subscribe(r => expect(r).toEqual({ trackingID: '1234567890' }))
      .unsubscribe();
  });

  it('should be able to load consignment tracking', () => {
    service.loadConsignmentTracking('orderCode', 'consignmentCode');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadConsignmentTracking({
        orderCode: 'orderCode',
        consignmentCode: 'consignmentCode',
      })
    );
  });

  it('should be able to clear consignment tracking', () => {
    service.clearConsignmentTracking();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearConsignmentTracking()
    );
  });
});
