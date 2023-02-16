/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscountsService } from './discounts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Discounts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [DiscountsService]
    });
  });

  it('should ...', inject([DiscountsService], (service: DiscountsService) => {
    expect(service).toBeTruthy();
  }));
});
