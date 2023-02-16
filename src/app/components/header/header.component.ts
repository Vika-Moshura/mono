import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/ROLE.enum';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public burgerIsOpen = false;
  public openedBasket = false;
  public total = 0;
  public number = 0;
  public basket: Array<IProductResponse> = [];
  public loginUrl = "auth";

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUpdatesUserLogin();
  }
  burger() {
    this.burgerIsOpen = !this.burgerIsOpen;
  }
  closeBurger(): void {
    if (this.burgerIsOpen) {
      this.burgerIsOpen = false;
    }
  }
  toddleBasket(): void {
    this.openedBasket = !this.openedBasket;
  }
  closeBasket(): void {
    this.openedBasket = false;
  }
  loadBasket(): void {
    this.basket = [];
    this.total = 0;
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }
  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
    this.number = this.basket.length;
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

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.router.navigate(['/admin']);
    }
    else if (currentUser && currentUser.role === ROLE.USER) {
      this.router.navigate(['/cabinet']);
    }
    else {
      this.openLoginDialog();
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false,
    });
  }
  openCallDialog(): void {
    this.dialog.open(CallDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false,
    })
  }
}
