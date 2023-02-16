/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImagesService } from './images.service';
import { Storage } from '@angular/fire/storage';

describe('Service: Images', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImagesService,
        {provide: Storage, useValue: {} },
      ],
    });
  });

  it('should ...', inject([ImagesService], (service: ImagesService) => {
    expect(service).toBeTruthy();
  }));
});
