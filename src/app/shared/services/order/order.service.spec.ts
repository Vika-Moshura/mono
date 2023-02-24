import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IOrderRequest, IOrderResponse } from '../../interfaces/IOrder';

describe('OrderService', () => {
  let service: OrderService;
  let order1: IOrderRequest;
  let order2: IOrderResponse;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    order1 = {
      date: new Date,
      address: 'string',
      sum: 1,
      status: 'string',
      products: [
        {
          category: {
            id: 1,
            name: 'string',
            path: 'string',
            imagePath: 'string',
          },
          id: 1,
          name: 'string',
          path: 'string',
          ingredients: 'string',
          weight: 'string',
          price: 1,
          imagePath: 'string',
          count: 1,
        }
      ],
    };
    order2 = {
      id: 1,
      date: new Date,
      address: 'string',
      sum: 1,
      status: 'string',
      products: [
        {
          category: {
            id: 1,
            name: 'string',
            path: 'string',
            imagePath: 'string',
          },
          id: 1,
          name: 'string',
          path: 'string',
          ingredients: 'string',
          weight: 'string',
          price: 1,
          imagePath: 'string',
          count: 1,
        }
      ],
    }
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        OrderService
      ]
    });
    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test create method', () => {
    service
      .create(order1)
      .subscribe((response) => expect(response).toBe(order2))
    const req = httpTestingController.expectOne('http://localhost:3000/orders');
    expect(req.request.method).toBe('POST')
    req.flush(order2);
  });
});
