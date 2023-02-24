import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let num1: string;
  let num2: string;
  let num3: string;
  let num4: string;
  let opened_first: boolean;
  let opened_second: boolean;
  let opened_third: boolean;
  let opened_fourth: boolean;
  beforeEach(async () => {
    num1 = 'first';
    num2 = 'second';
    num3 = 'third';
    num4 = 'fourth';
    opened_first = false;
    opened_second = false;
    opened_third = false;
    opened_fourth = false;
    await TestBed.configureTestingModule({
      declarations: [AboutComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test toggle method', () => {
    component.opened_first = opened_first;
    component.opened_second = opened_second;
    component.opened_third = opened_third;
    component.opened_fourth = opened_fourth;

    spyOn(component, 'toggle');
    component.toggle(num1);
    expect(component.opened_first).toBeFalsy();
    component.toggle(num2);
    expect(component.opened_second).toBeFalsy();
    component.toggle(num3);
    expect(component.opened_third).toBeFalsy();
    component.toggle(num4);
    expect(component.opened_fourth).toBeFalsy();
  })

});
