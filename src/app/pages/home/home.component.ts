import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userProducts: Array<IProductResponse> = [];
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getAllByCategoryFirebase('rolls').then(data => {
      this.userProducts = data as IProductResponse[];
    })
  }
  addProduct(product: IProductResponse, status: boolean): void {
    if (status) {
      ++product.count;
    }
    else if (!status && product.count > 1) {
      --product.count;
    }
  }
  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

}
