import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountsComponent } from './admin-discounts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';

describe('AdminDiscountsComponent', () => {
  let component: AdminDiscountsComponent;
  let fixture: ComponentFixture<AdminDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ AdminDiscountsComponent ],
      providers:[
        {provide: Storage, useValue: {}}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
