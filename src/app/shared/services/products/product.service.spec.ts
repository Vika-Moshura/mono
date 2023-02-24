/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProductResponse } from '../../interfaces/IProduct';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('Service: Product.service', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let PRODUCT: IProductResponse;
  let PRODUCTS: IProductResponse[];
  beforeEach(() => {
    PRODUCT = {
      category: {
        id: 1,
        name: 'pizza',
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
    };
    PRODUCTS = [{
      category: {
        id: 1,
        name: 'pizza',
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
    },
    {
      category: {
        id: 1,
        name: 'pizza',
        path: 'string',
        imagePath: 'string',
      },
      id: 2,
      name: 'string',
      path: 'string',
      ingredients: 'string',
      weight: 'string',
      price: 1,
      imagePath: 'string',
      count: 1,
    }];
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => httpTestingController.verify());

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

  it('should test getAll method', () => {
    service
      .getAll()
      .subscribe((response) => expect(response).toBe(PRODUCTS))
    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET')
    req.flush(PRODUCTS);
  });


  it('should test create method', () => {
    service
      .create(PRODUCT)
      .subscribe((response) => expect(response).toBe(PRODUCT))
    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('POST')
    req.flush(PRODUCT);
  });

  it('should test update method', () => {
    service
      .update(PRODUCT, PRODUCT.id)
      .subscribe((response) => expect(response).toBe(PRODUCT))
    const req = httpTestingController.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('PATCH')
    req.flush(PRODUCT);
  });

  it('should test delete method', () => {
    service
      .delete(PRODUCT.id)
      .subscribe((response) => expect(response).toBeNull())
    const req = httpTestingController.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('DELETE')
    req.flush(null);
  });

  it('should test resolve method', () => {
    const route = new ActivatedRouteSnapshot();
    route.params = { id: 1 };
    service.resolve(route).then(result => {
      expect(result).toEqual(PRODUCT);
    })
    const req = httpTestingController.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCT);
  }
  );
});
