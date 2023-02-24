import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Observable, Subject } from 'rxjs';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let products: IProductResponse[];
  let product: IProductResponse;
  let service: OrderService;
  beforeEach(async () => {
    products = [
      {
        category: {
          id: 1,
          name: 'string',
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
        count: 3,
      },
      {
        category: {
          id: 1,
          name: 'string',
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
      }
    ];
    product = {
      category: {
        id: 1,
        name: 'string',
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
    }
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [CheckoutComponent],
    })
      .compileComponents();
    service = TestBed.inject(OrderService);
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the load of the basket', () => {
    spyOn(component, 'getTotalPrice');
    component.loadBasket();
    window.localStorage.setItem('basket', JSON.stringify(products));
    component.basket = JSON.parse(window.localStorage.getItem('basket') as string);
    expect(component.getTotalPrice).toHaveBeenCalled();
  });

  it('should test deleteOneFromBasket', () => {
    component.deleteOneFromBasket(product);
    let basket = products;
    if (basket.some(prod => prod.id === product.id)) {
      const index = basket.findIndex(prod => prod.id === product.id);
      --basket[index].count;
    }
    expect(basket[0].count).toBe(2);
  });

  it('should updateBasket', () => {
    spyOn(component, 'loadBasket').and.stub();
    component.updateBasket();
    service.changeBasket.next(true);
    expect(component.loadBasket).toHaveBeenCalled();
  })

  it('should test addProduct', () => {
    let status1 = true;
    let status2 = false;
    spyOn(component, 'addToBasket');
    spyOn(component, 'deleteOneFromBasket');
    component.addProduct(product, status1);
    expect(product.count).toBe(2);
    expect(component.addToBasket).toHaveBeenCalledWith(product)
    component.addProduct(product, status2);
    expect(product.count).toBe(1);
    expect(component.deleteOneFromBasket).toHaveBeenCalledWith(product);
  });

  it('should test addToBasket', () => {
    component.addToBasket(product);
    let basket = products;
    if (basket.some(prod => prod.id === product.id)) {
      const index = basket.findIndex(prod => prod.id === product.id);
      ++basket[index].count;
    } else {
      basket.push(product);
    }
    expect(basket[0].count).toBe(4);
  })

  it('should test deleteAllFromBasket', () => {
    component.deleteAllFromBasket(product);
    let basket = products;
    if (basket.some(prod => prod.id === product.id)) {
      const index = basket.findIndex(prod => prod.id === product.id);
      basket.splice(index, 1);
    }
    expect(basket.length).toBe(1);
  });

});
