import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public category!:string;
  private eventSubscription!: Subscription;
  public userProducts: Array<IProductResponse> = [];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService:OrderService,

  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {
  }
  loadProducts(): void {
    this.category = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(this.category).subscribe(data => {
      this.userProducts = data;
    })
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
  addProduct(product:IProductResponse, status:boolean):void{
    if(status){
      ++product.count;
    }
    else if(!status && product.count>1){
      --product.count;
    }
  }
  addToBasket(product:IProductResponse):void{
    let basket:Array<IProductResponse> =[];
    if(localStorage.length>0 && localStorage.getItem('basket')){
      basket= JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod=>prod.id===product.id)){
        const index= basket.findIndex(prod=>prod.id===product.id);
        basket[index].count += product.count;
      }else{
        basket.push(product);

      }
    }else{
      basket.push(product);

    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count=1;
    this.orderService.changeBasket.next(true);
  }
}
