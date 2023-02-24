/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryService } from '../category/category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/ICategory';

describe('Service: Category', () => {
  let arr: ICategoryResponse[];
  let data: ICategoryRequest;
  let data2: ICategoryResponse;
  let service: CategoryService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    arr = [{
      id: 1,
      name: 'string',
      path: 'string',
      imagePath: 'string',
    }];
    data = {
      name: 'string',
      path: 'string',
      imagePath: 'string',
    };
    data2 = {
      id: 1,
      name: 'string',
      path: 'string',
      imagePath: 'string',
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should ...', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));

  it('should test getAll method', () => {
    service
      .getAll()
      .subscribe((response) => expect(response).toBe(arr))
    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('GET')
    req.flush(arr);
    service
  });

  it('should test create method', () => {
    service
      .create(data)
      .subscribe((response) => expect(response).toBe(data2))
    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('POST')
    req.flush(data2);
  });

  it('should test update method', () => {
    service
      .update(data2, data2.id)
      .subscribe((response) => expect(response).toBe(data2))
    const req = httpTestingController.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('PATCH')
    req.flush(data2);
  });

  it('should test delete method', () => {
    const id = 1;
    service
      .delete(id)
      .subscribe((response) => expect(response).toBeNull())
    const req = httpTestingController.expectOne('http://localhost:3000/categories/1');
    expect(req.request.method).toBe('DELETE')
    req.flush(null);
  });
});