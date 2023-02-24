import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { ProductService } from 'src/app/shared/services/products/product.service';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let service: ProductService;
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let PRODUCT: IProductResponse;
  let PRODUCTS: IProductResponse[];
  let status1: boolean;
  let status2: boolean;
  beforeEach(async () => {
    status1 = true;
    status2 = false;
    PRODUCT = {
      category: {
        id: 1,
        name: 'pizza',
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
    };
    PRODUCTS = [{
      category: {
        id: 1,
        name: 'pizza',
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
    },
    {
      category: {
        id: 1,
        name: 'pizza',
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
    }];
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ProductsComponent],
    })
      .compileComponents();
    service = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test loadProducts()', () => {
    spyOn(service, 'getAllByCategory').and.returnValue(of(PRODUCTS));
    component.loadProducts();
    expect(component.userProducts).toEqual(PRODUCTS);
  });

  it('should test addProduct()', () => {
    spyOn(component, 'addProduct').and.callThrough();
    component.addProduct(PRODUCT, status1);
    expect(component.addProduct).toHaveBeenCalled();
    expect(PRODUCT.count).toBe(2);
    component.addProduct(PRODUCT, status2);
    expect(component.addProduct).toHaveBeenCalled();
    expect(PRODUCT.count).toBe(1);
  });

  it('should test addToBasket()', () => {
    const fakeProduct = {
      category: {
        id: 1,
        name: "string",
        path: "string",
        imagePath: "string",
      },
      id: 1,
      name: "string",
      path: "string",
      ingredients: "string",
      weight: "string",
      price: 10,
      imagePath: "string",
      count: 2,
    };
    spyOn(component, 'addToBasket').and.callThrough();
    component.addToBasket(fakeProduct);
    expect(component.addToBasket).toHaveBeenCalled();
    expect(window.localStorage.getItem('basket')).toBeTruthy();
    expect(fakeProduct.count).toBe(1);
  });

});
