import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/IDiscount';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  public userDiscounts: IDiscountResponse[] = [];
  constructor(
    private discountService: DiscountsService
  ) { }

  ngOnInit(): void {
    this.getAllDiscounts();
  }

  getAllDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.userDiscounts = data;
    })
  }

}
