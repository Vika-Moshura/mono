import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change total', () => {
    const fakeBasket=[
        {
          category: {
            id:1,
            name: "string",
            path: "string",
            imagePath: "string",
          },
          id:1,
          name:"string",
          path:"string",
          ingredients:"string",
          weight:"string",
          price:10,
          imagePath:"string",
          count:2,
        }
    ];
    component.basket = fakeBasket;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    expect(component.number).toBe(1);
  });

  it('should toddle basket', () => {
    component.openedBasket = false;
    spyOn(component, 'toddleBasket').and.callThrough();
    component.toddleBasket();
    expect(component.toddleBasket).toHaveBeenCalled();
    expect(component.openedBasket).toBe(true);
    component.openedBasket = true;
    component.toddleBasket();
    expect(component.toddleBasket).toHaveBeenCalled();
    expect(component.openedBasket).toBe(false);
  });

  it('should close basket', () => {
    component.openedBasket = false;
    spyOn(component, 'closeBasket').and.callThrough();
    component.closeBasket();
    expect(component.closeBasket).toHaveBeenCalled();
    expect(component.openedBasket).toBe(false);
    component.openedBasket = true;
    component.closeBasket();
    expect(component.closeBasket).toHaveBeenCalled();
    expect(component.openedBasket).toBe(false);
  });

  it('should toddle burger', () => {
    component.burgerIsOpen = false;
    spyOn(component, 'burger').and.callThrough();
    component.burger();
    expect(component.burger).toHaveBeenCalled();
    expect(component.burgerIsOpen).toBe(true);
    component.burgerIsOpen = true;
    component.burger();
    expect(component.burger).toHaveBeenCalled();
    expect(component.burgerIsOpen).toBe(false);
  });

  it('should close burger', () => {
    component.burgerIsOpen = true;
    spyOn(component, 'closeBurger').and.callThrough();
    component.closeBurger();
    expect(component.closeBurger).toHaveBeenCalled();
    expect(component.burgerIsOpen).toBe(false);
  });

  it('should close burger', () => {
    component.burgerIsOpen = true;
    spyOn(component, 'closeBurger').and.callThrough();
    component.closeBurger();
    expect(component.closeBurger).toHaveBeenCalled();
    expect(component.burgerIsOpen).toBe(false);
  });

  it ('should + and - a product in the basket', () => {
    const fakeStatus = true;
    const fakeStatus2 = false;
    const fakeProduct = {
      category: {
        id:1,
        name: "string",
        path: "string",
        imagePath: "string",
      },
      id:1,
      name:"string",
      path:"string",
      ingredients:"string",
      weight:"string",
      price:10,
      imagePath:"string",
      count:2,
    };
    spyOn(component, 'addProduct').and.callThrough();
    spyOn(component, 'addToBasket').and.callThrough();
    spyOn(component, 'deleteOneFromBasket').and.callThrough();
    component.addProduct(fakeProduct, fakeStatus);
    expect(component.addProduct).toHaveBeenCalled();
    expect(fakeProduct.count).toBe(3);
    expect(component.addToBasket).toHaveBeenCalled();
    component.addProduct(fakeProduct, fakeStatus2);
    expect(component.addProduct).toHaveBeenCalled();
    expect(fakeProduct.count).toBe(2);
    expect(component.deleteOneFromBasket).toHaveBeenCalled();
  });

  it ('should add 1 to basket', () =>{
    const fakeProduct = {
      category: {
        id:1,
        name: "string",
        path: "string",
        imagePath: "string",
      },
      id:1,
      name:"string",
      path:"string",
      ingredients:"string",
      weight:"string",
      price:10,
      imagePath:"string",
      count:2,
    };
    spyOn(component, 'addToBasket').and.callThrough();
    component.addToBasket(fakeProduct);
    expect(component.addToBasket).toHaveBeenCalled();
    expect(window.localStorage.getItem('basket')).toBeTruthy();
    expect(fakeProduct.count).toBe(2);
  })

});
