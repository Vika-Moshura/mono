import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product!: IProductResponse;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {    
      this.product = response['productInfo'];
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
