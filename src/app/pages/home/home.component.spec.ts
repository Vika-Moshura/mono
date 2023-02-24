import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'src/app/shared/services/products/product.service';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ProductService;
  let PRODUCTS!: IProductResponse[];
  beforeEach(async () => {
    PRODUCTS = [{
      category: {
        id: 1,
        name: 'rolls',
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
        name: 'rolls',
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
        HttpClientTestingModule
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();
    service = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test loadProducts', () => {
    spyOn(service, 'getAllByCategory').and.returnValue(of(PRODUCTS));
    component.loadProducts();
    expect(component.userProducts).toEqual(PRODUCTS);
  })
});
