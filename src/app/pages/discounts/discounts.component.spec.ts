import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsComponent } from './discounts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';
import { IDiscountResponse } from 'src/app/shared/interfaces/IDiscount';
import { Observable, of } from 'rxjs';

describe('DiscountsComponent', () => {
  let component: DiscountsComponent;
  let fixture: ComponentFixture<DiscountsComponent>;
  let mockDiscountsService:any;
  let DISCOUNTS!:IDiscountResponse[];
  beforeEach(async () => {
    DISCOUNTS = [{
      id: 1,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    },
    {
      id: 2,
      date: new Date,
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
    }
    ],
    mockDiscountsService = jasmine.createSpyObj({'getAll':of(DISCOUNTS)});

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DiscountsComponent],
      providers: [{
        provide: DiscountsService, useValue: mockDiscountsService
      }]
    })
      .compileComponents();

      
    fixture = TestBed.createComponent(DiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test getAllDiscounts()', () => {
    mockDiscountsService.getAll.and.returnValue(of(DISCOUNTS));
    expect(component.userDiscounts.length).toBe(2);
  })
});
