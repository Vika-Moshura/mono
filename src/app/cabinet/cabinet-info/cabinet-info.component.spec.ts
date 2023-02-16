import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetInfoComponent } from './cabinet-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('CabinetInfoComponent', () => {
  let component: CabinetInfoComponent;
  let fixture: ComponentFixture<CabinetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      declarations: [ CabinetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
