import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesComponent } from './admin-categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';

describe('AdminCategoriesComponent', () => {
  let component: AdminCategoriesComponent;
  let fixture: ComponentFixture<AdminCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ AdminCategoriesComponent ],
      providers:[
        {provide: Storage, useValue: {}}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
