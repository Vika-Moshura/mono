/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscountsService } from './discounts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/IDiscount';

describe('Service: Discounts', () => {
  let id = 1;
  let request: IDiscountRequest;
  let response: IDiscountResponse;
  let service: DiscountsService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    request = {
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    };
    response = {
      id: 1,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [DiscountsService]
    });
    service = TestBed.inject(DiscountsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should ...', inject([DiscountsService], (service: DiscountsService) => {
    expect(service).toBeTruthy();
  }));

  it('should test getAll method', () => {
    service
      .getAll()
      .subscribe((response) => expect(response).toBe(response))
    const req = httpTestingController.expectOne('http://localhost:3000/discounts');
    expect(req.request.method).toBe('GET')
    req.flush(response);
  });


  it('should test getOne method', () => {
    service
      .getOne(id)
      .subscribe((response) => expect(response).toBe(response))
    const req = httpTestingController.expectOne('http://localhost:3000/discounts/1');
    expect(req.request.method).toBe('GET')
    req.flush(response);
  });

  it('should test create method', () => {
    service
      .create(request)
      .subscribe((response) => expect(response).toBe(response))
    const req = httpTestingController.expectOne('http://localhost:3000/discounts');
    expect(req.request.method).toBe('POST')
    req.flush(response);
  });

  it('should test update method', () => {
    service
      .update(response, response.id)
      .subscribe((response) => expect(response).toBe(response))
    const req = httpTestingController.expectOne('http://localhost:3000/discounts/1');
    expect(req.request.method).toBe('PATCH')
    req.flush(response);
  });

  it('should test delete method', () => {
    service
      .delete(id)
      .subscribe((response) => expect(response).toBeNull())
    const req = httpTestingController.expectOne('http://localhost:3000/discounts/1');
    expect(req.request.method).toBe('DELETE')
    req.flush(null);
  });

  it('should test resolve method', () => {
    const route = new ActivatedRouteSnapshot();
    route.params = { id: 1 };
    service.resolve(route).then(result => {
      expect(result).toEqual(response);
    })
    const req = httpTestingController.expectOne('http://localhost:3000/discounts/1');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  }
  );
});
