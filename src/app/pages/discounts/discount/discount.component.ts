import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/IDiscount';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  public discount!:IDiscountResponse;
  constructor(
    private discountService:DiscountsService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response=>{
      this.discount=response['discountInfo'];
    })
  }
}
