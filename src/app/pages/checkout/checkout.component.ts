import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/shared/interfaces/ILogin';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public basket: Array<IProductResponse> = [];
  public total = 0;
  public orderForm!: FormGroup;
  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initOrderForm();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }
  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }
  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }
  addProduct(product: IProductResponse, status: boolean): void {
    if (status) {
      ++product.count;
      this.addToBasket(product);
    }
    else if (!status && product.count > 1) {
      --product.count;
      this.deleteOneFromBasket(product)

    }
  }
  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        ++basket[index].count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);

    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }
  deleteOneFromBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        --basket[index].count;
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }
  deleteAllFromBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket.splice(index, 1);
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }
  initOrderForm(): void {
    const currentUser: ILogin = JSON.parse(localStorage.getItem("currentUser") as string);
    this.orderForm = this.fb.group({
      basket: [this.basket],
      cutleries: ["1", Validators.required],
      handlers: ["Навчальні тримачі", Validators.required],
      payment: ["Оплата готівкою", Validators.required],
      delivery: ["Доставка", Validators.required],
      name: [null, Validators.required],
      phone_number: [null, Validators.required],
      street: [null, Validators.required],
      house: [null, Validators.required],
      entrance: [null],
      flat: [null],
      comments: [null],
      comment: [null],
      kitchen: [null],
    })
    if (currentUser) {
      this.orderForm.patchValue({
        name: currentUser.firstName,
        phone_number: currentUser.phoneNumber
      })
    }
  }

  order(): void {
    this.orderService.create(this.orderForm.value).subscribe(() => {
      localStorage.removeItem("basket");
      this.basket = [];
      this.total = 0;
      this.initOrderForm();
      this.orderService.changeBasket.next(true);
    });
  }
}
